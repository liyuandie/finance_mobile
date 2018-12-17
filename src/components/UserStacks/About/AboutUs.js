import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { colors, VERSION } from '../../../config';

class AboutUs extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '关于我们'
    };
  };
  render() {
    __DEV__ && console.log('about_us_screen props:', this.props);
    const { navigation } = this.props;
    return (
      <View>
        <View style={{ ...styles.block, alignItems: 'center' }}>
          <View style={styles.logo_contaiber_padding}>
            <View style={styles.logo_contaiber}>
              <Image source={require('gogo_mobile/static/imgs/icon_72.png')} style={styles.logo} />
              <View style={styles.slogan_box}>
                <Text style={styles.name}>狗狗金融</Text>
                <Text style={styles.site}>www.gogofinance.com</Text>
              </View>
            </View>
            <Text style={styles.version}>版本: {VERSION}</Text>
          </View>
        </View>
        <View style={styles.block}>
          <List containerStyle={styles.listContainer}>
            <ListItem
              title="公司简介"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.push('Company')}
            />
            <ListItem
              title="联系我们"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
              onPress={() => navigation.push('FindUs')}
            />
            <ListItem
              title="官方微博"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
              rightTitle="@狗狗金融"
              rightTitleStyle={styles.listItemRightTitle}
            />
            <ListItem
              title="微信公众号"
              containerStyle={styles.listItemContainerWithBorder}
              titleStyle={styles.listItemTitle}
              rightTitle="狗狗金融"
              rightTitleStyle={styles.listItemRightTitle}
            />
          </List>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>gogofinance.com All Rights Reserved.</Text>
          <Text style={styles.footer_text}>Copyright © 狗狗金融</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo_contaiber_padding: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center'
  },
  logo_contaiber: {
    flexDirection: 'row'
  },
  logo: {
    width: 50,
    height: 50
  },
  slogan_box: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 32,
    color: colors.THEME_COLOR
  },
  site: {
    fontSize: 12,
    fontWeight: '100',
    color: '#646464'
  },
  version: {
    color: '#646464',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    borderRadius: 15,
    borderColor: '#f0f0f0',
    borderWidth: 1
  },
  block: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItemContainer: {
    borderBottomWidth: 0,
    borderBottomColor: '#ffffff',
    height: 45
  },
  listItemContainerWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 45
  },
  listItemTitle: {
    fontSize: 14
  },
  listItemRightTitle: {
    fontSize: 13,
    color: '#646464'
  },
  rightTitle_not_finished: {
    color: 'red',
    fontSize: 12
  },
  footer: {
    padding: 10,
    alignItems: 'center'
  },
  footer_text: {
    fontSize: 12,
    lineHeight: 18,
    color: '#212121'
  }
});

const mapState2Props = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapState2Props,
  null
)(AboutUs);
