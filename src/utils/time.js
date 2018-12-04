export function formatDate(time) {
  return `${time.slice(0, 10)} ${time.slice(11, 19)}`;
}

// 计算投资期限
export function daysOfEaring(financialPro) {
  let start = new Date(financialPro.earning_process_time).getTime();
  let end = new Date(financialPro.earning_end_time).getTime();
  return Math.floor((end - start) / (24 * 3600 * 1000));
}
