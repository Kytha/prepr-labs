require("./bootstrap");
import "normalize.css";
import "../css/notifications.css";
import "../css/animate.min.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { loadUser } from "./core/auth/actions";
import ReactNotification from "react-notifications-component";
import PrivateRoute from "./core/components/PrivateRoute";
import store from "./store";
import Navbar from "./core/components/Navbar";
import Portal from "./scenes/portal";
import Home from "./scenes/home";
import Admin from "./scenes/admin";

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const theme = createMuiTheme({
    palette: {
        primary: { main: "#2699FB", contrastText: "#ffffff", light: "#BCE0FD" },
        secondary: { main: "#BCE0FD" }
    }
});

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <ReactNotification />
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route path="/portal" component={Portal} />
                            <PrivateRoute exact path="/" component={Home} />
                            <PrivateRoute
                                exact
                                path="/admin"
                                component={Admin}
                            />
                        </Switch>
                    </Router>
                </Provider>
            </ThemeProvider>
        );
    }
}

if (document.getElementById("react-app")) {
    ReactDOM.render(<App />, document.getElementById("react-app"));
}
