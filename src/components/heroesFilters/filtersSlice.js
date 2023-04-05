import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
    filters: [],
    filtersLoadingStatus: 'idle',
    allFiltersId: '509263ae-a40f-4ac6-a559-1f7802f8387b'
});


export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters');
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        changeActiveFilter: (state, action) => {
            if(typeof action.payload === 'object'){
                action.payload.id === state.allFiltersId ?
                    filtersAdapter.addMany(state, state.filters) :
                    filtersAdapter.addOne(state, action.payload);
            } else {
                filtersAdapter.removeOne(state, state.allFiltersId);
                filtersAdapter.removeOne(state, action.payload);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })

            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
            })

            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })

            .addDefaultCase(() => {})
            
    }
})

const {actions, reducer} = filtersSlice;
export default reducer;
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);
export const {
        filtersFetching,
        filtersFetched,
        filtersFetchingError,
        changeActiveFilter
    } = actions;

