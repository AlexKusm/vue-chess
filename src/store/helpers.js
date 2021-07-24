import store from "./index";

/**
 * @param rank
 * @returns {string|number}
 */
export default function translateRanks(rank) {
    switch (rank) {
        case 7:
            return 'a'
        case 6:
            return 'b'
        case 5:
            return 'c'
        case 4:
            return 'd'
        case 3:
            return 'e'
        case 2:
            return 'f'
        case 1:
            return 'g'
        case 0:
            return 'h'
        case 'a':
            return 7
        case 'b':
            return 6
        case 'c':
            return 5
        case 'd':
            return 4
        case 'e':
            return 3
        case 'f':
            return 2
        case 'g':
            return 1
        case 'h':
            return 0
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
        position: [7, translateRanks('a')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 2,
        type: Knight,
        position: [7, translateRanks('b')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 3,
        type: Bishop,
        position: [7, translateRanks('c')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 4,
        type: King,
        position: [7, translateRanks('d')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 5,
        type: Queen,
        position: [7, translateRanks('e')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 6,
        type: Bishop,
        position: [7, translateRanks('f')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 7,
        type: Knight,
        position: [7, translateRanks('g')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 8,
        type: Rook,
        position: [7, translateRanks('h')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 9,
        type: Pawn,
        position: [6, translateRanks('a')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 10,
        type: Pawn,
        position: [6, translateRanks('b')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 11,
        type: Pawn,
        position: [6, translateRanks('c')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 12,
        type: Pawn,
        position: [6, translateRanks('d')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 13,
        type: Pawn,
        position: [6, translateRanks('e')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 14,
        type: Pawn,
        position: [6, translateRanks('f')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 15,
        type: Pawn,
        position: [6, translateRanks('g')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 16,
        type: Pawn,
        position: [6, translateRanks('h')],
        player: 'white',
        moved: false,
        selected: false
    }, {
        id: 25,
        type: Pawn,
        position: [1, translateRanks('a')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 26,
        type: Pawn,
        position: [1, translateRanks('b')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 27,
        type: Pawn,
        position: [1, translateRanks('c')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 28,
        type: Pawn,
        position: [1, translateRanks('d')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 29,
        type: Pawn,
        position: [1, translateRanks('e')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 30,
        type: Pawn,
        position: [1, translateRanks('f')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 31,
        type: Pawn,
        position: [1, translateRanks('g')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 32,
        type: Pawn,
        position: [1, translateRanks('h')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 17,
        type: Rook,
        position: [0, translateRanks('a')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 18,
        type: Knight,
        position: [0, translateRanks('b')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 19,
        type: Bishop,
        position: [0, translateRanks('c')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 20,
        type: King,
        position: [0, translateRanks('d')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 21,
        type: Queen,
        position: [0, translateRanks('e')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 22,
        type: Bishop,
        position: [0, translateRanks('f')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 23,
        type: Knight,
        position: [0, translateRanks('g')],
        player: 'black',
        moved: false,
        selected: false
    }, {
        id: 24,
        type: Rook,
        position: [0, translateRanks('h')],
        player: 'black',
        moved: false,
        selected: false
    }]

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
            tile.file = y;
            tile.x = y;
            tile.rank = x;
            tile.y = x;
            tile.notation = translateRanks(tile.rank) + (tile.file + 1)
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

export function isTileOccupiedByEnemy(y, x, player) {
    if (store.getters.tiles[y][x].current) {
        return (player !== store.getters.tiles[y][x].current.player);
    } else return false;
}

export function isTileOccupiedByPlayer(y, x, player) {
    if (store.getters.tiles[y][x].current) {
        return player === store.getters.tiles[y][x].current.player;
    } else return false;
}

export function isTileOutsideBoard(y, x) {
    return (y > 7 || x > 7 || y < 0 || x < 0);
}

// export function kingInCheck() {
//     if (store.getters.attackedTiles[store.getters.turn]) {
//         store.getters.attackedTiles[store.getters.turn].forEach(p => {
//             console.log(p)
//         })
//     } else {
//         return []
//     }
// }
