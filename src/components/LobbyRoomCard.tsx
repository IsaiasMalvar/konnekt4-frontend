import { useNavigate } from "react-router";

interface LobbyRoomCardProps {
  id: number;
}
const LobbyRoomCard = ({ id }: LobbyRoomCardProps): React.ReactElement => {
  const navigate = useNavigate();

  const onClick = (id: number) => {
    navigate(`/room/${id}`);
  };
  return (
    <div
      className="cursor-pointer hover:scale-105 hover:z-50 backdrop-blur-xl h-[] bg-cyan-300/50  text-amber-300/80 rounded-3xl p-5 text-center flex flex-col justify-center items-center"
      onClick={() => onClick(id)}
    >
      <span className=" font-lucky text-3xl sm:text-4xl md:text-5xl lg:text-7xl p-2 uppercase">{`ROOM ${id}`}</span>
      <span className="font-mono font-extrabold text-orange-700 text-xl sm:text-2xl uppercase">
        Available
      </span>
    </div>
  );
};

export default LobbyRoomCard;
