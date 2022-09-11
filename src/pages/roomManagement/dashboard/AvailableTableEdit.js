import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    TablePagination,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ContainedButton } from "../../../components/atomic";
import "../main/BookingTable.css";
import * as AiIcons from "react-icons/ai";
import "date-fns";
import { useFormRoom } from "../../../components/items/UseFormRoom";
import Axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 250,
        marginTop: theme.spacing(3),
    },
}));

function AvailableTableEdit() {
    const classes = useStyles();

    const [availableList, setavailableList] = useState([]);

    const [newAc, setnewAc] = useState("");
    const [newRent, setnewRent] = useState(0);

    const initialValues = {
        no: "",
        roomid: "",
        roomtype: "",
        ac: "",
        bed: "",
        rent: "",
    };

    const { values, setValues } = useFormRoom(initialValues, true);

    const showAvailableRoom = () => {
        Axios.get("http://localhost:3001/available/show").then((response) => {
            setavailableList(response && response.data);
            console.log("showRecord", response.data);
        });
    };

    useEffect(() => {
        showAvailableRoom();
    }, []);

    const deleteAvailableRoom = (id) => {
        Axios.delete(`http://localhost:3001/available/delete/${id}`).then(
            (response) => {
                setavailableList(
                    availableList.filter((val) => {
                        return val.id !== id;
                    })
                );
            }
        );
    };

    const updateAvailableRoom = (id) => {
        Axios.put("http://localhost:3001/available/edit", {
            ac: newAc,
            rent: newRent,
            id: id,
        }).then((response) => {
            setavailableList(
                availableList.map((val) => {
                    return val.id === id
                        ? {
                              id: val.id,
                              ac: newAc,
                              rent: newRent,
                          }
                        : val;
                })
            );
            console.log("Updated");
            alert("Record Successfully Added");
        });
    };

    const pages = [5, 15, 31];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const [filterFn, setfilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const handleSearch = (e) => {
        let target = e.target;
        setfilterFn({
            fn: (items) => {
                if (target.value === "") return items;
                else
                    return items.filter((x) =>
                        x.roomtype.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const recordsAfterPagingAndSorting = () => {
        return filterFn
            .fn(availableList)
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    };

    return (
        <div className="row daily-main-div">
            <div className="col-11 daily-table-div-div">
                <div className="pageContent">
                    <h2>Available Rooms Details</h2>
                    <TextField
                        autoComplete="off"
                        className="input-search"
                        id="standard-basic"
                        label="Search"
                        onChange={handleSearch}
                    />

                    <Link to="/dashboard">
                        <ContainedButton
                            className="download-record-btn"
                            variant="contained"
                            size="large"
                            color="primary"
                            text="Back"
                        />
                    </Link>

                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>No</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Room ID</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Type</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>A/C or Non A/C</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Bed Capacity</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Rent</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Action</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recordsAfterPagingAndSorting().map(
                                    (val, key) => (
                                        <TableRow>
                                            <TableCell>{val.no}</TableCell>
                                            <TableCell align="center">
                                                {val.roomid}
                                            </TableCell>
                                            <TableCell align="center">
                                                {val.roomtype}
                                            </TableCell>
                                            <TableCell align="center">
                                                {val.ac}
                                                <br />
                                                <TextField
                                                    autoComplete="off"
                                                    className="input-table"
                                                    id="standard-basic"
                                                    onChange={(event) => {
                                                        setnewAc(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {val.bed}
                                            </TableCell>
                                            <TableCell align="center">
                                                {val.rent}
                                                <br />
                                                <TextField
                                                    autoComplete="off"
                                                    className="input-table"
                                                    id="standard-basic"
                                                    onChange={(event) => {
                                                        setnewRent(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <ContainedButton
                                                    variant="contained"
                                                    size="medium"
                                                    color="primary"
                                                    startIcon={
                                                        <AiIcons.AiFillEdit />
                                                    }
                                                    onClick={() => {
                                                        updateAvailableRoom(
                                                            val.id
                                                        );
                                                    }}
                                                    text="Update"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ContainedButton
                                                    variant="contained"
                                                    size="medium"
                                                    color="secondary"
                                                    startIcon={
                                                        <AiIcons.AiFillDelete />
                                                    }
                                                    onClick={() => {
                                                        deleteAvailableRoom(
                                                            val.id
                                                        );
                                                    }}
                                                    text="Delete"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        page={page}
                        rowsPerPageOptions={pages}
                        count={availableList.length}
                        rowsPerPage={rowsPerPage}
                        onChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default AvailableTableEdit;
