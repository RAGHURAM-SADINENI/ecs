import { Button, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Rating } from '@material-ui/lab';
import { addItem } from '../../../redux/Cart/CartActions';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'Selected', numeric: false, disablePadding: false, label: 'SELECT' },
    { id: 'bookID', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'TITLE' },
    { id: 'authors', numeric: false, disablePadding: false, label: 'AUTHORS' },
    { id: 'average_rating', numeric: false, disablePadding: false, label: 'RATINGS' },
    { id: 'isbn', numeric: true, disablePadding: false, label: 'ISBN' },
    { id: 'language_code', numeric: false, disablePadding: false, label: 'LANGUAGE' },
    { id: 'rating_count', numeric: true, disablePadding: false, label: 'COUNT' },
    { id: 'price', numeric: true, disablePadding: false, label: 'PRICE' },
];

const EnhancedTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: "2%"
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const List = (props) => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.books.length - page * rowsPerPage);

    const addToCart = (book) => {
        book.count = 1;
        props.addItem(book);
    }

    return (
        <div className={classes.root}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(props.books, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = row.Selected;
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        //onClick={() => props.setSelected(row)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.Name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Button color="primary" onClick={() => addToCart(row)}>ADD</Button>
                                        </TableCell>
                                        <TableCell align="right">{row.bookID}</TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">{row.authors}</TableCell>
                                        <TableCell align="right"><Rating name="read-only" value={row.average_rating} readOnly /></TableCell>
                                        <TableCell align="right">{row.isbn}</TableCell>
                                        <TableCell align="right">{row.language_code}</TableCell>
                                        <TableCell align="right">{row.ratings_count}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.books.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
    addItem: book => dispatch(addItem(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(List);