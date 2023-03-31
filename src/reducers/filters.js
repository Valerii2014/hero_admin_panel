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
            let newActiveFilters = null;
            if(action.payload !== 'All'){
                newActiveFilters = state.activeFilters.some(filter => filter === action.payload) ?
                [...state.activeFilters] :
                [...state.activeFilters, action.payload]
            } else {
                newActiveFilters = state.filters.map(({element}) => element)
            }
            
            return {
                ...state,
                activeFilters: newActiveFilters
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