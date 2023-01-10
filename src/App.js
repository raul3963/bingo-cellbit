import logo from './logo.svg';
import './App.css';
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

  return (
    <div className="App">
      <header className="App-header normaltheme">
        <h3>BINGO DO CELLBIT</h3>
        {/*<button id="btnPressetsLista" onClick={tornarVisivel}>Pressets Salvos</button>*/}
      </header>
      <Jogos />
      {/* <div id="divSidebarPressets" className='escondido'></div> */}
    </div>
  );
}

export default App;
