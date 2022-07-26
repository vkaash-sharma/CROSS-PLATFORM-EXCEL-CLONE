// storage -> 2D array[basic needed]
let collectedGraphComponent = [];
let graphComponentMatrix = [];
// for(let i = 0 ; i < rows ; i++) {
//     let row =[];
//     for(let j = 0 ; j < cols ; j++) {
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

// true->cylic , false -> not cylic
function isGraphCylic(graphComponentMatrix) {
// dependency ->visited , dfsVisited (2D array)

    let visited =[];
    let dfsVisited =[];

 
    for(let i = 0 ; i < rows ; i++ ) {
        let visitedRow =[];
        let dfsVisitedRow = [];
        for(let  j = 0 ; j< cols ; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    for(let i = 0 ; i < rows ; i++) {
        for(let j = 0 ;j < cols ; j++ ) {
            if(visited[i][j] === false) {
            let response = dfsCycleDetection(graphComponentMatrix , i , j , visited ,dfsVisited);            
            if(response == true) return [i , j];
        }
     } 
    }

  return null;
}
// start -> vis(true) dfsvis(true)
// end - > dfsvis(false)
// if vis[i][j] ==true ->already explored so go back no use to explore
// cycle detection condition ->if (vis[i][j] == true and dfsvis[i][j] == true) -> cycle 
function dfsCycleDetection(graphComponentMatrix , srcr , srcc , visited ,dfsVisited) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  for(let children = 0 ; children <graphComponentMatrix[srcr][srcc].length ; children++ ) {
    let [nbrr , nbrc] = graphComponentMatrix[srcr][srcc][children];
    if(visited[nbrr][nbrc] === false) {
        let response = dfsCycleDetection(graphComponentMatrix,nbrr,nbrc,visited,dfsVisited);
        if(response === true) return true;
    }
    else if(visited[nbrr][nbrc] === true && dfsVisited[nbrr][nbrc] === true)  {
          return true;
    }
  }



  dfsVisited[srcr][srcc] = false;
  return false;
}