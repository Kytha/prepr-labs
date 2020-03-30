import React from "react";
import LabCard from "./LabCard";

import Input from "@material-ui/core/Input";
import TablePagination from "@material-ui/core/TablePagination";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        marginBottom: theme.spacing(2),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "auto"
        }
    },
    searchIcon: {
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

export default function LabList(props) {
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 4;
    const { labs, onSelect, selectedLab, labs_by_first_letter } = props;
    const classes = useStyles();
    const [query, setQuery] = React.useState("");

    const handleClick = (event, lab) => {
        if (selectedLab && selectedLab.id == lab.id) {
            onSelect(null);
            return;
        }
        onSelect(lab);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const isSelected = id => {
        if (!selectedLab) return false;
        return id === selectedLab.id;
    };

    const onSearch = e => {
        onSelect(null);
        setPage(0);
        setQuery(e.target.value);
    };

    const applySearch = arr => {
        if (query === "") return arr;
        const first_letter = query.charAt(0).toLowerCase();
        if (!labs_by_first_letter[first_letter]) return [];
        else
            return labs_by_first_letter[first_letter].filter(lab => {
                const i = lab.title.toLowerCase();
                const q = query.toLowerCase();
                return i.startsWith(q);
            });
    };

    if (!labs) return null;
    const list = applySearch(labs);
    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    value={query}
                    onChange={onSearch}
                />
            </div>

            {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((lab, index) => {
                    const isItemSelected = isSelected(lab.id);
                    return (
                        <LabCard
                            key={index}
                            lab={lab}
                            selected={isItemSelected}
                            onClick={handleClick}
                        ></LabCard>
                    );
                })}
            <TablePagination
                rowsPerPageOptions={[4]}
                component="div"
                count={list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
            />
        </>
    );
}
