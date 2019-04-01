function CleanUpSpecialChars(string) {
  return string
    .replace(/[í]/g, 'i')
    .replace(/[á]/g, 'a')
    .replace(/[é]/g, 'e')
    .replace(/[ú]/g, 'u')
    .replace(/[ó]/g, 'o')
    .replace(/[ñ]/g, 'ñ');
}
export default CleanUpSpecialChars;
