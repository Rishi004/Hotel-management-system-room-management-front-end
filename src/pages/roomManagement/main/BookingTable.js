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
import ReactHTMLtabletoExcel from "react-html-table-to-excel";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 250,
        marginTop: theme.spacing(3),
    },
}));

function BookingTable() {
    const classes = useStyles();

    const [openAdd, setOpenAdd] = useState(false);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const [depDate, setdepDate] = useState(new Date());
    const [arrDate, setarrDate] = useState(new Date());

    const [bookingList, setbookingList] = useState([]);

    const initialValues = {
        fname: "",
        lname: "",
        pnumber: "",
        noofperson: "",
        rtype: "",
        nic: "",
    };

    const validate = (fieldValues = values) => {
        console.log(fieldValues);
        let temp = { ...errors };
        let numbers = /^[0-9]+$/;
        if ("pnumber" in fieldValues) {
            temp.pnumber = numbers.test(fieldValues.pnumber)
                ? ""
                : "Please input numeric characters only";
        }
        if ("noofperson" in fieldValues) {
            temp.noofperson = numbers.test(fieldValues.noofperson)
                ? ""
                : "Please input numeric characters only";
        }
        if ("rtype" in fieldValues) {
            temp.rtype = fieldValues.rtype ? "" : "This field is required.";
        }

        if ("fname" in fieldValues) {
            temp.fname = fieldValues.fname ? "" : "This field is required.";
        }

        if ("lname" in fieldValues) {
            temp.lname = fieldValues.lname ? "" : "This field is required.";
        }

        if ("nic" in fieldValues) {
            temp.nic = fieldValues.nic ? "" : "This field is required.";
        }

        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useFormRoom(initialValues, true, validate);

    const addBookingDetails = (e) => {
        e.preventDefault();
        if (validate()) {
            Axios.post("http://localhost:3001/booking/add", {
                fname: values.fname,
                lname: values.lname,
                rtype: values.rtype,
                nic: values.nic,
                pnumber: values.pnumber,
                noofperson: values.noofperson,
                depDate: depDate,
                arrDate: arrDate,
            }).then(() => {
                console.log("Success");
                alert("Record Successfully Added");
            });
        }
    };

    const showBookingDetails = () => {
        Axios.get("http://localhost:3001/booking/show").then((response) => {
            setbookingList(response && response.data);
            console.log("showRecord", response.data);
        });
    };

    useEffect(() => {
        showBookingDetails();
    }, []);

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
                    <br />
                    <ReactHTMLtabletoExcel
                        className="download-btn-available"
                        table="booking-table"
                        filename="Room Booking Table"
                        sheet="Sheet"
                        buttonText="Download"
                    />
                    <Link to="/booking-table-edit">
                        <ContainedButton
                            className="download-record-btn"
                            variant="contained"
                            size="large"
                            color="primary"
                            text="Edit"
                        />
                    </Link>
                    <ContainedButton
                        className="add-new"
                        variant="contained"
                        size="medium"
                        color="default"
                        onClick={handleClickOpenAdd}
                        startIcon={<IoIcons.IoMdAdd />}
                        text="Add New"
                    />
                    <TableContainer>
                        <Table className={classes.table} id="booking-table">
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recordsAfterSorting().map((val, key) => (
                                    <TableRow>
                                        <TableCell>
                                            {val.fname}
                                            <br />
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.nic}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.pnumber}
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Dialog open={openAdd} fullWidth={true} maxWidth={"lg"}>
                    <DialogContent>
                        <center>
                            <h2>Add Room Booking</h2>

                            <form
                                className="add-from-div"
                                onSubmit={addBookingDetails}
                            >
                                <Grid container>
                                    <Grid item xs={6}>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="First Name"
                                            value={values.fname}
                                            name="fname"
                                            onChange={handleInputChange}
                                        />
                                        <span className="errorMsg">
                                            {errors.fname}
                                        </span>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Phone Number"
                                            name="pnumber"
                                            value={values.pnumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="errorMsg">
                                            {errors.pnumber}
                                        </span>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Room Type"
                                            name="rtype"
                                            value={values.rtype}
                                            onChange={handleInputChange}
                                        />
                                        <span className="errorMsg">
                                            {errors.rtype}
                                        </span>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="booking-date-picker"
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Depature Date"
                                                value={depDate}
                                                name="depDate"
                                                onChange={(depDate) =>
                                                    setdepDate(depDate)
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                required
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Last Name"
                                            value={values.lname}
                                            name="lname"
                                            onChange={handleInputChange}
                                        />
                                        <span className="errorMsg">
                                            {errors.lname}
                                        </span>
                                        <br />
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="No of Person"
                                            value={values.noofperson}
                                            name="noofperson"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="errorMsg">
                                            {errors.noofperson}
                                        </span>
                                        <br />
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="NIC/Passport No"
                                            value={values.nic}
                                            name="nic"
                                            onChange={handleInputChange}
                                        />
                                        <span className="errorMsg">
                                            {errors.nic}
                                        </span>
                                        <MuiPickersUtilsProvider
                                            utils={DateFnsUtils}
                                        >
                                            <KeyboardDatePicker
                                                className="booking-date-picker"
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Arrived Date"
                                                value={arrDate}
                                                onChange={(arrDate) =>
                                                    setarrDate(arrDate)
                                                }
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                required
                                            />
                                        </MuiPickersUtilsProvider>
                                        <br />
                                        <ContainedButton
                                            type="submit"
                                            className="add-record-btn"
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            text="Submit"
                                        />
                                        <ContainedButton
                                            className="add-record-btn"
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            text="Reset"
                                            onClick={resetForm}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </center>
                    </DialogContent>
                    <DialogActions>
                        <ContainedButton
                            className="add-record-btn"
                            onClick={handleCloseAdd}
                            color="secondary"
                            text="Cancel"
                        />
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default BookingTable;
