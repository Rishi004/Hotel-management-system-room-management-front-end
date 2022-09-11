import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
    Booking,
    AllRoomsMain,
    Dashboard,
    Reports,
    Home,
    AvailableTableEdit,
    BookingTableEdit,
    AllRoomsTableEdit,
} from "../pages";

function Index() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/booking" component={Booking} />
                    <Route exact path="/rooms" component={AllRoomsMain} />
                    <Route exact path="/reports" component={Reports} />
                    <Route
                        exact
                        path="/add-available-edit"
                        component={AvailableTableEdit}
                    />
                    <Route
                        exact
                        path="/booking-table-edit"
                        component={BookingTableEdit}
                    />
                    <Route
                        exact
                        path="/all-rooms-table-edit"
                        component={AllRoomsTableEdit}
                    />
                </Switch>
            </Router>
        </>
    );
}

export default Index;
