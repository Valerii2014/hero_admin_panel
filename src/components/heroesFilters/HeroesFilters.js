
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useHttp } from "../../hooks/http.hook";
import { useEffect } from 'react';
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
    
    const changeActiveFilter = (element) => {
        console.log()
        if(activeFilters.some(filter => filter === element)){
            dispatch(deleteActiveFilter('All'))
            dispatch(deleteActiveFilter(element))
        } else {
            dispatch(addActiveFilter(element))
        }
    }

    const filterButtons = (filters) => {
        return filters.map(({element, style}, i) => {
            const classActive = activeFilters.some(filter => filter === element) ? 'active' : null;
            return ( 
                    <button 
                        key={i} 
                        className={`btn btn${style} ${classActive}`}
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