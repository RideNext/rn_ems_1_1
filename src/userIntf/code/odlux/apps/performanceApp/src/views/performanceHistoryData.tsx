/**********
 *  # ====================================================================================
 *  #Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 *  #=================================================================================================
*********/


import { useMemo, useState } from "react";
//import React from 'react';
import { useLocation } from "react-router-dom";
import randomColor from "randomcolor";
import { ReactSession } from "react-client-session";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Line } from "react-chartjs-2";
import axios from "axios";
import React, { useEffect } from "react";
import { truncate } from "fs";

ReactSession.setStoreType("localStorage");

let KIPdata: any;
let nodeId = location.pathname.split("/")[2];

export default function HistoryData(this: any) {
  const [time, setTime] = useState<Date | null>(
    new Date(new Date().getTime() - 72 * 60 * 60 * 1000)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [todate, setToDate] = useState<Date | null>(null);
  const [fromdate, setFromDate] = useState<Date | null>(null);
  const [records, setRecords] = useState<boolean | null>(null);
  const [data1, setData1] = useState<any[]>([]);

  const [data, setData] = useState<any[]>([]);

  const location = useLocation();
  //let KIPdata:any;
  KIPdata = location.state;
  if (
    localStorage.getItem("KIPdata") !== "undefined" &&
    localStorage.getItem("KIPdata") !== null
  ) {
    console.log("The website key exists");
    //console.log(JSON.parse(localStorage.getItem('KIPdata') || '{}'));
    KIPdata = JSON.parse(localStorage.getItem("KIPdata") || "{}");
  } else {
    localStorage.setItem("KIPdata", JSON.stringify(KIPdata));
    console.log("The website key does NOT exist");
  }
  const selectedcellid = KIPdata.seletedCellID;
  //const selectedkpigrptype= KIPdata.seletedKPIgroup;
  var kpitypes = KIPdata.seletedKPItype;
  var nodeId = KIPdata.selectedNodeID;
  console.log(nodeId);
  //console.log("kpitypes",kpitypes)
  let lastPath = "/performance/" + { nodeId };
  useEffect(() => {
    fetchData();
  }, [time, records, loading]);

  const fetchData = async () => {
    try {
      const queryPromises = kpitypes.map(async (typee: any) => {
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
                      "nodes.node_id": nodeId,
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
                              "nodes.cell_types.cell_id": selectedcellid,
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
            .cell_types.selected_cell_id.types.selected_type.cell_types_data
            .hits.hits[0]._source;
        }
        );
        console.log(selected_types)
        setData(selected_types);
        console.log("data",data)
        console.log(time);

        if (loading) {
          setData1(selected_types);

          //console.log(fromdate);
          //console.log(todate);

          if (
            (new Date().setUTCHours(0, 0, 0, 0) -
              new Date(todate!).setUTCHours(0, 0, 0, 0)) /
              (24 * 60 * 60 * 1000) >
            3
          ) {
            setRecords(false);
            console.log(records);
          } else {
            setRecords(true);
            //console.log(records);
          }

          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  return (
    <div style={{ height: "35vw" }}>
      <div style={{ textAlign: "center", margin: "0.5vw" }}>
        <span style={{ textAlign: "center", fontSize: "25px" }}>
          <strong>History Data</strong>
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div style={{ height: "2vw", width: "30%" }}>
          <Breadcrumbs aria-label="breadcrumbs">
            <Link
              underline="hover"
              color="inherit"
              href="# "
              aria-label="back-breadcrumb"
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "3px",
              }}
              onClick={(ev: React.MouseEvent<HTMLElement>) => {
                ev.preventDefault();
                history.back();
                //this.props.history.push(lastPath);
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
              Back/{nodeId}/{selectedcellid}
            </Link>
          </Breadcrumbs>
        </div>
        <div style={{ textAlign: "center", width: "40%" }}>
          <label>From</label>
          <input
            required
            type="date"
            name="From"
            value={
              fromdate !== null ? fromdate.toISOString().split("T")[0] : ""
            }
            style={{ margin: "3px 0.5vw" }}
            onChange={(e: any) => {
              const selectedDate = e.target.value;
              const newDate =
                selectedDate !== "" ? new Date(selectedDate) : null;
              setFromDate(newDate);
              setLoading(false);
              setRecords(null);
            }}
          ></input>
          <label>To</label>
          <input
            required
            type="date"
            name="To"
            value={todate !== null ? todate.toISOString().split("T")[0] : ""}
            style={{ margin: "3px 0.5vw" }}
            onChange={(e: any) => {
              const selectedDate = e.target.value;
              const newDate =
                selectedDate !== "" ? new Date(selectedDate) : null;
              setToDate(newDate);
              setLoading(false);
              setRecords(null);
            }}
          ></input>
          <button
            style={{ margin: "0 0.5vw" }}
            onClick={() => {
              setLoading(true);
              setTime(null);
            }}
          >
            Submit
          </button>
        </div>

        <div style={{ width: "15%" }}>
          <label style={{ margin: "5px" }}>Last:</label>

          <select
            name="hours"
            style={{ margin: "5px" }}
            onChange={(e: any) => {
              const timeNumber: number = parseInt(e.target.value, 10);
              const selectedDate =
                new Date().getTime() - timeNumber * 60 * 60 * 1000;
              console.log(new Date(selectedDate));
              setTime(new Date(selectedDate));
              setRecords(null);
              setFromDate(null);
              setToDate(null);
              setLoading(false);
            }}
            defaultValue="72" // Set 72 hours as default selected option
          >
            <option value="12">12 hours</option>
            <option value="24">24 hours</option>
            <option value="36">36 hours</option>
            <option value="48">48 hours</option>
            <option value="60">60 hours</option>
            <option value="72">72 hours</option>{" "}
          </select>
        </div>
      </div>

      {fromdate != null && todate != null ? (
        <div style={{ width: "80vw", height: "34vw" }}>
          {fromdate != null &&
          todate != null &&
          (fromdate.setUTCHours(0, 0, 0, 0) > todate.setUTCHours(0, 0, 0, 0) ||
            todate.setUTCHours(0, 0, 0, 0) >
              new Date().setUTCHours(0, 0, 0, 0)) ? (
            <div style={{ margin: "5vw", textAlign: "center" }}>
              <h3>Please Select Proper Date</h3>
            </div>
          ) : fromdate != null && todate != null && records !== null ? (
            records ? (
              <div
                style={{
                  width: "80vw",
                  height: "34vw",
                  margin: "2vw 0",
                  border: "2px outset skyblue",
                  overflow: "auto",
                }}
              >
                <table
                  style={{
                    width: "auto",
                    overflow: "auto",
                    textAlign: "center",
                    borderCollapse: "collapse",
                    border: "1px solid #ddd",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        position: "sticky",
                        top: "0",
                        zIndex: "2",
                        background: "#fafafa",
                      }}
                    >
                      <th
                        style={{
                          margin: "1vw",
                          width: "100px",
                          textAlign: "center",
                          position: "sticky",
                          left: "0",
                          zIndex: "3",
                          background: "#fafafa",
                        }}
                      >
                        Time
                      </th>
                      {data1.length > 0 &&
                        data1.map((data2: any) => (
                          <th
                            key={data2.type}
                            style={{
                              width: "auto",
                              padding: "1vw",
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            {data2.type}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data1.length > 0 &&
                      data1.map((data2: any, outer_index: number) => (
                        <React.Fragment key={outer_index}>
                          {outer_index === 0 && (
                            <td
                              key={outer_index}
                              style={{
                                width: "auto",
                                position: "sticky",
                                left: "0",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                background: "#fafafa",

                                verticalAlign: "middle",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {data2.data
                                .filter((inner_data: any) => {
                                  const innerDataTime = new Date(
                                    inner_data.time
                                  ).setUTCHours(0, 0, 0, 0);

                                  if (
                                    fromdate &&
                                    fromdate.setUTCHours(0, 0, 0, 0) <
                                      new Date(
                                        new Date().setDate(
                                          new Date().getDate() - 3
                                        )
                                      ).setUTCHours(0, 0, 0, 0)
                                  ) {
                                    return (
                                      fromdate !== null &&
                                      todate !== null &&
                                      innerDataTime >=
                                        new Date(
                                          new Date().setDate(
                                            new Date().getDate() - 3
                                          )
                                        ).setUTCHours(0, 0, 0, 0) &&
                                      innerDataTime <=
                                        todate.setUTCHours(0, 0, 0, 0)
                                    );
                                  } else {
                                    return (
                                      fromdate !== null &&
                                      todate !== null &&
                                      innerDataTime >=
                                        fromdate.setUTCHours(0, 0, 0, 0) &&
                                      innerDataTime <=
                                        todate.setUTCHours(0, 0, 0, 0)
                                    );
                                  }
                                })
                                .map((inner_data: any, inner_index: any) => (
                                  <tr
                                    key={inner_index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      margin: "2vw",
                                    }}
                                  >
                                    {inner_data.time.split(".")[0]}
                                  </tr>
                                ))}
                            </td>
                          )}

                          <td
                            key={outer_index}
                            style={{
                              verticalAlign: "middle",
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {data2.data
                              .filter((inner_data: any) => {
                                const innerDataTime = new Date(
                                  inner_data.time
                                ).setUTCHours(0, 0, 0, 0);

                                if (
                                  fromdate &&
                                  fromdate.setUTCHours(0, 0, 0, 0) <
                                    new Date(
                                      new Date().setDate(
                                        new Date().getDate() - 3
                                      )
                                    ).setUTCHours(0, 0, 0, 0)
                                ) {
                                  return (
                                    fromdate !== null &&
                                    todate !== null &&
                                    innerDataTime >=
                                      new Date(
                                        new Date().setDate(
                                          new Date().getDate() - 3
                                        )
                                      ).setUTCHours(0, 0, 0, 0) &&
                                    innerDataTime <=
                                      todate.setUTCHours(0, 0, 0, 0)
                                  );
                                } else {
                                  return (
                                    fromdate !== null &&
                                    todate !== null &&
                                    innerDataTime >=
                                      fromdate.setUTCHours(0, 0, 0, 0) &&
                                    innerDataTime <=
                                      todate.setUTCHours(0, 0, 0, 0)
                                  );
                                }
                              })
                              .map((inner_data: any, inner_index: any) => (
                                <tr
                                  key={inner_index}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "2vw",
                                  }}
                                >
                                  {inner_data.value}
                                </tr>
                              ))}
                          </td>
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ margin: "5vw", textAlign: "center" }}>
                <h2>No records Found!!!</h2>
              </div>
            )
          ) : null}
        </div>
      ) : (
        <div
          style={{
            width: "80vw",
            height: "34vw",
            overflow: "auto",
            marginTop: "2vw",
          }}
        >
          <table
            style={{
              width: "auto",
              overflow: "auto",
              textAlign: "center",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "2",
                  background: "#fafafa",
                }}
              >
                <th
                  style={{
                    margin: "1vw",
                    width: "100px",
                    textAlign: "center",
                    position: "sticky",
                    left: "0",
                    zIndex: "3",
                    background: "#fafafa",
                  }}
                >
                  Time
                </th>
                {data.length > 0 &&
                  data.map((data1: any) => (
                    <th
                      key={data1.type}
                      style={{
                        width: "auto",
                        padding: "1vw",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {data1.type}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((data1: any, outer_index: number) => (
                  <React.Fragment key={outer_index}>
                    {outer_index === 0 && (
                      <td
                        key={outer_index}
                        style={{
                          width: "auto",
                          position: "sticky",
                          left: "0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          background: "#fafafa",

                          verticalAlign: "middle",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {data1.data
                          .filter((inner_data: any) => {
                            const innerDataTime = new Date(inner_data.time);

                            return time !== null && innerDataTime >= time;
                          })
                          .map((inner_data: any, inner_index: any) => (
                            <tr
                              key={inner_index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "2vw",
                              }}
                            >
                              {inner_data.time.split(".")[0]}
                            </tr>
                          ))}
                      </td>
                    )}

                    <td
                      key={outer_index}
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {data1.data
                        .filter((inner_data: any) => {
                          const innerDataTime = new Date(inner_data.time);

                          return time !== null && innerDataTime >= time;
                        })
                        .map((inner_data: any, inner_index: any) => (
                          <tr
                            key={inner_index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "2vw",
                            }}
                          >
                            {inner_data.value}
                          </tr>
                        ))}
                    </td>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
