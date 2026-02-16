
export function parseCounterValue(value: string | number) {
  const str = String(value);

  const numberPart = parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
  const suffixPart = str.replace(/[0-9]/g, "");

  return {
    number: numberPart,
    suffix: suffixPart,
  };
}
