import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions } from 'react-native';
import { colors } from '../../../config';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const { width, height } = Dimensions.get('window');

class Company extends Component {
  static navigationOptions = {
    title: '公司简介'
  };

  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        ['公司减资、合并、分立、解散或申请破产', '无'],
        ['公司依法进入破产程序', '无'],
        ['公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚', '无'],
        [
          '公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施',
          '无'
        ],
        ['公司主要或者全部业务陷入停顿', '无'],
        ['存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项', '无']
      ]
    };
  }

  render() {
    __DEV__ && console.log('test_introduce screen props:', this.props);
    const state = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>—— 企业介绍 ——</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>
            狗狗金融互联网金融信息平台由四川联创利民科技有限公司负责运营，公司注册地为中国成都。我们本着严谨务实的态度，以专业的金融服务体系，高效的运营管理体系，严谨的风险控制体系，详尽的信息披露体系，坚决执行监管政策要求，创造一个合规、普惠为民的网络借贷信息中介平台。
          </Text>
          <Text style={styles.contentText}>
            我们拥有由金融服务、风险控制管理及电子商务等人士构成的专业服务团队和保障系统安全的IT技术团队，
            致力于为资金供需方搭建信息对称、安全合规和公平透明的信息平台，为投资者提供安全、专业、收益可
            预期的投资方案，为资金需求方提供快捷、低成本的融资方案，使双方在平等对话和可视操作的基础上得
            到有效的利益保障，提高互联网金融服务的可接近性，轻松实现投资、融资。
          </Text>
          <Text style={styles.subtitle}>企业使命</Text>
          <Text style={styles.contentText}>
            致力于为个人及小微企业提供更快捷、更高效、更低成本的贷款服务，促进小微企业良性发展，
            致力于创建一个更安全便捷的投融资平台，为融资人与投资人搭建财富的桥梁。
          </Text>
          <Text style={styles.subtitle}>主要业务</Text>
          <Text style={styles.contentText}>低风险高流动性的票据以及银行存单等。</Text>
          <Text style={styles.subtitle}>企业战略计划</Text>
          <Text style={styles.contentText}>
            公司将积极向省内延伸到省外其他区域发展，目前公司已在成都、乐山、德阳、达州、南充、
            泸州、绵阳等地开展业务，未来将实现全川及西南周边中心城市覆盖的规划布局。
          </Text>
          <Text style={styles.subtitle}>企业战略目标</Text>
          <Text style={styles.contentText}>
            公司未来将着力树立品牌观念，加强团队成员观念培养和专业培训，用高质量的服务
            水平与高效的风险控制能力，树立有生命力强劲的品牌，提高企业信用，提升企业形象，
            促进网络借贷向合法化、透明化、标准化的方向发展，让网络借贷更好的为我国社会主义经 济建设做出更大的贡献。
          </Text>
        </View>
        <Text style={styles.title}>—— 基本信息 ——</Text>
        <View style={styles.contentContainer}>
          <Image
            source={{
              uri:
                'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/baseInfo.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.8 }}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.title}>—— 管理团队 ——</Text>
        <View style={styles.contentContainer}>
          <Image
            source={{
              uri:
                'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/managers.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.8 }}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.title}>—— 股东信息 ——</Text>
        <View style={styles.contentContainer}>
          <Image
            source={{
              uri: 'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/gudong.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.8 }}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.title}>—— 组织架构及从业人员概况 ——</Text>
        <View style={styles.contentContainer}>
          <Image
            source={{
              uri:
                'https://nc-apps.oss-cn-beijing.aliyuncs.com/assets/pzh_infos/zhuzhijiagou.png?x-oss-process=style/default'
            }}
            style={{ width: width - 20, height: height * 0.8 }}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.title}>—— 重大事项 ——</Text>
        <View style={styles.contentContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Rows data={state.tableData} textStyle={styles.tableText} flexArr={[4, 1]} style={styles.tableRow} />
          </Table>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  title: {
    color: colors.THEME_COLOR,
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: '500'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 10
  },
  contentContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  contentText: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1,
    paddingBottom: 10,
    color: '#272727'
  },
  tableText: {
    fontSize: 10,
    padding: 10,
    lineHeight: 14,
    letterSpacing: 0.5
  },
  tableRow: {
    justifyContent: 'center'
  }
});

export default Company;
