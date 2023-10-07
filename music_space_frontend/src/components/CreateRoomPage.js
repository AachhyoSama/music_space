import React, { Component } from "react";
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

class CreateRoomPage extends Component {
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            successMessage: "",
            errorMessage: "",
        };

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange =
            this.handleGuestCanPauseChange.bind(this);
        this.handleUpdateButtonPressed =
            this.handleUpdateButtonPressed.bind(this);
    }

    // Function to change votest
    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    // Function to change guest can pause state
    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === "true" ? true : false,
        });
    }

    handleRoomButtonPressed() {
        // Prepare to send the data
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
            }),
        };

        const { navigate } = this.props;

        fetch("/api/create-room", requestOptions)
            .then((response) => response.json())
            .then((data) => navigate("/room/" + data.code));
    }

    handleUpdateButtonPressed() {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode,
            }),
        };

        fetch("/api/update-room", requestOptions).then((response) => {
            if (response.ok) {
                this.setState({
                    successMessage: "Room Updated Successfully!!",
                });
            } else {
                this.setState({
                    errorMessage: "Error updating room!!",
                });
            }
            this.props.updateCallback();
        });
    }

    renderCreateButton() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={this.handleRoomButtonPressed}
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
    }

    renderUpdateButton() {
        return (
            <Grid item xs={12} align="center">
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleUpdateButtonPressed}
                >
                    Update Your Room
                </Button>
            </Grid>
        );
    }

    render() {
        const title = this.props.update ? "Update Your Room" : "Create a Room";
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Collapse
                        in={
                            this.state.errorMessage != "" ||
                            this.state.successMessage != ""
                        }
                    >
                        {this.state.successMessage != "" ? (
                            <Alert
                                severity="success"
                                onClose={() => {
                                    this.setState({ successMessage: "" });
                                }}
                            >
                                {this.state.successMessage}
                            </Alert>
                        ) : (
                            <Alert
                                severity="error"
                                onClose={() => {
                                    this.setState({ errorMessage: "" });
                                }}
                            >
                                {this.state.errorMessage}
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
                            defaultValue={this.props.guestCanPause.toString()}
                            onChange={this.handleGuestCanPauseChange}
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
                            defaultValue={this.props.votesToSkip}
                            inputProps={{
                                min: 1,
                                style: { textAlign: "center" },
                            }}
                            onChange={this.handleVotesChange}
                        />

                        <FormHelperText>
                            <div align="center">
                                Votes Required to skip songs
                            </div>
                        </FormHelperText>
                    </FormControl>
                </Grid>

                {this.props.update
                    ? this.renderUpdateButton()
                    : this.renderCreateButton()}
            </Grid>
        );
    }
}

// Wrap and export
export default function (props) {
    const navigate = useNavigate();

    return <CreateRoomPage {...props} navigate={navigate} />;
}
