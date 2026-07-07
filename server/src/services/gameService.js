import Game from '../models/Game.js';
import User from '../models/User.js';
import { getGameState, setGameState } from '../utils/redis.js';

class GameService {

  async placeBet(gameId, playerId, amount) {
    const gameState = await getGameState(gameId);
    if (!gameState) throw new Error("Game not found");

    // Deduct coins
    await User.findByIdAndUpdate(playerId, { $inc: { coins: -amount } });

    gameState.bets = gameState.bets || {};
    gameState.bets[playerId] = (gameState.bets[playerId] || 0) + amount;
    gameState.totalBet += amount;

    await setGameState(gameId, gameState);
    return gameState;
  }

  async getHint(gameId, playerId, hintType) {
    const gameState = await getGameState(gameId);
    const opponentId = gameState.player1 === playerId ? gameState.player2 : gameState.player1;
    const opponentSeries = gameState.series?.[opponentId];

    if (!opponentSeries) throw new Error("Opponent series not found");

    let hint = null;
    switch (hintType) {
      case 'sum_first_three':
        hint = opponentSeries.slice(0, 3).reduce((a, b) => a + b, 0);
        break;
      case 'max_number':
        hint = Math.max(...opponentSeries);
        break;
      case 'sum_all':
        hint = opponentSeries.reduce((a, b) => a + b, 0);
        break;
      default:
        throw new Error("Invalid hint type");
    }
    return hint;
  }

  async submitGuess(gameId, playerId, guess) {
    const gameState = await getGameState(gameId);
    const secret = gameState.series?.[playerId];

    if (!secret) throw new Error("Secret series not found");

    // Exact match (order matters)
    const isCorrect = JSON.stringify(secret) === JSON.stringify(guess);

    if (isCorrect) {
      await User.findByIdAndUpdate(playerId, {
        $inc: { coins: gameState.totalBet, wins: 1, totalGames: 1 }
      });
      return { win: true, coinsWon: gameState.totalBet };
    }

    await User.findByIdAndUpdate(playerId, { $inc: { totalGames: 1 } });
    return { win: false };
  }
}

export default new GameService();