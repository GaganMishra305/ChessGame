import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: string[];

    private moveCount: number;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
        this.moveCount = 0;

        this.player1.send(
            JSON.stringify({
                type: INIT_GAME,
                payload: {
                    color: "white"
                }
            })
        );

        this.player2.send(
            JSON.stringify({
                type: INIT_GAME,
                payload: {
                    color: "black"
                }
            })
        );
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }){
        try {
            this.board.move(move);
        }catch(e){
            console.log(e);
            return;
        }

        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === 'w' ? 'black' : 'white'
            })
            )
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === 'w' ? 'black' : 'white'
            })
            )
            return;
        }

        if(this.moveCount % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moveCount++;
    }
}