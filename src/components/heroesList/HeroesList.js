import './heroesList.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { deleteHero, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import {useHttp} from '../../hooks/http.hook';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();   
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const filteredHeroes = useSelector(filteredHeroesSelector) 

    useEffect(() => {
        dispatch(fetchHeroes(request))
    }, []);
        
    const onDeleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(deleteHero(id)))
            .catch(err => console.log(err))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    

    const renderHeroesList = (arr) => {
        return arr.map(({id, ...props}) => {
                return (
                    <CSSTransition
                        key={id} 
                        timeout={500}
                        classNames='list-item'>
                        <HeroesListItem 
                            {...props} 
                            deleteHero={() => onDeleteHero(id)}/>
                    </CSSTransition>
                )
            })
    }
    const noHeroes = filteredHeroes.length === 0 ? 
            <li className="text-center mt-5">Героев пока нет</li> : 
            null;
    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {noHeroes}
            <TransitionGroup component={null}>
                {elements}
            </TransitionGroup> 
        </ul>      
    )
}

export default HeroesList;

