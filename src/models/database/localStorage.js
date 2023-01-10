

function setItem (chave, valor) {
  localStorage.setItem(chave, valor);
};

function getItem (chave) {
  return localStorage.getItem(chave)
};

export {setItem, getItem};