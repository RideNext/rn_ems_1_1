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

import {
  Connect,
  connect,
  IDispatcher,
} from "../../../../framework/src/flux/connect";
import {
  MaterialTable,
  MaterialTableCtorType,
} from "../../../../framework/src/components/material-table";
import Refresh from "@mui/icons-material/Refresh";
import { ColumnType } from "../../../../framework/src/components/material-table";

import { EventLogType } from "../models/eventLogType";
import { IApplicationStoreState } from "../../../../framework/src/store/applicationStore";
import {
  createEventLogProperties,
  createEventLogActions,
} from "../handlers/eventLogHandler";
import RefreshEventLogDialog, {
  RefreshEventLogDialogMode,
} from "../components/refreshEventLogDialog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Card,
  CardContent,
  DialogActions,
  Typography,
  Tooltip,
  IconButton,
  Theme,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import createStyles from "@mui/styles/createStyles";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";

const EventLogTable = MaterialTable as MaterialTableCtorType<
  EventLogType & { _id: string }
>;

const mapProps = (state: IApplicationStoreState) => ({
  eventLogProperties: createEventLogProperties(state),
  eventLog: state.eventLog.logEntries,
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  eventLogActions: createEventLogActions(dispatcher.dispatch),
});
const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: 0,
      padding: "6px 6px",
      minWidth: "unset",
    },
    spacer: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      display: "inline",
    },
  });

type EventLogComponentProps = Connect<typeof mapProps, typeof mapDispatch> &
WithStyles<typeof styles>;
type EventLogComponentState = {
  refreshEventLogEditorMode: RefreshEventLogDialogMode;
  elsdata: { [key: string]: any } | null;
  isDialogOpen: boolean;
};
let initalSorted = false;

class EventLogComponent extends React.Component<
  EventLogComponentProps,
  EventLogComponentState
> {
  constructor(props: EventLogComponentProps) {
    super(props);

    this.state = {
      refreshEventLogEditorMode: RefreshEventLogDialogMode.None,
      elsdata: null,
      isDialogOpen: false,
    };
  }
  renderIcon = (rowData: any, index: number) => {
    //console.log(rowData)
    const { classes } = this.props;
    return (
      <Tooltip disableInteractive title={"Info"}>
          <IconButton
            className={classes.button}
            onClick={() => {
              console.log(rowData);
              this.setState({
                elsdata: rowData,
                isDialogOpen: true,
              });
            }}
            size="large"
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
    )
  };

  render(): JSX.Element {
    const refreshEventLogAction = {
      icon: Refresh,
      tooltip: "Refresh Event log",
      ariaLabel: "refresh",
      onClick: () => {
        this.setState({
          refreshEventLogEditorMode:
            RefreshEventLogDialogMode.RefreshEventLogTable,
        });
      },
    };
    return (
      <>
        <EventLogTable
          stickyHeader
          title="Event Log"
          tableId="event-log-table"
          idProperty="_id"
          customActionButtons={[refreshEventLogAction]}
          columns={[
            
            { property: "nodeId", title: "Node Name" },
            { property: "counter", title: "Counter" },
            { property: "timestamp", title: "Timestamp" },
            { property: "attributeName", title: "Attribute Name" },
            { property: "newValue", title: "Message" },
            { property: "sourceType", title: "Source" },
            {
              property: "Action",
              title: "",
              type: ColumnType.custom,
              customControl: this.renderIcon,
            },
          ]}
          {...this.props.eventLogActions}
          {...this.props.eventLogProperties}
        ></EventLogTable>
        {this.state.elsdata && this.state.elsdata != null ? (
          <Dialog
            open={this.state.isDialogOpen}
            onClose={() => this.setState({ isDialogOpen: false })}
            PaperProps={{
              style: {
                minHeight: "23vh",
                minWidth: "50vw",
                border: "4px solid #38456a",
                borderRadius: "5px",
                backgroundColor: "#e8e8e8",
              },
            }}
          >
            <DialogContent>
              <div>
                <Typography variant="h6">Event Details:</Typography>
                {this.state.elsdata && (
                  <Card style={{ overflowX: "auto" }}>
                    <CardContent>
                      <div>
                        <strong>Node Name:</strong>{" "}
                        {this.state.elsdata.rowData.nodeId}
                      </div>
                      <div>
                        <strong>Counter:</strong>{" "}
                        {this.state.elsdata.rowData.counter}
                      </div>
                      <div>
                        <strong>Timestamp:</strong>{" "}
                        {this.state.elsdata.rowData.timestamp}
                      </div>
                      <div>
                        <strong>Object ID:</strong>{" "}
                        {this.state.elsdata.rowData.objectId}
                      </div>
                      <div>
                        <strong>Attribute Name:</strong>{" "}
                        {this.state.elsdata.rowData.attributeName}
                      </div>
                      <div>
                        <strong>Message:</strong>{" "}
                        {this.state.elsdata.rowData.newValue}
                      </div>
                      <div>
                        <strong>Source:</strong>{" "}
                        {this.state.elsdata.rowData.sourceType}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  this.setState({ elsdata: null, isDialogOpen: false });
                }}
                style={{
                  backgroundColor: "white",
                  color: "#38761d",
                  border: "1px solid #2986cc",
                  borderRadius: "4px",
                  padding: "3px 6px",
                  marginRight: "5%",
                }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        <RefreshEventLogDialog
          mode={this.state.refreshEventLogEditorMode}
          onClose={this.onCloseRefreshEventLogDialog}
        />
      </>
    );
  }

  private onCloseRefreshEventLogDialog = () => {
    this.setState({
      refreshEventLogEditorMode: RefreshEventLogDialogMode.None,
    });
  };
  componentDidMount() {
    if (!initalSorted) {
      initalSorted = true;
      this.props.eventLogActions.onHandleExplicitRequestSort(
        "timestamp",
        "desc"
      );
    } else {
      this.props.eventLogActions.onRefresh();
    }
  }
}

export const EventLog = withStyles(styles)(
  connect(mapProps, mapDispatch)(EventLogComponent)
);
export default EventLog;
