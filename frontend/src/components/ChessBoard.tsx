import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({chess, board, setBoard, socket} : {
    chess: any;
    setBoard: any;
    board : ({
                square: Square;
                type: PieceSymbol;
                color: Color;
            } | null)[][],
    socket: WebSocket;
}) => {
    const [from, setFrom] = useState<Square | null>(null);

    // Helper to display piece symbol in correct case
    const getDisplayPiece = (type: PieceSymbol, color: Color) => {
        return color === "w" ? type.toUpperCase() : type.toLowerCase();
    };

    return (
        <div className="text-whit-200 flex">
            <div className="grid grid-cols-8">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const squareRep = String.fromCharCode(97 + colIndex) + (8 - rowIndex) as Square;

                        return (
                            <div
                                onClick={() => {
                                    if (!from) {
                                        setFrom(cell?.square || null);
                                    } else {
                                        socket.send(JSON.stringify({
                                            type: "move",
                                            move: {
                                                from,
                                                to: squareRep
                                            }
                                        }));
                                        setFrom(null);
                                        chess.move({
                                            from,
                                            to: squareRep
                                        });
                                        setBoard(chess.board());
                                        console.log("Move made from", from, "to", squareRep);
                                    }
                                }}
                                key={`${rowIndex}-${colIndex}`}
                                className={`w-16 h-16 flex items-center justify-center ${((rowIndex + colIndex) % 2 === 0) ? 'bg-green-500' : 'bg-white'}`}
                            >
                                {cell ? (
                                    <span className={`text-${cell.color} text-xl`}>
                                        {getDisplayPiece(cell.type, cell.color)}
                                    </span>
                                ) : null}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    )
}