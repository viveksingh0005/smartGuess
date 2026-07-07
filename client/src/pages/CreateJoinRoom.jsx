import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.context';
import { useGame } from '../gameContext';

const CreateJoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const { joinRoom } = useGame();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if (!user?._id) {
      setError("Please login first");
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/games/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create room");
      }

      const newRoomId = data.roomId;

      if (newRoomId) {
        joinRoom(newRoomId, user._id);
        navigate(`/play/${newRoomId}`);
      } else {
        throw new Error("No room ID received from server");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = () => {
    if (!roomId.trim()) return;
    if (!user?._id) {
      setError("Please login first");
      return;
    }

    const upperRoomId = roomId.toUpperCase().trim();
    joinRoom(upperRoomId, user._id);
    navigate(`/play/${upperRoomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute animate-pulse [animation-duration:3s] inset-0 bg-[radial-gradient(at_20%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute animate-pulse [animation-duration:5s] inset-0 bg-[radial-gradient(at_50%_50%,rgba(16,185,129,0.15),transparent_50%)]"></div>
      <div className="absolute animate-pulse [animation-duration:4s] inset-0 bg-[radial-gradient(at_80%_80%,rgba(59,130,246,0.2),transparent_50%)]"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-3xl shadow-2xl shadow-black/80 p-10 overflow-hidden">
          {/* Header with Neon Glow */}
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl mb-6 shadow-lg shadow-green-500/50 rotate-12  hover:rotate-0 transition-transform duration-300 text-3xl sm:text-6xl">
              <span className="animate-spin [animation-duration:3s]">
                🎲
              </span>


            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white ">
              NUMBER BET
            </h1>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-widest">
              BATTLE
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-2 sm:mt-4 rounded-full"></div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreateRoom}
            disabled={isCreating}
            className="w-full py-3 sm:py-6 px-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-small sm:text-2xl font-medium sm:font-bold  rounded-2xl sm:rounded-3xl  transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-green-500/40 hover:shadow-green-500/60 flex items-center justify-center gap-3 group"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                CREATING BATTLE...
              </>
            ) : (
              <>
                CREATE ROOM ⚡ 
                
              </>
            )}
          </button>

          {error && (
            <div className="mb-8 bg-red-950/70 border border-red-500/50 text-red-400 px-6 py-4 rounded-2xl text-center text-sm font-medium backdrop-blur-sm flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              {error}
            </div>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center my-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
            <span className="absolute bg-zinc-900 px-6 text-zinc-500 text-sm font-mono tracking-[3px]">OR</span>
          </div>

          {/* Join Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-3 tracking-widest text-center">
                ENTER ROOM CODE
              </label>
              <input
                type="text"
                placeholder="SMAGES"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                maxLength={6}
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-white text-center text-xl sm:text-3xl font-mono tracking-[6px] py-3 sm:py-6 rounded-2xl sm:rounded-3xl transition-all duration-300 outline-none uppercase"
              />

            </div>

            <button
              onClick={handleJoinRoom}
              disabled={!roomId.trim() || isCreating}
              className="w-full py-3 sm:py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-small sm:text-2xl font-medium sm:font-bold rounded-2xl sm:rounded-3xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/40 hover:shadow-cyan-500/50 flex items-center justify-center gap-3"
            >
              JOIN BATTLE ⚔️
            
            </button>
          </div>

          {/* Footer flair */}
          <div className="text-center mt-5 sm:mt-10 text-xs text-zinc-500 font-mono">
            REAL-TIME • MULTIPLAYER
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-green-400 rounded-full animate-pulse opacity-30 hidden lg:block"></div>
      <div className="absolute bottom-20 right-16 w-6 h-6 bg-cyan-400 rounded-full animate-pulse opacity-20 hidden lg:block" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default CreateJoinRoom;