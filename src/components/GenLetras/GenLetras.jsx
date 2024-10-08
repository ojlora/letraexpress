import React, { useState } from 'react';
import { generarPDFs } from '../../services/pdfService';
import './GenLetras.css';

const GenLetras = ({ rucData }) => {
    const [numLetras, setNumLetras] = useState('');
    const [letras, setLetras] = useState([]);

    const handleNumLetrasChange = (e) => {
        setNumLetras(e.target.value);
    };

    const handleGenerate = () => {
        const num = parseInt(numLetras) || 0;
        const newLetras = Array.from({ length: num }, () => ({
            letra: '',
            referencia: '',
            giro: '',
            vencimiento: '',
            moneda: 'Soles',
            importe: ''
        }));
        setLetras(newLetras);
    };

    const handleInputChange = (index, field, value) => {
        const newLetras = [...letras];
        newLetras[index][field] = value;
        setLetras(newLetras);
    };

    const getPlaceholder = (moneda) => {
        return moneda === 'Soles' ? 'S/. 0.00' : 'US$ 0.00';
    };

    const handlePrint = () => {
        // No hay validación, simplemente se llama a la función de generación de PDFs
        generarPDFs(letras, rucData);
    };

    return (
        <div className="gen-letras container mt-4">
            <div className="input-group mb-3">
                <input
                    type="number"
                    placeholder="Cantidad de letras a generar"
                    value={numLetras}
                    onChange={handleNumLetrasChange}
                    className="form-control"
                    min="0"
                />
                <button onClick={handleGenerate} className="btn btn-primary">Generar</button>
            </div>

            {letras.length > 0 && (
                <>
                    {/* Tabla para dispositivos grandes */}
                    <div className="table-responsive d-none d-md-block">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Letra</th>
                                    <th>Referencia</th>
                                    <th>Giro</th>
                                    <th>Vencimiento</th>
                                    <th>Moneda</th>
                                    <th>Importe</th>
                                </tr>
                            </thead>
                            <tbody>
                                {letras.map((letra, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                value={letra.letra}
                                                onChange={(e) => handleInputChange(index, 'letra', e.target.value)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={letra.referencia}
                                                onChange={(e) => handleInputChange(index, 'referencia', e.target.value)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={letra.giro}
                                                onChange={(e) => handleInputChange(index, 'giro', e.target.value)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={letra.vencimiento}
                                                onChange={(e) => handleInputChange(index, 'vencimiento', e.target.value)}
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={letra.moneda}
                                                onChange={(e) => handleInputChange(index, 'moneda', e.target.value)}
                                                className="form-control"
                                            >
                                                <option value="Soles">Soles</option>
                                                <option value="Dolares">Dólares</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder={getPlaceholder(letra.moneda)}
                                                value={letra.importe}
                                                onChange={(e) => handleInputChange(index, 'importe', e.target.value.replace(/[^0-9.]/g, ''))}
                                                className="form-control"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Vista de filas apiladas para dispositivos móviles */}
                    <div className="d-md-none">
                        {letras.map((letra, index) => (
                            <div key={index} className="letra-item p-3 mb-3 border rounded">
                                <h6>Letra {index + 1}</h6>
                                <div className="row mb-2">
                                    <div className="col-4 text-right">
                                        <label htmlFor={`letra-${index}`} className="form-label">Letra</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="text"
                                            id={`letra-${index}`}
                                            value={letra.letra}
                                            onChange={(e) => handleInputChange(index, 'letra', e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4 text-right">
                                        <label htmlFor={`referencia-${index}`} className="form-label">Referencia</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="text"
                                            id={`referencia-${index}`}
                                            value={letra.referencia}
                                            onChange={(e) => handleInputChange(index, 'referencia', e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4 text-right">
                                        <label htmlFor={`giro-${index}`} className="form-label">Giro</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="date"
                                            id={`giro-${index}`}
                                            value={letra.giro}
                                            onChange={(e) => handleInputChange(index, 'giro', e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4 text-right">
                                        <label htmlFor={`vencimiento-${index}`} className="form-label">Vencimiento</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="date"
                                            id={`vencimiento-${index}`}
                                            value={letra.vencimiento}
                                            onChange={(e) => handleInputChange(index, 'vencimiento', e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4 text-right">
                                        <label htmlFor={`moneda-${index}`} className="form-label">Moneda</label>
                                    </div>
                                    <div className="col-8">
                                        <select
                                            id={`moneda-${index}`}
                                            value={letra.moneda}
                                            onChange={(e) => handleInputChange(index, 'moneda', e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="Soles">Soles</option>
                                            <option value="Dolares">Dólares</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4 text-right">
                                        <label htmlFor={`importe-${index}`} className="form-label">Importe</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            type="text"
                                            id={`importe-${index}`}
                                            placeholder={getPlaceholder(letra.moneda)}
                                            value={letra.importe}
                                            onChange={(e) => handleInputChange(index, 'importe', e.target.value.replace(/[^0-9.]/g, ''))}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handlePrint} className="btn btn-success mt-3">Imprimir Letras</button>
                </>
            )}
        </div>
    );
};

export default GenLetras;
