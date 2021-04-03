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
let campoSantoliTbody= document.querySelector("#campo-santoli-tbody")
let campoSantoliTbodyCover= document.querySelector("#campo-santoli-tbody-cover")
let campoSantoliStart= document.querySelector("#send-creation-table")
let campoSantoliLost= document.querySelector("#cs-h2-lost")
let campoSantoliLostTimes= 0
let campoSantoliWinTimes= 0

//creazione delle tabelle sovrapposte
campoSantoliStart.addEventListener('click', function(e){
  e.preventDefault()
  campoSantoliTbody.innerHTML= ''
  campoSantoliTbodyCover.innerHTML= ''
  createTablesCs()
})

//funzione per la creazione di tabelle

function createTablesCs(){
  if(campoSantoliStart.innerHTML=="Riprova!"){
    campoSantoliLost.style.visibility= "hidden" 
    campoSantoliTbodyCover.style.visibility= "visible"
  }
  let colsAndRows= document.querySelector("#number-of-cells").value
  //creazione tabella con i numeri e le mine
  let rowIndex=0
  for(let i=0; i<colsAndRows; i++){
    let tableRowCs= document.createElement("tr")
    let cellindex=0
    for(let j=0;j<colsAndRows;j++){
      let mapcell= document.createElement("td")
      mapcell.classList.add("cs-cell")
      mapcell.id= rowIndex+""+cellindex+"index-cell"
      if(randomNumberForCs()==0){
        mapcell.innerHTML= "0"
      }else {
        mapcell.innerHTML= "<i class='fas fa-syringe'></i>"
      }
      tableRowCs.appendChild(mapcell)
      cellindex++
    }
    campoSantoliTbody.appendChild(tableRowCs)
    rowIndex++
  }
  //creazione tabella che copre la prima
  let rowIndexCover=0
  for(let i=0; i<colsAndRows; i++){
    let tableRowCscover= document.createElement("tr")
    let cellIndex=0
    for(let j=0;j<colsAndRows;j++){
      let mapcellcover= document.createElement("td")
      mapcellcover.addEventListener('click', noShow, false)
      mapcellcover.addEventListener('contextmenu', function(e){
        e.preventDefault()
        this.style.backgroundColor= "red"
      })
      mapcellcover.classList.add("cs-cell-cover")
      mapcellcover.id=rowIndexCover+""+cellIndex+"index-cell-cover"
      tableRowCscover.appendChild(mapcellcover)
      cellIndex++
    }
    campoSantoliTbodyCover.appendChild(tableRowCscover)
    rowIndexCover++
  }
  //gestione dei valori randomici
  getRealNumberForCs(0,0)

}

//funzione per nascondere le celle di copertura
function noShow(){
  this.style.visibility= "hidden"
  let colsAndRows= document.querySelector("#number-of-cells").value -1
  let id= this.id
  let idNumberLimit= id.search("index")
  let idNumber= id.slice(0, idNumberLimit)
  let rowIndex= parseInt(idNumber.slice(0, idNumber.length/2))
  let colIndex= parseInt(idNumber.slice(idNumber.length/2, idNumber.length))
  if(isNaN(parseInt(document.getElementById(rowIndex+""+colIndex+"index-cell").innerHTML))){
    youLostCs()
  }
  if(parseInt(document.getElementById(rowIndex+""+colIndex+"index-cell").innerHTML)== 0){
    if(rowIndex>0){
      document.getElementById((rowIndex-1)+""+colIndex+"index-cell-cover").click();
    }
    if(colIndex>0){
      document.getElementById(rowIndex+""+(colIndex-1)+"index-cell-cover").click();
    }
    if(rowIndex<colsAndRows){
      document.getElementById((rowIndex+1)+""+colIndex+"index-cell-cover").click();
    }
    if(colIndex<colsAndRows){
      document.getElementById(rowIndex+""+(colIndex+1)+"index-cell-cover").click();
    }
  }
}

//funzione che gestisce il fallimento
function youLostCs(){
  campoSantoliTbodyCover.style.visibility= "hidden"
  campoSantoliStart.innerHTML= "Riprova!"
  campoSantoliLost.style.visibility= "visible"
  let youLostLabel= document.getElementById("label-volte-perse-cs")
  youLostLabel.style.visibility= "visible"
  let youLostTimes= document.getElementById("volte-perse-cs")
  campoSantoliLostTimes+= 1
  youLostTimes.innerHTML= campoSantoliLostTimes + " volte"
  youLostTimes.style.visibility= "visible"
}


//generazione numeri randomici
function randomNumberForCs(){
  let n=Math.floor(Math.random()*(10-0))+ 0
  if(n<9){
    return 0
  }else {
    return 10
  }
}

//funzione per calcolare vicinanza alla cura
function getRealNumberForCs(riga, colonna){
  let colsAndRows= document.querySelector("#number-of-cells").value -1

  if(parseInt(document.getElementById(riga+""+colonna+"index-cell").innerHTML) ==0){ 
    let counter=0
    if(riga<colsAndRows && isNaN(parseInt(document.getElementById((riga+1)+""+colonna+"index-cell").innerHTML))){
      counter+=1
      document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(colonna<colsAndRows && isNaN(parseInt(document.getElementById(riga+""+(colonna+1)+"index-cell").innerHTML))){
      counter+=1
      document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(riga>0 && isNaN(parseInt(document.getElementById((riga-1)+""+colonna+"index-cell").innerHTML))){
      counter+=1
      document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(colonna>0 && isNaN(parseInt(document.getElementById(riga+""+(colonna-1)+"index-cell").innerHTML))){
      counter+=1
      document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(riga<colsAndRows && colonna<colsAndRows && isNaN(parseInt(document.getElementById((riga+1)+""+(colonna+1)+"index-cell").innerHTML))){
      counter+=1
      document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(riga<colsAndRows && colonna>0 && isNaN((document.getElementById((riga+1)+""+(colonna-1)+"index-cell").innerHTML))){
        counter+=1
        document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(riga>0 && colonna>0 && isNaN((document.getElementById((riga-1)+""+(colonna-1)+"index-cell").innerHTML))){
        counter+=1
        document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
    if(riga>0 && colonna<colsAndRows && isNaN(parseInt(document.getElementById((riga-1)+""+(colonna+1)+"index-cell").innerHTML))){
      counter+=1
      document.getElementById(riga+""+colonna+"index-cell").innerHTML= counter
    }
  }
  if(colonna<colsAndRows){
    getRealNumberForCs(riga, colonna+1)
  }
  if(riga<colsAndRows){
    getRealNumberForCs(riga+1, colonna)
  }
}
