import React, { useEffect, useState } from "react";
import "./ReportChart.css";
import { flattenDeep } from "lodash";
import Axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";

function ReportChart() {
    const [reportChart, setreportChart] = useState([]);
    const [labels, setlabels] = useState([]);
    const [values, setvalues] = useState([]);

    const showReportChart = () => {
        Axios.get("http://localhost:3001/report/show").then((response) => {
            setreportChart(response && response.data);
            console.log("showRecord", response.data);
            let flatternData = flattenDeep(response.data.map((x) => x.arrDate));
            let flatternValues = flattenDeep(
                response.data.map((y) => y.booked)
            );
            setlabels(flatternData);
            setvalues(flatternValues);
        });
    };

    useEffect(() => {
        showReportChart();
    }, []);

    return (
        <>
            <div className="report-chart-div">
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "# of Bookings",
                                data: values,
                                backgroundColor: "#ff8080",
                                borderColor: "#ff8080",

                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={400}
                    width={1247}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: false,
                            },
                        },
                    }}
                />
            </div>
            <div className="report-chart-div">
                <Bar
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "# of Bookings",
                                data: values,
                                backgroundColor: "#ff8080",
                                borderColor: "#ff8080",

                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={400}
                    width={1247}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: false,
                            },
                        },
                    }}
                />
            </div>
        </>
    );
}

export default ReportChart;
