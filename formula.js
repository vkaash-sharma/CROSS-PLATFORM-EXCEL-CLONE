for(let i = 0 ; i <  rows ; i++){
    for(let j = 0 ; j < cols ; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur" , (e) => {
            let address = addressBar.value;
            let [activeCell , cellProp] = activecell(address);
            let enteredData = activeCell.innerText;
            cellProp.value = enteredData;
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown" , (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){
        let evaluatedValue = evaluatedFormula(inputFormula);
        setCellUIAndCellProp(evaluatedValue , inputFormula);
    }
})

function evaluatedFormula(formula){
    return eval(formula);
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