import './jogos.css'
import { Celula } from '../../models/bingo/celula';
import Select from 'react-select';
import { useState } from 'react';
import '../../models/bingo/celula.css'
import { getItem, setItem } from '../../models/database/localStorage.js'
import { useEffect } from 'react';

function Jogos() {

  useEffect(() => {
    const inputBingo = document.getElementById("inputBingo");
    let texto = getItem("BingoCellbit");
    inputBingo.value = texto;
    aplicar()
  }, []);


  const [x3, setx3] = useState(false);
  const [x4, setx4] = useState(false);
  const [x5, setx5] = useState(false);
  const [x6, setx6] = useState(false);
  const [classe, setClasse] = useState("x3");

  function hideshow() {
    let divmain = document.getElementById("lista")
    if (divmain.className == "aparece") {
      divmain.className = "escondido";
      document.getElementById("x3div").className += " x3full";
      document.getElementById("x4div").className += " x4full";
      document.getElementById("x5div").className += " x5full";
      document.getElementById("x6div").className += " x6full";
    } else if (divmain.className == "escondido") {
      divmain.className = "aparece";
      document.getElementById("x3div").className = "x3divc"
      document.getElementById("x4div").className = "x4divc"
      document.getElementById("x5div").className = "x5divc"
      document.getElementById("x6div").className = "x6divc"
    }
  }


  function aplicar() {
    let texto = document.getElementById("inputBingo").value;
    var lines = texto.split("\n");
    setItem("BingoCellbit", texto)
    var count = lines.length;
    console.log(texto.split("\n").length);


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
          if (document.getElementById('btnTemaChange').className == "btnMedo") {

            cell.className = "celulaMedo";
          } else {

            cell.className = "celula";
          }
          cell.id = "celula" + i
          console.log(cell.click)
          cell.onclick = () => {
            let celulasel = document.getElementById(cell.id);
            console.log(cell.id);
            if (celulasel.className == "celula cellselecionado") {
              celulasel.className = "celula"
            } else if (celulasel.className == "celula") {
              celulasel.className = "celula cellselecionado"
            }
            if (celulasel.className == "celulaMedo cellselecionadoMedo") {
              celulasel.className = "celulaMedo"
            } else if (celulasel.className == "celulaMedo") {
              celulasel.className = "celulaMedo cellselecionadoMedo"
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
          if (document.getElementById('btnTemaChange').className == "btnMedo") {

            cell.className = "celulamenorMedo";
          } else {

            cell.className = "celulamenor";
          }
          cell.id = "celula" + i
          console.log(cell.click)
          cell.onclick = () => {
            let celulasel = document.getElementById(cell.id);
            if (celulasel.className == "celulamenor cellselecionado") {
              celulasel.className = "celulamenor"
            } else if (celulasel.className == "celulamenor") {
              celulasel.className = "celulamenor cellselecionado"
            }
            if (celulasel.className == "celulamenorMedo cellselecionadoMedo") {
              celulasel.className = "celulamenorMedo"
            } else if (celulasel.className == "celulamenorMedo") {
              celulasel.className = "celulamenorMedo cellselecionadoMedo"
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
          if (document.getElementById('btnTemaChange').className == "btnMedo") {

            cell.className = "celulamenorMedo";
          } else {

            cell.className = "celulamenor";
          }
          cell.id = "celula" + i
          console.log(cell.click)
          cell.onclick = () => {
            let celulasel = document.getElementById(cell.id);
            console.log(cell.id);
            if (celulasel.className == "celulamenor cellselecionado") {
              celulasel.className = "celulamenor"
            } else if (celulasel.className == "celulamenor") {
              celulasel.className = "celulamenor cellselecionado"
            }
            if (celulasel.className == "celulamenorMedo cellselecionadoMedo") {
              celulasel.className = "celulamenorMedo"
            } else if (celulasel.className == "celulamenorMedo") {
              celulasel.className = "celulamenorMedo cellselecionadoMedo"
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
      <div id='bingo' className="aparece">
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
        <h1>Bingo</h1>
        <div id="foda">
          <h4>Conteudo do bingo, 1 linha = 1 quadrado.<br /> proporção modificada automaticamente <br />
          </h4>

          <button id="btnAplicar" className='btnNormal' onClick={aplicar}>Aplicar</button>
        </div>
        <textarea id='inputBingo' className='btnNormal' />
        <div className='flex'>
          <h5 className={classe == "x4" ? "selecionado" : "naosel"}>4x4 </h5>
          <h5 className={classe == "x5" ? "selecionado" : "naosel"}>5x5 </h5>
          <h5 className={classe == "x6" ? "selecionado" : "naosel"}>6x6 </h5>
        </div>
      </div>

      <button id="btnHide" className='btnNormal' onClick={hideshow}>Esconder UI</button>
    </div >
  )
}

export default Jogos;
