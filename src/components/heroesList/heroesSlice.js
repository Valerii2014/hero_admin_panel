import { createSlice, createSelector, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { selectAll as selectAllFilters } from "../heroesFilters/filtersSlice";


const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
        'heroes/fetchHeroes',
        () => {
            const {request} = useHttp();
            return request("http://localhost:3001/heroes")
        }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        addHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload)
        },
        deleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                    state.heroesLoadingStatus = 'loading'})

            .addCase(fetchHeroes.fulfilled, (state, action) => {
                    state.heroesLoadingStatus = 'idle';
                    heroesAdapter.setAll(state, action.payload);
                })

            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error'})
                
            .addDefaultCase(() => {})
    }    
})

const {actions, reducer} = heroesSlice;
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);
export const filteredHeroesSelector = createSelector(
    selectAll,
    selectAllFilters,
    (heroes, activeFilters) => {
        return heroes.filter(({element}) => activeFilters.some(activeFilter => activeFilter.element === element))
    }
)

export default reducer;
export const {heroesFetching,
              heroesFetched,
              heroesFetchingError,
              addHero,
              deleteHero
             } = actions;
