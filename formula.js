for(let i = 0 ; i <  rows ; i++){
    for(let j = 0 ; j < cols ; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur" , (e) => {
            let address = addressBar.value;
            let [activeCell , cellProp] = getCellAndCellProp(address);
            let enteredData = activeCell.innerText;
            cellProp.value = enteredData;
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
        let evaluatedValue = evaluatedFormula(inputFormula);


        // to update ui and cellprop db
        setCellUIAndCellProp(evaluatedValue , inputFormula);
        addChildToParent(inputFormula);
       console.log(sheetDB);
    }
})

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

function setCellUIAndCellProp(evaluatedValue , formula){
    let address = addressBar.value;
    let [cell , cellProp] = getCellAndCellProp(address);
    // ui updated
    cell.innerText = evaluatedValue;
    // database updated
    cellProp.value = evaluatedValue;
    cellProp.formula  = formula;
}


// NORMAL EXPRESSION WORK COMPLETED
