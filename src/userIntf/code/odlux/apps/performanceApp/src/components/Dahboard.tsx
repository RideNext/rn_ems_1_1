import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Dialog, DialogContent } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Line } from "react-chartjs-2";
import { TreeItem, TreeView } from "@mui/lab";
import randomColor from "randomcolor";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from "moment-timezone";
import DateTimeRangeContainer from '../lib/index';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';

export const Dashboard = () => {
  // const appIcon = require('../assets/icons/prbs.svg');
  const [labels, setLabels] = useState<string[]>([]);
  const [gridValue, setGridValue] = useState<{ [key: string]: number }>({});
  const [values, setValues] = useState<any[]>([]);
  const [selectedGrids, setSelectedGrids] = useState<any[]>([]);
  const currentnodeId = `${window.location.hash.split("/")[2]}`;
  const [selectedkpi, setselectedkpi] = useState<string>("DRB.MeanActiveUeDl");
  const [cells, setcells] = useState<any[]>([]);
  const [selectedTreeItem, setSelectedTreeItem] = React.useState<number[]>([]);
  const [showPercentage, setShowPercentage] = useState(false); // Checkbox state
  //-- Started DatePicker --//
  let [resdata, setresData] = useState<{ [key: string]: { [time: string]: number } }>({});
  const [filteredData, setFilteredData] = useState<{ [key: string]: { [time: string]: number } }>({});
  const [datepickerOpen, setdatepickerOpen] = useState(false);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  useEffect(() => {
    setStartDate(moment().startOf('day').format('DD-MM-YYYY HH:mm'))
    setEndDate(moment().endOf('day').format('DD-MM-YYYY HH:mm'))
  }, []);

  const gridDataMapping: { [key: number]: string } = {
    1: "DRB.MeanActiveUeDl",
    2: "DRB.MaxActiveUeDl",
    3: "DRB.MeanActiveUeUl",   
    4: "DRB.MaxActiveUeUl",
    5: "DRB.UEThpUl",
    6: "DRB.UEThpDl",
    7: "RRU.PrbTotUl",
    8: "RRU.PrbAvailUl",
    9: "RRU.PrbUsedUl",
    10: "RRU.PrbTotDl",
    11: "RRU.PrbAvailDl",
    12: "RRU.PrbUsedDl",
  };
  const colorMap = {
    "DRB.MeanActiveUeDl": "#FF0000",
    "DRB.MaxActiveUeDl": "#339933",
    "DRB.MeanActiveUeUl": "#0000CC",  
    "DRB.MaxActiveUeUl": "Magenta",
    "DRB.UEThpUl": "#333399",
    "DRB.UEThpDl": "#FF9900",
    "RRU.PrbTotUl": "Magenta",
    "RRU.PrbAvailUl": "#800000",
    "RRU.PrbUsedUl": "#FF0000",
    "RRU.PrbTotDl": "#FF0000",
    "RRU.PrbAvailDl": "#6600FF",
    "RRU.PrbUsedDl": "#006699",   
  };

  
  let start = moment(new Date(moment().year(), moment().month(), moment().date(), 0, 0, 0, 0));
  //let start = moment(new Date(start1.getFullYear(), start1.getMonth(), start1.getDate(), 0,0,0,0));
  let end = moment(start).add(1, 'day').subtract(1, 'second');


  const openDatePicker = () => {
    setdatepickerOpen(true);
  };
  const datepickerClose = () => {
    setdatepickerOpen(false);
  }
  const applyCallback = (startDate: any, endDate: any) => {
    console.log('Apply Callback');
    console.log(startDate.format('DD-MM-YYYY HH:mm'));
    setStartDate(startDate.format('DD-MM-YYYY HH:mm'));
    let endDate1 = moment(startDate);
    if (!endDate) {
      endDate1.set({ hour: 23, minute: 59 });
    } else {
      endDate1.set({ hour: endDate.hours(), minute: endDate.minutes(), });
    }
    setEndDate(endDate1.format('DD-MM-YYYY HH:mm'));

    const fromDate = startDate ? startDate.toDate() : null;
    const toDate = endDate1 ? endDate1.toDate() : null;

    if (fromDate) {
      fromDate.setHours(fromDate.getHours());
      fromDate.setMinutes(fromDate.getMinutes());
    }
    if (toDate) {
      toDate.setHours(toDate.getHours());
      toDate.setMinutes(toDate.getMinutes());
    }
    const convertToISOString = (time: string | number | Date): string => {
      return new Date(time).toISOString();
    };
    const filterDataByDateRange = (dataObj: { [time: string]: number }) => {
      return Object.entries(dataObj).filter(([time, value]) => {
        const itemDateString = convertToISOString(time);
        if (!itemDateString) return false;
        const itemDate = new Date(itemDateString);
        const offsetMinutes = -330;
        const offsetDate = new Date(itemDate.getTime() + offsetMinutes * 60 * 1000);
        return (!fromDate || offsetDate >= fromDate) && (!toDate || offsetDate <= toDate);
      });
    };
    const filteredResdata = Object.keys(resdata).reduce((acc, key) => {
      const data = resdata[key];
      const filteredData = filterDataByDateRange(data);
      const filteredObject: { [time: string]: number } = {};
      filteredData.forEach(([time, value]) => {
        filteredObject[time] = value;
      });
      acc[key] = filteredObject;
      return acc;
    }, {} as { [key: string]: { [time: string]: number } });
    setFilteredData(filteredResdata);
    setresData(filteredResdata);
    setdatepickerOpen(false);
  };
  const oncloseCallback = (startDate: any, endDate: any) => {
    console.log('Apply Close');
    console.log(startDate.format('DD-MM-YYYY HH:mm'));
    console.log(endDate.format('DD-MM-YYYY HH:mm'));
    setdatepickerOpen(false);
  }
  const rangeCallback = (index: any, value: any) => {
    console.log(index, value);
  }
  const renderStandalone = (ranges: any, local: any, maxDate: any, descendingYears: any) => {
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
            standaloneLayout: { display: 'flex', maxWidth: 'fit-content' }
          }}
        />
        <br />
      </div>
    );
  }
  let now = new Date();
  let startNow = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
  let endNow = moment(startNow).endOf('day')
  let ranges = {
    'Today': [moment(startNow), moment(endNow)],
    '1 Week': [moment(startNow).subtract(7, 'days'), moment(endNow)],
    '1 Month': [moment(startNow).subtract(1, 'months'), moment(endNow)],
  };
  let local = {
    format: 'DD-MM-YYYY HH:mm',
    sundayFirst: false,
  };
  let maxDate = moment(endNow).add(24, 'hour');
  let pickersRender = <div>
    <br />
    {renderStandalone(ranges, local, maxDate, false)}
  </div>
  let pickers = pickersRender;
  //--- Ended DatePicker ---//

  const handleGridClick = (id: number) => {
    setresData({})
    setselectedkpi(gridDataMapping[id]);
    setSelectedGrids(prev => {
      const isSelected = prev.includes(id);
      const newSelectedGrids = isSelected ? prev.filter(gridId => gridId !== id) : [...prev, id];
      return newSelectedGrids;
    });
  };

  const handleTreeItemClick = (itemId: number[]) => {
    setSelectedTreeItem(itemId);
    console.log("itemId", itemId);
    setSelectedGrids([])
    setLabels([]);
    setValues([]);
  };


  useEffect(() => {
    let values: any[] = [];
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
      const fetchedcells =
        data1.data.aggregations.filtered_nodes.selected_node.cell_types
          .cell_types_data.hits.hits;
      console.log(fetchedcells, "fetchedcells");
      setcells(fetchedcells);
    });
  }, []);

  React.useEffect(() => {
    setLabels([])
    setValues([])

    const typeArry = selectedTreeItem.filter((item: number) => !selectedGrids.includes(item)).map((item: number) => gridDataMapping[item]);
    console.log("type", typeArry);
    let lbls: string[] = [];
    let newDs: any[] = [];
    const aggregatedData: Record<string, { [time: string]: number }> = {};
    const queryPromises = cells?.map((cell: any) => {
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
                            "nodes.cell_types.cell_id": cell._source.cell_id,
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
                                  terms: {
                                    "nodes.cell_types.types.type": typeArry,
                                  },
                                },
                                aggs: {
                                  cell_types_data: {
                                    top_hits: {
                                      _source: [
                                        "nodes.cell_types.types.type",
                                        "nodes.cell_types.types.data.time",
                                        "nodes.cell_types.types.data.value",
                                        "nodes.cell_types.cell_id",
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
      let lbl: string[] = [];
      let latestData: any[] = [];
      let aggregatedValues: { [key: string]: number } = {};
      let typesBuckets: any[] = [];
      responses.forEach((resItem: any) => {
        typesBuckets.push(resItem.data.aggregations.filtered_nodes.selected_node.cell_types.selected_cell_id.types.selected_type.cell_types_data.hits.hits);

        const hits = resItem.data.aggregations.filtered_nodes.selected_node.cell_types.selected_cell_id.types.selected_type.cell_types_data.hits.hits;

        hits.forEach((hit: any) => {
          let lbls: string[] = [];
          const type = hit._source.type;
          const data = hit._source.data;
          hit._source.data.map((innerdata: any) => {
            lbls.push(innerdata.time.split(".")[0])
          })
          if (Array.isArray(data) && data.length > 0) {
            const latest = data[data.length - 1];
            const value = parseFloat(latest.value);
            if (!isNaN(value)) {
              aggregatedValues[type] = (aggregatedValues[type] || 0) + value;
            }
            latestData.push({ type, latestData: value });
            lbl = lbls;
          }
        });
      })

      typesBuckets.map((hits: any, index: number) => {
        hits.map((hit: any) => {
          const typeLabel = hit._source.type;
          if (!aggregatedData[typeLabel]) {
            aggregatedData[typeLabel] = {};
          }

          hit._source.data.forEach((values: any, index: number) => {
            const time = values.time;
            const splittime = values.time.split('.')[0].split(':').slice(0, 2).join(':');
            const value = parseFloat(values.value);
            const offsetHours = 5;
            const offsetMinutes = 30;

            if (startDate != '' && endDate != '') {
              // Parse start and end dates
              const [startday, startmonth, startyear, starthours, startminutes] = startDate.split(/[- :]/);
              const startdateObj = new Date(`${startyear}-${startmonth}-${startday}T${starthours}:${startminutes}:00`);
              const [endday, endmonth, endyear, endhours, endminutes] = endDate.split(/[- :]/);
              const enddateObj = new Date(`${endyear}-${endmonth}-${endday}T${endhours}:${endminutes}:00`);

              // Apply timezone offset
              startdateObj.setHours(startdateObj.getHours() + offsetHours);
              startdateObj.setMinutes(startdateObj.getMinutes() + offsetMinutes);
              const startformattedDate = startdateObj.toISOString() + '+05:30';

              enddateObj.setHours(enddateObj.getHours() + offsetHours);
              enddateObj.setMinutes(enddateObj.getMinutes() + offsetMinutes);
              const endformattedDate = enddateObj.toISOString() + '+05:30';

              // Filter data by the given date range
              if (!isNaN(value) && time >= startformattedDate && time <= endformattedDate) {
                if (aggregatedData[typeLabel][splittime]) {
                  aggregatedData[typeLabel][splittime] += value;
                } else {
                  aggregatedData[typeLabel][splittime] = value;
                }
              }
            }

            else {
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              const startOfToday = new Date(currentDate);
              const endOfToday = new Date(currentDate.setHours(23, 59, 59, 999));
              const dataTime = new Date(time);

              // Filter data within today's date
              if (!isNaN(value) && dataTime >= startOfToday && dataTime <= endOfToday) {
                if (aggregatedData[typeLabel][splittime]) {
                  aggregatedData[typeLabel][splittime] += value;
                } else {
                  aggregatedData[typeLabel][splittime] = value;
                }
              }
            } 

            console.log("final aggregatedData", aggregatedData);
            
          });

        })
      });
          const calculatePercentage = (usedKey: string, availKey: string) => {
            if (aggregatedData[availKey] && aggregatedData[usedKey]) {
              const timeKeys = Object.keys(aggregatedData[availKey]);
              timeKeys.forEach((timeKey) => {
                const prbUsed = aggregatedData[usedKey][timeKey];
                const prbAvail = aggregatedData[availKey][timeKey];
                
                if (prbUsed !== undefined && prbAvail !== undefined) {
                  const percentageValue = (prbUsed / prbAvail) * 100;
                  aggregatedData[usedKey][timeKey] = percentageValue;
                }
              });
            }
          };
          
          if (showPercentage) {
            calculatePercentage('RRU.PrbUsedUl', 'RRU.PrbAvailUl');
            calculatePercentage('RRU.PrbUsedDl', 'RRU.PrbAvailDl');
          }
          

      Object.keys(aggregatedData).forEach((type: any, index: number) => {
        const currentType = type;
        const filterTypes = ['RRU.PrbTotUl', 'RRU.PrbAvailUl', 'RRU.PrbUsedUl', 'RRU.PrbTotDl', 'RRU.PrbAvailDl', 'RRU.PrbUsedDl'];
        const shouldShowPercentage = showPercentage && (currentType === 'RRU.PrbUsedUl' || currentType === 'RRU.PrbUsedDl');
        const values = Object.keys(aggregatedData[currentType]).map((index: any) => aggregatedData[currentType][index]);
        const labels = Object.keys(aggregatedData[currentType]).map((index: any) => index);
        const color = colorMap[currentType] || "purple";

        if (!filterTypes.includes(currentType) || shouldShowPercentage || !showPercentage) {
        let obj = {
          label: currentType,
          data: values,
          tension: 0.2,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 2,
          fill: false,
          min: 0,
        };
        lbls = labels;
        newDs.push(obj);
        }    
      });     
      setresData(aggregatedData);
      setGridValue(aggregatedValues);
      setLabels(lbls);
      setValues(newDs);
    }).catch(error => {
      console.error('Elasticsearch query failed:', error);
    });
  }, [selectedTreeItem, selectedGrids, startDate, endDate, showPercentage]);

  const lineData = {
    labels: labels,
    datasets: values,
  };

  const options = {
    fill: false,
    animations: {
      resize: {
        duration: 0,
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 10,
        },
      },
      x: {
        min: 0,
        ticks: {
          autoSkip: true,
          stepSize: 1,
          font: {
            size: 10,
          }
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const paperStyle = (id: number) => ({
    padding: '16px',
    backgroundColor: selectedGrids.includes(id) ? "white" : "#53659c",
    color: selectedGrids.includes(id) ? "grey" : "white",
    borderRadius: "15px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    height: "5%",
    position: "relative" as "relative",
    display: 'flex',
    alignItems: 'center',
  });

  const [selectedNodeId, setSelectedNodeId] = React.useState<string | undefined>(undefined);

  const handleNodeSelect = (event: React.ChangeEvent<{}>, nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedGrids([])
    setSelectedTreeItem([])
    setresData({})
  };

  const renderGridItems = (items: any) => (
    <div style={{ display: 'flex',  gap: '2%' }}>
      {items.map(({ id, label, value }) => (
        <div key={id} style={{ flex: '1 1 calc(25% - 16px)', minWidth: '60px', ...paperStyle(id),display: 'flex',alignItems: 'center', }} onClick={() => handleGridClick(id)} >
               <div style={{ display: 'flex', alignItems: 'center', padding: 0 }}> 
        <h6 style={{ fontSize: '1.6vh', margin: '0', padding: 0, lineHeight: 1}}> 
          {label}:
        </h6>
        <span style={{ fontSize: '1.6vh', margin: '0', padding: 0, lineHeight: 1 }}>{value}</span> 
      </div>
        </div>
      ))}
    </div>
  );   
  return (
    <Box display="flex" height="68vh">
      <Box sx={{display:'flex', overflowY:'auto', height:'93%' , width:'300px', border:'2px solid #ddd' ,backgroundColor:'#f5f5f5', marginTop:'0.5%'}}>
        <TreeView aria-label="customized" selected={selectedNodeId} onNodeSelect={handleNodeSelect}>
          <TreeItem nodeId="1"  onClick={() => setSelectedGrids([])} label={<span style={{ fontSize: '15px' }}>Active Users (last one day)</span>} icon={<PeopleIcon />} sx={{".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c'}}}>
            <TreeItem nodeId={"2"} onClick={() => handleTreeItemClick([1, 2])} label={<span style={{ fontSize: '15px' }}>UE-Downlink</span>} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <TreeItem nodeId="5" onClick={() => handleTreeItemClick([3, 4])} label={<span style={{ fontSize: '15px' }}>UE-Uplink</span>} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
          </TreeItem>
          <TreeItem nodeId="6" onClick={() => { setSelectedGrids([]); handleTreeItemClick([5, 6]); }} label={<span style={{ fontSize: '15px' }}>Throughput (last one day)</span>} icon={<CloudUploadIcon />} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />

          <TreeItem nodeId="9" onClick={() => setSelectedGrids([])} label={<span style={{ fontSize: '15px' }}>PRBs (last one day)</span>} icon={<FontAwesomeIcon icon={faBroadcastTower} style={{ fontSize: '13px' }} />} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }}>
            {/* <TreeItem nodeId="10" label={`PrbTot`} /> */}
            {/* <TreeItem nodeId="11" onClick={() => handleTreeItemClick([7, 8])} label={<span style={{ fontSize: '15px' }}>PrbAvail</span>} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <TreeItem nodeId="12" onClick={() => handleTreeItemClick([9, 10])} label={<span style={{ fontSize: '15px' }}>PrbUsed</span>} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} /> */}
               <TreeItem nodeId="11" onClick={() => handleTreeItemClick([7, 8,9])} label={<span style={{ fontSize: '15px' }}>PrbUl</span>} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
            <TreeItem nodeId="12" onClick={() => handleTreeItemClick([10, 11, 12])} label={<span style={{ fontSize: '15px' }}>PrbDl</span>} sx={{ ".MuiTreeItem-content.Mui-selected.Mui-focused": { color: '#ffffff', backgroundColor: '#53659c' } }} />
         
          </TreeItem> 

          {/* <TreeItem nodeId="13" onClick={()=>{setSelectedGrids([]); }} label="Data volume (last one day)" icon={<PeopleIcon />}>
                    <TreeItem nodeId="14" style={{fontSize:'2'}} label={`PDCPDataVolume.DL Sdu data volume = 36`} />
                    <TreeItem nodeId="15" label={`PDCPDataVolume.UL Sdu data volume = 10 `} />
                </TreeItem> */}
        </TreeView>
      </Box>
      <Box sx={{ paddingTop: "2%", width: "99.8%", border: '2px solid #ddd',height:'88%', marginTop:'0.5%' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginLeft: '2%', display: 'flex', flex: '1' }}>
            <>
              {selectedNodeId === "2" && renderGridItems([
                { id: 1, label: "MeanActiveUeDl", value: gridValue["DRB.MeanActiveUeDl"] },
                { id: 2, label: "MaxActiveUeDl", value: gridValue["DRB.MaxActiveUeDl"] }
              ])}

              {selectedNodeId === "5" && renderGridItems([
                { id: 3, label: "MeanActiveUeUl", value: gridValue["DRB.MeanActiveUeUl"] },
                { id: 4, label: "MaxActiveUeUl", value: gridValue["DRB.MaxActiveUeUl"] }
              ])}

              {selectedNodeId === "6" && renderGridItems([
                { id: 5, label: "UEThpUl", value: gridValue["DRB.UEThpUl"] },
                { id: 6, label: "UEThpDl", value: gridValue["DRB.UEThpDl"] }
              ])}
              {selectedNodeId === "11" && (
              <label> <input type="checkbox" checked={showPercentage} onChange={() => setShowPercentage(!showPercentage)} />  Show in percentage( PrbUsedUl ) </label>
              )}
              {selectedNodeId === "12" && (              
              <label><input type="checkbox" checked={showPercentage} onChange={() => setShowPercentage(!showPercentage)} />  Show in percentage( PrbUsedDl ) </label>
              )}

              {/* {selectedNodeId === "11" && renderGridItems([
                 { id: 7, label: "PrbTotUl", value: gridValue["RRU.PrbTotUl"] },
                { id: 8, label: "PrbAvailUl", value: gridValue["RRU.PrbAvailUl"] },
                { id: 9, label: "PrbUsedUl", value: gridValue["RRU.PrbUsedUl"] }
              ])}

              {selectedNodeId === "12" && renderGridItems([
                { id: 10, label: "PrbTotDl", value: gridValue["RRU.PrbTotDl"] },
                { id: 11, label: "PrbAvailDl", value: gridValue["RRU.PrbAvailDl"] },
                { id: 12, label: "PrbUsedDl", value: gridValue["RRU.PrbUsedDl"] }
              ])} */}
            </>
          </div>

          <div>
            {selectedTreeItem.length > 0 ?
              <div style={{ display: "flex", flexDirection: "row", width: "96%", justifyContent: "space-between", marginLeft:"13%",height:"40px"}}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "80%", border: "2px solid #ccc", padding: "10px", borderRadius: "8px",}}>

                  <label style={{ fontSize: "14px", marginRight: "6px" }}>Start</label>
                  <input readOnly type="text" value={startDate} style={{ fontSize:'12px',width: "40%", height: "20px", padding: "1%", border: "1px solid #ccc", borderRadius: "4px", marginRight: "10px" }} />

                  <label style={{ fontSize: "14px", marginRight: "6px" }}>End</label>
                  <input readOnly type="text" value={endDate} style={{fontSize:'12px', width: "40%", height: "20px", padding: "1%", border: "1px solid #ccc", borderRadius: "4px", marginRight: "6px" }} />

                  <CalendarMonthIcon onClick={openDatePicker} type="submit" sx={{ height: 30, width: 30 }} />
                </div>
              </div> : null}

            <Dialog open={datepickerOpen == true} onClose={datepickerClose}
              PaperProps={{ style: { border: '4px solid #38456a', borderRadius: '5px' } }} >
              <DialogContent style={{ alignContent: 'center', textAlign: "center" }}>
                <div className="container" > {pickers} </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Paper elevation={3} sx={{ margin: '1%', backgroundColor: 'lightgray', height: '80%', color: 'grey', borderRadius: '15px' }}>
          <Line data={lineData} options={options} />
        </Paper>

      </Box>
    </Box>
  );
};