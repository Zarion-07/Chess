function isPinned(piece) {
    const oppBishop = document.querySelectorAll(`.square[data-piece="${piece.oppColor}B"]`);
    const oppRook = document.querySelectorAll(`.square[data-piece="${piece.oppColor}R"]`);
    const oppQueen = document.querySelectorAll(`.square[data-piece="${piece.oppColor}Q"]`);

    const pinMap = new Map();

    if (oppBishop) {
        oppBishop.forEach(element => {

            const iteration_Bishop = [[1,-1], [1,1], [-1,-1], [-1,1]];
            const item = new Piece(element);

            const traversingNode_Bishop = (rowDir, colDir) => {
                let dist = 1;
                let foundPiece = false;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;
                
                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) {
                        break;
                    }

                    const square_node = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                    const square = new Piece(square_node);
                    
                    if (square.color === piece.oppColor) {
                        break;
                    }

                    if (square.color === piece.color && square.node !== piece.node && square.pieceType !== "K") {
                        break;
                    }
                
                    if (square.node === piece.node) {
                        foundPiece = true;
                    }
                
                    if (square.pieceType === "K" && square.color === piece.color && foundPiece) {
                        const array = [rowDir, colDir];
                        pinMap.set(element, array);
                        break;
                    }
                
                    dist++;
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
        oppRook.forEach( element => {
            const iteration_Rook = [[1,0], [0,1], [-1,0], [0,-1]];
            const item = new Piece(element);

            const traversingNode_Rook = (rowDir, colDir) => {
                let dist = 1;
                let foundPiece = false;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;
                
                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) {
                        console.log("Out of bounds");
                        break;
                    }

                    const square_node = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                    const square = new Piece(square_node);
                    
                    if (square.color === piece.oppColor) {
                        console.log("Hit opponent piece");
                        break;
                    }

                    if (square.color === piece.color && square.node !== piece.node && square.pieceType !== "K") {
                        console.log("Hit our piece (not target or king)");
                        break;
                    }
                
                    if (square.node === piece.node) {
                        console.log("FOUND TARGET PIECE!");
                        foundPiece = true;
                    }
                
                    if (square.pieceType === "K" && square.color === piece.color && foundPiece) {
                        const array = [rowDir, colDir];
                        pinMap.set(element, array);
                        console.log("Pin detected:", pinMap);
                        break;
                    }
                    dist++;
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
        oppQueen.forEach( element => {
            const iteration_Queen = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];
            const item = new Piece(element);

            const traversingNode_Queen = (rowDir, colDir) => {
                let dist = 1;
                let foundPiece = false;

                while(true) {
                    const target_row = item.row + rowDir*dist;
                    const target_col = item.col + colDir*dist;
                
                    if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) {
                        console.log("Out of bounds");
                        break;
                    }

                    const square_node = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                    const square = new Piece(square_node);
                    
                    if (square.color === piece.oppColor) {
                        console.log("Hit opponent piece");
                        break;
                    }

                    if (square.color === piece.color && square.node !== piece.node && square.pieceType !== "K") {
                        console.log("Hit our piece (not target or king)");
                        break;
                    }
                
                    if (square.node === piece.node) {
                        console.log("FOUND TARGET PIECE!");
                        foundPiece = true;
                    }
                
                    if (square.pieceType === "K" && square.color === piece.color && foundPiece) {
                        const array = [rowDir, colDir];
                        pinMap.set(element, array);
                        console.log("Pin detected:", pinMap);
                        break;
                    }
                
                    dist++;
                }
            }

            iteration_Queen.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Queen(num1, num2);
            })
        })
    } 

    return pinMap;
}

function kingMove(piece) {
    if (!piece) return console.log("empty");

    const kingMoves = [];
    const iteration = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];

    const traversingNode_King = (rowDir, colDir) => {
        const target_col = piece.col + colDir;
        const target_row = piece.row + rowDir;
    
        const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
    
        if (targetNode) {
            const pieceAtSquare = targetNode.getAttribute("data-piece");
        
            if (!pieceAtSquare) {
                let element = `${target_row}${target_col}`;
                kingMoves.push(element);

                if (rowDir === 0 && colDir === 1) {

                    const castlingRights = currentFEN.split(" ")[2];
                    const canCastle = piece.color === "W" ? castlingRights.includes("K") : castlingRights.includes("k");

                    if (canCastle) {
                        const castlingNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col + 1}"]`);
                        if (castlingNode) {
                            const pieceAtCastling = castlingNode.getAttribute("data-piece");
                            if (!pieceAtCastling) {
                                // Verify rook exists
                                const rookSquare = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col + 2}"]`);
                                const rookPiece = rookSquare?.getAttribute("data-piece");
                                if (rookPiece && rookPiece[0] === piece.color && rookPiece[1] === "R") {
                                    let element = `${target_row}${target_col + 1}`;
                                    kingMoves.push(element);
                                }
                            }
                        }
                    }
                }

                else if (rowDir === 0 && colDir === -1) {
                    const castlingRights = currentFEN.split(" ")[2];
                    const canCastle = piece.color === "W" ? castlingRights.includes("Q") : castlingRights.includes("q");

                    if (canCastle) {
                        const castlingNode1 = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col - 1}"]`);

                        if (castlingNode1) {
                            const pieceAtCastling1 = castlingNode1.getAttribute("data-piece");

                            if (!pieceAtCastling1) {
                                const castlingNode2 = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col - 2}"]`);
                                const pieceAtCastling2 = castlingNode2?.getAttribute("data-piece");

                                if (!pieceAtCastling2) {
                                    // Verify rook exists
                                    const rookSquare = document.querySelector(`.square[data-row="${target_row}"][data-col="1"]`);
                                    const rookPiece = rookSquare?.getAttribute("data-piece");

                                    if (rookPiece && rookPiece[0] === piece.color && rookPiece[1] === "R") {
                                        let element = `${target_row}${target_col - 1}`;
                                        kingMoves.push(element);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(pieceAtSquare[0] === piece.oppColor) {
                let element = `${target_row}${target_col}`;
                kingMoves.push(element);
            }
        }
    }

    iteration.forEach(pair => {
        const num1 = pair[0];
        const num2 = pair[1];
        traversingNode_King(num1, num2);
    });
    
    const oppPieces = document.querySelectorAll(`.square[data-piece^="${piece.oppColor}"]`);
    console.log(oppPieces);
    oppPieces.forEach(oppPiece => {
        const array = check(oppPiece);
        
        if(array) {
            array.forEach(element => {
            if (kingMoves.includes(element)) {  
                const index = kingMoves.indexOf(element);
                if (index !== -1) {
                    kingMoves.splice(index, 1);
                }
            }
        });
        }
    })

    kingPlace(kingMoves, piece);
    return kingMoves;
}

function kingPlace(kingMoves, piece) {
    if(kingMoves) {
        console.log(kingMoves);
        kingMoves.forEach(element => {
            const node = document.querySelector(`.square[data-row="${element[0]}"][data-col="${element[1]}"]`);
            const data = node.getAttribute("data-piece");

            if(data[0] === piece.oppColor) {
                node.classList.add('enemy');
            }

            else if (element === "83" || element === "13"){
                console.log(kingMoves);
                if(kingMoves.includes("84") || kingMoves.includes("14")) {
                    console.log(kingMoves);
                    node.classList.add('enemy');
                }
            }

            else if (element === "87" || element === "17"){
                console.log(kingMoves);
                if(kingMoves.includes("86") || kingMoves.includes("16")) {
                    console.log(kingMoves);
                    node.classList.add('enemy');
                }
            }

            else {
                node.classList.add('highlighted');
            }
        })
    }
    piece.node.classList.add('highlightPiece');
}