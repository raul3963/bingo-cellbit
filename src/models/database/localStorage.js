
let data = {"bingoAtual":"","bingoSalvo":{},"temaSalvo":{},"temaAtual":{bgColor: "#222222", bgHeaderColor: "#3a3a3a", txtColor: "#fff", bgObjColor: "#535353", borderObjColor: "#000",bgObjSelColor: "#c2af00",borderObjSelColor: "#bdbd00"}};

function addData(onde, nome, texto){
  let datas = getData("BingoCellbit")
  if(onde === "bingoAtual"){
    datas.bingoAtual = texto;
  }
  if(onde === "bingoSalvo"){
    datas.bingoSalvo[nome] = String(texto);
  }
  if(onde === "temaSalvo"){
    datas.temaSalvo[nome] = JSON.stringify(texto);
  }
  if(onde === "temaAtual"){
    datas.temaAtual = texto;
  }
  data = datas
  setData("BingoCellbit", JSON.stringify(datas))
}

function setData (chave, valor) {
  localStorage.setItem(chave, valor);
};

function getData (chave) {
  if(String(localStorage.getItem(chave)).includes("bingoSalvo"))
  {
    if (localStorage.getItem(chave) !== null){
      return JSON.parse(localStorage.getItem(chave));
    } else {
      return JSON.parse(JSON.stringify(data));
    }
  }else{
    clearData("BingoCellbit");
    return JSON.parse(JSON.stringify(data));
  }
};

function deleteData (nome, id) {
  let datas = getData("BingoCellbit");
  if(nome === "tema"){
    delete datas.temaSalvo[id]
  }else if(nome === "bingo"){
    delete datas.bingoSalvo[id];
  }
  setData("BingoCellbit", JSON.stringify(datas))
}

function clearData (chave) {
  localStorage.removeItem(chave)
}

export {setData, getData, addData, clearData, deleteData};
