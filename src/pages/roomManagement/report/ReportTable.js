import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ContainedButton } from "../../../components/atomic";
import "./ReportTable.css";
import ReactHTMLtabletoExcel from "react-html-table-to-excel";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 250,
        marginTop: theme.spacing(3),
    },
}));

function ReportTable() {
    const classes = useStyles();

    const [monthlyList, setmonthlyList] = useState([]);

    const showMonthlyReport = () => {
        Axios.get("http://localhost:3001/report/show").then((response) => {
            setmonthlyList(response && response.data);
            console.log("showReport", response.data);
        });
    };

    useEffect(() => {
        showMonthlyReport();
    }, []);

    const pages = [5, 15, 30, 50, 75, 100];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const recordsAfterSelecting = () => {
        return monthlyList.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    };

    return (
        <div className="daily-main-div">
            <div className="daily-report-div">
                <div className="pageContent">
                    <h2>Room Occupancy Report</h2>

                    <ReactHTMLtabletoExcel
                        className="download-btn-report"
                        table="report-table"
                        filename="Report Table"
                        sheet="Sheet"
                        buttonText="Download"
                    />

                    <TableContainer>
                        <Table className={classes.table} id="report-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Date</b>
                                    </TableCell>
                                    <TableCell>
                                        <b>No of Rooms Booked</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recordsAfterSelecting().map((val) => (
                                    <TableRow>
                                        <TableCell>{val.arrDate}</TableCell>
                                        <TableCell>{val.booked}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        page={page}
                        rowsPerPageOptions={pages}
                        count={monthlyList.length}
                        rowsPerPage={rowsPerPage}
                        onChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReportTable;
