export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const addHero = (hero) => {
    return {
        type: 'ADD_HERO',
        payload: hero
    }
}
export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload: id
    }
}

export const setFilters = (filters) => {
    return {
        type: 'SET_FILTERS',
        payload: filters
    }
}
export const addActiveFilter = (filter) => {
    return {
        type: 'ADD_ACTIVE_FILTER',
        payload: filter
    }
}

export const deleteActiveFilter = (filter) => {
    return {
        type: 'DELETE_ACTIVE_FILTER',
        payload: filter
    }
}