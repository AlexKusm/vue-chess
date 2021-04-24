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

let whiteRook = {
    name: 'Rook',
    icon: '♖',
    notation: 'R'
}

let whiteKnight = {
    name: 'Knight',
    icon: '♘',
    notation: 'N'
}

let whiteBishop = {
    name: 'Bishop',
    icon: '♗',
    notation: 'B'
}

let whiteKing = {
    name: 'King',
    icon: '♔',
    notation: 'K'
}

let whiteQueen = {
    name: 'Queen',
    icon: '♕',
    notation: 'Q'
}

let whitePawn = {
    name: 'Pawn',
    icon: '♙',
    notation: ''
}

let blackRook = {
    name: 'Rook',
    icon: '♜',
    notation: 'R'
}

let blackKnight = {
    name: 'Knight',
    icon: '♞',
    notation: 'N'
}

let blackBishop = {
    name: 'Bishop',
    icon: '♝',
    notation: 'B'
}

let blackKing = {
    name: 'King',
    icon: '♚',
    notation: 'K'
}

let blackQueen = {
    name: 'Queen',
    icon: '♛',
    notation: 'Q'
}

let blackPawn = {
    name: 'Pawn',
    icon: '♟',
    notation: ''
}

export let startingPositions = [
    {
        id: 8,
        type: whitePawn,
        position: [translateRanks('a'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('b'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('c'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('d'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('e'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('f'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('g'), 2]
    }, {
        id: 8,
        type: whitePawn,
        position: [translateRanks('h'), 2]
    }, {
        id: 1,
        type: whiteRook,
        position: [translateRanks('a'), 1]
    }, {
        id: 2,
        type: whiteKnight,
        position: [translateRanks('b'), 1]
    }, {
        id: 3,
        type: whiteBishop,
        position: [translateRanks('c'), 1]
    }, {
        id: 4,
        type: whiteKing,
        position: [translateRanks('d'), 1]
    }, {
        id: 5,
        type: whiteQueen,
        position: [translateRanks('e'), 1]
    }, {
        id: 6,
        type: whiteBishop,
        position: [translateRanks('f'), 1]
    }, {
        id: 7,
        type: whiteKnight,
        position: [translateRanks('g'), 1]
    }, {
        id: 8,
        type: whiteRook,
        position: [translateRanks('h'), 1]
    },
    {
        id: 8,
        type: blackPawn,
        position: [translateRanks('a'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('b'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('c'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('d'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('e'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('f'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('g'), 7]
    }, {
        id: 8,
        type: blackPawn,
        position: [translateRanks('h'), 7]
    }, {
        id: 1,
        type: blackRook,
        position: [translateRanks('a'), 8]
    }, {
        id: 2,
        type: blackKnight,
        position: [translateRanks('b'), 8]
    }, {
        id: 3,
        type: blackBishop,
        position: [translateRanks('c'), 8]
    }, {
        id: 4,
        type: blackKing,
        position: [translateRanks('d'), 8]
    }, {
        id: 5,
        type: blackQueen,
        position: [translateRanks('e'), 8]
    }, {
        id: 6,
        type: blackBishop,
        position: [translateRanks('f'), 8]
    }, {
        id: 7,
        type: blackKnight,
        position: [translateRanks('g'), 8]
    }, {
        id: 8,
        type: blackRook,
        position: [translateRanks('h'), 8]
    }]

export function createTiles() {
    let tiles = [];
    let color = false;
    let tile;
    let id=1;

    for (var y = 8; y >= 1; y--) {
        let file = [];

        for (var x = 1; x <= 8; x++) {
            tile = {};
            tile.id = id;
            tile.color = color;
            tile.rank = x;
            tile.file = y;

            file.push(tile);

            color = !color;
            id++;
        }

        color = !color;

        tiles.push(file);
    }

    return tiles;
}
