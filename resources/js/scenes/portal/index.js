import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

class Portal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    render() {
        const { isAuthenticated, isLoading } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <Router>
                <Switch>
                    <Route
                        path={`${this.props.match.path}/login`}
                        component={Login}
                    />
                    <Route
                        path={`${this.props.match.path}/register`}
                        component={Register}
                    />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading
    };
};

export default connect(mapStateToProps)(Portal);
