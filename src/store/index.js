import {createStore} from 'vuex'
import {createTiles, startingPositions} from "@/store/helpers";

export default createStore({
    state: {
        turn: 'white',
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
        HIGHLIGHT_POSSIBLE_MOVES(state, payload) {
            state.tiles = payload;
        },
    },
    actions: {
        newGame({commit}) {
            commit('CREATE_BOARD', createTiles());
            commit('PIECES_ON_START', startingPositions);
        },
        startTurn({commit}, piece) {
            console.log(piece)
            commit('HIGHLIGHT_POSSIBLE_MOVES', this.state.tiles)
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
