import React, {useEffect, useState} from 'react';
import Service from "../axios/axios";
import './PopularCurrencies.css';
import {useNavigate} from "react-router";

const PopularCurrencies = () => {

    const [inputHave, setInputHave] = useState('');
    const [inputWant, setInputWant] = useState('');
    const [currencyWant, setCurrencyWant] = useState('');
    const [euro, setEuro] = useState('');
    const [active, setActive] = useState(true);
    const [activeUSD, setActiveUSD] = useState(false);
    const [activeEURO, setActiveEURO] = useState(false);
    const [activeWant, setActiveWant] = useState(false);
    const [activeUSDWant, setActiveUSDWant] = useState(true);
    const [activeEUROWant, setActiveEUROWant] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        Service.getCurrencies()
            .then(res => {
                const values = Object.values(res.Valute);
                setCurrencyWant(values[13])
                setEuro(values[14])
            })
    }, []);

    const handleChangeHave = (value) => {
        setInputHave(value);
        if (activeWant) {
            setInputWant(value)
        }
        if (activeUSDWant) {
            setInputWant(Math.floor((value / currencyWant.Value) * 100 / 100))
        }
        if (activeEUROWant) {
            setInputWant(Math.floor((value / euro.Value) * 100 / 100))
        }
    };

    const handleChangeWant = (value) => {
        setInputWant(value);
        if (active) {
            setInputHave(Math.floor((value * currencyWant.Value) * 100 / 100))
        }
        if (activeUSD) {
            setInputHave(value)
        }
        if (activeEURO) {
            setInputHave(Math.floor((value * euro.Value) * 100 / 100))
        }
    };

    const handleChangeCurrency = (str) => {
        switch (str) {
            case 'USD': {
                setActiveUSDWant(true);
                setActiveEUROWant(false);
                setActiveWant(false);
                if (active) {
                    setInputWant(Math.floor((inputHave / currencyWant.Value) * 100 / 100))
                }
                if (activeUSD) {
                    setInputWant(inputHave)
                }
                if (activeEURO) {
                    setInputWant(Math.floor((inputHave * euro.Value / currencyWant.Value) * 100 / 100))
                }
                break;
            }
            case 'EURO': {
                setActiveUSDWant(false);
                setActiveEUROWant(true);
                setActiveWant(false);
                if (active) {
                    setInputWant(Math.floor((inputHave / euro.Value) * 100 / 100))
                }
                if (activeUSD) {
                    setInputWant(Math.floor((inputHave * currencyWant.Value / euro.Value) * 100 / 100))
                }
                if (activeEURO) {
                    setInputWant(inputHave)
                }
                break;
            }
            case 'RUB': {
                setActiveUSDWant(false);
                setActiveEUROWant(false);
                setActiveWant(true);
                if (active) {
                    setInputWant(inputHave)
                }
                if (activeUSD) {
                    setInputWant(Math.floor((inputHave * currencyWant.Value) * 100 / 100))
                }
                if (activeEURO) {
                    setInputWant(Math.floor((inputHave * euro.Value) * 100 / 100))
                }
                break;
            }
        }
    };

    const handleClickHave = (str) => {
        switch (str) {
            case 'rub': {
                setActive(true);
                setActiveUSD(false);
                setActiveEURO(false);
                if (activeWant) {
                    setInputWant(inputHave);
                }
                if (activeUSDWant) {
                    setInputWant(Math.floor((inputHave / currencyWant.Value) * 100 / 100))
                }
                if (activeEUROWant) {
                    setInputWant(Math.floor((inputHave / euro.Value) * 100 / 100))
                }
                break;
            }
            case 'usd': {
                setActiveUSD(true)
                setActive(false);
                setActiveEURO(false);
                if (activeWant) {
                    setInputWant(Math.floor((inputHave * currencyWant.Value) * 100 / 100))
                }
                if (activeUSDWant) {
                    setInputWant(inputHave);
                }
                if (activeEUROWant) {
                    setInputWant(Math.floor((inputHave * euro.Value) * 100 / 100))
                }
                break;
            }
            case 'euro': {
                setActiveEURO(true);
                setActive(false);
                setActiveUSD(false);
                if (activeWant) {
                    setInputWant(Math.floor((inputHave * euro.Value) * 100 / 100))
                }
                if (activeUSDWant) {
                    setInputWant(Math.floor((inputHave * currencyWant.Value / euro.Value) * 100 / 100))
                }
                if (activeEUROWant) {
                    setInputWant(inputHave);
                }
            }
        }
    };

    const handleClickBack = () => {
        navigate('/');
    };

    return (
        <div className={'popular__container'}>
            <img src={'https://s.rbk.ru/v5_cash_static/cash-1.5.87/styles/images/transfer.svg'} alt="photo"
                 className={'exchanger__img'}/>
            <h1 className={'popular__title'}>Конвертёр самых популярных валют</h1>
            <div className={'popular__buttons-container'}>
                <div className={'popular__buttons'}>
                    <button className={`button__currency right ${active && 'button-active'} `}
                            onClick={(e) => handleClickHave('rub')}>RUB
                    </button>
                    <button className={`button__currency right ${activeEURO && 'button-active'}`}
                            onClick={(e) => handleClickHave('euro')}>EURO
                    </button>
                    <button className={`button__currency  ${activeUSD && 'button-active'}`}
                            onClick={(e) => handleClickHave('usd')}>USD
                    </button>

                </div>
                <div className={'popular__buttons'}>
                    <button className={`button__currency right ${activeUSDWant && 'button-active'} `}
                            onClick={(e) => handleChangeCurrency('USD')}>USD
                    </button>
                    <button className={`button__currency right ${activeEUROWant && 'button-active'} `}
                            onClick={(e) => handleChangeCurrency('EURO')}>EURO
                    </button>
                    <button className={`button__currency  ${activeWant && 'button-active'} `}
                            onClick={(e) => handleChangeCurrency('RUB')}>RUB
                    </button>
                </div>
            </div>
            <div className={'exchanger__container'}>
                <div className={'exchanger__area-from'}>
                    <input type="number" className={'exchanger__input'} value={inputHave}
                           onChange={(e) => handleChangeHave(e.target.value)}
                           placeholder={'у вас есть'}
                    />
                </div>
                <div className={'exchanger__area-from'}>
                    <input type="number" className={'exchanger__input'} value={inputWant}
                           onChange={(e) => handleChangeWant(e.target.value)} placeholder={'Хотите'}/>
                </div>
            </div>
            <button className={'button__back'} onClick={handleClickBack}>Назад</button>
        </div>
    );
};

export default PopularCurrencies;