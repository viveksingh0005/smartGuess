// pages/TestDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../gameContext';
import { useAuth } from '../auth.context';
import NumberSelector from './NumberSelector';
import { Copy, Check } from 'lucide-react';
const PlayGame = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { gameState, joinRoom, socket } = useGame();

  const [interactionCount, setInteractionCount] = useState(0);
  const [lastActionMessage, setLastActionMessage] = useState("No actions recorded yet.");

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // revert after 2s
  };


  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useEffect(() => {
    const initGameRoomConnection = async () => {
      // 💡 Prevent infinite socket spam loops and ensure user data is ready
      if (!roomId || !user?._id || hasJoinedRoom) return;

      const strictRoomId = roomId.toUpperCase();

      try {
        console.log(`📡 [STEP 1/2] Registering user in DB via HTTP...`);

        // 1. Force the HTTP join route first so Mongoose pushes the player to the array
        const response = await fetch('http://localhost:5000/api/games/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization token if your authMiddleware demands it
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ roomId: strictRoomId, userId: user._id })
        });

        console.log("JOIN STATUS:", response.status);

        const data = await response.json();

        console.log("JOIN RESPONSE:", data);



        if (data.success) {
          console.log(`🔌 [STEP 2/2] DB entry confirmed! Binding WebSocket channel...`);

          // 2. Lock the toggle state to prevent infinite loops
          setHasJoinedRoom(true);

          // 3. Trigger your GameContext socket join event
          joinRoom(strictRoomId, user._id);
        } else {
          console.error("❌ Failed to join room array:", data.message);
        }
      } catch (error) {
        console.error("❌ Error setting up room synchronization bridge:", error);
      }
    };

    initGameRoomConnection();
  }, [roomId, user?._id]);


  // Set up a custom test listener for instant cross-browser interactions
  useEffect(() => {
    if (!socket) return;

    const handleTestInteraction = (data) => {
      console.log("⚡ TEST INTERACTION RECEIVED:", data);
      setInteractionCount(prev => prev + 1);
      setLastActionMessage(`User ${data.username} clicked the interaction button!`);
    };

    socket.on('test_interaction_received', handleTestInteraction);

    return () => {
      socket.off('test_interaction_received', handleTestInteraction);
    };
  }, [socket]);

  // Trigger interaction event
  const sendTestSignal = () => {
    if (!socket || !roomId) return;

    console.log("🚀 Sending interaction signal to room:", roomId);
    socket.emit('trigger_test_interaction', {
      roomId: roomId.toUpperCase(),
      username: user?.username || "Anonymous"
    });
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-400">Loading Test Room State for {roomId}...</p>
      </div>
    );
  }

  const handleShare = async () => {
    const inviteLink =
      `${window.location.origin}/play/${roomId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my SmartGuess room!",
          text: `Join my room: ${roomId}`,
          url: inviteLink,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(inviteLink);
      alert("Invite link copied!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-2 md:p-6 font-sans">
      <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-2 md:p-6 shadow-2xl">

        {/* Header */}
        <div className=" border-gray-800  mb-2 md:mb-6">
          <h1 className=" text-small md:text-2xl font-bold text-blue-400">
            SmartGuess
          </h1>

          <div className="flex items-center justify-between  mt-2">
            <p className="text-sm md:text-xl text-gray-400 font-mono">
              Room Code:
              <span className="text-white font-bold ml-1">
                {roomId?.toUpperCase()}
              </span>
            </p>

            <div className='flex intems-center gap-2 md:gap-8'>
              <button
                onClick={handleCopy}
                className="px-3 py-1 text-xs md:text-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="px-3 py-1 text-xs md:text-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Share
              </button>
            </div>


          </div>
        </div>





        {/* <button
          onClick={() => navigate('/')}
          className="w-full text-xs text-gray-500 hover:text-gray-400 text-center mt-6 transition underline"
        >
          Exit Room Layout
        </button> */}
      </div>
      <NumberSelector />
    </div>
  );
};

export default PlayGame;