import {createStore} from 'vuex'
import {createTiles, startingPositions} from "@/store/helpers";

export default createStore({
    state: {
        gameID: 1,
        turn: 'white',
        moves: [],
        beatenPieces: [],
        pieces: [],
        tiles: []
    },
    mutations: {
        CREATE_BOARD(state, tiles) {
            state.tiles = tiles;
        },
        CREATE_PIECES(state, pieces) {
            state.pieces = pieces;
        },
        ADD_MOVE(state, moves) {
            state.moves = moves
        },
        ADD_MOVE_HIGHLIGHT(state, tiles) {
            state.tiles = tiles;
        },
        REMOVE_MOVE_HIGHLIGHT(state) {
            state.tiles.forEach((rank) => {
                rank.forEach(tile => tile.possibleMove = false)
            })

            this.state.pieces.forEach((piece) => {
                piece.selected = false;
            })
        },
        MOVE(state, targetTile) {
            let selectedPiece = state.pieces.find(p => p.selected);
            selectedPiece.position[0] = targetTile.rank
            selectedPiece.position[1] = targetTile.file //todo: file coordinates are kind of messy
            selectedPiece.moved = true;

            const notation = selectedPiece.type.notation + targetTile.notation;

            state.moves.push({
                id: state.moves.length + 1,
                player: state.turn,
                notation: notation
            });
        },
        SWITCH_TURN(state) {
            if (state.turn === "white") {
                state.turn = 'black'
            } else {
                state.turn = 'white'
            }
        }
    },
    actions: {
        newGame({commit}) {
            commit('CREATE_BOARD', createTiles());
            commit('CREATE_PIECES', startingPositions);
        },
        startTurn({commit}) {
            commit('ADD_MOVE_HIGHLIGHT', this.state.tiles)
        },
        removeMoveHighlight({commit}) {
            commit('REMOVE_MOVE_HIGHLIGHT');
        },
        showPawnMoves({commit}, piece) {
            commit('REMOVE_MOVE_HIGHLIGHT');
            piece.selected = true;

            let x = piece.position[0];
            let y = 7 - piece.position[1];

            // move forward
            if (piece.player == 'white') {
                this.state.tiles[y - 1][x].possibleMove = true;
            } else {
                this.state.tiles[y + 1][x].possibleMove = true;
            }

            /**
             * Check for Beatable Pieces
             */
            let enemyPieces = this.state.pieces.filter(p => p.player != piece.player && p.moved)
            enemyPieces.forEach(p => {
                let beatCondition1 = p.position[1] === piece.position[1] + 1;
                const beatCondition2 = p.position[0] === piece.position[0] + 1;
                const beatCondition3 = p.position[0] === piece.position[0] - 1;

                if (piece.player === 'black') {
                    beatCondition1 = p.position[1] === piece.position[1] - 1;
                }

                if (beatCondition1 && (beatCondition2 || beatCondition3)) {
                 console.log('BEAT');
                }
            });

            // first move for pawn is two fields
            if (!piece.moved) {
                if (piece.player == 'white') {
                    this.state.tiles[y - 2][x].possibleMove = true;
                } else {
                    this.state.tiles[y + 2][x].possibleMove = true;
                }
            }
        },
        move({commit}, tile) {
            commit('MOVE', tile);
            commit('SWITCH_TURN');
            commit('REMOVE_MOVE_HIGHLIGHT');
        }
    },
    getters: {
        turn: state => state.turn,
        moves: state => state.moves,
        beatenPieces: state => state.beatenPieces,
        pieces: state => state.pieces,
        tiles: state => state.tiles
    }
});
