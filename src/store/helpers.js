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

export let startingPositions = [
    {
        id: 1,
        type: Rook,
        position: [translateRanks('a'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 2,
        type: Knight,
        position: [translateRanks('b'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 3,
        type: Bishop,
        position: [translateRanks('c'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 4,
        type: King,
        position: [translateRanks('d'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 5,
        type: Queen,
        position: [translateRanks('e'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 6,
        type: Bishop,
        position: [translateRanks('f'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 7,
        type: Knight,
        position: [translateRanks('g'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 8,
        type: Rook,
        position: [translateRanks('h'), 7],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 9,
        type: Pawn,
        position: [translateRanks('a'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 10,
        type: Pawn,
        position: [translateRanks('b'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 11,
        type: Pawn,
        position: [translateRanks('c'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 12,
        type: Pawn,
        position: [translateRanks('d'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 13,
        type: Pawn,
        position: [translateRanks('e'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 14,
        type: Pawn,
        position: [translateRanks('f'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 15,
        type: Pawn,
        position: [translateRanks('g'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 16,
        type: Pawn,
        position: [translateRanks('h'), 6],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 25,
        type: Pawn,
        position: [translateRanks('a'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 26,
        type: Pawn,
        position: [translateRanks('b'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 27,
        type: Pawn,
        position: [translateRanks('c'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 28,
        type: Pawn,
        position: [translateRanks('d'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 29,
        type: Pawn,
        position: [translateRanks('e'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 30,
        type: Pawn,
        position: [translateRanks('f'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 31,
        type: Pawn,
        position: [translateRanks('g'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 32,
        type: Pawn,
        position: [translateRanks('h'), 1],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 17,
        type: Rook,
        position: [translateRanks('a'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 18,
        type: Knight,
        position: [translateRanks('b'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 19,
        type: Bishop,
        position: [translateRanks('c'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 20,
        type: King,
        position: [translateRanks('d'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 21,
        type: Queen,
        position: [translateRanks('e'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 22,
        type: Bishop,
        position: [translateRanks('f'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 23,
        type: Knight,
        position: [translateRanks('g'), 0],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 24,
        type: Rook,
        position: [translateRanks('h'), 0],
        player: 'black',
        moved: false,
        selected: false
    }]

export function createTiles() {
    let tiles = [];
    let color = false;
    let tile;
    let id = 1;

    for (var y = 0; y <= 7; y++) {
        let file = [];

        for (var x = 0; x <= 7; x++) {
            tile = {};
            tile.id = id;
            tile.color = color;
            tile.rank = x;
            tile.file = y;
            tile.notation = translateRanks(tile.rank) + (8- tile.file)
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

export function isTileOutsideBoard(y, x){
    return !(y > 7 || x > 7 || y < 0 || x < 0);
}
