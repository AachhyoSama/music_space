import React, { Component } from "react";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Redirect,
} from "react-router-dom";
import Room from "./Room";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<p> This is the Home Page </p>}
                    />
                    <Route exact path="/join" element={<JoinRoomPage />} />
                    <Route exact path="/create" element={<CreateRoomPage />} />
                    <Route exact path="/room/:roomCode" element={<Room />} />
                </Routes>
            </Router>
        );
    }
}
