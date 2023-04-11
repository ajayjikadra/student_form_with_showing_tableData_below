function radioCheck() {
  let radioValue = document.getElementsByClassName("radio");
  let radio = "";
  for (i = 0; i < radioValue.length; i++) {
    if (radioValue[i].checked == true) {
      radio = radioValue[i].value;
    }
  }
  return radio;
}
function checkCheckbox() {
  let checkboxValue = document.getElementsByClassName("checkbox");
  let checkbox = [];
  for (i = 0; i < checkboxValue.length; i++) {
    if (checkboxValue[i].checked == true) {
      checkbox.push(checkboxValue[i].value);
    }
  }
  return checkbox;
}

//validate and submit function

function validateForm(event) {
  removeAllErrors()
  function seterror(id, error) {
    element = document.getElementById(id);
    element.nextElementSibling.innerText = error;
    // console.log(id,error)
  }

  function removeAllErrors() {
    let errorsElement = document.getElementsByClassName("formerror");
    for (i = 0; i < errorsElement.length; i++) {
      errorsElement[i].innerText = ""
    }
  }

  event.preventDefault();
  let returnval = true;
  let fname = document.forms["myform"]["fName"].value;
  if (fname.length < 3) {
    seterror(
      "fName",
      " * Please Enter a First Name with Minimum 3 character and Max 30"
    );
    returnval = false;
  }

  let lname = document.forms["myform"]["lName"].value;
  if (lname.length < 3) {
    seterror(
      "lName",
      " * Please Enter a Last Name with Minimum 3 character and Max 30"
    );
    returnval = false;
  }
  let validRegex =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let email = document.forms["myform"]["email"].value;
  if (email.match(validRegex)) {
  } else {
    seterror("email", " *Enter Valid Email");
    returnval = false;
  }

  let male = document.forms["myform"]["male"].checked;
  let female = document.forms["myform"]["female"].checked;
  if (male == false && female == false) {
    seterror("female", " * Please Tick Any One");
    returnval = false;
  }

  let course = document.querySelector("#course").value;
  if (course == "") {
    seterror("course", "Please Select One Option");
    returnval = false;
  }

  let address = document.forms["myform"]["address"].value;
  if (address.length < 10 || address.length > 500) {
    seterror("address", " * Minimum Character 10 and maximum 500 Character ");
    returnval = false;
  }
  function checkboxvalidation() {
    let checkboxs = document.getElementsByClassName("checkbox");
    // console.log(checkboxs);
    counter = 0;
    for (i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].checked == true) {
        counter++;
      }
    }
    if (counter < 1) {
      seterror("1", "Please Select More Then One Subjects");
      returnval = false;
    }
  }
  checkboxvalidation();

  let selectedRowNo = document.getElementById("formid").value;

  if (returnval) {
    if (selectedRowNo == "") {
      addData("submit");
      resetData();
    } else {
      update();
      resetData();
    }
  }

  return returnval;
}

//data passing table to form

function addData(feature) {
  let firstName = document.forms["myform"]["fName"].value;
  let lastName = document.forms["myform"]["lName"].value;
  let email = document.forms["myform"]["email"].value;
  let course = document.querySelector("#course").value;
  let address = document.querySelector("#address").value;

  if (feature == "submit") {
    let tr = document.createElement("tr");
    let td1 = tr.appendChild(document.createElement("td"));
    let td2 = tr.appendChild(document.createElement("td"));
    let td3 = tr.appendChild(document.createElement("td"));
    let td4 = tr.appendChild(document.createElement("td"));
    let td5 = tr.appendChild(document.createElement("td"));
    let td6 = tr.appendChild(document.createElement("td"));
    let td7 = tr.appendChild(document.createElement("td"));
    let td8 = tr.appendChild(document.createElement("td"));

    td1.innerText = firstName;
    td2.innerText = lastName;
    td3.innerText = email;
    td4.innerHTML = radioCheck();
    td5.innerText = course;
    let checkboxlength = checkCheckbox();
    if (checkboxlength.length > 2) {
      td6.innerHTML = checkCheckbox();
    }
    td7.innerText = address;
    td8.innerHTML +=
      " <button type='button' onclick = 'editDataForm(this)' class='btn btn-dark my-1' >Edit</button> <button type='button' onclick = 'deleteRow(this)' id='deleterow' class='btn btn-dark'>Delete</button>  ";

    document.getElementById("table").appendChild(tr);
  }

  if (feature == "update") {
    return [
      firstName,
      lastName,
      email,
      radioCheck(),
      course,
      checkCheckbox(),
      address,
    ];
  }
}

//reset Form
function resetData() {
  // console.log("Resetting");
  let form = document.getElementById("myform");
  form.reset(); // Reset all form data
}
// delete table row

function deleteRow(row) {
  if (confirm("Are You Sure You Want To Delete Data From Table")) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById("table").deleteRow(i);
  }
}

//Edit button functionality

// edit row data

function editDataForm(rowInstance) {
  let cellValue = [];
  for (let cell of rowInstance.parentElement.parentElement.cells) {
    cellValue.push(cell.innerText);
  }

  // console.log(cellValue);

  all_form_element = ["fName", "lName", "email"];

  for (i = 0; i < all_form_element.length; i++) {
    storeVal = document.getElementById(`${all_form_element[i]}`);
    storeVal.value = cellValue[i];
    // storeVal.setAttribute("value", `${cellValue[i]}`);
  }

  //set radio button value
  if (cellValue[3] == "Male") {
    document.forms["myform"]["male"].checked = true;
  } else {
    document.forms["myform"]["female"].checked = true;
  }

  // set droupdown menu
  let x = cellValue[4];

  let optionList = ["", "B.E/B.TECH", "M.E/M.TECH", "BCA", "MCA"];
  for (i = 0; i < optionList.length; i++) {
    if (optionList[i] == x) {
      document.getElementsByClassName("course")[i].selected = true;
    }
  }
  //set for subjects checkbox
  let y = cellValue[5];
  y = y.split(",");

  let checkboxValue = document.getElementsByClassName("checkbox");

  for (i = 0; i < checkboxValue.length; i++) {
    if (y.includes(checkboxValue[i].value)) {
      checkboxValue[i].checked = true;

      // checkboxValue[i].setAttribute("checked", "checked");
    }
  }
  // set Adress Value
  let address = document.getElementById("address");
  address.value = cellValue[6];

  //getting row index to identify which table row is selected
  function rowIndex() {
    let rowIndex = rowInstance.parentElement.parentElement.rowIndex;
    // console.log(rowIndex);
    return rowIndex;
  }

  row_index = rowIndex();
  document.getElementById("formid").value = row_index;

  // let aa =  document.getElementById("update").innerText="Update"
  document.getElementById("update").innerText = "Update";
}

// update old Entry

function update() {
  document.getElementById("formid").value = row_index;
  let updateList = addData("update");
  var myTable = document.getElementById("table");

  myTable.rows[row_index].cells[0].innerText = updateList[0];
  myTable.rows[row_index].cells[1].innerText = updateList[1];
  myTable.rows[row_index].cells[2].innerText = updateList[2];
  myTable.rows[row_index].cells[3].innerHTML = updateList[3];
  myTable.rows[row_index].cells[4].innerHTML = updateList[4];
  myTable.rows[row_index].cells[5].innerHTML = updateList[5];
  myTable.rows[row_index].cells[6].innerText = updateList[6];

  document.getElementById("update").innerText = "Submit";
}
