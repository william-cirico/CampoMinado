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

    return board;
};

export const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    const minedBoard = spreadMines(board, minesAmount);
    return minedBoard;
};

export const cloneBoard = (board) => {
    return board.map(row => {
        return row.map(field => ({ ...field }));
    })
};

const getNeighbors = (board, row, column) => {
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 1];
    const neighbors = [];

    rows.forEach(r => {
        columns.forEach(c => {
            const isFieldDifferent = r !== row || c != column;
            const isRowValid = r >= 0 && r < board.length;
            const isColumnValid = c >= 0 && c < board[0].length;

            if (isFieldDifferent && isRowValid && isColumnValid) {
                neighbors.push(board[r][c]);
            }
        });
    });

    return neighbors;
};

const isNeighborhoodSafe = (board, row, column) => {
    const neighbors = getNeighbors(board, row, column);

    return neighbors.reduce((acc, field) => acc && !field.mined, true);
};

export const openField = (board, row, column) => {
    const field = board[row][column];

    if (!field.opened) {
        field.opened = true;

        if (field.mined) {
            field.exploded = true;
        } else if (isNeighborhoodSafe(board, row, column)) {
            getNeighbors(board, row, column).forEach(neighbor => {
                openField(board, neighbor.row, neighbor.column);
            });
        } else {
            const nearMines = getNeighbors(board, row, column).filter(neighbor => neighbor.mined).length;
            field.nearMines = nearMines;
        }
    }
};

export const invertFlag = (board, row, column) => {
    board[row][column].flagged = !board[row][column].flagged
}

const pending = (field) => (field.mined && !field.flagged) || (field.mined && !field.opened);

const fields = board => [].concat(...board);

export const hasExploded = (board) => fields(board).filter(field => field.exploded).length > 0;

export const won = (board) => {
    const openedFields = board.filter(row => row.filter(field => field.opened && !field.mined).length);
    return openedFields === board.filter(row => row.filter(field => !field.mined));
}