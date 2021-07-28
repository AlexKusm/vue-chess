import {getDiagonalMoves, getKingMoves, getKnightMoves, getPawnMoves, getStraightMoves} from "./moves";

/**
 * @param rank
 * @returns {string|number}
 */
export default function translateRanks(rank) {
    switch (rank) {
        case 0:
            return 'a'
        case 1:
            return 'b'
        case 2:
            return 'c'
        case 3:
            return 'd'
        case 4:
            return 'e'
        case 5:
            return 'f'
        case 6:
            return 'g'
        case 7:
            return 'h'
        case 'a':
            return 0
        case 'b':
            return 1
        case 'c':
            return 2
        case 'd':
            return 3
        case 'e':
            return 4
        case 'f':
            return 5
        case 'g':
            return 6
        case 'h':
            return 7
        default:
            return '?'
    }
}

let Rook = {
    name: 'Rook',
    notation: 'R'
}

let Knight = {
    name: 'Knight',
    notation: 'N'
}

let Bishop = {
    name: 'Bishop',
    notation: 'B'
}

let King = {
    name: 'King',
    notation: 'K'
}

let Queen = {
    name: 'Queen',
    notation: 'Q'
}

let Pawn = {
    name: 'Pawn',
    notation: ''
}

export function startingPositions() {
    return [
        {
            id: 1,
            type: Rook,
            position: [7, translateRanks('a')],
            x: translateRanks('a'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 2,
            type: Knight,
            position: [7, translateRanks('b')],
            x: translateRanks('b'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 3,
            type: Bishop,
            position: [7, translateRanks('c')],
            x: translateRanks('c'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 4,
            type: King,
            position: [7, translateRanks('d')],
            x: translateRanks('d'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 5,
            type: Queen,
            position: [7, translateRanks('e')],
            x: translateRanks('e'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 6,
            type: Bishop,
            position: [7, translateRanks('f')],
            x: translateRanks('f'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 7,
            type: Knight,
            position: [7, translateRanks('g')],
            x: translateRanks('g'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 8,
            type: Rook,
            position: [7, translateRanks('h')],
            x: translateRanks('h'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 9,
            type: Pawn,
            position: [6, translateRanks('a')],
            x: translateRanks('a'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 10,
            type: Pawn,
            position: [6, translateRanks('b')],
            x: translateRanks('b'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 11,
            type: Pawn,
            position: [6, translateRanks('c')],
            x: translateRanks('c'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 12,
            type: Pawn,
            position: [6, translateRanks('d')],
            x: translateRanks('d'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 13,
            type: Pawn,
            position: [6, translateRanks('e')],
            x: translateRanks('e'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 14,
            type: Pawn,
            position: [6, translateRanks('f')],
            x: translateRanks('f'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 15,
            type: Pawn,
            position: [6, translateRanks('g')],
            x: translateRanks('g'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 16,
            type: Pawn,
            position: [6, translateRanks('h')],
            x: translateRanks('h'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 25,
            type: Pawn,
            position: [1, translateRanks('a')],
            x: translateRanks('a'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 26,
            type: Pawn,
            position: [1, translateRanks('b')],
            x: translateRanks('b'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 27,
            type: Pawn,
            position: [1, translateRanks('c')],
            x: translateRanks('c'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 28,
            type: Pawn,
            position: [1, translateRanks('d')],
            x: translateRanks('d'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 29,
            type: Pawn,
            position: [1, translateRanks('e')],
            x: translateRanks('e'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 30,
            type: Pawn,
            position: [1, translateRanks('f')],
            x: translateRanks('f'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 31,
            type: Pawn,
            position: [1, translateRanks('g')],
            x: translateRanks('g'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 32,
            type: Pawn,
            position: [1, translateRanks('h')],
            x: translateRanks('h'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 17,
            type: Rook,
            position: [0, translateRanks('a')],
            x: translateRanks('a'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 18,
            type: Knight,
            position: [0, translateRanks('b')],
            x: translateRanks('b'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 19,
            type: Bishop,
            position: [0, translateRanks('c')],
            x: translateRanks('c'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 20,
            type: King,
            position: [0, translateRanks('d')],
            x: translateRanks('d'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 21,
            type: Queen,
            position: [0, translateRanks('e')],
            x: translateRanks('e'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 22,
            type: Bishop,
            position: [0, translateRanks('f')],
            x: translateRanks('f'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 23,
            type: Knight,
            position: [0, translateRanks('g')],
            x: translateRanks('g'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 24,
            type: Rook,
            position: [0, translateRanks('h')],
            x: translateRanks('h'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }]
}

export function createTiles() {
    let tiles = [];
    let color = false;
    let tile;
    let id = 1;

    for (var x = 0; x <= 7; x++) {
        let rank = [];

        for (var y = 0; y <= 7; y++) {
            tile = {};
            tile.id = id;
            tile.color = color;
            tile.x = x;
            tile.y = y;
            tile.notation = translateRanks(tile.x) + (8 - tile.y)
            tile.possibleMove = false;

            rank.push(tile);

            color = !color;
            id++;
        }

        color = !color;

        tiles.push(rank);
    }

    return tiles;
}

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
