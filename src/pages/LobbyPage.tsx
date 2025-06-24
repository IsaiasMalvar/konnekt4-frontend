import { useNavigate } from "react-router";
import LobbyRoomCard from "../components/LobbyRoomCard";
import { context } from "../contexts/useMatchContext";
import { useJoinServer } from "../hooks/useJoinServer";
import TransitionalScreen from "../components/TransitionalScreen";
import RandomTiledBackground from "../components/RandomTiledBackground";
import { useEffect } from "react";

const LobbyPage = (): React.ReactElement => {
  const {
    availableRooms,
    setOnline,
    online,
    setMatchState: setContextMatchState,
  } = context();

  useEffect(() => {
    setContextMatchState({
      markRecord: [],
      player: "P1",
    });
  }, []);

  useJoinServer();

  const navigate = useNavigate();

  const isOneAvailableRoom = availableRooms.length > 1;

  return (
    <div className="scroll h-screen bg-gray-900 p-1 z-10 overflow-y-scroll overflow-hidden flex flex-col justify-center sm:justify-end items-center gap-2 relative">
      <RandomTiledBackground />

      <header className="w-full flex justify-between items-center h-[26%] bg-black fixed top-0 left-0 ">
        <div className="flex justify-center w-[70%] h-[70%] gap-5 relative">
          <div className="min-[10rem]:hidden sm:flex w-[30%] font-serif bg-white text-5xl text-center flex justify-center items-center">
            I
          </div>
          <div className="absolute top-1/2 w-1/2 h-2 bg-black"></div>
          <div className="min-[10rem]:hidden sm:flex w-[30%] font-serif bg-white text-5xl text-center flex justify-center items-center">
            II
          </div>
        </div>
        <div
          className="cursor-pointer text-center h-full flex justify-center items-center"
          onClick={() => {
            setOnline(false);
            navigate("/lobby");
          }}
        >
          <span className="text-5xl md:text-5xl lg:text-8xl text-white p-5 font-monoton">
            KONNEKT4
          </span>
        </div>
        <div className="flex justify-center w-[70%] h-[70%] gap-5 relative">
          <div className="absolute top-1/2 w-1/2 h-2 bg-black"></div>
          <div className="min-[10rem]:hidden sm:flex w-[30%] font-serif bg-white text-5xl text-center flex justify-center items-center">
            III
          </div>
          <div className="min-[10rem]:hidden sm:flex w-[30%] font-serif bg-white text-5xl text-center flex justify-center items-center">
            IV
          </div>
        </div>
      </header>

      {online ? (
        <div className=" flex justify-center items-end w-full h-full z-20 sm:mt-52">
          {!isOneAvailableRoom && <TransitionalScreen />}
          <div
            className={`mb-25 grid  grid-cols-2 gap-5 border-8 border-white p-2 ${
              isOneAvailableRoom ? "h-auto" : ""
            } h-auto`}
          >
            {availableRooms.map((room) => (
              <LobbyRoomCard id={room} key={room} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-[70%] z-50 sm:w-[40%] mt-[10rem] sm:mt-0 flex-col  p-5 gap-2 border-8 border-black text-xl font-lucky flex justify-around items-center">
          <div className="absolute top-[40%] left-1/2 w-screen bg-black h-16 z-0"></div>
          <div className="absolute top-[40%] right-1/2 w-screen bg-black border-black h-16 z-0"></div>
          <button
            onClick={() => setOnline(true)}
            className="transition-all duration-200 bg-black text-white z-10 hover:scale-105 w-full h-full cursor-pointer text-center flex justify-center items-center p-5"
          >
            <span className="text-5xl md:text-7xl font-mono font-bold border-b-2 p-3 border-white">
              ONLINE
            </span>
          </button>
          <button
            onClick={() => {
              setOnline(false);
              navigate("/room/local");
            }}
            className="bg-black text-white z-10 hover:scale-105 w-full h-full cursor-pointer text-center flex justify-center items-center p-5"
          >
            <span className="text-5xl md:text-7xl font-mono font-bold border-t-2 p-3 border-white">
              LOCAL
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LobbyPage;
