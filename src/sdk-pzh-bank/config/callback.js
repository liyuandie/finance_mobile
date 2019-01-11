// const apiHostBase = window.location.href.replace(
// )

const apiServerbase = __DEV__ ? 'https://api.dev.gogofinance.com' : 'https://api.prod.gogofinance.com';
import { WebviewSource } from './webview';

const callbackCfg = {
  personalContract: {
    returnUrl: `${apiServerbase}/utils/r?u=${WebviewSource}`,
    notifyUrl: `${apiServerbase}/user/callback/userContract`
  },
  enterpriseContract: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-contracts`,
    notifyUrl: `${apiServerbase}/user/callback/comContract`
  },
  personalCancelContract: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-contracts`,
    notifyUrl: `${apiServerbase}/user/callback/userContractCancel`
  },
  enterpriseCancelContract: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-contracts`,
    notifyUrl: `${apiServerbase}/user/callback/comContractCancel`
  },
  resetPassword: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/user-info`,
    notifyUrl: `${apiServerbase}/user/callback/comContractCancel`
  },
  modifyPassword: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/user-info`,
    notifyUrl: `${apiServerbase}/apis/callback/???`
  },
  charge: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/assets/add`
  },
  quickCharge: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/assets/add`
  },
  withdraw: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/assets/add`
  },
  bindCard: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/card/add`
  },
  modifyMobile: {
    returnUrl: `https://api.dev.gogofinance.com/utils/r?u=#/my-contracts`,
    notifyUrl: `${apiServerbase}/user/callback/contractMobileModify`
  },
  verifyTender: {
    returnUrl: `${apiServerbase}/utils/r?u=#/pzh-tender/dashboard`,
    // returnUrl: `?pzh_bank_back_entry=my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/tender/verify`
  },
  verifyModifyingTender: {
    returnUrl: `${apiServerbase}/utils/r?u=#/pzh-tender/dashboard`,
    // returnUrl: `?pzh_bank_back_entry=my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/tender/verify`
  },
  investTender: {
    returnUrl: `${apiServerbase}/utils/r?u=${WebviewSource}`,
    notifyUrl: `${apiServerbase}/apis/callback/tender/invest`
  },
  repayMent: {
    returnUrl: `${apiServerbase}/utils/r?u=#/my-borrow`,
    // returnUrl: `?pzh_bank_back_entry=my-wallet`,
    notifyUrl: `${apiServerbase}/apis/callback/tender/repayment`
  }
};

export default callbackCfg;
