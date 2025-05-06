import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Breadcrumbs,
  Button,
  FormControlLabel,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { ReactSession } from "react-client-session";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
//import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import moment from "moment-timezone";
import DateTimeRangeContainer from "../lib/index";
import { blue, grey } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
ReactSession.setStoreType("localStorage");

type fromDatetime = Date | null;
type toDatetime = Date | null;
type DateRange = {
  fromDateTime: Date | null;
  toDateTime: Date | null;
};

type Value1 = fromDatetime | [fromDatetime, fromDatetime];
type Value2 = toDatetime | [toDatetime, toDatetime];
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
var that = this;
const SystemHistory = (props: any) => {
  const [time, setTime] = useState<Date | null>(
    new Date(new Date().getTime() - (5 * 60 + 30) * 60000)
  );
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDateTime: null,
    toDateTime: null,
  });

  const [filteredItems, setFilteredItems] = useState();
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setendDate] = useState(new Date());
  const [value, setValue] = useState<Value>(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const [value1, onChange1] = useState<Value1>(new Date());
  const [value2, onChange2] = useState<Value2>(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromDatetime, setFromDateTime] = useState("");
  const [toDatetime, setToDateTime] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [records, setRecords] = useState<boolean | null>(null);
  const [data1, setData1] = useState<any[]>([]);
  let [resdata, setresdatarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  let container_name = location.hash.split("/")[2];
  const [chartseleted, setchartseleted] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");

  const [datepickerOpen, setdatepickerOpen] = useState(false);

  useEffect(() => {
    container_name = location.hash.split("/")[2];

    fetchHistoryData(container_name);

    if (refreshData) {
      fetchHistoryData(container_name);
    }
  }, [refreshData]);
  const fetchHistoryData = (container_name: any) => {
    const baseUri = `${window.location.origin}`;
    axios.get(baseUri + "/rn_ems_perf_util/_doc/"+container_name).then((data1: any) => {
      const resdata = data1.data._source.data;
      setresdatarData(resdata);
    });
  };
  const styles = {
    margin: "3px 0.5vw",
    width: "240px",
    height: "2rem",
    fontSize: "1.5em",
    color: "white",
    background: "#53659c",
    borderRadius: "2px solid #53659c",
  };
  const convertToISOString = (time: string | number | Date) => {
    const date = new Date(time);
    return date.toISOString();
  };

  let start = moment(new Date(moment().year(), 8, 20, 0, 0, 0, 0));
  let end = moment(start).add(5, "days").subtract(1, "second");
  let timezone = "America/Los_Angeles";
  let secondDisplay = false;

  const openDatePicker = () => {
    setdatepickerOpen(true);
  };
  const handleRefresh = () => {
    setStartDate("");
    setEndDate("");
    setRefreshData(!refreshData);
  };
  function OpenCharts() {
    localStorage.setItem("Chartdata", JSON.stringify(resdata));
    props.this.history.push(
      `${props.this.history.location.pathname}/historyCharts`
    );
  }
  const onRadioChange = (event: any) => {
    event.persist();
    setchartseleted(true);
    localStorage.setItem("PerType", JSON.stringify(event.target.value));
    console.debug(`${event.target.name}: ${event.target.value}`);
  };

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const handleFromChange = (newDate: Date | null) => {
    setDateRange((prevRange) => ({
      ...prevRange,
      fromDateTime: newDate,
    }));
  };

  const handleToChange = (newDate: Date | null) => {
    setDateRange((prevRange) => ({
      ...prevRange,
      toDateTime: newDate,
    }));
  };
  const datepickerClose = () => {
    setdatepickerOpen(false);
  };

  const applyCallback = (startDate: any, endDate: any) => {
    console.log("Apply Callback");
    console.log(startDate.format("DD-MM-YYYY HH:mm"));
    console.log(endDate.format("DD-MM-YYYY HH:mm"));
    start = startDate;
    end = endDate;

    setStartDate(startDate.format("DD-MM-YYYY HH:mm"));
    setEndDate(endDate.format("DD-MM-YYYY HH:mm"));

    const fromDate = startDate ? new Date(startDate) : null;
    const toDate = endDate ? new Date(endDate) : null;
    if (fromDate) {
      fromDate.setHours(fromDate.getHours());
      fromDate.setMinutes(fromDate.getMinutes());
      setFromDate(fromDate);
      setToDate(toDate);
    }
    if (toDate) {
      toDate.setHours(toDate.getHours());
      toDate.setMinutes(toDate.getMinutes());
    }
    const baseUri = `${window.location.origin}`;
    axios.get(baseUri + "/rn_ems_perf_util/_doc/"+container_name).then((data1: any) => {
      var resdata = data1.data._source.data;
      const filtered = resdata.filter((row: { time: string | number | Date }) => {
        const itemDateString = row.time;
        console.log(row.time)
        const itemDate = new Date(Number(itemDateString) / 1000);
        console.log(itemDate.getTime()*1000)
        const offsetMinutes = -330; // -5 hours 30 minutes = -330 minutes
        const offsetDate = new Date(
          itemDate.getTime() + offsetMinutes * 60 * 1000
        );
        console.log(offsetDate)
        console.log(fromDate?.getTime())
        return (
          (!fromDate?.getTime() || offsetDate?.getTime() >= fromDate?.getTime()) &&
          (!toDate?.getTime() || offsetDate?.getTime() <= toDate?.getTime())
        );
      });
  
      console.log("Filtered Data:", filtered);
      setFilteredData(filtered);
      resdata = filtered;
      setresdatarData(resdata);
  
      setdatepickerOpen(false);
      setresdatarData(resdata);
    });
    
  };
  const oncloseCallback = (startDate: any, endDate: any) => {
    console.log("Apply Close");
    console.log(startDate.format("DD-MM-YYYY HH:mm"));
    console.log(endDate.format("DD-MM-YYYY HH:mm"));

    setdatepickerOpen(false);
    fetchHistoryData(container_name);
  };

  const rangeCallback = (index: any, value: any) => {
    console.log(index, value);
  };
  const renderStandalone = (
    ranges: any,
    local: any,
    maxDate: any,
    descendingYears: any
  ) => {
    return (
      <div id="DateTimeRangeContainerStandalone">
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={start}
          end={end}
          local={local}
          maxDate={maxDate}
          applyCallback={applyCallback}
          oncloseCallback={oncloseCallback}
          rangeCallback={rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[moment().year(), moment().year() + 10]}
          standalone
          style={{
            standaloneLayout: { display: "flex", maxWidth: "fit-content" },
          }}
        />
        <br />
      </div>
    );
  };

  let now = new Date();
  let startNow = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
  let endNow = moment(startNow).endOf("day");

  let ranges = {
    "Today Only": [moment(startNow), moment(endNow)],
    // 'Yesterday Only': [moment(startNow).subtract(1, 'days'), moment(end).subtract(1, 'days')],
    "1 Days": [moment(startNow).subtract(1, "days"), moment(endNow)],
    // '5 Days': [moment(startNow).subtract(5, 'days'), moment(endNow)],
    "1 Week": [moment(startNow).subtract(7, "days"), moment(endNow)],
    // '2 Weeks': [moment(startNow).subtract(14, 'days'), moment(endNow)],
    "1 Month": [moment(startNow).subtract(1, "months"), moment(endNow)],
    "1 Year": [moment(startNow).subtract(1, "years"), moment(endNow)],
  };
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
  };
  let maxDate = moment(endNow).add(24, "hour");
  let pickersRender = (
    <div>
      <br />
      {renderStandalone(ranges, local, maxDate, false)}
    </div>
  );
  let pickers = pickersRender;
  const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);
  return (
    <div>
      <Dialog
        open={datepickerOpen == true}
        onClose={datepickerClose}
        PaperProps={{
          style: { border: "4px solid #38456a", borderRadius: "5px" },
        }}
      >
        <DialogContent style={{ alignContent: "center", textAlign: "center" }}>
          <div className="container">{pickers}</div>
        </DialogContent>
      </Dialog>
      <div style={{ height: "2vw" }}>
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
              history.back();
            }}
          >
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "20px",
              justifyContent: "center",
              maxWidth: "380px",
              border: "2px solid #ccc",
              padding: "8px",
              borderRadius: "8px",
              gap: "7px",
            }}
          >
            <label style={{ fontSize: "15px", marginRight: "7px" }}>From</label>
            <input
              type="text"
              value={startDate}
              style={{
                width: "30%",
                height: "18px",
                padding: "1%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "6px",
              }}
            />
            <label style={{ fontSize: "15px", marginRight: "7px" }}>To</label>
            <input
              type="text"
              value={endDate}
              style={{
                width: "30%",
                height: "18px",
                padding: "1%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "6px",
              }}
            />
            <CalendarMonthIcon
              onClick={openDatePicker}
              sx={{
                height: 25,
                width: 25,
                cursor: "pointer",
                "&:hover": { color: blue[700] },
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            width: "10%",
            marginLeft: "10px",
          }}
        >
          <Tooltip title="Refresh Data" arrow>
            <RefreshIcon
              onClick={handleRefresh}
              sx={{
                height: 28,
                width: 28,
                color: "#616161"[500],
                cursor: "pointer",
                "&:hover": { color: blue[700] },
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div>
        <TableCell
          style={{ width: "100%", height: "20px", overflowY: "visible" }}
        >
          <Paper
            style={{
              width: "100%",
              border: "2px solid #ccc",
              marginTop: "0px",
            }}
          >
            <div
              style={{
                color: "black",
                margin: "3px",
                backgroundColor: "#c6cbd1",
                height: "40px",
                fontSize: "16px",
              }}
            >
              <b style={{ marginTop: "5px" }}>
                {" "}
                System Performance History for {container_name}
              </b>
            </div>
            <div
              style={{
                maxHeight: "330px",
                maxWidth: "1200px",
                overflowY: "auto",
              }}
            >
              <Table style={{ width: "100%" }} aria-label="">
                <TableHead
                  sx={{
                    "& th": {
                      color: "#ffffff",
                      backgroundColor: "#53659c",
                      lineHeight: "1.1",
                      position: "sticky",
                      top: "0",
                      width: "100%",
                    },
                  }}
                >
                  <TableRow sx={{ "& .MuiTableRow-root": { maxHeight: 20 } }}>
                    <TableCell align="left" style={{ width: 130 }}>
                      Cpu Utilization
                    </TableCell>
                    <TableCell align="left" style={{ width: 130 }}>
                      Memory Usage{" "}
                    </TableCell>
                    <TableCell align="left" style={{ width: 130 }}>
                      {" "}
                      Memory Percentage
                    </TableCell>
                    <TableCell align="left" style={{ width: 130 }}>
                      {" "}
                      Memory Limit
                    </TableCell>
                    <TableCell align="left" style={{ width: 250 }}>
                      Time
                    </TableCell>
                    <TableCell align="left" style={{ width: 220 }}>
                      File Descriptor Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resdata?.map((item: any, index: number) => (
                    <TableRow key={item.id}>
                      <TableCell> {item.cpu_utilization}</TableCell>
                      <TableCell> {item.memory_usage}</TableCell>
                      <TableCell> {item.memory_percentage}</TableCell>
                      <TableCell> {item.memory_limit}</TableCell>
                      <TableCell>
                        {new Date(item.time / 1000)
                          .toLocaleString("en-GB", {
                            timeZone: emsTimeZone,
                            hour12: false,
                          }).replace(",", "")
                          .replace(/\//g, "-")
                          }
                      </TableCell>
                      <TableCell> {item.file_descriptor_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </TableCell>
      </div>
      <div style={{ margin: "3px" }}>
        <span style={{ marginLeft: "6px" }}>
          <RadioGroup
            aria-labelledby="radio-group"
            name="radio-group"
            row
            onChange={onRadioChange}
            style={{ marginLeft: "15px" }}
          >
            <FormControlLabel
              value="cpu_utilization"
              control={
                <Radio
                  size="small"
                  color="default"
                  style={{ color: "#53659c" }}
                />
              }
              label="cpu utilization"
            />
            <FormControlLabel
              value="memory_usage"
              color="blue"
              control={
                <Radio
                  size="small"
                  color="default"
                  style={{ color: "#53659c" }}
                />
              }
              label="Memory usage"
            />
            <FormControlLabel
              value="memory_percentage"
              control={
                <Radio
                  size="small"
                  color="default"
                  style={{ color: "#53659c" }}
                />
              }
              label="Memory percentage"
            />
            {/* <FormControlLabel value="memory_limit" control={<Radio size="small" color="default" style={{color:'#53659c'}} />} label="Memory limit" /> */}
          </RadioGroup>
        </span>
        <Button
          onClick={() => OpenCharts()}
          style={{
            backgroundColor: "white",
            color: chartseleted === true ? "blue" : "gray",
            height: "30px",
            border: "2px solid blue",
            fontSize: "14px",
            borderRadius: "4px",
            padding: "3px 6px",
            marginLeft: "15px",
          }}
          disabled={!chartseleted}
        >
          <SignalCellularAltIcon />
          Generate Charts
        </Button>
      </div>
    </div>
  );
};
export default SystemHistory;
