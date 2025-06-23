import { useNavigate } from "react-router";
import LobbyRoomCard from "../components/LobbyRoomCard";
import { context } from "../contexts/useMatchContext";
import { useJoinServer } from "../hooks/useJoinServer";
import TransitionalScreen from "../components/TransitionalScreen";

const LobbyPage = (): React.ReactElement => {
  const { availableRooms, setOnline, online } = context();
  useJoinServer();
  const navigate = useNavigate();

  const isOneAvailableRoom = availableRooms.length > 1;

  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden sm:overflow-hidden flex flex-col justify-around items-center beach-bg gap-2 relative">
      <div className="absolute w-[20%] h-[30%] sm:h-[50%] blur-3xl bg-amber-300/50 bottom-20 left-50 move-around overflow-hidden"></div>
      <div className="absolute w-[20%] h-[30%] sm:h-[50%] blur-3xl bg-amber-300/50 top-0 left-0 move-around overflow-hidden"></div>
      <div className="absolute w-[20%] h-[30%] sm:h-[50%] blur-3xl bg-cyan-300/65 top-0 right-0 z-10 move-around overflow-hidden"></div>
      <div className="absolute w-[20%] h-[30%] sm:h-[50%] blur-3xl bg-cyan-300/65 bottom-20 right-50 z-10 move-around overflow-hidden"></div>
      <header className="w-full flex justify-center items-center mt-4">
        <img
          src="/header.png"
          className="w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] -rotate-6 cursor-pointer"
          onClick={() => {
            setOnline(false);
            navigate("/lobby");
          }}
        />
      </header>
      {online ? (
        <div className="flex mb-5 justify-center items-center w-full h-full md:h-[90%]  z-20">
          {!isOneAvailableRoom && <TransitionalScreen />}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 w-[50%]   gap-5 ${
              isOneAvailableRoom ? "h-screen" : ""
            }  sm:h-auto`}
          >
            {availableRooms.map((room) => (
              <LobbyRoomCard id={room} key={room} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[70%] sm:w-[40%] z-30 flex-col  rounded-2xl h-[40%] p-2 gap-2 text-orange-500 text-xl font-lucky  flex justify-around items-center">
          <button
            onClick={() => setOnline(true)}
            className=" bg-cyan-300/50  text-amber-300/80 hover:scale-105 w-full h-full cursor-pointer  text-center flex justify-center items-center p-2 rounded-2xl"
          >
            <span className="text-5xl md:text-7xl">ONLINE</span>
          </button>
          <button
            onClick={() => {
              setOnline(false);
              navigate("/room/local");
            }}
            className=" bg-cyan-300/50  text-amber-300/80 hover:scale-105 w-full h-full cursor-pointer  text-center flex justify-center items-center p-2 rounded-2xl"
          >
            <span className="text-5xl md:text-7xl">LOCAL</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LobbyPage;
