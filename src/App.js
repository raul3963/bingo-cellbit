import './App.css';
import './index.css';
import { useState } from 'react';
import { getData, addData, clearData, deleteData } from './models/database/localStorage.js'
import { useEffect } from 'react';
import { FaBlackTie, FaPencilAlt, FaSave } from "react-icons/fa";
import { IoIosColorPalette, IoMdCheckmark } from "react-icons/io";
import { FaBars, FaPenClip } from "react-icons/fa6";
import { ChromePicker } from 'react-color';
import { useColor } from 'react-color-palette';



function App() {

  const [editing, setEditing] = useState(true);

  //DECLARAR STATE PARA OS COLOR PICKERS 

  const [colorBackground, setColorBackground] = useColor("#222222");
  const [colorHeaderBackground, setColorHeaderBackground] = useColor("#3a3a3a");
  const [colorText, setColorText] = useColor("#fff");
  const [colorBackgroundItems, setColorBackgroundItems] = useColor("#535353");
  const [colorBorderitems, setColorBorderitems] = useColor("#000000");
  const [colorBackgroundItemsSel, setBackgroundItemsSel] = useColor("#c2af00");
  const [colorBorderitemsSel, setColorBorderitemsSel] = useColor("#bdbd00");


  // DECLARAR VARIAVEIS DE TEMAS SIMPLES

  let bgColor = "#00000";
  let bgHeaderColor = "#00000";
  let txtColor = "#fff";
  let bgObjColor = "#00000";
  let borderObjColor = "#00000";
  let bgObjSelColor = "#00000";
  let borderObjSelColor = "#00000";

  //VARIAVEIS DO BINGO

  let bingoAtual = "";
  let loadSaveData = "";

  // CARREGAR TEMA

  function carregarTema() {
    let data = getData("BingoCellbit");
    console.log(data.temaAtual.bgColor);
    bgColor = data.temaAtual.bgColor;
    bgHeaderColor = data.temaAtual.bgHeaderColor;
    txtColor = data.temaAtual.txtColor;
    bgObjColor = data.temaAtual.bgObjColor;
    borderObjColor = data.temaAtual.borderObjColor;
    bgObjSelColor = data.temaAtual.bgObjSelColor;
    borderObjSelColor = data.temaAtual.borderObjSelColor;

    let background = document.getElementsByClassName('background')
    for (let i = 0; i < background.length; i++) {
      background[0].style.backgroundColor = bgColor;
    }

    let objetos = document.getElementsByClassName('objeto');
    for (let i = 0; i < objetos.length; i++) {
      objetos[i].style.backgroundColor = bgObjColor;
      objetos[i].style.borderColor = borderObjColor;
      objetos[i].style.color = txtColor;
    }

    let selecionado = document.getElementsByClassName('selecionado');
    for (let i = 0; i < selecionado.length; i++) {
      selecionado[i].style.backgroundColor = bgObjSelColor;
      selecionado[i].style.borderColor = borderObjSelColor;
      selecionado[i].style.color = txtColor;
    }

    let bgSecundario = document.getElementsByClassName('backgroundSecundario');
    for (let i = 0; i < bgSecundario.length; i++) {
      bgSecundario[i].style.backgroundColor = bgHeaderColor;
    }

    let pickers = document.getElementsByClassName('chrome-picker');
    for (let i = 0; i < pickers.length; i++) {
      pickers[i].style.backgroundColor = bgHeaderColor + " !important";
      console.log(pickers[i].style.backgroundColor)
    }
  }

  //CARREGAR DADOS DURANTE O LOADING

  useEffect(() => {
    let data = getData("BingoCellbit");
    bingoAtual = data.bingoAtual;
    aplicar("load");
    carregarTema();
  }, []);

  // TEMA

  function aplicarTema() {
    let data = getData("BingoCellbit");
    let TemaNovo = { bgColor: colorBackground.hex, bgHeaderColor: colorHeaderBackground.hex, txtColor: colorText.hex, bgObjColor: colorBackgroundItems.hex, borderObjColor: colorBorderitems.hex, bgObjSelColor: colorBackgroundItemsSel.hex, borderObjSelColor: colorBorderitemsSel.hex };
    addData("temaAtual", "", TemaNovo)
    carregarTema();

  }

  function aplicarTemaPreset(event) {
    if (event.target.id == "btnPresetDefault"){
      let TemaNovo = { bgColor: "#222222", bgHeaderColor: "#3A3A3A", txtColor: "#FFFFFF", bgObjColor: "#535353", borderObjColor: "#000000", bgObjSelColor: "#C2AF00", borderObjSelColor: "#BDBD00" };
      addData("temaAtual", "", TemaNovo)
      carregarTema();
    }
  }

  function carregarListaTemas() {
    let data = getData("BingoCellbit");
    document.getElementById("ListaTemas").innerHTML = ""
    let elements = [];
    for (let i in data.temaSalvo) {
      let divbtns = document.createElement("div");
      divbtns.className = "divbtnsListaBingos";
      divbtns.style.display = "flex";
      divbtns.style.alignItems = "center";
      divbtns.style.height = "7.5vh";
      let buttonLista = document.createElement("button");
      buttonLista.innerHTML = i;
      buttonLista.className = "btnListaBingoCarregar objeto";
      buttonLista.style.border = "1px black solid"
      buttonLista.onclick = () => {
        let value = String(data.temaSalvo[i]).replace("undefined", '')
        addData("temaAtual", "", JSON.parse(value))
        carregarTema();
        console.log(JSON.parse(value));
      }
      divbtns.append(buttonLista);
      let btnDelete = document.createElement("button");
      btnDelete.innerHTML = "X";
      btnDelete.style.backgroundColor = "brown";
      btnDelete.style.border = "10vw red";
      btnDelete.style.borderRadius = "1vh";
      btnDelete.style.height = "5vh";
      btnDelete.style.width = "3vw";
      btnDelete.style.padding = "0px";
      btnDelete.style.fontSize = "2vh";
      btnDelete.style.marginLeft = "0vw";
      btnDelete.style.color = txtColor;
      btnDelete.ondblclick = () => {
        apagarTema(i)
      }
      divbtns.append(btnDelete)
      elements.push(divbtns);
      if (document.getElementById("ListaTemas").children.length <= elements.length) {
        for (var x = 0; x < elements.length; ++x) {
          document.getElementById("ListaTemas").appendChild(elements[x]);
        }
      }
    }
    carregarTema();
  }


  //APLICAR EDIÇÃO

  function aplicar(by) {
    let celulas = Array.from(document.getElementsByClassName("celula"))
    let textinho = "";
    for (let i in celulas) {
      let item = document.getElementById("celula" + i)
      if (i == 15) {
        textinho += item.innerText
      } else if (i <= 14) {
        textinho += item.innerText + "\n"
      }
    }
    if (textinho == "") { textinho = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n' }
    let texto = "";
    if (by == "load") {
      if (bingoAtual == "") {
        texto = textinho;
      } else { texto = bingoAtual; }
    } else if (by == "apply") {
      texto = textinho;
    } else if (by == "loadSave") {
      texto = loadSaveData
    }
    var lines = texto.split("\n");
    addData("bingoAtual", "", texto)
    let divBingo = document.getElementById("bingo");

    let count = lines.length
    divBingo.innerHTML = "";

    if (texto != "") {
      if (count <= 16) {
        divBingo.innerHTML = "";
        let i = 0;
        lines.forEach(element => {
          let cell = document.createElement("div");
          cell.className = "celula objeto";
          cell.contentEditable = true
          cell.id = "celula" + i
          cell.style.fontSize = "2.5vh"
          cell.innerText = element.toString();
          cell.onclick = () => {
            document.getElementById(cell.id).focus();
            console.log(cell.id)
          }
          divBingo.appendChild(cell);
          i += 1;
        }
        );
      }
      carregarTema();
    } else {
      divBingo.innerHTML = "";
    }
  }

  //FUNÇÕES DA DB

  function apagarBingo(id) {
    deleteData("bingo", id)
    carregarListaBingos();
  }

  function salvarBingo() {
    let celulas = Array.from(document.getElementsByClassName("celula"))
    let inputPopup = document.getElementById("inputPopupBingo");
    let nome = inputPopup.value;
    let bingo = "";
    for (let i in celulas) {
      let item = document.getElementById("celula" + i)
      if (i == 15) {
        bingo += item.innerText
      } else if (i <= 14) {
        bingo += item.innerText + "\n"
      }
    }
    addData("bingoSalvo", nome, bingo);
    inputPopup.value = ""

    carregarListaBingos();

  }

  function apagarTema(id) {
    deleteData("tema", id)
    carregarListaTemas();
  }

  function salvarTema() {
    let TemaNovo = { bgColor: colorBackground.hex, bgHeaderColor: colorHeaderBackground.hex, txtColor: colorText.hex, bgObjColor: colorBackgroundItems.hex, borderObjColor: colorBorderitems.hex, bgObjSelColor: colorBackgroundItemsSel.hex, borderObjSelColor: colorBorderitemsSel.hex };
    let inputTema = document.getElementById("inputPopupTema");
    let nome = inputTema.value;
    addData("temaSalvo", nome, TemaNovo);
    inputTema.value = ""
    carregarListaTemas();

  }


  //POPUPS

  function carregarListaBingos() {
    let data = getData("BingoCellbit");
    document.getElementById("ListaBingos").innerHTML = ""
    let elements = [];
    for (let i in data.bingoSalvo) {
      let divbtns = document.createElement("div");
      divbtns.className = "divbtnsListaBingos";
      divbtns.style.display = "flex";
      divbtns.style.alignItems = "center";
      divbtns.style.height = "7.5vh";
      let buttonLista = document.createElement("button");
      buttonLista.innerHTML = i;
      buttonLista.className = "btnListaBingoCarregar objeto";
      buttonLista.style.border = "1px black solid"
      buttonLista.onclick = () => {
        let value = String(data.bingoSalvo[i]).replace("undefined", '')
        loadSaveData = value;
        aplicar("loadSave");
      }
      divbtns.append(buttonLista);
      let btnDelete = document.createElement("button");
      btnDelete.innerHTML = "X";
      btnDelete.style.backgroundColor = "brown";
      btnDelete.style.border = "10vw red";
      btnDelete.style.borderRadius = "1vh";
      btnDelete.style.height = "5vh";
      btnDelete.style.width = "3vw";
      btnDelete.style.padding = "0px";
      btnDelete.style.fontSize = "2vh";
      btnDelete.style.marginLeft = "0vw";
      btnDelete.style.color = txtColor;
      btnDelete.ondblclick = () => {
        apagarBingo(i)
      }
      divbtns.append(btnDelete)
      elements.push(divbtns);
      if (document.getElementById("ListaBingos").children.length <= elements.length) {
        for (var x = 0; x < elements.length; ++x) {
          document.getElementById("ListaBingos").appendChild(elements[x]);
        }
      }
    }
    carregarTema();
  }

  function bingoPopupToggle() {
    let divPopupTema = document.getElementById("PopupPlaceTema")
    let divPopup = document.getElementById("PopupPlaceBingo")
    let divBingo = document.getElementById("wrap")
    if (divPopup.className == "PopupShow") {
      divPopup.className = "PopupHide"
      divBingo.className = "bingoToMiddle"

    } else {
      divPopup.className = "PopupShow"
      divPopupTema.className = "PopupHideTema"
      divBingo.className = "bingoToSide"
      document.getElementById("btnHide").className = "btnShowing objeto"
      carregarListaBingos()
    }
  }

  function temaPopupToggle() {
    let divPopupBingo = document.getElementById("PopupPlaceBingo")
    let divPopup = document.getElementById("PopupPlaceTema")
    let divBingo = document.getElementById("wrap")
    if (divPopup.className == "PopupShowTema") {
      divPopup.className = "PopupHideTema"
      divBingo.className = "bingoToMiddle"
      document.getElementById("btnHide").className = "btnShowing objeto"

    } else {
      carregarListaTemas()
      divPopup.className = "PopupShowTema"
      divPopupBingo.className = "PopupHide"
      divBingo.className = "bingoHide"
      document.getElementById("btnHide").className = "btnHiding objeto"
    }
  }

  //ALTERAR MODO

  function toggleEdit() {
    let editable_elements = Array.from(document.getElementsByClassName("celula"));
    if (editing == true) {
      aplicar("apply");
      setEditing(false);
      console.log(editing)
      for (let e in editable_elements) {
        let celula = document.getElementById("celula" + e)
        celula.onclick = () => {
          if (celula.className == "celula selecionado") {
            celula.className = "celula objeto"
            celula.style.backgroundColor = bgObjColor;
            celula.style.borderColor = borderObjColor;
            celula.style.color = txtColor;
          } else if (celula.className == "celula objeto") {
            celula.className = "celula selecionado"

            celula.style.backgroundColor = bgColor;
            celula.style.backgroundColor = bgObjSelColor;
            celula.style.borderColor = borderObjSelColor;
            celula.style.color = txtColor;
          }
        }
        celula.contentEditable = false
        celula.style.userSelect = "none";
      }
    } else {
      setEditing(true);
      for (let e in editable_elements) {
        let celula = document.getElementById("celula" + e)
        celula.onclick = () => { celula.onfocus = true }
        celula.contentEditable = true
      }
    }
  }

  return (
    
    <div className="App">
    <div id="jogos">
      <header id="Appheader" className='backgroundSecundario'>
        <h3>BINGO DO CELLBIT</h3>
        <button id="btnTemas" className='Buttons objeto' onClick={temaPopupToggle}> <IoIosColorPalette size={"3vh"} /> </button>
        <button id='btnBingoMenu' className='Buttons objeto' onClick={bingoPopupToggle}> <FaSave size={"3vh"} /> </button>
        <button id="btnHide" className='btnShowing objeto' onClick={toggleEdit}>
          {editing ?
            <IoMdCheckmark size="3vh" /> : <FaPencilAlt />}
        </button>
      </header>
      <div id="corpo">

        <div id="wrap" className='bingoToMiddle'>
          <div id='bingo'>
          </div>
        </div>


        {/* POPUP BINGO */}


        <div id="PopupPlaceBingo" className='PopupHide'>

          <div className='PopupBody backgroundSecundario'>
            <div id='PopupBingo' style={{ fontSize: '2vh' }}>
              <h2 className='PopupH2'>Salvar</h2>
              <div style={{ display: "flex" }}>
                <input type='text' id='inputPopupBingo' spellCheck="false" className='PopupInput objeto' placeholder='Nome do Bingo' maxLength={40} />
                <button id='btnPopupBingo' className='PopupBtn objeto' onClick={salvarBingo}> Salvar </button>
              </div>
              <div id="PopupCarregar">
                <h2>Carregar</h2>
                <span>Escolha o bingo que deseja carregar</span>
                <div id='ListaBingos'></div>
              </div>
            </div>


          </div>

        </div>

        {/* POPUP TEMA */}

        <div id="PopupPlaceTema" className='PopupHideTema'>

          <div id="themeBody">
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Fundo</h3>
              <ChromePicker disableAlpha={true} color={colorBackground} onChange={setColorBackground} />
            </div>
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Menus e Cabeçalho</h3>
              <ChromePicker disableAlpha={true} color={colorHeaderBackground} onChange={setColorHeaderBackground} />
            </div>
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Texto</h3>
              <ChromePicker disableAlpha={true} color={colorText} onChange={setColorText} />
            </div>
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Cedulas, Botões e Inputs</h3>
              <ChromePicker disableAlpha={true} color={colorBackgroundItems} onChange={setColorBackgroundItems} />
            </div>
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Bordas</h3>
              <ChromePicker disableAlpha={true} color={colorBorderitems} onChange={setColorBorderitems} />
            </div>
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Cédulas Selecionadas</h3>
              <ChromePicker disableAlpha={true} color={colorBackgroundItemsSel} onChange={setBackgroundItemsSel} />
            </div>
            <div className='themeBodyObjects'>
              <h3 className='themePickerName'>Bordas Cedulas Selecionadas</h3>
              <ChromePicker disableAlpha={true} color={colorBorderitemsSel} onChange={setColorBorderitemsSel} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: "column" }}>

            <div id="previewDiv">
              <h3 className='themePickerName' style={{ marginBottom: '2.5vh', marginTop: '3vh', fontSize: "2.25vh" }}>Preview</h3>
              <div id="PreviewBody" style={{ backgroundColor: colorBackground.hex }}>
                <div id="PreviewCabecalho" style={{ color: colorText.hex, backgroundColor: colorHeaderBackground.hex }}>Cabeçalho</div>
                <div style={{ display: 'flex' }}>
                  <div className='celulaPreview' style={{ color: colorText.hex, backgroundColor: colorBackgroundItems.hex, borderColor: colorBorderitems.hex, marginRight: '1vw' }}>Cedula comum</div>
                  <div className='celulaPreview' style={{ color: colorText.hex, backgroundColor: colorBackgroundItemsSel.hex, borderColor: colorBorderitemsSel.hex }}>Cedula Selecionada</div>
                </div>
              </div>
            </div>

            <div className='PopupBodyTema backgroundSecundario'>
              <div id='PopupTema'>
                <button id='btnAplicarTema' className='objeto' onClick={aplicarTema}> Aplicar Tema </button>
                <div style={{ display: "flex" }}>
                  <input type='text' id='inputPopupTema' spellCheck="false" className='PopupInput objeto' placeholder='Nome do Tema' maxLength={40} />
                  <button id='btnPopupTema' className='PopupBtn objeto' onClick={salvarTema}> Salvar </button>
                </div>
                <div id="PopupCarregar">
                  <h2 style={{ margin: "0px" }}>Carregar</h2>
                  <span>Escolha o tema que deseja utilizar</span>
                  <div id='ListaTemasPreset' style={{marginTop: "1vh"}}>
                    <button id='btnPresetDefault' className='presetsTemas objeto' onClick={aplicarTemaPreset}> Default </button>
                  </div>
                  <div id='ListaTemas'></div>
                </div>
              </div>
            </div>

          </div>


        </div>

      </div>
    </div >
    </div>
  )
}


export default App;
