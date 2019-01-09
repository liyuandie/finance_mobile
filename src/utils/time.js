// 格式化时间 xxxx-xx-xx xx:xx:xx
export function formatDate(time) {
  return `${time.slice(0, 10)} ${time.slice(11, 19)}`;
}

// 格式化时间 xxxx-xx-xx
export function formatDateSimple(time) {
  return `${time.slice(0, 10)}`;
}

// 计算投资期限
export function daysOfEaring(financialPro) {
  let start = new Date(financialPro.earning_process_time).getTime();
  let end = new Date(financialPro.earning_end_time).getTime();
  return Math.floor((end - start) / (24 * 3600 * 1000));
}

// 获取当前时间 格式：YYYY-MM-DD hh:mm:ss

export function getCurrentTime() {
  let obj = new Date();
  let year = obj.getFullYear();
  let month = obj.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let day = obj.getDate();
  day = day < 10 ? '0' + day : day;
  let h = obj.getHours();
  h = h < 10 ? '0' + h : h;
  let m = obj.getMinutes();
  m = m < 10 ? '0' + m : m;
  let s = obj.getSeconds();
  s = s < 10 ? '0' + s : s;
  return `${year}-${month}-${day} ${h}:${m}:${s}`;
}
