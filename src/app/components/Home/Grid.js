import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Rating } from '@material-ui/lab';
import { addItem } from '../../../redux/Cart/CartActions';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: "20%",
        margin: 15,
        justifyContent: "center"
    },
    layout: {
        display: "flex",
        flexWrap: "wrap"
    },
    rating: {
        display: "flex",
        alignItems: "center"
    }
});



const Grid = (props) => {

    const classes = useStyles();
    const [count, setCount] = useState({
        prev: 0,
        next: 25
    })
    const [hasMore, setHasMore] = useState(true);
    const [current, setCurrent] = useState(props.books.slice(count.prev, count.next));

    const getMoreData = () => {
        if (current.length === props.books.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrent(current.concat(props.books.slice(count.prev + 10, count.next + 10)))
        }, 2000)
        setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
    }

    const addToCart = (book) => {
        book.count = 1;
        props.addItem(book);
    }

    return (
        <InfiniteScroll
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div className={classes.layout}>
                {current && current.map(((book, index) => (
                    <Card key={index} className={classes.root}>
                        <CardContent>
                            <Typography variant="h6">
                                {book.title}
                            </Typography>
                            <Typography align="right" variant="subtitle2">-{book.authors}</Typography>
                            <div className={classes.rating}>
                                <Rating name="read-only" value={book.average_rating} readOnly />
                                <Typography>({book.ratings_count})</Typography>
                            </div>
                            <Typography>ISBN:{book.isbn}</Typography>
                            <Typography>Language:{book.language_code}</Typography>
                            <Typography variant="h5">Price:${book.price}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" onClick={() => addToCart(book)}>ADD</Button>
                        </CardActions>
                    </Card>
                )))
                }
            </div>
        </InfiniteScroll>
    );
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    addItem: book => dispatch(addItem(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(Grid);