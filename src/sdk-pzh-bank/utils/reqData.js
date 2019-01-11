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

// 购买标的
export function getReqDataForInvest(orderNo, tenderNo, amount, investContracts, callbackCfg, applyTime) {
  return {
    orderNo,
    tenderNo,
    amount,
    // couponAmt: 0,
    investContracts,
    busway: '01',
    returnUrl: callbackCfg.investTender.returnUrl,
    notifyUrl: callbackCfg.investTender.notifyUrl,
    remark: 'test',
    applyTime
  };
}
