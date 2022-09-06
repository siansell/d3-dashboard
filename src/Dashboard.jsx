import React from "react"

// import StackedBarChart from "./StackedBarChart";
import Timeline from "./Timeline";
// import data from "./data"
import timelineData from "./timelineData"

import "./dashboard.css"

const Dashboard = () => {
    return (
        <>
            <h1>hubl Dashboard</h1>
            <hr />
            <p>TODO dashboard level settings filters etc</p>
            <hr />
            <div className="dashboard-charts">
                {/* <StackedBarChart data={data} chartId="chart1" chartTitle="Costs" /> */}
                {/* <StackedBarChart data={data} chartId="chart2" chartTitle="More costs" /> */}
                <Timeline chartId="chart3" data={timelineData} chartTitle="Timeline chart" />
            </div>
        </>
    )
}

export default Dashboard
