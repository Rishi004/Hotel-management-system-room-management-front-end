import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "./AvailableChart.css";

function AvailableChart() {
    return (
        <>
            <div className="available-chart-div">
                <Line
                    data={{
                        labels: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec",
                        ],
                        datasets: [
                            {
                                label: "# of Bookings",
                                data: [
                                    142, 124, 125, 145, 145, 126, 123, 110, 150,
                                    126, 134, 136,
                                ],
                                backgroundColor: "#ff8080",
                                borderColor: "#ff8080",

                                borderWidth: 1,
                            },

                            {
                                label: "# of Person",
                                data: [
                                    170, 180, 150, 178, 189, 198, 200, 165, 210,
                                    154, 198, 140,
                                ],
                                backgroundColor: "rgba(54, 162, 235, 1)",
                                borderColor: "rgba(54, 162, 235, 1)",

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

export default AvailableChart;
