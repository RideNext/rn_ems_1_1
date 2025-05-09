import { Action } from '../../../../framework/src/flux/action';
import { Dispatch } from '../../../../framework/src/flux/store';
import { IApplicationStoreState } from '../../../../framework/src/store/applicationStore';
import { PushAction, ReplaceAction } from '../../../../framework/src/actions/navigationActions';
import { AddErrorInfoAction } from '../../../../framework/src/actions/errorActions';

import { DisplayModeType, DisplaySpecification } from '../handlers/viewDescriptionHandler';

import { configurationRestService } from '../services/configurationrestServices';
import { YangParser } from '../yang/yangParser';
import { Module } from '../models/yang';
import {
  ViewSpecification,
  ViewElement,
  isViewElementReference,
  isViewElementList,
  ViewElementString,
} from '../models/uiModels';

import {
  checkResponseCode,
  splitVPath,
  filterViewElements,
  flattenViewElements,
  getReferencedDataList,
  resolveViewDescription,
} from '../utilities/viewEngineHelper';

export class EnableValueSelector extends Action {
  constructor(public listSpecification: ViewSpecification, public listData: any[], public keyProperty: string, public onValueSelected : (value: any) => void ) {
    super();
  }
}

export class SetCollectingSelectionData extends Action {
  constructor(public busy: boolean) {
    super();
  }
}

export class SetSelectedValue extends Action {
  constructor(public value: any) {
    super();
  }
}

export class UpdateDeviceDescription extends Action {
  constructor( public nodeId: string, public modules: { [name:string]: Module }, public views: ViewSpecification[]) {
    super();
  }
}

export class UpdateViewDescription extends Action {
  constructor(public vPath: string, public viewData: any, public displaySpecification: DisplaySpecification = { displayMode: DisplayModeType.doNotDisplay }) {
    super();
  }
}

export class UpdateOutputData extends Action {
  constructor(public outputData: any) {
    super();
  }
}

export const updateNodeIdAsyncActionCreator = (nodeId: string) => async (dispatch: Dispatch, _getState: () => IApplicationStoreState ) => {

 // dispatch(new UpdateDeviceDescription('', {}, []));
 // dispatch(new SetCollectingSelectionData(true));
 var availableCapabilitiesTemp :any;
 var unavailableCapabilitiesTemp: any;
 var importOnlyModulesTemp :any;
 if(localStorage.getItem('configData') !== null)
 {
  var configData=JSON.parse(localStorage.getItem('configData') || '{}');

  //var YangData=JSON.parse(localStorage.getItem('yangdataArray') || '{}');

  var configRow = configData.reduce((obj: any,cn: { id: string; cndata: any; }) => {
    if (cn.id == nodeId)
        { 
          obj = cn.cndata
        } 
        return obj
      },[]);
       availableCapabilitiesTemp =configRow.availableCapabilities;
       unavailableCapabilitiesTemp =configRow.unavailableCapabilities;
       importOnlyModulesTemp =configRow.importOnlyModules;
}

else if(availableCapabilitiesTemp == null || availableCapabilitiesTemp ==undefined || !availableCapabilitiesTemp || availableCapabilitiesTemp.length <= 0){
  const { availableCapabilities, unavailableCapabilities, importOnlyModules } = await configurationRestService.getCapabilitiesByMountId(nodeId);

   availableCapabilitiesTemp = availableCapabilities;
   unavailableCapabilitiesTemp =unavailableCapabilities;
   importOnlyModulesTemp =importOnlyModules;
}
  if (!availableCapabilitiesTemp || availableCapabilitiesTemp.length <= 0) {
   const { availableCapabilities, unavailableCapabilities, importOnlyModules } = await configurationRestService.getCapabilitiesByMountId(nodeId);
   availableCapabilitiesTemp = availableCapabilities;
   unavailableCapabilitiesTemp =unavailableCapabilities;
   importOnlyModulesTemp =importOnlyModules;
   if (!availableCapabilitiesTemp )
    {
      dispatch(new SetCollectingSelectionData(false));
      //await new Promise(f => setTimeout(f, 1000));
      dispatch(new UpdateDeviceDescription(nodeId, {}, []));
      dispatch(new UpdateViewDescription('', [], {
        displayMode: DisplayModeType.displayAsMessage,
        renderMessage: `NetworkElement : "${nodeId}" has no capabilities.`,
      }));
      throw new Error(`NetworkElement : [${nodeId}] has no capabilities.`);
    }
  }
 
  const parser = new YangParser(
    nodeId,
    availableCapabilitiesTemp.reduce((acc: { [x: string]: any; }, cur: { capability: string | number; version: any; }) => {
      acc[cur.capability] = cur.version;
      return acc;
    }, {} as { [key: string]: string }),
    unavailableCapabilitiesTemp || undefined,
    importOnlyModulesTemp || undefined,
  );
  //const parser = new YangParser(unavailableCapabilitiesTemp || undefined, importOnlyModulesTemp || undefined);

  //await new Promise(f => setTimeout(f, 500));
  //if(availableCapabilitiesTemp.length>5){
    
  for (let i = 0; i < availableCapabilitiesTemp.length; ++i) {
    const capRaw = availableCapabilitiesTemp[i];
    //await parser.addCapability(capRaw.capability, capRaw.version);
    if(capRaw.capability!="o-ran-beamforming")
    {
    if( capRaw.capability!="o-ran-uplane-conf")
    {
      try {
        await parser.addCapability(capRaw.capability, capRaw.version);
        
      } catch (err) {
        console.error(`Error in ${capRaw.capability} ${capRaw.version}`, err);
      }
    }
    else
    {
      console.log(capRaw.capability);
    }
  }
// else
// {
//   console.log(capRaw.capability);
// } 
// }

//}
// if(availableCapabilitiesTemp.length>6){
//   //for (let i = 5; i < 10; ++i) {
//     const capRaw = availableCapabilitiesTemp[6];
//     try {
//       await parser.addCapability(capRaw.capability, capRaw.version);
//     } catch (err) {
//       console.error(`Error in ${capRaw.capability} ${capRaw.version}`, err);
//     }
//   //}
// }

// if(availableCapabilitiesTemp.length > 66){
//   const capRaw = availableCapabilitiesTemp[66];
//   try {
//     await parser.addCapability(capRaw.capability, capRaw.version);
//   } catch (err) {
//     console.error(`Error in ${capRaw.capability} ${capRaw.version}`, err);
//   }

 }


  parser.postProcess();

  dispatch(new SetCollectingSelectionData(false));

  // if (process.env.NODE_ENV === 'development' ) {
  //   console.log(parser, parser.modules, parser.views);
  // }

  return dispatch(new UpdateDeviceDescription(nodeId, parser.modules, parser.views));
};

export const postProcessDisplaySpecificationActionCreator = (vPath: string, viewData: any, displaySpecification: DisplaySpecification) => async (dispatch: Dispatch, _getState: () => IApplicationStoreState) => {
  
  if (displaySpecification.displayMode === DisplayModeType.displayAsObject) {
    displaySpecification = {
      ...displaySpecification,
      viewSpecification: await filterViewElements(vPath, viewData, displaySpecification.viewSpecification),
    };  
  }

  dispatch(new UpdateViewDescription(vPath, viewData, displaySpecification));
};

export const updateViewActionAsyncCreator = (vPath: string) => async (dispatch: Dispatch, getState: () => IApplicationStoreState) => {
  const pathParts = splitVPath(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
  const { configuration: { deviceDescription: { nodeId, modules, views } } } = getState();
  let dataPath = `/rests/data/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount`;

  let inputViewSpecification: ViewSpecification | undefined = undefined;
  let outputViewSpecification: ViewSpecification | undefined = undefined;

  let viewSpecification: ViewSpecification = views[0];
  let viewElement: ViewElement;

  let dataMember: string;
  let extractList: boolean = false;

  let currentNS: string | null = null;
  let defaultNS: string | null = null;

  dispatch(new SetCollectingSelectionData(true));
  try {
    for (let ind = 0; ind < pathParts.length; ++ind) {
      const [property, key] = pathParts[ind];
      const namespaceInd = property && property.indexOf(':') || -1;
      const namespace: string | null = namespaceInd > -1 ? (currentNS = property.slice(0, namespaceInd)) : currentNS;

      if (ind === 0) { defaultNS = namespace; }

      viewElement = viewSpecification.elements[property] || viewSpecification.elements[`${namespace}:${property}`];
      if (!viewElement) throw Error('Property [' + property + '] does not exist.');

      if (viewElement.isList && !key) {
        if (pathParts.length - 1 > ind) {
          dispatch(new SetCollectingSelectionData(false));
          throw new Error('No key for list [' + property + ']');
        } else if (vPath.endsWith('[]') && pathParts.length - 1 === ind) {

          // empty key is used for new element
          if (viewElement && 'viewId' in viewElement) viewSpecification = views[+viewElement.viewId];
          const data = Object.keys(viewSpecification.elements).reduce<{ [name: string]: any }>((acc, cur) => {
            const elm = viewSpecification.elements[cur];
            if (elm.default) {
              acc[elm.id] = elm.default || '';
            }
            return acc;
          }, {});

          // create display specification
          const ds: DisplaySpecification = {
            displayMode: DisplayModeType.displayAsObject,
            viewSpecification: resolveViewDescription(defaultNS, vPath, viewSpecification),
            keyProperty: isViewElementList(viewElement!) && viewElement.key || undefined,
          };

          // update display specification
          return dispatch(postProcessDisplaySpecificationActionCreator(vPath, data, ds));
        }
        if (viewElement && isViewElementList(viewElement) && viewSpecification.parentView === '0') {
          // check if there is a reference as key
          const listSpecification = views[+viewElement.viewId];
          const keyElement = viewElement.key && listSpecification.elements[viewElement.key];
          if (keyElement && isViewElementReference(keyElement)) {
            const refList = await getReferencedDataList(keyElement.referencePath, dataPath, modules, views);
            if (!refList) {
              throw new Error(`Could not find refList for [${keyElement.referencePath}].`);
            }
            if (!refList.key) {
              throw new Error(`Key property not found for [${keyElement.referencePath}].`);
            }
            dispatch(new EnableValueSelector(refList.view, refList.data, refList.key, (refKey) => {
              window.setTimeout(() => dispatch(new PushAction(`${vPath}[${refKey.replace(/\//ig, '%2F')}]`)));
            }));
          } else {
            // Found a list at root level of a module w/o a reference key.
            dataPath += `?&fields=${encodeURIComponent(viewElement.id)}(${encodeURIComponent(viewElement.key || '')})`; 
            const restResult = (await configurationRestService.getConfigData(dataPath));
            if (restResult && restResult.status === 200 && restResult.data && restResult.data[viewElement.id] ) {
              // spoof the not existing view here
              const refData = restResult.data[viewElement.id];
              if (!Array.isArray(refData) || !refData.length) {
                throw new Error('Found a list at root level of a module containing no keys.');
              }
              if (refData.length > 1) {
                const refView : ViewSpecification  = {
                  id: '-1',
                  canEdit: false,
                  config: false,
                  language: 'en-US',
                  elements: {
                    [viewElement.key!] : { 
                      uiType: 'string',
                      config: false,
                      id: viewElement.key,
                      label: viewElement.key,
                      isList: true,
                    } as ViewElementString,
                  },
                };
                dispatch(new EnableValueSelector(refView, refData, viewElement.key!, (refKey) => {
                  window.setTimeout(() => dispatch(new PushAction(`${vPath}[${refKey.replace(/\//ig, '%2F')}]`))); 
                }));
               }
              else {
                window.setTimeout(() => dispatch(new PushAction(`${vPath}[${refData[0]?.id.replace(/\//ig, '%2F')}]`))); 
              }
            } else {
              throw new Error('Found a list at root level of a module and could not determine the keys.');
            }
            dispatch(new SetCollectingSelectionData(false));
          }
          return;
        }
        extractList = true;
      } else {
        // normal case & replaces unicode %2C if present
        dataPath += `/${property}${key ? `=${key.replace(/\%2C/g, ',').replace(/\//ig, '%2F')}` : ''}`;

        // in case of the root element the required namespace will be added later,
        // while extracting the data
        dataMember = namespace === defaultNS
          ? viewElement.label
          : `${namespace}:${viewElement.label}`;
        extractList = false;
      }

      if (viewElement && 'viewId' in viewElement) {
        viewSpecification = views[+viewElement.viewId];
      } else if (viewElement.uiType === 'rpc') {
        viewSpecification = views[+(viewElement.inputViewId || 0)];

        // create new instance & flaten
        inputViewSpecification = viewElement.inputViewId != null && {
          ...views[+(viewElement.inputViewId || 0)],
          elements: flattenViewElements(defaultNS, '', views[+(viewElement.inputViewId || 0)].elements, views, viewElement.label),
        } || undefined;
        outputViewSpecification = viewElement.outputViewId != null && {
          ...views[+(viewElement.outputViewId || 0)],
          elements: flattenViewElements(defaultNS, '', views[+(viewElement.outputViewId || 0)].elements, views, viewElement.label),
        } || undefined;

      }
    }

    let data: any = {};
    // do not get any data from netconf if there is no view specified || this is the root element [0] || this is an rpc
    if (viewSpecification && !(viewSpecification.id === '0' || viewElement!.uiType === 'rpc')) {
      const restResult = (await configurationRestService.getConfigData(dataPath));
      if (!restResult.data) {
        // special case: if this is a list without any response
        if (extractList && restResult.status === 404) {
          if (!isViewElementList(viewElement!)) {
            throw new Error(`vPath: [${vPath}]. ViewElement has no key.`);
          }
          // create display specification
          const ds: DisplaySpecification = {
            displayMode: extractList ? DisplayModeType.displayAsList : DisplayModeType.displayAsObject,
            viewSpecification: resolveViewDescription(defaultNS, vPath, viewSpecification),
            keyProperty: viewElement.key,
          };

          // update display specification
          return dispatch(postProcessDisplaySpecificationActionCreator(vPath, [], ds));
        }
        throw new Error(`Did not get response from Server. Status: [${restResult.status}]`);
      } else if (checkResponseCode(restResult)) {
        const message = restResult.data.errors && restResult.data.errors.error && restResult.data.errors.error[0] && restResult.data.errors.error[0]['error-message'] || '';
        throw new Error(`Server Error. Status: [${restResult.status}]\n${message}`);
      } else {
        // https://tools.ietf.org/html/rfc7951#section-4 the root element may contain a namespace or not !  
        data = restResult.data[`${defaultNS}:${dataMember!}`];
        if (data === undefined) {
          data = restResult.data[dataMember!]; // extract dataMember w/o namespace
        }
      }

      // extract the first element list[key]
      data = data instanceof Array
        ? data[0]
        : data;

      // extract the list -> key: list
      data = extractList
        ? data[viewElement!.id] || data[viewElement!.label] || [] // if the list is empty, it does not exist
        : data;

    } else if (viewElement! && viewElement!.uiType === 'rpc') {
      // set data to defaults
      data = {};
      if (inputViewSpecification) {
        Object.keys(inputViewSpecification.elements).forEach(key => {
          const elm = inputViewSpecification && inputViewSpecification.elements[key];
          if (elm && elm.default != undefined) {
            data[elm.id] = elm.default;
          }
        });
      }
    }
    
    // create display specification
    const ds: DisplaySpecification = viewElement! && viewElement!.uiType === 'rpc'
      ? {
        dataPath,
        displayMode: DisplayModeType.displayAsRPC,
        inputViewSpecification: inputViewSpecification && resolveViewDescription(defaultNS, vPath, inputViewSpecification),
        outputViewSpecification: outputViewSpecification && resolveViewDescription(defaultNS, vPath, outputViewSpecification),
      }
      : {
        dataPath,
        displayMode: extractList ? DisplayModeType.displayAsList : DisplayModeType.displayAsObject,
        viewSpecification: resolveViewDescription(defaultNS, vPath, viewSpecification),
        keyProperty: isViewElementList(viewElement!) && viewElement.key || undefined,
        
        // eslint-disable-next-line max-len
        apidocPath:  isViewElementList(viewElement!) &&  `/apidoc/explorer/index.html?urls.primaryName=$$$standard$$$#/mounted%20${nodeId}%20${viewElement!.module || 'MODULE_NOT_DEFINED'}/$$$action$$$_${dataPath.replace(/^\//, '').replace(/[\/=\-\:]/g, '_')}_${viewElement! != null ? `${viewElement.id.replace(/[\/=\-\:]/g, '_')}_` : '' }` || undefined,
      };

    // update display specification
    return dispatch(postProcessDisplaySpecificationActionCreator(vPath, data, ds));
    // https://server.com/#/configuration/Sim12600/core-model:network-element/ltp[LTP-MWPS-TTP-01]
    // https://server.com/#/configuration/Sim12600/core-model:network-element/ltp[LTP-MWPS-TTP-01]/lp
  } catch (error) {
    history.back();
    dispatch(new AddErrorInfoAction({ title: 'Problem', message: error.message || `Could not process ${dataPath}` }));
    dispatch(new SetCollectingSelectionData(false));
  } finally {
    return;
  }
};

export const updateDataActionAsyncCreator = (vPath: string, data: any) => async (dispatch: Dispatch, getState: () => IApplicationStoreState) => {
  const pathParts = splitVPath(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
  const { configuration: { deviceDescription: { nodeId, views } } } = getState();
  let dataPath = `/rests/data/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount`;
  let viewSpecification: ViewSpecification = views[0];
  let viewElement: ViewElement;
  let dataMember: string;
  let embedList: boolean = false;
  let isNew: string | false = false;

  let currentNS: string | null = null;
  let defaultNS: string | null = null;

  dispatch(new SetCollectingSelectionData(true));
  try {
    for (let ind = 0; ind < pathParts.length; ++ind) {
      let [property, key] = pathParts[ind];
      const namespaceInd = property && property.indexOf(':') || -1;
      const namespace: string | null = namespaceInd > -1 ? (currentNS = property.slice(0, namespaceInd)) : currentNS;

      if (ind === 0) { defaultNS = namespace; }
      viewElement = viewSpecification.elements[property] || viewSpecification.elements[`${namespace}:${property}`];
      if (!viewElement) throw Error('Property [' + property + '] does not exist.');

      if (isViewElementList(viewElement) && !key) {
        embedList = true;
        if (viewElement && viewElement.isList && viewSpecification.parentView === '0') {
          throw new Error('Found a list at root level of a module w/o a refenrece key.');
        }
        if (pathParts.length - 1 > ind) {
          dispatch(new SetCollectingSelectionData(false));
          throw new Error('No key for list [' + property + ']');
        } else if (vPath.endsWith('[]') && pathParts.length - 1 === ind) {
          // handle new element with any number of arguments
          let keyList = viewElement.key?.split(' ');
          let dataPathParam = keyList?.map(id => data[id]).join(',');
          key = viewElement.key && String(dataPathParam) || '';
          isNew = key;
          if (!key) {
            dispatch(new SetCollectingSelectionData(false));
            throw new Error('No value for key [' + viewElement.key + '] in list [' + property + ']');
          }
        }
      }

      dataPath += `/${property}${key ? `=${key.replace(/\//ig, '%2F')}` : ''}`;
      dataMember = viewElement.label;
      embedList = false;

      if (viewElement && 'viewId' in viewElement) {
        viewSpecification = views[+viewElement.viewId];
      }
    }

    // remove read-only elements
    const removeReadOnlyElements = (pViewSpecification: ViewSpecification, isList: boolean, pData: any) => {
      if (isList) {
        return pData.map((elm : any) => removeReadOnlyElements(pViewSpecification, false, elm));
      } else {
        return Object.keys(pData).reduce<{ [key: string]: any }>((acc, cur)=>{
          const [nsOrName, name] = cur.split(':', 1);
          const element = pViewSpecification.elements[cur] || pViewSpecification.elements[nsOrName] || pViewSpecification.elements[name];
          if (!element && process.env.NODE_ENV === 'development' ) {
            throw new Error('removeReadOnlyElements: Could not determine elment for data.');
          }
          if (element && element.config) {
            if (element.uiType === 'object') {
              const view = views[+element.viewId];
              if (!view) {
                throw new Error('removeReadOnlyElements: Internal Error could not determine viewId: ' + element.viewId);
              }
              acc[cur] = removeReadOnlyElements(view, element.isList != null && element.isList, pData[cur]);
            } else {
              acc[cur] = pData[cur];
            }
          }
          return acc;
        }, {});
      }
    };
    data = removeReadOnlyElements(viewSpecification, embedList, data);


    // embed the list -> key: list
    data = embedList
      ? { [viewElement!.label]: data }
      : data;

    // embed the first element list[key]
    data = isNew
      ? [data]
      : data;

    // do not extract root member (0)
    if (viewSpecification && viewSpecification.id !== '0') {
      const updateResult = await configurationRestService.setConfigData(dataPath, { [`${currentNS}:${dataMember!}`]: data }); // addDataMember using currentNS
      if (checkResponseCode(updateResult)) {
        const message = updateResult.data && updateResult.data.errors && updateResult.data.errors.error && updateResult.data.errors.error[0] && updateResult.data.errors.error[0]['error-message'] || '';
        throw new Error(`Server Error. Status: [${updateResult.status}]\n${message || updateResult.message || ''}`);
      }
    }

    if (isNew) {
      return dispatch(new ReplaceAction(`/configuration/${nodeId}/${vPath.replace(/\[\]$/i, `[${isNew}]`)}`)); // navigate to new element
    }

    // create display specification
    const ds: DisplaySpecification = {
      displayMode: embedList ? DisplayModeType.displayAsList : DisplayModeType.displayAsObject,
      viewSpecification: resolveViewDescription(defaultNS, vPath, viewSpecification),
      keyProperty: isViewElementList(viewElement!) && viewElement.key || undefined,
    };

    // update display specification
    return dispatch(new UpdateViewDescription(vPath, data, ds));
  } catch (error) {
    history.back();
    dispatch(new AddErrorInfoAction({ title: 'Problem', message: error.message || `Could not change ${dataPath}` }));

  } finally {
    dispatch(new SetCollectingSelectionData(false));
    return;
  }
};

export const removeElementActionAsyncCreator = (vPath: string) => async (dispatch: Dispatch, getState: () => IApplicationStoreState) => {
  const pathParts = splitVPath(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
  const { configuration: { deviceDescription: { nodeId, views } } } = getState();
  let dataPath = `/rests/data/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount`;
  let viewSpecification: ViewSpecification = views[0];
  let viewElement: ViewElement;

  let currentNS: string | null = null;
  
  dispatch(new SetCollectingSelectionData(true));
  try {
    for (let ind = 0; ind < pathParts.length; ++ind) {
      let [property, key] = pathParts[ind];
      const namespaceInd = property && property.indexOf(':') || -1;
      const namespace: string | null = namespaceInd > -1 ? (currentNS = property.slice(0, namespaceInd)) : currentNS;

      viewElement = viewSpecification.elements[property] || viewSpecification.elements[`${namespace}:${property}`];
      if (!viewElement) throw Error('Property [' + property + '] does not exist.');

      if (isViewElementList(viewElement) && !key) {
        if (viewElement && viewElement.isList && viewSpecification.parentView === '0') {
          throw new Error('Found a list at root level of a module w/o a reference key.');
        }
        if (pathParts.length - 1 > ind) {
          dispatch(new SetCollectingSelectionData(false));
          throw new Error('No key for list [' + property + ']');
        } else if (vPath.endsWith('[]') && pathParts.length - 1 === ind) {
          // remove the whole table
        }
      }

      dataPath += `/${property}${key ? `=${key.replace(/\//ig, '%2F')}` : ''}`;

      if (viewElement && 'viewId' in viewElement) {
        viewSpecification = views[+viewElement.viewId];
      } else if (viewElement.uiType === 'rpc') {
        viewSpecification = views[+(viewElement.inputViewId || 0)];
      }
    }

    const updateResult = await configurationRestService.removeConfigElement(dataPath);
    if (checkResponseCode(updateResult)) {
      const message = updateResult.data && updateResult.data.errors && updateResult.data.errors.error && updateResult.data.errors.error[0] && updateResult.data.errors.error[0]['error-message'] || '';
      throw new Error(`Server Error. Status: [${updateResult.status}]\n${message || updateResult.message || ''}`);
    }
  } catch (error) {
    dispatch(new AddErrorInfoAction({ title: 'Problem', message: error.message || `Could not remove ${dataPath}` }));
  } finally {
    dispatch(new SetCollectingSelectionData(false));
  }
};

export const executeRpcActionAsyncCreator = (vPath: string, data: any) => async (dispatch: Dispatch, getState: () => IApplicationStoreState) => {
  const pathParts = splitVPath(vPath, /(?:([^\/\["]+)(?:\[([^\]]*)\])?)/g); // 1 = property / 2 = optional key
  const { configuration: { deviceDescription: { nodeId, views } } } = getState();
  let dataPath = `/rests/operations/network-topology:network-topology/topology=topology-netconf/node=${nodeId}/yang-ext:mount`;
  let viewSpecification: ViewSpecification = views[0];
  let viewElement: ViewElement;
  let dataMember: string;
  let embedList: boolean = false;
  let isNew: string | false = false;

  let currentNS: string | null = null;
  let defaultNS: string | null = null;

  dispatch(new SetCollectingSelectionData(true));
  try {
    for (let ind = 0; ind < pathParts.length; ++ind) {
      let [property, key] = pathParts[ind];
      const namespaceInd = property && property.indexOf(':') || -1;
      const namespace: string | null = namespaceInd > -1 ? (currentNS = property.slice(0, namespaceInd)) : currentNS;

      if (ind === 0) { defaultNS = namespace; }
      viewElement = viewSpecification.elements[property] || viewSpecification.elements[`${namespace}:${property}`];
      if (!viewElement) throw Error('Property [' + property + '] does not exist.');

      if (isViewElementList(viewElement) && !key) {
        embedList = true;
      //   if (viewElement && viewElement.isList && viewSpecification.parentView === "0") {
      //     throw new Error("Found a list at root level of a module w/o a reference key.");
      //   }
      //   if (pathParts.length - 1 > ind) {
      //     dispatch(new SetCollectingSelectionData(false));
      //     throw new Error("No key for list [" + property + "]");
      //   } else if (vPath.endsWith("[]") && pathParts.length - 1 === ind) {
      //     // handle new element
      //     key = viewElement.key && String(data[viewElement.key]) || "";
      //     isNew = key;
      //     if (!key) {
      //       dispatch(new SetCollectingSelectionData(false));
      //       throw new Error("No value for key [" + viewElement.key + "] in list [" + property + "]");
      //     }
      //   }
      }

      dataPath += `/${property}${key ? `=${key.replace(/\//ig, '%2F')}` : ''}`;
      dataMember = viewElement.label;
      embedList = false;

      if (viewElement && 'viewId' in viewElement) {
        viewSpecification = views[+viewElement.viewId];
      } else if (viewElement.uiType === 'rpc') {
        viewSpecification = views[+(viewElement.inputViewId || 0)];
      }
    }

    // re-inflate formerly flatten rpc data
    data = data && Object.keys(data).reduce < { [name: string ]: any }>((acc, cur) => {
      const innerPathParts = cur.split('.');
      let pos = 0;
      const updatePath = (obj: any, key: string) => {
        obj[key] = (pos >= innerPathParts.length)
          ? data[cur]
          : updatePath(obj[key] || {}, innerPathParts[pos++]);
        return obj;
      };
      updatePath(acc, innerPathParts[pos++]);
      return acc;
    }, {}) || null;

    // embed the list -> key: list
    data = embedList
      ? { [viewElement!.label]: data }
      : data;

    // embed the first element list[key]
    data = isNew
      ? [data]
      : data;

    // do not post root member (0)
    if ((viewSpecification && viewSpecification.id !== '0') || (dataMember! && !data)) {
      const updateResult = await configurationRestService.executeRpc(dataPath, { [`${defaultNS}:input`]: data || {} });
      if (checkResponseCode(updateResult)) {
        const message = updateResult.data && updateResult.data.errors && updateResult.data.errors.error && updateResult.data.errors.error[0] && updateResult.data.errors.error[0]['error-message'] || '';
        throw new Error(`Server Error. Status: [${updateResult.status}]\n${message || updateResult.message || ''}`);
      }
      dispatch(new UpdateOutputData(updateResult.data));
    } else {
      throw new Error('There is NO RPC specified.');
    }


    // // update display specification
    // return
  } catch (error) {
    dispatch(new AddErrorInfoAction({ title: 'Problem', message: error.message || `Could not change ${dataPath}` }));

  } finally {
    dispatch(new SetCollectingSelectionData(false));
  }
};
