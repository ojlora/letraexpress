import React, { useState } from 'react';
import { fetchRucData } from '../../services/api';
import './ConsultaRuc.css';

const ConsultaRuc = ({ onRucDataUpdate }) => {
    const [ruc, setRuc] = useState('');
    const [data, setData] = useState({
        razon_social: '',
        direccion: '',
        ubigeo: '',
        estado: '',
        condicion: '',
        departamento: '',
        provincia: '',
        distrito: ''
    });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleRucChange = (e) => {
        setRuc(e.target.value);
    };

    const handleRucBlur = () => {
        let token = '47c41ee6abf123efed099d536963a80d'; // Reemplaza esto con tu token
        fetchRucData(ruc, token, handleSuccess, handleError);
    };

    const handleSuccess = (respuesta) => {
        const updatedData = {
            razon_social: respuesta.razon_social,
            direccion: respuesta.direccion,
            ubigeo: respuesta.ubigeo,
            estado: respuesta.estado,
            condicion: respuesta.condicion,
            departamento: respuesta.departamento,
            provincia: respuesta.provincia,
            distrito: respuesta.distrito
        };
        setData(updatedData);
        setStatus(respuesta.estado === 'ACTIVO' ? 'text-success' : 'text-danger');
        setError('');
        onRucDataUpdate(updatedData);
    };

    const handleError = (message) => {
        setError(message);
    };

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
                <div className={`resultadoCliente ${status}`}>
                    {data.estado}
                </div>
                <input type="text" id="razon_social" placeholder="Razón Social" value={data.razon_social} readOnly className="form-control mb-3" />
                <input type="text" id="direccion" placeholder="Dirección" value={data.direccion} readOnly className="form-control mb-3" />
                <input type="text" id="ubigeo" placeholder="Ubigeo" value={data.ubigeo} readOnly className="form-control mb-3" />
                <input type="text" id="estado" placeholder="Estado" value={data.estado} readOnly className="form-control mb-3" />
                <input type="text" id="condicion" placeholder="Condición" value={data.condicion} readOnly className="form-control mb-3" />
                <input type="text" id="depar" placeholder="Departamento" value={data.departamento} readOnly className="form-control mb-3" />
                <input type="text" id="provincia" placeholder="Provincia" value={data.provincia} readOnly className="form-control mb-3" />
                <input type="text" id="distrito" placeholder="Distrito" value={data.distrito} readOnly className="form-control mb-3" />
            </div>
        </div>
    );
};

export default ConsultaRuc;
