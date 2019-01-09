import callbackCfg from './callback';

const serviceHash = {
  personalContract: 'reapal.trust.userContract',
  enterpriseContract: 'reapal.trust.comContract',
  cancelContract: 'reapal.trust.userCancelApply',
  resetPassword: 'reapal.trust.findTradePassword',
  modifyPassword: 'reapal.trust.modifyTradePassword',
  charge: 'reapal.trust.depositApply',
  quickCharge: 'reapal.trust.depositWebPay',
  withdraw: 'reapal.trust.withdrawApply',
  bindCard: 'reapal.trust.bankCardForm',
  createTender: 'reapal.trust.tenderApplyNew',
  verifyTender: 'reapal.trust.tenderApplyConfirm',
  investTender: 'reapal.trust.tenderInvest',
  modifyTender: 'reapal.trust.tenderApplyModify',
  repayMent: 'reapal.trust.tenderRefund',
  modifyMobile: 'reapal.trust.mobileModify'
};

const IPAddress = {
  SIT: 'http://47.110.52.224:12010', // VERSION 3.0.5
  UAT: 'http://119.6.53.62:12010'
};

const baseCfg = __DEV__
  ? {
      GETWAYS: {
        signContract: `${IPAddress.UAT}/reagw/agreement/agree.htm`, //签约，个人、企业通用
        cancelContract: `${IPAddress.UAT}/reagw/user/cancel.htm`, // 解约
        password: `${IPAddress.UAT}/reagw/findTradePassword/findTradePassword.htm`, // 密码
        charge: `${IPAddress.UAT}/reagw/service/deposit.htm`, // 充值
        quickCharge: `${IPAddress.UAT}/reagw/service/depwit.htm`, // 快速充值
        withdraw: `${IPAddress.UAT}/reagw/service/withdraw.htm`, // 提现
        bindCard: `${IPAddress.UAT}/reagw/bankcard/bankCardForm.htm`, // 绑卡
        tender: `${IPAddress.UAT}/reagw/tender/rest.htm`, // 投标
        repayMent: `${IPAddress.UAT}/reagw/tender/rest.htm`, // 还款
        modifyMobile: `${IPAddress.UAT}/reagw/user/rest.htm` // 修改签约手机号
      },
      service: serviceHash,
      // partner: '102200000074885', // 平台在存管的商户号(SIT)
      partner: '102200000014444', // 平台在存管的商户号(UAT)
      // key: '20c83f1a4deda3961g7bbe590915c4fb386cfb4fb57ea42ba842766b2962cd16', // 签名用到的key(SIT)
      key: '3472800c9219524e35c224cc966g68ff6f690g29a02e1g10df10f14eag491226', //签名用到的key(UAT)
      signType: '0', // MD5
      version: '3.0'
    }
  : {
      GETWAYS: {
        signContract: 'https://ebank.pzhccb.com:12010/reagw/agreement/agree.htm',
        cancelContract: 'https://ebank.pzhccb.com:12010/reagw/user/cancel.htm',
        password: 'https://ebank.pzhccb.com:12010/reagw/findTradePassword/findTradePassword.htm',
        charge: 'https://ebank.pzhccb.com:12010/reagw/service/deposit.htm',
        quickCharge: 'https://ebank.pzhccb.com:12010/reagw/service/depwit.htm',
        withdraw: 'https://ebank.pzhccb.com:12010/reagw/service/withdraw.htm',
        bindCard: 'https://ebank.pzhccb.com:12010/reagw/bankcard/bankCardForm.htm',
        tender: 'https://ebank.pzhccb.com:12010/reagw/tender/rest.htm',
        repayMent: 'https://ebank.pzhccb.com:12010/reagw/tender/rest.htm',
        modifyMobile: 'https://ebank.pzhccb.com:12010/reagw/user/rest.htm'
      },
      service: serviceHash,
      partner: '102200000067851', // 平台在存管的商户号
      key: 'e22c5ge7c32d7ecc7cd149f4e093g1fe0d9911410ee01c0c2563a13e5999895e', // 签名用到的key
      signType: '0', // MD5
      version: '3.0'
    };

export { baseCfg, callbackCfg };
