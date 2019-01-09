import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import * as assetsApis from '../../apis/assets';
import { EMPTY_STYLES, colors, ITEM_STYLES } from '../../config';
import PercentageCircle from 'react-native-percentage-circle';
import { financialProType } from '../../common/constant/tender';
import { numberUtils } from '../../utils';
import { Tip } from 'beeshell';

class MyInvesting extends Component {
  static navigationOptions = {
    title: '我的投资'
  };
  constructor(props) {
    super(props);
    this.state = {
      investings: null,
      total: 0,
      refreshing: false,
      tipText: '',
      emptyText: '请耐心等待或尝试下拉刷新'
    };
  }

  refresh = async () => {
    try {
      this.setState({ refreshing: true });
      const { lenderContract, mobile, ticket } = this.props;
      if (!lenderContract) {
        this.setState({
          emptyText: '您还未签约存管账户，暂无账户投资信息'
        });
        return;
      }
      const res = await assetsApis.getUserInvestSummary({
        mobile,
        ticket,
        user_id: lenderContract.contracts
      });
      if (res.code === 0) {
        if (res.summaries.length === 0) {
          this.setState({
            emptyText: '您还未投资任何产品'
          });
        }
        this.setState({
          investings: res.summaries,
          total: res.total
        });
        __DEV__ && console.log('用户投资产品list:', this.state.investings);
      }
    } catch (error) {
      console.log('error:', error);
    } finally {
      this.setState({ refreshing: false });
    }
  };

  $tips = async signal => {
    try {
      const res = await this.setState({ tipText: signal });
      this._tip.open();
      return res;
    } catch (error) {
      Alert.alert('错误', '稍后再试');
    }
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    __DEV__ && console.log('test_introduce screen props:', this.props);
    const { navigation } = this.props;
    const { investings } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={async () => {
              try {
                await this.refresh().then(() => {
                  this.$tips('刷新成功');
                });
              } catch (error) {
                this.$tips('获取失败，请稍后再试');
              }
            }}
            title={'正在刷新'}
          />
        }
        style={styles.container}
      >
        <Tip
          ref={c => {
            this._tip = c;
          }}
          body={this.state.tipText}
          duration={2000}
          alignItems="flex-end"
        />
        {investings && investings.length > 0 ? (
          investings.map(x => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('FinancialPro', {
                    product: { financeid: x.finance_id, name: x.finance_name }
                  })
                }
                style={{ width: '100%' }}
                key={x.finance_id}
              >
                <View style={styles.ItemContainer}>
                  <View style={styles.row_box}>
                    <Text style={styles.name}>{x.finance_name}</Text>
                    <Text style={styles.type}>{financialProType[x.finance_type]}</Text>
                  </View>
                  <View style={{ ...styles.row_box, borderBottomWidth: 0 }}>
                    <View style={styles.col_box}>
                      <Text style={{ ...ITEM_STYLES.value, color: colors.THEME_COLOR, fontSize: 18 }}>
                        {numberUtils.convertAmount(x.amount / 100)}
                      </Text>
                      <Text style={ITEM_STYLES.key}>出借总额(元)</Text>
                    </View>
                    <View style={styles.col_box}>
                      <Text style={{ ...ITEM_STYLES.value, color: colors.INTEREST_COLOR, fontSize: 18 }}>
                        {(x.profit / 100).toFixed(2)}
                      </Text>
                      <Text style={ITEM_STYLES.key}>预计收益(元)</Text>
                    </View>
                    <View style={styles.col_box}>
                      <PercentageCircle
                        radius={22}
                        percent={(x.amount / x.finance_amount) * 100}
                        color={colors.THEME_COLOR}
                        containerStyle={{ marginBottom: 10 }}
                      />
                      <Text style={{ ...ITEM_STYLES.key, paddingTop: 10 }}>投资占比</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={EMPTY_STYLES.emptyContainer}>
            <Text style={EMPTY_STYLES.emptyText}>{this.state.emptyText}</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  ItemContainer: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    justifyContent: 'space-between',
    // shadowColor: 'red',
    // shadowRadius: 0.01,
    // shadowOpacity: 0.5,
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10
  },
  row_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    borderBottomColor: '#d0d0d0',
    borderBottomWidth: 0.5
  },
  col_box: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    // backgroundColor: 'red',,
    marginBottom: 20
  },
  name: {
    fontSize: 14,
    color: '#646464',
    paddingBottom: 5
  },
  type: {
    fontSize: 11,
    color: '#646464',
    paddingBottom: 5
  }
});

const mapState2Props = state => {
  return {
    mobile: state.mobile,
    ticket: state.ticket,
    lenderContract: state.lender_contract
  };
};

export default connect(
  mapState2Props,
  null
)(MyInvesting);
