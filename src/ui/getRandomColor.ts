export function getRandomColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const yellow = Math.floor(Math.random() * 256);

  // Construct the CSS color string
  const color = `rgb(${red}, ${green}, ${yellow})`;

  return color;
}
