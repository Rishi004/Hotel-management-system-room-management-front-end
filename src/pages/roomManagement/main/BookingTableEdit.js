import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ContainedButton } from "../../../components/atomic";
import "./BookingTable.css";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useFormRoom } from "../../../components/items/UseFormRoom";
import Axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 250,
        marginTop: theme.spacing(3),
    },
}));

function BookingTableEdit() {
    const classes = useStyles();

    const [bookingList, setbookingList] = useState([]);

    const [newDepDate, setnewDepDate] = useState();
    const [newPNumber, setnewPNumber] = useState(0);

    const initialValues = {
        fname: "",
        lname: "",
        pnumber: "",
        noofperson: "",
        rtype: "",
        nic: "",
    };

    const { values, setValues } = useFormRoom(initialValues, true);

    const showBookingDetails = () => {
        Axios.get("http://localhost:3001/booking/show").then((response) => {
            setbookingList(response && response.data);
            console.log("showRecord", response.data);
        });
    };

    useEffect(() => {
        showBookingDetails();
    }, []);

    const deleteBookingDetails = (id) => {
        Axios.delete(`http://localhost:3001/booking/delete/${id}`).then(
            (response) => {
                setbookingList(
                    bookingList.filter((val) => {
                        return val.id !== id;
                    })
                );
            }
        );
    };

    const updateBookingDetails = (id) => {
        Axios.put("http://localhost:3001/booking/edit", {
            depDate: newDepDate,
            pnumber: newPNumber,
            id: id,
        }).then((response) => {
            setbookingList(
                bookingList.map((val) => {
                    return val.id === id
                        ? {
                              id: val.id,
                              depDate: newDepDate,
                              pnumber: newPNumber,
                          }
                        : val;
                })
            );
            console.log("Updated");
            alert("Record Successfully updated");
        });
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
                        x.rtype.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const recordsAfterSorting = () => {
        return filterFn.fn(bookingList);
    };

    return (
        <div className="row daily-main-div">
            <div className="col-10 daily-div">
                <div className="pageContent">
                    <h2>Booking Details</h2>
                    <TextField
                        autoComplete="off"
                        className="input-search"
                        id="standard-basic"
                        label="Search"
                        onChange={handleSearch}
                    />
                    <Link to="/booking">
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
                                        <b>Name</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>NIC</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Phone No</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Room Type</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>NoOfPerson</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Arrived</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Depart</b>
                                    </TableCell>
                                    <TableCell align="center">
                                        <b>Action</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recordsAfterSorting().map((val, key) => (
                                    <TableRow>
                                        <TableCell>{val.fname}</TableCell>
                                        <TableCell align="center">
                                            {val.nic}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.pnumber}
                                            <br />
                                            <TextField
                                                autoComplete="off"
                                                className="edit-input"
                                                id="standard-basic"
                                                onChange={(e) =>
                                                    setnewPNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.rtype}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.noofperson}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.arrDate}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.depDate}
                                            <br />
                                            {/* <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <KeyboardDatePicker
                                                    className="edit-date-picker"
                                                    size="small"
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    value={newDepDate}
                                                    name="newDepDate"
                                                    onChange={(newDepDate) =>
                                                        setnewDepDate(
                                                            newDepDate
                                                        )
                                                    }
                                                    KeyboardButtonProps={{
                                                        "aria-label":
                                                            "change date",
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider> */}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ContainedButton
                                                variant="contained"
                                                size="medium"
                                                color="primary"
                                                startIcon={
                                                    <AiIcons.AiFillEdit />
                                                }
                                                text="Update"
                                                onClick={() => {
                                                    updateBookingDetails(
                                                        val.id
                                                    );
                                                }}
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
                                                text="Delete"
                                                onClick={() => {
                                                    deleteBookingDetails(
                                                        val.id
                                                    );
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default BookingTableEdit;
