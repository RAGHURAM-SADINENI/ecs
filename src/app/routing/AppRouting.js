import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { setBooks } from '../../redux/Books/BooksAction';
import AppBarComponent from '../components/AppBar/AppBarComponent';
import Cart from '../components/Cart/Cart';
import Home from '../components/Home/Home';
import DataService from '../services/DataServices';

const AppRouting = (props) => {

    useEffect(() => {
        DataService.getData().then(res => {
            props.setBooks(res);
        })
    }, [])

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AppBarComponent />
            <Switch>
                <Route path="/cart" exact component={Cart} />
                <Route path="/home" exact component={Home} />
                <Redirect from="/" to="/home" />
                <Redirect from="*" to="/home" />
            </Switch>
        </BrowserRouter>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setBooks: books => dispatch(setBooks(books))
})

export default connect(null, mapDispatchToProps)(AppRouting);