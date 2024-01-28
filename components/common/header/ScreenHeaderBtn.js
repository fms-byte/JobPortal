import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

import { COLORS, SIZES } from "../../../constants/index";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <Pressable style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </Pressable>
  )
}

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});