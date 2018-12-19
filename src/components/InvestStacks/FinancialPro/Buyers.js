import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as tenderApis from '../../../apis/financail_pro';
import { timeUtils, numberUtils } from '../../../utils';

const { width, height } = Dimensions.get('window');

class Buyers extends Component {
  static navigationOptions = {
    title: '购买列表'
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      investings: null
    };
  }

  refresh = async () => {
    this.setState({
      refreshing: true
    });
    try {
      const { navigation } = this.props;
      const product = navigation.getParam('FinancialPro');
      const res = await tenderApis.querySingleTender({
        finance_id: product.financeid
      });
      if (res.code === 0) {
        this.setState({
          investings: res.investings,
          refreshing: false
        });
        __DEV__ && console.log('THIS.STATE.investings:', this.state.investings);
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  componentDidMount() {
    this.refresh();
  }

  render() {
    __DEV__ && console.log('Buyers screen props:', this.props);
    const { investings } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.refresh}
            refreshing={this.state.refreshing}
            title={'玩命加载中'}
            titleColor={'#646464'}
          />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.head}>
          <View style={{ ...styles.head_text_box, width: '30%' }}>
            <Text style={styles.head_text}>出借人</Text>
          </View>
          <View style={{ ...styles.head_text_box, width: '40%' }}>
            <Text style={styles.head_text}>出借时间</Text>
          </View>
          <View style={{ ...styles.head_text_box, width: '30%' }}>
            <Text style={styles.head_text}>出借金额(元)</Text>
          </View>
        </View>
        {investings && investings.length > 0 ? (
          <View>
            {investings.map(x => {
              return (
                <View style={styles.listItem} key={x.id}>
                  <View style={{ ...styles.head_text_box, width: '33%' }}>
                    <Text style={styles.listItem_text}>{numberUtils.encryptMobile(x.mobile)}</Text>
                  </View>
                  <View style={{ ...styles.head_text_box, width: '33%' }}>
                    <Text style={styles.listItem_text}>{timeUtils.formatDate(x.create_time)}</Text>
                  </View>
                  <View style={{ ...styles.head_text_box, width: '33%' }}>
                    <Text style={styles.listItem_text}>{numberUtils.convertAmount(x.amount / 100)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
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
    color: '#3c3c3c'
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
    fontSize: 12,
    color: '#646464'
  }
});

const mapState2Props = state => {
  return {
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(Buyers);
