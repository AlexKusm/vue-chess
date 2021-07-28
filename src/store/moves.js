import {
    isTileOccupiedByPlayer,
    isTileOccupiedByEnemy,
    isTileOutsideBoard, getPieceInPieceset
} from "./helpers";

export function getPawnMoves(piece, pieceSet) {
    let moves = []
    const player = piece.player
    const x = piece.x
    const y = piece.y
    const pawnHasMoved = piece.moved

    if (player === 'white') {
        moves.push([x, y - 1])

        if (!pawnHasMoved && !getPieceInPieceset(x, y - 2, pieceSet)) {
            moves.push([x, y - 2])
        }
    } else {
        moves.push([x, y + 1])

        if (!pawnHasMoved && !getPieceInPieceset(x, y + 2, pieceSet)) {
            moves.push([x, y + 2])
        }
    }

    /**
     * Check for Bounds and any Piece as Pawn can not beat straightforward
     */
    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));
    moves = moves.filter(position => !isTileOccupiedByEnemy(position[0], position[1], player, pieceSet));
    moves = moves.filter(position => !isTileOccupiedByPlayer(position[0], position[1], player, pieceSet));

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

        const piece = pieceSet.find(p => p.x === x && p.y === y)

        if (piece && (piece.player !== player)) {
            moves.push(position)
        }
    })

    return {
        moves: moves,
        attackedTiles: attackedTiles
    }
}

export function getKnightMoves(piece, pieceSet) {
    const x = piece.x
    const y = piece.y

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
    moves = moves.filter(position => !isTileOccupiedByPlayer(position[0], position[1], piece.player, pieceSet));

    return moves
}

/**
 * returns all straight moves for a piece in a pieceSet
 * @param piece
 * @param pieceSet
 * @param d
 * @returns {*[]}
 */
export function getDiagonalMoves(piece, pieceSet, d = 8) {
    const x = piece.x
    const y = piece.y
    const player = piece.player
    let tempPiece;
    let moves = [];

    if (piece.id === 19) {
        console.log(x, y)
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x - i, y - i)) {
            break;
        }

        tempPiece = getPieceInPieceset(x - i, y - i, pieceSet);

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x - i, y - i])
            break;
        }

        moves.push([x - i, y - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x + i, y + i)) {
            break;
        }

        tempPiece = getPieceInPieceset(x + i, y + i, pieceSet)

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x + i, y + i])
            break;
        }

        moves.push([x + i, y + i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x + i, y - i)) {
            break;
        }

        tempPiece = getPieceInPieceset(x + i, y - i, pieceSet)

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x + i, y - i])
            break;
        }

        moves.push([x + i, y - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x - i, y + i)) {
            break;
        }

        tempPiece = getPieceInPieceset(x - i, y + i, pieceSet)

        if (piece.id === 19) {
            console.log(tempPiece)
            console.log(tempPiece)
        }

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x - i, y + i])
            break;
        }

        moves.push([x - i, y + i])
    }


    moves = moves.filter(position => !isTileOutsideBoard(position[0], position[1]));

    return moves
}

export function getKingMoves(piece, pieceSet) {
    return getStraightMoves(piece, pieceSet, 1).concat(getDiagonalMoves(piece, pieceSet, 1))
}

/**
 * returns all diagonal moves for one piece in a pieceSet
 * @param piece
 * @param pieceSet
 * @param d
 * @returns {*[]}
 */
export function getStraightMoves(piece, pieceSet, d = 8) {
    const x = piece.x
    const y = piece.y
    const player = piece.player
    let tempPiece;
    let moves = [];

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x - i, y)) {
            break;
        }

        tempPiece = getPieceInPieceset(x - i, y, pieceSet)

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x - i, y])
            break;
        }

        moves.push([x - i, y])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x + i, y)) {
            break;
        }

        tempPiece = getPieceInPieceset(x + i, y, pieceSet)

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x + i, y])
            break;
        }

        moves.push([x + i, y])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x, y - i)) {
            break;
        }

        tempPiece = getPieceInPieceset(x, y - i, pieceSet)

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
            moves.push([x, y - i])
            break;
        }

        moves.push([x, y - i])
    }

    for (let i = 1; i <= d; i++) {
        if (isTileOutsideBoard(x, y + i)) {
            break;
        }

        tempPiece = getPieceInPieceset(x, y + i, pieceSet)

        if (tempPiece && (tempPiece.player === player)) {
            break;
        }

        if (tempPiece) {
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
