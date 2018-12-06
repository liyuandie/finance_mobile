export function getRemindPercent(financailPro) {
  if (!financailPro) return 0;
  let total = financailPro.amount;
  let remind = financailPro.finance_info.remind;
  return Math.floor((remind / total) * 100);
}

export function isBuyalbe(financialPro) {
  return financialPro.status > 3;
}
export function getBtnText(financialPro) {
  if (financialPro.status > 3 && financialPro.status < 9) {
    return '已售罄';
  } else if (financialPro.status > 8) {
    return '已结清';
  }
  return '立即购买';
}
