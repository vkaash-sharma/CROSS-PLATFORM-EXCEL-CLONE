let rows = 100;
let cols = 26;
let addressColContainer = document.querySelector(".address-col-cont");
let addressRowContainer = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

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

for(let i = 0 ; i < rows ; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class" , "row-cont");
    for(let j = 0 ; j < cols ; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell")
        cell.setAttribute("contenteditable" , "true");
        rowCont.appendChild(cell);
        addListnerForAddressBarDisplay(cell , i , j);
    }
    cellsCont.appendChild(rowCont);
}

function addListnerForAddressBarDisplay(cell , i , j){
    cell.addEventListener("click" ,(e) => {
        let rowID =i+1;
        let colID = String.fromCharCode(65 + j);
        addressBar.value =`${colID}${rowID}`
    })
}