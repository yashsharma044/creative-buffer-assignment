import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";

import { getHeight, getWidth } from "../libs/StyleHelper";
import { colors } from "../constants/colors";
import translations from "../translation";

import { RootStackParamList } from "../navigation/types";
import { useProducts } from "../services/useProduct";
import { useProductState } from "../store/UseProductStore";

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const { productId } = route.params;

  const { data: products, isLoading, isError } = useProducts();

  const { addRecentlyViewed } = useProductState();

  const product = useMemo(() => {
    return products?.find((item) => item.id === productId);
  }, [products, productId]);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.stateText}>
          {translations.productDetail.loading}
        </Text>
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>
          {translations.productDetail.errorTitle}
        </Text>

        <Text style={styles.stateText}>
          {translations.productDetail.errorDefault}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: Math.max(insets.bottom, getHeight(16)) + getHeight(16) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>
          {translations.productDetail.rating}
        </Text>

        <Text style={styles.rating}>{product.rating.rate}</Text>

        <Text style={styles.ratingCount}>
          ({product.rating.count} {translations.productDetail.reviews})
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>
          {translations.productDetail.description}
        </Text>

        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>
          {translations.productDetail.category}
        </Text>

        <Text style={styles.category}>{product.category}</Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentContainer: {
    padding: getWidth(16),
    paddingBottom: getHeight(32),
  },

  imageContainer: {
    height: getHeight(320),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getWidth(16),
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },

  image: {
    width: "85%",
    height: "85%",
  },

  title: {
    marginTop: getHeight(20),
    fontSize: getHeight(23),
    lineHeight: getHeight(30),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  price: {
    marginTop: getHeight(12),
    fontSize: getHeight(24),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(14),
  },

  ratingLabel: {
    marginRight: getWidth(10),
    fontSize: getHeight(14),
    fontWeight: "600",
    color: colors.textMuted,
  },

  rating: {
    fontSize: getHeight(15),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  ratingCount: {
    marginLeft: getWidth(6),
    fontSize: getHeight(14),
    color: colors.textSecondary,
  },

  descriptionContainer: {
    marginTop: getHeight(28),
  },

  descriptionTitle: {
    fontSize: getHeight(18),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  description: {
    marginTop: getHeight(8),
    fontSize: getHeight(14),
    lineHeight: getHeight(22),
    color: colors.textSecondary,
  },

  categoryContainer: {
    marginTop: getHeight(24),
    padding: getWidth(16),
    borderRadius: getWidth(12),
    backgroundColor: colors.cardBackground,
  },

  categoryLabel: {
    fontSize: getHeight(13),
    color: colors.textSecondary,
  },

  category: {
    marginTop: getHeight(4),
    fontSize: getHeight(15),
    fontWeight: "600",
    color: colors.textPrimary,
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: getWidth(24),
    backgroundColor: colors.background,
  },

  stateText: {
    marginTop: getHeight(10),
    fontSize: getHeight(14),
    color: colors.textSecondary,
    textAlign: "center",
  },

  errorTitle: {
    fontSize: getHeight(18),
    fontWeight: "700",
    color: colors.textPrimary,
  },
});
