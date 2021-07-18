//TODO Refactor selected piece in state instead looping for it?
import {createStore} from 'vuex'
import {createTiles, startingPositions} from "@/store/helpers";

const store = createStore({
    state: {
        gameID: 1,
        turn: 'white',
        tiles: [],
        pieces: [],
        moveHistory: [],
        attackedTiles: [],
        selectedPiece: {},
        beatenPieces: []
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

        UPDATE_MOVE_HISTORY(state, moves) {
            state.moveHistory = moves
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
            state.selectedPiece.selected = true
        },

        DESELECT_PIECE(state) {
            state.selectedPiece = {}
            state.pieces.forEach((piece) => {
                piece.selected = false;
            })
        },

        UPDATE_PIECE_MOVES(state, piece) {
            let current = state.pieces.find(p => p.id === piece.id)

            current.moves = piece.moves
            current.attackedTiles = piece.attackedTiles
        },

        UPDATE_ATTACKED_TILES(state) {
            state.attackedTiles = {
                black: [],
                white: []
            }

            state.pieces.forEach(p => {
                if (p.attackedTiles && p.attackedTiles.length > 0) {
                    p.attackedTiles.forEach(tile => {
                        state.attackedTiles[p.player].push(tile)
                    })
                }
            })
        },

        MOVE_PIECE(state, tile) {
            let y = state.selectedPiece.position[0];
            let x = state.selectedPiece.position[1];
            state.tiles[y][x].current = null;

            /**
             * beat current piece if present
             */
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

            // const notation = state.selectedPiece.type.notation + tile.notation;

            // state.moveHistory.push({
            //     id: state.moves.length + 1,
            //     player: state.turn,
            //     notation: notation
            // });
        },

        SWITCH_TURN(state) {
            if (state.turn === "white") {
                state.turn = 'black'
            } else {
                state.turn = 'white'
            }
        },

        CHECK_FOR_CHECK(state) {
            console.log(state.pieces)
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
        updatePieceMoves({commit}, piece) {
            commit('UPDATE_PIECE_MOVES', piece)
            commit('UPDATE_ATTACKED_TILES')
        },
        markPossibleMoves({commit}, moves) {
            moves.forEach(position => {
                commit('MARK_POSSIBLE_MOVE', position);
            })
        },
        deselectPieces({commit}) {
            commit('DESELECT_PIECE');
            commit('REMOVE_TILE_HIGHLIGHTS');
        },
        commitMove({commit}, tile) {
            commit('MOVE_PIECE', tile);
            commit('SWITCH_TURN');
            commit('UPDATE_ATTACKED_TILES');
            commit('CHECK_FOR_CHECK')
            // commit('CHECK_FOR_MATE')
            commit('REMOVE_TILE_HIGHLIGHTS');
        }
    },
    getters: {
        turn: state => state.turn,
        moves: state => state.moves,
        beatenPieces: state => state.beatenPieces,
        attackedTiles: state => state.attackedTiles,
        selectedPiece: state => state.selectedPiece,
        pieces: state => state.pieces,
        tiles: state => state.tiles
    }
});

export default store
