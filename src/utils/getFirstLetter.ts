const getFirstLetter = (text: string, letterCount = 2): string => {
  const words = text.split(/\s/);
  let selectedWords: string[] = [];

  if (letterCount >= words.length) {
    selectedWords = words;
  } else {
    const firstWords = words.slice(0, Math.ceil(letterCount / 2));
    const lastWords = words.slice(-Math.floor(letterCount / 2));
    selectedWords = [...firstWords, ...lastWords];
  }

  return selectedWords
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default getFirstLetter;
