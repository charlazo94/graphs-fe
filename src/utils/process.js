import csv from "jquery-csv"
import file from "../assets/demoPumpDayData.csv"


export const getValuesOperatingLoad = () => {
    
}
const fetchCsv =() => {
    return fetch(file).then(function (response) {
        let reader = response.body.getReader();
        let decoder = new TextDecoder('utf-8');

        return reader.read().then(function (result) {
            return decoder.decode(result.value);
        });
    });
}
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const csvToObjects = async () => {
    const values = await fetchCsv();
    return csv.toObjects(values);

}
export const getMinMaxDayValue = async () => {
    const objects = await csvToObjects()
   
    const correctValues = objects.map(value => isJsonString(value.metrics) ? JSON.parse(value.metrics).Psum.avgvalue : false).filter(value => value !== false)
    return [Math.min(...correctValues), Math.max(...correctValues)]
}

export const getOperatingLoad = async () => {
    const objects = await csvToObjects()
   
    const correctValues = objects.map(value => isJsonString(value.metrics) ? JSON.parse(value.metrics).Psum.avgvalue : false).filter(value => value !== false).sort(function(a,b){return b - a});
    const topTen = correctValues.slice(0,9).reduce((a,b) => {
        return a + b;
    }, 0);
    const percentage = topTen / 100;
    const operatingLoad = [];
    for(let i = 10; i<percentage; i = i +10) {
        operatingLoad.push(i);
    }
    operatingLoad.push(percentage)
    return operatingLoad;

}