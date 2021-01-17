import { combineReducers } from "redux";
import booksReducer from "./Books/BooksReducer";
import filtersReducer from "./Filters/FiltersReducer";
import cartReducer from "./Cart/CartReducer";

const rootReducer = combineReducers({
    books: booksReducer,
    filters: filtersReducer,
    cart: cartReducer
})

export default rootReducer;