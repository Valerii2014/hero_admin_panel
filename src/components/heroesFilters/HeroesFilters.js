
import { useEffect } from 'react';
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, addActiveFilter, deleteActiveFilter} from "../../actions";

const HeroesFilters = () => {

    const {request} = useHttp();
    const {filters, activeFilters} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const getFilters = () => {
        request('http://localhost:3001/filters')
            .then(data => dispatch(setFilters(data)))
            .catch(err => console.log(err))
    }
    
    useEffect(getFilters, []);

    const checkActiveFilters = (choisedFilter) => {
        if(choisedFilter !== 'All'){
            return activeFilters.some(filter => filter === choisedFilter) ?
            [...activeFilters] :
            [...activeFilters, choisedFilter];
        } else {
            return filters.map(({element}) => element);
        }
    }
    
    const changeActiveFilter = (element) => {
        if(activeFilters.some(filter => filter === element)){
            dispatch(deleteActiveFilter('All'))
            dispatch(deleteActiveFilter(element))
        } else {
            const filters = checkActiveFilters(element);
            dispatch(addActiveFilter(filters))
        }
    }

    const filterButtons = (filters) => {
        return filters.map(({element, style}, i) => {
            const classActive = !activeFilters.some(filter => filter === element) ? '-outline' : '';
            return ( 
                    <button 
                        key={i}
                        disabled={activeFilters.length === 5 && element === 'All'} 
                        className={`btn btn${classActive}${style}`}
                        onClick={() => changeActiveFilter(element)}>
                        {element}
                    </button>
                )
        })
    }
    console.log(activeFilters)
    const Buttons = filterButtons(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {Buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;