const getRandomWord = async (num: number) => {
  let word: string = await fetch(
    `https://random-word-api.herokuapp.com/word?length=${num}`
  )
    .then((response) => response.json())
    .then((data) => data[0]);

  return word;
};

export default getRandomWord;
