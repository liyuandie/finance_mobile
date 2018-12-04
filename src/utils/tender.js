export function getRemindPercent(financailPro) {
  if (!financailPro) return 0;
  let total = financailPro.amount;
  let remind = financailPro.finance_info.remind;
  return Math.floor((remind / total) * 100);
}
