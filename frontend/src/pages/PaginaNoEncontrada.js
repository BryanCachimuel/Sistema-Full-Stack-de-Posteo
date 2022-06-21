import React from 'react'
import { Link } from 'react-router-dom'


function PaginaNoEncontrada() {
  return (
    <div>
        <h2>Página No Encontrada</h2>
        <label>Desea regresar a la Página de Inicio: </label> <Link to="/">Inicio</Link>
    </div>
  )
}

export default PaginaNoEncontrada
