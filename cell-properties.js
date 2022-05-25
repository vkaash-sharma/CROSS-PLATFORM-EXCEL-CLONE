// storage 

let sheetDB = [];
for(let i = 0 ; i < rows ; i++)
{
      let sheetRow = [] ;
    for(let j = 0 ; j < cols ; j++){
      let cellProp = {
          bold : false ,
          italics : false ,
          underline : false ,
          alignment : "left" ,
          fontFamily : "monospace" ,
          fontSize : "14" ,
          fontColor : "#000000" ,
          BGcolor :"#000000"   // just for indication purpose
      }
      sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

// selectors for cell properties 
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let addressBar = document.querySelector(".address-bar");

// application of two way binding 
// attach property listeners
bold.addEventListener("click" , (e) => {
    let address = addressBar.ariaValueMax;
    activecell(address);
})

function activecell(address) {
   let [rid , cid] = decodeRIDCIDFromAddress(address);
//    access cell & storage object
   let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`); 
}

function decodeRIDCIDFromAddress(address){
    // address -> "A1"
    let rid = Number(address.slice(1) - 1);
    let cid = Number(String.charCodeAt(0)) - 65;
    return [rid , cid];
}

