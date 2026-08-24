import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { getHeight, getWidth } from "../libs/StyleHelper";
import { colors } from "../constants/colors";
import translations from "../translation";

import ProductCard from "../components/ProductCard";
import ConfirmationModal from "../components/ConfirmationModal";

import { RootStackParamList } from "../navigation/types";
import { useProducts } from "../services/useProduct";
import { useProductState } from "../store/UseProductStore";

type ExploreNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Explore"
>;

const ExploreScreen = () => {
  const navigation = useNavigation<ExploreNavigationProp>();
  const insets = useSafeAreaInsets();

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useProducts();

  const { deletedProductIds, deleteProduct } = useProductState();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const visibleProducts = useMemo(() => {
    return (
      products?.filter((product) => !deletedProductIds.includes(product.id)) ??
      []
    );
  }, [products, deletedProductIds]);

  const selectedProduct = useMemo(() => {
    return products?.find((product) => product.id === selectedProductId);
  }, [products, selectedProductId]);

  const handleDeleteRequest = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleDeleteCancel = () => {
    setSelectedProductId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId === null) {
      return;
    }

    deleteProduct(selectedProductId);
    setSelectedProductId(null);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.stateText}>{translations.explore.loading}</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>{translations.explore.errorTitle}</Text>
        <Text style={styles.stateText}>
          {error instanceof Error
            ? error.message
            : translations.explore.errorDefault}
        </Text>
      </View>
    );
  }

  if (visibleProducts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyTitle}>{translations.explore.emptyTitle}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                productId: item.id,
              })
            }
            onLongPress={() => handleDeleteRequest(item.id)}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: Math.max(insets.bottom, getHeight(16)) + getHeight(12) },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
          />
        }
      />

      <ConfirmationModal
        visible={selectedProductId !== null}
        title={translations.explore.deleteModal.title}
        message={
          selectedProduct
            ? translations.explore.deleteModal.confirmNamed.replace(
                "{name}",
                selectedProduct.title,
              )
            : translations.explore.deleteModal.confirmDefault
        }
        cancelText={translations.explore.deleteModal.cancelText}
        confirmText={translations.explore.deleteModal.confirmText}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContent: {
    paddingHorizontal: getWidth(6),
    paddingBottom: getHeight(24),
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

  emptyTitle: {
    fontSize: getHeight(18),
    fontWeight: "600",
    color: colors.textPrimary,
  },
});
