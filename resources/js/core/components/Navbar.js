import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { logout } from "../auth/actions";

// MATERIAL-UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Permissible from "./Permissible";

const styles = theme => ({
    menuButton: {
        marginLeft: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {},
    logo: {
        marginRight: theme.spacing(3)
    }
});

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            menuOpen: false
        };
    }

    handleMenuOpen = event => {
        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            this.setState({
                anchorEl: event.currentTarget,
                menuOpen: !this.state.menuOpen
            });
        } else {
            return <Redirect to="/portal/login" />;
        }
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null, menuOpen: !this.state.menuOpen });
    };

    handleLogout = () => {
        const { logout } = this.props;
        this.handleMenuClose();
        logout();
    };

    render() {
        const { classes } = this.props;
        const { isAuthenticated, user } = this.props.auth;
        const { anchorEl, menuOpen } = this.state;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="./">LABS</Link>
                        </Typography>
                        {isAuthenticated && user && (
                            <Typography>Hi {user.name}</Typography>
                        )}
                        <IconButton
                            aria-label="account of current user"
                            className={classes.menuButton}
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.handleMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={menuOpen}
                            onClose={this.handleMenuClose}
                        >
                            <Permissible requiredPermissions={["admin"]}>
                                <MenuItem onClick={this.handleMenuClose}>
                                    <Link to="/admin">Admin</Link>
                                </MenuItem>
                            </Permissible>

                            <MenuItem onClick={this.handleLogout}>
                                Sign-out
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    auth: PropTypes.object,
    classes: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(withStyles(styles)(Navbar));
