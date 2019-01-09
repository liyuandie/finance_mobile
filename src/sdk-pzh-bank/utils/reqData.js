// 个人签约
export function getReqDataForPersonalSignContract(orderNo, userName, callbackCfg, applyTime) {
  return {
    orderNo,
    userName,
    userType: '01',
    busway: '01',
    returnUrl: callbackCfg.personalContract.returnUrl,
    notifyUrl: callbackCfg.personalContract.notifyUrl,
    remark: 'test',
    applyTime
  };
}
