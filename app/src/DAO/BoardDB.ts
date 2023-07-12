import { FindOneOptions, Not, IsNull } from 'typeorm';
import { Board } from '../entity/Board';
import { ConnectionManager } from './ConnectionManager';
import { Board_Elements } from '../entity/Board_Elements';

export class BoardDB {
  /**
   * The function `getBoardById` retrieves a board from the database based on its
   * ID.
   * @param {number} id - The `id` parameter is the unique identifier of the board
   * you want to retrieve. It is of type `number`.
   * @returns a board object.
   */

  async getBoardById(id: number) {
    try {
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<Board> = {
        where: { id: id }
      };
      let board = await connection.manager.findOne(Board, options);
      return board;
    } catch (error) {
      throw new Error('Failed to get board by id: ' + error.message);
    }
  }

  /**
   * The addBoard function adds a new board to the database with the given Image URL and returns the ID of the
   * newly created board, or -1 if a duplicate entry is found.
   * @param {string} url - The `url` parameter is a string that represents the Image URL of a board.
   * @returns the ID of the newly added board if it is successfully saved to the database. If there is a
   * duplicate entry error (ER_DUP_ENTRY), it returns -1. If there is any other error, it throws an error
   * message.
   */
  async addBoard(url: string) {
    try {
      const connection = await ConnectionManager.getConnection();
      const board = new Board();
      board.url = url;
      await connection.manager.save(board);
      return board.id;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return -1;
      } else {
        throw new Error('Failed to add new board: ' + error.message);
      }
    }
  }

  /**
   * The function `getBoardElementByBoardIdAndStart` retrieves a board element based on the board ID and
   * starting position, returning the element if found or a message if not found or an error occurs.
   * @param {number} boardId - The `boardId` parameter is a number that represents the ID of the board
   * you want to search for.
   * @param {number} newPos - The `newPos` parameter is the position of the board element that you want
   * to retrieve. It is a number that represents the starting position of the board element on the board.
   * @returns a Promise that resolves to either a Board_Elements object or a string.
   */
  public static async getBoardElementByBoardIdAndStart(
    boardId: number,
    newPos: number
  ): Promise<Board_Elements | string> {
    try {
      //
      const connection = await ConnectionManager.getConnection();
      const options: FindOneOptions<Board_Elements> = {
        where: { board_id: boardId, start: newPos }
      };

      const ele = await connection.manager.findOne(Board_Elements, options);
      if (ele != null) return ele;
      else return `no element here`;
    } catch (error) {
      console.log(error);
      return 'Error';
    }
  }

  public static async getRandomBoard(): Promise<number> {
    try {
      const connection = await ConnectionManager.getConnection();
      let count = await connection.manager.count(Board);
      let board = await connection.manager.find(Board, {
        where: { id: Not(IsNull()) },
        skip: Math.floor(count * Math.random()),
        take: 1
      });
      return board[0].id;
    } catch (error) {
      console.log(error);
      return 1;
    }
  }
}
