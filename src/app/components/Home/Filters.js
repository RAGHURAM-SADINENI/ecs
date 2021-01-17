import React, { useState } from 'react';
import GridOnIcon from '@material-ui/icons/GridOn';
import ReorderIcon from '@material-ui/icons/Reorder';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Search from './Search';
import { IconButton, makeStyles } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { setLayout, setSearch } from '../../../redux/Filters/FiltersAction';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "4%"
    }
}));

const Filters = (props) => {

    const classes = useStyles();

    const handleLayout = (event, newLayout) => {
        props.setLayout(newLayout);
    };

    return (
        <div className={classes.container}>
            <Search search={props.filters.search} setSearch={(text) => props.setSearch(text)} />
            <ToggleButtonGroup
                value={props.filters.layout}
                exclusive
                onChange={handleLayout}
                aria-label="text layout"
            >
                <ToggleButton value="grid" aria-label="left aligned">
                    <GridOnIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="centered">
                    <ReorderIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            <IconButton>
                <FilterListIcon />
            </IconButton>
        </div>
    );
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    setSearch: search => dispatch(setSearch(search)),
    setLayout: layout => dispatch(setLayout(layout))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters);