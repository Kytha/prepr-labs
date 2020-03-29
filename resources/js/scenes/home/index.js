import React, { Component } from "react";
import { connect } from "react-redux";
import { getLabs } from "./duck";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import LabList from "./components/LabList";
import Map from "./components/MapContainer";

const styles = theme => ({
    tabs: {
        marginBottom: theme.spacing(3)
    },
    map: {
        minHeight: "400px",
        [theme.breakpoints.up("md")]: {
            minHeight: "740px"
        }
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: null
        };
    }
    componentDidMount() {
        const { getLabs } = this.props;
        getLabs();
    }

    onSelect = lab => {
        this.setState({
            selectedLab: lab
        });
    };
    render() {
        const { labs_list, classes, labs_by_first_letter } = this.props;
        const { selectedLab } = this.state;
        return (
            <Grid
                container
                spacing={4}
                style={{
                    margin: 0,
                    width: "100%"
                }}
            >
                <Grid item xs={12} sm={12} md={4}>
                    <Tabs
                        value={0}
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                        className={classes.tabs}
                    >
                        <Tab label="BROWSE" />
                        <Tab label="ANALYTICS" />
                    </Tabs>
                    <LabList
                        labs={labs_list}
                        onSelect={this.onSelect}
                        selectedLab={selectedLab}
                        labs_by_first_letter={labs_by_first_letter}
                    ></LabList>
                </Grid>
                <Grid item xs={12} sm={12} md={8} className={classes.map}>
                    <Map
                        labs={labs_list}
                        selectedLab={selectedLab}
                        onSelect={this.onSelect}
                    />
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => {
    return {
        labs_by_first_letter: state.home.labs_by_first_letter,
        labs_list: state.home.labs_list,
        isLoading: state.home.isLoading,
        error: state.home.error
    };
};
export default connect(mapStateToProps, { getLabs })(withStyles(styles)(Home));
