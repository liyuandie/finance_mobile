import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
  InteractionManager,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
const { height, width } = Dimensions.get('window');
import { Avatar, Icon, Button } from 'react-native-elements';
import { colors } from '../../config';
import PercentageCircle from 'react-native-percentage-circle';
import * as tenderApis from '../../apis/financail_pro';
import { Tip } from 'beeshell';
import { timeUtils, tenderUtils, numberUtils } from '../../utils';
import { financialProType } from '../../common/constant/tender';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      tipText: '',
      refreshing: false,
      hot_product: null
    };
  }

  async componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.refresh());
  }

  refresh = async () => {
    try {
      this.setState({ refreshing: true });
      const res = await tenderApis.getAllTenders({
        limit: 5
      });
      this.setState({
        products: res.tenders,
        hot_product: res.tenders[0],
        refreshing: false
      });
      __DEV__ && console.log('this.state.products:', this.state.products, this.state.hot_product);
      return res;
    } catch (error) {
      this.$tips('获取失败，请手动刷新或稍后再试');
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

  render() {
    let { products, hot_product } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={async () => {
              try {
                const res = await this.refresh();
                this.$tips('刷新成功');
                return res;
              } catch (error) {
                this.$tips('获取失败，请手动刷新或稍后再试');
              }
            }}
            title={'正在刷新'}
          />
        }
        style={styles.container}
      >
        <Swiper
          style={styles.banner_wrapper}
          autoplay={true}
          height={200}
          width={width}
          dotStyle={styles.dot}
          activeDotStyle={styles.active_dot}
        >
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://nc-banners.oss-cn-beijing.aliyuncs.com/home_banners/banner_1.png' }}
              style={styles.banner_img}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{ uri: 'https://nc-banners.oss-cn-beijing.aliyuncs.com/home_banners/banner_2.png' }}
              style={styles.banner_img}
              resizeMode="cover"
            />
          </View>
        </Swiper>
        <Tip
          ref={c => {
            this._tip = c;
          }}
          body={this.state.tipText}
          duration={2000}
          alignItems="flex-end"
        />
        <View style={styles.block}>
          <Text style={styles.title}> —— 信息披露专栏 ——</Text>
          <View style={styles.row_container}>
            <View style={styles.avatar}>
              <Avatar
                small
                rounded
                source={{
                  uri:
                    'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/avatar/avatar_info.png?x-oss-process=style/default'
                }}
                containerStyle={styles.avatar_container}
                onPress={() => navigation.push('Catalogue')}
              />
              <Text style={styles.avatar_text}>信息披露</Text>
            </View>
            <View style={styles.avatar}>
              <Avatar
                small
                rounded
                source={{
                  uri:
                    'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/avatar/avatar_bank.png?x-oss-process=style/default'
                }}
                containerStyle={styles.avatar_container}
                onPress={() => navigation.push('BankInfo')}
              />
              <Text style={styles.avatar_text}>银行存管</Text>
            </View>
            <View style={styles.avatar}>
              <Avatar
                small
                rounded
                source={{
                  uri:
                    'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/avatar/avatar_risk.png?x-oss-process=style/default'
                }}
                containerStyle={styles.avatar_container}
                onPress={() => navigation.push('Safety')}
              />
              <Text style={styles.avatar_text}>安全保障</Text>
            </View>
            <View style={styles.avatar}>
              <Avatar
                small
                rounded
                source={{
                  uri:
                    'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/avatar/avatar_report.png?x-oss-process=style/default'
                }}
                containerStyle={styles.avatar_container}
              />
              <Text style={styles.avatar_text}>运营报告</Text>
            </View>
          </View>
          <Text style={styles.tips}>温馨提示：市场有风险 投资需谨慎</Text>
        </View>
        <View style={styles.block}>
          <View style={styles.tags_container}>
            <View style={styles.tags_wrapper}>
              <Icon
                name="fire"
                type="simple-line-icon"
                color="#ffffff"
                size={13}
                containerStyle={styles.tag_icon_container}
              />
              <Text style={styles.tag_text}>热门推荐</Text>
            </View>
          </View>
          {hot_product && hot_product != {} ? (
            <View style={styles.hot_product_container}>
              <Text style={styles.hot_product_name}>{hot_product.name}</Text>
              <View style={styles.hot_product_interest_container}>
                <Text style={styles.hot_product_interest}>{hot_product.interest.toFixed(2)}</Text>
                <Text style={styles.hot_product_percent}>%</Text>
              </View>
              <View style={styles.hot_product_tags_container}>
                <Text style={styles.hot_product_tags}>一元起投</Text>
                <Text style={styles.hot_product_tags}>超高回报</Text>
                <Text style={styles.hot_product_tags}>安全保障</Text>
              </View>
              <Button
                title="立即购买"
                backgroundColor={colors.THEME_COLOR}
                borderRadius={20}
                buttonStyle={{ width: 250, height: 40, marginBottom: 25 }}
                fontSize={15}
                onPress={() => navigation.push('FinancialPro', { product: hot_product })}
              />
            </View>
          ) : (
            <Text style={{ ...styles.title, paddingTop: 10, color: '#3c3c3c', lineHeight: 100 }}>
              暂无产品，请耐心等待或尝试下拉刷新
            </Text>
          )}
        </View>
        <Text style={{ ...styles.title, paddingTop: 10 }}> —— 优质产品 ——</Text>
        <View style={styles.block}>
          {products && products.length > 0 ? (
            products.map(x => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('FinancialPro', {
                      product: x
                    })
                  }
                  style={styles.product_wrapper}
                  key={x.id}
                >
                  <View style={styles.product_item}>
                    <View style={styles.above}>
                      <Text style={styles.product_name}>{x.name}</Text>
                      <View style={styles.info_row_container}>
                        <View style={styles.info_column}>
                          <View style={styles.value}>
                            <Text style={styles.big_text}>{x.interest.toFixed(2)}</Text>
                            <Text style={styles.small}>%</Text>
                          </View>
                          <Text style={styles.key}>年化收益</Text>
                        </View>
                        <View style={styles.info_column}>
                          <View style={styles.value}>
                            <Text style={styles.big_text}>{timeUtils.daysOfEaring(x)}</Text>
                            <Text style={{ ...styles.small, color: '#3c3c3c' }}>天</Text>
                          </View>
                          <Text style={styles.key}>投资期限</Text>
                        </View>
                        <View style={styles.info_column}>
                          <PercentageCircle
                            radius={25}
                            percent={tenderUtils.getRemindPercent(x)}
                            color={colors.THEME_COLOR}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={styles.below}>
                      <Text style={styles.product_type}>{financialProType[x.fType]}</Text>
                      <Text style={styles.product_rest}>{`剩余:￥${numberUtils.convertAmount(
                        x.finance_info.remind / 100
                      )}`}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={{ ...styles.title, paddingTop: 10, color: '#3c3c3c', lineHeight: 100 }}>
              暂无产品，请耐心等待或尝试下拉刷新
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  banner_wrapper: {
    height: 200
  },
  slide: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  dot: {
    marginBottom: -20
  },
  active_dot: {
    marginBottom: -20
  },
  banner_img: {
    width: width,
    height: 200
  },
  block: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    paddingTop: 15,
    color: colors.THEME_COLOR
  },
  row_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    width: '90%'
  },
  avatar: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar_container: {
    backgroundColor: 'white',
    borderColor: '#ffffff'
  },
  avatar_text: {
    fontSize: 12,
    paddingTop: 10,
    color: '#3C3C3C'
  },
  tips: {
    color: colors.LOGO_COLOR,
    paddingTop: 15,
    fontSize: 13,
    paddingBottom: 15,
    textAlign: 'center'
  },
  tags_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff7575',
    marginLeft: 10,
    marginTop: -2
  },
  tags_container: {
    width: '100%',
    alignItems: 'flex-start'
  },
  tag_text: {
    color: '#ffffff',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 2,
    fontSize: 12
  },
  tag_icon_container: {
    paddingLeft: 5
  },
  hot_product_container: {
    alignItems: 'center',
    width: '100%'
  },
  hot_product_name: {
    fontSize: 14,
    color: '#3c3c3c'
  },
  hot_product_interest_container: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  hot_product_interest: {
    fontSize: 30,
    color: '#FF5809'
  },
  hot_product_percent: {
    fontSize: 13,
    color: '#FF5809',
    marginTop: 10,
    paddingLeft: 5
  },
  hot_product_tags_container: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  hot_product_tags: {
    borderColor: colors.LOGO_COLOR,
    borderWidth: 1,
    color: colors.LOGO_COLOR,
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    borderRadius: 10
  },
  product_wrapper: { width: '100%' },
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
  }
});

export default HomeScreen;
