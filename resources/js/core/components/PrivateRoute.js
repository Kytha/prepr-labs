import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Component will check if user is authenticatd before preceding to mount component
 */
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <p>Loading</p>;
            }
            if (auth.isAuthenticated === false) {
                return <Redirect to="/portal/login" />;
            }
            return <Component {...props} />;
        }}
    />
);
const mapStateToProps = state => ({
    auth: state.auth
});

PrivateRoute.propTypes = {
    component: PropTypes.object,
    auth: PropTypes.object
};

export default connect(mapStateToProps)(PrivateRoute);
