const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilters: ['All']
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'ADD_HERO':
            return {
                ...state,
                heroes: [...state.heroes, action.payload]
            }
        case 'DELETE_HERO':
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload)
            }
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

export default reducer;