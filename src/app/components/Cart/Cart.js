import { Card, CardActions, CardContent, Container, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { connect } from 'react-redux';
import { decrementCount, deleteItem, incrementCount } from '../../../redux/Cart/CartActions';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 15,
        padding: 15
    },
    layout: {
        display: "flex",
        flexWrap: "wrap"
    },
    rating: {
        display: "flex",
        alignItems: "center"
    },
    conatiner1: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    conatiner2: {
        display: "flex",
        justifyContent: "space-evenly"
    }
});

const Item = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.conatiner1}>
                <div>
                    <Typography variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle2">-{props.authors}</Typography>
                    <div className={classes.rating}>
                        <Rating name="read-only" value={props.average_rating} readOnly />
                        <Typography>({props.ratings_count})</Typography>
                    </div>
                    <Typography>ISBN:{props.isbn}</Typography>
                    <Typography>Language:{props.language_code}</Typography>
                    <Typography>Count:{props.count}</Typography>
                    <Typography variant="h5">Price:${props.price}</Typography>
                </div>
                <IconButton>
                    <DeleteIcon fontSize="large" onClick={() => props.deleteItem()} />
                </IconButton>
                <div>
                    <Typography variant="h5">
                        Item Total:${props.count * props.price}
                    </Typography>
                </div>
            </CardContent>
            <CardActions className={classes.conatiner2}>
                <IconButton color="primary" onClick={() => props.incrementCount()}>
                    <AddIcon />
                </IconButton>
                <Typography variant="h5">{props.count}</Typography>
                <IconButton color="secondary"
                    onClick={() => {
                        if (props.count === 1) {
                            props.deleteItem()
                        } else {
                            props.decrementCount()
                        }
                    }}>
                    <RemoveIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

const Cart = (props) => {
    return (
        <Container style={{ marginTop: "4%" }}>
            {props.cartItem.length === 0 ?
                <Typography>No items in cart</Typography>
                :
                <React.Fragment>
                    {props.cartItem.map((book, index) =>
                        <Item
                            {...book}
                            key={index}
                            deleteItem={() => { props.deleteItem(book) }}
                            decrementCount={() => { props.decrementCount(book) }}
                            incrementCount={() => { props.incrementCount(book) }}
                        />
                    )}
                    <Typography variant="h4">Total Price: ${props.cartItem.reduce((c, item) => c += item.price * item.count, 0)}</Typography>
                </React.Fragment>
            }
        </Container>
    );
}

const mapStateToProps = (state) => ({
    cartItem: state.cart
})

const mapDispatchToProps = (dispatch) => ({
    deleteItem: item => dispatch(deleteItem(item)),
    incrementCount: item => dispatch(incrementCount(item)),
    decrementCount: item => dispatch(decrementCount(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);