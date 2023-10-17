import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
    JOIN: "pages.join",
    CREATE: "pages.create",
};

export default function AppInfo(props) {
    const [page, setPage] = useState(pages.JOIN);

    const createInfo = () => {
        return (
            <Grid item xs={12} align="center">
                <Typography component="h5" variant="h5">
                    Create a room!!
                </Typography>
                <br />

                <Typography component="p" variant="p">
                    Kickstart your virtual house party with our "Create Room"
                    feature. Create a code for your room, give the code, invite
                    your friends, and take control of the music. It's as easy as
                    entering your room's code, selecting your privacy
                    preference, and integrating your Spotify account for
                    seamless music playback. Whether you're hosting a themed
                    dance party or a laid-back get-together, our "Create Room"
                    page makes it effortless to set the perfect atmosphere for
                    your online gathering.
                </Typography>
                <br />
                <Typography component="p" variant="p">
                    Customize the experience by making your room, and use your
                    Spotify credentials to access a vast library of songs. Once
                    your room is created, you'll be ready to start the music and
                    watch your friends join in for a memorable party. It's all
                    about creating a virtual space where music and socializing
                    come together, and it starts right here on the "Create Room"
                    page.
                </Typography>
                <br />
                <Typography component="p" variant="p">
                    We are bringing "Chat Features" soon to connect with your
                    friends while partying.
                </Typography>
            </Grid>
        );
    };

    const joinInfo = () => {
        return (
            <Grid item xs={12} align="center">
                <Typography component="h5" variant="h5">
                    Join a room!!
                </Typography>
                <br />
                <Typography component="p" variant="p">
                    Ready to be part of the party? Our "Join Room" feature lets
                    you join your friend's virtual house party by simply
                    entering the unique room code. It's your ticket to an
                    unforgettable virtual gathering. Just type in the code and
                    hit "Join," and you'll be instantly connected to the party
                    room your friend has set up. Vote to skip songs, listen with
                    your friend, gather and dance around. No need to worry about
                    complicated registration processes or downloads – we've made
                    it easy and hassle-free.
                </Typography>
                <br />
                <Typography component="p" variant="p">
                    Whether you've received an invitation to a themed music
                    night, a chill hangout, or any other kind of get-together,
                    our "Join Room" page ensures that you're just a few clicks
                    away from enjoying the fun. Simply enter the code, and
                    you'll find yourself in the heart of the action, where the
                    music is playing, and your friends are waiting. It's all
                    about making connections and sharing great times, and it all
                    begins on our "Join Room" page.
                </Typography>
                <br />
                <Typography component="p" variant="p">
                    We are bringing "Chat Features" soon to connect with your
                    friends while partying.
                </Typography>
            </Grid>
        );
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    What is Music Space?
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <Typography variant="body1">
                    {page === pages.JOIN ? joinInfo() : createInfo()}
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <IconButton
                    onClick={() => {
                        page === pages.CREATE
                            ? setPage(pages.JOIN)
                            : setPage(pages.CREATE);
                    }}
                >
                    {page === pages.CREATE ? (
                        <NavigateBeforeIcon />
                    ) : (
                        <NavigateNextIcon />
                    )}
                </IconButton>
            </Grid>

            <Grid item xs={12} align="center">
                <Button
                    color="secondary"
                    variant="contained"
                    to="/"
                    component={Link}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}
