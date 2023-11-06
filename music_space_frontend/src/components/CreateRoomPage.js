import React, { useState } from "react";
import {
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link, useNavigate } from "react-router-dom";

function CreateRoomPage(props) {
    const {
        votesToSkip: defaultVotesToSkip,
        guestCanPause: defaultGuestCanPause,
        update: defaultUpdate,
        roomCode: defaultRoomCode,
        updateCallback: defaultUpdateCallback,
    } = props;

    const [votesToSkip, setVotesToSkip] = useState(defaultVotesToSkip);
    const [guestCanPause, setGuestCanPause] = useState(defaultGuestCanPause);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };

    const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value === "true" ? true : false);
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };

        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/room/" + data.code));
    };

    const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: defaultRoomCode,
            }),
        };

        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                setSuccessMessage("Room Updated Successfully!!");
            } else {
                setErrorMessage("Error updating room!!");
            }
            defaultUpdateCallback();
        });
    };

    const renderCreateButton = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleRoomButtonPressed}
                    >
                        Create a Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        to="/"
                        component={Link}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    };

    const renderUpdateButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleUpdateButtonPressed}
                >
                    Update Your Room
                </Button>
            </Grid>
        );
    };

    const title = defaultUpdate ? "Update Your Room" : "Create a Room";

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={errorMessage !== "" || successMessage !== ""}>
                    {successMessage !== "" ? (
                        <Alert
                            severity="success"
                            onClose={() => {
                                setSuccessMessage("");
                            }}
                        >
                            {successMessage}
                        </Alert>
                    ) : (
                        <Alert
                            severity="error"
                            onClose={() => {
                                setErrorMessage("");
                            }}
                        >
                            {errorMessage}
                        </Alert>
                    )}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>

                    <RadioGroup
                        row
                        value={guestCanPause.toString()}
                        onChange={handleGuestCanPauseChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />

                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <TextField
                        required={true}
                        type="number"
                        value={votesToSkip}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                        onChange={handleVotesChange}
                    />

                    <FormHelperText>
                        <div align="center">Votes Required to skip songs</div>
                    </FormHelperText>
                </FormControl>
            </Grid>

            {defaultUpdate ? renderUpdateButton() : renderCreateButton()}
        </Grid>
    );
}

CreateRoomPage.defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
};

export default CreateRoomPage;
