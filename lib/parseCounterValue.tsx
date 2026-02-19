export function parseCounterValue(value: string | number) {
  const str = String(value);

  const match = str.match(/(\d[\d,\.]*)/);

  if (!match) {
    return { prefix: str, number: 0, suffix: "" };
  }

  const numberStr = match[0];
  const number = parseInt(numberStr.replace(/,/g, ""), 10);

  // IMPORTANT: no trim()
  const prefix = str.slice(0, match.index!);
  const suffix = str.slice(match.index! + numberStr.length);

  return { prefix, number, suffix };
}
