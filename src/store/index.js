//TODO Refactor selected piece in state instead looping for it?
import {createStore} from 'vuex'
import {createTiles, startingPositions, isTileOutsideBoard} from "@/store/helpers";
import {getDiagonals, getStraights} from "@/store/moves";

const store = createStore({
    state: {
        gameID: 1,
        turn: 'white',
        moves: [],
        selectedPiece: {},
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

            pieces.forEach(p => {
                let y = p.position[0];
                let x = p.position[1];
                state.tiles[y][x].current = p;
            })
        },

        ADD_MOVE(state, moves) {
            state.moves = moves
        },

        MARK_POSSIBLE_MOVE(state, position) {
            let y = position[0]
            let x = position[1]

            state.tiles[y][x].possibleMove = true;

            if (state.tiles[y][x].current) {
                state.tiles[y][x].current.possibleBeat = true;
            }
        },

        REMOVE_TILE_HIGHLIGHTS(state) {
            state.tiles.forEach((rank) => {
                rank.forEach(tile => {
                    tile.possibleMove = false

                    if (tile.current) {
                        tile.current.possibleBeat = false
                    }
                })
            })
        },

        SELECT_PIECE(state, piece) {
            state.selectedPiece = {}
            state.selectedPiece = state.pieces.find(p => p.id === piece.id);
        },

        DESELECT_PIECE(state) {
            state.pieces.forEach((piece) => {
                piece.selected = false;
            })
        },

        MOVE_PIECE(state, tile) {
            let y = state.selectedPiece.position[0];
            let x = state.selectedPiece.position[1];
            state.tiles[y][x].current = null;

            if (tile.current) {
                const index = state.pieces.findIndex(p => p.id === tile.current.id)

                tile.current.beaten = true
                state.pieces.splice(index, 1);
                state.beatenPieces.push(tile.current)
            }

            state.tiles[tile.y][tile.x].current = state.selectedPiece;
            state.selectedPiece.position[0] = tile.y
            state.selectedPiece.position[1] = tile.x
            state.selectedPiece.moved = true;

            const notation = state.selectedPiece.type.notation + tile.notation;

            state.moves.push({
                id: state.moves.length + 1,
                player: state.turn,
                notation: notation
            });
        },

        BEAT_PIECE(state, piece) {
            const index = this.state.pieces.findIndex(p => p.id === piece.id)
            state.pieces.splice(index, 1);
            piece.beaten = true;
            state.beatenPieces.push(piece);
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
        removeTileHighlight({commit}) {
            commit('REMOVE_TILE_HIGHLIGHTS');
        },
        selectPiece({commit}, piece) {
            commit('SELECT_PIECE', piece);
        },
        deselectPieces({commit}) {
            commit('DESELECT_PIECE');
        },
        move({commit, dispatch}, piece) {
            commit('REMOVE_TILE_HIGHLIGHTS');
            commit('DESELECT_PIECE');
            commit('SELECT_PIECE', piece);

            switch (piece.type.name) {
                case 'Pawn':
                    dispatch('pawnMove', piece.position);
                    break;
                case 'Knight':
                    dispatch('knightMove', piece.position);
                    break;
                case 'Bishop':
                    dispatch('bishopMove', piece.position);
                    break;
                case 'Rook':
                    dispatch('rookMove', piece.position);
                    break;
                case 'Queen':
                    dispatch('queenMove', piece.position);
                    break;
            }
        },
        pawnMove({commit}, pos) {
            let piece = this.state.selectedPiece;
            let pawnMoves = []

            let y = pos[0];
            let x = pos[1];

            /**
             * Base Move, One Forward
             */
            if (piece.player === 'white') {
                pawnMoves.push([y - 1, x]);

            } else {
                pawnMoves.push([y + 1, x]);
            }

            /**
             * Possible Two Field Move
             */
            if (!piece.moved) {
                if (piece.player === 'white') {
                    pawnMoves.push([y - 2, x]);
                } else {
                    pawnMoves.push([y + 2, x]);
                }
            }
            /**
             * Check for Beatable Pieces
             * TODO: This is not nice
             */
            let enemyPieces = this.state.pieces.filter(p => p.player !== piece.player && p.moved)
            enemyPieces.forEach(enemyPiece => {
                let beatCondition1 = enemyPiece.position[0] === piece.position[0] - 1;
                let beatCondition2 = enemyPiece.position[1] === piece.position[1] + 1;
                let beatCondition3 = enemyPiece.position[1] === piece.position[1] - 1;

                if (piece.player === 'black') {
                    beatCondition1 = enemyPiece.position[0] === piece.position[0] + 1;
                }

                if (beatCondition1 && (beatCondition2 || beatCondition3)) {
                    this.state.tiles[enemyPiece.position[0]][enemyPiece.position[1]].possibleMove = true;
                }
            });

            pawnMoves.forEach(position => {
                commit('MARK_POSSIBLE_MOVE', position);
            })
        },
        knightMove({commit}, pos) {
            let y = pos[0];
            let x = pos[1];

            /**
             * All Possible Knight Jumps
             */
            let knightMoves = [
                [y + 2, x + 1],
                [y + 2, x - 1],
                [y - 2, x + 1],
                [y - 2, x - 1],
                [y + 1, x + 2],
                [y + 1, x - 2],
                [y - 1, x + 2],
                [y - 1, x - 2],
            ];

            /**
             * Check for Bounds
             */
            knightMoves = knightMoves.filter(position => !isTileOutsideBoard(position[0], position[1]));

            /**
             * Check for Own Pieces
             */
            knightMoves = knightMoves.filter(position => {
                const y = position[0];
                const x = position[1];

                if (this.state.tiles[y][x].current) {
                    return this.state.tiles[y][x].current.player !== this.state.selectedPiece.player;
                } else return true;
            })

            knightMoves.forEach(position => {
                commit('MARK_POSSIBLE_MOVE', position);
            })
        },
        bishopMove({commit}, pos) {
            let y = pos[0];
            let x = pos[1];

            const bishopMoves = getDiagonals(y, x)

            bishopMoves.forEach(position => {
                commit('MARK_POSSIBLE_MOVE', position);
            })
        },
        rookMove({commit}, pos) {
            let y = pos[0];
            let x = pos[1];

            const rookMoves = getStraights(y, x)

            rookMoves.forEach(position => {
                commit('MARK_POSSIBLE_MOVE', position);
            })
        },
        queenMove({commit}, pos) {
            let y = pos[0];
            let x = pos[1];

            const diagonals = getDiagonals(y, x)
            const straights = getStraights(y, x)
            const queenMoves = diagonals.concat(straights)

            queenMoves.forEach(position => {
                commit('MARK_POSSIBLE_MOVE', position);
            })
        },
        commitMove({commit}, tile) {
            commit('MOVE_PIECE', tile);
            commit('SWITCH_TURN');
            commit('REMOVE_TILE_HIGHLIGHTS');
        }
        ,
        beatPiece({commit}, piece) {
            commit('BEAT_PIECE', piece)
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

export default store
