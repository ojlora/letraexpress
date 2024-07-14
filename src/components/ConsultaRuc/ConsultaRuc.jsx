import React, { useState, useEffect } from 'react';
import { fetchRucData } from '../../services/api';
import './ConsultaRuc.css';

const ConsultaRuc = ({ setRucData }) => {
    const [ruc, setRuc] = useState('');
    const [data, setData] = useState({
        razon_social: '',
        direccion: '',
        ubigeo: '',
        telefono: '',
        condicion: '',
        departamento: '',
        provincia: '',
        distrito: '',
        estado: '' // Agregar estado aquí
    });
    const [error, setError] = useState('');
    const [consultaRealizada, setConsultaRealizada] = useState(false); // Estado para verificar si se realizó la consulta

    const handleRucChange = (e) => {
        setRuc(e.target.value);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleRucBlur = () => {
        let token = '47c41ee6abf123efed099d536963a80d'; // Reemplaza esto con tu token
        fetchRucData(ruc, token, handleSuccess, handleError);
    };

    const handleSuccess = (respuesta) => {
        const updatedData = {
            ruc,
            razon_social: respuesta.razon_social,
            direccion: respuesta.direccion,
            ubigeo: respuesta.ubigeo,
            telefono: '',
            condicion: respuesta.condicion,
            departamento: respuesta.departamento,
            provincia: respuesta.provincia,
            distrito: respuesta.distrito,
            estado: respuesta.estado // Agregar estado aquí
        };
        setData(updatedData);
        setRucData(updatedData);
        setError('');
        setConsultaRealizada(true); // Marcar que la consulta se ha realizado
    };

    const handleError = (message) => {
        setError(message);
        setConsultaRealizada(false); // Marcar que la consulta no se ha realizado
    };

    useEffect(() => {
        setRucData(data);
    }, [data, setRucData]);

    return (
        <div className="consulta-ruc container mt-4">
            <h1>Generador de Letras</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    id="ruc"
                    placeholder="Ingrese RUC"
                    value={ruc}
                    onChange={handleRucChange}
                    className="form-control"
                />
                <button onClick={handleRucBlur} className="btn btn-primary">Consultar</button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="resultados">
                {consultaRealizada && (
                    <div className="estado">
                        <span className={`estado-circulo ${data.estado === 'ACTIVO' ? 'activo' : 'inactivo'}`}></span>
                        {data.estado === 'ACTIVO' && <span>Activo</span>}
                    </div>
                )}
                <input type="hidden" id="ruc_data" value={ruc} />
                <input type="text" id="razon_social" placeholder="Razón Social" value={data.razon_social} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="direccion" placeholder="Dirección" value={data.direccion} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="ubigeo" placeholder="Ubigeo" value={data.ubigeo} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="telefono" placeholder="Teléfono" value={data.telefono} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="condicion" placeholder="Condición" value={data.condicion} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="departamento" placeholder="Departamento" value={data.departamento} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="provincia" placeholder="Provincia" value={data.provincia} onChange={handleInputChange} className="form-control mb-3" />
                <input type="text" id="distrito" placeholder="Distrito" value={data.distrito} onChange={handleInputChange} className="form-control mb-3" />
            </div>
        </div>
    );
};

export default ConsultaRuc;
