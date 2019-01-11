// 格式化金额数量
export function convertAmount(number, places, thousand, decimal) {
  number = number || 0;
  places = !isNaN((places = Math.abs(places))) ? places : 2;
  thousand = thousand || ',';
  decimal = decimal || '.';
  let negative = number < 0 ? '-' : '',
    i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
      : '')
  );
}

//用户手机号保护

export function encryptMobile(mobile) {
  if (!mobile) return '未知';
  return `${mobile.slice(0, 3)}****${mobile.slice(7, 11)}`;
}
// 计算投资收益

export function countProfit(BuyAmount, daysOfEring, interest) {
  const BuyAmountNum = parseInt(BuyAmount);
  if (!BuyAmountNum || BuyAmountNum <= 0) {
    return '0';
  }
  return (BuyAmountNum * (interest * (daysOfEring / 365))).toFixed(2);
}
// 货币转换：分-元
export function fen2yuan(value) {
  return value / 100;
}
// 货币转换：分-元
export function yuan2fen(value) {
  return value * 100;
}
