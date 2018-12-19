import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../../config';
import { numberUtils } from '../../utils';
import PercentageCircle from 'react-native-percentage-circle';

class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, interest, daysOfEaring, percent, remind, isBuyable, btnText, _onPress } = this.props;
    return (
      <View style={styles.product_item}>
        <TouchableOpacity onPress={() => _onPress()} style={{ width: '100%' }}>
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
        </TouchableOpacity>
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
            onPress={_onPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

export default ListItem;
