import React, { useState,useEffect } from "react";
import { useGame } from "../gameContext";
import { useNavigate } from "react-router-dom";
import SeriesDisplay from "./SeriesDisplay";
const NumberSelector = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const navigate = useNavigate();
  
  const {
    myPlayer,
    opponentPlayer,
    submitNumbers,
    roomId,
    gameState,
    myUserId,
  } = useGame();
console.log("gameState:", gameState);
console.log("players:", gameState?.players);
console.log("myUserId:", myUserId);
  if (!gameState) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
        Loading Room...
      </div>
    );
  }


const mySeries = myPlayer?.numbers || [];



 
  const opponentSeries = opponentPlayer?.numbers || [];

  const mySeriesLocked = mySeries.length === 8;
  const opponentSeriesLocked = opponentSeries.length === 8;

  const ready = mySeriesLocked && opponentSeriesLocked;

  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(
        selectedNumbers.filter((n) => n !== num)
      );
      return;
    }

    if (selectedNumbers.length >= 8) {
      alert("You can only select 8 numbers");
      return;
    }

    setSelectedNumbers(
      [...selectedNumbers, num].sort((a, b) => a - b)
    );
  };

  const lockSeries = () => {
    if (selectedNumbers.length !== 8) {
      alert("Please select exactly 8 numbers");
      return;
    }
    
    submitNumbers(roomId, selectedNumbers);
    setMySeries(selectedNumbers);
   
  };

  
useEffect(() => {
  if (gameState?.status === "betting") {
    navigate(`/betting/${roomId}`);
    console.log(gameState?.status )
  }
}, [gameState?.status]);
  return (
    <div className=" bg-gray-950 text-white  mt-2 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-3 md:p-8">
       {/* <SeriesDisplay /> */}
       
        <div className="mb-3 text-md md:text-xl md:mb-8 text-center">

          {!mySeriesLocked && (
            <div className="inline-block bg-blue-900/30 border border-blue-500 px-6 py-3 rounded-md md:rounded-2xl">
              Select Your Secret Series of 8 unique numbers
            </div>
          )}

          {mySeriesLocked && !opponentSeriesLocked && (
            <div className="inline-block bg-yellow-900/30 border border-yellow-500 px-6 py-3 rounded-md md:rounded-2xl">
              Waiting For Opponent...
            </div>
          )}

          {ready && (
            <div className="inline-block bg-emerald-900/30 border border-emerald-500 px-6 py-3 rounded-2xl">
              Both Players Ready
            </div>
          )}

        </div>

        {/* Locked Series Display */}
        <div className="grid md:grid-cols-2 gap-2 md:gap-8 ">

          {/* My Series */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-2 md:p-6">
            <h2 className="text-xl md:text-2xl font-medium md:font-bold text-blue-400 mb-2 md:mb-5">
              {myPlayer?.username}
              {console.log(myPlayer?.username)}
            </h2>

            {mySeries.length > 0 ? (
              <>
                <p className="text-emerald-400 mb-1 md:mb-4">
                  ✓ Series Locked
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {mySeries.map((num) => (
                    <div
                      key={num}
                      className="bg-blue-600 px-2 md:px-5 py-2 md:py-3 rounded-xl text-md md:text-xl font-bold"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500">
                Not selected yet
              </p>
            )}
          </div>

          {/* Opponent Series */}
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-2 md:p-6">
            <h2 className="text-xl md:text-2xl font-medium md:font-bold text-rose-400 mb-2 md:mb-5">
              {opponentPlayer?.username}
               {console.log(opponentPlayer?.username)}
            </h2>

            {opponentSeriesLocked ? (
              <>
                <p className="text-emerald-400 mb-1 md:mb-4">
                  ✓ Opponent Ready
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-rose-600 px-2 md:px-5 py-2 md:py-3 rounded-xl text-md md:text-xl  font-bold"
                    >
                      ?
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500">
                Waiting for opponent...
              </p>
            )}
          </div>

        </div>

        {/* Number Selection */}
        {!mySeriesLocked && (
          <>
            <div className="mb-6">
              <h3 className="text-lg text-gray-400 mb-4">
                Selected Numbers ({selectedNumbers.length}/8)
              </h3>

              <div className="min-h-[80px] bg-gray-950 border border-gray-800 rounded-2xl p-4 flex flex-wrap gap-3">
                {selectedNumbers.length > 0 ? (
                  selectedNumbers.map((num) => (
                    <div
                      key={num}
                      className="bg-yellow-500 text-black px-4 py-2 rounded-xl text-xl font-bold"
                    >
                      {num}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No numbers selected
                  </p>
                )}
              </div>
            </div>

            {/* Number Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-8">
              {Array.from({ length: 16 }, (_, i) => i).map((num) => (
                <button
                  key={num}
                  onClick={() => toggleNumber(num)}
                  className={`
                    h-16 rounded-2xl text-xl font-bold transition-all duration-200 border
                    ${
                      selectedNumbers.includes(num)
                        ? "bg-blue-600 border-blue-400 scale-105 shadow-lg shadow-blue-500/30"
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }
                  `}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Lock Button */}
            <button
              onClick={lockSeries}
              disabled={selectedNumbers.length !== 8}
              className="
                w-full py-4 rounded-2xl font-bold text-lg
                bg-emerald-600 hover:bg-emerald-500
                disabled:bg-gray-700 disabled:cursor-not-allowed
                transition-all
              "
            >
              LOCK MY SERIES
            </button>
          </>
        )}

        {/* Ready State */}
        {ready && (
          <div className="mt-8 bg-emerald-900/20 border border-emerald-500 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-emerald-400 mb-3">
              Ready To Start Betting
            </h2>

            <p className="text-gray-300 mb-6">
              Both players have locked their secret series.
            </p>

            
          </div>
        )}

      </div>
    </div>
  );
};

export default NumberSelector;