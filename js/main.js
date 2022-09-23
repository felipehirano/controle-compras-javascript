var list = [
  { desc: "rice", amount: "1", value: "5.40" },
  { desc: "beer", amount: "12", value: "1.99" },
  { desc: "meet", amount: "1", value: "15.00" },
];

function getTotal(list) {
  var total = 0;
  for (var indice in list) {
    total += list[indice].value * list[indice].amount;
  }
  document.getElementById("totalValue").innerHTML = formatValue(total);
}

function addData() {
  if (!validation()) {
    return;
  }

  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list.unshift({ desc, amount, value });
  setList(list);
  resetForm();
}

function formatDes(desc) {
  var str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);

  return str;
}

function formatValue(value) {
  var str = parseFloat(value).toFixed(2) + "";
  str = "$ " + str.replace(".", ",");
  return str;
}

function formatAmount(amount) {
  return parseInt(amount);
}

function setUpdate(indice) {
  var obj = list[indice];
  document.getElementById("desc").value = obj.desc;
  document.getElementById("amount").value = obj.amount;
  document.getElementById("value").value = obj.value;
  document.getElementById("btnUpdate").style.display = "inline-block";
  document.getElementById("btnAdd").style.display = "none";

  document.getElementById("inputIDUpdate").innerHTML =
    '<input id="idUpdate" type="hidden" value="' + indice + '" >';
}

function resetForm() {
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("value").value = "";
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "inline-block";

  document.getElementById("inputIDUpdate").innerHTML = "";
}

function update() {
  if (!validation()) {
    return;
  }

  var indice = document.getElementById("idUpdate").value;

  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;

  list[indice] = { desc, amount, value };

  setList(list);
  resetForm();
}

function deleteItem(id) {
  if (confirm("Delete this item?")) {
    if (id === list.length - 1) {
      list.pop();
    } else if (id === 0) {
      list.shift();
    } else {
      var arrAuxIni = list.slice(0, id);
      var arrAuxFin = list.slice(id + 1);
      list = arrAuxIni.concat(arrAuxFin);
    }
    setList(list);
  }
}

function validation() {
  var desc = document.getElementById("desc").value;
  var amount = document.getElementById("amount").value;
  var value = document.getElementById("value").value;
  var errors = "";

  document.getElementById("errors").style.display = "none";

  if (desc === "") {
    errors += "<p>Fill out description</p>";
  }

  if (amount === "") {
    errors += "<p>Fill out quantity</p>";
  } else if (amount != parseInt(amount)) {
    errors += "<p>Fill out a valid quantity</p>";
  }

  if (value === "") {
    errors += "<p>Fill out value</p>";
  } else if (value != parseFloat(value)) {
    errors += "<p>Fill out a valid value</p>";
  }

  if (errors != "") {
    document.getElementById("errors").style.display = "block";

    document.getElementById("errors").style.backgroundColor =
      "rgba(85,85,85,0.3)";
    document.getElementById("errors").style.color = "white";
    document.getElementById("errors").style.padding = "10px";
    document.getElementById("errors").style.margin = "10px";
    document.getElementById("errors").style.borderRadius = "13px";

    document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
    return 0;
  } else {
    document.getElementById("errors").style.display = "none";
    return 1;
  }
}

function deleteList() {
  if (confirm("Delete all data from list ?")) {
    list = [];
    setList(list);
  }
}

function setList(list) {
  var table =
    "<thead><tr><th>Description</th><th>Amount</th><th>Value</th><th>Action</th></tr></thead><tbody>";
  for (var indice in list) {
    table +=
      "<tr><td>" +
      formatDes(list[indice].desc) +
      "</td><td>" +
      formatAmount(list[indice].amount) +
      "</td><td>" +
      formatValue(list[indice].value) +
      "</td><td><button class='btn btn-default' onClick='setUpdate(" +
      indice +
      ");'>Edit</button><button class='btn btn-default' onClick='deleteItem(" +
      indice +
      ");'>Delete</button></td></tr>";
  }

  table += "</tbody>";

  document.getElementById("listTable").innerHTML = table;
  getTotal(list);
}

setList(list);
