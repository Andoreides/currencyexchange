import axios from "axios";

export const instance = axios.create({baseURL: 'https://www.cbr-xml-daily.ru/'});

const Service = {
    getCurrencies: () => {
        return instance.get('daily_json.js')
            .then(res => res.data)
    }
};

export default Service;