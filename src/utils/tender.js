export function getRemindPercent(financailPro) {
  if (!financailPro) return 0;
  let total = financailPro.amount;
  let remind = financailPro.finance_info.remind;
  return Math.floor((remind / total) * 100);
}
// 判断是否购买结束
export function isBuyalbe(financialPro) {
  if (!financialPro) return;
  return financialPro.status > 3;
}
// 区分标的状态
export function getBtnText(financialPro) {
  if (!financialPro) return;
  if (financialPro.status > 3 && financialPro.status < 9) {
    return '已售罄';
  } else if (financialPro.status > 8) {
    return '已结清';
  }
  return '立即购买';
}

// 判断标的进程

export function getTenderStatus(financialPro) {
  if (!financialPro) return;
  switch (financialPro.status) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 1;
    case 4:
      return 2;
    case 5:
      return 3;
    case 6:
      return 3;
    case 7:
      return 4;
    case 8:
      return 5;
    case 9:
      return 6;
  }
}
