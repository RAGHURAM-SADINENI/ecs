export const addItem = (payload) => ({
    type: "ADD_ITEM",
    payload
})

export const deleteItem = (payload) => ({
    type: "DELETE_ITEM",
    payload
})

export const incrementCount = (payload) => ({
    type: "INCREMENT_COUNT",
    payload
})

export const decrementCount = (payload) => ({
    type: "DECREMENT_COUNT",
    payload
})