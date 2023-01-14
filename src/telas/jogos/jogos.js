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
      document.getElementById("jogos").style.height = "95vh"
    } else if (divmain.className == "escondido") {
      divmain.className = "aparece";
      document.getElementById("x3div").className = "x3divc"
      document.getElementById("x4div").className = "x4divc"
      document.getElementById("x5div").className = "x5divc"
      document.getElementById("x6div").className = "x6divc"
      document.getElementById("jogos").style.height = "89vh"
    }
  }

  function checkLineBingo(numero) {
    if (numero == 4) {
      const cell0 = document.getElementById("celula0");
      const cell1 = document.getElementById("celula1");
      const cell2 = document.getElementById("celula2");
      const cell3 = document.getElementById("celula3");
      const cell4 = document.getElementById("celula4");
      const cell5 = document.getElementById("celula5");
      const cell6 = document.getElementById("celula6");
      const cell7 = document.getElementById("celula7");
      const cell8 = document.getElementById("celula8");
      const cell9 = document.getElementById("celula9");
      const cell10 = document.getElementById("celula10");
      const cell11 = document.getElementById("celula11");
      const cell12 = document.getElementById("celula12");
      const cell13 = document.getElementById("celula13");
      const cell14 = document.getElementById("celula14");
      const cell15 = document.getElementById("celula15");
      const linha4h1r = document.getElementById("linha4h1");
      const linha4v1r = document.getElementById("linha4v1");
      const linha4h2r = document.getElementById("linha4h2");
      const linha4v2r = document.getElementById("linha4v2");
      const linha4h3r = document.getElementById("linha4h3");
      const linha4v3r = document.getElementById("linha4v3");
      const linha4h4r = document.getElementById("linha4h4");
      const linha4v4r = document.getElementById("linha4v4");
      const linha4d1r = document.getElementById("linha4d1");
      const linha4d2r = document.getElementById("linha4d2");

      //row1-------------------------------------
      if (cell0.className.includes("cellselecionado") && cell1.className.includes("cellselecionado") && cell2.className.includes("cellselecionado") && cell3.className.includes("cellselecionado")) {
        if (cell0.contains(linha4h1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4h1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4h linhanormal";
          } else {
            linha.className = "linha4h linhamedo";
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha4h1r) == true) {
        cell0.removeChild(linha4h1r);
      }

      //col1-------------------------------------
      if (cell0.className.includes("cellselecionado") && cell4.className.includes("cellselecionado") && cell8.className.includes("cellselecionado") && cell12.className.includes("cellselecionado")) {
        if (cell0.contains(linha4v1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4v1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4v linhanormal";
          } else {
            linha.className = "linha4v linhamedo";
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha4v1r) == true) {
        cell0.removeChild(linha4v1r);
      }

      //row2-------------------------------------

      if (cell4.className.includes("cellselecionado") && cell5.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell7.className.includes("cellselecionado")) {
        if (cell4.contains(linha4h2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4h2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4h linhanormal";
          } else {
            linha.className = "linha4h linhamedo";
          }
          cell4.appendChild(linha);
        }
      } else if (cell4.contains(linha4h2r) == true) {
        cell4.removeChild(linha4h2r);
      }

      //col2-------------------------------------

      if (cell1.className.includes("cellselecionado") && cell5.className.includes("cellselecionado") && cell9.className.includes("cellselecionado") && cell13.className.includes("cellselecionado")) {
        if (cell1.contains(linha4v2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4v2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4v linhanormal";
          } else {
            linha.className = "linha4v linhamedo";
          }
          cell1.appendChild(linha);
        }
      } else if (cell1.contains(linha4v2r) == true) {
        cell1.removeChild(linha4v2r);
      }

      //row3-------------------------------------

      if (cell8.className.includes("cellselecionado") && cell9.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell11.className.includes("cellselecionado")) {
        if (cell8.contains(linha4h3r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4h3";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4h linhanormal";
          } else {
            linha.className = "linha4h linhamedo";
          }
          cell8.appendChild(linha);
        }
      } else if (cell8.contains(linha4h3r) == true) {
        cell8.removeChild(linha4h3r);
      }

      //col3-------------------------------------

      if (cell2.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell14.className.includes("cellselecionado")) {
        if (cell2.contains(linha4v3r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4v3";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4v linhanormal";
          } else {
            linha.className = "linha4v linhamedo";
          }
          cell2.appendChild(linha);
        }
      } else if (cell2.contains(linha4v3r) == true) {
        cell2.removeChild(linha4v3r);
      }

      //row4-------------------------------------

      if (cell12.className.includes("cellselecionado") && cell13.className.includes("cellselecionado") && cell14.className.includes("cellselecionado") && cell15.className.includes("cellselecionado")) {
        if (cell12.contains(linha4h4r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4h4";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4h linhanormal";
          } else {
            linha.className = "linha4h linhamedo";
          }
          cell12.appendChild(linha);
        }
      } else if (cell12.contains(linha4h4r) == true) {
        cell12.removeChild(linha4h4r);
      }

      //col4-------------------------------------

      if (cell3.className.includes("cellselecionado") && cell7.className.includes("cellselecionado") && cell11.className.includes("cellselecionado") && cell15.className.includes("cellselecionado")) {
        if (cell3.contains(linha4v4r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4v4";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha4v linhanormal";
          } else {
            linha.className = "linha4v linhamedo";
          }
          cell3.appendChild(linha);
        }
      } else if (cell3.contains(linha4v4r) == true) {
        cell3.removeChild(linha4v4r);
      }

      //diagonal1 ------------------------------

      if (cell0.className.includes("cellselecionado") && cell5.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell15.className.includes("cellselecionado")) {
        if (cell0.contains(linha4d1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4d1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linhanormal"
          } else {
            linha.className = "linhamedo"
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha4d1r) == true) {
        cell0.removeChild(linha4d1r);
      }

      //diagonal2 ------------------------------

      if (cell3.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell9.className.includes("cellselecionado") && cell12.className.includes("cellselecionado")) {
        if (cell3.contains(linha4d2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha4d2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linhanormal"
          } else {
            linha.className = "linhamedo"
          }
          cell3.appendChild(linha);
        }
      } else if (cell3.contains(linha4d2r) == true) {
        cell3.removeChild(linha4d2r);
      }



    } else if (numero == 5) {
      const cell0 = document.getElementById("celula0");
      const cell1 = document.getElementById("celula1");
      const cell2 = document.getElementById("celula2");
      const cell3 = document.getElementById("celula3");
      const cell4 = document.getElementById("celula4");
      const cell5 = document.getElementById("celula5");
      const cell6 = document.getElementById("celula6");
      const cell7 = document.getElementById("celula7");
      const cell8 = document.getElementById("celula8");
      const cell9 = document.getElementById("celula9");
      const cell10 = document.getElementById("celula10");
      const cell11 = document.getElementById("celula11");
      const cell12 = document.getElementById("celula12");
      const cell13 = document.getElementById("celula13");
      const cell14 = document.getElementById("celula14");
      const cell15 = document.getElementById("celula15");
      const cell16 = document.getElementById("celula16");
      const cell17 = document.getElementById("celula17");
      const cell18 = document.getElementById("celula18");
      const cell19 = document.getElementById("celula19");
      const cell20 = document.getElementById("celula20");
      const cell21 = document.getElementById("celula21");
      const cell22 = document.getElementById("celula22");
      const cell23 = document.getElementById("celula23");
      const cell24 = document.getElementById("celula24");
      const linha5h1r = document.getElementById("linha5h1");
      const linha5v1r = document.getElementById("linha5v1");
      const linha5h2r = document.getElementById("linha5h2");
      const linha5v2r = document.getElementById("linha5v2");
      const linha5h3r = document.getElementById("linha5h3");
      const linha5v3r = document.getElementById("linha5v3");
      const linha5h4r = document.getElementById("linha5h4");
      const linha5v4r = document.getElementById("linha5v4");
      const linha5h5r = document.getElementById("linha5h5");
      const linha5v5r = document.getElementById("linha5v5");
      const linha5d1r = document.getElementById("linha5d1");
      const linha5d2r = document.getElementById("linha5d2");

      //row1-------------------------------------
      if (cell0.className.includes("cellselecionado") && cell1.className.includes("cellselecionado") && cell2.className.includes("cellselecionado") && cell3.className.includes("cellselecionado") && cell4.className.includes("cellselecionado")) {
        if (cell0.contains(linha5h1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5h1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5h linhanormal";
          } else {
            linha.className = "linha5h linhamedo";
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha5h1r) == true) {
        cell0.removeChild(linha5h1r);
      }

      //col1-------------------------------------
      if (cell0.className.includes("cellselecionado") && cell5.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell15.className.includes("cellselecionado") && cell20.className.includes("cellselecionado")) {
        if (cell0.contains(linha5v1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5v1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5v linhanormal";
          } else {
            linha.className = "linha5v linhamedo";
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha5v1r) == true) {
        cell0.removeChild(linha5v1r);
      }

      //row2-------------------------------------
      if (cell5.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell7.className.includes("cellselecionado") && cell8.className.includes("cellselecionado") && cell9.className.includes("cellselecionado")) {
        if (cell5.contains(linha5h2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5h2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5h linhanormal";
          } else {
            linha.className = "linha5h linhamedo";
          }
          cell5.appendChild(linha);
        }
      } else if (cell5.contains(linha5h2r) == true) {
        cell5.removeChild(linha5h2r);
      }

      //col2-------------------------------------
      if (cell1.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell11.className.includes("cellselecionado") && cell16.className.includes("cellselecionado") && cell21.className.includes("cellselecionado")) {
        if (cell1.contains(linha5v2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5v2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5v linhanormal";
          } else {
            linha.className = "linha5v linhamedo";
          }
          cell1.appendChild(linha);
        }
      } else if (cell1.contains(linha5v2r) == true) {
        cell1.removeChild(linha5v2r);
      }

      //row3-------------------------------------
      if (cell10.className.includes("cellselecionado") && cell11.className.includes("cellselecionado") && cell12.className.includes("cellselecionado") && cell13.className.includes("cellselecionado") && cell14.className.includes("cellselecionado")) {
        if (cell10.contains(linha5h3r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5h3";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5h linhanormal";
          } else {
            linha.className = "linha5h linhamedo";
          }
          cell10.appendChild(linha);
        }
      } else if (cell10.contains(linha5h3r) == true) {
        cell10.removeChild(linha5h3r);
      }

      //col3-------------------------------------
      if (cell2.className.includes("cellselecionado") && cell7.className.includes("cellselecionado") && cell12.className.includes("cellselecionado") && cell17.className.includes("cellselecionado") && cell22.className.includes("cellselecionado")) {
        if (cell2.contains(linha5v3r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5v3";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5v linhanormal";
          } else {
            linha.className = "linha5v linhamedo";
          }
          cell2.appendChild(linha);
        }
      } else if (cell2.contains(linha5v3r) == true) {
        cell2.removeChild(linha5v3r);
      }

      //row4-------------------------------------
      if (cell15.className.includes("cellselecionado") && cell16.className.includes("cellselecionado") && cell17.className.includes("cellselecionado") && cell18.className.includes("cellselecionado") && cell19.className.includes("cellselecionado")) {
        if (cell15.contains(linha5h4r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5h4";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5h linhanormal";
          } else {
            linha.className = "linha5h linhamedo";
          }
          cell15.appendChild(linha);
        }
      } else if (cell15.contains(linha5h4r) == true) {
        cell15.removeChild(linha5h4r);
      }

      //col4-------------------------------------
      if (cell3.className.includes("cellselecionado") && cell8.className.includes("cellselecionado") && cell13.className.includes("cellselecionado") && cell18.className.includes("cellselecionado") && cell23.className.includes("cellselecionado")) {
        if (cell3.contains(linha5v4r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5v4";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5v linhanormal";
          } else {
            linha.className = "linha5v linhamedo";
          }
          cell3.appendChild(linha);
        }
      } else if (cell3.contains(linha5v4r) == true) {
        cell3.removeChild(linha5v4r);
      }

      //row5-------------------------------------
      if (cell20.className.includes("cellselecionado") && cell21.className.includes("cellselecionado") && cell22.className.includes("cellselecionado") && cell23.className.includes("cellselecionado") && cell24.className.includes("cellselecionado")) {
        if (cell20.contains(linha5h5r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5h5";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5h linhanormal";
          } else {
            linha.className = "linha5h linhamedo";
          }
          cell20.appendChild(linha);
        }
      } else if (cell20.contains(linha5h5r) == true) {
        cell20.removeChild(linha5h5r);
      }

      //col5-------------------------------------
      if (cell4.className.includes("cellselecionado") && cell9.className.includes("cellselecionado") && cell14.className.includes("cellselecionado") && cell19.className.includes("cellselecionado") && cell24.className.includes("cellselecionado")) {
        if (cell4.contains(linha5v5r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5v5";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha5v linhanormal";
          } else {
            linha.className = "linha5v linhamedo";
          }
          cell4.appendChild(linha);
        }
      } else if (cell4.contains(linha5v5r) == true) {
        cell4.removeChild(linha5v5r);
      }

      //diagonal1 ------------------------------

      if (cell0.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell12.className.includes("cellselecionado") && cell18.className.includes("cellselecionado") && cell24.className.includes("cellselecionado")) {
        if (cell0.contains(linha5d1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5d1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linhanormal"
          } else {
            linha.className = "linhamedo"
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha5d1r) == true) {
        cell0.removeChild(linha5d1r);
      }

      //diagonal2 ------------------------------

      if (cell4.className.includes("cellselecionado") && cell8.className.includes("cellselecionado") && cell12.className.includes("cellselecionado") && cell16.className.includes("cellselecionado") && cell20.className.includes("cellselecionado")) {
        if (cell4.contains(linha5d2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha5d2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linhanormal"
          } else {
            linha.className = "linhamedo"
          }
          cell4.appendChild(linha);
        }
      } else if (cell4.contains(linha5d2r) == true) {
        cell4.removeChild(linha5d2r);
      }

    } else if (numero == 6) {
      const cell0 = document.getElementById("celula0");
      const cell1 = document.getElementById("celula1");
      const cell2 = document.getElementById("celula2");
      const cell3 = document.getElementById("celula3");
      const cell4 = document.getElementById("celula4");
      const cell5 = document.getElementById("celula5");
      const cell6 = document.getElementById("celula6");
      const cell7 = document.getElementById("celula7");
      const cell8 = document.getElementById("celula8");
      const cell9 = document.getElementById("celula9");
      const cell10 = document.getElementById("celula10");
      const cell11 = document.getElementById("celula11");
      const cell12 = document.getElementById("celula12");
      const cell13 = document.getElementById("celula13");
      const cell14 = document.getElementById("celula14");
      const cell15 = document.getElementById("celula15");
      const cell16 = document.getElementById("celula16");
      const cell17 = document.getElementById("celula17");
      const cell18 = document.getElementById("celula18");
      const cell19 = document.getElementById("celula19");
      const cell20 = document.getElementById("celula20");
      const cell21 = document.getElementById("celula21");
      const cell22 = document.getElementById("celula22");
      const cell23 = document.getElementById("celula23");
      const cell24 = document.getElementById("celula24");
      const cell25 = document.getElementById("celula25");
      const cell26 = document.getElementById("celula26");
      const cell27 = document.getElementById("celula27");
      const cell28 = document.getElementById("celula28");
      const cell29 = document.getElementById("celula29");
      const cell30 = document.getElementById("celula30");
      const cell31 = document.getElementById("celula31");
      const cell32 = document.getElementById("celula32");
      const cell33 = document.getElementById("celula33");
      const cell34 = document.getElementById("celula34");
      const cell35 = document.getElementById("celula35");
      const linha6h1r = document.getElementById("linha6h1");
      const linha6v1r = document.getElementById("linha6v1");
      const linha6h2r = document.getElementById("linha6h2");
      const linha6v2r = document.getElementById("linha6v2");
      const linha6h3r = document.getElementById("linha6h3");
      const linha6v3r = document.getElementById("linha6v3");
      const linha6h4r = document.getElementById("linha6h4");
      const linha6v4r = document.getElementById("linha6v4");
      const linha6h5r = document.getElementById("linha6h5");
      const linha6v5r = document.getElementById("linha6v5");
      const linha6h6r = document.getElementById("linha6h6");
      const linha6v6r = document.getElementById("linha6v6");
      const linha6d1r = document.getElementById("linha6d1");
      const linha6d2r = document.getElementById("linha6d2");

      //row1-------------------------------------
      if (cell0.className.includes("cellselecionado") && cell1.className.includes("cellselecionado") && cell2.className.includes("cellselecionado") && cell3.className.includes("cellselecionado") && cell4.className.includes("cellselecionado") && cell5.className.includes("cellselecionado")) {
        if (cell0.contains(linha6h1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6h1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6h linhanormal";
          } else {
            linha.className = "linha6h linhamedo";
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha6h1r) == true) {
        cell0.removeChild(linha6h1r);
      }

      //col1-------------------------------------
      if (cell0.className.includes("cellselecionado") && cell6.className.includes("cellselecionado") && cell12.className.includes("cellselecionado") && cell18.className.includes("cellselecionado") && cell24.className.includes("cellselecionado") && cell30.className.includes("cellselecionado")) {
        if (cell0.contains(linha6v1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6v1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6v linhanormal";
          } else {
            linha.className = "linha6v linhamedo";
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha6v1r) == true) {
        cell0.removeChild(linha6v1r);
      }

      //row2-------------------------------------
      if (cell6.className.includes("cellselecionado") && cell7.className.includes("cellselecionado") && cell8.className.includes("cellselecionado") && cell9.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell11.className.includes("cellselecionado")) {
        if (cell6.contains(linha6h2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6h2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6h linhanormal";
          } else {
            linha.className = "linha6h linhamedo";
          }
          cell6.appendChild(linha);
        }
      } else if (cell6.contains(linha6h2r) == true) {
        cell6.removeChild(linha6h2r);
      }

      //col2-------------------------------------
      if (cell1.className.includes("cellselecionado") && cell7.className.includes("cellselecionado") && cell13.className.includes("cellselecionado") && cell19.className.includes("cellselecionado") && cell25.className.includes("cellselecionado") && cell31.className.includes("cellselecionado")) {
        if (cell1.contains(linha6v2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6v2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6v linhanormal";
          } else {
            linha.className = "linha6v linhamedo";
          }
          cell1.appendChild(linha);
        }
      } else if (cell1.contains(linha6v2r) == true) {
        cell1.removeChild(linha6v2r);
      }

      //row3-------------------------------------
      if (cell12.className.includes("cellselecionado") && cell13.className.includes("cellselecionado") && cell14.className.includes("cellselecionado") && cell15.className.includes("cellselecionado") && cell16.className.includes("cellselecionado") && cell17.className.includes("cellselecionado")) {
        if (cell12.contains(linha6h3r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6h3";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6h linhanormal";
          } else {
            linha.className = "linha6h linhamedo";
          }
          cell12.appendChild(linha);
        }
      } else if (cell12.contains(linha6h3r) == true) {
        cell12.removeChild(linha6h3r);
      }

      //col3-------------------------------------
      if (cell2.className.includes("cellselecionado") && cell8.className.includes("cellselecionado") && cell14.className.includes("cellselecionado") && cell20.className.includes("cellselecionado") && cell26.className.includes("cellselecionado") && cell32.className.includes("cellselecionado")) {
        if (cell2.contains(linha6v3r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6v3";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6v linhanormal";
          } else {
            linha.className = "linha6v linhamedo";
          }
          cell2.appendChild(linha);
        }
      } else if (cell2.contains(linha6v3r) == true) {
        cell2.removeChild(linha6v3r);
      }

      //row4-------------------------------------
      if (cell18.className.includes("cellselecionado") && cell19.className.includes("cellselecionado") && cell20.className.includes("cellselecionado") && cell21.className.includes("cellselecionado") && cell22.className.includes("cellselecionado") && cell23.className.includes("cellselecionado")) {
        if (cell18.contains(linha6h4r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6h4";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6h linhanormal";
          } else {
            linha.className = "linha6h linhamedo";
          }
          cell18.appendChild(linha);
        }
      } else if (cell18.contains(linha6h4r) == true) {
        cell18.removeChild(linha6h4r);
      }

      //col4-------------------------------------
      if (cell3.className.includes("cellselecionado") && cell9.className.includes("cellselecionado") && cell15.className.includes("cellselecionado") && cell21.className.includes("cellselecionado") && cell27.className.includes("cellselecionado") && cell33.className.includes("cellselecionado")) {
        if (cell3.contains(linha6v4r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6v4";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6v linhanormal";
          } else {
            linha.className = "linha6v linhamedo";
          }
          cell3.appendChild(linha);
        }
      } else if (cell3.contains(linha6v4r) == true) {
        cell3.removeChild(linha6v4r);
      }

      //row5-------------------------------------
      if (cell24.className.includes("cellselecionado") && cell25.className.includes("cellselecionado") && cell26.className.includes("cellselecionado") && cell27.className.includes("cellselecionado") && cell28.className.includes("cellselecionado") && cell29.className.includes("cellselecionado")) {
        if (cell24.contains(linha6h5r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6h5";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6h linhanormal";
          } else {
            linha.className = "linha6h linhamedo";
          }
          cell24.appendChild(linha);
        }
      } else if (cell24.contains(linha6h5r) == true) {
        cell24.removeChild(linha6h5r);
      }

      //col5-------------------------------------
      if (cell4.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell16.className.includes("cellselecionado") && cell22.className.includes("cellselecionado") && cell28.className.includes("cellselecionado") && cell34.className.includes("cellselecionado")) {
        if (cell4.contains(linha6v5r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6v5";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6v linhanormal";
          } else {
            linha.className = "linha6v linhamedo";
          }
          cell4.appendChild(linha);
        }
      } else if (cell4.contains(linha6v5r) == true) {
        cell4.removeChild(linha6v5r);
      }

      //row6-------------------------------------
      if (cell30.className.includes("cellselecionado") && cell31.className.includes("cellselecionado") && cell32.className.includes("cellselecionado") && cell33.className.includes("cellselecionado") && cell34.className.includes("cellselecionado") && cell35.className.includes("cellselecionado")) {
        if (cell30.contains(linha6h6r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6h6";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6h linhanormal";
          } else {
            linha.className = "linha6h linhamedo";
          }
          cell30.appendChild(linha);
        }
      } else if (cell30.contains(linha6h6r) == true) {
        cell30.removeChild(linha6h6r);
      }

      //col6-------------------------------------
      if (cell5.className.includes("cellselecionado") && cell11.className.includes("cellselecionado") && cell17.className.includes("cellselecionado") && cell23.className.includes("cellselecionado") && cell29.className.includes("cellselecionado") && cell35.className.includes("cellselecionado")) {
        if (cell5.contains(linha6v6r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6v6";
          linha.className = "linha6v linhanormal";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linha6v linhanormal";
          } else {
            linha.className = "linha6v linhamedo";
          }
          cell5.appendChild(linha);
        }
      } else if (cell5.contains(linha6v6r) == true) {
        cell5.removeChild(linha6v6r);
      }

      //diagonal1 ------------------------------

      if (cell0.className.includes("cellselecionado") && cell7.className.includes("cellselecionado") && cell14.className.includes("cellselecionado") && cell21.className.includes("cellselecionado") && cell28.className.includes("cellselecionado") && cell35.className.includes("cellselecionado")) {
        if (cell0.contains(linha6d1r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6d1";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linhanormal"
          } else {
            linha.className = "linhamedo"
          }
          cell0.appendChild(linha);
        }
      } else if (cell0.contains(linha6d1r) == true) {
        cell0.removeChild(linha6d1r);
      }

      //diagonal2 ------------------------------

      if (cell5.className.includes("cellselecionado") && cell10.className.includes("cellselecionado") && cell15.className.includes("cellselecionado") && cell20.className.includes("cellselecionado") && cell25.className.includes("cellselecionado") && cell30.className.includes("cellselecionado")) {
        if (cell5.contains(linha6d2r) == false) {
          const linha = document.createElement("div");
          linha.id = "linha6d2";
          if (document.getElementById('btnTemaChange').className == 'btnNormal') {
            linha.className = "linhanormal"
          } else {
            linha.className = "linhamedo"
          }
          cell5.appendChild(linha);
        }
      } else if (cell5.contains(linha6d2r) == true) {
        cell5.removeChild(linha6d2r);
      }

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
            if (celulasel.className == "celula cellselecionado" || celulasel.className == "celula cellselecionado linhaH") {
              celulasel.className = "celula"
            } else if (celulasel.className == "celula") {
              celulasel.className = "celula cellselecionado"
            }
            if (celulasel.className == "celulaMedo cellselecionadoMedo" || celulasel.className == "celulaMedo cellselecionadoMedo linhaH") {
              celulasel.className = "celulaMedo"
            } else if (celulasel.className == "celulaMedo") {
              celulasel.className = "celulaMedo cellselecionadoMedo"
            }
            checkLineBingo(4);
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
            checkLineBingo(5);
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
            checkLineBingo(6);
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
