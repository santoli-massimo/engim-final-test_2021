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
let campoSantoliStatement= document.querySelector("#cs-h2-statement")
let campoSantoliLostTimes= 0
let campoSantoliWinTimes= 0
let safeCells= 0
let safeCellsClicked=0

//creazione delle tabelle sovrapposte
campoSantoliStart.addEventListener('click', function(e){
  e.preventDefault()
  campoSantoliTbody.innerHTML= ''
  campoSantoliTbodyCover.innerHTML= ''
  //creazione tabelle
  createTablesCs()
  //gestione dei valori randomici
  getRealNumberForCs()
})

//funzione per la creazione di tabelle

function createTablesCs(){
  if(campoSantoliStart.innerHTML=="Riprova!"){
    campoSantoliStatement.style.visibility= "hidden" 
    campoSantoliTbodyCover.style.visibility= "visible"
    safeCellsClicked=0
    safeCells=0
  }
  let difficulty= difficultyForCs()
  let colsAndRows= document.querySelector("#number-of-cells").value
  //creazione tabella con i numeri e le mine
  for(let i=0; i<colsAndRows; i++){
    let tableRowCs= document.createElement("tr")
    for(let j=0;j<colsAndRows;j++){
      let mapcell= document.createElement("td")
      mapcell.classList.add("cs-cell")
      mapcell.id= i+"-"+j+"index-cell"
      if(randomNumberForCs(difficulty)==0){
        mapcell.innerHTML= "0"
        safeCells +=1
      }else {
        mapcell.innerHTML= "<i class='fas fa-syringe'></i>"
      }
      tableRowCs.appendChild(mapcell)
    }
    campoSantoliTbody.appendChild(tableRowCs)
  }
  //creazione tabella che copre la prima
  
  for(let i=0; i<colsAndRows; i++){
    let tableRowCscover= document.createElement("tr")
    for(let j=0;j<colsAndRows;j++){
      let mapcellcover= document.createElement("td")
      mapcellcover.addEventListener('click', function(){
        let id= this.id
        if(noShowForCs(id)==0){
          youLostCs()
          safeCellsClicked=0
        }
        if(noShowForCs(id)==1){
          safeCellsClicked+=1
        }
        if(safeCellsClicked==safeCells){
          youWinCs()
        }
      })
      mapcellcover.addEventListener('contextmenu', function(e){
        e.preventDefault()
        this.style.backgroundColor= "red"
      })
      mapcellcover.classList.add("cs-cell-cover")
      mapcellcover.id=i+"-"+j+"index-cell-cover"
      tableRowCscover.appendChild(mapcellcover)
    }
    campoSantoliTbodyCover.appendChild(tableRowCscover)
  }
}


//funzione per difficoltà
function difficultyForCs(){
  if(document.querySelector("#easy-difficulty-cs").checked){
    return document.querySelector("#easy-difficulty-cs").value
  }
  if(document.querySelector("#medium-difficulty-cs").checked){
    return document.querySelector("#medium-difficulty-cs").value
  }
  if(document.querySelector("#hard-difficulty-cs").checked){
    return document.querySelector("#hard-difficulty-cs").value
  }
}


//funzione per nascondere le celle di copertura
function noShowForCs(id){
  document.getElementById(id).style.visibility= "hidden"
  let rowIndex= parseInt(id.slice(0, id.search("-")))
  let colIndex= parseInt(id.slice((id.search("-")+1), id.search("index")))
  
  if(isNaN(parseInt(document.getElementById(rowIndex+"-"+colIndex+"index-cell").innerHTML))){
    return 0
  }
  else{
    return 1
  }
  /*if(parseInt(document.getElementById(rowIndex+"-"+colIndex+"index-cell").innerHTML)== 0){
    if(rowIndex>0){
      setTimeout(function(){
        document.getElementById((rowIndex-1)+"-"+colIndex+"index-cell-cover").click();
      })
    }
    if(colIndex>0){
      setTimeout(function(){
        document.getElementById(rowIndex+"-"+(colIndex-1)+"index-cell-cover").click();
      })
    }
    if(rowIndex<document.querySelector("#number-of-cells").value-1){
      setTimeout(function(){
        document.getElementById((rowIndex+1)+"-"+colIndex+"index-cell-cover").click();
      })
    }
    if(colIndex<document.querySelector("#number-of-cells").value-1){
      setTimeout(function(){
        document.getElementById(rowIndex+"-"+(colIndex+1)+"index-cell-cover").click();
      })
    }
  }*/
}



//funzione che gestisce il fallimento
function youLostCs(){
  campoSantoliTbodyCover.style.visibility= "hidden"
  campoSantoliStart.innerHTML= "Riprova!"
  campoSantoliStatement.innerHTML= "Hai perso!"
  campoSantoliStatement.style.color= "red"
  campoSantoliStatement.style.visibility= "visible"
  let youLostLabel= document.getElementById("label-times-lost-cs")
  youLostLabel.style.visibility= "visible"
  let youLostTimes= document.getElementById("times-lost-cs")
  campoSantoliLostTimes+= 1
  youLostTimes.innerHTML= campoSantoliLostTimes + " volte"
  youLostTimes.style.visibility= "visible"
}


function youWinCs(){
  campoSantoliTbodyCover.style.visibility= "hidden"
  campoSantoliStart.innerHTML= "Riprova!"
  campoSantoliStatement.innerHTML= "Hai vinto!"
  campoSantoliStatement.style.color= "limegreen"
  campoSantoliStatement.style.visibility= "visible"
  let youWinLabel= document.getElementById("label-times-win-cs")
  youWinLabel.style.visibility= "visible"
  let youWinTimes= document.getElementById("times-win-cs")
  campoSantoliWinTimes+= 1
  youWinTimes.innerHTML= campoSantoliWinTimes + " volte"
  youWinTimes.style.visibility= "visible"
}


//generazione numeri randomici
function randomNumberForCs(value){
  let n= 0
  switch(value){
    case "easy":
      n=Math.floor(Math.random()*(11-0))+ 0
      if(n<10){
        return 0
      }else {
        return 10
      }
    case "medium":
      n=Math.floor(Math.random()*(9-0))+ 0
      if(n<8){
        return 0
      }else {
        return 10
      }
    case "hard":
      n=Math.floor(Math.random()*(7-0))+ 0
      if(n<6){
        return 0
      }else {
        return 10
      }
    default:
      console.log("errore")
      break
  }
}


//funzione per calcolare vicinanza alla cura
function getRealNumberForCs(){
  let colsAndRows= document.querySelector("#number-of-cells").value -1
  for(let i=0; i<=colsAndRows; i++){
    for(let j=0; j<=colsAndRows; j++){
      if(parseInt(document.getElementById(i+"-"+j+"index-cell").innerHTML) ==0){ 
        
        let counter=0
        if(i<colsAndRows && isNaN(parseInt(document.getElementById((i+1)+"-"+j+"index-cell").innerHTML))){
          counter+=1
          document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(j<colsAndRows && isNaN(parseInt(document.getElementById(i+"-"+(j+1)+"index-cell").innerHTML))){
          counter+=1
          document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(i>0 && isNaN(parseInt(document.getElementById((i-1)+"-"+j+"index-cell").innerHTML))){
          counter+=1
          document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(j>0 && isNaN(parseInt(document.getElementById(i+"-"+(j-1)+"index-cell").innerHTML))){
          counter+=1
          document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(i<colsAndRows && j<colsAndRows && isNaN(parseInt(document.getElementById((i+1)+"-"+(j+1)+"index-cell").innerHTML))){
          counter+=1
          document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(i<colsAndRows && j>0 && isNaN((document.getElementById((i+1)+"-"+(j-1)+"index-cell").innerHTML))){
            counter+=1
            document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(i>0 && j>0 && isNaN((document.getElementById((i-1)+"-"+(j-1)+"index-cell").innerHTML))){
            counter+=1
            document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
        if(i>0 && j<colsAndRows && isNaN(parseInt(document.getElementById((i-1)+"-"+(j+1)+"index-cell").innerHTML))){
          counter+=1
          document.getElementById(i+"-"+j+"index-cell").innerHTML= counter
        }
      }
    }
  }
}