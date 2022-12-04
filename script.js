let selectedRow = null

// function exceuted when form is submitted
function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

// function to read recieve data submitted by user
function readFormData() {
    let formData = {};
    formData.name = document.getElementById("name").value;
    formData.amount = document.getElementById("amount").value;
    formData.price = document.getElementById("price").value;
    formData.suma = formData.amount * formData.price;
    return formData; 
}

//function to display submitted data in a different table
function insertNewRecord(data) {
    let table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    // create a new row and insert data continuosly over the lenght of table
    let newRow = table.insertRow(table.length); // table.length for the subsquent data to be submitted
    cell1 = newRow.insertCell(0); 
    cell1.innerHTML = data.name; //cell 1 of row 1
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.amount; //cell 2 of row 1
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.price; //cell 3 of row 1
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.suma;   //cell 4 of row 1
    cell5 = newRow.insertCell(4); 
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("price").value = "";
    document.getElementById("suma").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[1].innerHTML;
    document.getElementById("price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("suma").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.amount;
    selectedRow.cells[2].innerHTML = formData.price;
    selectedRow.cells[3].innerHTML = formData.suma;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {

    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }

    if (document.getElementById("amount").value <= 0 ?? document.getElementById("amount").value == ""){
        isValid = false;
        document.getElementById("amountValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("amountValidationError").classList.contains("hide"))
            document.getElementById("amountValidationError").classList.add("hide");
    }

    if (document.getElementById("price").value <= 0 ?? document.getElementById("price").value == ""){
        isValid = false;
        document.getElementById("priceValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("priceValidationError").classList.contains("hide"))
            document.getElementById("priceValidationError").classList.add("hide");
    }

    return isValid;
}


/*
localStorage.setItem('items', JSON.stringify(newRow));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

localStorage.setItem('items', )
*/