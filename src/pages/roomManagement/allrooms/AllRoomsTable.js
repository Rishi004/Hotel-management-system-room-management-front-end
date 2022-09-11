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
import "../main/BookingTable.css";
import "date-fns";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
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

function AllRoomsTable() {
    const classes = useStyles();

    const [openAdd, setOpenAdd] = useState(false);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const [allList, setallList] = useState([]);

    const initialValues = {
        no: "",
        roomid: "",
        roomtype: "",
        ac: "",
        bed: "",
        rent: "",
    };

    const validate = (fieldValues = values) => {
        console.log(fieldValues);
        let temp = { ...errors };
        let numbers = /^[0-9]+$/;
        if ("no" in fieldValues) {
            temp.no = numbers.test(fieldValues.no)
                ? ""
                : "Please input numeric characters only";
        }
        if ("roomid" in fieldValues) {
            temp.roomid = numbers.test(fieldValues.roomid)
                ? ""
                : "Please input numeric characters only";
        }
        if ("roomtype" in fieldValues) {
            temp.roomtype = fieldValues.roomtype
                ? ""
                : "This field is required.";
        }
        if ("ac" in fieldValues) {
            temp.ac = fieldValues.ac ? "" : "This field is required.";
        }
        if ("bed" in fieldValues) {
            temp.bed = numbers.test(fieldValues.bed)
                ? ""
                : "Please input numeric characters only";
        }
        if ("rent" in fieldValues) {
            temp.rent = numbers.test(fieldValues.rent)
                ? ""
                : "Please input numeric characters only";
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

    const addAllRooms = (e) => {
        e.preventDefault();
        if (validate()) {
            Axios.post("http://localhost:3001/available/add", {
                no: values.no,
                roomid: values.roomid,
                roomtype: values.roomtype,
                ac: values.ac,
                bed: values.bed,
                rent: values.rent,
            }).then(() => {
                console.log("Success");
                alert("Record Successfully Added");
            });
        }
    };

    const showAllRooms = () => {
        Axios.get("http://localhost:3001/available/show").then((response) => {
            setallList(response && response.data);
            console.log("showRecord", response.data);
        });
    };

    useEffect(() => {
        showAllRooms();
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
                        x.roomtype.toLowerCase().includes(target.value)
                    );
            },
        });
    };

    const recordsAfterSorting = () => {
        return filterFn.fn(allList);
    };

    return (
        <div className="row daily-main-div">
            <div className="col-10 daily-div">
                <div className="pageContent">
                    <h2>All Rooms Details</h2>
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
                        table="all-rooms-table"
                        filename="All Rooms Table"
                        sheet="Sheet"
                        buttonText="Download"
                    />
                    <Link to="/all-rooms-table-edit">
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
                        <Table className={classes.table} id="all-rooms-table">
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recordsAfterSorting().map((val, key) => (
                                    <TableRow>
                                        <TableCell>{val.no}</TableCell>
                                        <TableCell align="center">
                                            {val.roomid}
                                            <br />
                                            <br />
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.roomtype}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.ac}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.bed}
                                        </TableCell>
                                        <TableCell align="center">
                                            {val.rent}
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
                            <h2>Add New Room</h2>

                            <form
                                className="add-from-div"
                                onSubmit={addAllRooms}
                            >
                                <Grid container>
                                    <Grid item xs={6}>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="No"
                                            name="no"
                                            value={values.no}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="errorMsg">
                                            {errors.no}
                                        </span>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Room ID"
                                            name="roomid"
                                            value={values.roomid}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="errorMsg">
                                            {errors.roomid}
                                        </span>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Type"
                                            name="roomtype"
                                            value={values.roomtype}
                                            onChange={handleInputChange}
                                        />
                                        <span className="errorMsg">
                                            {errors.roomtype}
                                        </span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Bed Capacity"
                                            name="bed"
                                            value={values.bed}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="errorMsg">
                                            {errors.bed}
                                        </span>
                                        <br />
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="Rent"
                                            name="rent"
                                            value={values.rent}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="errorMsg">
                                            {errors.rent}
                                        </span>
                                        <br />
                                        <TextField
                                            autoComplete="off"
                                            className="input"
                                            id="standard-basic"
                                            label="A/C or Non A/C"
                                            name="ac"
                                            value={values.ac}
                                            onChange={handleInputChange}
                                        />
                                        <span className="errorMsg">
                                            {errors.ac}
                                        </span>
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

export default AllRoomsTable;
