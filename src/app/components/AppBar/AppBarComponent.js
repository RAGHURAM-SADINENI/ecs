import { AppBar, makeStyles, Tab, Tabs, Toolbar } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

const AppBarComponent = (props) => {

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        props.history.push(newValue)
    };

    return (
        <AppBar position="static" color="inherit">
            <Toolbar className={classes.toolbar}>
                <Tabs
                    value={props.location.pathname}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollButtons="on"
                    variant="scrollable"
                    className={classes.tabs}
                >
                    <Tab icon={<HomeIcon />} value="/home" />
                    <Tab icon={<ShoppingCartIcon />} value="/cart" />
                </Tabs>
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(AppBarComponent);