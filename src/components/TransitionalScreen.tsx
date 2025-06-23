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
    <div className="absolute top-0 left-0 w-full z-50 h-full bg-white/30 backdrop-blur-2xl flex flex-col justify-center items-center">
      <div className="w-1/2 h-1/2 p-3  backdrop-blur-2xl rounded-2xl font-lucky text-center flex flex-col justify-center items-center">
        {showWaiting && (
          <div className="flex flex-col justify-center items-center gap-10 ">
            <span className=" text-xl sm:text-5xl animate-pulse bg-black text-white p-4">
              WAITING FOR A RIVAL...
            </span>
            <Link
              onClick={() => setOnline(false)}
              to="/"
              className="active:scale-90 w-full p-3 flex justify-center items-center transition-all duration-100 cursor-pointer bg-white "
            >
              <span className="text-xl text-center sm:text-2xl">GO BACK</span>
            </Link>
          </div>
        )}

        {showDisconnected && (
          <div className="flex flex-col justify-center items-center gap-10">
            <span className=" text-3xl sm:text-5xl  bg-black text-white p-4">
              YOUR RIVAL HAS LEFT
            </span>
            <Link
              to="/"
              className="active:scale-90 p-5 w-[90%] flex justify-center items-center transition-all duration-100 cursor-pointer bg-white  "
            >
              <span className="text-xl text-center sm:text-2xl ">GO BACK</span>
            </Link>
          </div>
        )}

        {showConnecting && (
          <div className="flex flex-col justify-center items-center gap-10 ">
            <span className=" text-xl sm:text-5xl animate-pulse bg-black text-white p-4">
              CONNECTING TO SERVER...
            </span>
            <Link
              onClick={() => setOnline(false)}
              to="/"
              className="active:scale-90 p-3 flex justify-center items-center transition-all duration-100 cursor-pointer bg-white w-[100%] "
            >
              <span className="text-xl text-center sm:text-2xl">GO BACK</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransitionalScreen;
