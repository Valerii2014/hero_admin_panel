import { useEffect } from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetching, heroesFetched, heroesFetchingError, deleteHero } from '../../actions';

import {useHttp} from '../../hooks/http.hook';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    
    const filteredHeroesSelector = createSelector(
        state => state.heroes.heroes,
        state => state.filters.activeFilters,
        (heroes, activeFilters) => {
            return heroes.filter(({element}) => {
                return element => activeFilters.some(filter => filter === element)
            }) 
        }
    )
    
    const {request} = useHttp();
    const dispatch = useDispatch();
    const filteredHeroes = useSelector(filteredHeroesSelector)   
    const {heroesLoadingStatus} = useSelector(state => state.heroes);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
    }, []);
    
        
    const onDeleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(deleteHero(id)))
            .catch(err => console.log(err))
    }


    const renderHeroesList = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        
        return arr.map(({id, ...props}) => {
                return <HeroesListItem key={id} {...props} deleteHero={() => onDeleteHero(id)}/>
            })
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;