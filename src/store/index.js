//TODO Refactor selected piece in state instead looping for it?
import {createStore} from 'vuex'
import {createTiles, startingPositions} from "@/store/helpers";

export default createStore({
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
        },
        ADD_MOVE(state, moves) {
            state.moves = moves
        },
        ADD_TILE_HIGHLIGHTS(state, tiles) {
            state.tiles = tiles;
        },
        REMOVE_TILE_HIGHLIGHTS(state) {
            state.tiles.forEach((rank) => {
                rank.forEach(tile => tile.possibleMove = false)
            })
        },
        SELECT_PIECE(state, piece) {
            state.pieces.find(p => p.id === piece.id).selected = true;
        },
        DESELECT_PIECE(state) {
            console.log('deselecting all pieces')
            state.pieces.forEach((piece) => {
                piece.selected = false;
            })
        },
        MOVE_PIECE(state, tile) {
            let selectedPiece = state.pieces.find(p => p.selected);
            selectedPiece.position[0] = tile.rank
            selectedPiece.position[1] = tile.file
            selectedPiece.moved = true;

            const notation = selectedPiece.type.notation + tile.notation;

            state.moves.push({
                id: state.moves.length + 1,
                player: state.turn,
                notation: notation
            });
        },
        BEAT_PIECE(state, piece) {
            const index = this.state.pieces.findIndex(p => p.id === piece.id)
            console.log(index);
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
        pawnMoves({commit}, piece) {
            commit('REMOVE_TILE_HIGHLIGHTS');
            commit('DESELECT_PIECE');
            commit('SELECT_PIECE', piece);

            let x = piece.position[0];
            let y = piece.position[1];

            /**
             * Base Move, One Forward
             */
            if (piece.player === 'white') {
                this.state.tiles[y - 1][x].possibleMove = true;
            } else {
                this.state.tiles[y + 1][x].possibleMove = true;
            }

            /**
             * Possible Two Field Move
             */
            if (!piece.moved) {
                if (piece.player === 'white') {
                    this.state.tiles[y - 2][x].possibleMove = true;
                } else {
                    this.state.tiles[y + 2][x].possibleMove = true;
                }
            }

            /**
             * Check for Beatable Pieces
             */
            let enemyPieces = this.state.pieces.filter(p => p.player != piece.player && p.moved)
            enemyPieces.forEach(enemyPiece => {
                let beatCondition1 = enemyPiece.position[1] === piece.position[1] - 1;
                let beatCondition2 = enemyPiece.position[0] === piece.position[0] + 1;
                let beatCondition3 = enemyPiece.position[0] === piece.position[0] - 1;

                if (piece.player === 'black') {
                    beatCondition1 = enemyPiece.position[1] === piece.position[1] + 1;
                }

                if (beatCondition1 && (beatCondition2 || beatCondition3)) {
                    this.state.tiles[enemyPiece.position[1]][enemyPiece.position[0]].possibleMove = true;
                    this.state.tiles[enemyPiece.position[1]][enemyPiece.position[0]].possibleBeat = true;
                    enemyPiece.possibleBeat = true;
                }
            });
        },
        commitMove({commit}, tile) {
            commit('MOVE_PIECE', tile);
            commit('SWITCH_TURN');
            commit('REMOVE_TILE_HIGHLIGHTS');
        },
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
