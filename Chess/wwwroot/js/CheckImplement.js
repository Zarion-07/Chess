function check(piece) {
    const item = new Piece(piece);
    let moves = [];
    
    switch (item.pieceName) {
        case "WP":
            console.log(item.pieceName);
            if (item.row > 0) {

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
            
            return moves;
        
        case "BP":
            console.log(item.pieceName);
            if (item.row > 0) {
                
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
            
            return moves;
        
        case "WB":
            
        case "BB":
            console.log(item.pieceName);
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

                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        break;
                    };

                    if (pieceAtSquare[0] === item.oppColor && pieceAtSquare[1] !== "K") break;
                    
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

            return moves;

        case "WN":
            
        case "BN":
            console.log(item.pieceName);
            const iteration_Knight = [[1,2], [-1,2], [-1,-2], [1,-2], [2,-1], [2,1], [-2,-1], [-2,1]];

            const traversingNode_Knight = (rowDir, colDir) => {

                const target_row = item.row + rowDir;
                const target_col = item.col + colDir;

                if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) return;

                const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                if (!targetNode) return;

                const pieceAtSquare = targetNode.getAttribute("data-piece");

                if (!pieceAtSquare || pieceAtSquare[0] === item.color) {
                    let element = `${target_row}${target_col}`;
                    moves.push(element);
                }
            }

            iteration_Knight.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Knight(num1, num2);
            });

            return moves;
        
        case "WR":

        case "BR":
            console.log(item.pieceName);
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
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        break;
                    };

                    if (pieceAtSquare[0] === item.oppColor && pieceAtSquare[1] !== "K") break;
                    
                    dist++;
                }


            }

            iteration_Rook.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Rook(num1, num2);
            });

            return moves;
        
        case "WQ":

        case "BQ":
            console.log(item.pieceName);
            const iteration_Queen = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];

            const traversingNode_Queen = (rowDir, colDir) => {
                let dist = 1;

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
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        break;
                    };

                    if (pieceAtSquare[0] === item.oppColor && pieceAtSquare[1] !== "K") break;

                    dist++;
                }


            }

            iteration_Queen.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Queen(num1, num2);
            });

            return moves;

        case "BK":

        case "WK":
            console.log(item.pieceName);
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
                    
                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                    };
                }
            }

            iteration.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_King(num1, num2);
            });

            return moves;
    }
}

function pinCheck(piece) {
    const item = new Piece(piece);
    let moves = [];
    
    switch (item.pieceName) {
        case "WP":
            console.log(item.pieceName);
            if (item.row > 0) {
                if (item.row <= 7 && item.row > 0) {
                    let one = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col}"]`);
                    const pieceAtSquare = one.getAttribute("data-piece");
                    if (!pieceAtSquare) {
                        let element = `${item.row - 1}${item.col}`;
                        moves.push(element);
                    }
                }

                if (item.row === 7) {
                    let two = document.querySelector(`.square[data-row="${item.row - 2}"][data-col="${item.col}"]`);
                    if (two) {
                        const pieceAtSquare1 = two.getAttribute("data-piece");
                        if (!pieceAtSquare1) {
                            let element = `${item.row - 2}${item.col}`;
                            moves.push(element);
                        }
                    }
                }

                let left = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col - 1}"]`);
                let right = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col + 1}"]`);

                if (left) {
                    const leftPiece = left.getAttribute("data-piece");
                    if (leftPiece && leftPiece[0] === item.oppColor) {
                        let element = `${item.row - 1}${item.col - 1}`;
                        moves.push(element);
                    }
                }

                if (right) {
                    const rightPiece = right.getAttribute("data-piece");
                    if (rightPiece && rightPiece[0] === item.oppColor) {
                        let element = `${item.row - 1}${item.col + 1}`;
                        moves.push(element);
                    }
                }

                let data = currentFEN.split(" ")[3];
                let file = data[0];
                file = file.charCodeAt(0) - '`'.charCodeAt(0);
                let enPassantCol = parseInt(file);
                
                if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 4) {

                    let enPassantSq = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${enPassantCol}"]`);
                    const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                    
                    if (!pieceAtSquare3) {
                        let element = `${item.row - 1}${enPassantCol}`;
                        moves.push(element);
                    }
                }  
            }
            console.log(moves);
            return moves;
        
        case "BP":
            console.log(item.pieceName);
            if (item.row > 0) {
                if (item.row <= 7 && item.row > 0) {
                    let one = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col}"]`);
                    const pieceAtSquare = one.getAttribute("data-piece");
                    if (!pieceAtSquare) {
                        let element = `${item.row + 1}${item.col}`;
                        moves.push(element);
                    }
                }

                if (item.row === 7) {
                    let two = document.querySelector(`.square[data-row="${item.row - 2}"][data-col="${item.col}"]`);
                    if (two) {
                        const pieceAtSquare1 = two.getAttribute("data-piece");
                        if (!pieceAtSquare1) {
                            let element = `${item.row + 2}${item.col}`;
                            moves.push(element);
                        }
                    }
                }

                let left = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col - 1}"]`);
                let right = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col + 1}"]`);

                if (left) {
                    const leftPiece = left.getAttribute("data-piece");
                    if (leftPiece && leftPiece[0] === item.oppColor) {
                        let element = `${item.row + 1}${item.col - 1}`;
                        moves.push(element);
                    }
                }

                if (right) {
                    const rightPiece = right.getAttribute("data-piece");
                    if (rightPiece && rightPiece[0] === item.oppColor) {
                        let element = `${item.row + 1}${item.col + 1}`;
                        moves.push(element);
                    }
                }

                let data = currentFEN.split(" ")[3];
                let file = data[0];
                file = file.charCodeAt(0) - '`'.charCodeAt(0);
                let enPassantCol = parseInt(file);
                
                if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 4) {

                    let enPassantSq = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${enPassantCol}"]`);
                    const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                    
                    if (!pieceAtSquare3) {
                        let element = `${item.row + 1}${enPassantCol}`;
                        moves.push(element);
                    }
                }
            }
            console.log(moves);
            return moves;

        case "WN":
            
        case "BN":
            console.log(item.pieceName);
            const iteration_Knight = [[1,2], [-1,2], [-1,-2], [1,-2], [2,-1], [2,1], [-2,-1], [-2,1]];

            const traversingNode_Knight = (rowDir, colDir) => {

                const target_row = item.row + rowDir;
                const target_col = item.col + colDir;

                if (target_row < 1 || target_row > 8 || target_col < 1 || target_col > 8) return;

                const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);
                if (!targetNode) return;

                const pieceAtSquare = targetNode.getAttribute("data-piece");

                if (!pieceAtSquare || pieceAtSquare[0] === item.color) {
                    let element = `${target_row}${target_col}`;
                    moves.push(element);
                }
            }

            iteration_Knight.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Knight(num1, num2);
            });

            return moves;
        
        case "WR":

        case "BR":
            console.log(item.pieceName);
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
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        break;
                    };

                    if (pieceAtSquare[0] === item.oppColor && pieceAtSquare[1] !== "K") break;
                    
                    dist++;
                }


            }

            iteration_Rook.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Rook(num1, num2);
            });

            return moves;
        
        case "WQ":

        case "BQ":
            console.log(item.pieceName);
            const iteration_Queen = [[0,1], [0,-1], [1,0], [1,1], [1,-1], [-1,0], [-1,-1], [-1,1]];

            const traversingNode_Queen = (rowDir, colDir) => {
                let dist = 1;

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
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                        break;
                    };

                    if (pieceAtSquare[0] === item.oppColor && pieceAtSquare[1] !== "K") break;

                    dist++;
                }


            }

            iteration_Queen.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_Queen(num1, num2);
            });

            return moves;

        case "BK":

        case "WK":
            console.log(item.pieceName);
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
                    
                    if (pieceAtSquare[0] === item.color) {
                        let element = `${target_row}${target_col}`;
                        moves.push(element);
                    };
                }
            }

            iteration.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_King(num1, num2);
            });

            return moves;
    }
}