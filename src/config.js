export let API_BASE_URL = __DEV__ ? `https://api.dev.gogofinance.com` : `https://api.prod.gogofinance.com`;

export const colors = {
  THEME_COLOR: '#E38537',
  HEADER_TINT_COLOR: '#ffffff',
  TAB_BAR_BG_COLOR: '#ffffff',
  INACTIVE_TINT_COLOR: '#8E8E8E',
  SETTING_ICON_COLOR: '#bebebe'
};

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const tabBarCfg = {
  Home: {
    label: '首页',
    iconName: 'home'
  },
  Invest: {
    label: '投资',
    iconName: 'finance'
  },
  User: {
    label: '我',
    iconName: 'account'
  }
};
