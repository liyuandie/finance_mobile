import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as assetsApis from '../../../apis/assets';
import { Icon } from 'react-native-elements';
import { colors, NAVIGATION_COMMON_STYLES } from '../../../config';
import { ASSERT_TYPE, ASSERT_STATUS } from '../../../common/constant/assets';
import { numberUtils, timeUtils } from '../../../utils';
import { Tip, Longlist, SelectPanel, Modal } from 'beeshell';

class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { type, time, status, amount } = this.props;
    let statusCfg = ASSERT_STATUS[status];
    return (
      <View style={styles.item_container}>
        <View style={styles.letfIcon}>
          <Icon
            name={statusCfg.iconName}
            size={35}
            color={statusCfg.iconColor}
            type={statusCfg.iconType}
            containerStyle={styles.iconContainer}
          />
        </View>
        <View style={styles.rightContent}>
          <View style={styles.infos}>
            <Text style={styles.assets_type}>{ASSERT_TYPE[type]}</Text>
            <Text style={styles.assets_time}>{timeUtils.formatDate(time)}</Text>
          </View>
          <View style={styles.amount}>
            <Text style={amount >= 0 ? styles.amount_text : styles.amount_text_minus}>
              {numberUtils.convertAmount(amount / 100)}
            </Text>
            <Text style={status === 1 ? styles.assets_success : styles.assets_failed}>{statusCfg.status}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class TradingRecord extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '交易明细',
      headerRight: (
        <Text style={NAVIGATION_COMMON_STYLES.headerRight} onPress={navigation.getParam('controlFilter')}>
          筛选
        </Text>
      ),
      headerRightContainerStyle: NAVIGATION_COMMON_STYLES.headerRightContainer
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      pageNo: 1,
      totalPage: 0,
      foot_status: 0,
      assets_type: 7,
      refreshing: false,
      tipText: '',
      isShowFilter: false,
      selectPanelInfo: [
        {
          id: 7,
          text: '全部',
          isSelected: true
        },
        {
          id: 0,
          text: '充值'
        },
        {
          id: 1,
          text: '提现'
        },
        {
          id: 2,
          text: '购买'
        },
        {
          id: 3,
          text: '结息'
        },
        {
          id: 4,
          text: '购买失败'
        },
        {
          id: 5,
          text: '取消购买'
        }
      ]
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({ controlFilter: this._controlFilter });
    this.refresh();
  }

  _controlFilter = () => {
    this._modal.open();
  };

  _onFilterSelected = async () => {
    await this._modal.close();
    this.refresh().then(() => {
      this.$tips('刷新成功');
    });
  };

  refresh = async () => {
    const { mobile, ticket, lender_contract } = this.props;
    try {
      const res = await assetsApis.getUserTradingRecord({
        mobile,
        ticket,
        user_id: lender_contract.contracts,
        assets_type: this.state.assets_type,
        limit: 10,
        offset: 0
      });
      await this.setState({
        records: res.user_assets,
        totalPage: res.total,
        foot_status: 0
      });
      __DEV__ && console.log('this.state.records', this.state.records);
    } catch (error) {
      this.$tips('刷新失败');
    }
    this.setState({
      pageNo: 1
    });
  };

  loadMore = async () => {
    // 没有更多了
    if (this.state.pageNo >= Math.ceil(this.state.totalPage / 10)) {
      this.setState({
        foot_status: 2
      });
      return;
    }
    // 获取更多数据
    if (this.state.pageNo == NaN) return;
    let { mobile, ticket, lender_contract } = this.props;
    try {
      this.setState({
        foot_status: 1
      });
      let res = await assetsApis.getUserTradingRecord({
        mobile,
        ticket,
        user_id: lender_contract.contracts,
        assets_type: this.state.assets_type,
        offset: this.state.pageNo * 10,
        limit: 10
      });
      await this.setState({
        records: this.state.records.concat(res.user_assets),
        pageNo: this.state.pageNo + 1,
        foot_status: 0
      });
      __DEV__ && console.log('this.state.records', this.state.records);
    } catch (error) {
      console.log(error);
      this.$tips('加载失败');
      this.setState({
        foot_status: 0
      });
    }
  };

  $tips = async signal => {
    await this.setState({ tipText: signal });
    this._tip.open();
    return;
  };

  Footer = () => {
    if (this.state.foot_status === 2) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footer_text}>没有更多数据了</Text>
        </View>
      );
    } else if (this.state.foot_status === 1) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footer_text}>玩命加载中...</Text>
        </View>
      );
    } else if (this.state.foot_status === 0) {
      return (
        <View style={{ display: 'none' }}>
          <Text />
        </View>
      );
    }
  };

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => {
    return (
      <ListItem
        id={item.id.toString()}
        type={item.assets_type}
        time={item.update_time}
        status={item.assets_status}
        amount={item.assets_amount}
      />
    );
  };

  render() {
    __DEV__ && console.log('Trading Record screen props:', this.props);
    const { records } = this.state;
    // if (!records || records.length === 0) {
    //   return <Text style={styles.empty}> 暂时没有交易记录 </Text>;
    // }
    return (
      <View style={styles.container}>
        <Tip
          ref={c => {
            this._tip = c;
          }}
          body={this.state.tipText}
          duration={3000}
          alignItems="flex-end"
        />
        <Modal
          ref={c => {
            this._modal = c;
          }}
          cancelable={true}
        >
          <SelectPanel
            selectPanelInfo={this.state.selectPanelInfo}
            onSelected={async (selectedChoice, selectPanelInfo) => {
              await this.setState({
                selectPanelInfo,
                assets_type: selectedChoice.id
              });
              this._onFilterSelected();
            }}
          />
        </Modal>
        {records && records.length !== 0 ? (
          <Longlist
            data={records}
            hasRefreshControl={true}
            renderItem={this._renderItem}
            // keyExtractor={this._keyExtractor}
            onEndReached={this.loadMore}
            onRefresh={async () => {
              this.refresh().then(() => {
                this.$tips('刷新成功');
              });
            }}
          />
        ) : (
          <Text style={styles.empty}> 暂时没有交易记录 </Text>
        )}
        <this.Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  letfIcon: {
    width: '15%'
  },
  iconContainer: {
    paddingTop: 7
  },
  rightContent: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#BEBEBE',
    justifyContent: 'space-between',
    height: 80,
    width: '80%',
    marginRight: 20
  },
  infos: {
    justifyContent: 'space-between'
  },
  assets_time: {
    color: '#5B5B5B',
    fontSize: 12,
    paddingBottom: 10
  },
  assets_type: {
    color: '#000000',
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '100'
  },
  amount: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  amount_text: {
    paddingTop: 10,
    color: '#FF5809',
    fontSize: 18,
    fontStyle: 'italic'
  },
  amount_text_minus: {
    paddingTop: 10,
    color: '#272727',
    fontSize: 18,
    fontStyle: 'italic'
  },
  assets_success: {
    color: '#5B5B5B',
    fontSize: 12,
    paddingBottom: 10
  },
  assets_failed: {
    color: '#FF2D2D',
    fontSize: 12,
    paddingBottom: 10
  },
  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  footer_text: {
    color: '#5B5B5B'
  },
  empty: {
    textAlign: 'center',
    padding: 10,
    color: '#646464'
  },
  filter_container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#ffffff',
    top: 0
  }
});

const mapState2Props = state => {
  return {
    lender_contract: state.lender_contract,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(TradingRecord);
