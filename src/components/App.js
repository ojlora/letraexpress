import React, { useState } from 'react';
import ConsultaRuc from './ConsultaRuc/ConsultaRuc';
import GenLetras from './GenLetras/GenLetras';
import Footer from './Footer/Footer'; // Importa el componente Footer
import '../styles/App.css'; // Asegúrate de que el archivo CSS global esté importado

const App = () => {
    const [rucData, setRucData] = useState({
        ruc: '',
        razon_social: '',
        direccion: '',
        ubigeo: '',
        telefono: '',
        condicion: '',
        departamento: '',
        provincia: '',
        distrito: ''
    });

    return (
        <div className="App">
            <ConsultaRuc setRucData={setRucData} />
            <GenLetras rucData={rucData} />
            <Footer /> {/* Añade el componente Footer */}
        </div>
    );
};

export default App;
