import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { getHeight, getWidth } from "../libs/StyleHelper";
import { colors } from "../constants/colors";
import translations from "../translation";

import ProductCard from "../components/ProductCard";
import { RootStackParamList } from "../navigation/types";
import { useProductState } from "../store/UseProductStore";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const insets = useSafeAreaInsets();
  const { recentlyViewed } = useProductState();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, getHeight(16)) + getHeight(12),
          paddingBottom: Math.max(insets.bottom, getHeight(16)) + getHeight(12),
        },
      ]}
    >
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>
          {translations.home.recentlyViewedProducts}
        </Text>

        {recentlyViewed.length > 0 ? (
          <FlatList
            data={recentlyViewed}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                horizontal
                onPress={() =>
                  navigation.navigate("ProductDetail", {
                    productId: item.id,
                  })
                }
              />
            )}
            contentContainerStyle={styles.recentList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {translations.home.noRecentlyViewedTitle}
            </Text>
            <Text style={styles.emptyText}>
              {translations.home.noRecentlyViewedText}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.exploreContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.exploreButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate("Explore")}
        >
          <Text style={styles.exploreButtonText}>
            {translations.home.exploreProducts}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  recentSection: {
    marginTop: getHeight(12),
  },

  sectionTitle: {
    paddingHorizontal: getWidth(16),
    fontSize: getHeight(20),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  recentList: {
    paddingHorizontal: getWidth(10),
    paddingTop: getHeight(12),
  },

  emptyContainer: {
    marginHorizontal: getWidth(16),
    marginTop: getHeight(12),
    padding: getWidth(24),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getWidth(12),
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyTitle: {
    fontSize: getHeight(15),
    fontWeight: "600",
    color: colors.textPrimary,
  },

  emptyText: {
    marginTop: getHeight(6),
    fontSize: getHeight(13),
    color: colors.textSecondary,
    textAlign: "center",
  },

  exploreContainer: {
    marginTop: getHeight(32),
    paddingHorizontal: getWidth(16),
  },

  exploreButton: {
    minHeight: getHeight(52),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getWidth(12),
    backgroundColor: colors.primaryButton,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  exploreButtonText: {
    fontSize: getHeight(16),
    fontWeight: "600",
    color: colors.buttonText,
  },
});
