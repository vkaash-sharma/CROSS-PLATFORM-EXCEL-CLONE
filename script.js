let rows = 100;
let cols = 26;
let addressColContainer = document.querySelector(".address-col-cont");
let addressRowContainer = document.querySelector(".address-row-cont");
for(let i = 0 ; i < rows ; i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class" ,"address-col")
    addressCol.innerText =  i+1;
    addressColContainer.appendChild(addressCol);
}

for(let i = 0 ; i < cols ; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class" ,"address-row")
    addressRow.innerText =  String.fromCharCode(65 +i);
    addressRowContainer.appendChild(addressRow);
}