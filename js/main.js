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
  return total;
}

function addData() {
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

function setList(list) {
  var table =
    "<thead><tr><th>Description</th><th>Amount</th><th>Value</th><th>Action</th></tr></thead><tbody>";
  for (var indice in list) {
    table +=
      "<tr><td>" +
      formatDes(list[indice].desc) +
      "</td><td>" +
      list[indice].amount +
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
}

setList(list);
