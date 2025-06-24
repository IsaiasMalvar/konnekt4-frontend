const getRandomSize = () => {
  const width = Math.floor(Math.random() * 4 + 1) * 64;
  const height = Math.floor(Math.random() * 4 + 1) * 64;
  return { width, height };
};

const tiles = Array.from({ length: 100 }, (_, i) => {
  const { width, height } = getRandomSize();
  return (
    <div
      key={i}
      className="bg-gray-700 rounded m-1 shrink-0"
      style={{ width, height }}
    />
  );
});

const RandomTiledBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex flex-wrap bg-gray-900 overflow-hidden -z-30 ">
      {tiles}
    </div>
  );
};

export default RandomTiledBackground;
