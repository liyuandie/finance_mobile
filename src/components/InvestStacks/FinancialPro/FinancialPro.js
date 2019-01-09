import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as tenderApis from '../../../apis/financail_pro';
import { colors, LIST_COMMON_STYLES } from '../../../config';
import { Rating, ListItem, List, Button } from 'react-native-elements';
import StepIndicator from 'react-native-step-indicator';
import { timeUtils, tenderUtils } from '../../../utils';
import { Table, Rows } from 'react-native-table-component';

const { width, height } = Dimensions.get('window');
const labels = ['投资开始', '投资中', '投资结束', '获利中', '获利结束', '回款中', '回款结束'];
const customStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 18,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: colors.LOGO_COLOR,
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: colors.LOGO_COLOR,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.LOGO_COLOR,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.LOGO_COLOR,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: colors.LOGO_COLOR,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: colors.LOGO_COLOR
};

class FinancialPro extends Component {
  static navigationOptions = ({ navigation }) => {
    const product = navigation.getParam('product');
    return {
      title: product ? product.name : '加载中'
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      FinancialPro: null,
      refreshing: false,
      buyers: 0,
      tableData: [
        ['财务情况', '财务状况良好，现金流充裕，在其他互联网借贷平台无借款记录（信息来源：企业财务报表）'],
        ['征信情况', '在报告期内，该企业当前无不良和违约负债余额。（信息来源：企业信用报告）'],
        ['涉诉情况', '无（信息来源：人民法院公告网）'],
        ['逾期情况', '无逾期情况'],
        ['行政处罚', '暂无行政处罚信息']
      ]
    };
  }

  refresh = async () => {
    this.setState({
      refreshing: true
    });
    try {
      const { navigation } = this.props;
      const product = navigation.getParam('product');
      const res = await tenderApis.querySingleTender({
        finance_id: product.financeid
      });
      if (res.code === 0) {
        this.setState({
          FinancialPro: res.tender,
          refreshing: false,
          buyers: res.investings.length
        });
        __DEV__ && console.log('THIS.STATE.FINANCIALPRO:', this.state.FinancialPro);
      }
    } catch (error) {}
  };
  componentDidMount() {
    this.refresh();
    // const FinancialPro = this.props.navigation.getParam('product');
    // this.setState({
    //   FinancialPro: FinancialPro
    // });
    // __DEV__ && console.log('FinancialPro:', this.state.FinancialPro);
  }
  componentWillReceiveProps(nextProps) {
    // const FinancialPro = nextProps.navigation.getParam('product');
    // if (FinancialPro) {
    //   this.setState({
    //     FinancialPro: FinancialPro
    //   });
    //   __DEV__ && console.log('FinancialPro:', this.state.FinancialPro);
    // }
  }

  render() {
    __DEV__ && console.log('FinancialPro screen props:', this.props);
    const { navigation } = this.props;
    const { FinancialPro, tableData, buyers } = this.state;
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this.refresh}
              refreshing={this.state.refreshing}
              title={'玩命加载中'}
              titleColor={'#646464'}
            />
          }
        >
          {FinancialPro && FinancialPro.finance_asset && FinancialPro.finance_info ? (
            <View>
              <View style={styles.block}>
                <View style={styles.col_box}>
                  <View style={styles.interestContainer}>
                    <Text style={styles.big_text}>8.00</Text>
                    <Text style={styles.small}>%</Text>
                  </View>
                  <Text style={{ ...styles.key, paddingBottom: 0, paddingRight: 10 }}>年化收益</Text>
                </View>
                <View style={styles.row_box}>
                  <View style={styles.col_box}>
                    <Text style={styles.key}>投资期限(天)</Text>
                    <Text style={styles.value}>{timeUtils.daysOfEaring(FinancialPro)}</Text>
                  </View>
                  <View style={styles.col_box}>
                    <Text style={styles.key}>起投金额(元)</Text>
                    <Text style={styles.value}>￥1</Text>
                  </View>
                  <View style={styles.col_box}>
                    <Text style={styles.key}>安全等级</Text>
                    <Rating
                      type="star"
                      imageSize={13}
                      readonly
                      ratingCount={FinancialPro.safety_level}
                      startingValue={5}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.block}>
                {/* <Text style={styles.title}>—— 标的周期 ——</Text> */}
                <View style={styles.stepContainer}>
                  <StepIndicator
                    customStyles={customStyles}
                    currentPosition={tenderUtils.getTenderStatus(FinancialPro)}
                    labels={labels}
                    stepCount={7}
                  />
                </View>
                <View style={styles.row_box}>
                  <View style={{ ...styles.col_box, width: '50%', marginTop: 20 }}>
                    <Text style={styles.text}>
                      投资开始：{timeUtils.formatDateSimple(FinancialPro.raise_process_time)}
                    </Text>
                    <Text style={styles.text}>
                      获利开始：{timeUtils.formatDateSimple(FinancialPro.earning_process_time)}
                    </Text>
                  </View>
                  <View style={{ ...styles.col_box, width: '50%', marginTop: 20 }}>
                    <Text style={styles.text}>投资结束：{timeUtils.formatDateSimple(FinancialPro.raise_end_time)}</Text>
                    <Text style={styles.text}>
                      获利结束：{timeUtils.formatDateSimple(FinancialPro.earning_end_time)}
                    </Text>
                  </View>
                </View>
                <List containerStyle={{ ...LIST_COMMON_STYLES.listContainer, width: '100%' }}>
                  <ListItem
                    title={`已有${buyers}人次出借`}
                    containerStyle={{
                      borderTopWidth: 0.2,
                      borderTopColor: '#bebebe',
                      height: 45,
                      ...LIST_COMMON_STYLES.listItemContainer
                    }}
                    titleStyle={{ ...LIST_COMMON_STYLES.listItemTitle, color: colors.INTEREST_COLOR, fontSize: 13 }}
                    rightTitle={'出借记录'}
                    rightTitleStyle={{ ...LIST_COMMON_STYLES.listItemRightTitle, fontSize: 13 }}
                    onPress={() => navigation.push('Buyers', { FinancialPro: FinancialPro })}
                  />
                </List>
              </View>
              <View style={styles.block}>
                <Text style={styles.title}>—— 标的信息 ——</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>项目名称：{FinancialPro.name}</Text>
                  <Text style={styles.text}>投资总额：{(FinancialPro.amount / 100).toFixed(2)} 元</Text>
                  <Text style={styles.text}>可投金额：{(FinancialPro.finance_info.remind / 100).toFixed(2)}</Text>
                  <Text style={styles.text}>投资期限：{timeUtils.daysOfEaring(FinancialPro)} 天</Text>
                  <Text style={styles.text}>回款方式：一次性支付本金和收益</Text>
                  <Text style={styles.text}>
                    计算公式：回款 = 本金+收益 = X*(1+Y*Z/365) (X：出借金额；Y：借款年化利率；Z：借款期限(天))
                  </Text>
                </View>
              </View>
              <View style={styles.block}>
                <Text style={styles.title}>—— 风控详情 ——</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>资产权益类型：{FinancialPro.finance_asset.asset_interest_type}</Text>
                  <Text style={styles.text}>资产类型：{FinancialPro.finance_asset.asset_type}</Text>
                  <Text style={styles.text}>票号：{FinancialPro.finance_asset.ticket_number}</Text>
                  <Text style={styles.text}>票据介质：{FinancialPro.finance_asset.medium}</Text>
                  <Text style={styles.text}>票面金额：一次性支付本金和收益</Text>
                  <Text style={styles.text}>出票人：{FinancialPro.finance_asset.drawer}</Text>
                  <Text style={styles.text}>收票人：{FinancialPro.finance_asset.acceptor}</Text>
                  <Text style={styles.text}>承兑人：{FinancialPro.finance_asset.payee}</Text>
                  <Text style={styles.text}>
                    出票日期：{timeUtils.formatDateSimple(FinancialPro.finance_asset.drawer_time)}
                  </Text>
                  <Text style={styles.text}>
                    到期日期：{timeUtils.formatDateSimple(FinancialPro.finance_asset.payee_time)}
                  </Text>
                </View>
              </View>
              <View style={{ ...styles.block, marginBottom: 0, paddingBottom: 50 }}>
                <Text style={styles.title}>—— 借款人信息 ——</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.subtitle}>基本信息：</Text>
                  <Text style={styles.text}>{FinancialPro.borrow_detail}</Text>
                  <Text style={styles.subtitle}>其他信息：</Text>
                  <Table borderStyle={{ borderWidth: 0.5, borderColor: colors.THEME_COLOR }}>
                    <Rows
                      data={tableData}
                      textStyle={{
                        ...styles.text,
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingLeft: 5,
                        paddingRight: 5
                      }}
                      style={styles.tableData}
                      flexArr={[1, 3]}
                    />
                  </Table>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>请等待加载或尝试下拉刷新</Text>
            </View>
          )}
        </ScrollView>
        <Button
          title={tenderUtils.getBtnText(FinancialPro)}
          disabled={tenderUtils.isBuyalbe(FinancialPro)}
          containerViewStyle={styles.btn}
          textStyle={styles.btn_text}
          backgroundColor={colors.THEME_COLOR}
          onPress={() => navigation.push('CreateInvestOrder', { product: FinancialPro })}
          // borderRadius={5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 10
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
  col_box: {
    alignItems: 'center',
    marginTop: 30,
    width: '33%'
  },
  row_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginBottom: 10
  },
  interestContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  big_text: {
    fontSize: 40,
    color: colors.INTEREST_COLOR
  },
  small: {
    fontSize: 15,
    color: colors.INTEREST_COLOR,
    paddingLeft: 5,
    marginBottom: 5
  },
  key: {
    fontSize: 12,
    color: '#8e8e8e',
    paddingBottom: 10
  },
  value: {
    fontSize: 14,
    color: colors.THEME_COLOR
  },
  title: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '500',
    color: colors.THEME_COLOR
  },
  stepContainer: {
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  text: {
    fontSize: 12,
    color: '#646464',
    paddingBottom: 10,
    lineHeight: 20
  },
  infoContainer: {
    width: width - 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10
  },
  title_info: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 13,
    color: colors.THEME_COLOR
  },
  subtitle: {
    fontSize: 15,
    paddingBottom: 10
  },
  tableData: {},
  btn: {
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginTop: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  btn_text: {
    color: '#ffffff',
    fontSize: 16
  }
});

const mapState2Props = state => {
  return {
    user: state.user,
    mobile: state.mobile,
    ticket: state.ticket
  };
};

export default connect(
  mapState2Props,
  null
)(FinancialPro);
