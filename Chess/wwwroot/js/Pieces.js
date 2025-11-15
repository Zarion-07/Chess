
function Pieces(item, currentFEN) {
    
    document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
        .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));
    
    const piece = document.querySelector(`.square[data-row="${item.row}"][data-col="${item.col}"]`);
    console.log(currentFEN);
    item.node.classList.add('highlightPiece');

    const opp_Color = (item.color === "W") ? "B" : "W";

    switch (item.pieceName) {

        case "WP":
            if (item.row > 0) {
                
                const dest = item.row - 1;
                if (item.row <= 7 && item.row > 0) {
                    let one = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col}"]`);
                    const pieceAtSquare = one.getAttribute("data-piece");
                    if (!pieceAtSquare) {
                        one.classList.add('highlighted');
                    }
                }

                if (item.row === 7) {
                    let two = document.querySelector(`.square[data-row="${item.row - 2}"][data-col="${item.col}"]`);
                    if (two) {
                        const pieceAtSquare1 = two.getAttribute("data-piece");
                        if (!pieceAtSquare1) {
                            two.classList.add('highlighted');
                        }
                    }
                }

                let left = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col - 1}"]`);
                let right = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${item.col + 1}"]`);

                if (left) {
                    const leftPiece = left.getAttribute("data-piece");
                    if (leftPiece && leftPiece[0] === "B") {
                        left.classList.add('enemy');
                    }
                }

                if (right) {
                    const rightPiece = right.getAttribute("data-piece");
                    if (rightPiece && rightPiece[0] === "B") {
                        right.classList.add('enemy');
                    }
                }

                let data = currentFEN.split(" ")[3];
                let file = data[0];
                file = file.charCodeAt(0) - '`'.charCodeAt(0);
                let enPassantCol = parseInt(file);
                
                if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 4) {


                    console.log(enPassantCol);

                    let enPassantSq = document.querySelector(`.square[data-row="${item.row - 1}"][data-col="${enPassantCol}"]`);
                    const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                    console.log(pieceAtSquare3);
                    if (!pieceAtSquare3) {
                        enPassantSq.classList.add('enemy');
                    }
                }
            }
            break;
        
        case "BP":
            if (item.row > 0) {
            
                if (item.row <= 7 && item.row > 0) {
                    let one = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col}"]`);
                    const pieceAtSquare = one.getAttribute("data-piece");
                    if (!pieceAtSquare) {
                        one.classList.add('highlighted');
                    }
                }

                if (item.row === 2) {
                    let two = document.querySelector(`.square[data-row="${item.row + 2}"][data-col="${item.col}"]`);
                    const pieceAtSquare1 = two.getAttribute("data-piece");
                    if (!pieceAtSquare1) {
                        two.classList.add('highlighted');
                    }
                }

                let left = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col - 1}"]`);
                let right = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${item.col + 1}"]`);

                if (left) {
                    const leftPiece = left.getAttribute("data-piece");
                    if (leftPiece && leftPiece[0] === "W") {
                        left.classList.add('enemy');
                    }
                }

                if (right) {
                    const rightPiece = right.getAttribute("data-piece");
                    if (rightPiece && rightPiece[0] === "W") {
                        right.classList.add('enemy');
                    }
                }

                let data = currentFEN.split(" ")[3];
                let file = data[0];
                file = file.charCodeAt(0) - '`'.charCodeAt(0);
                let enPassantCol = parseInt(file) ;
                console.log(enPassantCol);
                if (data != "-" && (Math.abs(enPassantCol - item.col) === 1) && item.row === 5) {

                    let enPassantSq = document.querySelector(`.square[data-row="${item.row + 1}"][data-col="${enPassantCol}"]`);
                    const pieceAtSquare3 = enPassantSq.getAttribute("data-piece");
                    console.log(pieceAtSquare3);
                    if (!pieceAtSquare3) {
                        enPassantSq.classList.add('enemy');
                    }
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
                    if (!pieceAtSquare) {
                        targetNode.classList.add('highlighted');
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) break;

                    if (pieceAtSquare[0] === item.oppColor) {
                        targetNode.classList.add('enemy');
                        break;
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
                    targetNode.classList.add('highlighted');
                }

                else if (pieceAtSquare[0] === item.oppColor) {
                    targetNode.classList.add('enemy');
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
                        targetNode.classList.add('highlighted');
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) break;

                    if (pieceAtSquare[0] === item.oppColor) {
                        targetNode.classList.add('enemy');
                        break;
                    }
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
                        targetNode.classList.add('highlighted');
                        dist++;
                        continue;
                    }

                    if (pieceAtSquare[0] === item.color) break;

                    if (pieceAtSquare[0] === item.oppColor) {
                        targetNode.classList.add('enemy');
                        break;
                    }
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
            const traversingNode_King = (rowDir,colDir) => {
                
                const target_col = item.col + colDir;
                const target_row = item.row + rowDir;

                const targetNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col}"]`);

                if (targetNode) {
                    const pieceAtSquare = targetNode.getAttribute("data-piece");

                    if(!pieceAtSquare) {
                        targetNode.classList.add('highlighted');

                        if (rowDir === 0 && colDir === 1) {
                            castlingNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col + 1}"]`);
                            const pieceAtQSquare = CastlingNode.getAttribute("data-piece");

                            if(!pieceAtQSquare) {
                                castlingNode.classList.add('enemy');
                            }
                        }

                        else if (rowDir === 0 && colDir === -1) {
                            castlingNode = document.querySelector(`.square[data-row="${target_row}"][data-col="${target_col - 1}"]`);

                        }
                    }
                    else if(pieceAtSquare[0] === opp_Color) {
                        targetNode.classList.add('enemy');
                    }
                }

                
            }

            iteration.forEach(pair => {
                const num1 = pair[0];
                const num2 = pair[1];
                traversingNode_King(num1, num2);
            });

            break;
    }
}

function Move(square, currentFEN) {
    let avail = false;

    document.querySelectorAll(".highlighted, .enemy").forEach(sq => {
        if (
            square.row === parseInt(sq.getAttribute("data-row")) &&
            square.col === parseInt(sq.getAttribute("data-col"))
        ) {
            avail = true;
        }
    });

    if (avail) {
        const shooter = document.querySelector(".highlightPiece");
        var origin = new Piece(shooter);

        shooter.setAttribute("data-piece", "");
        shooter.innerHTML = "";

        
        if (origin.pieceType === "P") {

            const enPassant_Move = currentFEN.split(" ")[3];

            col = enPassant_Move[0].charCodeAt(0) - '`'.charCodeAt(0);
            enPassantCol = parseInt(col);
            enPassantRow = parseInt(enPassant_Move[1]);
            
            if (enPassantCol === square.col && (Math.abs(enPassantRow - origin.row) === 1) && (Math.abs(enPassantCol - square.col) === 1) && !(enPassant_Move === "-")) {

                enPassantNode = document.querySelector(`.square[data-row="${enPassantRow}"][data-col="${enPassantCol}"]`);
                enPassantNode.setAttribute("data-piece", "");
                enPassantNode.innerHTML = "";
            }
        }

        const parts = currentFEN.split(" ");
        let castling = parts[2].split("");

        if (origin.pieceType === "R" && (castling[0] === "K" || castling[3] === "q") && origin.col === 8) {
            if (origin.color === "W") {
                castling[0] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else {
                castling[3] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
        }

        if (origin.pieceType === "R" && (castling[1] === "Q" || castling[2] === "k") && origin.col === 1) {
            if (origin.color === "W") {
                castling[1] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else {
                castling[2] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
        }

        if (origin.pieceName === "WK" && (castling[0] === "K" || castling[1] === "Q")) {

            const Qnode = document.querySelector(`.enemy[data-row="8"][data-col="3"]`);
            const Knode = document.querySelector(`.enemy[data-row="8"][data-col="7"]`);

            if (Qnode && square.col === 3) {
                
                currentRook = document.querySelector(`[data-row="8"][data-col="1"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="8"][data-col="4"]`);
                newRook.innerHTML = `<img src="/Images/${WR}.png" alt="${WR}" />`;
                newRook.setAttribute("data-piece", "WR");

                castling[0] = "-";
                castling[1] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else if (Knode && square.col === 7) {

                currentRook = document.querySelector(`[data-row="8"][data-col="8"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="8"][data-col="6"]`);
                newRook.innerHTML = `<img src="/Images/${WR}.png" alt="${WR}" />`;
                newRook.setAttribute("data-piece", "WR");

                castling[0] = "-";
                castling[1] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
        }

        if(origin.pieceName === "BK" && (castling[2] === "k" || castling[3] === "q")) {

            const Qnode = document.querySelector(`.enemy[data-row="1"][data-col="3"]`);
            const Knode = document.querySelector(`.enemy[data-row="1"][data-col="7"]`);

            if (Qnode && square.col === 3) {
                
                currentRook = document.querySelector(`[data-row="1"][data-col="1"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="1"][data-col="4"]`);
                newRook.innerHTML = `<img src="/Images/${BR}.png" alt="${BR}" />`;
                newRook.setAttribute("data-piece", "BR");

                castling[2] = "-";
                castling[3] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }

            else if (Knode && square.col === 7) {

                currentRook = document.querySelector(`[data-row="1"][data-col="8"]`);
                currentRook.setAttribute("data-piece", "");
                currentRook.innerHTML = "";

                newRook = document.querySelector(`[data-row="1"][data-col="6"]`);
                newRook.innerHTML = `<img src="/Images/${BR}.png" alt="${BR}" />`;
                newRook.setAttribute("data-piece", "BR");

                castling[2] = "-";
                castling[3] = "-";
                parts[2] = castling.join("");
                currentFEN = parts.join(" ");
            }
        }

        square.node.innerHTML = `<img src="/Images/${origin.pieceName}.png" alt="${origin.pieceName}" />`;
        square.node.setAttribute("data-piece", origin.pieceName);

        document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
            .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));

        let newFEN = ManipulateFen(origin, square, currentFEN);
        
        return newFEN;
        
    }

    
    document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
        .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));
}

