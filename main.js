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
  safeCellsClicked=0
  safeCells=0
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
  }
  let difficulty= difficultyForCs()
  if(document.querySelector("#number-of-cells").value<10){
    document.querySelector("#number-of-cells").value=10
  }
  if(document.querySelector("#number-of-cells").value>200){
    document.querySelector("#number-of-cells").value=200
  }
  let colsAndRows= document.querySelector("#number-of-cells").value
  //creazione tabella con i numeri e le mine
  for(let i=0; i<colsAndRows; i++){
    let tableRowCs= document.createElement("tr")
    for(let j=0;j<colsAndRows;j++){
      let mapcell= document.createElement("td")
      mapcell.classList.add("cs-cell")
      mapcell.id= i+"-"+j+"index-cell"
      if(randomNumberForCs(difficulty)==0){
        mapcell.innerHTML= ""
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
        if(document.getElementById(id.slice(0,id.search("-cover"))).innerHTML!='<i class="fas fa-syringe"></i>'){
          safeCellsClicked+= noShowForCs(id)
        }else{
          youLostCs()
        }
        if(safeCellsClicked==safeCells){
          youWinCs()
        }
      })
      mapcellcover.addEventListener('contextmenu', function(e){
        e.preventDefault()
        if(this.innerHTML== ""){
          this.innerHTML= "<i class='fas fa-hospital'></i>"
        }else{
          this.innerHTML= ""
        }
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
  let arrayIdCs= [id.slice(0, id.search("-cover"))]
  document.getElementById(id).style.visibility= "hidden"
  let limit= 0
  for(id of arrayIdCs){
    limit+=1
    if(document.getElementById(id).innerHTML== ''){
      let rowIndex= parseInt(id.slice(0, id.search("-")))
      let colIndex= parseInt(id.slice((id.search("-")+1), id.search("index")))
      if(rowIndex>0 && document.getElementById((rowIndex-1)+"-"+colIndex+"index-cell-cover").style.visibility!= "hidden"){
        document.getElementById((rowIndex-1)+"-"+colIndex+"index-cell-cover").style.visibility= "hidden"
        arrayIdCs.push((rowIndex-1)+"-"+colIndex+"index-cell")
      }
      if(colIndex>0 && document.getElementById(rowIndex+"-"+(colIndex-1)+"index-cell-cover").style.visibility!= "hidden"){
        arrayIdCs.push(rowIndex+"-"+(colIndex-1)+"index-cell")
        document.getElementById(rowIndex+"-"+(colIndex-1)+"index-cell-cover").style.visibility= "hidden"
      }
      if(rowIndex<document.querySelector("#number-of-cells").value-1 && document.getElementById((rowIndex+1)+"-"+colIndex+"index-cell-cover").style.visibility!= "hidden"){
        arrayIdCs.push((rowIndex+1)+"-"+colIndex+"index-cell")
        document.getElementById((rowIndex+1)+"-"+colIndex+"index-cell-cover").style.visibility= "hidden"
      }
      if(colIndex<document.querySelector("#number-of-cells").value-1 && document.getElementById(rowIndex+"-"+(colIndex+1)+"index-cell-cover").style.visibility!= "hidden"){
        arrayIdCs.push(rowIndex+"-"+(colIndex+1)+"index-cell")
        document.getElementById(rowIndex+"-"+(colIndex+1)+"index-cell-cover").style.visibility= "hidden"
      }
    }
  }
  let cells= 0
  for(let i=0; i<arrayIdCs.length; i++){
    cells+=1
  }
  return cells
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
  if(campoSantoliLostTimes==1){
    youLostTimes.innerHTML= campoSantoliLostTimes + " volta"
  }
  else{
    youLostTimes.innerHTML= campoSantoliLostTimes + " volte"
  }
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
  if(campoSantoliWinTimes==1){
  youWinTimes.innerHTML= campoSantoliWinTimes + " volta"
  }
  else{
    youWinTimes.innerHTML= campoSantoliWinTimes + " volte"
  }
  youWinTimes.style.visibility= "visible"
}


//generazione numeri randomici
function randomNumberForCs(value){
  let n= 0
  switch(value){
    case "easy":
      n=Math.floor(Math.random()*(12-0))+ 0
      if(n<11){
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
      n=Math.floor(Math.random()*(6-0))+ 0
      if(n<5){
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
      if(document.getElementById(i+"-"+j+"index-cell").innerHTML ==""){ 
        
        let counter=0
        if(i<colsAndRows && document.getElementById((i+1)+"-"+j+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(j<colsAndRows && document.getElementById(i+"-"+(j+1)+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(i>0 && document.getElementById((i-1)+"-"+j+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(j>0 && document.getElementById(i+"-"+(j-1)+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(i<colsAndRows && j<colsAndRows && document.getElementById((i+1)+"-"+(j+1)+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(i<colsAndRows && j>0 && document.getElementById((i+1)+"-"+(j-1)+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(i>0 && j>0 && document.getElementById((i-1)+"-"+(j-1)+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        if(i>0 && j<colsAndRows && document.getElementById((i-1)+"-"+(j+1)+"index-cell").innerHTML=='<i class="fas fa-syringe"></i>'){
          counter+=1
        }
        switch (counter){
          case 1:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-user"></i>'
            break
          case 2:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-user-friends"></i>'
            break
          case 3:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-users"></i>'
            break
          case 4:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-car"></i>'
            break
          case 5:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-bus"></i>'
            break
          case 6:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-store"></i>'
            break
          case 7:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-building"></i>'
            break
          case 8:
            document.getElementById(i+"-"+j+"index-cell").innerHTML='<i class="fas fa-church"></i>'
            break
        }
      }
    }
  }
}

//finisce il codice di Luca Tabbia