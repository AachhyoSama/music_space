import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room(props) {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setshowSettings] = useState(false);
    const [spotifyAuthenticated, setspotifyAuthenticated] = useState(false);
    const [song, setSong] = useState({});

    const getRoomDetails = () => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then((response) => {
                if (!response.ok) {
                    props.leaveRoomCallback();
                    navigate("/");
                }
                return response.json();
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);

                if (data.is_host) {
                    authenticateSpotify();
                }
            });
    };

    useEffect(() => {
        // Fetch room details using the roomCode
        getRoomDetails();
        getCurrentSong();
        // This code is equivalent to componentDidMount
        const intervalId = setInterval(getCurrentSong, 1000);

        // This is equivalent to componentWillUnmount
        return () => {
            clearInterval(intervalId);
        };
    }, [roomCode]);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            Headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            props.leaveRoomCallback();
            navigate("/");
        });
    };

    const updateShowSettings = (value) => {
        setshowSettings(value);
    };

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        );
    };

    const authenticateSpotify = () => {
        fetch("/spotify/is-authenticated")
            .then((response) => response.json())
            .then((data) => {
                setspotifyAuthenticated(data.status);
                if (!data.status) {
                    fetch("/spotify/get-auth-url")
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
    };

    const getCurrentSong = () => {
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setSong(data);
            });
    };

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause}
                        roomCode={roomCode}
                        updateCallback={getRoomDetails}
                    />
                </Grid>

                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => updateShowSettings(false)}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    };

    return showSettings ? (
        renderSettings()
    ) : (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>

            <MusicPlayer {...song} />

            {isHost ? renderSettingsButton() : null}

            <Grid item xs={12} align="center">
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={leaveButtonPressed}
                >
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    );
}
