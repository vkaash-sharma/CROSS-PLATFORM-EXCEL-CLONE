for(let i = 0 ; i <  rows ; i++){
    for(let j = 0 ; j < cols ; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur" , (e) => {
            let address = addressBar.value;
            let [activeCell , cellProp] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;
            if(enteredData === cellProp.value) return ;

            cellProp.value = enteredData;
            // if data modifies remove p c realtion formula empty update the children with hardcoded value
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown" , (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){
        // if change in formula , break old pc relation , evaluate new formula ,add new pc relation
        let address = addressBar.value;
        let [cell , cellProp] = getCellAndCellProp(address);
        if(inputFormula !== cellProp.formula){
            removeChildFromParent(cellProp.formula);
        }
        addChildToGraphComponent(inputFormula,address);
         
        // check if the cell is cyclic or not

        let isCyclic = isGraphCylic(graphComponentMatrix);

       if(isCyclic == true) {
        alert("Your Formula is Cyclic");
        removeChildFromGraphComponent(inputFormula , address);
        return;
       }

        let evaluatedValue = evaluatedFormula(inputFormula);

       
        // to update ui and cellprop db
        setCellUIAndCellProp(evaluatedValue , inputFormula , address);
        addChildToParent(inputFormula);
       console.log(sheetDB);
       updateChildrenCells(address);
    }
})

function addChildToGraphComponent(formula , childAddress) {
    let[crid , ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0 ;i < encodedFormula.length ; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90 ) {
            let [prid , pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid ,ccid]);
        }
    }
}

function removeChildFromGraphComponent(formula , childAddress) {
    let[crid , ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0 ;i < encodedFormula.length ; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <=90 ) {
            let [prid , pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();isGraphCylic
        }
    }
}





 
function updateChildrenCells(parentAddress) {
let [parentCell , parentcellProp] = getCellAndCellProp(parentAddress);
let children = parentcellProp.children;

for(let i = 0 ; i < children.length ; i++){
    let childAddress = children[i];
    let [childCell , childCellProp] = getCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluatedFormula(childFormula);
    setCellUIAndCellProp(evaluatedValue , childFormula , childAddress);
    updateChildrenCells(childAddress);
      
   }
}




function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let  i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentcell , parentcellProp] = getCellAndCellProp(encodedFormula[i]);
            parentcellProp.children.push(childAddress);
        }
    } 
}


 function removeChildFromParent (formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let  i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [parentcell , parentcellProp] = getCellAndCellProp(encodedFormula[i]);
           let idx = parentcellProp.children.indexOf(childAddress);
           parentcellProp.children.splice(idx , 1);
        }
    } 
 }




function evaluatedFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let  i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        // console.log(asciiValue);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell , cellProp] = getCellAndCellProp(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue , formula , address) {
    // let address = addressBar.value;
    let [cell , cellProp] = getCellAndCellProp(address);
    // ui updated
    cell.innerText = evaluatedValue;
    // database updated
    cellProp.value = evaluatedValue;
    cellProp.formula  = formula;
}


// NORMAL EXPRESSION WORK COMPLETED
