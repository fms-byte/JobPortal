import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants/index";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.small,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  contentBox: {
    marginTop: SIZES.small,
  },
  contextText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },
});

export default styles;
