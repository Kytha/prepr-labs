import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../core/auth/actions";
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

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onSubmit = e => {
        e.preventDefault();
        const { login } = this.props;
        const { email, password } = this.state;
        login(email, password);
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { isAuthenticated, classes } = this.props;
        const { password, email } = this.state;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <form onSubmit={this.onSubmit}>
                <Grid container className={classes.root}>
                    <Grid item md={6} className={classes.container}>
                        <Typography variant="h3" color="primary">
                            WELCOME!
                        </Typography>
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

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>

                        <Typography
                            color="textSecondary"
                            className={classes.footer}
                        >
                            Don't have an account? No Problem!{" "}
                            <Link to="/portal/register">Sign up today!</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default connect(null, { login })(withStyles(styles)(Login));
