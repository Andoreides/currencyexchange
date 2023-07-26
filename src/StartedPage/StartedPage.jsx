import React from 'react';
import {Link} from "react-router-dom";
import './StartedPage.css';

const StartedPage = () => {
    return (
        <div className={'started__container'}>
            <h1 className="title">Конвертёр валют по релевантному курсу ЦБ РФ</h1>
            <h2 className={'started__title'}>Выберите подходящий вам вариант</h2>
            <Link to='/allcurrencies' className={'started__link top'}>Отношение рубля ко всем валютам</Link>
            <Link to='/popularCurrencies' className={'started__link'}>Конвертер популярных валют</Link>
        </div>
    );
};

export default StartedPage;