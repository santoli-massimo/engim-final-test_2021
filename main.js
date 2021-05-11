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


// Start of Franco's Code Block
{
    let formElement = document.getElementById("franco-form");
    let emailElement = document.getElementById("franco-email");
    let resetElement = document.getElementById("franco-reset");
    let successElement = document.getElementById("franco-success");
    let errorElement = document.getElementById("franco-error");

    function clearMessages() {
        successElement.innerHTML = "";
        errorElement.innerHTML = "";
    }

    resetElement.addEventListener('click', () => {
        formElement.reset()
        clearMessages()
    });

    formElement.addEventListener('submit', (event) => {

        // Prevent page refresh after clicking the form submit button
        event.preventDefault();

        clearMessages();

        // Email Validation
        let emailValue = emailElement.value;
        let atSign = emailValue.indexOf("@");
        let lastDot = emailValue.lastIndexOf("\.");
        let lastDotText = emailValue.slice(lastDot + 1);
        
        if (atSign > 0 && lastDot > atSign + 1 && lastDot < emailValue.length && emailValue[atSign + 1] !== "." && emailValue.indexOf(" ") === -1 && emailValue.indexOf("..") === -1 && lastDotText.length > 1 && lastDotText.length < 4 && emailValue.length > 0) {

            // API
            fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: emailValue }) })
                .then(response => response.json())
                .then(() => {
                    successElement.innerHTML = 'Email sent to API successfully';
                })
                .catch(() => {
                    errorElement.innerHTML = 'Error sending email to API';
                });

            return;
        }

        errorElement.innerHTML = "The written email isn't a valid email";
    });
}
// End of Franco's Code Block


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
    } else {
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
    } else {
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
document.getElementById("sds-add-i").addEventListener("click", function () {
    sdsAddI(event)
});

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
    cit.addEventListener("input", function () {
        sdsPopulateForm(event)
    });
    let bg = document.createElement("div");
    bg.className = "sds-modal-bg";
    let con = document.createElement("div");
    con.className = "sds-modal-content";
    let form = document.createElement("form");
    form.className = "sds-form";
    form.id = "ffform"

    // Il pulsante del form esegue la funzione sdsAddAddress
    form.addEventListener('submit', function () {
        sdsAddAddress(event)
    });
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
    button.addEventListener("click", function () {
        sdsRemoveElement(event)
    });
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


/******************** FERRERO SCRIPT STARTS HERE ********************/

/**** set the difficulty ****/
let duration = 90;
document.querySelector('.easy').addEventListener('click', function () {
    duration = 180;
});
document.querySelector('.medium').addEventListener('click', function () {
    duration = 90;
});
document.querySelector('.difficult').addEventListener('click', function () {
    duration = 30;
});

/**** start the game ****/
document.querySelector('.start').addEventListener('click', function () {

    /**** generate secret number ****/
    let secretNumber = Math.trunc(Math.random() * 100) + 1;

    /**** clean the output on new game ****/
    document.querySelector('.response').textContent = ``;
    document.querySelector('.tries').textContent = `0`;
    document.querySelector('.AI-tries').textContent = `0`;
    document.querySelector('.number').textContent = `?`;


    /**** countdown logic ****/
    let time = duration;

    let playerGame = setInterval(function () {
        minutes = parseInt(time / 60)
        seconds = parseInt(time % 60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector('.time').textContent = `Ti rimangono ${minutes}:${seconds} minuti`;

        if (--time < 0) {
            document.querySelector('.time').textContent = `Il tempo è scaduto, sei stato scoperto!`;
            document.querySelector(".check").disabled = true;
            document.querySelector(".start").disabled = false;
            document.querySelector('.start').textContent = `Ritenta la fuga`;
            clearInterval(playerGame);
            clearInterval(AIgame);
        }

        if (AItry === secretNumber)
            clearInterval(playerGame);

    }, 1000);

    document.querySelector(".start").disabled = true;
    document.querySelector(".check").disabled = false;

    /**** opponent logic ****/
    let AIcount = 0;
    let AIgame = setInterval(function () {
        AItry = Math.trunc(Math.random() * 100) + 1;
        AIcount += 1;
        document.querySelector('.AI-tries').textContent = AIcount;

        console.log(AItry);
        if (AItry === secretNumber) {
            document.querySelector('.response').textContent = `L'intelligenza artificiale ti ha battuto!`;
            document.querySelector(".check").disabled = true;
            document.querySelector(".start").disabled = false;
            document.querySelector('.start').textContent = `Ritenta la fuga`;
            clearInterval(AIgame);
        }
    }, 1000);


    /**** input check ****/
    let clicks = 0;

    document.querySelector('.check').addEventListener('click', function () {
        let input = Number(document.querySelector('.input').value);

        if (!input) {
            document.querySelector('.response').textContent = 'Inserisci un numero per fuggire';
        } else if (input === secretNumber) {
            document.querySelector(".check").disabled = true;
            document.querySelector(".start").disabled = false;
            document.querySelector('.response').textContent = 'Hai battuto il sistema, sei libero!';
            clearInterval(AIgame);
            clearInterval(playerGame);
            document.querySelector('.number').textContent = secretNumber;
            document.querySelector('.time').textContent = `Ti rimanevano ancora ${minutes}:${seconds} minuti`;
        } else if (input > secretNumber) {
            document.querySelector('.response').textContent = 'Il numero è troppo alto...';
        } else if (input < secretNumber) {
            document.querySelector('.response').textContent = 'Il numero è troppo basso...';
        }


        /**** tries counter ****/
        clicks += 1;
        document.querySelector('.tries').textContent = clicks;

    });

});


/**** difficulty button settings ****/
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
});

document.querySelector('.medium').addEventListener('click', function () {
    document.querySelector(".easy").hidden = true;
    document.querySelector(".medium").hidden = true;
    document.querySelector(".difficult").hidden = true;
    document.querySelector(".difficulty").style.backgroundColor = "darkorange";
});

document.querySelector('.difficult').addEventListener('click', function () {
    document.querySelector(".easy").hidden = true;
    document.querySelector(".medium").hidden = true;
    document.querySelector(".difficult").hidden = true;
    document.querySelector(".difficulty").style.backgroundColor = "orangered";
});

/**** opponent button settings ****/
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


/******************** FERRERO SCRIPT ENDS HERE ********************/

/* Inizia il codice di Imane */

//array con le carte da gioco si possono aggiungere o togliere altri elementi, l'importante è che ci siano due valori uguali
var arrayMemoryI = ['||', '||', '&&', '&&', '==', '==', '=', '=', '++', '++', '%', '%', '/', '/', '!=', '!=', '--', '--'];
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
    carta1.style.background = 'url(images/santoliM.jpg) no-repeat';
    carta1.innerHTML = "";
    carta2.style.background = 'url(images/santoliM.jpg) no-repeat';
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
                    setTimeout(() => {
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


/* Inizio codice Daniele*/

//Asset
let simboliDS = [
    'images/cocco.png',
    'images/fragola.png',
    'images/limone.png',
    'images/avocado.png',
    'images/anguria.png',
    'images/mela.png',
    'images/arancia.png',
    'images/kiwi.png',
    'images/melone.png'
];
/*immagini da pixabay.com, licenza cc0*/

//variabili
const arrDS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 225, 250, 275, 300, 325, 350, 375, 400];

let partitaIniziataDS = false;
let lunghezzaArrayDS = simboliDS.length;
let tentativiRitiroDS = 0;
let sconfitteConsecutiveDS = 0;

let n_tentativiDS = 0;
let n_puntiDS = 0;

const DELAY_DS = 5500;

//elementi DOM
let bottoneDS = document.getElementById("buttonDS");
let simboliIdDS = document.getElementById("simboliIdDS");
let simbolo1DS = document.getElementById("simbolo1DS");
let simbolo2DS = document.getElementById("simbolo2DS");
let simbolo3DS = document.getElementById("simbolo3DS");

let puntiDS = document.getElementById("puntiDS");
let tentativiDS = document.getElementById("tentativiDS");
let rapportoDS = document.getElementById("rapportoDS");
let ritiriDS = document.getElementById("ritiriDS");

//Partenza slot
bottoneDS.addEventListener("click", function () {

    if (!partitaIniziataDS) {
        partitaIniziataDS = true;
        ritiriDS.innerHTML = 2;
        tentativiRitiroDS = 0;

        if (sconfitteConsecutiveDS < 10) {

            parteSimboloDS(1);

            setTimeout(function () {
                parteSimboloDS(2)
            }, 500);

            setTimeout(function () {
                parteSimboloDS(3)
            }, 1000);

        } else {
            vittoriaAssicurataDS();
        }

        setTimeout(function () {

            aumentaTentativiDS();

            if (verificaVittoriaDS()) {
                aumentaPunteggioDS();
                sconfitteConsecutiveDS = 0;
                tentativiRitiroDS = 2;
                ritiriDS.innerHTML = 2 - tentativiRitiroDS;
            } else {
                sconfitteConsecutiveDS++;
            }

            mostraRapportoDS();
            partitaIniziataDS = false;
        }, DELAY_DS);
    }
});

function aumentaTentativiDS() {
    n_tentativiDS++;
    tentativiDS.innerHTML = n_tentativiDS;
}

function aumentaPunteggioDS() {
    n_puntiDS++;
    puntiDS.innerHTML = n_puntiDS;
}

function mostraRapportoDS() {
    rapportoDS.innerHTML = n_puntiDS / n_tentativiDS;
}

function verificaVittoriaDS() {
    return simbolo1DS.src == simbolo2DS.src && simbolo2DS.src == simbolo3DS.src;
}

//Animazione e generazione casuale di un simbolo
function parteSimboloDS(sDS) {
    let nDS = getRandomDS(0, lunghezzaArrayDS);
    if (sDS == 1) {
        for (let aDS of arrDS) {
            setTimeout(() => {
                nDS = getRandomDS(0, lunghezzaArrayDS);
                simbolo1DS.src = simboliDS[nDS];
            }, aDS * 10);
        }
    }
    if (sDS == 2) {
        for (let aDS of arrDS) {
            setTimeout(() => {
                nDS = getRandomDS(0, lunghezzaArrayDS);
                simbolo2DS.src = simboliDS[nDS];
            }, aDS * 10);
        }
    }
    if (sDS == 3) {
        for (let aDS of arrDS) {
            setTimeout(() => {
                nDS = getRandomDS(0, lunghezzaArrayDS);
                simbolo3DS.src = simboliDS[nDS];
            }, aDS * 10);
        }
    }
}

//se nelle ultime 10 partite non si hanno avuto vittorie 
//viene generata una vittoria
function vittoriaAssicurataDS() {
    let nVincenteDS = getRandomDS(0, lunghezzaArrayDS);

    parteSimboloDS(1);

    setTimeout(() => {
        simbolo1DS.src = simboliDS[nVincenteDS];
    }, DELAY_DS)

    setTimeout(function () {
        parteSimboloDS(2);
    }, 500);

    setTimeout(() => {
        simbolo2DS.src = simboliDS[nVincenteDS];
    }, DELAY_DS)

    setTimeout(function () {
        parteSimboloDS(3);
    }, 1000);

    setTimeout(() => {
        simbolo3DS.src = simboliDS[nVincenteDS];
    }, DELAY_DS)
}

function getRandomDS(minDS, maxDS) {
    minDS = Math.ceil(minDS);
    maxDS = Math.floor(maxDS);
    return Math.floor(Math.random() * (maxDS - minDS)) + minDS;
}

//ritira il simbolo cliccato
simboliIdDS.addEventListener("click", function () {
    if (!partitaIniziataDS) {
        if (!verificaVittoriaDS() && tentativiRitiroDS < 2) {
            if (event.target.id == 'simbolo1DS') {
                parteSimboloDS(1);
            }
            if (event.target.id == 'simbolo2DS') {
                parteSimboloDS(2);
            }
            if (event.target.id == 'simbolo3DS') {
                parteSimboloDS(3);
            }

            tentativiRitiroDS++;
            ritiriDS.innerHTML = 2 - tentativiRitiroDS;

            setTimeout(() => {
                if (verificaVittoriaDS()) {
                    aumentaPunteggioDS();
                    sconfitteConsecutiveDS = 0;
                    tentativiRitiroDS = 2
                }

                mostraRapportoDS();
                ritiriDS.innerHTML = 2 - tentativiRitiroDS;
            }, DELAY_DS);
        }
    }
});

/* Fine codice Daniele*/

/* Inizio codice Montassar*/

    // Request Api
const url = 'https://reqres.in/api/users';

fetch('https://reqres.in/api/users')
  .then(res => res.json())
  .then(data => users = data.data)
  .then(() => displayData(users))

// display data 
  function displayData(users){
    for(let user of users ){
    let table = document.getElementById("table_gh").getElementsByTagName('tbody')[0];
    let row = table.insertRow(table.length);
    rowCell1 = row.insertCell(0);
    rowCell1.innerHTML = user.id;
    rowCell2 = row.insertCell(1);
    rowCell2.innerHTML = user.first_name;
    rowCell3 = row.insertCell(2);
    rowCell3.innerHTML = user.last_name;
    rowCell4 = row.insertCell(3);
    rowCell4.innerHTML = user.email;
    rowCell4 = row.insertCell(4);
    rowCell4.innerHTML = `<a onclick="deleteRow(this)">Delete</a>`;
    }
}

// form submit eventListener
let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click',function(e){
    submitForm(),
    e.preventDefault();
});

let selectedRow = null;
function submitForm() {
        let formData = getFormData();
        if(validate()){
            setTable(formData);
        }
            
        resetForm();
}

// get form from data 
function getFormData() {
    let formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["fName"] = document.getElementById("fName").value;
    formData["lName"] = document.getElementById("lName").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

// fill table 
function setTable(data) {
    let table = document.getElementById("table_gh").getElementsByTagName('tbody')[0];
    let row = table.insertRow(table.length);
    rowCell1 = row.insertCell(0);
    rowCell1.innerHTML = data.id;
    rowCell2 = row.insertCell(1);
    rowCell2.innerHTML = data.fName;
    rowCell3 = row.insertCell(2);
    rowCell3.innerHTML = data.lName;
    rowCell4 = row.insertCell(3);
    rowCell4.innerHTML = data.email;
    rowCell4 = row.insertCell(4);
    rowCell4.innerHTML = `<a onclick="deleteRow(this)">Delete</a>`;
}

// reset Form
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

//delete Row
function deleteRow(td) {
    if (confirm(' Are you sure?')) {
        row = td.parentElement.parentElement;
        document.getElementById("table_gh").deleteRow(row.rowIndex);
        resetForm();
    }
}

// form validation
function validate() {
    isValid = true;
    if (document.getElementById("id").value == "") {
        isValid = false;
        document.getElementById("idValidator").classList.remove("hide-label");
    } else {
        isValid = true;
        if (!document.getElementById("idValidator").classList.contains("hide-label"))
            document.getElementById("idValidator").classList.add("hide-label");
    }
    return isValid;
}


/* Fine codice Montassar*/


/* Ahmed code started here*/
function n(dato) {
    document.getElementById("operazioni").value += dato;
}

function risultato() {
    document.getElementById("operazioni").value = eval(document.getElementById("operazioni").value);
}

function sqrt() {
    document.getElementById("operazioni").value = Math.round(Math.sqrt(document.getElementById("operazioni").value) * 1000) / 1000;
}

function perc() {
    document.getElementById("operazioni").value = eval(document.getElementById("operazioni").value) / 100;
}
function cancella() {
    document.getElementById("operazioni").value = "";
}


var button = document.getElementById('button');

var element = document.getElementById("screen");
element.style.display = 'none';



button.addEventListener('click', function(){
  element.style.display = '';
   element.classList.add("screen");
  element.classList.add("pulsante");
  element.classList.add("display");
});
/* Ahmed code finisched here*/
