export default function translateRanks(rank) {
    switch (rank) {
        case 1:
            return 'a'
        case 2:
            return 'b'
        case 3:
            return 'c'
        case 4:
            return 'd'
        case 5:
            return 'e'
        case 6:
            return 'f'
        case 7:
            return 'g'
        case 8:
            return 'h'
        case 'a':
            return 1
        case 'b':
            return 2
        case 'c':
            return 3
        case 'd':
            return 4
        case 'e':
            return 5
        case 'f':
            return 6
        case 'g':
            return 7
        case 'h':
            return 8
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

export let startingPositions = [
    {
        id: 1,
        type: Rook,
        position: [translateRanks('a'), 1],
        player: 'white'
    }, {
        id: 2,
        type: Knight,
        position: [translateRanks('b'), 1],
        player: 'white'
    }, {
        id: 3,
        type: Bishop,
        position: [translateRanks('c'), 1]
        ,
        player: 'white'
    }, {
        id: 4,
        type: King,
        position: [translateRanks('d'), 1]
        ,
        player: 'white'
    }, {
        id: 5,
        type: Queen,
        position: [translateRanks('e'), 1]
        ,
        player: 'white'
    }, {
        id: 6,
        type: Bishop,
        position: [translateRanks('f'), 1]
        ,
        player: 'white'
    }, {
        id: 7,
        type: Knight,
        position: [translateRanks('g'), 1]
        ,
        player: 'white'
    }, {
        id: 8,
        type: Rook,
        position: [translateRanks('h'), 1]
        ,
        player: 'white'
    },
    {
        id: 9,
        type: Pawn,
        position: [translateRanks('a'), 2]
        ,
        player: 'white'
    }, {
        id: 10,
        type: Pawn,
        position: [translateRanks('b'), 2]
        ,
        player: 'white'
    }, {
        id: 11,
        type: Pawn,
        position: [translateRanks('c'), 2]
        ,
        player: 'white'
    }, {
        id: 12,
        type: Pawn,
        position: [translateRanks('d'), 2]
        ,
        player: 'white'
    }, {
        id: 13,
        type: Pawn,
        position: [translateRanks('e'), 2]
        ,
        player: 'white'
    }, {
        id: 14,
        type: Pawn,
        position: [translateRanks('f'), 2]
        ,
        player: 'white'
    }, {
        id: 15,
        type: Pawn,
        position: [translateRanks('g'), 2]
        ,
        player: 'white'
    }, {
        id: 16,
        type: Pawn,
        position: [translateRanks('h'), 2]
        ,
        player: 'white'
    },
    {
        id: 25,
        type: Pawn,
        position: [translateRanks('a'), 7],
        player: 'black'
    }, {
        id: 26,
        type: Pawn,
        position: [translateRanks('b'), 7],
        player: 'black'
    }, {
        id: 27,
        type: Pawn,
        position: [translateRanks('c'), 7],
        player: 'black'
    }, {
        id: 28,
        type: Pawn,
        position: [translateRanks('d'), 7],
        player: 'black'
    }, {
        id: 29,
        type: Pawn,
        position: [translateRanks('e'), 7],
        player: 'black'
    }, {
        id: 30,
        type: Pawn,
        position: [translateRanks('f'), 7],
        player: 'black'
    }, {
        id: 31,
        type: Pawn,
        position: [translateRanks('g'), 7],
        player: 'black'
    }, {
        id: 32,
        type: Pawn,
        position: [translateRanks('h'), 7],
        player: 'black'
    }, {
        id: 17,
        type: Rook,
        position: [translateRanks('a'), 8],
        player: 'black'
    }, {
        id: 18,
        type: Knight,
        position: [translateRanks('b'), 8],
        player: 'black'
    }, {
        id: 19,
        type: Bishop,
        position: [translateRanks('c'), 8],
        player: 'black'
    }, {
        id: 20,
        type: King,
        position: [translateRanks('d'), 8],
        player: 'black'
    }, {
        id: 21,
        type: Queen,
        position: [translateRanks('e'), 8],
        player: 'black'
    }, {
        id: 22,
        type: Bishop,
        position: [translateRanks('f'), 8],
        player: 'black'
    }, {
        id: 23,
        type: Knight,
        position: [translateRanks('g'), 8],
        player: 'black'
    }, {
        id: 24,
        type: Rook,
        position: [translateRanks('h'), 8],
        player: 'black'
    }]

export function createTiles() {
    let tiles = [];
    let color = false;
    let tile;
    let id = 1;

    for (var y = 8; y >= 1; y--) {
        let file = [];

        for (var x = 1; x <= 8; x++) {
            tile = {};
            tile.id = id;
            tile.color = color;
            tile.rank = x;
            tile.file = y;
            tile.possibleMove = false;

            file.push(tile);

            color = !color;
            id++;
        }

        color = !color;

        tiles.push(file);
    }

    return tiles;
}
