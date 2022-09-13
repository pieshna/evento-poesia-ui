import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='m-auto'>
      <h1 className='text-4xl text-center font-bold text-Ebony'>Home</h1>
      <div className='m-5 '>
        <Link to='/inscripcion' className='text-2xl font-bold text-Ebony'>Inscripción</Link>
      </div>
    </div>
  )
}
