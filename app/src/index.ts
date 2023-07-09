import Player from "./Logic/Player"


export function getGreeting(name: string): string {
  const myObject = new Player();
  myObject.move(5);
  console.log("In ts")
  return `Hello, World !`;
}

const player= new Player();
console.log(player.move(5))

