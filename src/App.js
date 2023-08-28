import logo from './logo.svg';
import './App.css';
import './index.css';
import { Route, HashRouter, Routes } from "react-router-dom";
import Jogos from './telas/jogos';
import Temas from './telas/temas';
import { FaBars, FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react';
import {setData, getData, addData, clearData, deleteData} from './models/database/localStorage.js'
import { useEffect } from 'react';


function App() {

  let bgColor = "#00000";
  let bgHeaderColor = "#00000";
  let txtColor = "#fff";
  let bgObjColor = "#00000";
  let borderObjColor = "#00000";
  let bgObjSelColor = "#00000";
  let borderObjSelColor = "#00000";

  

  useEffect(() => {
    
    console.log(window.location.hash)

    //clearData()

    let data = getData("BingoCellbit");
    bgColor = data.temaAtual.bgColor;
    bgHeaderColor = data.temaAtual.bgHeaderColor;
    txtColor = data.temaAtual.txtColor;
    bgObjColor = data.temaAtual.bgObjColor;
    borderObjColor = data.temaAtual.borderObjColor;
    bgObjSelColor = data.temaAtual.bgObjSelColor;
    borderObjSelColor = data.temaAtual.borderObjSelColor;

    // STYLES FODAS

    var styleObjs = document.createElement('style');
    styleObjs.type = 'text/css';
    styleObjs.innerHTML = '.selecionado { color:'+borderObjSelColor+' }';
    document.getElementsByTagName('head')[0].appendChild(styleObjs);

    var styleObj = document.createElement('style');
    styleObj.type = 'text/css';
    styleObj.innerHTML = '.objetos { background-color: '+bgObjColor+'; color: '+txtColor+'; border: 2vh; border-color: '+borderObjColor+'; box-shadow: 5px 25px 5px '+ borderObjColor+'}';
    document.getElementsByTagName('head')[0].appendChild(styleObj);

    var styleObj2 = document.createElement('style');
    styleObj2.type = 'text/css';
    styleObj2.innerHTML = '.objetos2 { background-color: '+bgHeaderColor+'; color: '+txtColor+'; border: 2vh '+borderObjColor+';}';
    document.getElementsByTagName('head')[0].appendChild(styleObj2);

    var styleObj3 = document.createElement('style');
    styleObj3.type = 'text/css';
    styleObj.innerHTML = '.objetos3 { background-color: '+bgObjColor+'; color: '+txtColor+'; border: 5px; border-color: '+borderObjColor+'; box-shadow: 5px 25px 5px '+ borderObjColor+'}';
    document.getElementsByTagName('head')[0].appendChild(styleObj3);

    var styleObjSel = document.createElement('style');
    styleObjSel.type = 'text/css';
    styleObjSel.innerHTML = '.objetossel { background-color: '+bgObjSelColor+'; color: '+txtColor+'; border: 5px; border-color: '+bgObjSelColor+'; box-shadow: 5px 25px 5px '+borderObjSelColor+'}';
    document.getElementsByTagName('head')[0].appendChild(styleObjSel);
    //FIM STILES FODAS

    
    let corpo = document.getElementById("body");
    corpo.style.backgroundColor = bgColor;
    corpo.style.height = "100%";

    let body = document.getElementsByClassName("App");
    body[0].style.backgroundColor = bgColor;

    let header = document.getElementById("Appheader");
    header.style.backgroundColor = bgHeaderColor;  

    let objetos = document.getElementsByClassName("objetos")
    for (let index in objetos){
      objetos.item(index).style.color = txtColor;
      objetos.item(index).style.backgroundColor = bgObjColor;
      objetos.item(index).style.borderCorlor = borderObjColor;
    
    }
    let objetos2 = document.getElementsByClassName("objetos2")
    for (let index in objetos2){
      objetos2.item(index).style.color = txtColor;
      objetos2.item(index).style.backgroundColor = bgHeaderColor;
    }

    const currentUrl = window.location.hash;
    if(currentUrl == ""){
      document.getElementById("btnNav").innerHTML = "Temas";
    }else if(currentUrl == "#/temas"){
      document.getElementById("btnNav").innerHTML = "Bingo";
      document.getElementById("btnCarregar").className = "btnNormal escondido objetos";
    }
   }, []);

  function sidebarChange() {
    if (window.location.hash == ""){
    document.getElementById("btnNav").innerHTML = "Temas"
  }else if (window.location.hash == "#/temas"){
    document.getElementById("btnNav").innerHTML = "Bingo"
  }
    const divSidebar = document.getElementById("divSidebar");
    const btnTemas = document.getElementById("btnNav")
    const btnSalvar = document.getElementById("btnSalvar")
    const btnCarregar = document.getElementById("btnCarregar")
    const btnoverlay = document.getElementById("btnoverlay")
    const btnComoUsar = document.getElementById("btnComoUsar")
    if(divSidebar.className == 'escondido objetos2'){
      divSidebar.className = "aparece objetos2";
      btnTemas.className = "btnNormal aparece objetos";
      if(window.location.hash != "#/temas"){
        btnSalvar.className = "btnNormal aparece objetos";
        btnCarregar.className = "btnNormal aparece objetos";
      }
      //btnoverlay.className = "btnNormal aparece";
      //btnComoUsar.className = "btnNormal aparece";
    }else if(divSidebar.className == "aparece objetos2"){
      divSidebar.className = 'escondido objetos2';
      btnTemas.className = 'btnNormal escondido objetos';
      btnSalvar.className = 'btnNormal escondido objetos';
      btnCarregar.className = 'btnNormal escondido objetos';
      btnoverlay.className = 'btnNormal escondido objetos';
      btnComoUsar.className = 'btnNormal escondido objetos';
    }
  }

  function salvarBingo(){
    let inputPopup = document.getElementById("inputPopupSalvarBingo");
    let inputBingo = document.getElementById("inputBingo");
    let nome = inputPopup.value;
    let bingo = inputBingo.value;
    addData("bingoSalvo", nome, bingo);
    fecharPopup();
    inputPopup.value = ""
  }

  function fecharPopup(){
    let popupCarregar = document.getElementById("carregarPopup")
    let popupSalvar = document.getElementById("salvarPopup")
    let popupoutrola = document.getElementById("ApagarBingoPopup")
    popupCarregar.className = "popupBody escondido objetos2"
    popupSalvar.className = "popupBody escondido objetos2"
    popupoutrola.className = "popupBody escondido objetos2"
  }

  let idClicadoApagar ="";

  function abrirPopup(event){
    let idPopup = ""
    if (event.target.id == "btnSalvar"){
      idPopup = "salvarPopup"
    } else if (event.target.id == "btnCarregar") {
      idPopup = "carregarPopup"
    }
    if (event.target.id == "btnPopupSalvarBingoFechar"){
      idPopup = "salvarPopup"
    } else if (event.target.id == "btnPopupCarregarBingoFechar") {
      idPopup = "carregarPopup"
    }

    let popup = document.getElementById(idPopup);
    if(popup.className == "popupBody aparece objetos2"){
      popup.className = "popupBody escondido objetos2"
      if(event.target.id == "btnCarregar"){
          document.getElementById("ListaBingos").innerHTML = ""
      }
    }else if(popup.className == "popupBody escondido objetos2"){
    popup.className = "popupBody aparece objetos2"
    if(event.target.id == "btnCarregar"){
      let data = getData("BingoCellbit");
      document.getElementById("ListaBingos").innerHTML = ""
      let elements = [];
      for(let i in data.bingoSalvo){
        let divbtns = document.createElement("div");
        divbtns.className = "divbtnsListaBingos";
        divbtns.style.display = "flex";
        divbtns.style.alignItems = "center";
        divbtns.style.height = "7.5vh";
        let buttonLista = document.createElement("button");
        buttonLista.innerHTML = i;
        buttonLista.className = "btnListaBingoCarregar objetos";
        buttonLista.style.backgroundColor = bgObjColor;
        buttonLista.style.height = "6vh";
        buttonLista.style.border = "0.2vh solid "+borderObjColor;
        buttonLista.style.color = txtColor;
        buttonLista.style.marginTop = "1vh";
        buttonLista.style.padding = "0vh";
        buttonLista.style.overflowX = "auto";
        buttonLista.onclick = () => {
          let value = String(data.bingoSalvo[i]).replace("undefined", '')
          document.getElementById("inputBingo").value = value;
          aplicar();
          fecharPopup();
          window.location.reload()
        }
        divbtns.append(buttonLista);
        let btnDelete =  document.createElement("button");
        btnDelete.innerHTML = "X";
        btnDelete.style.backgroundColor = "brown"; 
        btnDelete.style.border = "10vw red";
        btnDelete.style.borderRadius = "1vh";
        btnDelete.style.height = "5vh";
        btnDelete.style.width = "3vw";
        btnDelete.style.padding = "0px";
        btnDelete.style.fontSize = "2vh";
        btnDelete.style.marginLeft = "0vw";
        btnDelete.style.marginTop = "1vh";
        btnDelete.style.color = txtColor;
        btnDelete.onclick = () => {
            abrirPopupApagar();
            document.getElementById('apagarSpanPopup').innerHTML = "Você deseja apagar o tema " + i + " ?";
            idClicadoApagar = i;
        }
        divbtns.append(btnDelete)
        elements.push(divbtns);
          if(document.getElementById("ListaBingos").children.length <= elements.length){
            for (var x = 0; x < elements.length; ++x) {
                document.getElementById("ListaBingos").appendChild(elements[x]);
            }
          }
      }
    }
  }
  }

  const [hash, setHash] = useState("");

  const [x3, setx3] = useState(false);
  const [x4, setx4] = useState(false);
  const [x5, setx5] = useState(false);
  const [x6, setx6] = useState(false);
  const [classe, setClasse] = useState("x3");

  function aplicar() {
    let texto = document.getElementById("inputBingo").value;
    var lines = texto.split("\n");
    addData("bingoAtual" ,"", texto)
    
    var count = lines.length;


    let div3 = document.getElementById("x3div");
    let div4 = document.getElementById("x4div");
    let div5 = document.getElementById("x5div");
    let div6 = document.getElementById("x6div");

    div3.innerHTML = "";
    div4.innerHTML = "";
    div5.innerHTML = "";

    if (texto != "") {
      if (count <= 16) {

        div3.innerHTML = "";
        div4.innerHTML = "";
        div5.innerHTML = "";
        div6.innerHTML = "";
        setx3(false)
        setx4(true)
        setx5(false)
        setx6(false)
        setClasse("x4");
        let i = 0;
        lines.forEach(element => {
          let cell = document.createElement("button");
          cell.className = "celula objetos3";
          cell.id = "celula" + i
          cell.onclick = () => {
            let celulasel = document.getElementById(cell.id);
            if (celulasel.className == "celula objetossel") {
              celulasel.className = "celula objetos3"
            } else if (celulasel.className == "celula objetos3") {
              celulasel.className = "celula objetossel"
            }
          }
          cell.innerText = element.toString();
          div4.appendChild(cell);
          i += 1;
        }
        );
      }
      if (count > 16 && count <= 25) {

        div3.innerHTML = "";
        div4.innerHTML = "";
        div5.innerHTML = "";
        div6.innerHTML = "";
        setx3(false)
        setx4(false)
        setx5(true)
        setx6(false)
        setClasse("x5");
        let i = 0;
        lines.forEach(element => {
          let cell = document.createElement("button");
          cell.className = "celulamenor";
          cell.id = "celula" + i
          cell.onclick = () => {
            let celulasel = document.getElementById(cell.id);
            if (celulasel.className == "celulamenor objetossel") {
              celulasel.className = "celulamenor objetos3"
            } else if (celulasel.className == "celulamenor objetos3") {
              celulasel.className = "celulamenor objetossel"
            }
          }
          cell.innerText = element.toString();
          div5.appendChild(cell);
          i += 1;
        }
        );
      }
      if (count > 25 && count <= 36) {

        div3.innerHTML = "";
        div4.innerHTML = "";
        div5.innerHTML = "";
        div6.innerHTML = "";
        setx3(false)
        setx4(false)
        setx5(false)
        setx6(true)
        setClasse("x6");
        let i = 0;
        lines.forEach(element => {
          let cell = document.createElement("button");
          cell.className = "celulamenor";
          cell.id = "celula" + i
          cell.onclick = () => {
            let celulasel = document.getElementById(cell.id);
            if (celulasel.className == "celulamenor objetossel") {
              celulasel.className = "celulamenor objetos3"
            } else if (celulasel.className == "celulamenor objetos3") {
              celulasel.className = "celulamenor objetossel"
            }
          }
          cell.innerText = element.toString();
          div6.appendChild(cell);
          i += 1;
        }
        ); 
      }
    } else {
      div3.innerHTML = "";
      div4.innerHTML = "";
      div5.innerHTML = "";
      div6.innerHTML = "";
      setx3(false)
      setx4(true)
      setx5(false)
      setx6(false)
    }
  }

  function navegar(event){
    if(event.target.id == "btnNav"){
      let currentUrl = window.location.hash;
      if(currentUrl == ""){
        window.location.hash = "#/temas"
        sidebarChange();
      }else if(currentUrl == "#/temas"){
        window.location.hash = ""
        sidebarChange();
        document.getElementById()
      }
    }
  }

  function abrirPopupApagar(){
    let idPopup = "ApagarBingoPopup"
    let popup = document.getElementById(idPopup);
    if(popup.className == "popupBody aparece objetos2"){
      popup.className = "popupBody escondido objetos2"
    }else if(popup.className == "popupBody escondido objetos2"){
    popup.className = "popupBody aparece objetos2"
    }
  }

  function apagarBingo (){
    deleteData("bingo", idClicadoApagar)
    fecharPopup();
  }



  return (
    <div className="App">
      <header id="Appheader" className="normalHeader">
        <h3>BINGO DO CELLBIT</h3>
        <button id='btnBar' className='btnHeader objetos2' onClick={sidebarChange}><FaBars /></button>
      </header>
      <div id="corpo">
        <Routes>
          <Route element = { <Jogos /> }  path="/" />
          <Route element = { <Temas /> }  path="/temas" />
        </Routes>
      </div>
      <div id="divSidebar" className='escondido objetos2'>
      <button id="btnNav" className='btnNormal escondido objetos' onClick={navegar}></button>
        <br />
        <button id='btnSalvar' className='btnNormal escondido objetos' onClick={abrirPopup}> Salvar Bingo </button>
        <div id="salvarPopup" className='popupBody escondido objetos2'>
            <h2>Salvar</h2>
            <button id='btnPopupSalvarBingoFechar' onClick={abrirPopup}> X </button>
            <span>Você deseja salvar o bingo atual?</span>
            <textarea id='inputPopupSalvarBingo' spellCheck="false" className='inputNormal objetos' placeholder='Nome do Bingo' maxLength={40}/>
            <button id='btnPopupSalvarBingo' className='btnNormal objetos' onClick={salvarBingo}> Salvar </button>
        </div>
        <button id='btnCarregar' className='btnNormal escondido objetos' onClick={abrirPopup}> Carregar Bingo </button>
        <div id="carregarPopup" className='popupBody escondido objetos2'>
          <h2>Carregar</h2>
            <button id='btnPopupCarregarBingoFechar' onClick={abrirPopup}> X </button>
            <span>Escolha o bingo que deseja carregar</span>
            <div id='ListaBingos'></div>
        </div>
        <br />
        {/*<button id="btnoverlay" className='btnNormal escondido'>Stream Overlay</button>*/}
        
        <div id="divBottomSide"/>
        <button id="btnComoUsar" className='btnNormal escondido'>Como Usar</button>
        <i className='BottomSidebar'>Feito por: raul396</i>
        <div id="ApagarBingoPopup" className='popupBody escondido objetos2'>
                    <h2>Apagar</h2>
                    <span id="apagarSpanPopup">Você deseja apagar o tema</span>
                    <div style={{display: 'flex'}}>
                      <button id='btnPopupApagarTema' className='btnNormal objetos' onClick={apagarBingo}> Apagar </button>
                      <button id='btnPopupApagarTemaNegar' className='btnNormal objetos' onClick={fecharPopup}> Cancelar </button>
                    </div>
                </div>
      </div> 
    </div>
  );
}

export default App;
