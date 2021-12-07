//TODO Refactor selected piece in state instead looping for it?
import {createStore} from 'vuex'
import translateRanks from "./helpers/helpers";
import {createTiles, startingPositions} from "./helpers/helpers";
import {
    getPieceInPieceset,
    getTileNotation,
    isKinginCheck,
    updatePieceMoves
} from "./helpers/functions";

const store = createStore({
    state: {
        beatenPieces: [],
        check: false,
        mate: false,
        stalemate: false,
        moveDummies: [],
        moveHistory: [],
        gameID: 1,
        pieces: [],
        selectedPiece: {},
        tiles: [],
        turn: 'white'
    },
    mutations: {
        CREATE_BOARD(state, tiles) {
            state.tiles = tiles;
        },

        CREATE_PIECES(state) {
            state.pieces = startingPositions();

            state.pieces.forEach(p => {
                let y = p.y;
                let x = p.x;
                state.tiles[x][y].current = p;
            })
        },

        CREATE_MOVE_DUMMIES(state, target) {
            let pieces = startingPositions();
            let index;

            if (target.length < 1) {
                return
            }

            pieces = pieces.filter(piece => {
                return !state.beatenPieces.find(beaten => beaten.id === piece.id)
            })

            state.pieces.forEach(p => {
                let pieceDummy = pieces.find(pd => pd.id === p.id)
                pieceDummy.moves = p.moves
                pieceDummy.attackedTiles = p.attackedTiles
                pieceDummy.x = p.x
                pieceDummy.y = p.y
                pieceDummy.moved = p.moved
            })

            const pieceToBeat = getPieceInPieceset(target[0], target[1], pieces)

            if (pieceToBeat) {
                index = pieces.findIndex(p => p.id === pieceToBeat.id)
                pieceToBeat.beaten = true
            }


            let selected = pieces.find(p => p.id === state.selectedPiece.id)
            selected.selected = true
            selected.x = target[0]
            selected.y = target[1]

            pieces.splice(index, 1);
            pieces = updatePieceMoves(pieces)

            state.moveDummies.push(pieces)
        },

        FILTER_ILLEGAL_MOVES(state) {
            state.moveDummies = state.moveDummies.filter(pieces => {
                return !isKinginCheck(pieces, state.turn)
            })
        },

        FLUSH_MOVE_DUMMIES(state) {
            state.moveDummies = []
        },

        MARK_POSSIBLE_MOVES(state) {
            state.moveDummies.forEach(pieces => {
                const selected = pieces.find(p => p.selected)
                let x = selected.x
                let y = selected.y

                state.tiles[x][y].possibleMove = true;

                if (state.tiles[x][y].current) {
                    state.tiles[x][y].current.possibleBeat = true;
                }
            })
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
            state.selectedPiece.selected = true
        },

        DESELECT_PIECE(state) {
            state.selectedPiece = {}
            state.pieces.forEach((piece) => {
                piece.selected = false;
            })
        },

        UPDATE_PIECE_MOVES(state) {
            state.pieces = updatePieceMoves(state.pieces)
        },

        MOVE_PIECE(state, target) {
            let x = state.selectedPiece.x;
            let y = state.selectedPiece.y;
            let beatNotation = '';

            /**
             * Beat current piece if present
             */
            if (target.current) {
                const index = state.pieces.findIndex(p => p.id === target.current.id)

                target.current.beaten = true
                state.pieces.splice(index, 1);
                state.beatenPieces.push(target.current)

                if (state.selectedPiece.type.name === 'Pawn') {
                    beatNotation = translateRanks(state.selectedPiece.x);
                }

                beatNotation = beatNotation + 'x'
            }

            /**
             * Set new Piece Position
             */
            state.tiles[target.x][target.y].current = state.selectedPiece;
            state.selectedPiece.x = target.x
            state.selectedPiece.y = target.y
            state.selectedPiece.moved = true;
            state.tiles[x][y].current = null;


            /**
             * Add Move to History
             */
            const notation = state.selectedPiece.type.notation + beatNotation + getTileNotation(state.selectedPiece.x, state.selectedPiece.y);

            state.moveHistory.push({
                id: state.moveHistory.length + 1,
                player: state.turn,
                pieces: state.pieces,
                notation: notation
            });
        },

        SWITCH_TURN(state) {
            if (state.turn === "white") {
                state.turn = 'black'
            } else {
                state.turn = 'white'
            }
        },

        CHECK_FOR_CHECK(state) {
            state.check = isKinginCheck(state.pieces, state.turn)
        },

        CHECK_FOR_MATE(state) {
            if (state.check && state.moveDummies.length < 1) {
                state.mate = true
            }

            if (!state.check && state.moveDummies.length < 1) {
                state.stalemate = true
            }
        }
    },
    actions: {
        newGame({commit}) {
            commit('CREATE_BOARD', createTiles());
            commit('CREATE_PIECES');
            commit('UPDATE_PIECE_MOVES')
        },
        selectPiece({commit}, piece) {
            commit('SELECT_PIECE', piece);
        },
        markPossibleMoves({commit}, moves) {
            moves.forEach(position => {
                commit('CREATE_MOVE_DUMMIES', position)
            })

            commit('FILTER_ILLEGAL_MOVES');
            commit('MARK_POSSIBLE_MOVES');
            commit('FLUSH_MOVE_DUMMIES')
        },
        deselectPieces({commit}) {
            commit('DESELECT_PIECE');
            commit('REMOVE_TILE_HIGHLIGHTS');
        },
        commitMove({commit, dispatch}, tile) {
            commit('MOVE_PIECE', tile);
            commit('REMOVE_TILE_HIGHLIGHTS');
            commit('SWITCH_TURN');
            commit('UPDATE_PIECE_MOVES')
            commit('CHECK_FOR_CHECK')
            dispatch('checkForMate')
            commit('DESELECT_PIECE');
        },
        checkForMate({commit}) {
            let playerPieces = store.getters.pieces.filter(piece => piece.player === store.getters.turn)

            playerPieces.forEach(piece => {
                commit('SELECT_PIECE', piece)

                piece.moves.forEach(move => {
                    commit('CREATE_MOVE_DUMMIES', move)
                })
            })

            commit('FILTER_ILLEGAL_MOVES');
            commit('CHECK_FOR_MATE');
            commit('FLUSH_MOVE_DUMMIES')
        }
    },
    getters: {
        turn: state => state.turn,
        beatenPieces: state => state.beatenPieces,
        selectedPiece: state => state.selectedPiece,
        pieces: state => state.pieces,
        tiles: state => state.tiles,
        moveHistory: state => state.moveHistory,
        check: state => state.check,
        mate: state => state.mate
    }
});

export default store
