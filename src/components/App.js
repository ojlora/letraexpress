import React, { useState } from 'react';
import ConsultaRuc from './ConsultaRuc/ConsultaRuc';
import GenLetras from './GenLetras/GenLetras';
import '../styles/App.css';

const App = () => {
    const [rucData, setRucData] = useState({
        ruc: '',
        razon_social: '',
        direccion: '',
        ubigeo: '',
        estado: '',
        condicion: '',
        departamento: '',
        provincia: '',
        distrito: ''
    });

    const handleRucDataUpdate = (data) => {
        setRucData(data);
    };

    return (
        <div className="App">
            <ConsultaRuc onRucDataUpdate={handleRucDataUpdate} />
            <GenLetras rucData={rucData} />
        </div>
    );
};

export default App;
