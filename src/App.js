import './App.css';
import EveryCurrency from "./EveryCurrency/EveryCurrency";
import {Routes, Route} from "react-router-dom";
import PopularCurrencies from "./PopularCurrencies/PopularCurrencies";
import StartedPage from "./StartedPage/StartedPage";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<StartedPage />} />
                <Route path="/allcurrencies" element={<EveryCurrency />} />
                <Route path="/popularCurrencies" element={<PopularCurrencies />} />
            </Routes>
        </div>
    );
};

export default App;
