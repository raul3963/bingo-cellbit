import './jogos.css'
import { Celula } from '../../models/bingo/celula';
import Select from 'react-select';
import { useState } from 'react';
import '../../models/bingo/celula.css'
import { getData, addData, clearData } from '../../models/database/localStorage.js'
import { useEffect } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

function Jogos() {


  const [x3, setx3] = useState(false);
  const [x4, setx4] = useState(false);
  const [x5, setx5] = useState(false);
  const [x6, setx6] = useState(false);
  const [classe, setClasse] = useState("x3");

  
  let bgColor = "#00000";
  let bgHeaderColor = "#00000";
  let txtColor = "#fff";
  let bgObjColor = "#00000";
  let borderObjColor = "#00000";
  let bgObjSelColor = "#00000";
  let borderObjSelColor = "#00000";

  useEffect(() => {
    let data = getData("BingoCellbit");
    document.getElementById("inputBingo").value = data.bingoAtual;
    aplicar();
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
  }, []);

  function hideshow() {
    let divmain = document.getElementById("lista")
    let bingo = document.getElementById("bingo")
    if (divmain.className == "aparece") {
      divmain.className = "escondido";
      document.getElementById("x3div").className += " x3full";
      document.getElementById("x4div").className += " x4full";
      document.getElementById("x5div").className += " x5full";
      document.getElementById("x6div").className += " x6full";
      document.getElementById("jogos").style.height = "89vh"
      bingo.className = "aparece bingofull"
      document.getElementById("iconVisivel").style.color = "Black"
    } else if (divmain.className == "escondido") {
      divmain.className = "aparece";
      document.getElementById("x3div").className = "x3divc"
      document.getElementById("x4div").className = "x4divc"
      document.getElementById("x5div").className = "x5divc"
      document.getElementById("x6div").className = "x6divc"
      document.getElementById("jogos").style.height = "89vh"
      bingo.className = "aparece bingosmall"
      document.getElementById("iconVisivel").style.color = "White"
    }
  }

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
          cell.className = "celulamenor objetos3";
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
          cell.className = "celulamenor objetos3";
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

  return (
    <div id="jogos">
      <div id='bingo' className="aparece bingosmall">
        <div id="x3div" className={x3 ? "Aparece x3divc" : "escondido x3divc"}>
        </div>
        <div id="x4div" className={x4 ? "Aparece x4divc" : "escondido x4divc"}>
        </div>
        <div id="x5div" className={x5 ? "Aparece x5divc" : "escondido x5divc"}>
        </div>
        <div id="x6div" className={x6 ? "Aparece x6divc" : "escondido x6divc"}>
        </div>
      </div>
      <div id='lista' className="aparece">
        <div className='flex'>
          <h5 className={classe == "x4" ? "selecionado" : "naosel"}>4x4 </h5>
          <h5 className={classe == "x5" ? "selecionado" : "naosel"}>5x5 </h5>
          <h5 className={classe == "x6" ? "selecionado" : "naosel"}>6x6 </h5>
        </div>
        <textarea id='inputBingo' spellCheck="false" className='objetos'/>
        <button id="btnAplicar" className='btnNormal objetos' onClick={aplicar}>Aplicar</button>
        
      </div>

      <button id="btnHide" className='btnNormal objetos' onClick={hideshow}>
        <div id="iconVisivel"><MdVisibility/></div>
        </button>
    </div >
  )
}

export default Jogos;
