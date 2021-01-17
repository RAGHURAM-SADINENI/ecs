const initialState = {
    search: '',
    layout: 'list'
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload }
        case "SET_LAYOUT":
            return { ...state, layout: action.payload }
        default:
            return state
    }
}

export default filtersReducer;