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
import { blue, green, pink, yellow } from "@mui/material/colors";
import { Paper } from "@mui/material";
ReactSession.setStoreType("localStorage");

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
        stepSize: 1,
      },
    },
    x: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
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
let container_name = location.pathname.split('/')[2];
export default function SystemChart(this: any, chartData: any) {
  const [resdata, setresdatarData] = useState([]);
  const [labels, setLabels] = useState<number[]>([]);
  const [ds, setDs] = useState<any[]>([]);
  let grpColor="";
  //var lbl=message.data;
  // labels=[];
  const location = useLocation();
  let lbls: any[] = [];
  useEffect(() => {
     container_name = location.pathname.split('/')[2];
    //alert(container_name);
    fetchHistoryData(container_name);
  }, []);

  const data = {
    datasets: ds,
    labels,
  };
  const fetchHistoryData = (container_name: any) => {
    //let chartData = JSON.parse(localStorage.getItem("Chartdata") || "{}");
    const newDs: any[] = [];
    const baseUri = `${window.location.origin}`;
   // axios.get(baseUri + "/rn_ems_perf_util/_search").then((data1: any) => {
    //  const resdata = data1.data.hits.hits.find((ele: any) => { return ele._id === container_name; })._source.data
      //setresdatarData(resdata);
      // Promise.all(resdata).then((responses: any) => {
      //console.log(responses);
      const resdata =JSON.parse(localStorage.getItem("Chartdata") || "{}");
      const PerType =JSON.parse(localStorage.getItem("PerType") || "{}");
      let i = 0;
      let cpu: any[] = [];
      let memUsage: any[] = [];
      let memPer: any[] = [];
      let memLim: any[] = [];
      let memLimMaxVal: any[] = [];
    
      resdata.map((response: any) => {
        let lbl: any[] = [];
        let datalbl: any[] = [];
        const graph_data =
          Object.entries(response).map(
            (values: any) => {
             if(values[0]===PerType){
              if (PerType === "cpu_utilization") {
                grpColor="blue";
                if(values[1]?.toString().indexOf("%") >= 0){
                  cpu.push(parseFloat(values[1]?.replace('%', '')));
              }
              else
              {
                cpu.push(values[1]);
              }
               // cpu.push(values[1].replace('%', ''));
              }
              if (PerType === "memory_usage") {
                grpColor="green";
                if(values[1]?.toString().indexOf("M") >= 0 ){
                  cpu.push(parseFloat(values[1]?.split('M')[0]));
              }
              else
              {
                cpu.push(values[1]);
               // memUsage.push(values[1].split('M')[0]);
              }
            }
              if (PerType === "memory_percentage") {
                grpColor="yellow";
                if(values[1]?.toString().indexOf("%") >= 0 ){
                  cpu.push(parseFloat(values[1]?.replace('%', '')));
              }
              else
              {
               // memPer.push(values[1].replace('%', ''));
               cpu.push(values[1]);
              }
            }
              if (PerType === "memory_limit") {
                grpColor="red";
                if(values[1]?.toString().indexOf("G") >= 0 ){
                  memLim.push(parseFloat(values[1]?.toString().split('G')[0]));
              }
              else
              {
                //memLim.push(values[1].split('G')[0]);
              }
            }
          }
          else if(values[0]==="memory_limit"){
            if(values[1]?.toString().indexOf("G") >= 0 ){
                  memLim.push(parseFloat(values[1]?.toString().split('G')[0]));
              }
              else
              {
                memLim.push(values[1]);
                //memLim.push(values[1].split('G')[0]);
              }
          }
      });
      const emsTimeZone = (window as any).configs.REACT_APP_EMS_TIME_ZONE;
      console.log(emsTimeZone);
        lbl.push(  new Date(response.time / 1000)
        .toLocaleString("en-GB", {
          timeZone: emsTimeZone,
          hour12: false,
        }).replace(",", "")
        .replace(/\//g, "-"));
        lbls.push(lbl);
        //console.log("obj",obj)
      });
      let color1 = randomColor();
      // if (cnt.length > 20) {
      //   cnt = cnt.slice(-20);
      //   lbl = lbl.slice(-20);
      // }
      if (PerType === "memory_usage") {
        memLim.sort((a, b) => {
          return b - a;
        });
        const maxVal = memLim[0];
        for(var k=0;k<memLim.length;k++)
        {
          memLim[k] = maxVal;
        }
      }
      let cpuobj = {
        label: PerType,
        data: cpu,
        tension: 0,
        borderColor: grpColor,
        pointRadius: 1,
        fill: false,
        min: -1,
      };
      let memUsageobj = {
        label: "Memort Usage",
        data: memUsage,
        tension: 0,
        borderColor: grpColor,
        pointRadius: 1,
        fill: false,
        min: -1,
      };
      let memPerobj = {
        label: "Memory Percentage",
        data: memPer,
        tension: 0,
        borderColor: grpColor,
        pointRadius: 1,
        fill: false,
        min: -1,
      };
      let memLimobj = {
        label: "Memory Limit",
        data: memLim,
        tension: 0,
        borderColor: "red",
        pointRadius: 1,
        fill: false,
        min: -1,
      };
      if (PerType === "memory_usage") {
      
        newDs.push(cpuobj);
        newDs.push(memLimobj);
      }
      else {
      newDs.push(cpuobj);
      }
      // newDs.push(memUsageobj);
      // newDs.push(memPerobj);
      // newDs.push(memLimobj);
      //console.log("ds",ds)
      setLabels(lbls);
      setDs(newDs);
    //});
    //})
  }
  return (
    <div>
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
      <Paper style={{ width: "100%", border: '2px solid #ccc', marginTop: '0px' }}>
      <div style={{ color: 'black', backgroundColor: '#c6cbd1', height: '40px', fontSize: '16px', margin: '5px' }} ><b style={{marginTop:'5px'}}> System Performance History Chart for {container_name}</b></div>
      <div style={{ backgroundColor: "lightgray", width: "fit-content" }}>
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
    </Paper>
    </div>
    </div>
  );
}
