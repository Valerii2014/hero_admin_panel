const initialState = {
    filters: [],
    activeFilters: ['All']
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.payload,
                activeFilters: action.payload.map(({element}) => element)
            }
        case 'ADD_ACTIVE_FILTER':
            return {
                ...state,
                activeFilters: action.payload
            }
        case 'DELETE_ACTIVE_FILTER':
            return {
                ...state,
                activeFilters: state.activeFilters.filter(filter => filter !== action.payload)
            }
        default: return state
    }
}

export default filters;