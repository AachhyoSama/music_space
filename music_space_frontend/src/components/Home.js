import React, { Component } from "react";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Navigate,
} from "react-router-dom";
import Room from "./Room";
import AppInfo from "./AppInfo";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };

        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    // componentDidMount means the component just rendered for the first time in the screen
    async componentDidMount() {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                });
            });
    }

    renderHomePage() {
        if (this.state.roomCode) {
            return (
                <Navigate to={`/room/${this.state.roomCode}`} replace={true} />
            );
        } else {
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h3" compact="h3">
                            Music Space
                        </Typography>

                        <Typography variant="h6" compact="h6">
                            Space for your music!!!
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            color="primary"
                        >
                            <Button color="primary" to="/join" component={Link}>
                                Join a Room
                            </Button>

                            <Button color="default" to="/info" component={Link}>
                                Info
                            </Button>

                            <Button
                                color="secondary"
                                to="/create"
                                component={Link}
                            >
                                Create a Room
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            );
        }
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={this.renderHomePage()} />
                    <Route exact path="/join" element={<JoinRoomPage />} />
                    <Route exact path="/info" element={<AppInfo />} />
                    <Route exact path="/create" element={<CreateRoomPage />} />
                    <Route
                        exact
                        path="/room/:roomCode"
                        element={
                            <Room leaveRoomCallback={this.clearRoomCode} />
                        }
                    />
                </Routes>
            </Router>
        );
    }
}
