const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, rowIndex) => {
        return Array(columns).fill(0).map((_, colIndex) => ({
            opened: false,
            flagged: false,
            mined: false,
            exploded: false,
            nearMines: 0,
            row: rowIndex,
            column: colIndex,
        }));
    });
};

const spreadMines = (board, minesAmount) => {
    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;

    while (minesPlanted < minesAmount) {
        const sortedRow = Math.floor(Math.random() * rows);
        const sortedColumn = Math.floor(Math.random() * columns);

        if (!board[sortedRow][sortedColumn].mined) {
            board[sortedRow][sortedColumn].mined = true;
            minesPlanted++;
        }
    }
};

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
};