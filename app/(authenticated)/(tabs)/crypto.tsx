import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interfaces/crypto";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: headerHeight }}
      style={{ backgroundColor: Colors.background }}
    >
      <Text className="text-xl font-semibold m-5 mb-2">Latest Crypto</Text>
      <View className="rounded-2xl bg-white mx-5 p-3">
        {currencies.data?.map((currency: Currency) => (
          <Link
            href={`/crypto/${currency.id}` as `${string}:${string}`}
            key={currency.id}
            asChild
          >
            <TouchableOpacity className="flex flex-row gap-3 items-center mb-2">
              <Image
                source={{ uri: data?.[currency.id].logo }}
                className="w-10 h-10"
              />
              <View className="flex-1 gap-1">
                <Text style={{ fontWeight: "600", color: Colors.dark }}>
                  {currency.name}
                </Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>
              <View className="items-end">
                <Text>{currency.quote.EUR.price.toFixed(2)} $</Text>
                <View className="flex-row gap-1">
                  <Ionicons
                    name={
                      currency.quote.EUR.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    size={16}
                    color={
                      currency.quote.EUR.percent_change_1h > 0 ? "green" : "red"
                    }
                  />
                  <Text
                    className={
                      currency.quote.EUR.percent_change_1h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Page;
