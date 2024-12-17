export const getRandomPurple = () => {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = 128;

  return `rgb(${red}, ${green}, ${blue})`;
};
