import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';

function Header() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <p className="navbar-brand">BLOGISTER</p>
        </div>
        <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <MenuIcon style={{fontSize : "25px"}} />
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
          <ul className="nav navbar-nav navbar-right">
              <li id="home"><Link to={'/'}>HOME</Link></li>
              <li id="trending"><Link to={'/trending'}>TRENDING</Link></li>
              <li id="tags"><Link to={'/tags'}>TAGS</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header