import store from "./index";
import {isTileOutsideBoard} from "./helpers";

export function getDiagonals(y, x) {
    let currentPlayer = store.getters.tiles[y][x].current.player
    let piece;
    let diagonals = [];

    /**
     * All Possible Bishop Lanes
     */
    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y - i, x - i)) {
            break;
        }

        piece = store.getters.tiles[y - i][x - i].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            diagonals.push([y - i, x - i])
            break;
        }

        diagonals.push([y - i, x - i])
    }

    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y + i, x + i)) {
            break;
        }

        piece = store.getters.tiles[y + i][x + i].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            diagonals.push([y + i, x + i])
            break;
        }

        diagonals.push([y + i, x + i])
    }

    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y + i, x - i)) {
            break;
        }

        piece = store.getters.tiles[y + i][x - i].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            diagonals.push([y + i, x - i])
            break;
        }

        diagonals.push([y + i, x - i])
    }

    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y - i, x + i)) {
            break;
        }

        piece = store.getters.tiles[y - i][x + i].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            diagonals.push([y - i, x + i])
            break;
        }

        diagonals.push([y - i, x + i])
    }


    /**
     * Check for Bounds
     */
    diagonals = diagonals.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return diagonals
}

export function getStraights(y, x) {
    let currentPlayer = store.getters.tiles[y][x].current.player
    let piece;
    let straights = [];

    /**
     * All Possible Bishop Lanes
     */
    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y - i, x)) {
            break;
        }

        piece = store.getters.tiles[y - i][x].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            straights.push([y - i, x])
            break;
        }

        straights.push([y - i, x])
    }

    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y + i, x)) {
            break;
        }

        piece = store.getters.tiles[y + i][x].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            straights.push([y + i, x])
            break;
        }

        straights.push([y + i, x])
    }

    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y, x - i)) {
            break;
        }

        piece = store.getters.tiles[y][x - i].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            straights.push([y, x - i])
            break;
        }

        straights.push([y, x - i])
    }

    for (let i = 1; i < 7; i++) {
        if (isTileOutsideBoard(y, x + i)) {
            break;
        }

        piece = store.getters.tiles[y][x + i].current

        if (piece && (piece.player === currentPlayer)) {
            break;
        }

        if (piece) {
            straights.push([y, x + i])
            break;
        }

        straights.push([y, x + i])
    }


    /**
     * Check for Bounds
     */
    straights = straights.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return straights
}
