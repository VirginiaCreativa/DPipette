const tagAbrev = ['adj.', 'adv.', 'prep.', 'intr.', 'tr.'];

const AbreviaturaTag = string => {
  const result = tagAbrev.find((tag, index) => index + 1 === string);
  return result;
};

export default AbreviaturaTag;
