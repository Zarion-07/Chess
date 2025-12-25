    
    let moves = [];
    
    switch (item.pieceName) {
        case "WP":
            if (item.row > 0) {
                
                if (item.row <= 7 && item.row > 0) {
                    let element = `${item.row - 1}${item.col}`;
                    moves.push(element);
                }

                let left = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col - 1}"]`);
                let right = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col + 1}"]`);

                if (left) {
                    let element = `${item.row - 1}${item.col - 1}`;
                    moves.push(element);
                }

                if (right) {
                    let element = `${item.row - 1}${item.col + 1}`;
                    moves.push(element);
                }
            }
            
            break;
        
        case "BP":
            if (item.row > 0) {
                
                if (item.row <= 7 && item.row > 0) {
                    let element = `${item.row + 1}${item.col}`;
                    moves.push(element);
                }

                let left = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col - 1}"]`);
                let right = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col + 1}"]`);

                if (left) {
                    let element = `${item.row + 1}${item.col - 1}`;
                    moves.push(element);
                }

                if (right) {
                    let element = `${item.row + 1}${item.col + 1}`;
                    moves.push(element);
                }
            }
            
            break;
        
        case "WB":
            
        case "BB":
            const iteration_Bishop = [[1,-1], [1,1], [-1,-1], [-1,1]];
            const traversingNode_Bishop = (rowDir, colDir) => {
                dist = 1;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;

                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) break;

                    const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                    if (!targetNode) break;
                
                    const pieceAtSquare = targetNode.getAttribute("data-piece");
                    console.log(pieceAtSquare);

                    if (pieceAtSquare[0] === item.color) break;
                    if (pieceAtSquare[0] === item.oppColor) break;
                    
                    if (!pieceAtSquare) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                    }
                    dist++;
                }
            }

            iteration_Bishop.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Bishop(num1, num2);
            });

            break;

        case "WN":
            
        case "BN":
            const iteration_Knight = [[1,2], [-1,2], [-1,-2], [1,-2], [2,-1], [2,1], [-2,-1], [-2,1]];

            const traversingNode_Knight = (rowDir, colDir) => {

                const target_row = item.row + rowDir;
                const target_col = item.col + colDir;

                if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) return;

                const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                if (!targetNode) return;

                const pieceAtSquare = targetNode.getAttribute("data-piece");

                if (!pieceAtSquare) {
                    let element = `${target_row}${target_col}`;
                    moves.push(element);
                }
            }

            iteration_Knight.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Knight(num1, num2);
            });

            break;
        
        case "WR":

        case "BR":
            const iteration_Rook = [[1,0], [0,1], [-1,0], [0,-1]];

            const traversingNode_Rook = (rowDir, colDir) => {
                dist = 1;

                while(true) {

                    target_row = item.row + rowDir*dist;
                    target_col = item.col + colDir*dist;

                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) break;

                    const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                    if (!targetNode) break;
                
                    const pieceAtSquare = targetNode.getAttribute("data-piece");
                    
                    if (!pieceAtSquare) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) break;
                    if (pieceAtSquare[0] === item.oppColor) break;
                    
                    dist++;
                }


            }

            iteration_Rook.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Rook(num1, num2);
            });

            break;
        
        case "WQ":

        case "BQ":

            const iteration_Queen = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];

            const traversingNode_Queen = (rowDir, colDir) => {
                dist = 1;

                while(true) {

                    target_row = item.row + rowDir*dist;
                    target_col = item.col + colDir*dist;

                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) break;

                    const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                    if (!targetNode) break;
                
                    const pieceAtSquare = targetNode.getAttribute("data-piece");
                    
                    if (!pieceAtSquare) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) break;
                    if (pieceAtSquare[0] === item.oppColor) break;

                    dist++;
                }


            }

            iteration_Queen.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Queen(num1, num2);
            });

            break;

        case "BK":

        case "WK":

            const iteration = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];
            const traversingNode_King = (rowDir, colDir) => {

                const target_col = item.col + colDir;
                const target_row = item.row + rowDir;
            
                const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
            
                if (targetNode) {
                    const pieceAtSquare = targetNode.getAttribute("data-piece");
                
                    if (!pieceAtSquare) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                    }
                }
            }

            iteration.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_King(num1, num2);
            });
    }