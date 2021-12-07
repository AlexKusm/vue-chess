import {getDiagonalMoves, getKingMoves, getKnightMoves, getPawnMoves, getStraightMoves} from "./moves";
import translateRanks from "./helpers";

export function isTileOccupiedByEnemy(x, y, player, pieceSet) {
    const piece = getPieceInPieceset(x, y, pieceSet)
    if (piece) {
        return (player !== piece.player);
    } else return false;
}

export function isTileOccupiedByPlayer(x, y, player, pieceSet) {
    const piece = getPieceInPieceset(x, y, pieceSet)
    if (piece) {
        return (player === piece.player);
    } else return false;
}

export function isTileOutsideBoard(x, y) {
    return (y > 7 || x > 7 || y < 0 || x < 0);
}

export function getTileNotation(x, y) {
    return translateRanks(x) + (8 - y)
}

export function getPieceInPieceset(x, y, pieceSet) {
    let piece;

    pieceSet.forEach(p => {
        if (p.x === x && p.y === y) {
            piece = p
        } else return false
    })

    return piece
}

/**
 * Checks for a Set of Pieces if King stands on a attacked Field
 */
export function isKinginCheck(pieceSet, player) {
    const king = pieceSet.find(p => p.type.name === 'King' && p.player === player)
    let check = false;

    pieceSet = pieceSet.filter(p => p.player !== player);

    pieceSet.forEach(p => {
        p.attackedTiles.forEach(position => {
            if (position[0] === king.x && position[1] === king.y) {
                check = true
            }
        })
    })

    return check
}

export function updatePieceMoves(pieceSet) {
    let moves

    pieceSet.forEach(piece => {
        switch (piece.type.name) {
            case 'Pawn':
                moves = getPawnMoves(piece, pieceSet)
                piece.moves = moves.moves
                piece.attackedTiles = moves.attackedTiles
                break;
            case 'Knight':
                moves = getKnightMoves(piece, pieceSet)
                piece.moves = moves
                piece.attackedTiles = moves
                break;
            case 'Bishop':
                moves = getDiagonalMoves(piece, pieceSet)
                piece.moves = moves
                piece.attackedTiles = moves
                break;
            case 'Rook':
                moves = getStraightMoves(piece, pieceSet)
                piece.moves = moves
                piece.attackedTiles = moves
                break;
            case 'Queen':
                moves = getStraightMoves(piece, pieceSet).concat(getDiagonalMoves(piece, pieceSet))
                piece.moves = moves
                piece.attackedTiles = moves
                break;
            case 'King':
                moves = getKingMoves(piece, pieceSet)
                piece.moves = moves
                piece.attackedTiles = moves
        }
    })

    return pieceSet
}

export function getAllPossibleMoves(pieceSet) {
    let moves = [];

    pieceSet.forEach(piece => {
        moves.push({
            id: piece.id,
            player: piece.player,
            attackedTiles: piece.attackedTiles,
            moves: piece.moves
        })
    })

    return moves;
}
