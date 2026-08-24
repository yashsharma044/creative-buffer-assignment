import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../libs/StyleHelper";
import { colors } from "../constants/colors";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onLongPress?: () => void;
  horizontal?: boolean;
}

const ProductCard = ({
  product,
  onPress,
  onLongPress,
  horizontal = false,
}: ProductCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        horizontal && styles.horizontalCard,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View
        style={[
          styles.imageContainer,
          horizontal && styles.horizontalImageContainer,
        ]}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.content, horizontal && styles.horizontalContent]}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: "50%",
    margin: getWidth(6),
    padding: getWidth(12),
    borderRadius: getWidth(14),
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },

  horizontalCard: {
    width: getWidth(170),
    maxWidth: getWidth(170),
    flex: 0,
  },

  pressed: {
    opacity: 0.75,
  },

  imageContainer: {
    height: getHeight(150),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getWidth(10),
    backgroundColor: colors.imageBackground,
  },

  horizontalImageContainer: {
    height: getHeight(120),
  },

  image: {
    width: "85%",
    height: "85%",
  },

  content: {
    flex: 1,
  },

  horizontalContent: {
    minHeight: getHeight(70),
  },

  title: {
    marginTop: getHeight(10),
    fontSize: getHeight(14),
    lineHeight: getHeight(19),
    fontWeight: "600",
    color: colors.textPrimary,
  },

  price: {
    marginTop: getHeight(8),
    fontSize: getHeight(16),
    fontWeight: "700",
    color: colors.textPrimary,
  },
});
