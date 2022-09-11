import React from "react";
import { ReportTable, ReportChart } from "../../../pages";

function ReportMain() {
    return (
        <>
            <div className="row report-main-div">
                <div className="col-7 report-main-table">
                    <ReportTable />
                </div>
                <div className="col-5 mt-5 report-main-other">
                    <div>
                        <ReportChart />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReportMain;
