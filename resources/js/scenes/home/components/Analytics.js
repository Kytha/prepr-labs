import React from "react";
import ReactApexChart from "react-apexcharts";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    container: {
        width: "100%",
        marginTop: theme.spacing(15)
    }
});

class Analytics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [],
            options: {
                chart: {
                    type: "donut"
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ]
            }
        };
    }

    componentDidMount() {
        this.updateChart();
    }
    componentDidUpdate(prevProps) {
        const { labs } = this.props;
        if (prevProps.labs === labs) return;
        this.updateChart();
    }

    updateChart() {
        const { labs } = this.props;
        let labels = [];
        let buckets = {};
        let series = [];
        labs.forEach(lab => {
            if (labels.indexOf(lab.country) === -1) {
                labels.push(lab.country);
            }
            if (buckets[lab.country]) {
                buckets[lab.country] += 1;
            } else {
                buckets[lab.country] = 1;
            }
        });

        labels.forEach(country => {
            const proportion = parseFloat(
                buckets[country] / labs.length
            ).toFixed(2);
            series.push(parseFloat(proportion));
        });
        this.setState({
            ...this.state,
            series: series,
            options: { ...this.state.options, labels: labels }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div id="chart" className={classes.container}>
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="donut"
                    />
                </div>
            </>
        );
    }
}

export default withStyles(styles)(Analytics);
