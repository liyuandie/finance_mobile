import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as assetsApis from '../../apis/assets';
import { timeUtils, numberUtils } from '../../utils';
import { Longlist } from 'beeshell';
import { colors } from '../../config';

const { height } = Dimensions.get('window');

class ListItem extends Component {
  render() {
    const { name, create_time, pay_time, amount, profit, id } = this.props;
    return (
      <View style={styles.listItem} key={id}>
        <View style={{ ...styles.head_text_box, width: '25%' }}>
          <Text style={styles.listItem_text}>{name}</Text>
        </View>
        <View style={{ ...styles.head_text_box, width: '20%' }}>
          <Text style={styles.listItem_text}>{timeUtils.formatDateSimple(create_time)}</Text>
        </View>
        <View style={{ ...styles.head_text_box, width: '20%' }}>
          <Text style={styles.listItem_text}>{numberUtils.convertAmount(amount / 100)}</Text>
        </View>
        <View style={{ ...styles.head_text_box, width: '20%' }}>
          <Text style={styles.listItem_text}>{timeUtils.formatDateSimple(pay_time)}</Text>
        </View>
        <View style={{ ...styles.head_text_box, width: '15%' }}>
          <Text style={{ ...styles.listItem_text, color: colors.INTEREST_COLOR }}>{(profit / 100).toFixed(2)}</Text>
        </View>
      </View>
    );
  }
}

class InvestRecord extends Component {
  static navigationOptions = {
    title: '出借记录'
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      investings: null,
      pageNo: 1,
      totalPage: 1,
      refresh_status: 1
    };
  }

  refresh = async () => {
    this.setState({
      refreshing: true,
      refresh_status: 1
    });
    try {
      const { lenderContract, mobile, ticket } = this.props;
      const res = await assetsApis.getUserInvestRecord({
        mobile,
        ticket,
        user_id: lenderContract.contracts,
        limit: 20,
        offset: 0
      });
      if (res.code === 0) {
        this.setState({
          investings: res.user_finances,
          refreshing: false,
          totalPage: res.total
        });
        __DEV__ && console.log('THIS.STATE.investings:', this.state.investings);
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  loadMore = async () => {
    // 没有更多了
    if (this.state.pageNo >= Math.ceil(this.state.totalPage / 20)) {
      this.setState({
        refresh_status: 2
      });
      return;
    }
    this.setState({
      refreshing: true
    });

    // 获取更多数据
    if (this.state.pageNo == NaN) return;
    let { mobile, ticket, lenderContract } = this.props;
    try {
      this.setState({
        refresh_status: 1
      });
      let res = await assetsApis.getUserInvestRecord({
        mobile,
        ticket,
        user_id: lenderContract.contracts,
        offset: this.state.pageNo * 10,
        limit: 10
      });
      await this.setState({
        investings: this.state.investings.concat(res.user_finances),
        pageNo: this.state.pageNo + 1,
        refreshing: false
      });
      __DEV__ && console.log('this.state.records', this.state.investings);
    } catch (error) {
      __DEV__ && console.log(error);
      this.setState({
        refresh_status: 1,
        refreshing: false
      });
    }
  };

  componentDidMount() {
    this.refresh();
  }

  _renderItem = ({ item }) => {
    return (
      <ListItem
        name={item.finance_name}
        create_time={item.create_time}
        pay_time={item.earning_end_time}
        amount={item.amount}
        profit={item.profit}
        id={item.id}
      />
    );
  };

  render() {
    const { investings } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
            title={this.state.refresh_status === 1 ? '玩命加载中' : '没有更多了'}
            titleColor={'#646464'}
          />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.head}>
          <View style={{ ...styles.head_text_box, width: '25%' }}>
            <Text style={styles.head_text}>标的名称</Text>
          </View>
          <View style={{ ...styles.head_text_box, width: '20%' }}>
            <Text style={styles.head_text}>时间</Text>
          </View>
          <View style={{ ...styles.head_text_box, width: '20%' }}>
            <Text style={styles.head_text}>金额(元)</Text>
          </View>
          <View style={{ ...styles.head_text_box, width: '20%' }}>
            <Text style={styles.head_text}>回款日期</Text>
          </View>

          <View style={{ ...styles.head_text_box, width: '15%' }}>
            <Text style={styles.head_text}>收益(元)</Text>
          </View>
        </View>
        {investings && investings.length > 0 ? (
          <Longlist
            data={investings}
            renderItem={this._renderItem}
            hasRefreshControl={false}
            onEndReached={this.loadMore}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>暂无出借记录或尝试下拉刷新</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height
  },
  emptyText: {
    color: '#272727'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    height: 40,
    alignItems: 'center'
  },
  head_text_box: {
    alignItems: 'center'
  },
  head_text: {
    color: '#3c3c3c',
    fontSize: 11
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 50,
    alignItems: 'center'
  },
  listItem_text: {
    fontSize: 11,
    color: '#646464'
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
)(InvestRecord);
