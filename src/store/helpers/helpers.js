
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
            x: translateRanks('a'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 2,
            type: Knight,
            x: translateRanks('b'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 3,
            type: Bishop,
            x: translateRanks('c'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 4,
            type: King,
            x: translateRanks('d'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 5,
            type: Queen,
            x: translateRanks('e'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 6,
            type: Bishop,
            x: translateRanks('f'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 7,
            type: Knight,
            x: translateRanks('g'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 8,
            type: Rook,
            x: translateRanks('h'),
            y: 7,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 9,
            type: Pawn,
            x: translateRanks('a'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 10,
            type: Pawn,
            x: translateRanks('b'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 11,
            type: Pawn,
            x: translateRanks('c'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 12,
            type: Pawn,
            x: translateRanks('d'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 13,
            type: Pawn,
            x: translateRanks('e'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 14,
            type: Pawn,
            x: translateRanks('f'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 15,
            type: Pawn,
            x: translateRanks('g'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 16,
            type: Pawn,
            x: translateRanks('h'),
            y: 6,
            player: 'white',
            moved: false,
            selected: false
        }, {
            id: 25,
            type: Pawn,
            x: translateRanks('a'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 26,
            type: Pawn,
            x: translateRanks('b'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 27,
            type: Pawn,
            x: translateRanks('c'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 28,
            type: Pawn,
            x: translateRanks('d'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 29,
            type: Pawn,
            x: translateRanks('e'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 30,
            type: Pawn,
            x: translateRanks('f'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 31,
            type: Pawn,
            x: translateRanks('g'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 32,
            type: Pawn,
            x: translateRanks('h'),
            y: 1,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 17,
            type: Rook,
            x: translateRanks('a'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 18,
            type: Knight,
            x: translateRanks('b'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 19,
            type: Bishop,
            x: translateRanks('c'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 20,
            type: King,
            x: translateRanks('d'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 21,
            type: Queen,
            x: translateRanks('e'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 22,
            type: Bishop,
            x: translateRanks('f'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 23,
            type: Knight,
            x: translateRanks('g'),
            y: 0,
            player: 'black',
            moved: false,
            selected: false
        }, {
            id: 24,
            type: Rook,
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
