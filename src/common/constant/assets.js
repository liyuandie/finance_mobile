export const ASSERT_STATUS = {
  0: {
    iconName: 'times-circle',
    iconType: 'font-awesome',
    iconColor: '#EA0000',
    status: '交易失败'
  },
  1: {
    iconName: 'check-circle',
    iconType: 'font-awesome',
    iconColor: '#00DB00',
    status: '交易成功'
  },
  2: {
    iconName: 'clock-outline',
    iconType: 'material-community',
    iconColor: '#FFD306',
    status: '处理中'
  },
  3: {
    iconName: 'exclamation-circle',
    iconType: 'font-awesome',
    iconColor: '#BEBEBE',
    status: '交易取消'
  }
};

export const ASSERT_TYPE = {};
(function(types) {
  types[(types[7] = '全部')] = 7;
  types[(types[0] = '充值')] = 0;
  types[(types[1] = '提现')] = 1;
  types[(types[2] = '购买')] = 2;
  types[(types[3] = '结息')] = 3;
  types[(types[4] = '购买失败')] = 4;
  types[(types[5] = '取消购买')] = 5;
  types[(types[6] = '还款')] = 6;
})(ASSERT_TYPE);
