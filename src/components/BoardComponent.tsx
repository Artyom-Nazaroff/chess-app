import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { CellComponent } from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';

interface BoardProps {
	board: Board;
	currentPlayer: Player | null;
	setBoard: (board: Board) => void;
	swapPlayer: () => void;
}

export const BoardComponent: FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	const click = (cell: Cell) => {
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			swapPlayer();
			setSelectedCell(null);
			updateBoard();
		} else {
			if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
		}
	};

	useEffect(() => {
		highlightCells();
	}, [selectedCell]);

	const highlightCells = () => {
		board.highlightCells(selectedCell);
		updateBoard();
	};

	const updateBoard = () => {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	};

	return (
		<div>
			<h3>Текущий игрок {currentPlayer?.color}</h3>
			<div className='board'>
				{board.cells.map((row, index) => (
					<React.Fragment key={index}>
						{row.map((cell) => (
							<CellComponent
								cell={cell}
								key={cell.id}
								selected={
									cell.x === selectedCell?.x &&
									cell.y === selectedCell?.y
								}
								click={click}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};
