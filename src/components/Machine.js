import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import OnOFFSwitch from "./Switch";
import Graphs from "./Graphs";
import {getMinMaxDayValue, getOperatingLoad} from '../utils/process'


export default function Machine () {
    const [operatingLoad, setOperatingLoad]= useState([]);
    const [labels, setLabels] = useState();

    useEffect(() => {
        const fetchMaxAndMin = async () => {
            const operatingLoad = await getOperatingLoad();
            setOperatingLoad(operatingLoad);
            const minMax =  await getMinMaxDayValue();
            setLabels(minMax);
        }
        fetchMaxAndMin()
    }, [])
    const checked = operatingLoad.length !== 0;

    return (
        <Container size="sm"><OnOFFSwitch checked={checked} /> { checked ?<Graphs operatingLoad={operatingLoad} /> : <Typography>No Data</Typography>}</ Container>
    );
}