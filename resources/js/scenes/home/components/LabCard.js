import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import cx from "classnames";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
        marginBottom: theme.spacing(1),
        cursor: "pointer"
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 8
    },
    highlight: {
        background: theme.palette.primary.light
    }
}));

export default function LabCard(props) {
    const classes = useStyles();
    const { lab, selected, onClick } = props;
    return (
        <Card
            className={classes.root}
            variant="outlined"
            onClick={e => onClick(e, lab)}
            className={cx(classes.root, selected ? classes.highlight : "")}
        >
            <CardContent>
                <Typography variant="h6" component="h2">
                    {lab.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {lab.category}
                </Typography>
                <Typography variant="body2" component="p">
                    {lab.city} , {lab.country}
                </Typography>
            </CardContent>
        </Card>
    );
}
