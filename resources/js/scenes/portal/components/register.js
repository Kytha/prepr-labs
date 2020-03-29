import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../../core/auth/actions";
import { Link } from "react-router-dom";

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
    textField: {
        marginBottom: theme.spacing(3),
        display: "block"
    },
    footer: {
        marginTop: theme.spacing(3)
    }
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            password_confirmation: "",
            password: ""
        };
    }

    onSubmit = e => {
        e.preventDefault();
        const { register } = this.props;
        const { email, password, password_confirmation, name } = this.state;
        if (password !== password_confirmation) return;
        register({ name, password, email, password_confirmation });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { isAuthenticated, classes } = this.props;
        const { password, email, password_confirmation, name } = this.state;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <form onSubmit={this.onSubmit}>
                <Grid container className={classes.root}>
                    <Grid item md={6} className={classes.container}>
                        <Typography variant="h3" color="primary">
                            REGISTER
                        </Typography>
                        <TextField
                            required
                            id="name"
                            label="Name"
                            onChange={this.onChange}
                            value={name || ""}
                            name="name"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            required
                            id="email"
                            label="Email"
                            onChange={this.onChange}
                            value={email || ""}
                            name="email"
                            className={classes.textField}
                            fullWidth
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            onChange={this.onChange}
                            value={password || ""}
                            className={classes.textField}
                            name="password"
                            fullWidth
                            type="password"
                        />
                        <TextField
                            required
                            id="password_confirmation"
                            label="Confirm Password"
                            onChange={this.onChange}
                            value={password_confirmation || ""}
                            className={classes.textField}
                            name="password_confirmation"
                            fullWidth
                            type="password"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Register
                        </Button>

                        <Typography
                            color="textSecondary"
                            className={classes.footer}
                        >
                            Already have an account?{" "}
                            <Link to="/portal/login">Login!</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default connect(null, { register })(withStyles(styles)(Register));
