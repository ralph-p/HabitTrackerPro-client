export const getMinutesFromHHMM = (value?: string): number => {
  if (value) {
    const [str1, str2] = value.split(":");

    const val1 = Number(str1);
    const val2 = Number(str2);

    if (!isNaN(val1) && isNaN(val2)) {
      // minutes
      return val1;
    }

    if (!isNaN(val1) && !isNaN(val2)) {
      // hours * 60 + minutes
      return val1 * 60 + val2;
    }

  }
  return 0;
};
const toHHMM = (secs: number) => {
  const minNum = parseInt(secs.toString(), 10);
  const hours = Math.floor(minNum / 60) % 60;
  const minutes = minNum % 60;

  return [hours, minutes]
}
export const toHHMMString = (secs?: number): string | undefined => {
  if(!secs) return undefined
  return toHHMM(secs)
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== "00" || index > 0)
    .join(":")
    .replace(/^0/, "");
};
export const toHHMMDisplay = (secs: number): string => {
  const hhmm = toHHMM(secs)
  if (!hhmm[0]) {
    return `${hhmm[1]}m`
  }
  if (!hhmm[1]) {
    return `${hhmm[0]}h`
  }
  return `${hhmm[0]}h ${hhmm[1]}m`
};