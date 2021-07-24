import store from "./index";
import {isTileOccupiedByPlayer, isTileOccupiedByEnemy, isTileOutsideBoard} from "./helpers";

export function getPawnMoves(x, y, pawnHasMoved) {
    console.log(x,y)
    let player = store.getters.tiles[x][y].current.player
    let moves = []

    if (player === 'white') {
        moves.push([x, y - 1])

        if (!pawnHasMoved) {
            moves.push([x, y - 2])
        }
    } else {
        moves.push([x, y + 1])

        if (!pawnHasMoved) {
            moves.push([x, y + 2])
        }
    }

    /**
     * Check for Bounds and any Piece as Pawn can not beat straightforward
     */
    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));
    moves = moves.filter(position => !isTileOccupiedByEnemy(position[0], position[1]), player);
    moves = moves.filter(position => !isTileOccupiedByPlayer(position[0], position[1]), player);

    let attackedTiles = []

    if (player === 'white') {
        attackedTiles.push([x + 1, y - 1], [x - 1, y - 1])
    } else {
        attackedTiles.push([x + 1, y + 1], [x - 1, y + 1])
    }

    attackedTiles = attackedTiles.filter(position => !isTileOutsideBoard(position[0], position[1]));

    attackedTiles.forEach(position => {
        let x = position[0]
        let y = position[1]

        const piece = store.getters.tiles[x][y].current

        if (piece && (piece.player !== store.getters.turn)) {
            moves.push(position)
        }
    })

    console.log(moves, x, y)

    return {
        moves: moves,
        attackedTiles: attackedTiles
    }
}

export function getKnightMoves(x, y) {
    let player = store.getters.tiles[x][y].current.player

    /**
     * All Possible Knight Jumps
     */
    let moves = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2],
    ];

    /**
     * Check for Bounds and Own Pieces
     */
    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));
    moves = moves.filter(position => !isTileOccupiedByPlayer(position[0], position[1], player));

    return moves
}

/**
 * returns all straight tiles
 * for moves, loop can be interrupted as a piece can be in the way
 * for possible pinned pieces, we need to look behind those pieces for the king and set breakLoop = true
 * @param y
 * @param x
 * @param d
 * @param breakLoop
 * @returns {*[]}
 */
export function getDiagonalMoves(x, y, d = 8, breakLoop = true) {
    let player = store.getters.tiles[x][y].current.player
    let piece;
    let moves = [];

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x - i, y - i)) {
            break;
        }

        piece = store.getters.tiles[x - i][y - i].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x - i, y - i])
            break;
        }

        moves.push([x - i, y - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x + i, y + i)) {
            break;
        }

        piece = store.getters.tiles[x + i][y + i].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x + i, y + i])
            break;
        }

        moves.push([x + i, y + i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x + i, y - i)) {
            break;
        }

        piece = store.getters.tiles[x + i][y - i].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x + i, y - i])
            break;
        }

        moves.push([x + i, y - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x - i, y + i)) {
            break;
        }

        piece = store.getters.tiles[x - i][y + i].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x - i, y + i])
            break;
        }

        moves.push([x - i, y + i])
    }


    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return moves
}

export function getKingMoves(x, y) {
    let player = store.getters.tiles[x][y].current.player
    let moves = getStraightMoves(x, y, 1).concat(getDiagonalMoves(x, y, 1))
    let enemyPlayer

    if (player === 'white') {
        enemyPlayer = 'black'
    } else {
        enemyPlayer = 'white'
    }

    store.getters.pieces.forEach(piece => {
        if (piece.player === enemyPlayer && piece.attackedTiles) {
            piece.attackedTiles.forEach(p => {
                moves = moves.filter((position) => {
                    return !(position[0] === p[0] && position[1] === p[1])
                })
            })
        }
    })

    return moves
}

/**
 * returns all diagonal tiles
 * for moves, loop can be interrupted as a piece can be in the way
 * for possible pinned pieces, we need to look behind those pieces for the king and set breakLoop = true
 * @param y
 * @param x
 * @param d
 * @param breakLoop
 * @returns {*[]}
 */
export function getStraightMoves(x, y, d = 8, breakLoop = true) {
    let player = store.getters.tiles[x][y].current.player
    let piece;
    let moves = [];

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x - i, y)) {
            break;
        }

        piece = store.getters.tiles[x - i][y].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x - i, y])
            break;
        }

        moves.push([x - i, y])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x + i, y)) {
            break;
        }

        piece = store.getters.tiles[x + i][y].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x + i, y])
            break;
        }

        moves.push([x + i, y])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x, y - i)) {
            break;
        }

        piece = store.getters.tiles[x][y - i].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x, y - i])
            break;
        }

        moves.push([x, y - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x, y + i)) {
            break;
        }

        piece = store.getters.tiles[x][y + i].current

        if (piece && (piece.player === player) && breakLoop) {
            break;
        }

        if (piece && breakLoop) {
            moves.push([x, y + i])
            break;
        }

        moves.push([x, y + i])
    }


    /**
     * Check for Bounds
     */
    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return moves
}
