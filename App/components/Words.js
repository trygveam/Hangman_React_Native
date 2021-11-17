var words = ["sugar", "worm", "soda", "keyboard", "car", "india"];

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export { randomWord };
