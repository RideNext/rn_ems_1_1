/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */

import React from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import { Bar } from 'react-chartjs-2';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  connect,
  IDispatcher,
  Connect,
} from "../../../../framework/src/flux/connect";
import { IApplicationStoreState } from "../../../../framework/src/store/applicationStore";
import MaterialTable, {
  MaterialTableCtorType,
} from "../../../../framework/src/components/material-table";
import { Loader } from "../../../../framework/src/components/material-ui/loader";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Box, Card, Divider, Grid, Icon, Paper, Stack, Typography } from "@mui/material";
import { SetSelectedValue } from "../actions/deviceActions";
import axios from "axios";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import HistoryIcon from "@mui/icons-material/History";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { AppBar, Tab, Tabs } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Dashboard } from "../components/Dahboard";
var elasticsearch = require("elasticsearch");
//var indexName = "pm_data";
var indexName = "faultlog-v7";
var docType = "_doc";

var elsclient = require("../../../../framework/src/elsconnection.js");
// var elsclient = new elasticsearch.Client({
//   host: 'http://192.168.128.104:9200',
//   //host: 'http://192.168.129.70:9200',
//   requestTimeout: Infinity, // Tested
//   keepAlive: false // Tested
// });

const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    leftButton: {
      justifyContent: "left",
    },
    outer: {
      flex: "1",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inner: {},
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    fab: {
      margin: theme.spacing(1),
    },
    button: {
      margin: 0,
      padding: "6px 6px",
      minWidth: "unset",
    },
    refbuttonstyled: {
      borderStyle: "groove",
      borderColor: "darkgreen",
      borderWidth: "3px",
      backgroundColor: "orange",
      color: "white",
      fontSize: "12px",
      borderRadius: "5px",
      cursor: "default",
      "&:hover": {
        backgroundColor: "darkorange",
        color: "white",
      },
    },
    buttonstyled: {
      borderStyle: "groove",
      borderColor: "darkgreen",
      borderWidth: "3px",
      backgroundColor: "green",
      color: "white",
      fontSize: "12px",
      borderRadius: "5px",
      cursor: "default",
      "&:hover": {
        backgroundColor: "darkgreen",
        color: "white",
      },
    },
    radioHr: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      margin: "3px",
    },
    checkHr: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      margin: "3px",
    },
    flexboxcontainer: {
      display: "flex",
      flexDirection: "row",

      marginRight: "8px",
    },
    listitem: {
      display: "listitem",
      liststyletype: "decimal",
      liststyleposition: "inside",
    },
    readOnly: {
      "& label.Mui-focused": {
        color: "green",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "red",
        },
        "&:hover fieldset": {
          borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
          borderColor: "green",
        },
      },
    },
    uiView: {
      overflowY: "auto",
    },
    section: {
      padding: "15px",
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
    viewElements: {
      width: 485,
      marginLeft: 20,
      marginRight: 20,
    },
    verificationElements: {
      width: 485,
      marginLeft: 20,
      marginRight: 20,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    moduleCollection: {
      marginTop: "16px",
      overflow: "auto",
    },
    objectReult: {
      overflow: "auto",
    },
  });

const mapProps = (state: IApplicationStoreState) => ({
  collectingData: state.performance.valueSelector.collectingData,
  vPath: state.performance.viewDescription.vPath,
  nodeId: state.performance.deviceDescription.nodeId,
  viewData: state.performance.viewDescription.viewData,
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  onValueSelected: (value: any) =>
    dispatcher.dispatch(new SetSelectedValue(value)),
});

const SelectElementTable = MaterialTable as MaterialTableCtorType<{
  [key: string]: any;
}>;

type PerformanceApplicationComponentProps = RouteComponentProps &
  Connect<typeof mapProps, typeof mapDispatch> &
  WithStyles<typeof styles>;

type PerformanceApplicationComponentState = {
  elsdata: { [key: string]: any } | null;
  //kpitypes: { [key: string]: any } | null;
  selectedcellid: { [key: string]: any } | null;
  //selectedkpigrptype: { [key: string]: any } | null;
  kpitypesperGroup: { [key: string]: any } | null;
  seletedKPITypes: [];
  activePanelId: String;
  dashboarddata:any;
  dashboardtrigger:boolean;
  //selectedKPIGroups:[],
  //groupedTypes?: { [key: string]: { name: string }[] };
};

const OldProps = Symbol("OldProps");
class PerformanceApplicationComponent extends React.Component<
  PerformanceApplicationComponentProps,
  PerformanceApplicationComponentState
> {
  /**
   *
   */
  constructor(props: PerformanceApplicationComponentProps) {
    super(props);
    this.state = {
      elsdata: null,
      //kpitypes : null,
      //selectedkpigrptype : null,
      selectedcellid: null,
      kpitypesperGroup: null,
      seletedKPITypes: [],
      activePanelId: "Dashboard",
      dashboarddata:null,
      dashboardtrigger:true
      //selectedKPIGroups:[],
      //groupedTypes: {}
    };
  }

  private setCellID(event: { target: { value: any } }) {
    //alert(eldata[0].cell_id);
    this.setState({
      selectedcellid: event.target.value,
      // kpitypes: this.state.elsdata? this.state.elsdata.hits.hits[0]._source['measurements'][0].cell_ids.filter((index: { [x: string]: any; }) => index['cell_id']==event.target.value): null,
    });
    console.log(this.state.selectedcellid);
  }

  private async getRealTimeValues() {
    const currentnodeId = `${window.location.hash.split("/")[2]}`;
    var that = this;
    const esQuery1 = {
      _source: [
        "nodes.cell_types.cell_id",
        "nodes.cell_types.type_groups.type_group",
      ],
      size: 0,
      aggs: {
        filtered_nodes: {
          nested: {
            path: "nodes",
          },
          aggs: {
            selected_node: {
              filter: {
                term: {
                  "nodes.node_id": currentnodeId,
                },
              },
              aggs: {
                cell_types: {
                  nested: {
                    path: "nodes.cell_types",
                  },
                  aggs: {
                    selected_cell_id: {
                      filter: {
                        term: {
                          "nodes.cell_types.cell_id": this.state.selectedcellid,
                        },
                      },
                      aggs: {
                        cell_types_data: {
                          top_hits: {
                            _source: [
                              "nodes.cell_types.types.type",
                              "nodes.cell_types.types.data.value",
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    const baseUri = `${window.location.origin}`;
    axios.post(baseUri + "/pm_data/_search", esQuery1).then((data1: any) => {
      const groupedTypes: { [key: string]: { name: string }[] } = {};
      console.log(data1);
      const data =
        data1.data.aggregations.filtered_nodes.selected_node.cell_types.selected_cell_id.cell_types_data.hits.hits[0]._source.types.map(
          (types: any) => {
            const startingName = types.type.split(".")[0];
            if (!groupedTypes[startingName]) {
              groupedTypes[startingName] = [];
            }
            groupedTypes[startingName].push(types);
          }
        );
      that.setState({
        kpitypesperGroup: groupedTypes,
      });
      //console.log(that.state.kpitypesperGroup);
    });
  }

  private async exportToCSV() {
    const currentnodeId = `${window.location.hash.split("/")[2]}`;
    const queryPromises = this.state.seletedKPITypes.map(async (typee: any) => {
      const esQuery = {
        _source: ["nodes.cell_types.cell_id"],
        size: 0,
        aggs: {
          filtered_nodes: {
            nested: {
              path: "nodes",
            },
            aggs: {
              selected_node: {
                filter: {
                  term: {
                    "nodes.node_id": currentnodeId,
                  },
                },
                aggs: {
                  cell_types: {
                    nested: {
                      path: "nodes.cell_types",
                    },
                    aggs: {
                      selected_cell_id: {
                        filter: {
                          term: {
                            "nodes.cell_types.cell_id":
                              this.state.selectedcellid,
                          },
                        },
                        aggs: {
                          types: {
                            nested: {
                              path: "nodes.cell_types.types",
                            },
                            aggs: {
                              selected_type: {
                                filter: {
                                  term: {
                                    "nodes.cell_types.types.type": typee.name,
                                  },
                                },
                                aggs: {
                                  cell_types_data: {
                                    top_hits: {
                                      _source: [
                                        "nodes.cell_types.types.type",
                                        "nodes.cell_types.types.data.time",
                                        "nodes.cell_types.types.data.value",
                                      ],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };
      const baseUri = `${window.location.origin}`;
      return axios.post(baseUri + "/pm_data/_search", esQuery);
    });
    Promise.all(queryPromises).then((responses: any) => {
      const selected_types = responses.map((response: any) => {
        return response.data.aggregations.filtered_nodes.selected_node
          .cell_types.selected_cell_id.types.selected_type.cell_types_data.hits
          .hits[0]._source;
      });
      console.log(selected_types);
      const csvContent = [
        ["Time", ...selected_types.map((type: any) => type.type)],
        ...selected_types[0].data.map((item: any, index: number) => [
          item.time,
          ...selected_types.map((type: any) => type.data[index].value),
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);

      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  /*private async setKPItypeGroup(event: { target: {[x: string]: any; name: any }; }) {
    let check = event.target.checked;
      var obj  = {};
    obj = {
      "name":event.target.name
      };
      let typeGroupArr:any
      if (this.state.selectedKPIGroups) {
        typeGroupArr = [...this.state.selectedKPIGroups]
        }
      if(check) {
        if(typeGroupArr.length==10)
        {
          alert("Max KPI selextion is 10" );
          event.target.checked=false;
        }
        else
        {
          typeGroupArr.push(obj) ;
        }
      }
      else
      {
        typeGroupArr = typeGroupArr.filter(function(item:any) { 
          return item.name !== event.target.name;
        });
      }
      
      typeGroupArr.sort((a: { name: string }, b: { name: string }) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.setState({
        selectedKPIGroups: typeGroupArr
      })
      console.log("selected kpi groups", this.state.selectedKPIGroups)
            // Perform any further processing with the data as needed
          } */
  private KPItypeCheck(event: { target: { [x: string]: any; name: any } }) {
    let check = event.target.checked;
    var obj = {};
    obj = {
      name: event.target.name,
    };
    let typeArr: any;
    if (this.state.seletedKPITypes) {
      typeArr = [...this.state.seletedKPITypes];
    }
    if (check) {
      if (typeArr.length == 10) {
        alert("Max KPI selextion is 10");
        event.target.checked = false;
      } else {
        typeArr.push(obj);
      }
    } else {
      typeArr = typeArr.filter(function (item: any) {
        return item.name !== event.target.name;
      });
    }
    typeArr.sort((a: { name: string }, b: { name: string }) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    /*const groupedTypes: { [key: string]: { name: string }[] } = {};
        typeArr.forEach((type:any) => {
          const startingName = type.name.split('.')[0];
          if (!groupedTypes[startingName]) {
            groupedTypes[startingName] = [];
          }
          groupedTypes[startingName].push(type);
        });
        console.log(groupedTypes)*/
    this.setState({
      seletedKPITypes: typeArr,
      //groupedTypes:groupedTypes
    });
    //console.log("kpi types",this.state.seletedKPITypes)
  }

  private getGraphdata = () => {
    var that = this;
    const { nodeId } = this.props;
    const currentnodeId = `${window.location.hash.split("/")[2]}`;
    let lastPath = "/performance";
    if (this.state.selectedcellid == null) {
      const esQuery = {
        _source: [
          "nodes.cell_types.cell_id",
          "nodes.cell_types.type_groups.type_group",
        ],
        size: 0,
        aggs: {
          filtered_nodes: {
            nested: {
              path: "nodes",
            },
            aggs: {
              selected_node: {
                filter: {
                  term: {
                    "nodes.node_id": currentnodeId,
                  },
                },
                aggs: {
                  cell_types: {
                    nested: {
                      path: "nodes.cell_types",
                    },
                    aggs: {
                      cell_types_data: {
                        top_hits: {
                          _source: ["nodes.cell_types.cell_id"],
                          size: 100,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };
      const baseUri = `${window.location.origin}`;
      axios.post(baseUri + "/pm_data/_search", esQuery).then((data1: any) => {
       if (this.state.selectedcellid == null) {
          that.setState({
            selectedcellid:
              data1.data.aggregations.filtered_nodes.selected_node.cell_types
                .cell_types_data.hits.hits[0]._source.cell_id,
          });
        }

        that.setState({
          elsdata:
            data1.data.aggregations.filtered_nodes.selected_node.cell_types
              .cell_types_data.hits.hits,
        });
        //console.log(this.state.elsdata)

        const esQuery1 = {
          _source: [
            "nodes.cell_types.cell_id",
            "nodes.cell_types.type_groups.type_group",
          ],
          size: 0,
          aggs: {
            filtered_nodes: {
              nested: {
                path: "nodes",
              },
              aggs: {
                selected_node: {
                  filter: {
                    term: {
                      "nodes.node_id": currentnodeId,
                    },
                  },
                  aggs: {
                    cell_types: {
                      nested: {
                        path: "nodes.cell_types",
                      },
                      aggs: {
                        selected_cell_id: {
                          filter: {
                            term: {
                              "nodes.cell_types.cell_id":
                                this.state.selectedcellid,
                            },
                          },
                          aggs: {
                            cell_types_data: {
                              top_hits: {
                                _source: [
                                  "nodes.cell_types.types.type",
                                  "nodes.cell_types.types.data.value",
                                ],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        };
        const baseUri = `${window.location.origin}`;
        axios
          .post(baseUri + "/pm_data/_search", esQuery1)
          .then((data1: any) => {
            const groupedTypes: { [key: string]: { name: string }[] } = {};
            //console.log(data1)
            const data =
              data1.data.aggregations.filtered_nodes.selected_node.cell_types.selected_cell_id.cell_types_data.hits.hits[0]._source.types.map(
                (types: any) => {
                  const startingName = types.type.split(".")[0];
                  if (!groupedTypes[startingName]) {
                    groupedTypes[startingName] = [];
                  }
                  groupedTypes[startingName].push(types);
                }
              );
              if (this.state.kpitypesperGroup == null) {
              that.setState({
                kpitypesperGroup: groupedTypes,
              });
            }
          });
      });
    }

    return (
      <div
        style={{
          marginLeft: "2vw",
          // width: "100%",
          height: "95%",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "95%",
            height: "",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{ width: "18%", display: "flex", flexDirection: "column" }}
          >
            <h5 style={{ textAlign: "center", fontSize: "1vw" , margin:'9%'}}>
              Select the Cell{" "}
            </h5>
            <div
              style={{
                // margin: "0.2vw",
                height: "18vw",
                marginRight: "1vw",
                width: "95%",
                overflow: "auto",
                border: "2px outset skyblue",
                boxSizing: "border-box",
              }}
            >
              <label
                style={{
                  margin: "0.2vw",
                  alignSelf: "flex-start",
                  fontSize: "1vw",
                }}
              >
                <strong>Cell ID</strong>
              </label>
              {this.state.elsdata
                ? //this.state.elsdata.hits.hits[0]._source['measurements'][0].cell_ids.map((cell: any,index: number) => (
                  this.state.elsdata.map((cell: any, index: number) => (
                    <div
                      className={this.props.classes.flexboxcontainer}
                      key={index}
                      style={{ width: "100%" }}
                    >
                      <input
                        type="radio"
                        radioGroup="cellID"
                        name="cellID"
                        style={{ margin: "0.2vw", alignSelf: "center" }}
                        value={cell._source.cell_id}
                        className={this.props.classes.radioHr}
                        onChange={this.setCellID.bind(this)}
                        defaultChecked={index === 0}
                      />
                      <label
                        style={{
                          margin: "0.2vw",
                          alignSelf: "center",
                          fontSize: "1vw",
                        }}
                      >
                        {cell._source.cell_id.split("=")[1]}
                      </label>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div
            style={{ width: "85%", display: "flex", flexDirection: "column" }}
          >
            <h5 style={{ textAlign: "center", fontSize: "1vw",margin:'1.5%' }}>
              KPI Indicators
            </h5>
            <div
              style={{
                // margin: "0.2vw",
                height: "18vw",
                width: "100%",
                overflow: "auto",
                border: "2px outset skyblue",
                marginRight: "5%",
                display: "flex",
                alignItems: "flex-start",
                WebkitOverflowScrolling: "touch",
                boxSizing: "border-box",
              }}
            >
              {this.state.elsdata && this.state.kpitypesperGroup
                ? Object.keys(this.state.kpitypesperGroup).map(
                    (type: any, index: number) => (
                      <div
                        key={index}
                        className={this.props.classes.flexboxcontainer}
                        style={{ marginRight: "5px" }}
                      >
                        <div
                          style={{
                            margin: "0.3vw",
                            height: "15vw",
                            width: "15vw",
                            overflow: "auto",
                            border: "2px outset skyblue",
                            display: "flex",
                            flexDirection: "column",
                            WebkitOverflowScrolling: "touch",
                          }}
                        >
                          <div
                            className={this.props.classes.flexboxcontainer}
                            style={{ margin: "0.2vw" }}
                          >
                            <label
                              style={{
                                margin: "0.2vw",
                                alignSelf: "flex-start",
                                fontSize: "1vw",
                              }}
                            >
                              <strong>{type}</strong>
                            </label>
                          </div>
                          <div
                            style={{
                              overflow: "auto",
                              display: "flex",
                              flexDirection: "column",
                              margin: "0.2vw",
                              minHeight: "0",
                              flex: "1",
                              WebkitOverflowScrolling: "touch",
                            }}
                          >
                            {this.state.kpitypesperGroup![type].map(
                              (type1: any, innerIndex: number) => (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "0.4vw",
                                    width: "30vw",
                                  }}
                                  key={innerIndex}
                                >
                                  <div style={{ width: "30vw" }}>
                                    <input
                                      type="checkbox"
                                      name={type1.type}
                                      onChange={this.KPItypeCheck.bind(this)}
                                    />
                                    <span style={{ fontSize: "1vw" }}>
                                      {type1.type}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      width: "2vw",
                                      position: "sticky",
                                      right: "0",
                                      background: "#fafafa",
                                    }}
                                  >
                                    <span style={{ fontSize: "1vw" }}>
                                      {type1.data.slice(-1)[0].value}
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )
                : null}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "95%",
            height: "2%",
            boxSizing: "border-box",
          }}
        >
          {this.state.seletedKPITypes &&
          this.state.seletedKPITypes.length > 0 ? (
            <div>
              <h5 style={{ textAlign: "center",margin:'1%' }}>Selected Types</h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "1.5%",
                  width: "100%",
                  flexWrap: "wrap",
                  border: "2px outset skyblue",
                }}
              >
                {this.state.seletedKPITypes.map(
                  (selectedType: any, index: any) =>
                    index < this.state.seletedKPITypes.length - 1 ? (
                      <span
                        key={index}
                        style={{ width: "auto",margin:'0.3%', fontSize:'1.8vh' }}
                      >
                        {selectedType.name},
                      </span>
                    ) : (
                      <span
                        key={index}
                        style={{ width: "auto",margin:'0.3%', fontSize:'1.8vh' }}
                      >
                        {selectedType.name}
                      </span>
                    )
                )}
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ marginTop: "9%" }}>
          <Stack direction="row" spacing={2}>
            <Button
              className={this.props.classes.refbuttonstyled}
              onClick={() => this.getRealTimeValues()}
            >
              <AutorenewIcon />
              Get Realtime data
            </Button>
            {this.state.seletedKPITypes &&
            this.state.seletedKPITypes.length > 0 ? (
              <Button
                className={this.props.classes.buttonstyled}
                onClick={() => this.OpenCharts()}
              >
                <SignalCellularAltIcon />
                Generate Charts
              </Button>
            ) : null}

            {this.state.seletedKPITypes &&
            this.state.seletedKPITypes.length > 0 ? (
              <Button
                className={this.props.classes.buttonstyled}
                style={{ backgroundColor: "grey" }}
                onClick={() => this.OpenCharts1()}
              >
                <HistoryIcon />
                Get History data
              </Button>
            ) : null}
            {this.state.seletedKPITypes &&
            this.state.seletedKPITypes.length > 0 ? (
              <Button
                className={this.props.classes.buttonstyled}
                style={{ backgroundColor: "#51829B" }}
                onClick={() => this.exportToCSV()}
              >
                <ArrowCircleDownIcon />
                Export to CSV
              </Button>
            ) : null}
          </Stack>
        </div>
      </div>
    );
  };

  private OpenCharts() {
    if (
      localStorage.getItem("KIPdata") !== "undefined" &&
      localStorage.getItem("KIPdata") !== null
    ) {
      localStorage.removeItem("KIPdata");
    }
    //this.props.history.push(`${this.props.match.url}/KPIcharts`, state:{state : this.state});
    this.props.history.push({
      pathname: `${this.props.match.url}/KPIcharts`,
      state: {
        selectedNodeID: `${window.location.hash.split("/")[2]}`,
        seletedKPItype: this.state.seletedKPITypes,
        seletedCellID: this.state.selectedcellid,
      },
    });
  }

  private OpenCharts1() {
    if (
      localStorage.getItem("KIPdata") !== "undefined" &&
      localStorage.getItem("KIPdata") !== null
    ) {
      localStorage.removeItem("KIPdata");
    }
    //this.props.history.push(`${this.props.match.url}/KPIcharts`, state:{state : this.state});
    this.props.history.push({
      pathname: `${this.props.match.url}/Historydata`,
      state: {
        seletedKPItype: this.state.seletedKPITypes,
        seletedCellID: this.state.selectedcellid,
        selectedNodeID: `${window.location.hash.split("/")[2]}`,
      },
    });
  }
  private onHandleTabChange = (
    event: React.SyntheticEvent,
    newValue: String
  ) => {
    this.setState({ activePanelId: newValue });
  };

  private renderValueEditor() {
    let lastPath = "/performance";
    const currentnodeId = `${window.location.hash.split("/")[2]}`;
    return (
      <>
        <Typography
          style={{
            marginTop: "0.1%",
            fontSize: "2.5vh",
            marginLeft:"0.1%",
            marginBottom: "0.2%",
          }}
        >
          Performance - {window.location.hash.split("/")[2]}
        </Typography>
     
      <div className={this.props.classes.header}>
          <div>
        
            {/* Load.....1 */}
             <Breadcrumbs aria-label="breadcrumbs">
              <Link
                underline="hover"
                color="inherit"
                href="#"
                aria-label="back-breadcrumb"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "3px",
                }}
                onClick={(ev: React.MouseEvent<HTMLElement>) => {
                  ev.preventDefault();
                  this.props.history.push(lastPath);
                }}
              >
                {" "}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "3px",
                  }}
                >
                  &#8666;
                </span>{" "}
                Back
              </Link>
            </Breadcrumbs> 

          </div>
        </div>
        <AppBar enableColorOnDark position="static">
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            value={this.state.activePanelId}
            onChange={this.onHandleTabChange}
            aria-label="fault-tabs"
          >
            <Tab
              aria-label="Dashboard-list-tab"
              label="Dashboard"
              value="Dashboard"
              sx={{
                borderRadius:'5px',
                marginRight: "0.2%",
                color: "#000000de",
                backgroundColor: "#c6cbd1",
                "&.Mui-selected": {
                  color: "#ffffff",
                  backgroundColor: "#53659c",
                },
              }}
            />
            <Tab
              aria-label="kpi-stats-list-tab"
              label={`KPI Stats`}
              value="Stats"
              sx={{
                borderRadius:'5px',
                color: "#000000de",
                backgroundColor: "#c6cbd1",
                "&.Mui-selected": {
                  color: "#ffffff",
                  backgroundColor: "#53659c",
                },
              }}
            />
          </Tabs>
        </AppBar>
        {this.state.activePanelId === "Dashboard" ? (
          <div className={this.props.classes.container}>
            <Dashboard/>
           
            {/* <MaterialDashboard/> */}
          </div>
        ) : (
          <div className={this.props.classes.container}>
            {this.getGraphdata()}
          </div>
        )}
      </>
    );
  }

  private renderCollectingData() {
    return (
      <div className={this.props.classes.outer}>
        <div className={this.props.classes.inner}>
          <Loader />
          <h3>Processing ...</h3>
        </div>
      </div>
    );
  }
  render() {
    return this.renderValueEditor();
    // return this.props.collectingData || !this.state.viewData
    //   ? this.renderCollectingData()
    //   : this.renderValueEditor();
  }
}

export const PerformanceApplication = withStyles(styles)(
  withRouter(connect(mapProps, mapDispatch)(PerformanceApplicationComponent))
);
export default PerformanceApplication;
