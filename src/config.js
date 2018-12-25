import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export let API_BASE_URL = __DEV__ ? `https://api.dev.gogofinance.com` : `https://api.prod.gogofinance.com`;
// export let API_BASE_URL = `https://api.prod.gogofinance.com`;

export const colors = {
  LOGO_COLOR: '#E38537',
  THEME_COLOR: '#46A3FF',
  // THEME_COLOR: '#E38537',
  HEADER_TINT_COLOR: '#ffffff',
  TAB_BAR_BG_COLOR: '#ffffff',
  INACTIVE_TINT_COLOR: '#8E8E8E',
  SETTING_ICON_COLOR: '#bebebe',
  ICON_BANK: '#EAC100',
  ICON_SUCCESS: '#00DB00',
  BANK_CARD_BACKGROUND: '#ff7575',
  BORDER_COLOR: '#e0e0e0',
  INTEREST_COLOR: '#FF5809',
  NORMAL_TEXT_COLOR: '#272727'
};

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

// 注意格式 v1.v2.v3;
export const VERSION = '1.7.0';

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

export const LIST_COMMON_STYLES = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItemContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    marginLeft: 10,
    marginRight: 10
  },
  listItemContainerWithBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    marginLeft: 10,
    marginRight: 10
  },
  listItemTitle: {
    fontSize: 14,
    color: '#000000',
    paddingLeft: 5
  },
  listItemRightTitle: {
    fontSize: 14,
    color: '#646464'
  }
});

export const NAVIGATION_COMMON_STYLES = StyleSheet.create({
  headerRight: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500'
  },
  headerRightContainer: {
    paddingRight: 15
  }
});

export const EMPTY_STYLES = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height
  },
  emptyText: {
    color: '#272727'
  }
});

export const ITEM_STYLES = StyleSheet.create({
  value: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  key: {
    fontSize: 12,
    color: '#8e8e8e'
  }
});
