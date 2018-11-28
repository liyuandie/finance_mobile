export function transformBankCode2Name(code) {
  switch (code) {
    case 'abc':
      return '农业银行';
    case 'cmb':
      return '招商银行';
    case 'icbc':
      return '工商银行';
    case 'ccb':
      return '建设银行';
    case 'boc':
      return '中国银行';
    case 'bocm':
      return '交通银行';
    case 'spdb':
      return '浦发银行';
    case 'ceb':
      return '光大银行';
    case 'cmbc':
      return '民生银行';
    case 'payh':
      return '平安银行';
    case 'hxb':
      return '华夏银行';
    case 'psbc':
      return '邮储银行';
    case 'citic':
      return '中信银行';
    default:
      return '未知';
  }
}
