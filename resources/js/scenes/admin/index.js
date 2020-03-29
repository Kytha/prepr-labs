import React, { Component } from "react";
import { connect } from "react-redux";
import { addLab, getLabs } from "./duck";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: theme.spacing(20)
    },
    inputContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    textField: {
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
        display: "block"
    },
    textFieldSmall: {
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
        width: "20ch",
        display: "block"
    },
    footer: {
        marginTop: theme.spacing(3)
    }
});

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            longitude: "",
            latitude: "",
            address: "",
            city: "",
            country: ""
        };
    }

    onSubmit = e => {
        e.preventDefault();
        const { addLab } = this.props;
        const {
            title,
            category,
            longitude,
            latitude,
            address,
            city,
            country
        } = this.state;
        const lab = {
            title,
            category,
            longitude,
            latitude,
            address,
            city,
            country
        };
        addLab(lab);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { classes } = this.props;
        const {
            title,
            category,
            longitude,
            latitude,
            address,
            city,
            country
        } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <Grid container className={classes.root}>
                    <Grid item md={6} className={classes.container}>
                        <Typography variant="h3" color="primary">
                            ADD A LAB
                        </Typography>
                        <div className={classes.inputContainer}>
                            <TextField
                                className={classes.textField}
                                required
                                id="title"
                                label="Title"
                                onChange={this.onChange}
                                value={title || ""}
                                name="title"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                            <TextField
                                required
                                id="category"
                                label="Category"
                                onChange={this.onChange}
                                value={category || ""}
                                className={classes.textField}
                                name="category"
                                type="text"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                required
                                id="address"
                                label="Address"
                                onChange={this.onChange}
                                value={address || ""}
                                className={classes.textField}
                                name="address"
                                type="text"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                required
                                id="city"
                                label="City"
                                onChange={this.onChange}
                                value={city || ""}
                                className={classes.textFieldSmall}
                                name="city"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                required
                                id="country"
                                label="Country"
                                onChange={this.onChange}
                                value={country || ""}
                                className={classes.textFieldSmall}
                                name="country"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                required
                                id="longitude"
                                label="Longitude"
                                onChange={this.onChange}
                                value={longitude || ""}
                                className={classes.textFieldSmall}
                                name="longitude"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                            <TextField
                                required
                                id="latitude"
                                label="Latitude"
                                onChange={this.onChange}
                                value={latitude || ""}
                                className={classes.textFieldSmall}
                                name="latitude"
                                type="text"
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Drop a Pin!
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default connect(null, { addLab, getLabs })(withStyles(styles)(Admin));
