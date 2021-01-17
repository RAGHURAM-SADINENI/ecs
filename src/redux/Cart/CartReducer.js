const initialState = []

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            if (state.filter(x => x.bookID === action.payload.bookID).length === 0) {
                return [...state, action.payload];
            } else {
                state.filter(x => x.bookID === action.payload.bookID)[0].count += 1
                return [...state];
            }

        case "DELETE_ITEM":
            let z = state.filter(x => x !== action.payload)
            return [...z];

        case "INCREMENT_COUNT":
            let x = state.indexOf(action.payload)
            state[x].count += 1
            return [...state];

        case "DECREMENT_COUNT":
            let y = state.indexOf(action.payload)
            state[y].count -= 1
            return [...state];

        default:
            return state
    }
}

export default cartReducer;