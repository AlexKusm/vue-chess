import store from "./index";
import {isTileOccupiedByPlayer, isTileOccupiedByEnemy, isTileOutsideBoard} from "./helpers";

export function getPawnMoves(y, x, pawnHasMoved) {
    let player = store.getters.tiles[y][x].current.player
    let moves = []

    if (player === 'white') {
        moves.push([y - 1, x])

        if (!pawnHasMoved) {
            moves.push([y - 2, x])
        }
    } else {
        moves.push([y + 1, x])

        if (!pawnHasMoved) {
            moves.push([y + 2, x])
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
        attackedTiles.push([y - 1, x - 1], [y - 1, x + 1])
    } else {
        attackedTiles.push([y + 1, x - 1], [y + 1, x + 1])
    }

    attackedTiles = attackedTiles.filter(position => !isTileOutsideBoard(position[0], position[1]));

    attackedTiles.forEach(position => {
        let y = position[0]
        let x = position[1]

        const piece = store.getters.tiles[y][x].current

        if (piece && (piece.player !== store.getters.turn)) {
            moves.push(position)
        }
    })

    return {
        moves: moves,
        attackedTiles: attackedTiles
    }
}

export function getKnightMoves(y, x) {
    let player = store.getters.tiles[y][x].current.player

    /**
     * All Possible Knight Jumps
     */
    let moves = [
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
     * Check for Bounds and Own Pieces
     */

    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));
    moves = moves.filter(position => !isTileOccupiedByPlayer(position[0], position[1], player));

    return moves
}

export function getDiagonalMoves(y, x, d = 8) {
    let player = store.getters.tiles[y][x].current.player
    let piece;
    let moves = [];

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y - i, x - i)) {
            break;
        }

        piece = store.getters.tiles[y - i][x - i].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y - i, x - i])
            break;
        }

        moves.push([y - i, x - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y + i, x + i)) {
            break;
        }

        piece = store.getters.tiles[y + i][x + i].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y + i, x + i])
            break;
        }

        moves.push([y + i, x + i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y + i, x - i)) {
            break;
        }

        piece = store.getters.tiles[y + i][x - i].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y + i, x - i])
            break;
        }

        moves.push([y + i, x - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y - i, x + i)) {
            break;
        }

        piece = store.getters.tiles[y - i][x + i].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y - i, x + i])
            break;
        }

        moves.push([y - i, x + i])
    }


    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return moves
}

export function getKingMoves(y, x) {
    let player = store.getters.tiles[y][x].current.player
    let moves = getStraightMoves(y, x, 1).concat(getDiagonalMoves(y, x, 1))
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


    // /**
    //  * Filter King moves by Attacked Tiles from Enemy Player
    //  * TODO: Filtering did not work as smooth as expected here
    //  */
    // if (store.getters.attackedTiles[enemyPlayer]) {
    //     store.getters.attackedTiles[enemyPlayer].forEach(p => {
    //         moves = moves.filter((position) => {
    //             return !(position[0] === p[0] && position[1] === p[1])
    //         })
    //     })
    // } else {
    //     return []
    // }

    return moves
}

export function getStraightMoves(y, x, d = 8) {
    let player = store.getters.tiles[y][x].current.player
    let piece;
    let moves = [];

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y - i, x)) {
            break;
        }

        piece = store.getters.tiles[y - i][x].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y - i, x])
            break;
        }

        moves.push([y - i, x])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y + i, x)) {
            break;
        }

        piece = store.getters.tiles[y + i][x].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y + i, x])
            break;
        }

        moves.push([y + i, x])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y, x - i)) {
            break;
        }

        piece = store.getters.tiles[y][x - i].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y, x - i])
            break;
        }

        moves.push([y, x - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(y, x + i)) {
            break;
        }

        piece = store.getters.tiles[y][x + i].current

        if (piece && (piece.player === player)) {
            break;
        }

        if (piece) {
            moves.push([y, x + i])
            break;
        }

        moves.push([y, x + i])
    }


    /**
     * Check for Bounds
     */
    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return moves
}
