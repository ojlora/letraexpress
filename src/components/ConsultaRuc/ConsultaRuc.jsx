import React, { useState } from 'react';
import validator from 'validator';
import './ConsultaRuc.css'; // Asegúrate de tener los estilos incluidos

const ConsultaRuc = ({ setRucData }) => {
  const [data, setData] = useState({
    ruc: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    departamento: '',
    provincia: '',
    distrito: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateData = () => {
    let newErrors = {};

    // Validación del RUC: debe tener 11 dígitos y ser numérico
    if (!validator.isLength(data.ruc, { min: 11, max: 11 })) {
      newErrors.ruc = 'El RUC debe tener exactamente 11 dígitos.';
    } else if (!validator.isNumeric(data.ruc)) {
      newErrors.ruc = 'El RUC solo debe contener números.';
    }

    if (validator.isEmpty(data.razon_social)) {
      newErrors.razon_social = 'La razón social es requerida';
    }

    if (validator.isEmpty(data.direccion)) {
      newErrors.direccion = 'La dirección es requerida';
    }

    if (!validator.isLength(data.telefono, { min: 7 })) {
        newErrors.telefono = 'El teléfono debe tener al menos 7 dígitos.';
    }
    

    if (validator.isEmpty(data.departamento)) {
      newErrors.departamento = 'El departamento es requerido';
    }

    if (validator.isEmpty(data.provincia)) {
      newErrors.provincia = 'La provincia es requerida';
    }

    if (validator.isEmpty(data.distrito)) {
      newErrors.distrito = 'El distrito es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateData()) {
      setRucData(data);
    }
  };

  return (
    <div className="consulta-ruc container mt-4">
      <h1>Generador de Letras</h1>
      <form onSubmit={handleSubmit} className="resultados">
        
        <div className="form-group">
          <label htmlFor="ruc">RUC</label>
          <input
            type="text"
            id="ruc"
            placeholder="Ingrese RUC"
            value={data.ruc}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.ruc && <div className="alert alert-danger">{errors.ruc}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="razon_social">Razón Social</label>
          <input
            type="text"
            id="razon_social"
            placeholder="Razón Social"
            value={data.razon_social}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.razon_social && <div className="alert alert-danger">{errors.razon_social}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            placeholder="Dirección"
            value={data.direccion}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.direccion && <div className="alert alert-danger">{errors.direccion}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            placeholder="Teléfono"
            value={data.telefono}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.telefono && <div className="alert alert-danger">{errors.telefono}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="departamento">Departamento</label>
          <input
            type="text"
            id="departamento"
            placeholder="Departamento"
            value={data.departamento}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.departamento && <div className="alert alert-danger">{errors.departamento}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="provincia">Provincia</label>
          <input
            type="text"
            id="provincia"
            placeholder="Provincia"
            value={data.provincia}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.provincia && <div className="alert alert-danger">{errors.provincia}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="distrito">Distrito</label>
          <input
            type="text"
            id="distrito"
            placeholder="Distrito"
            value={data.distrito}
            onChange={handleInputChange}
            className="form-control mb-3"
          />
          {errors.distrito && <div className="alert alert-danger">{errors.distrito}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Validar</button>
      </form>
    </div>
  );
};

export default ConsultaRuc;
