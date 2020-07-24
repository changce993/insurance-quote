import React, {useState} from 'react'
import styled from '@emotion/styled'
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper'
import PropTypes from 'prop-types'

const Campo = styled.div`
    display:flex;
    margin-bottom:1rem;
    align-items:center;
`

const Label = styled.label`
    flex:0 0 100px;
`

const Select = styled.select`
    width:100%;
    display:block;
    padding:1rem;
    border:solid 1px #e1e1e1;
    -webkit-appearance:none;
`

const InputRadio = styled.input`
    margin:0 1rem;
`

const Boton = styled.button`
    background-color: #00838f;
    font-size:16px;
    width:100%;
    padding:1rem;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    border:none;
    transition: .3s ease-in-out;
    border-radius:3px;
    margin-top:1rem;

    &:hover{
        background-color: #26c6da;
        cursor:pointer;
    }
`

const Error = styled.div`
    width:100%;
    background-color:red;
    text-align:center;
    color:white;
    padding:1rem;
    margin-bottom:2rem;
    box-sizing:border-box;
`

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, guardarDatos] = useState({
        marca:'',
        year:'',
        plan:'' 
    })

    const {marca, year, plan} = datos

    const obtenerDatos = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        }) 
    }


    const [ error, guardarError ] = useState(false)

    const funcError = e => {
        e.preventDefault()

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return
        }

        guardarError(false)

        let resultado = 2000;
        const diferencia = obtenerDiferenciaYear(year)

        resultado -= ((diferencia * 3) * resultado) / 100;
        resultado = calcularMarca(marca) * resultado;

        let incrementoPlan = obtenerPlan(plan);

        resultado = parseFloat(resultado * incrementoPlan).toFixed(2)

        guardarCargando(true)

        setTimeout(() => {

            guardarCargando(false)

            guardarResumen({
                cotizacion : Number(resultado),
                datos
            }) 

        }, 1000)
        

    }



    return (
        <form
            onSubmit={funcError}
        >
        {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select 
                    name="marca"
                    value={marca}
                    onChange={obtenerDatos}
                >
                    <option value="">---Seleccione---</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerDatos}
                >
                    <option value="">---Seleccione---</option> 
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio
                        name="plan"
                        type="radio"
                        value="basico"
                        checked={plan === 'basico'}
                        onChange={obtenerDatos}
                /> Basico

                <InputRadio
                        name="plan"
                        type="radio"
                        value="completo"
                        checked={plan === 'completo'}
                        onChange={obtenerDatos}
                /> Completo
            </Campo>
                
                <Boton type="submit">Cotizar</Boton>
        </form>
    )
}


Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario