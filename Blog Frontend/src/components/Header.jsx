import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <p className="navbar-brand">BLOGISTER</p>
        </div>
        <ul className="nav navbar-nav navbar-right">
            <li id="home"><Link to={'/'}>HOME</Link></li>
            <li id="trending"><Link to={'/trending'}>TRENDING</Link></li>
            <li id="tags"><Link to={'/tags'}>TAGS</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header