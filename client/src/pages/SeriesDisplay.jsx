import React from 'react';
import { useGame } from '../gameContext';

const SeriesDisplay = () => {
  const { myPlayer } = useGame();

  const username = myPlayer?.username;
  const numbers = myPlayer?.numbers;
  console.log("my Player", myPlayer)
  if (!myPlayer) {
    return (
      <div className="bg-slate-800 border-gray-800 rounded-2xl p-6">
        <p className="text-gray-400">Loading player data...</p>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-slate-950 via-[#1a1a2e] to-slate-900 border border-purple-500/20 rounded-xl md:rounded-3xl p-3 md:p-6  shadow-2xl relative overflow-hidden">

      {/* Neon top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] md:h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"></div>

      <div className="flex items-center gap-3 mb-3 md:mb-6">
        <div className="px-4  bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2">
          <span className="text-emerald-400 text-xl">✓</span>
          <p className="text-emerald-400 font-md tracking-[2px] text-[10px] md:text-[14px] uppercase">YOUR SELECTION</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 md:gap-3 lg:gap-4">
        {numbers.map((num, index) => (
          <div
            key={num}
            className="group relative bg-gradient-to-br from-[#1e2937] to-[#0f172a] 
                           border-1  border-cyan-100 hover:border-cyan-400
                           rounded-md md:rounded-2xl
                           py-2
                           text-[14px]  md:text-4xl font-black text-white 
                           shadow-xl font-medium shadow-black/60 hover:shadow-cyan-500/30 
                           transition-all duration-300 hover:-translate-y-1
                           flex items-center justify-center min-w-[65px] md:min-w-[80px]"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all"></div>

            <span className="relative z-10 tracking-wider">{num}</span>
          </div>
        ))}
      </div>

      
   
    </div>
  );
};

export default SeriesDisplay;