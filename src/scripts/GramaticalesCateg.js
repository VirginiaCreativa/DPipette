const tagAGram = ['adj.', 'adv.', 'verb.'];

const GramaticalesCateg = string => {
  const result = tagAGram.find((tag, index) => index + 1 === string);
  return result;
};

export default GramaticalesCateg;
