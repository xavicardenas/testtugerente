import React from 'react';
import logo from '../61b160c2ced168a846469ba6_Logo_tuGerente_marcaregistrada_rojo-2-300x85.png'
const Header = ({titulo}) =>{
    return(
        <nav>
            <div className='nav-wrapper lignt-blue darken-2'>
                <img src={logo} className='App-logo' alt='logo'/>
                <a className='App-titulo' href="#">{titulo}</a>
            </div>
        </nav>
    );
}
export default Header;