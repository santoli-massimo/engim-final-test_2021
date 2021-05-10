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


let campoSantoliTbody = document.querySelector("#campo-santoli-tbody")
let campoSantoliTbodyCover = document.querySelector("#campo-santoli-tbody-cover")
let campoSantoliStart = document.querySelector("#send-creation-table")
let campoSantoliStatement = document.querySelector("#cs-h2-statement")
let campoSantoliLostTimes = 0
let campoSantoliWinTimes = 0
let safeCells = 0
let safeCellsClicked = 0

//creazione delle tabelle sovrapposte
campoSantoliStart.addEventListener('click', function (e) {
  e.preventDefault()
  campoSantoliTbody.innerHTML = ''
  campoSantoliTbodyCover.innerHTML = ''
  safeCellsClicked = 0
  safeCells = 0
  //creazione tabelle
  createTablesCs()
  //gestione dei valori randomici
  getRealNumberForCs()
})

//funzione per la creazione di tabelle

function createTablesCs() {
  if (campoSantoliStart.innerHTML == "Riprova!") {
    campoSantoliStatement.style.visibility = "hidden"
    campoSantoliTbodyCover.style.visibility = "visible"
  }
  let difficulty = difficultyForCs()
  if (document.querySelector("#number-of-cells").value < 10) {
    document.querySelector("#number-of-cells").value = 10
  }
  if (document.querySelector("#number-of-cells").value > 200) {
    document.querySelector("#number-of-cells").value = 200
  }
  let colsAndRows = document.querySelector("#number-of-cells").value
  //creazione tabella con i numeri e le mine
  for (let i = 0; i < colsAndRows; i++) {
    let tableRowCs = document.createElement("tr")
    for (let j = 0; j < colsAndRows; j++) {
      let mapcell = document.createElement("td")
      mapcell.classList.add("cs-cell")
      mapcell.id = i + "-" + j + "index-cell"
      if (randomNumberForCs(difficulty) == 0) {
        mapcell.innerHTML = ""
        safeCells += 1
      } else {
        mapcell.innerHTML = "<i class='fas fa-syringe'></i>"
      }
      tableRowCs.appendChild(mapcell)
    }
    campoSantoliTbody.appendChild(tableRowCs)
  }
  //creazione tabella che copre la prima

  for (let i = 0; i < colsAndRows; i++) {
    let tableRowCscover = document.createElement("tr")
    for (let j = 0; j < colsAndRows; j++) {
      let mapcellcover = document.createElement("td")
      mapcellcover.addEventListener('click', function () {
        let id = this.id
        if (document.getElementById(id.slice(0, id.search("-cover"))).innerHTML != '<i class="fas fa-syringe"></i>') {
          safeCellsClicked += noShowForCs(id)
        } else {
          youLostCs()
        }
        if (safeCellsClicked == safeCells) {
          youWinCs()
        }
      })
      mapcellcover.addEventListener('contextmenu', function (e) {
        e.preventDefault()
        if (this.innerHTML == "") {
          this.innerHTML = "<i class='fas fa-hospital'></i>"
        } else {
          this.innerHTML = ""
        }
      })
      mapcellcover.classList.add("cs-cell-cover")
      mapcellcover.id = i + "-" + j + "index-cell-cover"
      tableRowCscover.appendChild(mapcellcover)
    }
    campoSantoliTbodyCover.appendChild(tableRowCscover)
  }
}


//funzione per difficoltà
function difficultyForCs() {
  if (document.querySelector("#easy-difficulty-cs").checked) {
    return document.querySelector("#easy-difficulty-cs").value
  }
  if (document.querySelector("#medium-difficulty-cs").checked) {
    return document.querySelector("#medium-difficulty-cs").value
  }
  if (document.querySelector("#hard-difficulty-cs").checked) {
    return document.querySelector("#hard-difficulty-cs").value
  }
}


//funzione per nascondere le celle di copertura
function noShowForCs(id) {
  let arrayIdCs = [id.slice(0, id.search("-cover"))]
  document.getElementById(id).style.visibility = "hidden"
  for (id of arrayIdCs) {
    if (document.getElementById(id).innerHTML == '') {
      let rowIndex = parseInt(id.slice(0, id.search("-")))
      let colIndex = parseInt(id.slice((id.search("-") + 1), id.search("index")))
      if (rowIndex > 0 && document.getElementById((rowIndex - 1) + "-" + colIndex + "index-cell-cover").style.visibility != "hidden") {
        document.getElementById((rowIndex - 1) + "-" + colIndex + "index-cell-cover").style.visibility = "hidden"
        arrayIdCs.push((rowIndex - 1) + "-" + colIndex + "index-cell")
      }
      if (colIndex > 0 && document.getElementById(rowIndex + "-" + (colIndex - 1) + "index-cell-cover").style.visibility != "hidden") {
        arrayIdCs.push(rowIndex + "-" + (colIndex - 1) + "index-cell")
        document.getElementById(rowIndex + "-" + (colIndex - 1) + "index-cell-cover").style.visibility = "hidden"
      }
      if (rowIndex < document.querySelector("#number-of-cells").value - 1 && document.getElementById((rowIndex + 1) + "-" + colIndex + "index-cell-cover").style.visibility != "hidden") {
        arrayIdCs.push((rowIndex + 1) + "-" + colIndex + "index-cell")
        document.getElementById((rowIndex + 1) + "-" + colIndex + "index-cell-cover").style.visibility = "hidden"
      }
      if (colIndex < document.querySelector("#number-of-cells").value - 1 && document.getElementById(rowIndex + "-" + (colIndex + 1) + "index-cell-cover").style.visibility != "hidden") {
        arrayIdCs.push(rowIndex + "-" + (colIndex + 1) + "index-cell")
        document.getElementById(rowIndex + "-" + (colIndex + 1) + "index-cell-cover").style.visibility = "hidden"
      }
    }
  }
  let cells = 0
  for (let i = 0; i < arrayIdCs.length; i++) {
    cells += 1
  }
  return cells
}



//funzione che gestisce il fallimento
function youLostCs() {
  campoSantoliTbodyCover.style.visibility = "hidden"
  campoSantoliStart.innerHTML = "Riprova!"
  campoSantoliStatement.innerHTML = "Hai perso!"
  campoSantoliStatement.style.color = "red"
  campoSantoliStatement.style.visibility = "visible"
  let youLostLabel = document.getElementById("label-times-lost-cs")
  youLostLabel.style.visibility = "visible"
  let youLostTimes = document.getElementById("times-lost-cs")
  campoSantoliLostTimes += 1
  if (campoSantoliLostTimes == 1) {
    youLostTimes.innerHTML = campoSantoliLostTimes + " volta"
  }
  else {
    youLostTimes.innerHTML = campoSantoliLostTimes + " volte"
  }
  youLostTimes.style.visibility = "visible"
}


function youWinCs() {
  campoSantoliTbodyCover.style.visibility = "hidden"
  campoSantoliStart.innerHTML = "Riprova!"
  campoSantoliStatement.innerHTML = "Hai vinto!"
  campoSantoliStatement.style.color = "limegreen"
  campoSantoliStatement.style.visibility = "visible"
  let youWinLabel = document.getElementById("label-times-win-cs")
  youWinLabel.style.visibility = "visible"
  let youWinTimes = document.getElementById("times-win-cs")
  campoSantoliWinTimes += 1
  if (campoSantoliWinTimes == 1) {
    youWinTimes.innerHTML = campoSantoliWinTimes + " volta"
  }
  else {
    youWinTimes.innerHTML = campoSantoliWinTimes + " volte"
  }
  youWinTimes.style.visibility = "visible"
}


//generazione numeri randomici
function randomNumberForCs(value) {
  let n = 0
  switch (value) {
    case "easy":
      n = Math.floor(Math.random() * (12 - 0)) + 0
      if (n < 11) {
        return 0
      } else {
        return 10
      }
    case "medium":
      n = Math.floor(Math.random() * (9 - 0)) + 0
      if (n < 8) {
        return 0
      } else {
        return 10
      }
    case "hard":
      n = Math.floor(Math.random() * (6 - 0)) + 0
      if (n < 5) {
        return 0
      } else {
        return 10
      }
    default:
      console.log("errore")
      break
  }
}


//funzione per calcolare vicinanza alla cura
function getRealNumberForCs() {
  let colsAndRows = document.querySelector("#number-of-cells").value - 1
  for (let i = 0; i <= colsAndRows; i++) {
    for (let j = 0; j <= colsAndRows; j++) {
      if (document.getElementById(i + "-" + j + "index-cell").innerHTML == "") {

        let counter = 0
        if (i < colsAndRows && document.getElementById((i + 1) + "-" + j + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (j < colsAndRows && document.getElementById(i + "-" + (j + 1) + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (i > 0 && document.getElementById((i - 1) + "-" + j + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (j > 0 && document.getElementById(i + "-" + (j - 1) + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (i < colsAndRows && j < colsAndRows && document.getElementById((i + 1) + "-" + (j + 1) + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (i < colsAndRows && j > 0 && document.getElementById((i + 1) + "-" + (j - 1) + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (i > 0 && j > 0 && document.getElementById((i - 1) + "-" + (j - 1) + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        if (i > 0 && j < colsAndRows && document.getElementById((i - 1) + "-" + (j + 1) + "index-cell").innerHTML == '<i class="fas fa-syringe"></i>') {
          counter += 1
        }
        switch (counter) {
          case 1:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-user"></i>'
            break
          case 2:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-user-friends"></i>'
            break
          case 3:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-users"></i>'
            break
          case 4:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-car"></i>'
            break
          case 5:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-bus"></i>'
            break
          case 6:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-store"></i>'
            break
          case 7:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-building"></i>'
            break
          case 8:
            document.getElementById(i + "-" + j + "index-cell").innerHTML = '<i class="fas fa-church"></i>'
            break
        }
      }
    }
  }
}

//finisce il codice di Luca Tabbia


// Stefano 

var sdsAddress;

/* Al caricamento della finestra viene caricato un JSON e salvato in una variabile locale. Il JSON contiene dettagli su tutte le città italiane */
window.addEventListener("load", function () {
  fetch("https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json")
    .then(res => res.json())
    .then(data => {
      sdsAddress = JSON.parse(JSON.stringify(data))
      document.getElementById("sds-first").remove();
    }).catch(err => {
      console.error('Error: ', err);
    });

});

// Al click il pulsante esegue la funzione adsAddI
document.getElementById("sds-add-i").addEventListener("click", function () { sdsAddI(event) });

// Crea un modal contenente un form con un pulsante e un elemento select  
function sdsAddI() {
  let cit = document.createElement("select");
  cit.setAttribute("name", "citta");
  let opt = document.createElement("option");
  opt.setAttribute("disabled", "disabled");
  opt.setAttribute("selected", "selected");
  opt.append("Selezionare una città");

  cit.append(opt);

  // Quando viene selezionata un'opzione dell'elemento select viene eseguita la funzione sdsPopulateForm
  cit.addEventListener("input", function () { sdsPopulateForm(event) });
  let bg = document.createElement("div");
  bg.className = "sds-modal-bg";
  let con = document.createElement("div");
  con.className = "sds-modal-content";
  let form = document.createElement("form");
  form.className = "sds-form";
  form.id = "ffform"

  // Il pulsante del form esegue la funzione sdsAddAddress
  form.addEventListener('submit', function () { sdsAddAddress(event) });
  bg.append(con);
  con.append(form);
  form.append(cit);
  let div = document.createElement("div");
  div.className = "sds-flex-column";

  // Per ogni città del JSON viene creata un'opzione nell'elemento select
  for (let citta of sdsAddress) {
    let c = document.createElement("option");
    c.setAttribute("value", citta.nome);
    c.append(citta.nome);
    cit.append(c);
  }
  cit.after(div);
  document.getElementById("sds-modal").append(bg);
}


/*
Vengono aggiunti elementi al form generato con sdsAddI. I campi Via, Numero civico e Nome della via sono sa compilare mentre CAP e città sono pre-compilati con le informazioni prese dal JSON in base all'opzione selezionata dall'utente. 
*/
function sdsPopulateForm(event) {
  let div = event.target.nextElementSibling;
  div.innerHTML = "";
  for (let citta of sdsAddress) {
    if (citta.nome == event.target.value) {
      let via = document.createElement("input");
      via.setAttribute("type", "text");
      via.setAttribute("placeholder", "Via, Piazza, Corso...");
      via.setAttribute("name", "tipovia");
      via.setAttribute("required", "required");
      div.append(via);
      let nVia = document.createElement("input");
      nVia.setAttribute("type", "text");
      nVia.setAttribute("placeholder", "Nome della via");
      nVia.setAttribute("name", "nomevia");
      nVia.setAttribute("required", "required");
      div.append(nVia);
      let nC = document.createElement("input");
      nC.setAttribute("type", "number");
      nC.setAttribute("placeholder", "Numero Civico");
      nC.setAttribute("name", "ncivico");
      nC.setAttribute("required", "required");
      div.append(nC);
      let prov = document.createElement("input");
      prov.setAttribute("type", "text");
      prov.setAttribute("value", citta.provincia["nome"]);
      prov.setAttribute("readonly", "true");
      prov.setAttribute("name", "provincia");
      div.append(prov);
      let cap = document.createElement("input");
      cap.setAttribute("type", "number");
      cap.setAttribute("value", citta.cap);
      cap.setAttribute("readonly", "true");
      cap.setAttribute("name", "cap");
      div.append(cap);
      let flex = document.createElement("div");
      flex.className = "sds-flex-row";
      let add = document.createElement("input");
      add.setAttribute("type", "submit");
      add.setAttribute("value", "Aggiungi");
      flex.append(add);
      let res = document.createElement("input");
      res.setAttribute("type", "reset");
      res.setAttribute("value", "Reset");
      flex.append(res);
      div.append(flex);
    }
  }
};

/* 
Trasferisce i dati dal form del modal in un box apposito creato nella pagina principale. 
Il box presenta due opzioni per aggiungere e rimuovere l'indirizzo in esso contenuto. 
*/
function sdsAddAddress(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  let tipovia = formData.get("tipovia");
  let nomevia = formData.get("nomevia");
  let ncivico = formData.get("ncivico");
  let formString1 = tipovia.trim() + " " + nomevia.trim() + " " + ncivico.trim();
  let formString2 = formData.get("citta") + " " + formData.get("cap") + " " + formData.get("provincia");
  let div = document.createElement("div");
  div.className = "sds-address-section";
  let input1 = document.createElement("input");
  input1.setAttribute("readonly", "true");
  input1.setAttribute("value", formString1)
  input1.className = "sds-check1";
  let input2 = document.createElement("input");
  input2.setAttribute("readonly", "true");
  input2.setAttribute("value", formString2);
  input2.className = "sds-check2";
  let button = document.createElement("input");
  button.setAttribute("type", "button");
  button.setAttribute("value", "Rimuovi");
  // Al click esegue la funzione sdsRemoveElement per rimuovere il box contenente l'indirizzo. 
  button.addEventListener("click", function () { sdsRemoveElement(event) });
  div.append(input1);
  div.append(input2);
  div.append(button);
  document.getElementById("sds-add-i").before(div);
  document.getElementById("sds-modal").innerHTML = "";
  check();
};

// Rimuove il box contenente un dato indirizzo. Viene anche eseguita la funzione sdsReset per rimuovere i bordi rossi degi indirizzi identici (se ce ne sono) e poi la funzione check per controllare nuovamente la presenza di indirizzi uguali. 
function sdsRemoveElement(event) {
  event.target.parentElement.remove();
  sdsReset();
  check();
}

/* Controllo degli indirizzi. Vengono controllate tutti gli elementi appartenenti a due classi, ciascuna contenente una porzione di indirizzo. Se gli elementi sono identici vengono formattati con la funzione sdsHighlight*/
function check() {
  let checks1 = document.getElementsByClassName("sds-check1");
  let checks2 = document.getElementsByClassName("sds-check2");
  if (checks1.length > 1) {
    for (let i = 0; i < checks1.length; i++) {
      for (let j = i + 1; j < checks1.length; j++) {
        if (checks1[i].value.toLowerCase().indexOf(checks1[j].value.toLowerCase()) == 0 && checks2[i].value.toLowerCase().indexOf(checks2[j].value.toLowerCase()) == 0) {
          sdsHighlight(checks1[i]);
          sdsHighlight(checks1[j]);
          // Controlla se un alert è già presente per non generarne altri
          if (!document.getElementById("sds-alert")) {
            sdsAlertCreate();
          }
        }
      }
    }
  }
}

// Aggiunge un contorno rosso ai box contenente indirizzi identici
function sdsHighlight(input) {
  input.parentElement.style.borderColor = "rgba(255, 0, 0, 0.438)";
}

// Rimuove la formattazione che contraddistingue gli indirizzi uguali e distrugge l'alert 
function sdsReset(input) {
  let checks1 = document.getElementsByClassName("sds-check1");
  let checks2 = document.getElementsByClassName("sds-check2");
  for (let check of checks1) {
    check.parentElement.style.borderColor = "";
  }
  for (let check of checks2) {
    check.parentElement.style.borderColor = "";
  }
  sdsAlertDestory();
}

// Funzioni per creare o rimuovere l'alert 
function sdsAlertCreate() {
  let div = document.createElement("div");
  div.id = "sds-alert";
  div.innerHTML = "Attenzione: gli indirizzi sono identici!";
  let modal = document.getElementById("sds-modal");
  modal.append(div);
}

function sdsAlertDestory() {
  let alert = document.getElementById("sds-alert");
  if (alert != undefined) {
    alert.remove();
  }
}


// Fine codice Stefano

/* INIZIA IL CODICE DI GIULIO */

function controlloGiulio() {
  const pwd = document.getElementById("password");
  const pwd2 = document.getElementById("password_2");
  const errore = document.getElementById("errore-giulio");
  const send = document.getElementById("invia");
  const maiuscole = /[A-Z]/;
  const minuscole = /[a-z]/;
  const numeri = /[0-9]/;
  const caratteri = /[!\@\#\$\%\^\&\*\(\)\_\-\+\=\<\,\>\?]/;

  //funzione che esegue i vari controlli
  function control(firstPassword, secondPassword) {
    if (firstPassword !== secondPassword) {
      errore.innerHTML = "**Le password non coincidono";
      return;
    }

    if (firstPassword.length < 8) {
      errore.innerHTML = "**La password deve essere almeno di 8 caratteri";
      return;
    }

    if (!maiuscole.test(firstPassword)) {
      errore.innerHTML = "**La password deve contenere almeno un carattere maiuscolo";
      return;
    }

    if (!minuscole.test(firstPassword)) {
      errore.innerHTML = "**La password deve contenere almeno un carattere minuscolo";
      return;
    }

    if (!numeri.test(firstPassword)) {
      errore.innerHTML = "**La password deve contenere almeno un numero";
      return;
    }

    if (!caratteri.test(firstPassword)) {
      errore.innerHTML = "**La password deve contenere almeno un carattere speciale";
      return;
    }

    // se la password coincide da messaggio di password corretta
    errore.innerHTML = "PASSWORD CORRETTA";
  }

  // al click del mouse da la risposta
  send.addEventListener('click', (event) => {
    let firstPassword = pwd.value;
    let secondPassword = pwd2.value;
    event.preventDefault();
    control(firstPassword, secondPassword);
  })

}

controlloGiulio();

/*FINISCE IL CODICE DI GIULIO */
/*----------------- FERRERO SCRIPT STARTS HERE -----------------*/
let setDuration = 90;

/**** generate random number ****/
let secretNumber = Math.trunc(Math.random() * 10) + 1;
document.querySelector('.number').textContent = secretNumber;


/**** start the game ****/
document.querySelector('.start').addEventListener('click', function () {
    /*
        document.querySelector('.time').textContent = ``;
    */

    countdown(setDuration, document.querySelector('.time'));
    document.querySelector(".start").disabled = true;
    document.querySelector(".check").disabled = false;


    /**** input check ****/
    document.querySelector('.check').addEventListener('click', function () {
        const input = Number(document.querySelector('.input').value);

        if (!input) {
            document.querySelector('.response').textContent = 'Inserisci un numero per fuggire';
        } else if (input === secretNumber) {
            document.querySelector('.response').textContent = 'Hai battuto il sistema, sei libero!';
        } else if (input > secretNumber) {
            document.querySelector('.response').textContent = 'Il numero è troppo alto...';
        } else if (input < secretNumber) {
            document.querySelector('.response').textContent = 'Il numero è troppo basso...';
        }
    });


});


/**** countdown logic ****/
function countdown(duration, show) {
    setInterval(function () {
        minutes = parseInt(duration / 60)
        seconds = parseInt(duration % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        show.textContent = `Ti rimangono ${minutes}:${seconds} minuti!`;

        if (--duration < 0) {
            show.textContent = `Il tempo è scaduto, sei stato scoperto!`;
            document.querySelector(".check").disabled = true;
            document.querySelector(".start").disabled = false;
            document.querySelector('.start').textContent = `Ritenta la fuga`;
        } else if (input === secretNumber) {
            show.textContent = `Ti rimanevano ancora ${minutes}:${seconds} minuti`;
        }
    }, 1000);
}


/**** difficulty settings ****/
document.querySelector('.difficulty').addEventListener('click', function () {
    document.querySelector(".easy").hidden = false;
    document.querySelector(".medium").hidden = false;
    document.querySelector(".difficult").hidden = false;
});

document.querySelector('.easy').addEventListener('click', function () {
    document.querySelector(".easy").hidden = true;
    document.querySelector(".medium").hidden = true;
    document.querySelector(".difficult").hidden = true;
    document.querySelector(".difficulty").style.backgroundColor = "yellowgreen";
    setDuration = 180;
});

document.querySelector('.medium').addEventListener('click', function () {
    document.querySelector(".easy").hidden = true;
    document.querySelector(".medium").hidden = true;
    document.querySelector(".difficult").hidden = true;
    document.querySelector(".difficulty").style.backgroundColor = "darkorange";
    setDuration = 90;
});

document.querySelector('.difficult').addEventListener('click', function () {
    document.querySelector(".easy").hidden = true;
    document.querySelector(".medium").hidden = true;
    document.querySelector(".difficult").hidden = true;
    document.querySelector(".difficulty").style.backgroundColor = "orangered";
    setDuration = 30;
});


/**** tries counter ****/
let clicks = 0;

document.querySelector('.check').addEventListener('click', function () {
    clicks += 1;
    document.querySelector('.tries').textContent = clicks;
});


/**** opponent settings ****/
document.querySelector('.opponent').addEventListener('click', function () {
    document.querySelector(".commodore").hidden = false;
    document.querySelector(".deep-blue").hidden = false;
    document.querySelector(".fugaku").hidden = false;
});

document.querySelector('.commodore').addEventListener('click', function () {
    document.querySelector(".commodore").hidden = true;
    document.querySelector(".deep-blue").hidden = true;
    document.querySelector(".fugaku").hidden = true;
    document.querySelector(".opponent").style.backgroundColor = "yellowgreen";
});

document.querySelector('.deep-blue').addEventListener('click', function () {
    document.querySelector(".commodore").hidden = true;
    document.querySelector(".deep-blue").hidden = true;
    document.querySelector(".fugaku").hidden = true;
    document.querySelector(".opponent").style.backgroundColor = "darkorange";
});

document.querySelector('.fugaku').addEventListener('click', function () {
    document.querySelector(".commodore").hidden = true;
    document.querySelector(".deep-blue").hidden = true;
    document.querySelector(".fugaku").hidden = true;
    document.querySelector(".opponent").style.backgroundColor = "orangered";
});

/**** opponent logic ****/
let AIcount = 0;
document.querySelector('.start').addEventListener('click', function () {
    setInterval(function () {
        AItry = Math.trunc(Math.random() * 10) + 1;
        AIcount += 1;
        document.querySelector('.AI-tries').textContent = AIcount;

        console.log(AItry);
        if (AItry === secretNumber) {
            document.querySelector('.response').textContent = `L'intelligenza artificiale ti ha battuto!`;
            document.querySelector(".check").disabled = true;
            clearInterval();
        }
    }, 1000);
});

/*----------------- FERRERO SCRIPT ENDS HERE -----------------*/

/* Inizia il codice di Imane */

//array con le carte da gioco si possono aggiungere o togliere altri elementi, l'importante è che ci siano due valori uguali
var arrayMemoryI = ['||', '||', '&&', '&&', '==', '==','=','=','++','++','%','%','/','/','!=','!=','--','--'];
var valoriMemoryI = [];//array di appoggio per confrontare i valori delle due carte
var valoriIdMemory = [];//array di appoggio per conservare il loro relativo id
var carteGirateI = 0;

//funzione per randomizzare i valori del mio array di carte
function mischiaCarteI(arrayI) {
  var i = arrayI.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arrayI[j];
    arrayI[j] = arrayI[i];
    arrayI[i] = temp;
  }
}

//funzione crea pagina html con le carte da gioco gia randomizzate e il pulsante restart
function newBoard() {
  carteGirateI = 0;
  var tavoloGiocoImane = '';
  mischiaCarteI(arrayMemoryI);
  for (var i = 0; i < arrayMemoryI.length; i++) {
    tavoloGiocoImane += '<div id="carta_' + i + '" onclick="giraCarteI(this,\'' + arrayMemoryI
    [i] + '\')"></div>';
  }
  tavoloGiocoImane += '<button id="buttonI" onclick="restart()">RESTART</button>';
  document.getElementById('memory_board').innerHTML = tavoloGiocoImane;
}

//funzione che capovolge le carte quando non sono uguali
function rigiraCarteI() {
  var carta1 = document.getElementById(valoriIdMemory[0]);
  var carta2 = document.getElementById(valoriIdMemory[1]);
  carta1.style.background = 'url(icons/santoliM.jpg) no-repeat';
  carta1.innerHTML = "";
  carta2.style.background = 'url(icons/santoliM.jpg) no-repeat';
  carta2.innerHTML = "";
  // pulisco entrambi gli array di supporto
  valoriMemoryI = [];
  valoriIdMemory = [];
}

//funzione di restart:pulisce e fa ripartire il gioco
function restart() {
  document.getElementById('memory_board').innerHTML = "";
  newBoard();
}

//funzione logica che gestisce l'intero gioco e si ha ad ogni click sulla carta
function giraCarteI(carta, val) {
  if (carta.innerHTML == "" && valoriMemoryI.length < 2) {
    carta.style.background = 'lightskyblue';
    carta.innerHTML = val;
    //se non sono girate carte inserisce nell'array d'appoggio il valore della prima carta girata
    //e nel secondo array l'id del div della carta
    if (valoriMemoryI.length == 0) {
      valoriMemoryI.push(val);
      valoriIdMemory.push(carta.id);
    } else if (valoriMemoryI.length == 1) {
      valoriMemoryI.push(val);
      valoriIdMemory.push(carta.id);
      //controlla se le tessere sono uguali e se si incrementa il contatore di due altrimenti rigira le carte
      if (valoriMemoryI[0] == valoriMemoryI[1]) {
        carteGirateI += 2;
        //pulire entrambi gli array di supporto
        valoriMemoryI = [];
        valoriIdMemory = [];
        //controlla se tutte le carte siano girate o meno cosi o finisce la partita o va avanti
        //ho messo il setTimeout altrimenti non girava l'ultima carta prima della vittoria
        if (carteGirateI == arrayMemoryI.length) {
          setTimeout( () => {
            alert("Hai Vinto!!!!!! Se vuoi giocare di nuovo premi ok");
            restart();
          }, 200)
        }
      } else {
        setTimeout(rigiraCarteI, 700);
      }
    }
  }
}
newBoard();

/* Finisce il codice di Imane*/
