import './App.css';
import './index.css';
import { useState } from 'react';
import { getData, addData, clearData, deleteData } from './models/database/localStorage.js'
import { useEffect } from 'react';
import { FaBlackTie, FaPencilAlt, FaSave } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { IoIosArrowUp, IoIosColorPalette, IoMdArrowBack, IoMdArrowDown, IoMdCheckmark } from "react-icons/io";
import { ChromePicker } from 'react-color';
import { useColor } from 'react-color-palette';
import { PiBroomFill } from "react-icons/pi";
import html2canvas from "html2canvas";
import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';


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
  const [isPopupOpen, setPopupOpen] = useState(false);


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

  function refreshThemeValues() {
    let data = getData("BingoCellbit");
    bgColor = data.temaAtual.bgColor;
    bgHeaderColor = data.temaAtual.bgHeaderColor;
    txtColor = data.temaAtual.txtColor;
    bgObjColor = data.temaAtual.bgObjColor;
    borderObjColor = data.temaAtual.borderObjColor;
    bgObjSelColor = data.temaAtual.bgObjSelColor;
    borderObjSelColor = data.temaAtual.borderObjSelColor;
  }

  function carregarTema() {
    refreshThemeValues()

    let background = document.getElementsByClassName('background')
    for (let i = 0; i < background.length; i++) {
      background[i].style.backgroundColor = bgColor;
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
    if (event.target.id == "btnPresetDefault") {
      let TemaNovo = { bgColor: "#222222", bgHeaderColor: "#3A3A3A", txtColor: "#FFFFFF", bgObjColor: "#535353", borderObjColor: "#000000", bgObjSelColor: "#C2AF00", borderObjSelColor: "#BDBD00" };
      addData("temaAtual", "", TemaNovo)
      carregarTema();
    }
    if (event.target.id == "btnPresetRed") {
      let TemaNovo = { bgColor: "#301717", bgHeaderColor: "#472020", txtColor: "#FFFFFF", bgObjColor: "#643738", borderObjColor: "#000000", bgObjSelColor: "#8D0000", borderObjSelColor: "#D10000" };
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

  function ClearAplicar() {
    aplicar("clear");
    toggleEdit("load");
  }

  function ShuffleBingo(tipo) {
    if (tipo == 'medo') {
      let listaDoMedo = [
        'PSX',
        'ENERGIA CAIU',
        'ESQUECEU PARTE DO CORPO',
        'VULTO NO CORREDOR',
        'WALKING SIMULATOR',
        'SOM_AMEDONTRADOR.MP3',
        'ACABA COM JUMPSCARE',
        'ESCRITA COM SANGUE',
        'DEVE TER SIDO O VENTO',
        'RINDO/CHORANDO.MP3',
        'TELEFONE TOCANDO',
        'PORTA MOVE SOZINHA',
        'ARTE IA',
        'CANO JUMPSCARE',
        'ERA MELHOR NÃO TER MOSTRADO O MONSTRO',
        'CHAVE PARA PEGAR OUTRA CHAVE',
        'FOI TUDO POR NADA',
        'LUZ PISCA/CAI',
        'TROCAR FUZÍVEL',
        'DAVA PARA TER IDO EMBORA',
        '????????????????',
        'DEVERIA TER CHAMADO A POLICIA',
        'TV COM ESTÁTICA',
        'TREMIDINHA DO KOJIMA',
        'COELHO DA UNREAL',
        'ESPELHO/VIDRO QUEBRA SOZINHO',
        'JOGO FOFO QUE VIRA DE MEDO',
        'ACABOU DO NADA',
        'MASCOT HORROR',
        'SOM ALTO = ASSUSTADOR',
        'FOUND FOOTAGE',
        'CRIATURA.PNG',
        'JUMPSCARE DE NADA',
        'CRUZ INVERTIDA'];

      let shuffled = listaDoMedo.sort(() => 0.5 - Math.random());
      shuffled.splice(0, (listaDoMedo.length - 16));
      console.log(shuffled);
      let result = '';
      for (let index = 0; index < shuffled.length; index++) {
        if (index == 0) {
          result += (shuffled[index]);
        } else {
          result += '\n' + (shuffled[index]);
        }

      }
      aplicar('shuffle', result);
    } else if (tipo == 'shuffle') {
      let celulas = Array.from(document.getElementsByClassName("celula"))
      let lista = [];
      for (let i in celulas) {
        let item = document.getElementById("celula" + i)
        lista.push(item.innerText)
      }
      let shuffled = lista.sort(() => 0.5 - Math.random());
      let result = '';
      for (let index = 0; index < shuffled.length; index++) {
        if (index == 0) {
          result += (shuffled[index]);
        } else {
          result += '\n' + (shuffled[index]);
        }
      }
      aplicar('shuffle', result);
    }
  }

  function aplicar(by, shuffle) {
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
    } else if (by == "clear") {
      texto = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
    } else if (by = 'shuffle') {
      texto = shuffle
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
          cell.style.fontSize = "2vh"
          cell.dataset.animation = "inactive";
          cell.innerText = element.toString();
          cell.onclick = () => {
            document.getElementById(cell.id).focus();
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
    addData("temaAtual", "", TemaNovo);
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
        toggleEdit("load")
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

  function shufflePopupToggle() {
    let divPopupTema = document.getElementById("PopupPlaceTema")
    let divPopupBingo = document.getElementById("PopupPlaceBingo")
    let divPopupClear = document.getElementById("PopupPlaceClear")
    let divPopup = document.getElementById("PopupPlaceShuffle")
    let divBingo = document.getElementById("wrap")
    if (divPopup.className == "PopupShow") {
      divPopup.className = "PopupHide"
      divBingo.className = "bingoToMiddle"

    } else {
      divPopup.className = "PopupShow"
      divPopupTema.className = "PopupHideTema"
      divPopupClear.className = "PopupHideTema"
      divPopupBingo.className = "PopupHideTema"
      divBingo.className = "bingoToSide"
      document.getElementById("btnHide").className = "btnShowing objeto"
    }
  }

  function clearPopupToggle() {
    let divPopupTema = document.getElementById("PopupPlaceTema")
    let divPopupBingo = document.getElementById("PopupPlaceBingo")
    let divPopupShuffle = document.getElementById("PopupPlaceShuffle")
    let divPopup = document.getElementById("PopupPlaceClear")
    let divBingo = document.getElementById("wrap")
    if (divPopup.className == "PopupShow") {
      divPopup.className = "PopupHide"
      divBingo.className = "bingoToMiddle"

    } else {
      divPopup.className = "PopupShow"
      divPopupTema.className = "PopupHideTema"
      divPopupShuffle.className = "PopupHideTema"
      divPopupBingo.className = "PopupHideTema"
      divBingo.className = "bingoToSide"
      document.getElementById("btnHide").className = "btnShowing objeto"
    }
  }

  function bingoPopupToggle() {
    let divPopupTema = document.getElementById("PopupPlaceTema")
    let divPopupClear = document.getElementById("PopupPlaceClear")
    let divPopupShuffle = document.getElementById("PopupPlaceShuffle")
    let divPopup = document.getElementById("PopupPlaceBingo")
    let divBingo = document.getElementById("wrap")
    if (divPopup.className == "PopupShow") {
      divPopup.className = "PopupHide"
      divBingo.className = "bingoToMiddle"

    } else {
      divPopup.className = "PopupShow"
      divPopupClear.className = "PopupHideTema"
      divPopupShuffle.className = "PopupHideTema"
      divPopupTema.className = "PopupHideTema"
      divBingo.className = "bingoToSide"
      document.getElementById("btnHide").className = "btnShowing objeto"
      carregarListaBingos()
    }
  }

  function temaPopupToggle() {
    let divPopupBingo = document.getElementById("PopupPlaceBingo")
    let divPopupClear = document.getElementById("PopupPlaceClear")
    let divPopupShuffle = document.getElementById("PopupPlaceShuffle")
    let divPopup = document.getElementById("PopupPlaceTema")
    let divBingo = document.getElementById("wrap")
    if (divPopup.className == "PopupShowTema") {
      divPopup.className = "PopupHideTema"
      divBingo.className = "bingoToMiddle"
      document.getElementById("btnShuffle").className = "btnShowing objeto"
      document.getElementById("btnHide").className = "btnShowing objeto"
      document.getElementById("btnClear").className = "btnShowing objeto"

    } else {
      carregarListaTemas()
      divPopup.className = "PopupShowTema"
      divPopupBingo.className = "PopupHide"
      divPopupShuffle.className = "PopupHideTema"
      divPopupClear.className = "PopupHideTema"
      divBingo.className = "bingoHide"
      document.getElementById("btnShuffle").className = "btnHiding objeto"
      document.getElementById("btnHide").className = "btnHiding objeto"
      document.getElementById("btnClear").className = "btnHiding objeto"
    }
  }

  //TOGGLE EDIT E HEADER

  function toggleEdit(toggle) {
    let editable_elements = Array.from(document.getElementsByClassName("celula"));
    if (toggle == "load") {
      setEditing(true);
      for (let e in editable_elements) {
        let celula = document.getElementById("celula" + e)
        celula.onclick = () => { celula.onfocus = true }
        celula.contentEditable = true
        celula.className = "celula objeto"
        celula.style.backgroundColor = bgObjColor;
        celula.style.borderColor = borderObjColor;
        celula.style.color = txtColor;
        celula.dataset.animation = "inactive";
      }
    } else {
      if (editing == true) {
        aplicar("apply");
        setEditing(false);
        for (let e in editable_elements) {
          let celula = document.getElementById("celula" + e)
          celula.onclick = () => {
            celula.dataset.animation = "active";
            setTimeout(
              function () {
                celula.dataset.animation = "inactive"
              }, 500
            )
            refreshThemeValues();
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
            if (document.getElementById("canvaOverlay") != null) {
              document.getElementById("canvaOverlay").remove();
            }
            html2canvas(document.getElementById("bingo")).then(canvas => {
              canvas.id = "canvaOverlay"
              canvas.style.visibility = "hidden"
              document.body.appendChild(canvas)

              if (window.location.hash == "#mods") {
                console.log(window.location.hash)
                let idCanva = "canvaOverlay";
                let link = document.getElementById("canvasA");

                if (link == null) {
                  link = document.createElement('a');
                  link.id = "canvasA";
                }

                link.download = 'Bingo.png';
                link.href = document.getElementById(idCanva).toDataURL("image/jpeg", 1);
                link.click();
              };
            });


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
  }

  function toggleHeader() {
    let header = document.getElementById("Appheader")
    let headerArrow = document.getElementById("headerArrow")
    if (header.className == "backgroundSecundario headerShow") {
      header.className = "backgroundSecundario headerHide";
      headerArrow.className = "arrowHeaderShow";
    } else {
      header.className = "backgroundSecundario headerShow";
      headerArrow.className = "arrowHeaderHide";
    }
  }


  return (
    <div className="App">
      <div id="jogos">
        <header id="Appheader" className='backgroundSecundario headerShow'>
          <h3>BINGO DO CELLBIT</h3>
          <button id="btnTemas" className='Buttons objeto' onClick={temaPopupToggle}> <IoIosColorPalette size={"3vh"} /> </button>
          <button id='btnBingoMenu' className='Buttons objeto' onClick={bingoPopupToggle}> <FaSave size={"3vh"} /> </button>
          <button id="btnShuffle" className='btnShowing objeto' onClick={shufflePopupToggle}> <FaShuffle size={"3vh"} /> </button>
          <button id="btnClear" className='btnShowing objeto' onClick={clearPopupToggle}> <PiBroomFill size={"3vh"} /> </button>
          <button id="btnHide" className='btnShowing objeto' onClick={toggleEdit}>
            {editing ?
              <IoMdCheckmark size="3vh" /> : <FaPencilAlt />}
          </button>
          <div id='toggleHeader' className='backgroundSecundario' onClick={toggleHeader}> <div id='headerArrow' className='arrowHeaderHide' style={{ height: 'fit-content' }}> <IoIosArrowUp size="2.5vh" /> </div> </div>
        </header>
        <div id="corpo">
          <div>
            <div id="wrap" className='bingoToMiddle'>
              <div id='bingo' className='background'>
              </div>
            </div>


            {/* POPUP ALEATORIZAR BINGO */}

            <div id="PopupPlaceShuffle" className='PopupHide'>
              <div className='PopupBody backgroundSecundario' style={{ height: "fit-content" }}>
                <div id='PopupClear' style={{ fontSize: '2vh', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h2 className='PopupH2'>Aleatorizar o bingo?</h2>
                  <span>Isso aleatorizará o bingo atual.</span>
                  <div style={{ display: "flex", alignContent: 'center', paddingTop: '2.5vh', width: '100%', justifyContent: 'center' }}>
                    <button className='PopupBtn objeto' onClick={() => { ShuffleBingo('shuffle'); }} style={{ width: "11.5vw", marginRight: '2vw' }}> Aleatorizar </button>
                    <button className='PopupBtn objeto' onClick={shufflePopupToggle} style={{ width: "11.5vw" }}> Fechar </button>
                  </div>
                  <div style={{ display: "flex", alignContent: 'center', width: '100%', justifyContent: 'center', flexDirection: 'column' }}>
                    <button className='PopupBtn objeto' onClick={() => { ShuffleBingo('medo'); }} style={{ width: "25vw", marginLeft: 'auto', marginRight: 'auto', marginBottom: '0.5vh' }}> Aleatorizar Bingo do Medo </button>
                    <span>Isso criará um novo bingo aleatorizado para sextas do medo. Alterações não slavas serão descartadas.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* POPUP LIMPAR BINGO */}

          <div id="PopupPlaceClear" className='PopupHide'>
            <div className='PopupBody backgroundSecundario' style={{ height: "fit-content" }}>
              <div id='PopupClear' style={{ fontSize: '2vh' }}>
                <h2 className='PopupH2'>Limpar celulas do bingo?</h2>
                <span>Isso limpara todas as celulas do bingo, alterações não salvas serão perdidas.</span>
                <div style={{ display: "flex", alignContent: 'center', paddingTop: '2.5vh', width: '100%', justifyContent: 'center' }}>
                  <button className='PopupBtn objeto' onClick={() => { ClearAplicar(); clearPopupToggle() }} style={{ width: "10vw", marginRight: '2vw' }}> Limpar bingo </button>
                  <button className='PopupBtn objeto' onClick={clearPopupToggle} style={{ width: "10vw" }}> Cancelar </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* POPUP BINGO */}

        <div id="PopupPlaceBingo" className='PopupHide'>
          <div className='PopupBody backgroundSecundario' style={{ height: "fit-content" }}>
            <div id='PopupBingo' style={{ fontSize: '2vh' }}>
              <h2 className='PopupH2'>Salvar</h2>
              <div style={{ display: "flex" }}>
                <input type='text' id='inputPopupBingo' spellCheck="false" className='PopupInput objeto' placeholder='Nome do Bingo' maxLength={40} />
                <button id='btnPopupBingo' className='PopupBtn objeto' onClick={salvarBingo}> Salvar </button>
              </div>
              <div id="PopupCarregar">
                <h2>Carregar</h2>
                <span>Escolha o bingo que deseja carregar.</span>
                <br />
                <span>Clique duas vezes no X para deletar.</span>
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
                  <span>Clique duas vezes no X para deletar.</span>
                  <div id='ListaTemasPreset'>
                    <button id='btnPresetDefault' className='presetsTemas objeto' onClick={aplicarTemaPreset}> Default </button>
                    <button id='btnPresetRed' className='presetsTemas objeto' onClick={aplicarTemaPreset}> Vermelho </button>
                  </div>
                  <div id='ListaTemas' style={{ overflowY: 'auto', height: '19vh' }}></div>
                </div>
              </div>
            </div>

          </div>


        </div>

      </div>
    </div >
  )
}


export default App;
