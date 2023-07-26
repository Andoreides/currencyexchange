import React, {useEffect, useState} from 'react';
import Service from "../axios/axios";
import {useNavigate} from "react-router";

const EveryCurrency = () => {
    const [currencies, setCurrencies] = useState('');
    const [ruble, setRuble] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Service.getCurrencies()
            .then(res => {
                setCurrencies(res.Valute);
            })
    }, []);

    const values = Object.values(currencies);

    const handleChangeCurrencies = (value) => {
        console.log(value);
    };

    const maped = values.map((currency,index) => {
        return(
            <div className={'currency__content'} key={index}>
                <p className={'currency__name'}>{currency.Name}, {currency.CharCode}</p>
                <input className={'currency'} type={'number'}  onChange={(e)=>handleChangeCurrencies(e.target.value)} value={ Math.floor((ruble / currency.Value)*100)/100 } />
            </div>
        )
    });

    const handleClickBack = () => {
        navigate('/');
    };

    return (
        <div>
            <h2 className={'subtitle'}>Рубли</h2>
            <input type="number" placeholder={'Введите кол-во рублей'} className={'ruble__input'} value={ruble} onChange={(e)=>setRuble(e.target.value)} />
            <div className="container">
                {maped}
            </div>
            <button className={'button__back'} onClick={handleClickBack} >Назад</button>
        </div>
    );
};

export default EveryCurrency;