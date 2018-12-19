import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as tenderApis from '../../apis/financail_pro';
import { Tip, Longlist } from 'beeshell';
import { colors } from '../../config';
import { timeUtils, tenderUtils } from '../../utils';
import ListItem from './ListItem';

class CunDan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      refreshing: false,
      tipText: '',
      foot_status: 0,
      pageNo: 1,
      totalPage: 0
    };
  }
  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    try {
      const res = await tenderApis.getAllTenders({
        limit: 10,
        ftype: 3
      });
      this.setState({
        products: res.tenders,
        totalPage: res.total,
        foot_status: 0
      });
      __DEV__ && console.log('存单：', this.state.products);
      return res;
    } catch (error) {
      this.$tips('获取失败，请手动刷新或稍后再试');
    }
    this.setState({
      pageNo: 1
    });
  };

  loadMore = async () => {
    // 没有更多了
    if (this.state.pageNo >= Math.ceil(this.state.totalPage / 10)) {
      // this.$tips('已经到最底啦');
      return;
    }
    // 获取更多数据
    if (this.state.pageNo == NaN) return;
    try {
      this.setState({
        foot_status: 1
      });
      let res = await tenderApis.getAllTenders({
        ftype: 3,
        offset: this.state.pageNo * 10,
        limit: 10
      });
      await this.setState({
        products: this.state.products.concat(res.tenders),
        pageNo: this.state.pageNo + 1,
        foot_status: 0
      });
      __DEV__ && console.log('加载更多后存单：', this.state.products);
    } catch (error) {
      this.$tips('加载失败');
      this.setState({
        foot_status: 0
      });
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

  _renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <ListItem
        id={item.id.toString()}
        name={item.name}
        interest={item.interest}
        daysOfEaring={timeUtils.daysOfEaring(item)}
        percent={tenderUtils.getRemindPercent(item)}
        type={item.fType}
        remind={item.finance_info.remind}
        isBuyable={tenderUtils.isBuyalbe(item)}
        btnText={tenderUtils.getBtnText(item)}
        _onPress={() => {
          navigation.push('FinancialPro', {
            product: item
          });
        }}
      />
    );
  };

  Footer = () => {
    if (this.state.foot_status === 1) {
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

  render() {
    let { products } = this.state;
    return (
      <View style={styles.container}>
        <this.Footer />
        <Tip
          ref={c => {
            this._tip = c;
          }}
          body={this.state.tipText}
          duration={2000}
          alignItems="flex-end"
        />
        {products && products.length !== 0 ? (
          <Longlist
            data={products}
            hasRefreshControl={true}
            renderItem={this._renderItem}
            onEndReached={this.loadMore}
            onRefresh={async () => {
              this.refresh().then(() => {
                this.$tips('刷新成功');
              });
            }}
          />
        ) : (
          <Text style={{ ...styles.title, paddingTop: 10, color: '#3c3c3c' }}>暂无产品，请耐心等待或尝试下拉刷新</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    paddingTop: 15,
    color: colors.THEME_COLOR
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
  }
});

export default CunDan;
