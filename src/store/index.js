import {createStore} from 'vuex'
import {createTiles, startingPositions} from "@/store/helpers";

export default createStore({
    state: {
        moves: [],
        beatenPieces: [],
        pieces: [],
        tiles: []
    },
    mutations: {
        CREATE_BOARD(state, payload) {
            state.tiles = payload;
        },
        PIECES_ON_START(state, payload) {
            state.pieces = payload;
        },
        MOVE_PAWN() {
        },
        MOVE_ROOK() {
        },
        MOVE_KNIGHT() {
        },
        MOVE_BISHOP() {
        },
        MOVE_QUEEN() {
        },
        MOVE_KING() {
        },
    },
    actions: {
        newGame({commit}) {
            commit('CREATE_BOARD', createTiles());
            commit('PIECES_ON_START', startingPositions);
        },
    },
    getters: {
        moves: state => state.moves,
        beatenPieces: state => state.beatenPieces,
        pieces: state => state.pieces,
        tiles: state => state.tiles
    }
});
