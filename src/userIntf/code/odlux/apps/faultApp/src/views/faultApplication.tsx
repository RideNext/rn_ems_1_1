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
import { RouteComponentProps, withRouter } from "react-router-dom";

import Refresh from "@mui/icons-material/Refresh";
import Sync from "@mui/icons-material/Sync";
import {
  AppBar,
  DialogActions,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import {
  ColumnType,
  MaterialTable,
  MaterialTableCtorType,
} from "../../../../framework/src/components/material-table";
import {
  connect,
  Connect,
  IDispatcher,
} from "../../../../framework/src/flux/connect";
import { IApplicationStoreState } from "../../../../framework/src/store/applicationStore";

import { setPanelAction } from "../actions/panelChangeActions";
import ClearStuckAlarmsDialog, {
  ClearStuckAlarmsDialogMode,
} from "../components/clearStuckAlarmsDialog";
import RefreshAlarmLogDialog, {
  RefreshAlarmLogDialogMode,
} from "../components/refreshAlarmLogDialog";
import RefreshCurrentAlarmsDialog, {
  RefreshCurrentAlarmsDialogMode,
} from "../components/refreshCurrentAlarmsDialog";
import {
  alarmLogEntriesReloadAction,
  createAlarmLogEntriesActions,
  createAlarmLogEntriesProperties,
} from "../handlers/alarmLogEntriesHandler";
import {
  createCurrentAlarmsActions,
  createCurrentAlarmsProperties,
  currentAlarmsReloadAction,
} from "../handlers/currentAlarmsHandler";
import { Fault, FaultAlarmNotification } from "../models/fault";
import { PanelId } from "../models/panelId";
import { Theme, Tooltip, TextField } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import AddCommentIcon from "@mui/icons-material/AddComment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import createStyles from "@mui/styles/createStyles";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const mapProps = (state: IApplicationStoreState) => ({
  panelId: state.fault.currentOpenPanel,
  currentAlarmsProperties: createCurrentAlarmsProperties(state),
  faultNotifications: state.fault.faultNotifications,
  alarmLogEntriesProperties: createAlarmLogEntriesProperties(state),
});

const mapDisp = (dispatcher: IDispatcher) => ({
  currentAlarmsActions: createCurrentAlarmsActions(dispatcher.dispatch),
  alarmLogEntriesActions: createAlarmLogEntriesActions(dispatcher.dispatch),
  reloadCurrentAlarms: () => dispatcher.dispatch(currentAlarmsReloadAction),
  reloadAlarmLogEntries: () => dispatcher.dispatch(alarmLogEntriesReloadAction),
  switchActivePanel: (panelId: PanelId) => {
    dispatcher.dispatch(setPanelAction(panelId));
  },
});
let initialSorted = false;
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

type FaultApplicationComponentProps = Connect<typeof mapProps, typeof mapDisp> &
  WithStyles<typeof styles>;

type FaultApplicationState = {
  clearAlarmDialogMode: ClearStuckAlarmsDialogMode;
  stuckAlarms: string[];
  refreshAlarmLogEditorMode: RefreshAlarmLogDialogMode;
  refreshCurrentAlarmsEditorMode: RefreshCurrentAlarmsDialogMode;
  elsdata: { [key: string]: any } | null;
  isDialogOpen: boolean;
  message: string;
  row: any;
  currentdialog: string;
  acklist: any[];
  errorlist: any[];
  isexpand: boolean;
  errormessage: string;
};

const FaultTable = MaterialTable as MaterialTableCtorType<Fault>;
const FaultAlarmNotificationTable =
  MaterialTable as MaterialTableCtorType<FaultAlarmNotification>;

let currentAlarmsInitalSorted = false;
let alarmLogInitialSorted = false;

class FaultApplicationComponent extends React.Component<
  FaultApplicationComponentProps,
  FaultApplicationState
> {
  interval: NodeJS.Timeout;
  constructor(props: FaultApplicationComponentProps) {
    super(props);
    this.state = {
      clearAlarmDialogMode: ClearStuckAlarmsDialogMode.None,
      stuckAlarms: [],
      refreshAlarmLogEditorMode: RefreshAlarmLogDialogMode.None,
      refreshCurrentAlarmsEditorMode: RefreshCurrentAlarmsDialogMode.None,
      elsdata: null,
      isDialogOpen: false,
      message: "",
      row: null,
      currentdialog: "",
      acklist: [],
      errorlist: [],
      isexpand: false,
      errormessage: "",
    };
  }

  onDialogClose = () => {
    this.setState({
      clearAlarmDialogMode: ClearStuckAlarmsDialogMode.None,
      stuckAlarms: [],
    });
  };

  onDialogOpen = () => {
    const stuckAlarms = [
      ...new Set(
        this.props.currentAlarmsProperties.rows.map(
          (item) => item["sourceName"]
        )
      ),
    ];
    this.setState({
      clearAlarmDialogMode: ClearStuckAlarmsDialogMode.Show,
      stuckAlarms: stuckAlarms,
    });
  };

  private onHandleTabChange = (
    event: React.SyntheticEvent,
    newValue: PanelId
  ) => {
    this.onToggleTabs(newValue);
  };

  private onToggleTabs = (panelId: PanelId) => {
    const nextActivePanel = panelId;
    this.props.switchActivePanel(nextActivePanel);
    switch (nextActivePanel) {
      case "CurrentAlarms":
        if (!currentAlarmsInitalSorted) {
          currentAlarmsInitalSorted = true;
          this.props.currentAlarmsActions.onHandleExplicitRequestSort(
            "lastEpochMicrosec",
            "desc"
          );
        } else {
          this.props.reloadCurrentAlarms();
        }
        break;
      case "AlarmLog":
        if (!alarmLogInitialSorted) {
          alarmLogInitialSorted = true;
          this.props.alarmLogEntriesActions.onHandleExplicitRequestSort(
            "lastEpochMicrosec",
            "desc"
          );
        } else {
          this.props.reloadAlarmLogEntries();
        }
        break;
      case "AlarmNotifications":
      case null:
      default:
        // nothing to do
        break;
    }
  };

  toggleExpand = () => {
    this.setState(
      (prevState) => ({ isexpand: !prevState.isexpand }),
      () => {
        console.log(this.state.isexpand); // Ensure the updated state is logged after the update
      }
    );
  };

  renderIcon = (rowData: any, index: number) => {
    const { classes } = this.props;
    return (
      <div className={classes.spacer}>
        <Tooltip disableInteractive title={"Info"}>
          <IconButton
            className={classes.button}
            onClick={() => {
              this.setState({
                elsdata: rowData,
                isDialogOpen: true,
                isexpand: false,
              });
            }}
            size="large"
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  rendermessage = (rowData: any, index: number) => {
    //console.log(rowData)
    const { classes } = this.props;
    return (
      <div className={classes.spacer}>
        <Tooltip disableInteractive title={"Alarm Info"}>
          <IconButton
            className={classes.button}
            onClick={() => {
              this.setState({
                elsdata: rowData,
                isDialogOpen: true,
                currentdialog: "info",
                isexpand: false,
              });
            }}
            size="large"
            style={{ color: "grey" }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  };
  checkbox = (rowData: any, index: number) => {
    const isChecked =
      this.state.acklist.filter((item: any) => item.id === rowData.rowData.id)
        .length > 0;
    return (
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => this.handleCheckboxChange(e, rowData.rowData.id)}
      />
    );
  };

  // Handle checkbox state change
  handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    alarmId: string
  ) => {
    this.setState((prevState) => {
      const isChecked = event.target.checked;
      if (isChecked) {
        return {
          acklist: [...prevState.acklist, { id: alarmId }],
        };
      } else {
        return {
          acklist: prevState.acklist.filter((id: any) => id.id !== alarmId),
        };
      }
    });
  };
  render(): JSX.Element {
    // const clearAlarmsAction = {
    //   icon: Sync,
    //   tooltip: "Clear stuck alarms",
    //   ariaLabel: "clear-stuck-alarms",
    //   onClick: this.onDialogOpen,
    // };

    const refreshCurrentAlarmsAction = {
      icon: Refresh,
      tooltip: "Refresh",
      ariaLabel: "refresh",
      onClick: () => {
        this.setState({
          refreshCurrentAlarmsEditorMode:
            RefreshCurrentAlarmsDialogMode.RefreshCurrentAlarmsTable,
        });
      },
    };

    const ackCurrentAlarmsAction = {
      icon: TaskAltIcon,
      tooltip: "Ack Alarms",
      ariaLabel: "ack",
      onClick: async () => {
        if (
          this.state.acklist.length > 0 &&
          this.state.acklist.length <=
            (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({ isDialogOpen: true, currentdialog: "ack" });
        } else if (
          this.state.acklist.length >
          (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({
            isDialogOpen: true,
            currentdialog: "error",
            errormessage:
              "Input Number of alarms should be less than " +
              (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT,
          });
        }
      },
    };

    const unackCurrentAlarmsAction = {
      icon: RemoveDoneIcon,
      tooltip: "UnAck Alarms",
      ariaLabel: "ack",
      onClick: async () => {
        if (
          this.state.acklist.length > 0 &&
          this.state.acklist.length <=
            (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({ isDialogOpen: true, currentdialog: "unack" });
        } else if (
          this.state.acklist.length >
          (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({
            isDialogOpen: true,
            currentdialog: "error",
            errormessage:
              "Input Number of alarms should be less than " +
              (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT,
          });
        }
      },
    };

    const commentCurrentAlarmsAction = {
      icon: AddCommentIcon,
      tooltip: "Comment Alarms",
      ariaLabel: "ack",
      onClick: () => {
        if (
          this.state.acklist.length > 0 &&
          this.state.acklist.length <=
            (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({
            isDialogOpen: true,
            currentdialog: "comment",
          });
        } else if (
          this.state.acklist.length >
          (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({
            isDialogOpen: true,
            currentdialog: "error",
            errormessage:
              "Input Number of alarms should be less than " +
              (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT,
          });
        }
      },
    };

    const clearCurrentAlarmsAction = {
      icon: HighlightOffIcon,
      tooltip: "clear Alarms",
      ariaLabel: "clear",
      onClick: () => {
        if (
          this.state.acklist.length > 0 &&
          this.state.acklist.length <=
            (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({ isDialogOpen: true, currentdialog: "clear" });
        } else if (
          this.state.acklist.length >
          (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT
        ) {
          this.setState({
            isDialogOpen: true,
            currentdialog: "error",
            errormessage:
              "Input Number of alarms should be less than " +
              (window as any).configs.NBI_ALLOWED_ARRAY_LIMIT,
          });
        }
      },
    };

    const refreshAlarmLogAction = {
      icon: Refresh,
      tooltip: "Refresh Alarm log table",
      ariaLabel: "refresh",
      onClick: () => {
        this.setState({
          refreshAlarmLogEditorMode:
            RefreshAlarmLogDialogMode.RefreshAlarmLogTable,
        });
      },
    };

    const areFaultsAvailable =
      this.props.currentAlarmsProperties.rows &&
      this.props.currentAlarmsProperties.rows.length > 0;
    const customActions = areFaultsAvailable
      ? [
          refreshCurrentAlarmsAction,
          ackCurrentAlarmsAction,
          unackCurrentAlarmsAction,
          commentCurrentAlarmsAction,
          clearCurrentAlarmsAction,
        ]
      : [refreshCurrentAlarmsAction];

    const { panelId: activePanelId } = this.props;

    return (
      <>
        <AppBar enableColorOnDark position="static" style={{ width: "50%" }}>
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            value={activePanelId}
            onChange={this.onHandleTabChange}
            aria-label="fault-tabs"
          >
            <Tab
              aria-label="current-alarms-list-tab"
              label="Current Alarms"
              value="CurrentAlarms"
              sx={{
                display: "flex",
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "2px",
                marginBottom: "2px",
                color: "#000000de",
                backgroundColor: "#c6cbd1",
                "&.Mui-selected": {
                  color: "#ffffff",
                  backgroundColor: "#53659c",
                },
              }}
            />
            <Tab
              aria-label="alarm-notifications-list-tab"
              label={`Alarm Notifications (${this.props.faultNotifications.faults.length})`}
              value="AlarmNotifications"
              disabled={true}
              sx={{
                display: "flex",
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "2px",
                marginBottom: "2px",
                color: "#000000de",
                backgroundColor: "#c6cbd1",
                "&.Mui-selected": {
                  color: "#ffffff",
                  backgroundColor: "#53659c",
                },
              }}
            />
            <Tab
              aria-label="alarm-log-tab"
              label="Alarm Log"
              value="AlarmLog"
              sx={{
                display: "flex",
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "2px",
                marginBottom: "2px",
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
        {activePanelId === "CurrentAlarms" && (
          <>
            <FaultTable
              stickyHeader
              title={"Fault"}
              tableId="current-alarms-table"
              idProperty="id"
              customActionButtons={customActions}
              columns={[
                {
                  property: " ",
                  title: "",
                  type: ColumnType.custom,
                  width: "1%",
                  customControl: this.checkbox,
                },
                {
                  property: "sourceName",
                  title: "Node Name",
                  type: ColumnType.text,
                  width: "10%",
                },
                {
                  property: "alarmId",
                  title: "Alarm Id",
                  type: ColumnType.text,
                  width: "7%",
                },
                {
                  property: "eventSeverity",
                  title: "Severity",
                  type: ColumnType.text,
                  width: "5%",
                },
                {
                  property: "lastEpochMicrosec",
                  type: ColumnType.text,
                  title: "Timestamp",
                  width: "10%",
                },

                {
                  property: "sequence",
                  title: "Sequence",
                  type: ColumnType.text,
                  width: "5%",
                },
                {
                  property: "counter",
                  title: "Counter",
                  type: ColumnType.text,
                  width: "5%",
                },

                {
                  property: "isAlarmAcked",
                  title: "Ack Status",
                  type: ColumnType.text,
                  width: "7%",
                },

                {
                  property: "alarmInterfaceA",
                  title: "Object Id",
                  type: ColumnType.text,
                  width: "10%",
                },

                {
                  property: "Actions",
                  title: "",
                  type: ColumnType.custom,
                  width: "auto",
                  customControl: this.rendermessage,
                },
              ]}
              {...this.props.currentAlarmsProperties}
              {...this.props.currentAlarmsActions}
            />
            {this.state.currentdialog === "comment" ? (
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

                    <Card style={{ overflowX: "auto" }}>
                      <CardContent>
                        <TextField
                          variant="standard"
                          fullWidth
                          margin="dense"
                          id="message"
                          multiline
                          label="Enter Message"
                          value={this.state.message}
                          onChange={(event: any) => {
                            this.setState({ message: event.target.value });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={async () => {
                      console.log(this.state.message, this.state.elsdata);
                      const baseUri = `${window.location.origin}`;
                      const userToken = localStorage.getItem("userToken") || "";

                      let parsedToken;
                      try {
                        parsedToken = userToken ? JSON.parse(userToken) : null;
                      } catch (error) {
                        console.error("Invalid token format:", error);
                      }

                      const usernameFromToken =
                        parsedToken && parsedToken.username
                          ? parsedToken.username
                          : "";

                      const queryPromises = this.state.acklist.map(
                        (ack: any) => {
                          const existingAlarmComments =
                            this.props.currentAlarmsProperties.rows.filter(
                              (row: any) => row.id === ack.id
                            );

                          // Assuming the first element in the filtered array is the one you're interested in
                          const existingComments =
                            existingAlarmComments[0].alarmComment;
                          console.log(existingAlarmComments);

                          var message:string;
                          if(existingComments && existingComments.length > 0){
                            message = existingComments + "," + this.state.message
                          }
                          else{
                            message = this.state.message
                          }
                          // Elasticsearch script to add/update the "message" field
                          const payload = {
                            doc: {
                              event: {
                                "fault-fields": {
                                  "alarm-additional-information": {
                                    "alarm-comment": message
                                  },
                                },
                              },
                            },
                          };

                          return axios.post(
                            baseUri + `/faultcurrent-v7/_update/${ack.id}`,
                            payload
                          );
                        }
                      );
                      Promise.all(queryPromises).then((responses: any) => {
                        let errorlist: any[] = [];
                        responses.map((response: any) => {
                          if (response.status !== 200) {
                            errorlist.push({
                              id: response.data._id,
                              result: "failed",
                              message: response.statusText,
                            });
                          }
                        });
                        this.setState({ errorlist: errorlist });
                      });
                      this.setState({
                        acklist: [],
                        message: "",
                        isDialogOpen: false,
                      });
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      this.props.reloadCurrentAlarms();
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
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                      marginRight: "5%",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            ) : this.state.currentdialog === "ack" ? (
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

                    <Card style={{ overflowX: "auto" }}>
                      <CardContent>
                        <TextField
                          variant="standard"
                          fullWidth
                          margin="dense"
                          id="message"
                          multiline
                          label="Enter Message"
                          value={this.state.message}
                          onChange={(event: any) => {
                            this.setState({ message: event.target.value });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={async () => {
                      const baseUri = `${window.location.origin}`;
                      const userToken = localStorage.getItem("userToken") || "";

                      let parsedToken;
                      try {
                        parsedToken = userToken ? JSON.parse(userToken) : null;
                      } catch (error) {
                        console.error("Invalid token format:", error);
                      }

                      const usernameFromToken =
                        parsedToken && parsedToken.username
                          ? parsedToken.username
                          : "";
                      const queryPromises = this.state.acklist.map(
                        (ack: any) => {
                          const existingAlarmComments =
                            this.props.currentAlarmsProperties.rows.filter(
                              (row: any) => row.id === ack.id
                            );

                          // Assuming the first element in the filtered array is the one you're interested in
                          const existingComments =
                            existingAlarmComments[0].alarmComment;
                          console.log(existingAlarmComments);
                          var message:string;
                          if(existingComments && existingComments.length > 0){
                            message = existingComments + "," + this.state.message
                          }
                          else{
                            message = this.state.message
                          }
                          // Elasticsearch script to add/update the "message" field
                          const payload = {
                            doc: {
                              event: {
                                "fault-fields": {
                                  "alarm-additional-information": {
                                    "is-alarm-acked": true,
                                    "acked-by": usernameFromToken,
                                    "ack-updated-time": Date.now() * 1000,
                                    "alarm-comment": message
                                  },
                                },
                              },
                            },
                          };

                          return axios.post(
                            baseUri + `/faultcurrent-v7/_update/${ack.id}`,
                            payload
                          );
                        }
                      );
                      Promise.all(queryPromises).then((responses: any) => {
                        let errorlist: any[] = [];
                        responses.map((response: any) => {
                          if (response.status !== 200) {
                            errorlist.push({
                              id: response.data._id,
                              result: "failed",
                              message: response.statusText,
                            });
                          }
                        });
                        this.setState({ errorlist: errorlist });
                      });
                      this.setState({
                        acklist: [],
                        message: "",
                        isDialogOpen: false,
                      });
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      this.props.reloadCurrentAlarms();
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
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                      marginRight: "5%",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            ) : this.state.currentdialog === "unack" ? (
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

                    <Card style={{ overflowX: "auto" }}>
                      <CardContent>
                        <TextField
                          variant="standard"
                          fullWidth
                          margin="dense"
                          id="message"
                          multiline
                          label="Enter Message"
                          value={this.state.message}
                          onChange={(event: any) => {
                            this.setState({ message: event.target.value });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={async () => {
                      const baseUri = `${window.location.origin}`;
                      const userToken = localStorage.getItem("userToken") || "";

                      let parsedToken;
                      try {
                        parsedToken = userToken ? JSON.parse(userToken) : null;
                      } catch (error) {
                        console.error("Invalid token format:", error);
                      }

                      const usernameFromToken =
                        parsedToken && parsedToken.username
                          ? parsedToken.username
                          : "";
                      const queryPromises = this.state.acklist.map(
                        (ack: any) => {
                          const existingAlarmComments =
                            this.props.currentAlarmsProperties.rows.filter(
                              (row: any) => row.id === ack.id
                            );

                          // Assuming the first element in the filtered array is the one you're interested in
                          const existingComments =
                            existingAlarmComments[0].alarmComment;
                          console.log(existingAlarmComments);
                          var message:string;
                          if(existingComments && existingComments.length > 0){
                            message = existingComments + "," + this.state.message
                          }
                          else{
                            message = this.state.message
                          }
                          // Elasticsearch script to add/update the "message" field
                          const payload = {
                            doc: {
                              event: {
                                "fault-fields": {
                                  "alarm-additional-information": {
                                    "is-alarm-acked": false,
                                    "acked-by": usernameFromToken,
                                    "ack-updated-time": Date.now() * 1000,
                                    "alarm-comment": message
                                  },
                                },
                              },
                            },
                          };

                          return axios.post(
                            baseUri + `/faultcurrent-v7/_update/${ack.id}`,
                            payload
                          );
                        }
                      );
                      Promise.all(queryPromises).then((responses: any) => {
                        let errorlist: any[] = [];
                        responses.map((response: any) => {
                          if (response.status !== 200) {
                            errorlist.push({
                              id: response.data._id,
                              result: "failed",
                              message: response.statusText,
                            });
                          }
                        });
                        this.setState({ errorlist: errorlist });
                      });
                      this.setState({
                        acklist: [],
                        message: "",
                        isDialogOpen: false,
                      });
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      this.props.reloadCurrentAlarms();
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
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                      marginRight: "5%",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            ) : this.state.currentdialog === "clear" ? (
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

                    <Card style={{ overflowX: "auto" }}>
                      <CardContent>
                        <TextField
                          variant="standard"
                          fullWidth
                          margin="dense"
                          id="message"
                          multiline
                          label="Enter Message"
                          value={this.state.message}
                          onChange={(event: any) => {
                            this.setState({ message: event.target.value });
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={async () => {
                      const baseUri = `${window.location.origin}`;
                      const userToken = localStorage.getItem("userToken") || "";

                      let parsedToken;
                      try {
                        parsedToken = userToken ? JSON.parse(userToken) : null;
                      } catch (error) {
                        console.error("Invalid token format:", error);
                      }

                      const usernameFromToken =
                        parsedToken && parsedToken.username
                          ? parsedToken.username
                          : "";
                      const queryPromises = this.state.acklist.map(
                        async(ack: any) => {
                          const existingAlarmComments =
                            this.props.currentAlarmsProperties.rows.filter(
                              (row: any) => row.id === ack.id
                            );

                          // Assuming the first element in the filtered array is the one you're interested in
                          const existingComments =
                            existingAlarmComments[0].alarmComment;
                          console.log(existingAlarmComments[0].alarmComment, this.state.message);
                          var message:string;
                          if(existingComments && existingComments.length > 0){
                            message = existingComments + "," + this.state.message
                          }
                          else{
                            message = this.state.message
                          }
                          
                          const res= await axios.get(
                            baseUri + `/faultcurrent-v7/_doc/${ack.id}`, 
                          );
                          const tobemodified = res?.data?._source
                          if(tobemodified){
                            tobemodified.event["fault-fields"]["alarm-additional-information"]["device-cleared"] = false
                            tobemodified.event["fault-fields"]["alarm-additional-information"]["cleared-by"] = usernameFromToken
                            tobemodified.event["fault-fields"]["alarm-additional-information"]["alarm-comment"] = message
                            tobemodified.event["fault-fields"]["event-severity"] = "NonAlarmed"
                            tobemodified.event["fault-fields"]["alarm-additional-information"]["alarm-action"] = "CLEAR"
                            tobemodified.event["common-event-header"]["last-epoch-microsec"] = Date.now() * 1000
                            console.log(tobemodified);
                            await axios.post(baseUri + `/faultlog-v7/_doc`,tobemodified)
                            return axios.delete(baseUri + `/faultcurrent-v7/_doc/${ack.id}`);
                          }
                          else{
                            return null;
                          }
                          
                        }
                        
                      );
                      Promise.all(queryPromises).then((responses: any) => {
                        let errorlist: any[] = [];
                        responses.map((response: any) => {
                          if (response.status !== 200) {
                            errorlist.push({
                              id: response.data._id,
                              result: "failed",
                              message: response.statusText,
                            });
                          }
                        });
                        this.setState({ errorlist: errorlist });
                      });
                      this.setState({
                        acklist: [],
                        message: "",
                        isDialogOpen: false,
                      });
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      this.props.reloadCurrentAlarms();
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
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                      marginRight: "5%",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            ) : this.state.currentdialog === "info" ? (
              <Dialog
                open={this.state.isDialogOpen}
                onClose={() => this.setState({ isDialogOpen: false })}
                PaperProps={{
                  style: {
                    minHeight: "23vh",
                    minWidth: "50vw",
                    height: this.state.isexpand ? "60vh" : "30vh",
                    border: "4px solid #38456a",
                    borderRadius: "5px",
                    backgroundColor: "#e8e8e8",
                    overflow: "hidden",
                  },
                }}
              >
                <DialogContent>
                  <div
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                    }}
                  >
                    <Card
                      style={{
                        overflow: "auto",
                        width: "100%",
                        maxHeight: "100%",
                      }}
                    >
                      <CardContent
                        style={{
                          width: "100%",
                          maxHeight: "100%",
                        }}
                      >
                        <pre
                          style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {typeof this.state.elsdata?.rowData === "object" ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                  {
                                    ...this.state.elsdata?.rowData,
                                    alarmComment: this.state.elsdata?.rowData
                                      ?.alarmComment
                                      ? this.state.elsdata?.rowData.alarmComment.replace(
                                          /,/g,
                                          "<br/>    "
                                        ) // Replace commas with HTML <br/> tags
                                      : "",
                                  },
                                  null,
                                  2
                                ),
                              }}
                            ></span>
                          ) : (
                            this.state.elsdata?.rowData
                          )}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Tooltip disableInteractive title={"Copy To ClipBoard"}>
                    <ContentCopyIcon
                      style={{ paddingRight: "5px" }}
                      onClick={() => {
                        // Replace this with the actual text you want to copy
                        navigator.clipboard
                          .writeText(
                            JSON.stringify(this.state.elsdata?.rowData, null, 2)
                          )
                          .then(() => {})
                          .catch((err) => {
                            console.error("Failed to copy text: ", err);
                          });
                      }}
                    />
                  </Tooltip>

                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Close
                  </Button>
                  {this.state.isexpand ? (
                    <Tooltip disableInteractive title={"Expand Less"}>
                      <ExpandLessIcon onClick={this.toggleExpand} />
                    </Tooltip>
                  ) : (
                    <Tooltip disableInteractive title={"Expand More"}>
                      <ExpandMoreIcon onClick={this.toggleExpand} />
                    </Tooltip>
                  )}
                </DialogActions>
              </Dialog>
            ) : this.state.currentdialog === "error" ? (
              <Dialog
                open={this.state.isDialogOpen}
                onClose={() => this.setState({ isDialogOpen: false })}
                PaperProps={{
                  style: {
                    minHeight: "23vh",
                    minWidth: "50vw",
                    height: this.state.isexpand ? "60vh" : "30vh",
                    border: "4px solid #38456a",
                    borderRadius: "5px",
                    backgroundColor: "#e8e8e8",
                    overflow: "hidden",
                  },
                }}
              >
                <DialogContent>
                  <div
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                    }}
                  >
                    <Card
                      style={{
                        overflow: "auto",
                        width: "100%",
                        maxHeight: "100%",
                      }}
                    >
                      <CardContent
                        style={{
                          width: "100%",
                          maxHeight: "100%",
                        }}
                      >
                        <div>
                          <p>{this.state.errormessage}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            ) : null}
            <RefreshCurrentAlarmsDialog
              mode={this.state.refreshCurrentAlarmsEditorMode}
              onClose={this.onCloseRefreshCurrentAlarmsDialog}
            />
          </>
        )}
        {activePanelId === "AlarmNotifications" && (
          <>
            <FaultAlarmNotificationTable
              stickyHeader
              title={"Fault"}
              tableId="alarm-notifications-table"
              idProperty="id"
              defaultSortColumn="timeStamp"
              defaultSortOrder="desc"
              rows={this.props.faultNotifications.faults}
              asynchronus
              columns={[
                {
                  property: "severity",
                  title: "Severity",
                  width: "140px",
                  type: ColumnType.text,
                },
                {
                  property: "timeStamp",
                  title: "Timestamp",
                  type: ColumnType.text,
                },
                {
                  property: "nodeName",
                  title: "Node Name",
                  type: ColumnType.text,
                },
                {
                  property: "counter",
                  title: "Count",
                  width: "100px",
                  type: ColumnType.numeric,
                },
                {
                  property: "objectId",
                  title: "Object Id",
                  type: ColumnType.text,
                },
                {
                  property: "problem",
                  title: "Alarm Type",
                  type: ColumnType.text,
                },
                {
                  property: "Action",
                  title: "",
                  type: ColumnType.custom,
                  customControl: this.renderIcon,
                },
              ]}
            />
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
                      <Card>
                        <CardContent>
                          <div>
                            <strong>Severity:</strong>{" "}
                            {this.state.elsdata.rowData.severity}
                          </div>
                          <div>
                            <strong>Time Stamp:</strong>{" "}
                            {this.state.elsdata.rowData.timestamp}
                          </div>
                          <div>
                            <strong>Node Name:</strong>{" "}
                            {this.state.elsdata.rowData.nodeId}
                          </div>
                          <div>
                            <strong>Counter:</strong>{" "}
                            {this.state.elsdata.rowData.counter}
                          </div>
                          <div>
                            <strong>Object Id:</strong>{" "}
                            {this.state.elsdata.rowData.objectId}
                          </div>
                          <div>
                            <strong>Alarm Type:</strong>{" "}
                            {this.state.elsdata.rowData.problem}
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
          </>
        )}

        {activePanelId === "AlarmLog" && (
          <>
            <FaultTable
              stickyHeader
              idProperty={"uniqueId"}
              title={"Fault"}
              tableId="alarm-log-table"
              customActionButtons={[refreshAlarmLogAction]}
              columns={[
                
                
                { property: "sourceName", title: "Node Name", width: "8%" },
                {
                  property: "alarmId",
                  title: "Alarm Id",
                  type: ColumnType.text,
                  width: "7%",
                },
                { property: "eventSeverity", title: "Severity", width: "8%" },
                {
                  property: "lastEpochMicrosec",
                  title: "Timestamp",
                  width: "10%",
                },
               
                {
                  property: "sequence",
                  title: "Sequence",
                  type: ColumnType.text,
                  width: "5%",
                },
                {
                  property: "alarmInterfaceA",
                  title: "Object Id",
                  width: "auto",
                },
                {
                  property: "specificProblem",
                  title: "Alarm Details",
                  width: "auto",
                },
                { property: "eventSourceType", title: "Source", width: "5%" },
                {
                  property: "Action",
                  title: "",
                  type: ColumnType.custom,
                  width: "5%",
                  customControl: this.renderIcon,
                },
              ]}
              {...this.props.alarmLogEntriesProperties}
              {...this.props.alarmLogEntriesActions}
            />
            {this.state.elsdata && this.state.elsdata != null ? (
              <Dialog
                open={this.state.isDialogOpen}
                onClose={() => this.setState({ isDialogOpen: false })}
                PaperProps={{
                  style: {
                    minHeight: "23vh",
                    minWidth: "50vw",
                    height: this.state.isexpand ? "60vh" : "30vh",
                    border: "4px solid #38456a",
                    borderRadius: "5px",
                    backgroundColor: "#e8e8e8",
                    overflow: "hidden",
                  },
                }}
              >
                <DialogContent>
                  <div
                    style={{
                      width: "100%",
                      maxHeight: "100%",
                    }}
                  >
                    <Card
                      style={{
                        overflow: "auto",
                        width: "100%",
                        maxHeight: "100%",
                      }}
                    >
                      <CardContent
                        style={{
                          width: "100%",
                          maxHeight: "100%",
                        }}
                      >
                        <pre
                          style={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {typeof this.state.elsdata?.rowData === "object" ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                  {
                                    ...this.state.elsdata?.rowData,
                                    alarmComment: this.state.elsdata?.rowData
                                      ?.alarmComment
                                      ? this.state.elsdata?.rowData.alarmComment.replace(
                                          /,/g,
                                          "<br/>    "
                                        ) // Replace commas with HTML <br/> tags
                                      : "",
                                  },
                                  null,
                                  2
                                ),
                              }}
                            ></span>
                          ) : (
                            this.state.elsdata?.rowData
                          )}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Tooltip disableInteractive title={"Copy To ClipBoard"}>
                    <ContentCopyIcon
                      style={{ paddingRight: "5px" }}
                      onClick={() => {
                        // Replace this with the actual text you want to copy
                        navigator.clipboard
                          .writeText(
                            JSON.stringify(this.state.elsdata?.rowData, null, 2)
                          )
                          .then(() => {})
                          .catch((err) => {
                            console.error("Failed to copy text: ", err);
                          });
                      }}
                    />
                  </Tooltip>

                  <Button
                    style={{
                      backgroundColor: "white",
                      color: "#38761d",
                      border: "1px solid #2986cc",
                      borderRadius: "4px",
                      padding: "3px 6px",
                    }}
                    onClick={() => this.setState({ isDialogOpen: false })}
                  >
                    Close
                  </Button>
                  {this.state.isexpand ? (
                    <Tooltip disableInteractive title={"Expand Less"}>
                      <ExpandLessIcon onClick={this.toggleExpand} />
                    </Tooltip>
                  ) : (
                    <Tooltip disableInteractive title={"Expand More"}>
                      <ExpandMoreIcon onClick={this.toggleExpand} />
                    </Tooltip>
                  )}
                </DialogActions>
              </Dialog>
            ) : null}
            <RefreshAlarmLogDialog
              mode={this.state.refreshAlarmLogEditorMode}
              onClose={this.onCloseRefreshAlarmLogDialog}
            />
          </>
        )}
        {this.state.clearAlarmDialogMode !==
          ClearStuckAlarmsDialogMode.None && (
          <ClearStuckAlarmsDialog
            mode={this.state.clearAlarmDialogMode}
            numberDevices={this.state.stuckAlarms.length}
            stuckAlarms={this.state.stuckAlarms}
            onClose={this.onDialogClose}
          />
        )}
      </>
    );
  }

  public componentDidMount() {
    
    if (this.props.panelId === null) {
      //set default tab if none is set
      this.onToggleTabs("CurrentAlarms");
    } else {
      this.onToggleTabs(this.props.panelId);
    }
    if (this.props.panelId === "CurrentAlarms") {
      
      this.interval = setInterval(() => {
        this.props.currentAlarmsActions.onRefresh(); // This function is called every 1 second
      }, 10000);
    }
    if (this.props.panelId === "AlarmLog") {
      
      this.interval = setInterval(() => {
        this.props.alarmLogEntriesActions.onRefresh(); // This function is called every 1 second
      }, 10000);
    }
  }

  // private renderIcon = (props: { rowData: Fault | FaultAlarmNotification }) => {
  //   return (
  //     <FontAwesomeIcon icon={faExclamationTriangle} />
  //   );
  // };

  public componentDidUpdate(
    prevProps: Readonly<FaultApplicationComponentProps>,
    prevState: Readonly<FaultApplicationState>
  ): void {
    if (
      prevProps.panelId !== this.props.panelId &&
      this.props.panelId === "CurrentAlarms"
    ) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.props.currentAlarmsActions.onRefresh(); // This function is called every 1 second
      }, 10000);
    }
    if (
      prevProps.panelId !== this.props.panelId &&
      this.props.panelId === "AlarmLog"
    ) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.props.alarmLogEntriesActions.onRefresh(); // This function is called every 1 second
      }, 10000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval); // Cleanup to avoid memory leaks
  }

  private onCloseRefreshAlarmLogDialog = () => {
    this.setState({
      refreshAlarmLogEditorMode: RefreshAlarmLogDialogMode.None,
    });
  };

  private onCloseRefreshCurrentAlarmsDialog = () => {
    this.setState({
      refreshCurrentAlarmsEditorMode: RefreshCurrentAlarmsDialogMode.None,
    });
  };
}

export const FaultApplication = withStyles(styles)(
  connect(mapProps, mapDisp)(FaultApplicationComponent)
);
export default FaultApplication;
