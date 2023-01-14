import logo from './logo.svg';
import './App.css';
import './index.css';
import Jogos from './telas/jogos';
import { useState } from 'react';

function App() {

  // function tornarVisivel(){
  //   const presetList = document.getElementById("divSidebarPressets")
  //   const bingo = document.getElementById("bingo")
  //
  //   if(bingo.className == "escondido"){
  //     bingo.className = "aparece";
  //     console.log("a")
  //   }else if(bingo.className == "aparece"){
  //     bingo.className = "escondido";
  //     console.log("a")
  //   }
  //   if(presetList.className == "escondido"){
  //     presetList.className = "aparece";
  //     console.log("b")
  //   }else if(presetList.className == "aparece"){
  //     presetList.className = "escondido";
  //     console.log("b")
  //   }
  // };

  function mudarTema() {
    const btnTemaChange = document.getElementById('btnTemaChange');
    const btnHide = document.getElementById('btnHide');
    const btnAplicar = document.getElementById('btnAplicar');
    const body = document.getElementById('body');
    const jogos = document.getElementById('jogos');
    const Appheader = document.getElementById("Appheader");
    const inputBingo = document.getElementById("inputBingo");

    if (btnTemaChange.className == 'btnNormal') {
      body.className = "bodyMedo"
      jogos.className = "bodyMedo"
      Appheader.className = "medoHeader"
      btnTemaChange.className = 'btnMedo'
      btnHide.className = 'btnMedo'
      btnAplicar.className = 'btnMedo'
      inputBingo.className = 'btnMedo'
      Array.from(document.getElementsByClassName("celula")).forEach(element => {
        if (element.className == "celula cellselecionado") {
          element.className = "celulaMedo cellselecionadoMedo"
        } else {
          element.className = "celulaMedo"
        }
      });
      Array.from(document.getElementsByClassName("celulamenor")).forEach(element => {
        if (element.className == "celulamenor cellselecionado") {
          element.className = "celulamenorMedo cellselecionadoMedo"
        } else {
          element.className = "celulamenorMedo"
        }
      });
      Array.from(document.getElementsByClassName("linhanormal")).forEach(element => {
        element.classList.remove("linhanormal")
        element.classList.add("linhamedo")
      });
    } else if (btnTemaChange.className == 'btnMedo') {
      btnTemaChange.className = 'btnNormal'
      btnHide.className = 'btnNormal'
      btnAplicar.className = 'btnNormal'
      inputBingo.className = 'btnNormal'
      body.className = "bodyNormal"
      jogos.className = "bodyNormal"
      Appheader.className = "normalHeader"
      Array.from(document.getElementsByClassName("celulaMedo")).forEach(element => {
        if (element.className == "celulaMedo cellselecionadoMedo") {
          element.className = "celula cellselecionado"
        } else {
          element.className = "celula"
        }
      });
      Array.from(document.getElementsByClassName("celulamenorMedo")).forEach(element => {
        if (element.className == "celulamenorMedo cellselecionadoMedo") {
          element.className = "celulamenor cellselecionado"
        } else {
          element.className = "celulamenor"
        }
      });

      Array.from(document.getElementsByClassName("linhamedo")).forEach(element => {
        element.classList.remove("linhamedo")
        element.classList.add("linhanormal")
      });
    }
  }

  return (
    <div className="App">
      <header id="Appheader" className="normalHeader">
        <h3>BINGO DO CELLBIT</h3>
        {/*<button id="btnPressetsLista" onClick={tornarVisivel}>Pressets Salvos</button>*/}
        <button id='btnTemaChange' className='btnNormal' onClick={mudarTema}>Tema do Medo</button>
      </header>
      <Jogos />
      {/* <div id="divSidebarPressets" className='escondido'></div> */}
    </div>
  );
}

export default App;
