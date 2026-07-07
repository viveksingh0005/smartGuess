import { useState, useEffect } from "react";
import { useGame } from "../gameContext";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import SeriesDisplay from "./SeriesDisplay";
const BettingUI = () => {
  const {
    myPlayer,
    opponentPlayer,
    gameState,
    placeBet,
    askQuestion,
    questionChoices,
    hintAnswer,
    guessSeries,
    roomId,
    myUserId,
    clearHintAnswer,
    setRoomId,
    tieMessage,
    
  } = useGame();
  const navigate = useNavigate();
  const [wrongGuessMessage, setWrongGuessMessage] = useState("");
  const [betPlaced, setBetPlaced] = useState(false);
  const [betAmount, setBetAmount] = useState("");
  const [guess, setGuess] = useState("");
  const [showChoice, setShowChoice] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [rewardChosen, setRewardChosen] = useState(false);
  const [betError, setBetError] = useState("");
  const isOutOfChips = myPlayer?.chips === 0 || opponentPlayer?.chips === 0;
  

  const { roomId: urlRoomId } = useParams();
  const maxChips = myPlayer?.chips

  

  useEffect(() => {

    if (!urlRoomId) return;

    setRoomId(urlRoomId);

  }, [urlRoomId]);

  // ✅ ADD this effect to reset betPlaced when a new betting round starts
  // ✅ Replace your second useEffect with this
  useEffect(() => {
    if (gameState?.status === "betting") {
      setBetPlaced(false);
      setBetAmount("");
      setGuess("");
      setShowChoice(false);
      setShowQuestions(false);


    }
  }, [gameState?.status]);

  useEffect(() => {
    if (tieMessage) {
      setBetPlaced(false);
      setBetAmount("");
    }
  }, [tieMessage]);

  useEffect(() => {
    if (gameState?.guess === "not_correct") {
      setWrongGuessMessage("Guess is wrong");

      const timer = setTimeout(() => {
        setWrongGuessMessage("");

      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [gameState?.guess]);

  useEffect(() => {

    if (!hintAnswer) return;

    const timer = setTimeout(() => {

      setShowQuestions(false);

      setShowChoice(false);

      clearHintAnswer();

    }, 7000);

    return () => clearTimeout(timer);

  }, [hintAnswer]);

  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading game...
      </div>
    );
  }

  console.log("🎮 BettingUI gameState:", gameState);

  const canChoose =
    (gameState?.currentAdvantagePlayer?._id || gameState?.currentAdvantagePlayer)?.toString() === myUserId?.toString()
  console.log("Question Choices:", questionChoices);



  return (
    <div className="min-h-screen bg-slate-900 text-white p-2 md:p-6">

      <div className="max-w-4xl mx-auto">


        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 to-red-900 border border-white/10 rounded-xl md:rounded-3xl p-2  md:p-5 mb-2 md:mb-6 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10"></div>

          <div className="flex items-center justify-between relative">

            {/* Player 1 - You */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative  md:mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-50"></div>
                <img
                  className="h-10 w-10 md:h-20 md:w-20 rounded-xl md:rounded-2xl border-2 md:border-4 border-white/20 object-cover relative z-10"
                  src="https://cdn.shopify.com/s/files/1/0757/8393/0173/files/1280X1280_b84c8ea3-2702-4f1d-a525-b26a110104fa_480x480.jpg?v=1720078803"
                  alt="You"
                />
              </div>

              <h2 className="text-white text-xl md:text-3xl font-bold tracking-tight shine-text1">
                {myPlayer?.username || myPlayer?.user?.username || "You"}
              </h2>
              <p className="text-emerald-400 text-[10px] md:text-xs font-medium">YOU</p>
            </div>

            {/* VS Section */}
            <div className="flex flex-col items-center mx-4">
              <div className="relative">
                <div className="text-2xl md:text-5xl  font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500 tracking-tighter">
                  VS
                </div>
                <div className="absolute -inset-4 bg-yellow-400/10 blur-2xl rounded-full -z-10"></div>
              </div>
              <p className="text-white/60 text-md md:text-sm font-mono tracking-widest mt-1">BATTLE</p>
            </div>

            {/* Player 2 - Opponent */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="relative  md:mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl blur-md opacity-50"></div>
                <img
                  className="h-10 w-10 md:h-20 md:w-20 rounded-xl md:rounded-2xl border-2 md:border-4 border-white/20 object-cover relative z-10"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5UR6QGsacTYxXAPq-tx05gilmP-rng3yRkkwZQUZrPQ&s=10"
                  alt="Opponent"
                />
              </div>

              <h2 className="text-white text-xl md:text-3xl font-bold tracking-tight shine-text">
                {opponentPlayer?.username || opponentPlayer?.user?.username || "Opponent"}
              </h2>
              <p className="text-red-400 text-[10px] md:text-xs font-medium">OPPONENT</p>
            </div>
          </div>
        </div>


        {/* Winner UI */}
        {gameState.status === "won" && (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-6 relative overflow-hidden">

            {/* Subtle animated background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(at_center,#a855f710_0%,transparent_70%)] animate-pulse" />

            {(gameState.winner?._id || gameState.winner)?.toString() === myUserId?.toString() ? (
              <div className="text-center z-10">
                <div className="text-[120px] mb-6 animate-bounce">🏆</div>
                <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                  YOU WON!
                </h1>
                <p className="text-gray-400 text-2xl font-light">You correctly guessed the series</p>

                {/* Buttons */}
                <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
                  <button
                    onClick={() => navigate('/cr')}
                    className="group relative flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-6 px-10 rounded-3xl text-xl transition-all duration-300 active:scale-95 shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      🎮 Play Again
                    </span>
                    {/* Shine effect */}
                    <div className="absolute -inset-x-20 top-0 h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:-translate-x-full transition-transform duration-700" />
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className="group relative flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 font-bold py-6 px-10 rounded-3xl text-xl transition-all duration-300 active:scale-95 border border-slate-500 hover:border-slate-400 shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      🏠 Home Page
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center z-10">
                <div className="text-[120px] mb-6 animate-pulse">💀</div>
                <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-red-500 via-rose-500 to-red-500 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                  YOU LOST
                </h1>
                <p className="text-gray-400 text-2xl font-light">Your opponent guessed your series</p>

                {/* Buttons */}
                <div className="mt-16 flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
                  <button
                    onClick={() => navigate('/cr')}
                    className="group relative flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold py-6 px-10 rounded-3xl text-xl transition-all duration-300 active:scale-95 shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      🎮 Play Again
                    </span>
                    {/* Shine effect */}
                    <div className="absolute -inset-x-20 top-0 h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 group-hover:-translate-x-full transition-transform duration-700" />
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    className="group relative flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 font-bold py-6 px-10 rounded-3xl text-xl transition-all duration-300 active:scale-95 border border-slate-500 hover:border-slate-400 shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      🏠 Home Page
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}



        {/* Chips */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">

          {/* Chips Card */}
          <div className="md:w-72 bg-gradient-to-br from-slate-900 to-black border border-emerald-500/20 rounded-xl md:rounded-3xl p-4 md:p-6 flex items-center gap-5">
            <div className="p-1 md:p-2 bg-emerald-500/30 rounded-[5px] md:rounded-2xl flex items-center justify-center text-2xl md:text-5xl flex-shrink-0">
              💎
            </div>
            <div>
              <p className="text-emerald-400/70 text-[14px] md:text-[18px] font-medium">YOUR CHIPS</p>
              <p className="text-xl md:text-5xl font-bold text-white tracking-tighter">
                {myPlayer?.chips ?? 0}
              </p>
            </div>
          </div>



          {/* Series Display takes remaining space */}
          <div className="flex-1">
            <SeriesDisplay />
          </div>
        </div>

        {tieMessage && (
          <div className="bg-yellow-700 p-4 rounded-2xl my-4 text-center">
            <h3 className="text-2xl font-bold text-white">{tieMessage}</h3>
            <p className="text-yellow-200 text-sm mt-1">New betting round started</p>
          </div>
        )}

        {wrongGuessMessage && (
          <div className="relative bg-gradient-to-br from-red-700 via-rose-700 to-purple-900 border-2 border-red-400/70 p-4 rounded-2xl my-4 text-center shadow-2xl shadow-red-600/50 overflow-hidden">

            {/* Neon glow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff000033_0%,transparent_60%)] pointer-events-none"></div>

            {/* Top glitch accent */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-red-400/80 blur-sm"></div>

            <div className="relative">
              <div className="text-7xl mb-4 animate-[wiggle_0.6s_ease-in-out_infinite] drop-shadow-[0_0_15px_#ef4444]">
                ❌
              </div>

              <h3 className="text-3xl font-black tracking-wider text-white uppercase mb-3 drop-shadow-md">
                {wrongGuessMessage}
              </h3>

              <div className="inline-flex items-center gap-2 text-red-200 font-mono text-sm tracking-[2px] uppercase">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                NEW BETTING ROUND STARTED
              </div>
            </div>
          </div>
        )}



        {/* Betting Phase */}
     
        {gameState.status === "betting" &&  (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-2 md:p-4 rounded-xl md:rounded-3xl mt-2 md:mt-4 shadow-2xl">
            <div className="flex items-center justify-between mb-2 md:mb-6">
              <h2 className="text-[14px] md:text-3xl font-bold text-white tracking-tight">
                Place Your Bet
              </h2>
              <div className="px-4 py-1 bg-slate-700/50 text-sm font-medium text-emerald-400 rounded-full border border-emerald-500/20">
                Round Bet
              </div>
            </div>

            {!betPlaced ? (
              <div className="space-y-2 md:space-y-6">
                {/* Bet Input */}
                <div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-amber-400 font-bold">
                      ♠
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={betAmount}
                      onChange={(e) => {
                        const raw = e.target.value;

                        if (raw === "") {
                          setBetAmount("");
                          setBetError("");
                          return;
                        }

                        if (!/^\d+$/.test(raw)) {
                          return; // ignore invalid keystrokes (letters, minus, dot, etc.)
                        }

                        const num = Number(raw);

                        if (num > maxChips) {
                          setBetAmount(String(maxChips));
                          setBetError(`You only have ${maxChips} chips`);
                        } else {
                          setBetAmount(raw);
                          setBetError("");
                        }
                      }}
                      placeholder="Enter amount"
                      className={`w-full pl-14 pr-6 py-2 md:py-5 bg-slate-950 border rounded-2xl text-xl md:text-2xl font-semibold text-white placeholder-slate-500 focus:outline-none transition-all ${betError ? "border-red-500" : "border-slate-600 focus:border-blue-500"
                        }`}
                    />
                    <div className="absolute right-5 md:right-14 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                      chips
                    </div>
                  </div>
                  {betError && (
  <p className="mt-2 text-sm text-red-400 font-medium pl-2">{betError}</p>
)}
<p className="mt-2 text-sm text-slate-500 pl-2">
  You have {maxChips} chips available
</p>
                </div>

                {/* Bet Button */}
                <button
  onClick={() => {
    const isValidBet = betAmount !== "" && Number(betAmount) > 0 && Number(betAmount) <= maxChips;
    if (!isValidBet) return;
    placeBet(roomId, Number(betAmount));
    setBetPlaced(true);
  }}
  disabled={!(betAmount !== "" && Number(betAmount) > 0 && Number(betAmount) <= maxChips)}
  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-5 rounded-2xl text-xl font-semibold text-white transition-all duration-200 active:scale-[0.985] shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
>
  Place Bet
</button>


              </div>
            ) : (
              /* Waiting State */
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">♠</span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2">
                  Waiting for opponent...
                </h3>

                <p className="text-slate-400 mb-6 max-w-xs">
                  Your opponent is placing their bet
                </p>

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl px-6 py-4 w-full max-w-xs">
                  <p className="text-sm text-slate-400">Your Bet</p>
                  <p className="text-4xl font-bold text-amber-400 mt-1">
                    {betAmount} <span className="text-xl font-normal text-slate-500">chips</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Winner Decision */}
        {canChoose &&
          gameState.status === "decision" &&
          !rewardChosen && (
            <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  WINNER
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  You Won The Bet!
                </h2>
                <p className="text-slate-400 mt-2 text-lg">
                  Choose your reward
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Guess Series Card */}
                <button
                  onClick={() => {
                    setRewardChosen(true);
                    setShowChoice("guess");
                  }}
                  className="group relative bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 p-8 rounded-2xl border border-green-400/30 hover:border-green-400/60 text-left flex flex-col h-full hover:scale-[1.03] active:scale-95 shadow-xl"
                >
                  <div className="text-5xl mb-6">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Guess Series</h3>
                  <p className="text-green-100/80">Continue playing and test your luck again</p>

                  <div className="mt-auto pt-6 text-green-200 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Choose →
                  </div>
                </button>

                {/* Take Hint Card */}
                <button
                  onClick={() => {
                    setRewardChosen(true);
                    setShowQuestions(true);
                  }}
                  className="group relative bg-gradient-to-br from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all duration-300 p-8 rounded-2xl border border-purple-400/30 hover:border-purple-400/60 text-left flex flex-col h-full hover:scale-[1.03] active:scale-95 shadow-xl"
                >
                  <div className="text-5xl mb-6">💡</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Take Hint</h3>
                  <p className="text-purple-100/80">Get a powerful hint to boost your chances</p>

                  <div className="mt-auto pt-6 text-purple-200 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Choose →
                  </div>
                </button>
              </div>
            </div>
          )}
        {/* Guess Modal */}
        {showChoice === "guess" && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-700 p-2 md:p-8 rounded-xl md:rounded-3xl mt-2 md:mt-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-2 md:mb-6">
              <div className="w-10 h-10 bg-red-500/10 flex items-center justify-center rounded-xl border border-red-500/30">
                🎯
              </div>
              <div>
                <h2 className="text-[14px] md:text-3xl md:font-bold text-white tracking-tight">
                  Guess Opponent Series by Entering 8 numbers separated by commas
                </h2>


              </div>
            </div>

            <div className="space-y-2 md:space-y-6">
              {/* Input Field */}
              <div>

                <div className="relative">
                  <input
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="1, 2, 3, 4, 5, 6, 7, 8"
                    className="w-full bg-slate-950 border border-slate-600 focus:border-red-500 rounded-2xl px-2 md:px-6 py-2 md:py-5 text-xl md:text-2xl font-mono text-white placeholder-slate-500 focus:outline-none transition-all tracking-widest"
                  />
                  <div className="hidden md:block absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium px-3 py-1 bg-slate-800 rounded-lg text-slate-400 border border-slate-700">
                    8 NUMBERS
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  const parsed = guess
                    .split(",")
                    .map(num => Number(num.trim()));

                  if (parsed.length !== 8) {
                    alert("Please enter exactly 8 numbers separated by commas.");
                    return;
                  }

                  console.log("Parsed:", parsed);
                  guessSeries(roomId, parsed);
                }}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 py-2 md:py-5 rounded-2xl text-xl font-bold text-white transition-all duration-200 active:scale-[0.985] shadow-lg shadow-red-500/40 flex items-center justify-center gap-3"
              >
                SUBMIT GUESS
                <span className="text-2xl">→</span>
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 mt-2 md:mt-4">
              Make sure all 8 numbers are correct
            </p>
          </div>
        )}

        {showQuestions && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span>Choose a Question</span>
              <span className="text-sm font-normal text-slate-400">(Advantage Phase)</span>
            </h3>

            <div className="flex flex-col gap-4">
              {questionChoices.map((question) => {
                const isSelected = hintAnswer?.questionKey === question.key;

                return (
                  <div key={question.key} className="space-y-3">
                    <button
                      onClick={() => {
                        console.log("CLICKED:", question.key);
                        askQuestion(roomId, question.key);
                      }}
                      className={`w-full text-left px-6 py-5 rounded-2xl transition-all duration-200 border 
                ${isSelected
                          ? 'bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 border-transparent hover:border-slate-600'
                        }`}
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-lg leading-relaxed pr-4">
                          {question.text}
                        </p>
                        {isSelected && (
                          <div className="text-blue-400 text-xl mt-0.5">✓</div>
                        )}
                      </div>
                    </button>

                    {/* Answer appears directly below the selected question */}
                    {isSelected && hintAnswer && (
                      <div className="ml-4 pl-6 border-l-2 border-blue-500 bg-slate-900/70 rounded-r-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-emerald-400 text-xl">💡</span>
                          <h4 className="font-semibold text-emerald-400">Hint Answer</h4>
                        </div>

                        <p className="text-3xl font-bold text-white leading-tight">
                          {hintAnswer.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}



      </div>

    </div>
  );
}

export default BettingUI