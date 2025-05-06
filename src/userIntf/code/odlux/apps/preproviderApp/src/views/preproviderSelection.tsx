/***
 * ################################################################################################
 * #                                                                                              #
 * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
 * #                                                                                              #
 * ################################################################################################
 ****/

import React from "react";
import { Theme, Tooltip } from "@mui/material";

import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { WarningOutlined } from "@mui/icons-material";
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
  createAvaliablepreproviderServersProperties,
  createAvaliablepreproviderServersActions,
} from "../handlers/avaliablepreproviderServersReloadAction";

import { providerdata } from "../models/preproviderServer";
import EditpreproviderServerDialog, {
  EditpreproviderServerDialogMode,
} from "../components/editPreproviderServerDialog";
import RefreshpreproviderDialog, {
  RefreshpreproviderDialogMode,
} from "../components/refreshpreproviderDialog";
import { NavigateToApplication } from "../../../../framework/src/actions/navigationActions";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { profile } from "console";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Loader } from "../../../../framework/src/components/material-ui/loader";
import { ThreeCircles } from "react-loader-spinner";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const PreproviderServersTable =
  MaterialTable as MaterialTableCtorType<providerdata>;

interface ElasticsearchData {
  _id: string;
  _source: {
    [key: string]: any;
  };
}

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
  preproviderServersProperties:
    createAvaliablepreproviderServersProperties(state),
});

const mapDispatch = (dispatcher: IDispatcher) => ({
  preproviderServersActions: createAvaliablepreproviderServersActions(
    dispatcher.dispatch
  ),
  //selectpreproviderServer: (preproviderServerId: string) => preproviderServerId && dispatcher.dispatch(new NavigateToApplication("preprovider", preproviderServerId)),
});

const emptypreproviderServer: providerdata = {
  //id: "",
  DeviceType: "",
  PNFID: "",
  IP_ADDRESS: "",
  PORT_NUMBER: "",
  USERNAME: "",
  PASSWORD: "",
  PREPROVIDER_CONF: "",
  FILENAME: "",
  oldPNFID: "",
  oldip: "",
  oldport: "",
  SSHKey: "",
};

type preproviderServerSelectionComponentProps = Connect<
  typeof mapProps,
  typeof mapDispatch
> &
  WithStyles<typeof styles>;

type preproviderServerSelectionComponentState = {
  preproviderServerToEdit: providerdata;
  preproviderServerEditorMode: EditpreproviderServerDialogMode;
  refreshpreproviderEditorMode: RefreshpreproviderDialogMode;
  rowdata: any;
  validPNFID: boolean;
  validIP_ADDRESS: boolean;
  validPORT_NUMBER: boolean;
  validUSERNAME: boolean;
  validPASSWORD: boolean;
  validPREPROVIDERCONF: boolean;
  validatedIP_ADDRESS: boolean;
  profiles: any;
  Sucessmsg: string;
  SaveSucesopen: boolean;
  nodes: any;
  savedialogTitle: any;
  duplicatenode: boolean;
  duplicaterow: boolean;
  csvdata: any;
  isloading: boolean;
  dialogstring: string;
  validSSH: boolean;
};

let initialSorted = false;

class preproviderServerSelectionComponent extends React.Component<
  preproviderServerSelectionComponentProps,
  preproviderServerSelectionComponentState
> {
  constructor(props: preproviderServerSelectionComponentProps) {
    super(props);

    this.state = {
      preproviderServerEditorMode: EditpreproviderServerDialogMode.None,
      preproviderServerToEdit: emptypreproviderServer,
      refreshpreproviderEditorMode: RefreshpreproviderDialogMode.None,
      rowdata: null,
      validPNFID: true,
      validIP_ADDRESS: true,
      validPORT_NUMBER: true,
      validUSERNAME: true,
      validPASSWORD: true,
      validPREPROVIDERCONF: true,
      validatedIP_ADDRESS: true,
      profiles: null,
      Sucessmsg: "",
      SaveSucesopen: false,
      nodes: null,
      savedialogTitle: "",
      duplicatenode: false,
      duplicaterow: false,
      csvdata: null,
      isloading: false,
      dialogstring: "",
      validSSH: true,
    };
    //this.fetchpreprovider();
  }
  // fetchpreprovider = async () => {
  //   try {
  //     const baseUri = `${window.location.origin}`;
  //     let count =10;
  //     try{
  //       await axios.get(baseUri+'/pre_provider/_count').then((res:any)=>{
  //         count = res.data.count
  //       })
  //     }
  //     catch(Error){

  //     }
  //     const response = await axios.get(`${baseUri}/pre_provider/_search?size=`+count);

  //     const nodes = response.data.hits.hits.map((hit: any) => ({
  //       PNFID: hit._source.PNFID,
  //       IP_ADDRESS: hit._source.IP_ADDRESS,
  //       PORT_NUMBER: hit._source.PORT_NUMBER,
  //       USERNAME: hit._source.USERNAME,
  //       PASSWORD: hit._source.PASSWORD,
  //       PREPROVIDER_CONF: hit._source.PREPROVIDER_CONF,
  //       FILENAME: hit._source.FILENAME,
  //     }));
  //     this.setState({ nodes: nodes });
  //   } catch (error) {
  //     console.error("Error fetching Nodes:", error);
  //   }
  // };
  handleSaveSecessClose = (event: any, reason: string) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ SaveSucesopen: false });
  };

  render() {
    const { classes } = this.props;
    const refreshpreproviderAction = {
      icon: Refresh,
      tooltip: "Refresh preprovider Server Table",
      ariaLabel: "refresh",
      onClick: () => {
        this.setState({
          refreshpreproviderEditorMode:
            RefreshpreproviderDialogMode.RefreshpreproviderTable,
        });
      },
    };

    const addpreproviderServerActionButton = {
      icon: AddIcon,
      tooltip: "Add New profiles",
      ariaLabel: "add-element",
      onClick: () => {
        this.setState({
          preproviderServerEditorMode:
            EditpreproviderServerDialogMode.AddpreproviderServer,
          preproviderServerToEdit: emptypreproviderServer,
        });
      },
    };

    const exportpreproviderServerActionButton = {
      icon: UploadFileIcon,
      tooltip: "Export Config Details",
      ariaLabel: "export-element",
      onClick: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";
        input.style.display = "none";
        input.addEventListener("change", (event) => {
          const target = event.target as HTMLInputElement;
          const file = target.files && target.files[0];
          if (file) {
            // Read the contents of the CSV file
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target) {
                const csvContent = e.target.result as string;
                this.validateFile(csvContent);
              }
            };
            reader.readAsText(file);
          }
        });

        // Trigger file input click
        input.click();
      },
    };

    const importpreproviderServerActionButton = {
      icon: FileDownloadIcon,
      tooltip: "Import Config Details",
      ariaLabel: "import-element",
      onClick: () => {
        this.handleImport();
      },
    };
    return (
      <>
        <div>
          {this.state.isloading && (
            <>
              <Dialog open={this.state.isloading}>
                <div
                  style={{
                    position: "fixed",
                    color: "white",
                    opacity: "0.8",
                    top: "0",
                    left: "0",
                    zIndex: "998",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      color: "white",
                      transform: "translate(-50%, -50%)",
                      opacity: ".8",
                      zIndex: "1000",
                    }}
                  >
                    <Loader />
                    <ThreeCircles
                      visible={true}
                      height="100"
                      width="100"
                      color="white"
                      ariaLabel="three-circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                </div>
              </Dialog>
              <h1 style={{ margin: "auto", color: "green" }}>
                {" "}
                {this.state.dialogstring}
              </h1>
            </>
          )}

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
                    <CheckCircleOutlineRoundedIcon
                      style={{ color: "#008000" }}
                    />
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
                onClick={(event) => {
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
        </div>
        <PreproviderServersTable
          stickyHeader
          title={"NF Provisioning"}
          tableId={null}
          customActionButtons={[
            refreshpreproviderAction,
            addpreproviderServerActionButton,
            exportpreproviderServerActionButton,
            importpreproviderServerActionButton,
          ]}
          idProperty={"PNFID"}
          {...this.props.preproviderServersActions}
          {...this.props.preproviderServersProperties}
          columns={[
            {
              property: "DeviceType",
              title: "Device Type",
              type: ColumnType.text,
            },
            { property: "PNFID", title: "Node ID", type: ColumnType.text },
            {
              property: "IP_ADDRESS",
              title: "IP Address",
              type: ColumnType.text,
            },
            { property: "USERNAME", title: "Username", type: ColumnType.text },
            {
              property: "PREPROVIDER_CONF",
              title: "NF Profile",
              type: ColumnType.text,
            },

            {
              property: "PORT_NUMBER",
              title: "Netconf Port",
              type: ColumnType.text,
            },
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
                        this.onEditpreproviderServer(event, rowData),
                          this.setState({ rowdata: rowData });
                      }}
                      size="large"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip disableInteractive title={"Remove"}>
                    <IconButton
                      className={classes.button}
                      onClick={(event) => {
                        this.onRemovepreproviderServer(event, rowData);
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
          onHandleClick={this.onSelectpreproviderServer}
        />
        <EditpreproviderServerDialog
          preprovider={this.state.preproviderServerToEdit}
          mode={this.state.preproviderServerEditorMode}
          onClose={this.onCloseEditpreproviderServerDialog}
          rowdata={this.state.rowdata}
        />
        <RefreshpreproviderDialog
          mode={this.state.refreshpreproviderEditorMode}
          onClose={this.onCloseRefreshpreproviderDialog}
        />
      </>
    );
  }

  public componentDidMount() {
    if (!initialSorted) {
      initialSorted = true;
      this.props.preproviderServersActions.onHandleRequestSort("PNFID");
    } else {
      this.props.preproviderServersActions.onRefresh();
    }
  }

  private onSelectpreproviderServer = (
    event: React.MouseEvent<HTMLElement>,
    server: providerdata
  ) => {
    event.preventDefault();
    event.stopPropagation();
    //this.props.selectpreproviderServer(server && server.PNFID);
  };

  private onEditpreproviderServer = async (
    event: React.MouseEvent<HTMLElement>,
    server: providerdata
  ) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const baseuri = window.location.origin;
      const networkdata = await axios.get(
        baseuri + "/networkelement-connection-v7/_doc/" + server.PNFID
      );
      if (networkdata?.data) {
        this.setState({
          SaveSucesopen: true,
          Sucessmsg: "Selected - " + server.PNFID + " is provisioned",
          savedialogTitle: "Warning",
        });
      }
    } catch (Error) {
      this.setState({
        preproviderServerEditorMode:
          EditpreproviderServerDialogMode.EditpreproviderServer,
        preproviderServerToEdit: server,
      });
    }
  };
  private onRemovepreproviderServer = async (
    event: React.MouseEvent<HTMLElement>,
    server: providerdata
  ) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const baseuri = window.location.origin;
      const networkdata = await axios.get(
        baseuri + "/networkelement-connection-v7/_doc/" + server.PNFID
      );
      if (networkdata?.data) {
        this.setState({
          SaveSucesopen: true,
          Sucessmsg: "Selected - " + server.PNFID + " is provisioned",
          savedialogTitle: "Warning",
        });
      }
    } catch (Error) {
      this.setState({
        preproviderServerEditorMode:
          EditpreproviderServerDialogMode.RemovepreproviderServer,
        preproviderServerToEdit: server,
      });
    }
  };

  private onCloseEditpreproviderServerDialog = () => {
    this.setState({
      preproviderServerEditorMode: EditpreproviderServerDialogMode.None,
      preproviderServerToEdit: emptypreproviderServer,
    });
  };
  private onCloseRefreshpreproviderDialog = () => {
    this.setState({
      refreshpreproviderEditorMode: RefreshpreproviderDialogMode.None,
    });
  };

  private handleImport = async () => {
    try {
      const data = await this.fetchDataFromElasticsearch();
      const csv = this.convertToCSV(data);
      this.downloadCSV(csv, "export.csv");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  private fetchDataFromElasticsearch = async (): Promise<
    ElasticsearchData[]
  > => {
    const baseUri = `${window.location.origin}`;
    var size = 10;
    const countUri = baseUri + "/pre_provider/_count";
    try {
      const countResponse = await axios.get(countUri);
      size = countResponse.data.count;
    } catch (countError) {
      console.error("Error fetching document count:", countError);
    }
    const response = await fetch(
      baseUri + "/pre_provider/_search?size=" + size,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            match_all: {},
          },
        }),
      }
    );

    const data = await response.json();
    return data.hits.hits;
  };

  private convertToCSV = (data: ElasticsearchData[]): string => {
    const orderedKeys = [
      "DeviceType",
      "PNFID",
      "IP_ADDRESS",
      "USERNAME",
      "PASSWORD",
      "PREPROVIDER_CONF",
      "PORT_NUMBER",
    ];
    if (data.length === 0) {
      const csvRows = [
        orderedKeys.join(","), // Header row
      ];

      return csvRows.join("\n");
    }

    // const keys = Object.keys(data[0]._source).filter(
    //   (key) => key !== "FileName" && key !== "model-number" && key !== "serial-number" && key !== "vendor-details" && key !== "software-version"
    // );

    // Construct the CSV rows
    const csvRows = [
      orderedKeys.join(","), // Header row
      ...data.map((row) =>
        orderedKeys
          .map((column) => {
            const cell = row._source[column] || "";
            return cell.replace(/"/g, ""); // Remove double quotes if any
          })
          .join(",")
      ),
    ];

    return csvRows.join("\n");
  };

  private replacer = (key: string, value: any) => (value === null ? "" : value);

  private downloadCSV = (csv: string, filename: string): void => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  areFieldsValid = (
    DeviceType: string,
    PNFID: string,
    IP_ADDRESS: string,
    USERNAME: string,
    PASSWORD: string,
    PREPROVIDER_CONF: string,
    PORT_NUMBER: string,
    SSHKey: string
  ) => {
    this.setState({
      validPNFID: true,
      validIP_ADDRESS: true,
      validPORT_NUMBER: true,
      validUSERNAME: true,
      validPASSWORD: true,
      validPREPROVIDERCONF: true,
      duplicatenode: false,
      duplicaterow: false,
      validSSH: true,
    });
    if (PNFID == "") {
      this.setState({ validPNFID: false });
      return false;
    } else if (DeviceType === "gNodeB" && IP_ADDRESS == "") {
      this.setState({ validIP_ADDRESS: false });
      return false;
    } else if (PORT_NUMBER == "") {
      this.setState({ validPORT_NUMBER: false });
      return false;
    } else if (USERNAME == "") {
      this.setState({ validUSERNAME: false });
      return false;
    } else if (PASSWORD == "") {
      this.setState({ validPASSWORD: false });
      return false;
    } else if (PREPROVIDER_CONF == "") {
      this.setState({ validPREPROVIDERCONF: false });
      return false;
    } else if (DeviceType === "RRU" && SSHKey == "") {
      this.setState({ validSSH: false });
      return false;
    } else {
      return true;
    }
  };

  private handleFileUpload = async (file: string) => {
    this.setState({
      isloading: true,
      dialogstring: "Uploading in Progress....",
    });

    const maxRequestsBeforeNewConnection = 1000;

    try {
      const baseUri = `${window.location.origin}`;
      const rows = file
        .split("\n")
        .map((row) => row.trim())
        .filter(Boolean)
        .slice(1); // Assuming first line is a header and skipped

      let rowss: any[] = [];

      for (const row of rows) {
        const [
          DeviceType,
          PNFID,
          IP_ADDRESS,
          USERNAME,
          PASSWORD,
          PREPROVIDER_CONF,
          PORT_NUMBER,
          SSHKey,
        ] = row.split(",");

        const profile = this.state.profiles.filter((profiles: any) => {
          return (
            profiles.ProfileName === PREPROVIDER_CONF &&
            profiles.DeviceType === DeviceType
          );
        });

        rowss.push({
          DeviceType: DeviceType,
          PNFID: PNFID,
          IP_ADDRESS: IP_ADDRESS,
          PORT_NUMBER: PORT_NUMBER,
          USERNAME: USERNAME,
          PASSWORD: PASSWORD,
          PREPROVIDER_CONF: PREPROVIDER_CONF,
          FILENAME: profile[0].FileName,
          SSHKey: SSHKey,
        });
      }

      // Split the rowss array into chunks of 10 (or any desired batch size)
      const batchSize = 30;
      for (let i = 0; i < rowss.length; i += batchSize) {
        const batch = rowss.slice(i, i + batchSize);
        if (i % 1000 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        // Execute all requests in the batch and wait for completion
        await Promise.all(
          batch.map(async (row) => {
            let result = null;
            const netconfBaseUri = `${baseUri}/rests/data/odl-netconf-callhome-server:netconf-callhome-server/allowed-devices/device=${row.PNFID}`;

            if (row.DeviceType === "RRU") {
              var usernameFromToken;

              const userToken = localStorage.getItem("userToken") || "";
              let parsedToken;
              try {
                parsedToken = userToken ? JSON.parse(userToken) : null;
                usernameFromToken =
                  parsedToken && parsedToken.access_token
                    ? parsedToken.access_token
                    : "";
                return (
                  axios.post(`${baseUri}/pre_provider/_doc/${row.PNFID}`, {
                    DeviceType: row.DeviceType,
                    PNFID: row.PNFID,
                    IP_ADDRESS: row.IP_ADDRESS,
                    USERNAME: row.USERNAME,
                    PASSWORD: row.PASSWORD,
                    PREPROVIDER_CONF: row.PREPROVIDER_CONF,
                    PORT_NUMBER: row.PORT_NUMBER,
                    FILENAME: row.FILENAME,
                    SSHKey: row.SSHKey || "",
                  }),
                  axios.put(
                    netconfBaseUri,
                    {
                      device: {
                        "unique-id": row.PNFID,
                        "ssh-client-params": {
                          credentials: {
                            username: row.USERNAME,
                            passwords: [row.PASSWORD],
                          },
                          "host-key": row.SSHKey,
                        },
                      },
                    },
                    {
                      headers: {
                        Authorization: `Basic ${usernameFromToken}`,
                        // 'Content-Type': 'application/json',
                        // 'Accept': 'application/json',
                      },
                    }
                  )
                );
              } catch (error) {
                console.error("Invalid token format:", error);
                throw error;
              }
            } else {
              try {
                return axios.post(`${baseUri}/pre_provider/_doc/${row.PNFID}`, {
                  DeviceType: row.DeviceType,
                  PNFID: row.PNFID,
                  IP_ADDRESS: row.IP_ADDRESS,
                  USERNAME: row.USERNAME,
                  PASSWORD: row.PASSWORD,
                  PREPROVIDER_CONF: row.PREPROVIDER_CONF,
                  PORT_NUMBER: row.PORT_NUMBER,
                  FILENAME: row.FILENAME,
                  SSHKey: row.SSHKey || "",
                });
              } catch (error) {
                console.error(`Error uploading PNFID ${row.PNFID}:`, error);
                this.setState({ isloading: false, dialogstring: "" });
                throw error; // Ensure errors propagate
              }
            }
          })
        );
      }

      // On successful upload of all rows
      this.setState({ isloading: false, dialogstring: "" });
      this.setState({
        preproviderServerEditorMode:
          EditpreproviderServerDialogMode.ImportpreproviderServer,
        preproviderServerToEdit: emptypreproviderServer,
      });
    } catch (error) {
      console.error("Error during batch processing:", error);
      this.setState({
        isloading: false,
        dialogstring: "",
        Sucessmsg: "Error in Uploading",
        SaveSucesopen: true,
        savedialogTitle: "Warning",
      });
    }
  };

  private validateFile = async (file: string) => {
    this.setState({
      isloading: true,
      dialogstring: "Validation in Progress....",
    });

    const baseUri = `${window.location.origin}`;
    this.setState({ csvdata: null });
    let count = 10;
    try {
      await axios
        .get(baseUri + "/profilemanagement/_count")
        .then((res: any) => {
          count = res.data.count;
        });
    } catch (Error) {}
    let response;
    try {
      response = await axios.get(
        `${baseUri}/profilemanagement/_search?size=` + count
      );
    } catch (Error) {}
    const profiles = response?.data.hits.hits.map((hit: any) => ({
      ProfileName: hit._source.ProfileName,
      FileName: hit._source.FileName,
      DeviceType: hit._source.DeviceType,
    }));
    this.setState({ profiles: profiles });
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let count1 = 10;
    var rowss: any[] = [];
    const storedData = sessionStorage.getItem("providerdata");
    if (storedData) {
      rowss = JSON.parse(storedData);
    }
    try {
      if (file) {
        // Split the CSV content into rows
        const rows = file
          .split("\n")
          .map((row) => row.trim())
          .filter(Boolean)
          .slice(1);
        let valid = true;
        let index = 0;
        let batchSize = 50;
        // Process each row and index into Elasticsearch using Axios
        const processRow = (row: any, index: number) => {
          const [
            DeviceType,
            PNFID,
            IP_ADDRESS,
            USERNAME,
            PASSWORD,
            PREPROVIDER_CONF,
            PORT_NUMBER,
            SSHKey,
          ] = row.split(",");
          const profile = profiles.filter((profile: any) => {
            return (
              profile.ProfileName === PREPROVIDER_CONF.replace(/^"|"$/g, "") &&
              profile.DeviceType === DeviceType
            );
          });
          let nodeIndex = -1;
          let rowIndex = -1;
          let csvdatarowindex = -1;
          let csvdatanodeindex = -1;
          nodeIndex = rowss.findIndex((row: any) => row.PNFID === PNFID);

          if (DeviceType === "gNodeB") {
            rowIndex = rowss.findIndex(
              (row: any) =>
                row.IP_ADDRESS === IP_ADDRESS && row.PORT_NUMBER === PORT_NUMBER
            );
            index = rows.indexOf(row) + 2;

            if (this.state.csvdata != null) {
              csvdatarowindex = this.state.csvdata.findIndex(
                (row: any) =>
                  row.IP_ADDRESS === IP_ADDRESS &&
                  row.PORT_NUMBER === PORT_NUMBER
              );
            }
          }

          if (this.state.csvdata != null) {
            csvdatanodeindex = this.state.csvdata.findIndex(
              (row: any) => row.PNFID === PNFID
            );
          }
          if (
            !this.areFieldsValid(
              DeviceType,
              PNFID,
              IP_ADDRESS,
              USERNAME,
              PASSWORD,
              PREPROVIDER_CONF,
              PORT_NUMBER,
              SSHKey
            )
          ) {
            valid = false;
            this.setState({ isloading: false, dialogstring: "" });
            return false;
          } else if (
            !(parseInt(PORT_NUMBER) <= 65535 && parseInt(PORT_NUMBER) >= 0)
          ) {
            valid = false;
            this.setState({
              SaveSucesopen: true,
              Sucessmsg:
                "CSV is not Valid Please Check PORT NUMBER FORMAT at line " +
                index,
            });
            this.setState({ savedialogTitle: "Warning" });
            this.setState({ isloading: false, dialogstring: "" });
            return false;
          } else if (
            DeviceType === "gNodeB" &&
            !ipv4Regex.test(IP_ADDRESS.replace(/^"|"$/g, ""))
          ) {
            valid = false;
            this.setState({
              SaveSucesopen: true,
              Sucessmsg:
                "CSV is not Valid Please Check IP_ADDRESS FORMAT at line " +
                index,
            });
            this.setState({ savedialogTitle: "Warning" });
            this.setState({ isloading: false, dialogstring: "" });
            return false;
          } else if (profile.length == 0) {
            valid = false;
            this.setState({
              SaveSucesopen: true,
              Sucessmsg:
                "CSV is not Valid No Matching Profile at line " + index,
            });
            this.setState({ savedialogTitle: "Warning" });
            this.setState({ isloading: false, dialogstring: "" });
            return false;
          } else if (nodeIndex != -1 || csvdatanodeindex != -1) {
            valid = false;
            if (nodeIndex != -1) {
              this.setState({ SaveSucesopen: true });
              this.setState({
                Sucessmsg:
                  "Duplicate PNFID Found in database and at row " +
                  index +
                  " in CSV",
              });
              this.setState({ savedialogTitle: "Warning" });
              this.setState({ isloading: false, dialogstring: "" });
            } else if (csvdatanodeindex != -1) {
              csvdatanodeindex = csvdatanodeindex + 2;
              this.setState({ SaveSucesopen: true });
              this.setState({
                Sucessmsg:
                  "Duplicate PNFID Found in CSV at row " +
                  csvdatanodeindex +
                  " and " +
                  index,
              });
              this.setState({ savedialogTitle: "Warning" });
              this.setState({ isloading: false, dialogstring: "" });
            }
            return false;
          } else if (rowIndex != -1 || csvdatarowindex != -1) {
            valid = false;
            if (rowIndex != -1) {
              this.setState({ SaveSucesopen: true });
              this.setState({
                Sucessmsg:
                  "Duplicate IP Address and Port Number Found in database and at row " +
                  index +
                  " in CSV",
              });
              this.setState({ savedialogTitle: "Warning" });
              this.setState({ isloading: false, dialogstring: "" });
            } else if (csvdatarowindex != -1) {
              csvdatarowindex = csvdatarowindex + 2;
              this.setState({ SaveSucesopen: true });
              this.setState({
                Sucessmsg:
                  "Duplicate IP Address and Port Number Found in CSV at row " +
                  csvdatarowindex +
                  " and " +
                  index,
              });
              this.setState({ savedialogTitle: "Warning" });
              this.setState({ isloading: false, dialogstring: "" });
            }
            return false;
          } else {
            valid = true;
            this.setState({ SaveSucesopen: false, Sucessmsg: "" });
            const rows =
              this.state.csvdata != null &&
              this.state.csvdata.map((row: any) => {
                return row;
              });
            if (this.state.csvdata != null) {
              rows.push({
                DeviceType: DeviceType,
                PNFID: PNFID,
                IP_ADDRESS: IP_ADDRESS,
                PORT_NUMBER: PORT_NUMBER,
                USERNAME: USERNAME,
                PASSWORD: PASSWORD,
                PREPROVIDER_CONF: PREPROVIDER_CONF,
                FILENAME: profile[0].FileName,
                SSHKey: SSHKey,
              });
              this.setState({ csvdata: rows });
            } else {
              this.setState({
                csvdata: [
                  {
                    DeviceType: DeviceType,
                    PNFID: PNFID,
                    IP_ADDRESS: IP_ADDRESS,
                    PORT_NUMBER: PORT_NUMBER,
                    USERNAME: USERNAME,
                    PASSWORD: PASSWORD,
                    PREPROVIDER_CONF: PREPROVIDER_CONF,
                    FILENAME: profile[0].FileName,
                    SSHKey: SSHKey,
                  },
                ],
              });
            }
            return true;
          }
        };

        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          for (const [indexx, row] of batch.entries()) {
            index = i + indexx + 2; // Original index in the entire rows array
            if (!processRow(row, index)) {
              valid = false;

              if (!valid && !this.state.validPNFID) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid PNFID can't be Empty at line " + index,
                });
                this.setState({ savedialogTitle: "Warning" });
                this.setState({ isloading: false, dialogstring: "" });
                break;
              } else if (!valid && !this.state.validIP_ADDRESS) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid IP ADDRESS can't be Empty at line " +
                    index,
                });
                this.setState({ savedialogTitle: "Warning" });
                this.setState({ isloading: false, dialogstring: "" });
                break;
              } else if (!valid && !this.state.validPORT_NUMBER) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid PORT Number can't be Empty at line " +
                    index,
                });
                this.setState({ savedialogTitle: "Warning" });
                this.setState({ isloading: false, dialogstring: "" });
                break;
              } else if (!valid && !this.state.validUSERNAME) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid USERNAME can't be Empty at line " + index,
                });
                this.setState({ savedialogTitle: "Warning" });
                this.setState({ isloading: false, dialogstring: "" });
                break;
              } else if (!valid && !this.state.validPASSWORD) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid PASSWORD can't be Empty at line " + index,
                });
                this.setState({ savedialogTitle: "Warning" });
                this.setState({ isloading: false, dialogstring: "" });
                break;
              } else if (!valid && !this.state.validSSH) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid SSHKey can't be Empty at line " + index,
                });
                this.setState({ savedialogTitle: "Warning" });
                this.setState({ isloading: false, dialogstring: "" });
                break;
              } else if (!valid && !this.state.validPREPROVIDERCONF) {
                this.setState({
                  SaveSucesopen: true,
                  Sucessmsg:
                    "CSV is not Valid PREPROVIDERCONF can't be Empty at line " +
                    index,
                });
                this.setState({ isloading: false, dialogstring: "" });
                this.setState({ savedialogTitle: "Warning" });
                break;
              }
              break;
            }
          }
          if (!valid) {
            break;
          }
        }
        if (valid) {
          this.handleFileUpload(file);
        }
      }
    } catch (Error) {
      this.setState({
        isloading: false,
        savedialogTitle: "Warning",
        Sucessmsg: "Error in Validation",
        SaveSucesopen: true,
      });
    }
  };
}

export const preproviderServerSelection = withStyles(styles)(
  connect(mapProps, mapDispatch)(preproviderServerSelectionComponent)
);
export default preproviderServerSelection;
