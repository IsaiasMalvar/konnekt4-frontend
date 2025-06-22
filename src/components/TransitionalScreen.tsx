import { context } from "../contexts/useMatchContext";
import { Link, useLocation } from "react-router";

const TransitionalScreen = (): React.ReactElement => {
  const { isEmpty, availableRooms, setOnline } = context();
  const location = useLocation();
  const isLobby = location.pathname.includes("lobby");

  const showWaiting = !isEmpty && !isLobby;
  const showDisconnected = isEmpty && !isLobby;
  const showConnecting = availableRooms.length < 1 && isLobby;

  return (
    <div className="w-1/2 h-1/2 p-3 bg-orange-200/15 backdrop-blur-2xl rounded-2xl font-lucky text-center flex flex-col justify-center items-center">
      {showWaiting && (
        <span className="text-orange-700/55 text-3xl sm:text-5xl animate-bounce">
          WAITING FOR A RIVAL!
        </span>
      )}

      {showDisconnected && (
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-orange-700/55 text-3xl sm:text-5xl">
            YOUR RIVAL HAS LEFT!
          </span>
          <Link
            to="/"
            className="active:scale-90 hover:bg-orange-700 hover:text-amber-200 flex justify-center items-center transition-all duration-100 cursor-pointer bg-amber-200 w-[40%] rounded-4xl border-orange-700 p-5 font-bold text-orange-700"
          >
            <span className="text-xl text-center sm:text-2xl">GO BACK!</span>
          </Link>
        </div>
      )}

      {showConnecting && (
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-orange-700/55 text-3xl sm:text-5xl animate-pulse">
            CONNECTING TO SERVER...
          </span>
          <Link
            onClick={() => setOnline(false)}
            to="/"
            className="active:scale-90 hover:bg-orange-700 hover:text-amber-200 flex justify-center items-center transition-all duration-100 cursor-pointer bg-amber-200 w-[40%] rounded-4xl border-orange-700 p-5 font-bold text-orange-700"
          >
            <span className="text-xl text-center sm:text-2xl">GO BACK!</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TransitionalScreen;
