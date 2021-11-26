import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='error-page'>
      <h2>404 error page</h2>
      <Link to='/'>
        <button>back to home page</button>
      </Link>
    </div>
  )
}

export default Error
