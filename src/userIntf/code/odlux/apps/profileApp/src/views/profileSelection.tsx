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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Theme,
  Tooltip,
} from "@mui/material";

import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/FileDownload";

import { IApplicationStoreState } from "../../../../framework/src/store/applicationStore";
import {
  connect,
  IDispatcher,
  Connect,
} from "../../../../framework/src/flux/connect";
import MaterialTable, {
  MaterialTableCtorType,
  ColumnType,
} from "../../../../framework/src/components/material-table";

import {
  createAvaliableprofileServersProperties,
  createAvaliableprofileServersActions,
} from "../handlers/avaliableProfileServersHandler";

import { profilesdata } from "../models/profileServer";
import EditprofileServerDialog, {
  EditprofileServerDialogMode,
} from "../components/editProfileServerDialog";
import RefreshprofileDialog, {
  RefreshprofileDialogMode,
} from "../components/refreshprofileDialog";
import { NavigateToApplication } from "../../../../framework/src/actions/navigationActions";
import axios from "axios";
import { WarningOutlined } from "@mui/icons-material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
const ProfileServersTable =
  MaterialTable as MaterialTableCtorType<profilesdata>;

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

const mapProps = (state: IApplicationStoreState) => ({
  profileServersProperties: createAvaliableprofileServersProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  profileServersActions: createAvaliableprofileServersActions(
    dispatcher.dispatch
  ),
  selectprofileServer: (profileServerId: string) =>
    profileServerId &&
    dispatcher.dispatch(new NavigateToApplication("profile", profileServerId)),
});

const emptyprofileServer: profilesdata = {
  id: "",
  File: null,
  ProfileName: "",
  FileName: "",
  FilePath: "",
  PNFID: "",
  DeviceType: "",
  oldfilename:""
};

type profileServerSelectionComponentProps = Connect<
  typeof mapProps,
  typeof mapDispatch
> &
  WithStyles<typeof styles>;

type profileServerSelectionComponentState = {
  profileServerToEdit: profilesdata;
  profileServerEditorMode: EditprofileServerDialogMode;
  refreshprofileEditorMode: RefreshprofileDialogMode;
  SaveSucesopen: boolean;
  Sucessmsg: string;
  savedialogTitle: string;
};

let initialSorted = false;

class profileServerSelectionComponent extends React.Component<
  profileServerSelectionComponentProps,
  profileServerSelectionComponentState
> {
  constructor(props: profileServerSelectionComponentProps) {
    super(props);

    this.state = {
      profileServerEditorMode: EditprofileServerDialogMode.None,
      profileServerToEdit: emptyprofileServer,
      refreshprofileEditorMode: RefreshprofileDialogMode.None,
      SaveSucesopen: false,
      Sucessmsg: "",
      savedialogTitle: "",
    };
  }
  public handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ SaveSucesopen: false });
  };

  render() {
    <></>;
    const { classes } = this.props;
    const refreshprofileAction = {
      icon: Refresh,
      tooltip: "Refresh profile Server Table",
      ariaLabel: "refresh",
      onClick: () => {
        this.setState({
          refreshprofileEditorMode:
            RefreshprofileDialogMode.RefreshprofileTable,
        });
      },
    };

    const addprofileServerActionButton = {
      icon: AddIcon,
      tooltip: "Add New profiles",
      ariaLabel: "add-element",
      onClick: () => {
        this.setState({
          profileServerEditorMode: EditprofileServerDialogMode.AddprofileServer,
          profileServerToEdit: emptyprofileServer,
        });
      },
    };
    return (
      <>
        <Dialog
          open={this.state.SaveSucesopen}
          onClose={this.handleSaveSecessClose}
          PaperProps={{
            style: {
              minHeight: "10vh",
              minWidth: "23vw",
              border: "14px solid #38456a",
              borderRadius: "15px",
              backgroundColor: "#e8e8e8",
            },
          }}
        >
          <DialogContent
            style={{ alignContent: "center", textAlign: "center" }}
          >
            {/* <IconButton style={{ color: savedialogTitle == "Success" ? '#008000' : 'red', textAlign: "center" }}> <CheckCircleOutlineRoundedIcon /> <h6 style={{ marginLeft: '3px', color: savedialogTitle == "Success" ? '#008000' : 'red', textAlign: "center" }}>{Sucessmsg}</h6> </IconButton> */}
            <IconButton style={{ textAlign: "center" }}>
              {this.state.savedialogTitle === "Success" ? (
                <>
                  <CheckCircleOutlineRoundedIcon style={{ color: "#008000" }} />
                  <h6
                    style={{
                      marginLeft: "3px",
                      color: "#008000",
                      textAlign: "center",
                    }}
                  >
                    {this.state.Sucessmsg}
                  </h6>
                </>
              ) : (
                <>
                  <WarningOutlined style={{ color: "orange" }} />
                  <h6
                    style={{
                      marginLeft: "3px",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    {this.state.Sucessmsg}
                  </h6>
                </>
              )}
            </IconButton>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(event: any) => {
                event.preventDefault();
                event.stopPropagation();
                this.setState({ SaveSucesopen: false });
              }}
              style={{
                backgroundColor: "white",
                color: "#38761d",
                border: "1px solid #2986cc",
                borderRadius: "1px",
                padding: "3px 6px",
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <ProfileServersTable
          stickyHeader
          title={"NF Profiles"}
          tableId={null}
          customActionButtons={[
            refreshprofileAction,
            addprofileServerActionButton,
          ]}
          idProperty={"id"}
          {...this.props.profileServersActions}
          {...this.props.profileServersProperties}
          columns={[
            //  { property: "id", title: "ID", type: ColumnType.text },
            {
              property: "ProfileName",
              title: "Profile Name",
              type: ColumnType.text,
            },
            {
              property: "DeviceType",
              title: "Device Type",
              type: ColumnType.text,
            },
           
            { property: "FileName", title: "File Name", type: ColumnType.text },
            // { property: "PNFID", title: "PNFID", type: ColumnType.text },
            {
              property: "actions",
              title: "Actions",
              type: ColumnType.custom,
              customControl: ({ rowData }) => (
                <div className={classes.spacer}>
                  <Tooltip disableInteractive title={"Edit"}>
                    <IconButton
                      className={classes.button}
                      onClick={(event) => {
                        this.onEditprofileServer(event, rowData);
                      }}
                      size="large"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip disableInteractive title={"Download"}>
                    <IconButton
                      className={classes.button}
                      onClick={(event) => {
                        this.onDownloadprofileServer(event, rowData);
                      }}
                      size="large"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip disableInteractive title={"Remove"}>
                    <IconButton
                      className={classes.button}
                      onClick={(event) => {
                        this.onRemoveprofileServer(event, rowData);
                      }}
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ),
            },
          ]}
          onHandleClick={this.onSelectprofileServer}
        />
        <EditprofileServerDialog
          profiles={this.state.profileServerToEdit}
          mode={this.state.profileServerEditorMode}
          onClose={this.onCloseEditprofileServerDialog}
        />
        <RefreshprofileDialog
          mode={this.state.refreshprofileEditorMode}
          onClose={this.onCloseRefreshprofileDialog}
        />
      </>
    );
  }

  public componentDidMount() {
    if (!initialSorted) {
      initialSorted = true;
      this.props.profileServersActions.onHandleRequestSort("ProfileName");
    } else {
      this.props.profileServersActions.onRefresh();
    }
  }

  private onSelectprofileServer = (
    event: React.MouseEvent<HTMLElement>,
    server: profilesdata
  ) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.selectprofileServer(server && server.ProfileName);
  };

  private onEditprofileServer = async(
    event: React.MouseEvent<HTMLElement>,
    server: profilesdata
  ) => {
    console.log(server)
    event.preventDefault();
    event.stopPropagation();
    const baseuri = window.location.origin;
    let count = 10;
    try{
      const res = await axios.get(baseuri + "/pre_provider/_count");
      count = res.data.count;
    }
    catch(Error){

    }
    try {

      const preproviderres = await axios.get(baseuri + "/pre_provider/_search?size="+count);
      const mappedprofile = preproviderres.data.hits.hits.filter(
        (mapped: any) => mapped._source.PREPROVIDER_CONF === server.ProfileName
      );
      
      if (mappedprofile.length > 0) {
        this.setState({ SaveSucesopen: true });
        this.setState({
          Sucessmsg:
            "Profile is mapped to PNFID - " +
            mappedprofile[0]._source.PNFID 
        });
        this.setState({ savedialogTitle: "Warning" });
        
      } else {
        this.setState({
          profileServerEditorMode:
            EditprofileServerDialogMode.EditprofileServer,
          profileServerToEdit: server,
        });
      }
    } catch (Error) {}
    
  };

  private onDownloadprofileServer = (
    event: React.MouseEvent<HTMLElement>,
    server: profilesdata
  ) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      profileServerEditorMode:
        EditprofileServerDialogMode.DownloadprofileServer,
      profileServerToEdit: server,
    });
  };

  private onRemoveprofileServer = async (
    event: React.MouseEvent<HTMLElement>,
    server: profilesdata
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const baseuri = window.location.origin;
    let count = 10;
    try{
      const res = await axios.get(baseuri + "/pre_provider/_count");
      count = res.data.count;
    }
    catch(Error){

    }
    try {

      const preproviderres = await axios.get(baseuri + "/pre_provider/_search?size="+count);
      const mappedprofile = preproviderres.data.hits.hits.filter(
        (mapped: any) => mapped._source.PREPROVIDER_CONF === server.ProfileName
      );
      
      if (mappedprofile.length > 0) {
        this.setState({ SaveSucesopen: true });
        this.setState({
          Sucessmsg:
            "Profile is mapped to PNFID - " +
            mappedprofile[0]._source.PNFID 
        });
        this.setState({ savedialogTitle: "Warning" });
      } else {
        this.setState({
          profileServerEditorMode:
            EditprofileServerDialogMode.RemoveprofileServer,
          profileServerToEdit: server,
        });
      }
    } catch (Error) {}
  };

  private onCloseEditprofileServerDialog = () => {
    this.setState({
      profileServerEditorMode: EditprofileServerDialogMode.None,
      profileServerToEdit: emptyprofileServer,
    });
  };
  private onCloseRefreshprofileDialog = () => {
    this.setState({
      refreshprofileEditorMode: RefreshprofileDialogMode.None,
    });
  };
}

export const profileServerSelection = withStyles(styles)(
  connect(mapProps, mapDispatch)(profileServerSelectionComponent)
);
export default profileServerSelection;
