import React, { useState, useEffect } from "react";
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

function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            });
    }, []);

    const clearRoomCode = () => {
        setRoomCode(null);
    };

    const renderHomePage = () => {
        if (roomCode) {
            return <Navigate to={`/room/${roomCode}`} replace={true} />;
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
    };

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={renderHomePage()} />
                <Route exact path="/join" element={<JoinRoomPage />} />
                <Route exact path="/info" element={<AppInfo />} />
                <Route exact path="/create" element={<CreateRoomPage />} />
                <Route
                    exact
                    path="/room/:roomCode"
                    element={<Room leaveRoomCallback={clearRoomCode} />}
                />
            </Routes>
        </Router>
    );
}

export default HomePage;
