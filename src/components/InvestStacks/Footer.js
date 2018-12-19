import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as tenderApis from '../../apis/financail_pro';
import { Tip, Longlist } from 'beeshell';
import { colors } from '../../config';
import { timeUtils, tenderUtils } from '../../utils';
import ListItem from './ListItem';

const Footer = status => {
  if (status === 1) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footer_text}>玩命加载中...</Text>
      </View>
    );
  } else if (status === 0) {
    return (
      <View style={{ display: 'none' }}>
        <Text />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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

export default Footer;
