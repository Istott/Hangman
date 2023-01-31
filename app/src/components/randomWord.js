const getRandomWord = async (num) => {
    let word = await fetch(
      `https://random-word-api.herokuapp.com/word?length=${num}`
    )
      .then((response) => response.json())
      .then((data) => data[0]);
  
    return word;
  };
  
  export default getRandomWord;
  