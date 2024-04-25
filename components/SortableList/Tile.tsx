import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MARGIN, SIZE } from "./Config";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});
interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = useBalanceStore();

  if (id === "spent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text className="text-[#626D77] font-medium text-lg">
          Spent this month
        </Text>
        <Text className="text-[#141518] font-bold text-2xl pt-2">1024 $</Text>
      </View>
    );
  }
  if (id === "cards") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text className="text-[#626D77] font-medium text-lg">Cards</Text>
        <Ionicons
          name="card"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
        >
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              backgroundColor: Colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              5%
            </Text>
          </View>
          <Text
            style={{ color: Colors.gray, fontWeight: "bold", fontSize: 18 }}
          >
            Cashback
          </Text>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View>
          <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 16 }}>
            Recent transaction
          </Text>

          {transactions.length === 0 && (
            <Text
              style={{
                color: Colors.gray,
                fontWeight: "bold",
                fontSize: 18,
                paddingTop: 10,
              }}
            >
              No transactions
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  color: Colors.dark,
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingVertical: 10,
                }}
              >
                {transactions[transactions.length - 1].amount}€
              </Text>
              <Text
                style={{ color: Colors.gray, fontWeight: "bold", fontSize: 16 }}
              >
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }
};

export default Tile;