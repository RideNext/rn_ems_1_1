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
import * as React from "react";

import { Connect, connect, IDispatcher } from '../../../../framework/src/flux/connect';
import { MaterialTable, MaterialTableCtorType } from '../../../../framework/src/components/material-table';
import Refresh from '@mui/icons-material/Refresh';
import { ColumnType } from '../../../../framework/src/components/material-table'

import { AuditLogType } from '../models/auditLogType';
import { IApplicationStoreState } from "../../../../framework/src/store/applicationStore";
import { createAuditLogProperties, createAuditLogActions } from "../handlers/auditLogHandler";
import RefreshAuditLogDialog, { RefreshAuditLogDialogMode } from '../components/refreshAuditLogDialog';
import { Dialog, DialogTitle, DialogContent,DialogActions, Button, Card, CardContent, Typography } from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CompareIcon from '@mui/icons-material/Compare';
import ReactDiffViewer from "react-diff-viewer";

import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const AuditLogTable = MaterialTable as MaterialTableCtorType<AuditLogType & { _id: string }>;

const mapProps = (state: IApplicationStoreState) => ({
  auditLogProperties: createAuditLogProperties(state),
  auditLog: state.auditLog.logEntries
}); 


const mapDispatch = (dispatcher: IDispatcher) => ({
  auditLogActions: createAuditLogActions(dispatcher.dispatch)
});

type AuditLogComponentProps = Connect<typeof mapProps, typeof mapDispatch>;
type AuditLogComponentState = {
  refreshAuditLogEditorMode: RefreshAuditLogDialogMode;
  elsdata: { [key: string]: any } | null;
  isDialogOpen: boolean;
  compareOpen: boolean;
  isCompareDiff: boolean;
  isConfigEdit: boolean;
  deviceCurrentdata: string; 
  deviceDBdata: string; 
  ConfigData: string; 
}
let initalSorted = false;

class AuditLogComponent extends React.Component<AuditLogComponentProps, AuditLogComponentState> {
  constructor(props: AuditLogComponentProps) {
    super(props);

    this.state = {
      refreshAuditLogEditorMode: RefreshAuditLogDialogMode.None,
      elsdata:null,
      isDialogOpen: false,
      compareOpen: false,
      isCompareDiff: false,
      isConfigEdit:false,
      deviceCurrentdata: '', 
      deviceDBdata: '' ,
      ConfigData:'',
    };
  }

  handleSubmit = () => {
    // Handle submit logic here
    console.log('Submit button clicked', this.state.elsdata);
    this.setState({ isDialogOpen: false });
  }

  
  handleCompare = (rowData: any) => {
    console.log('Compare button clicked', rowData);

    const isCompareDiff =rowData.event=="Compare" ;
    const isConfigEdit =rowData.event=="Edit Config";

    this.setState({
      elsdata: rowData,
      compareOpen: true,
      deviceCurrentdata:rowData.DeviceData,
      deviceDBdata:rowData.DeviceData,
      ConfigData:JSON.stringify(rowData.ConfigData),
      isCompareDiff,
      isConfigEdit,
    });
  }

  render(): JSX.Element {

    const refreshAuditLogAction = {
      icon: Refresh, tooltip: 'Refresh Audit log', ariaLabel:'refresh', onClick: () => {
        this.setState({
          refreshAuditLogEditorMode: RefreshAuditLogDialogMode.RefreshAuditLogTable
        });
      }
    };
    return (
      <>
        <AuditLogTable stickyHeader title="Audit Log" tableId="audit-log-table" idProperty="_id" customActionButtons={[refreshAuditLogAction]}
          columns={[
            
            { property: "nodeId", title: "NodeId" },
            { property: "user", title: "User" },
            { property: "event", title: "Event"},
            { property: "timestamp", title: "Timestamp" },
            // { property: "Action", title: "", type: ColumnType.custom, customControl: this.renderIcon },
              {property: "actions", title: "Actions", type: ColumnType.custom, customControl: ({ rowData }) => (
                <div>
                  <Tooltip  title={"View History"} >
                  <IconButton
                  className='View History'
                  onClick={() => this.handleCompare(rowData)}
                  size="large"><InfoOutlinedIcon /></IconButton>
                  </Tooltip>
                </div>
              )}
          ]}  {...this.props.auditLogActions} {...this.props.auditLogProperties} >
        </AuditLogTable>
        <RefreshAuditLogDialog
          mode={this.state.refreshAuditLogEditorMode}
          onClose={this.onCloseRefreshAuditLogDialog}
        />
        <Dialog
          open={this.state.compareOpen}
          onClose={() => this.setState({ compareOpen: false })}
          PaperProps={{
            style: {
              minHeight: '23vh',
              minWidth: '50vw',
              border: '4px solid #38456a',
              borderRadius: '5px',
              backgroundColor: '#e8e8e8'
            }
          }}>
          
          <DialogContent >
            <div >
              <Typography variant="h6">History:</Typography>
              {this.state.elsdata && (
                <Card style={{ overflowX: 'auto' }}>
                  <CardContent>
                    <div>
                      <strong>Node Id:</strong> {this.state.elsdata.nodeId}
                    </div>
                    <div>
                      <strong>User:</strong> {this.state.elsdata.user}
                    </div>
                    <div>
                      <strong>Event:</strong> {this.state.elsdata.event}
                    </div>
                    <div>
                      <strong>Timestamp:</strong> {this.state.elsdata.timestamp}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            {this.state?.isCompareDiff && (<div>
            <div>
              <Typography>Device Data Vs Database</Typography>
            </div>
            <div>
             <Typography>No difference available</Typography>
              <ReactDiffViewer
                oldValue={this.state.deviceCurrentdata}
                newValue={this.state.deviceDBdata}
                splitView={true}
                leftTitle={"Data from Device"}
                rightTitle={"Data from Database"}
                extraLinesSurroundingDiff={5} />
            </div>
            </div>)
            }
             {this.state?.isConfigEdit && (
              <div >
              <div style={{color:'#55679D', margin:'3px'}}>
              <Typography>Device Data</Typography>
              </div>
              {/* <div>
              {JSON.stringify(this.state?.elsdata?.ConfigData)}
              </div> */}
              <div >
  <pre>{JSON.stringify(this.state?.elsdata?.ConfigData, null, 2)}</pre>
</div>

              </div>)
          }
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({
              compareOpen: false,
              isCompareDiff: false
            })}
              style={{
                backgroundColor: 'white',
                color: '#38761d',
                border: '1px solid #2986cc',
                borderRadius: '4px',
                padding: '3px 6px',
                marginRight: '5%'
              }}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  private onCloseRefreshAuditLogDialog = () => {
    this.setState({
      refreshAuditLogEditorMode: RefreshAuditLogDialogMode.None
    });
  }
  componentDidMount() {

    if (!initalSorted) {
      initalSorted = true;
      this.props.auditLogActions.onHandleExplicitRequestSort("timestamp", "desc");
    } else {
      this.props.auditLogActions.onRefresh();
    }
  }
}

export const AuditLog = connect(mapProps, mapDispatch)(AuditLogComponent);
export default AuditLog;
