import { useNavigate } from "react-router";
import LobbyRoomCard from "../components/LobbyRoomCard";
import { context } from "../contexts/useMatchContext";
import { useJoinServer } from "../hooks/useJoinServer";
import TransitionalScreen from "../components/TransitionalScreen";
import RandomTiledBackground from "../components/RandomTiledBackground";

const LobbyPage = (): React.ReactElement => {
  const { availableRooms, setOnline, online } = context();
  useJoinServer();
  const navigate = useNavigate();

  const isOneAvailableRoom = availableRooms.length > 1;

  return (
    <div className="h-screen bg-gray-900 z-10 overflow-y-scroll overflow-hidden flex flex-col justify-around items-center gap-2 relative">
      <RandomTiledBackground />

      <header className="w-full flex justify-between items-center relative h-[26%] bg-black">
        <div className="absolute top-1/2 w-screen h-2 bg-black"></div>
        <div className="flex  justify-center w-[40%] h-[40%] gap-2">
          <div className="w-[20%]  bg-white "></div>
          <div className="w-[20%]  bg-white"></div>
        </div>
        <div
          className="  cursor-pointer text-center h-full flex justify-center items-center"
          onClick={() => {
            setOnline(false);
            navigate("/lobby");
          }}
        >
          <span className="text-4xl md:text-5xl lg:text-8xl text-white p-5 font-mono">
            KONNEKT4
          </span>
        </div>
        <div className="flex r justify-center w-[40%] h-[40%] gap-2">
          <div className="w-[20%]  bg-white"></div>
          <div className="w-[20%]  bg-white"></div>
        </div>
      </header>
      {online ? (
        <div className="flex mb-5 justify-center items-center w-full h-full md:h-[90%]  z-20">
          {!isOneAvailableRoom && <TransitionalScreen />}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 w-[50%]   gap-5 border-8 border-white p-2 ${
              isOneAvailableRoom ? "h-screen" : ""
            }  sm:h-auto`}
          >
            {availableRooms.map((room) => (
              <LobbyRoomCard id={room} key={room} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative w-[70%] z-50  sm:w-[40%] flex-col   h-[60%] p-5 gap-2 border-8 border-black  text-xl font-lucky  flex justify-around items-center">
          <div className="absolute top-1/2 left-1/2 w-screen bg-gray-50 h-1  z-0"></div>
          <div className="absolute top-1/2 right-1/2 w-screen bg-gray-50 border-black h-1 z-0"></div>
          <button
            onClick={() => setOnline(true)}
            className=" bg-black text-white z-10 hover:scale-105 w-full h-full cursor-pointer  text-center flex justify-center items-center     p-5 "
          >
            <span className="text-5xl md:text-7xl">ONLINE</span>
          </button>
          <button
            onClick={() => {
              setOnline(false);
              navigate("/room/local");
            }}
            className=" bg-black text-white z-10  hover:scale-105 w-full h-full cursor-pointer  text-center flex justify-center items-center   p-5  "
          >
            <span className="text-5xl md:text-7xl">LOCAL</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LobbyPage;
