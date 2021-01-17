import { Container } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import Filters from './Filters';
import Grid from './Grid';
import List from './List';

const Home = (props) => {
    return (
        <Container>
            <Filters />
            {props.filters.layout === "grid" ?
                <Grid books={props.filters.search.length === 0 ? props.books : props.books.filter(book => book.title.toString().toLocaleLowerCase().indexOf(props.filters.search) !== -1)} />
                :
                <List books={props.filters.search.length === 0 ? props.books : props.books.filter(book => book.title.toString().toLocaleLowerCase().indexOf(props.filters.search) !== -1)} />
            }
        </Container>
    );
}

const mapStateToProps = (state) => ({
    books: state.books,
    filters: state.filters
})

export default connect(mapStateToProps)(Home);