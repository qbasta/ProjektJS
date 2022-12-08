
var elem = document.getElementById("title")
let tablica = []

//localStorage.clear()

// ladowanie informacji z pamięci lokalnej
window.addEventListener('load', function () {
    var json = localStorage.getItem("paragon")
    if (json != null) {
        tablica = JSON.parse(json)
        showElements()
    }

})

// oczyt danych z pamieci lokalnej
function showElements() {
    if (tablica.length != 0) tablica.forEach(element => addNewRow(element))

}

// parametry dodawanych elementow
function createElement(name, amount, price, total) {
    return element = { name: name, amount: amount, price: price, total: total }
}

// jezeli dane nie spelniaja kryteria
function validation() {
    alert("Podaj poprawne dane")
}

// zmiana koloru linii z cena w przypadku linii nieparzystej

function footerColor(newRow){
    if (newRow.rowIndex % 2 != 0) changeFooterColor("#f2f2f2")
    else changeFooterColor("white")
}

function changeFooterColor(color) {
    const footer = document.getElementById("foot")
    footer.style.backgroundColor = color
}


// manipulowanie wartosciami na paragonie
function addNewRow(tablicaRow) {
    var table = document.getElementById('body')
    var newRow = table.insertRow();
    //dodanie indeksu do wartosci
    addNewCell(newRow, newRow.rowIndex)
    
    // zmiana wartosci w polu nazwa po kliknieciu w pole
    var newCellName = newRow.insertCell()
    newCellName.innerHTML = tablicaRow.name
    newCellName.addEventListener("click", function () {
        let newName = prompt("Podaj nowa nazwe")
        if (isNaN(newName)) {
            newCellName.innerHTML = newName.toString()
            tablicaRow.name = newName.toString()
            changeRow(tablicaRow, newCellName)
        }
        else validation()
    })
    // zmiana wartosci w polu ilosc po kliknieciu w pole
    var newCellAmount = newRow.insertCell()
    newCellAmount.innerHTML = tablicaRow.amount
    newCellAmount.addEventListener("click", function () {
        let newAmount = prompt("Podaj nową ilość")
        if (!isNaN(newAmount) && newAmount > 0 && newAmount % 1 === 0) {
            newCellAmount.innerHTML = parseInt(newAmount)
            newCellAmount.parentNode.children[4].innerHTML = ((parseInt(newCellAmount.parentNode.children[2].innerHTML) * parseFloat(newCellAmount.parentNode.children[3].innerHTML))).toFixed(2) + " zł"
            tablicaRow.amount = newAmount
            tablicaRow.total = (tablicaRow.price * tablicaRow.amount).toFixed(2)
            changeRow(tablicaRow, newCellAmount)
            updateFooterTotal()

        }
        else validation()
    })
    // zmiana wartosci w polu cena po kliknieciu w pole
    var newCellPrice = newRow.insertCell()
    newCellPrice.innerHTML = tablicaRow.price + " zł"
    newCellPrice.addEventListener("click", function () {
        let newPrice = prompt("Podaj nową cene")
        if (!isNaN(newPrice) && newPrice > 0) {
            newCellPrice.innerHTML = parseFloat(newPrice) + " zł"
            newCellAmount.parentNode.children[4].innerHTML = ((parseInt(newCellAmount.parentNode.children[2].innerHTML) * parseFloat(newCellAmount.parentNode.children[3].innerHTML))).toFixed(2) + " zł"
            tablicaRow.price = newPrice
            tablicaRow.total = (tablicaRow.price * tablicaRow.amount).toFixed(2)
            changeRow(tablicaRow, newCellPrice)
            updateFooterTotal()

        }
        else validation()
    })
    // dodanie sumy do poszczegolnego produktu
    addNewCell(newRow, tablicaRow.total + " zł")
    // usuwanie wartosci z pamieci i listy
    var x = newRow.insertCell()
    x.innerHTML = "[x]"
    x.addEventListener("click", function () {
        let i = x.parentNode.rowIndex
        let json = localStorage.getItem('paragon')
        data = JSON.parse(json)
        data.splice(i - 1, 1)
        tablica = data.slice()
        localStorage.clear()
        localStorage.setItem("paragon", JSON.stringify(data))
        var row = x.parentNode
        row.parentNode.removeChild(row)
        updateFooterTotal()
        footerColor(newRow)

    })
    setTr()
    updateFooterTotal()
    footerColor(newRow)

}
// zapis zmiany wartosci w kolumnie
function changeRow(tablicaRow, cell) {
    tablica[cell.parentNode.rowIndex - 1] = tablicaRow
    localStorage.clear()
    localStorage.setItem("paragon", JSON.stringify(tablica))
}
// dodanie dodatkowej wartosci do rekordu
function addNewCell(newRow, text) {
    var newCell = newRow.insertCell()
    newCell.innerHTML = text
}

// zmiana ceny ostatecznej
function updateFooterTotal() {
    var th = document.getElementsByTagName("th")
    var total = 0.00
    for (var i = 0; i < tablica.length; i++) {
        total += parseFloat(tablica[i].total)
    }
    th[th.length - 2].innerHTML = (parseFloat(total).toFixed(2) + " zł")

}

// dodawanie nowej pozycji do paragonu
const button = document.getElementById("button")
button.addEventListener("click", function () {
    const name = document.getElementById("name").value
    const amount = document.getElementById("amount").value
    const price = document.getElementById("price").value

    // walidacja danych wprowadzanych na liste
if (isNaN(name) && !isNaN(amount) && amount % 1 === 0 && amount.length != 0 && !isNaN(price) && price.length != 0 && amount > 0 && price > 0) {
        if (tablica.length === 0) {
            tablica.push(createElement(name, amount, parseFloat(price).toFixed(2), (amount * price).toFixed(2)))
        } else {
            tablica.push(createElement(name, amount, parseFloat(price).toFixed(2), (amount * price).toFixed(2)))

        }
        // przenoszenie danych do pamieci lokalnej
        localStorage.setItem("paragon", JSON.stringify(tablica))
        addNewRow(tablica[tablica.length - 1])
    } else {
        validation()

    }


})

// nadanie atrybutow dla przesuwanych linii
function setTr() {
    const tr = document.getElementById("body")
    for (var i = 0; i < tr.children.length; i++) {
        tr.children[i].setAttribute('draggable', true)
        tr.children[i].setAttribute('ondragstart', 'start()')
        tr.children[i].setAttribute('ondragover', 'dragover()')
    }
}


var row;
function start() {
    row = event.target
}


// przesuwanie obiektu na liscie
function dragover() {
    var e = event
    e.preventDefault()

    let children = Array.from(e.target.parentNode.parentNode.children)
    if (children.indexOf(e.target.parentNode) > children.indexOf(row)) {
        e.target.parentNode.after(row)
        change(e, row)

    }
    else {
        e.target.parentNode.before(row)
        change(e, row)
    }
}

//zmiana indeksu przesunietego obiektu
function change(e, row) {
    var table = document.getElementById('body')
    for (var i = 0; i < table.children.length; i++) {
        table.children[i].firstChild.innerHTML = i + 1
    }
    var a = tablica[e.target.parentNode.rowIndex - 1]
    tablica[e.target.parentNode.rowIndex - 1] = tablica[row.rowIndex - 1]
    tablica[row.rowIndex - 1] = a
    localStorage.clear()
    localStorage.setItem("paragon", JSON.stringify(tablica))
    
}
