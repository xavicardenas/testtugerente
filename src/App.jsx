import logo from './logo.svg';
import React,{Fragment,useState} from 'react';
import Header from './components/Header';
import Buscador from './components/Buscador';
//import './index.css';

function App() {
  return (

    <div style={{width:200}}>
      {/* <Header titulo="Test tuGerente: Javier Erasmo Cardenas Duran" /> */}
      <Buscador filtro="nit" cantidad="10" />
    </div>
  );
}

export default App;
