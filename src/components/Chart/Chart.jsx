import {Line,Bar} from 'react-chartjs-2'
import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";


import styles from "./Chart.module.css";
const Chart = ({data:{confirmed,recovered,deaths},country}) => {

    
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
          setDailyData(await fetchDailyData());
        };
        fetchAPI();
      },[]);

const lineChart=
    dailyData.length &&(
        <Line data={{
            labels:dailyData.map(({date})=>date),
            datasets:[{
                data:dailyData.map(({confirmed})=>confirmed),
                label:'Infected',
                borderColor:'rgb(0,0,255)',
                fill:true
            },{
                data:dailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor:'rgb(255,0,0)',
                fill:true
            },
            {
                data:dailyData.map(({recovered})=>recovered),
                label:'Recovered',
                borderColor:'rgb(0,255,0)',
                fill:true
            }]
        }}/>     
    )


    
    const barChart=
        confirmed &&(
            <Bar
            data={{
                   labels:['Infected','Recovered','Deaths'] ,
                   datasets:[{
                       label:"People",
                       backgroundColor:['rgb(0,0,255)','rgb(0,255,0)','rgb(255,0,0)'],
                       data:[confirmed.value,recovered.value,deaths.value]
                   }]
            } }
            options={{
                legend:{display:false},
                title:{display:true,text:`Current State in ${country}`}
            }}
            />
        )
    



    return <div className={styles.container}>
        {country?barChart:lineChart}</div>;
};
export default Chart;
