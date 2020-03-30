import React, { Component } from "react";
import { connect } from "react-redux";
import { getLabs } from "./duck";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Analytics from "./components/Analytics";

import LabList from "./components/LabList";
import Map from "./components/MapContainer";

const styles = theme => ({
    root: {
        [theme.breakpoints.down("md")]: {
            flexDirection: "column-reverse"
        }
    },
    tabs: {
        marginBottom: theme.spacing(3)
    },
    map: {
        minHeight: "400px",
        [theme.breakpoints.up("md")]: {
            minHeight: "740px"
        },
        [theme.breakpoints.down("sm")]: {
            height: "400px"
        }
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLab: null,
            tabIndex: 0
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
    handleTabClick = index => {
        this.setState({ tabIndex: index });
    };
    render() {
        const { labs_list, classes, labs_by_first_letter } = this.props;
        const { selectedLab, tabIndex } = this.state;

        return (
            <Grid
                container
                spacing={4}
                style={{
                    margin: 0,
                    width: "100%"
                }}
                className={classes.root}
            >
                <Grid item xs={12} sm={12} md={4}>
                    <Tabs
                        value={tabIndex}
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                        className={classes.tabs}
                    >
                        <Tab
                            label="BROWSE"
                            onClick={() => this.handleTabClick(0)}
                        />
                        <Tab
                            label="ANALYTICS"
                            onClick={() => this.handleTabClick(1)}
                        />
                    </Tabs>
                    {tabIndex === 0 ? (
                        <LabList
                            labs={labs_list}
                            onSelect={this.onSelect}
                            selectedLab={selectedLab}
                            labs_by_first_letter={labs_by_first_letter}
                        ></LabList>
                    ) : (
                        <Analytics labs={labs_list} />
                    )}
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
