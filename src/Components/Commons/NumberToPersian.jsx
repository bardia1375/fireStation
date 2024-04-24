
const numberToPersian = (number) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  
    return number
      .toString()
      .split('')
      .map((digit) => (/\d/.test(digit) ? persianDigits[digit] : digit))
      .join('');
  };
  
  export const numberWithCommasAndPersian = (number) => {
    const formattedNumber = number?.toLocaleString('en-US');
    const persianFormattedNumber = numberToPersian(formattedNumber);
    return persianFormattedNumber;
  };
  
  // useEffect(() => {
  //   setParsedPrice(Price !== null ? parseInt(Price, 10) : 0);
  // }, [Price]);