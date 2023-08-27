import './temas.css'
import '../../App.css';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import React, { useState } from 'react';
import {setData, getData, addData, deleteData} from '../../models/database/localStorage.js'
import { useEffect } from 'react';
import { FaRegCheckSquare, FaTrashAlt } from 'react-icons/fa';

function Temas() {

    
    
  let bgColor = "#00000";
  let bgHeaderColor = "#00000";
  let txtColor = "#fff";
  let bgObjColor = "#00000";
  let borderObjColor = "#00000";
  let bgObjSelColor = "#00000";
  let borderObjSelColor = "#00000";

  useEffect(() => {
    let data = getData("BingoCellbit");
    bgColor = data.temaAtual.bgColor;
    bgHeaderColor = data.temaAtual.bgHeaderColor;
    txtColor = data.temaAtual.txtColor;
    bgObjColor = data.temaAtual.bgObjColor;
    borderObjColor = data.temaAtual.borderObjColor;
    bgObjSelColor = data.temaAtual.bgObjSelColor;
    borderObjSelColor = data.temaAtual.borderObjSelColor;
    loadTema(); 

    // STYLES FODAS

    var styleObj = document.createElement('style');
    styleObj.type = 'text/css';
    styleObj.innerHTML = '.objetos { background-color: '+bgObjColor+'; color: '+txtColor+'; border: 5px 25px 5px '+borderObjColor+'; box-shadow: 5px 25px 5px '+ borderObjColor+'}';
    document.getElementsByTagName('head')[0].appendChild(styleObj);

    var styleObj2 = document.createElement('style');
    styleObj2.type = 'text/css';
    styleObj2.innerHTML = '.objetos2 { background-color: '+bgHeaderColor+'; color: '+txtColor+'; border: 5px 25px 5px '+borderObjColor+';}';
    document.getElementsByTagName('head')[0].appendChild(styleObj2);

    var styleObj3 = document.createElement('style');
    styleObj3.type = 'text/css';
    styleObj.innerHTML = '.objetos3 { background-color: '+bgObjColor+'; color: '+txtColor+'; border: 5px 25px 5px; border-color: '+borderObjColor+'; box-shadow: 5px 25px 5px '+ borderObjColor+'}';
    document.getElementsByTagName('head')[0].appendChild(styleObj3);

    var styleObjSel = document.createElement('style');
    styleObjSel.type = 'text/css';
    styleObjSel.innerHTML = '.objetossel { background-color: '+bgObjSelColor+'; color: '+txtColor+'; border: 5px 25px 5px; border-color: '+borderObjSelColor+'; box-shadow: 5px 25px 5px '+borderObjSelColor+'}';
    document.getElementsByTagName('head')[0].appendChild(styleObjSel);

    //FIM STILES FODAS

    document.getElementById("temaSalvar").style.borderColor = borderObjColor;
    document.getElementById("temaComumPreset").style.borderColor = borderObjColor;
    });


    function loadTema(){
        let datastr = JSON.stringify(getData("BingoCellbit")).replaceAll("undefined", '');
        let data = JSON.parse(datastr);
        let elements = [];
        if(data.temaSalvo != {}){
            for(let i in data.temaSalvo){
                if(document.getElementById("listTemasCarregar").childNodes.length <= Object.keys(data).length+1){
                    let divbtns = document.createElement("div");
                    divbtns.className = "divbtnsListaTemas"
                    let buttonLista = document.createElement("button");
                    buttonLista.innerHTML = String(i).replaceAll("_", " ");
                    buttonLista.style.backgroundColor = bgObjColor; 
                    buttonLista.style.border = "0.2vh solid" +borderObjColor;
                    buttonLista.style.color = txtColor;
                    buttonLista.style.justifyContent = "center";
                    buttonLista.style.marginTop = "0px";
                    buttonLista.className='btnListaBingoCarregar';
                    buttonLista.onclick = () => {
                        let infoTema = JSON.parse(data.temaSalvo[i])
                        let finalTema = {bgColor: String(infoTema.bgColor), bgHeaderColor: String(infoTema.bgHeaderColor), txtColor: String(infoTema.txtColor), bgObjColor: String(infoTema.bgObjColor), borderObjColor: String(infoTema.borderObjColor),bgObjSelColor: String(infoTema.bgObjSelColor),borderObjSelColor: String(infoTema.borderObjSelColor)};
                        addData("temaAtual", "", finalTema);
                        window.location.pathname = "/bingo-cellbit/";
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
                    btnDelete.style.color = txtColor;
                    btnDelete.onclick = () => {
                        setIdPagarTema(i)
                        abrirPopupApagar();
                        document.getElementById('apagarSpanPopup').innerHTML = "Você deseja apagar o tema " + i + " ?";
                    }
                    divbtns.append(btnDelete)
                    elements.push(divbtns);
                }
            }
            if(document.getElementById("listTemasCarregar").children.length <= elements.length){
                for (var i = 0; i < elements.length; ++i) {
                    document.getElementById("listTemasCarregar").appendChild(elements[i]);
                }
            }
        }
    }

    const [colorBackground, setColorBackground] = useColor("#222222");
    const [colorHeaderBackground, setColorHeaderBackground] = useColor("#3a3a3a");
    const [colorText, setColorText] = useColor("#fff");
    const [colorBackgroundItems, setColorBackgroundItems] = useColor("#535353");
    const [colorBorderitems, setColorBorderitems] = useColor("#000000");
    const [colorBackgroundItemsSel, setBackgroundItemsSel] = useColor("rgb(150, 147, 0)");
    const [colorBorderitemsSel, setColorBorderitemsSel] = useColor("rgb(229, 255, 0)");

    const [idPagarTema, setIdPagarTema] = useState("");

    function hidePicker(event){
        let pickerId = ""
        if (event.currentTarget.id == "btnBackgroundPicker"){
            pickerId = "pickerBackground"
        }else if (event.currentTarget.id == "btnHeaderBackgroundPicker"){
            pickerId = "pickerHeaderBackground"
        }else if (event.currentTarget.id == "btnTextPicker"){
            pickerId = "pickerText"
        }else if (event.currentTarget.id == "btnBorderPicker"){
            pickerId = "pickerBorder"
        }else if (event.currentTarget.id == "btnBackgroundItemsPicker"){
            pickerId = "pickerBackgroundItems"
        }else if (event.currentTarget.id == "btnBackgroundItemsSelPicker"){
            pickerId = "pickerBackgroundItemsSel"
        }else if (event.currentTarget.id == "btnBorderSelPicker"){
            pickerId = "pickerBorderSel"
        }
        let picker = document.getElementById(pickerId);

        if(picker.style.visibility=="hidden"){
            picker.style.visibility = "visible"
            picker.className='pickerVisible'
        } else if(picker.style.visibility=="visible"){
            picker.style.visibility = "hidden"
            picker.className='pickerHidden'
        }
    }

    function mudarTema (event){
            let data = {bgColor: "#222222", bgHeaderColor: "#3a3a3a", txtColor: "#fff", bgObjColor: "#535353", borderObjColor: "#000",bgObjSelColor: "#c2af00",borderObjSelColor: "#bdbd00"};

            addData("temaAtual", "", data);
            window.location.pathname = "/bingo-cellbit/";
    }

    function salvarTema(){
        let inputTema = document.getElementById("inputPopupSalvarTema");
        let bgColor = String(colorBackground.hex);
        let bgHeaderColor = String(colorHeaderBackground.hex);
        let txtColor = String(colorText.hex);
        let bgObjColor = String(colorBackgroundItems.hex);
        let borderObjColor = String(colorBorderitems.hex);
        let bgObjSelColor = String(colorBackgroundItemsSel.hex);
        let borderObjSelColor = String(colorBorderitemsSel.hex);
            
        let data = {bgColor: bgColor, bgHeaderColor: bgHeaderColor, txtColor: txtColor, bgObjColor: bgObjColor, borderObjColor: borderObjColor,bgObjSelColor: bgObjSelColor,borderObjSelColor: borderObjSelColor}
        let nome = String(inputTema.value).replaceAll(" ","_");
        addData("temaSalvo", nome, data);
        addData("temaAtual", "", data);
        window.location.pathname = "/bingo-cellbit/";
    }


    function fecharPopup(event){
        let popup = document.getElementById("salvarTemaPopup");
        let popup2 = document.getElementById("ApagarTemaPopup");
        popup.className = "popupBody escondido objetos2";
        popup2.className = "popupBody escondido objetos2";
    }

    function abrirPopupApagar(){
        let col3 = document.getElementById("ApagarTemaPopup");
        if (col3.className == "popupBody escondido objetos2"){
            col3.classList = "popupBody aparece objetos2"
        }else{ 
            col3.classList = "popupBody escondido objetos2"
        }
        
      }

    function abrirPopup(event){
        let idPopup = ""
        if (event.target.id == "temaSalvar"){
          idPopup = "salvarTemaPopup"
        }
        if (event.target.id == "btnPopupSalvarTemaFechar"){
          idPopup = "salvarTemaPopup"
        }
        let popup = document.getElementById(idPopup);
        if(popup.className == "popupBody aparece objetos2"){
          popup.className = "popupBody escondido objetos2"
        }else if(popup.className == "popupBody escondido objetos2"){
        popup.className = "popupBody aparece objetos2"
        }
      }

      
  function apagarTema (){
    deleteData("tema", idPagarTema)
    mudarTema();
    fecharPopup();
  }
    
    return (
        <div id="temas">
            <div id="col1">
                <div id="picker1" className="pickerSeparators">
                    <button id="btnBackgroundPicker" className="btnHidePickers objetos" style={{borderColor: colorBackground.hex}} onClick={hidePicker}> Fundo </button>
                    <div id="pickerBackground" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorBackground} onChange={setColorBackground} /></div>
                </div>
                <div id="picker1header" className="pickerSeparators">
                    <button id="btnHeaderBackgroundPicker" className="btnHidePickers objetos" style={{borderColor: colorHeaderBackground.hex}} onClick={hidePicker}> Cabeçalho e Popups </button>
                    <div id="pickerHeaderBackground" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorHeaderBackground} onChange={setColorHeaderBackground} /></div>
                </div>
                <div id="picker2" className="pickerSeparators">
                    <button id="btnTextPicker" className="btnHidePickers objetos" style={{borderColor: colorText.hex}} onClick={hidePicker}> Texto </button>
                    <div id="pickerText" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorText} onChange={setColorText} /></div>
                </div>
                <div id="picker3" className="pickerSeparators">
                    <button id="btnBorderPicker" className="btnHidePickers objetos" style={{borderColor: colorBorderitems.hex}} onClick={hidePicker}> Bordas </button>
                    <div id="pickerBorder" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorBorderitems} onChange={setColorBorderitems} /></div>
                </div>
                <div id="picker4" className="pickerSeparators">
                    <button id="btnBackgroundItemsPicker" className="btnHidePickers objetos" style={{borderColor: colorBackgroundItems.hex}} onClick={hidePicker}> Fundo Itens </button>
                    <div id="pickerBackgroundItems" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorBackgroundItems} onChange={setColorBackgroundItems} /></div>
                </div>
                <div id="picker5" className="pickerSeparators">
                    <button id="btnBackgroundItemsSelPicker" className="btnHidePickers objetos" style={{borderColor: colorBackgroundItemsSel.hex}} onClick={hidePicker}> Fundo Selecionados </button>
                    <div id="pickerBackgroundItemsSel" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorBackgroundItemsSel} onChange={setBackgroundItemsSel} /></div>
                </div>
                <div id="picker6" className="pickerSeparators">
                    <button id="btnBorderSelPicker" className="btnHidePickers objetos" style={{borderColor: colorBorderitemsSel.hex}} onClick={hidePicker}> Borda Selecionados </button>
                    <div id="pickerBorderSel" style={{visibility: "hidden"}} className='pickerHidden'><ColorPicker hideAlpha="True" hideInput="True" color={colorBorderitemsSel} onChange={setColorBorderitemsSel} /></div>
                </div>
                </div>

            <div id="col2">
                
                <div id='foda' style={{backgroundColor: colorBackground.hex, color: colorText.hex}}>
                    <div id="headerfoda" style={{backgroundColor: colorHeaderBackground.hex}}><h3>PREVIEW</h3></div>
                    <h1>Bingo</h1>
                    <div id="celulaModelo" style={{backgroundColor: colorBackgroundItems.hex, boxShadow: "2vh 5vh 0.5vh " + colorBorderitems.hex, borderColor: colorBorderitems.hex}}><p>Esqueceu a mão</p></div>
                    <div id="celulaModelo" style={{backgroundColor: colorBackgroundItemsSel.hex, boxShadow: "2vh 5vh 0.5vh " + colorBorderitemsSel.hex, borderColor: colorBorderitemsSel.hex}}><p>Esqueceu a mão</p></div>
                </div>
            </div>
            <div id="col3">
                <button id="temaSalvar" className="objetos" onClick={abrirPopup}>Salvar Tema</button>
                <h2>Temas Salvos:</h2>
                <div id="listTemasCarregar">
                    <button id="temaComumPreset" className='btnListaTemaCarregar objetos' onClick={mudarTema}>Tema Comum</button>
                </div>
                <div id="salvarTemaPopup" className='popupBody escondido objetos2'>
                    <h2>Salvar</h2>
                    <button id='btnPopupSalvarTemaFechar' className='objetos' onClick={fecharPopup}> X </button>
                    <span>Você deseja salvar o tema</span>
                    <textarea id='inputPopupSalvarTema' spellCheck="false" className='inputNormal objetos' placeholder='Nome do Tema' maxLength={40}/>
                    <button id='btnPopupSalvarTema' className='btnNormal objetos' onClick={salvarTema}> Salvar </button>
                 </div>
                 <div id="ApagarTemaPopup" className='popupBody escondido objetos2'>
                    <h2>Apagar</h2>
                    <span id="apagarSpanPopup">Você deseja apagar o tema</span>
                    <div style={{display: 'flex'}}>
                      <button id='btnPopupApagarTema' className='btnNormal objetos' onClick={apagarTema}> Apagar </button>
                      <button id='btnPopupApagarTemaNegar' className='btnNormal objetos' onClick={fecharPopup}> Cancelar </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Temas;
