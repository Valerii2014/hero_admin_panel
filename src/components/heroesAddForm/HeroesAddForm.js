


import { useEffect, useState } from "react";
import { Formik } from "formik";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { addHero } from "../../actions";

const HeroesAddForm = () => {

    const dispatch = useDispatch();

    const {request} = useHttp();

    const [filters, setFilters] = useState([]);
    
    
    const getFilters = () => {
        request('http://localhost:3001/filters')
        .then(data => setFilters(data))
        .catch(err => console.log(err))
    }
    
    useEffect(getFilters, []);

    const postHero = (hero) => {
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(hero))
            .then(dispatch(addHero(hero)))
            .catch(err => console.log(err))
    }

    const onPostNewHero = ({name, text, element}) => {
        const id = uuidv4();
        const hero = {
            'id': id,
            'name': name,
            'description': text,
            'element': element
        }
        postHero(hero);
    }
   
    return (
        <Formik
            initialValues={{   
                name: '', 
                text: '', 
                element: '' 
            }}

            validate = {values => {
                const errors = {};
                if(!values.name) {
                    errors.name = 'Обязательное поле!'
                } else if (values.name.length < 3) {
                    errors.name = 'Єто поле должно бьіть более 3 символов!'
                }
                if(!values.text) {
                    errors.text = 'Обязательное поле!'
                } else if (values.text.length < 5) {
                    errors.text = 'Єто поле должно бьіть более 5 символов!'
                }

                if(!filters.some(({element}) => element === values.element)){
                    errors.element = 'Вьіберите елемент!'
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onPostNewHero(values)
                setTimeout(() => {
                    setSubmitting(false);
                    resetForm();
                }, 500);
              }}   
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            }) => (
                <form 
                    className="border p-4 shadow-lg rounded"
                    onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <input
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name"
                            placeholder="Мое имя ?" 
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                        {errors.name && touched.name && errors.name}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <textarea
                            name="text" 
                            className="form-control" 
                            id="text"
                            placeholder="Что я умею?"
                            style={{"height": '130px'}}
                            value={values.text} 
                            onChange={handleChange}
                            onBlur={handleBlur}/>
                        {errors.text && touched.text && errors.text}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <select 
                            className="form-select" 
                            id="element" 
                            name="element"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.element}>
                            <option >Я владею элементом...</option>
                            {createOption(filters)}
                        </select>
                        {errors.element && touched.element && errors.element}
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}>
                        Создать
                    </button>
                </form>
            )}
        </Formik>
        
    )
}

const createOption = (filters) => {
    return filters.map(({element}, i ) => {
        if(element === 'All') return;
        return ( <option key={i} value={element}>{element}</option> )
    })
}

export default HeroesAddForm;