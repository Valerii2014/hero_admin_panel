
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter, fetchFilters, selectAll } from './filtersSlice';


import Spinner from '../spinner/Spinner';


const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, allFiltersId} = useSelector(state => state.filters);
    const activeFilters = useSelector(selectAll);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchFilters())
    }, []);

    const filterButtons = (filters) => {
        return filters.map(filter => {
            const checkActive = !activeFilters.some(activeFilter => activeFilter.id === filter.id);

            const btnClass = checkActive ? '-outline' : '';
            const action = () => dispatch(changeActiveFilter(checkActive ? 
                                                                filter : 
                                                                    filter.id))

            return ( 
                    <button 
                        key={filter.id}
                        disabled={
                            activeFilters.length === filters.length && 
                            filter.id === allFiltersId
                        } 
                        className={`btn btn${btnClass}${filter.style}`}
                        onClick={action}>
                        {filter.element}
                    </button>
                )
        })
    }

    const Buttons = activeFilters ? filterButtons(filters) : null;
    const Loading =  filtersLoadingStatus === "loading" ?  <Spinner/> : null;
    const ErrorMessage = filtersLoadingStatus === "error" ? <h5 className="text-center mt-5">Ошибка загрузки</h5> : null;

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {Buttons}
                    {Loading}
                    {ErrorMessage}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;