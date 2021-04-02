let pageLinks = document.querySelectorAll('.page-link')
let pages = document.querySelectorAll('.page')

for (let pageLink of pageLinks) {
  pageLink.addEventListener('click', function (e) {
    for (let page of pages) {
      page.style.display = 'none'
    }
    let pageName = e.target.dataset.page
    let nextPage = document.getElementById(pageName)
    if (nextPage) {
      nextPage.style.display = 'block'
    }
  })
}

/* Nouri scripts started here */
function nouriScripts() {
  const input = document.querySelector('#highlightInput');
  const mainParagraph = document.querySelector("#mainSearchedParagraph");
  const checkBox = document.querySelector('#highlightCheckbox');
  const repeatBox = document.querySelector('p.repeatText');
  const textRepeated = document.querySelector('#textRepeatedTime');
  const textColor = document.querySelector('#textHighlightColor');
  const mainText = mainParagraph.textContent;
  const specialCharacters = ["+", "*", "?", "^", "$", "\\", ".", "[", "]", "{", "}", "(", ")", "|", "/"];
  const highlightColors = {
    '0': {
      'color': '',
      'hex': ''
    },
    '1': {
      'color': 'highlightBlue',
      'hex': '#007BFF'
    },
    '2': {
      'color': 'highlightRed',
      'hex': '#DC3545'
    },
    '3': {
      'color': 'highlightOrange',
      'hex': '#FD7E14'
    },
    '4': {
      'color': 'highlightGreen',
      'hex': '#28A745'
    },
    '5': {
      'color': 'highlightCyan',
      'hex': '#17A2b8'
    },
    '6': {
      'color': 'highlightYellow',
      'hex': '#FFC107'
    },
    '7': {
      'color': 'highlightPink',
      'hex': '#E83E8C'
    },
    '8': {
      'color': 'highlightIndigo',
      'hex': '#6610F2'
    },
    '9': {
      'color': 'highlightTeal',
      'hex': '#20C997'
    },
    'more': {
      'color': 'highlightMore',
      'hex': '#7FFFd4'
    }
  }
  let delayTime;

  // Find special characters
  function findSpecialCharacters(text) {
    text = text.split('').map(element => {
      element = (specialCharacters.includes(element)) ? '\\' + element : element;
      return element;
    })
    return text.join('');
  }
  
  // Caculate how many times the text was repeated
  function repeatedTime(text) {
    let repeatedTime = 0;
    let index = -1;
    do {
      index = mainText.toLowerCase().indexOf(text.toLowerCase(), ++index);
      if (index !== -1) repeatedTime++;
    } while (index >= 0);
    return repeatedTime;
  }

  // Highlight the searched text
  function highlight(text) {
    if (text === '') {
      mainParagraph.textContent = mainText;
      repeatBox.hidden = true;
      return;
    }
    let textRepeatedtimes = repeatedTime(text);
    text = findSpecialCharacters(text);
    const pattern = new RegExp(text, 'gi');
    let colorForRepeatedText = highlightColors[textRepeatedtimes];
    let color = (colorForRepeatedText) ? colorForRepeatedText['color'] : highlightColors['more']['color'];
    let hex = (colorForRepeatedText) ? colorForRepeatedText['hex'] : highlightColors['more']['hex'];
    let newText = mainText.replace(pattern, `<span class="${color} rounded highlightPadding text-light">$&</span>`);
    mainParagraph.innerHTML = newText;
    textRepeated.textContent = textRepeatedtimes;
    textColor.innerHTML = `<span class="${color} p-1 rounded text-light">${hex}</span>`;
    repeatBox.hidden = false;
  }

  function delay(callback) {
    let timer = 0;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, delayTime);
    };
  }

  // Event listeners
  checkBox.addEventListener('click', event => {
    delayTime = (event.target.checked) ? 2000 : 0;
  });
  input.addEventListener('keyup', delay(event => {
    highlight(event.target.value.trim());
  }));
}

nouriScripts();
/* Nouri scripts finished here */



/* INIZIA CODICE JS DI DAVIDE ANDREANA */

/* FINISCE CODICE JS DI DAVIDE ANDREANA */

//Inizia il codice di Luca Tabbia
let campoSantoliTbody= document.querySelector("#campo-santoli-tbody");
let campoSantoliTbodyCover= document.querySelector("#campo-santoli-tbody-cover")
let campoSantoliStart= document.querySelector("#send-creation-table");

//creazione delle tabelle sovrapposte
campoSantoliStart.addEventListener('click', function (e) {
  e.preventDefault()
  let colsAndRows= document.querySelector("#number-of-cells").value
  //creazione tabella con i numeri e le mine
  let indiceRiga=0
  for(let i=0; i<colsAndRows; i++){
    let tableRowCs= document.createElement("tr")
    let indiceCella=0
    for(let j=0;j<colsAndRows;j++){
      let mapcell= document.createElement("td")
      mapcell.classList.add("cs-cell")
      mapcell.id= indiceRiga+""+indiceCella+"index-cell"
      mapcell.appendChild(document.createTextNode('1'))
      tableRowCs.appendChild(mapcell)
    }
    campoSantoliTbody.appendChild(tableRowCs)
  }
  //creazione tabella che copre la prima
  let indiceRigaCover=0
  for(let i=0; i<colsAndRows; i++){
    let tableRowCscover= document.createElement("tr")
    let indiceCella=0
    for(let j=0;j<colsAndRows;j++){
      let mapcellcover= document.createElement("td")
      mapcellcover.addEventListener('click', function(no_show){
        this.style.backgroundColor= "transparent"
      })
      mapcellcover.classList.add("cs-cell-cover")
      mapcellcover.id=indiceRigaCover+""+indiceCella+"index-cell-cover"
      tableRowCscover.appendChild(mapcellcover)
      indiceCella++
    }
    indiceRiga++
    campoSantoliTbodyCover.appendChild(tableRowCscover)
  }

})

//
function showNone(no_show){
  no_show.target.style.display= "none"
}

