import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const FIGMA_WIDTH = 376;
const FIGMA_HEIGHT = 812;

export const getWidth = (figmaWidth: number) => {
  return (windowWidth / FIGMA_WIDTH) * figmaWidth;
};

export const getHeight = (figmaHeight: number) => {
  return (windowHeight / FIGMA_HEIGHT) * figmaHeight;
};
