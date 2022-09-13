import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='bg-BlueGray' >
        <nav className='flex items-center justify-between flex-wrap bg-slate-500 p-6'>
            <div>
                <Link to='/' className='flex items-center flex-shrink-0 text-white mr-6'>
                    <span className='font-semibold text-xl tracking-tight'>Sistema de Inscripción</span>
                </Link>
            </div>

            <div>
                <Link to='/inscripcion' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                    Inscripción
                </Link>
                <Link to='/estudiante' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                    Estudiante
                </Link>
                <Link to='/inscripcion/list' className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>
                    Lista de Inscripciones
                </Link>
            </div>

        
        </nav>

    </div>
  )
}
