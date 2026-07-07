import React from "react";

const GameRules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white px-4 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-4 sm:mb-10">
          <h1 className="text-2xl sm:text-5xl font-extrabold mb-1 sm:mb-4">
            🎯 Smart Guess Battle
          </h1>
          <p className="text-gray-400 text-lg">
            Learn the rules before entering the battle.
          </p>
        </div>

        {/* Rules Card */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl">

          {/* Rule 1 */}
          <div className="mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 sm:mb-3">
              👥 1. Join the Room
            </h2>
            <p className="text-gray-300">
              Two players must join the same room before the game starts.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="mb-4 sm:mb-8 ">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-1 sm:mb-3">
              🔒 2. Create Your Secret Series
            </h2>
            <p className="text-gray-300 mb-2">
              Each player selects a secret series containing 8 numbers.
            </p>

            <div className="bg-black/40 border border-gray-800 rounded-xl p-4 text-center font-mono text-green-400">
              1, 4, 7, 2, 9, 5, 8, 3
            </div>

            <p className="text-gray-400 mt-3">
              Keep your series hidden from your opponent.
            </p>
          </div>

          {/* Rule 3 */}
          <div className="mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-3">
              💰 3. Bet Your Chips
            </h2>
            <p className="text-gray-300">
              Both players start with <strong>50 Chips</strong>.
            </p>
            <p className="text-gray-300 mt-2">
              The chips you bet are deducted from your balance and cannot be
              used again in future rounds.
            </p>

            <div className="mt-4 bg-black/40 border border-gray-800 rounded-xl p-4">
              <p className="text-green-400">
                Example: 50 Chips → Bet 10 → Remaining 40
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-1 sm:mb-3">
              👑 4. Higher Bet Gets the Advantage
            </h2>

            <p className="text-gray-300 mb-4">
              The player who bets more chips gets the first choice.
            </p>

            <div className="grid md:grid-cols-2 gap-4">

              {/* Guess */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-5">
                <h3 className="text-xl font-bold text-blue-400 mb-1 sm:mb-3">
                  🎯 Guess the Series
                </h3>

                <p className="text-gray-300">
                  Try to guess your opponent's complete secret series.
                </p>

                <div className="mt-4 space-y-2">
                  <p className="text-green-400">
                    ✅ Correct Guess = Instant Win
                  </p>

                  <p className="text-red-400">
                    ❌ Wrong Guess = Game Continues
                  </p>
                </div>
              </div>

              {/* Hint */}
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-5">
                <h3 className="text-xl font-bold text-purple-400 mb-1 sm:mb-3">
                  💡 Get a Hint
                </h3>

                <p className="text-gray-300">
                  Instead of guessing, request a hint about the opponent's
                  secret series.
                </p>

                <ul className="mt-4 text-gray-400 list-disc ml-5">
                  <li>Correct number</li>
                  <li>Position hint</li>
                  <li>Odd / Even clue</li>
                  <li>Other special hints</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Rule 5 */}
          <div className="mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-1 sm:mb-3">
              🔄 5. Continue the Battle
            </h2>

            <p className="text-gray-300">
              Players continue betting chips, gaining advantages, collecting
              hints, and making guesses until someone discovers the opponent's
              secret series.
            </p>
          </div>

          {/* Rule 6 */}
          <div className="mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-1 sm:mb-3">
              🏆 6. Win Condition
            </h2>

            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
              Correctly guess your opponent's secret 8-number series and win
              the match instantly.
            </div>
          </div>

          {/* Rule 7 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-orange-400 mb-1 sm:mb-3">
              🤝 Draw Condition
            </h2>

            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
              If both players run out of chips before anyone guesses the secret
              series, the game ends in a tie.
            </div>
          </div>

        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            ⚡ Pro Tips
          </h2>

          <ul className="space-y-2 sm:space-y-3 text-gray-300">
            <li>🎯 Use hints before making risky guesses.</li>
            <li>💰 Manage your chips carefully.</li>
            <li>🧠 Bluff your opponent with smart betting.</li>
            <li>👑 Save larger bets for important rounds.</li>
            <li>🏆 Every chip and every clue matters.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default GameRules;