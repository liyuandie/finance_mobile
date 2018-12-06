import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as tenderApis from '../../apis/financail_pro';
import { Tip, Longlist } from 'beeshell';
import { colors } from '../../config';
import { timeUtils, numberUtils, tenderUtils } from '../../utils';
import PercentageCircle from 'react-native-percentage-circle';

class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, interest, daysOfEaring, percent, remind, isBuyable, btnText } = this.props;
    return (
      <View style={styles.product_item}>
        <View style={styles.above}>
          <Text style={styles.product_name}>{name}</Text>
          <View style={styles.info_row_container}>
            <View style={styles.info_column}>
              <View style={styles.value}>
                <Text style={styles.big_text}>{interest.toFixed(2)}</Text>
                <Text style={styles.small}>%</Text>
              </View>
              <Text style={styles.key}>年化收益</Text>
            </View>
            <View style={styles.info_column}>
              <View style={styles.value}>
                <Text style={styles.big_text}>{daysOfEaring}</Text>
                <Text style={{ ...styles.small, color: '#3c3c3c' }}>天</Text>
              </View>
              <Text style={styles.key}>投资期限</Text>
            </View>
            <View style={styles.info_column}>
              <PercentageCircle radius={25} percent={percent} color={colors.THEME_COLOR} />
            </View>
          </View>
        </View>
        <View style={styles.below}>
          <Text style={styles.product_rest}>{`剩余:￥${numberUtils.convertAmount(remind / 100)}`}</Text>
          <Button
            title={btnText}
            backgroundColor={colors.THEME_COLOR}
            buttonStyle={styles.buyButton}
            fontSize={10}
            color="#ffffff"
            borderRadius={5}
            containerViewStyle={{
              marginRight: 10
            }}
            disabled={isBuyable}
          />
        </View>
      </View>
    );
  }
}

class YinPiao extends Component {
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
        ftype: 1
      });
      this.setState({
        products: res.tenders,
        totalPage: res.total,
        foot_status: 0
      });
      __DEV__ && console.log('this.state.products:', this.state.products);
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
        ftype: 1,
        offset: this.state.pageNo * 10,
        limit: 10
      });
      await this.setState({
        products: this.state.products.concat(res.tenders),
        pageNo: this.state.pageNo + 1,
        foot_status: 0
      });
      __DEV__ && console.log('this.state.products', this.state.products);
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
  block: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  product_item: {
    width: '100%'
  },
  above: {
    borderTopColor: colors.BORDER_COLOR,
    borderTopWidth: 0.5
  },
  product_name: {
    fontSize: 13,
    color: '#3c3c3c',
    paddingLeft: 10,
    paddingTop: 10
  },
  info_row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  info_column: {
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  value: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 5
  },
  big_text: {
    fontSize: 25,
    color: '#FF5809'
  },
  small: {
    fontSize: 13,
    color: '#FF5809',
    marginBottom: 4,
    paddingLeft: 5
  },
  key: {
    fontSize: 11,
    color: '#8e8e8e'
  },
  below: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: colors.BORDER_COLOR,
    borderTopWidth: 0.5
  },
  product_type: {
    fontSize: 11,
    color: '#3c3c3c',
    padding: 10
  },
  product_rest: {
    fontSize: 11,
    color: '#3c3c3c',
    padding: 10
  },
  buyButton: {
    width: 40,
    height: 15
  },
  buyButton: {
    padding: 8,
    width: 60
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

export default YinPiao;
