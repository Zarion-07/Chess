function isPinned(piece) {
    const oppColor = (piece.color === "W") ? "B" : "W";
    const oppBishop = document.querySelector(`.square[data-piece=${oppColor}B]`);
    const oppRook = document.querySelector(`.square[data-piece=${oppColor}R]`);
    const oppQueen = document.querySelector(`.square[data-piece=${oppColor}Q]`);

    let array = [];

    if (oppBishop) {

        oppBishop.forEach(element => {
            const iteration_Bishop = [[1,-1], [1,1], [-1,-1], [-1,1]];

            const traversingNode_Bishop = (rowDir, colDir) => {
                dist = 1;

                let count = 0;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;

                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) break;
                    
                    const square_node = document.querySelector(`.square[data-row=${target_row}][data-col=${target_col}]`);
                    const piecedata = square_node.dataset.piece;
                    if (piecedata[0] === piece.color) {
                        count += 1;
                    }

                    if (piecedata[1] === "K" && count === 2) {
                        array.push(element);
                        break;
                    }
                }

            }

            iteration_Bishop.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Bishop(num1, num2);
            })
        });
    }

    if (oppRook) {
        oppRook.forEach( rook => {
            const iteration_Rook = [[1,0], [0,1], [-1,0], [0,-1]];

            const traversingNode_Rook = (rowDir, colDir) => {
                dist = 1;

                let count = 0;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;

                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) break;
                    
                    const square_node = document.querySelector(`.square[data-row=${target_row}][data-col=${target_col}]`);
                    const piecedata = square_node.dataset.piece;
                    if (piecedata[0] === piece.color) {
                        count += 1;
                    }

                    if (piecedata[1] === "K" && count === 2) {
                        array.push(rook);
                        break;
                    }
                }


            }

            iteration_Rook.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Rook(num1, num2);
            })
        })
    }

    if (oppQueen) {
        oppQueen.forEach( queen => {
            const iteration_Rook = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];

            const traversingNode_Queen = (rowDir, colDir) => {
                dist = 1;

                let count = 0;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;

                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) break;
                    
                    const square_node = document.querySelector(`.square[data-row=${target_row}][data-col=${target_col}]`);
                    const piecedata = square_node.dataset.piece;
                    if (piecedata[0] === piece.color) {
                        count += 1;
                    }

                    if (piecedata[1] === "K" && count === 2) {
                        array.push(queen);
                        break;
                    }
                }


            }

            iteration_Rook.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Queen(num1, num2);
            })
        })
    }

    return array;
}