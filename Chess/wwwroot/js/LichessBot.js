class StockfishBot {
    constructor() {
        this.engine = new Worker('/js/stockfish.js');
        this.engineReady = false;
        this.onMoveCallback = null;

        this.engine.onmessage = (event) => {
            const line = event.data;
            console.log('Stockfish:', line);

            // Engine finished initializing
            if (line === 'readyok') {
                this.engineReady = true;
                console.log('Stockfish READY');
            }

            // Best move output
            if (line.startsWith('bestmove')) {
                const match = line.match(/bestmove\s([a-h][1-8][a-h][1-8])/);
                if (match && this.onMoveCallback) {
                    this.onMoveCallback(match[1]);
                }
            }
        };

        // Proper initialization sequence
        this.engine.postMessage('uci');
        this.engine.postMessage('isready');
    }

    getBestMove(fen, callback, depth = 10) {
        if (!this.engineReady) {
            console.warn('Engine not ready yet, skipping');
            return;
        }

        this.onMoveCallback = callback;

        this.engine.postMessage(`position fen ${fen}`);
        this.engine.postMessage(`go depth ${depth}`);
    }
    // Stop the engine
    stop() {
        this.engine.postMessage('stop');
    }
    
    // Terminate the engine
    quit() {
        this.engine.postMessage('quit');
        this.engine.terminate();
    }
}

let bot = new StockfishBot();

// Function to make bot move
function makeBotMove() {
    bot.getBestMove(currentFEN, (move) => {
        console.log('Bot wants to play:', move);
        
        // Parse the move (e.g., "e2e4")
        const fromCol = move[0].charCodeAt(0) - 96; // a=1, b=2, etc.
        const fromRow = 9 - parseInt(move[1]); // Convert to your board's row system
        const toCol = move[2].charCodeAt(0) - 96;
        const toRow = 9 - parseInt(move[3]);
        
        // Execute the move on your board
        const fromSquare = document.querySelector(
            `.square[data-row="${fromRow}"][data-col="${fromCol}"]`
        );
        const toSquare = document.querySelector(
            `.square[data-row="${toRow}"][data-col="${toCol}"]`
        );
        
        if (fromSquare && toSquare) {
            // First click to select piece
            play(fromSquare);
            
            // Second click to move
            setTimeout(() => {
                play(toSquare);
            }, 100);
        }
    }, 10); // depth 10 - adjust for difficulty
}

// Call this after player makes a move
function afterPlayerMove() {
    const currentPlayer = currentFEN.split(" ")[1];
    
    // If it's black's turn, make bot move
    if (currentPlayer === 'b') {
        setTimeout(() => {
            makeBotMove();
        }, 500); // Small delay for better UX
    }
}

function playBot(piece) {
    const item = new Piece(piece);
    const highlighted = document.querySelectorAll(".highlighted, .enemy, .highlightPiece");
    to_Play = currentFEN.split(" ")[1].toUpperCase();
    let moveMade = false;

    if (highlighted.length === 0 && (item.color === to_Play)) {
        console.log(item);
        if (!item.pieceName) return;
        
        if(item.pieceType === "K" && item.color === to_Play) {
            kingMove(item);
            return;
        } else {
            const dict = isPinned(item);
            console.log(dict);
            if(dict && dict.size == 1) {
                pinImplementation(dict, item, currentFEN);
                console.log(dict);
            } 
            
            else if(dict && dict.size >= 2) {
                return;
            }

            else {
                console.log(dict);
                if(CheckCase.testing === true) {
                    moves = pinCheck(piece);
                    console.log(CheckCase.possibleMoves);
                    const commonElements = moves.filter(value => CheckCase.possibleMoves.includes(value));
                    console.log(moves);
                    if(commonElements.length > 0) {
                        item.node.classList.add('highlightPiece');
                        commonElements.forEach(element => {
                            const node = document.querySelector(`.square[data-row="${element[0]}"][data-col="${element[1]}"]`);
                            const data = node.getAttribute("data-piece");
                            console.log(element);
                            if(data && data[0] === item.oppColor) {
                                node.classList.add('enemy');
                            } else {
                                node.classList.add('highlighted');
                            }
                        })
                    }
                } else {
                    Pieces(item, currentFEN);
                }
            }
        }
    } 
    
    else {
        const selected = document.querySelector(".highlightPiece");

        if(!selected) {
            console.log(item);
            document.querySelectorAll(".highlighted, .enemy")
                .forEach(sq => sq.classList.remove("highlighted", "enemy"));
            return;
        }
        
        const compare = new Piece(selected);
        console.log(item)
        if ((item.pieceName && item.node !== compare.node && item.color === to_Play)) {
            
            document.querySelectorAll(".highlighted, .highlightPiece, .enemy")
                .forEach(sq => sq.classList.remove("highlighted", "highlightPiece", "enemy"));
            
            if(item.pieceType === "K") {
                kingMove(item);
                return;
            } else {
                
                const dict = isPinned(item);

                if(dict && dict.size == 1 && CheckCase.testing === false) {
                    pinImplementation(dict, item, currentFEN);
                }
                
                else if(dict && dict.size >= 2) {
                    return;
                }

                else {
                    if(CheckCase.testing === true) {
                        moves = pinCheck(piece);
                        console.log(CheckCase.possibleMoves);
                        const commonElements = moves.filter(value => CheckCase.possibleMoves.includes(value));
                        console.log(moves);
                        if(commonElements.length > 0) {
                            item.node.classList.add('highlightPiece');
                            commonElements.forEach(element => {
                                const node = document.querySelector(`.square[data-row="${element[0]}"][data-col="${element[1]}"]`);
                                const data = node.getAttribute("data-piece");
                                console.log(element);
                                if(data && data[0] === item.oppColor) {
                                    node.classList.add('enemy');
                                } else {
                                    node.classList.add('highlighted');
                                }
                            })
                        }
                    } else {
                        Pieces(item, currentFEN);
                    }
                }
            }
        } 

        else if(item.node === compare.node) {
            document.querySelectorAll(".highlighted, .enemy, .highlightPiece")
                .forEach(sq => sq.classList.remove("highlighted", "enemy", "highlightPiece"));
            return;
        }
        
        // THIS IS THE ACTUAL MOVE EXECUTION BLOCK (was missing!)
        else {
            const newFEN = Move(item, currentFEN);
            moveMade = true;
            
            // Reset check state
            if(CheckCase.testing === true) CheckCase.testing = false;
            CheckCase.checked = false;
            CheckCase.possibleMoves = [];
            CheckCase.kingMoves = [];
            CheckCase.node = [];
            
            const destinationSquare = document.querySelector(
                `.square[data-row="${item.row}"][data-col="${item.col}"]`
            );
            const movedPiece = new Piece(destinationSquare);

            console.log(movedPiece);
            inCheck(movedPiece);
            console.log(CheckCase);
            
            if (newFEN) {
                currentFEN = newFEN;
                
                // Check for checkmate after move
                if(CheckCase.checked === true) {
                    const possibleMoves = isCheckmated(movedPiece);
                    console.log(possibleMoves);
                    if(possibleMoves) CheckCase.checkmated = false;
                    else CheckCase.checkmated = true;
                }
                
                // TRIGGER BOT HERE
                triggerBotIfNeeded();
            }
        }
    }
}

function triggerBotIfNeeded() {
    const currentPlayer = currentFEN.split(" ")[1];
    
    // If black to move and bot plays black
    if (currentPlayer === 'b' && !CheckCase.checkmated) {
        setTimeout(() => {
            makeBotMove();
        }, 500); // Delay for better UX
    }
}