import React from "react";
import { AvailableTable, AvailableChart } from "../../../pages";
import "./AvailableMain.css";

function AvailableMain() {
    return (
        <>
            <div className="mt-4 available-main-div">
                <div className="col-11 available-main-chart">
                    <AvailableChart />
                </div>
            </div>
            <div className="col-11 available-main-table-div">
                <AvailableTable />
            </div>
        </>
    );
}

export default AvailableMain;
