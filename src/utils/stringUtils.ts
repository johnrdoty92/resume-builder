export const splitCamelCaseWords = (str: string) => {
  let answer = "";
  let l = 0;
  const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|the|to|)$/i;
  for (let r = 0; r < str.length; r++) {
    const code = str[r].charCodeAt(0);
    if (code > 90 || code < 65) continue;
    const isSmallWord = str.slice(l, r).match(smallWords);
    answer +=
      (isSmallWord
        ? str.slice(l, r).toLowerCase()
        : str[l].toUpperCase() + str.slice(l + 1, r).toLowerCase()) + " ";
    l = r;
  }
  const lastWord = str.slice(l);
  answer += lastWord.match(smallWords) ? lastWord : lastWord[0].toUpperCase() + lastWord.slice(1);
  return answer;
};
