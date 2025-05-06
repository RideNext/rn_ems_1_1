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
import { AnyNsRecord } from "dns";

ReactSession.setStoreType("localStorage");

let KIPdata: any;
let nodeId = location.pathname.split("/")[2];
//var labels: any[] = [];
//var labels= [100, 200, 300, 400, 500, 600, 700];

// const options = {
//   fill: true,
//   responsive: true,
//   scales: {
//     y: {
//       min: 0,
//     },
//   },
//   plugins: {
//     legend: {
//       display: true,
//     },
//   },
// };

const options = {
  fill: false,
  animations: {
    resize: {
      duration: 0,
    },
    // Other animation properties as needed
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
      ticks: {},
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

export default function LineChart(this: any, chartData: any) {
  const [labels, setLabels] = useState<number[]>([]);
  const [ds, setDs] = useState<any[]>([]);
  //var lbl=message.data;
  // labels=[];

  const location = useLocation();
  //let KIPdata:any;
  KIPdata = location.state;
  if (
    localStorage.getItem("KIPdata") !== "undefined" &&
    localStorage.getItem("KIPdata") !== null
  ) {
    console.log("The website key exists");
    console.log(JSON.parse(localStorage.getItem("KIPdata") || "{}"));
    KIPdata = JSON.parse(localStorage.getItem("KIPdata") || "{}");
  } else {
    localStorage.setItem("KIPdata", JSON.stringify(KIPdata));
    console.log("The website key does NOT exist");
  }
  const selectedcellid = KIPdata.seletedCellID;
  //const selectedkpigrptype= KIPdata.seletedKPIgroup;
  var kpitypes = KIPdata.seletedKPItype;
  const selectednodeid=KIPdata.selectedNodeID;
  console.log("kpitypes", kpitypes);
  let lastPath = "/performance/" + { nodeId };
  let lbls: any[] = [];
  useEffect(() => {
    const fetchData = async () => {
      const newDs: any[] = [];
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
                      "nodes.node_id": selectednodeid,
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
        //console.log(responses);
        responses.map((response: any) => {
          let cnt: any[] = [];
        let lbl: any[] = [];
          const graph_data =
            response.data.aggregations.filtered_nodes.selected_node.cell_types.selected_cell_id.types.selected_type.cell_types_data.hits.hits[0]._source.data.map(
              (values: any) => {
                cnt.push(values.value);
                lbl.push(values.time.split(".")[0]);
              }
            );

          let color1 = randomColor();
          if (cnt.length > 20) {
            cnt = cnt.slice(-20);
            lbl = lbl.slice(-20);
          }
          lbls = lbl;
          let obj = {
            label: response.data.aggregations.filtered_nodes.selected_node.cell_types.selected_cell_id.types.selected_type.cell_types_data.hits.hits[0]._source.type,
            data: cnt,
            tension: 0,
            borderColor: color1,
            pointRadius: 6,
            fill: false,
            min: 0,
          };
          //console.log("obj",obj)
          newDs.push(obj);
        });
        //console.log("ds",ds)
        setLabels(lbls);
        setDs(newDs);
      });
    };

    fetchData();
  }, []);

  const data = {
    datasets: ds,
    labels,
  };

  return (
    <div style={{ width: "70vw", height: "35vw" }}>
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
            Back
          </Link>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: "lightgray", width: "fit-content" }}>
        <div style={{ alignSelf: "center", padding: "0.3vw" }}>
          {KIPdata && selectedcellid ? (
            <h5 style={{ alignSelf: "center" }}>
              KPI Charts for {selectedcellid}{" "}
            </h5>
          ) : (
            <h5 style={{ alignSelf: "center" }}>KPI Charts </h5>
          )}
        </div>
        <div
          style={{
            float: "left",
            backgroundColor: "lightgray",
            paddingRight: "2vw",
            width: "68vw",
            height: "35vw",
            maxHeight: "65vh",
          }}
        >
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
