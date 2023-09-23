import React from 'react'
import { Link } from 'react-router-dom'

function ComposeButton() {
  return (
    <div className='compose'>
        <Link to='/compose'><button className='button btn'>📝 Compose</button></Link>
    </div>
  )
}

export default ComposeButton