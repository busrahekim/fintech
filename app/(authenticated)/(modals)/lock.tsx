import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Page = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const router = useRouter();

  const offset = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "123456") {
        router.replace("/(authenticated)/(tabs)/home");
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }

    return () => {};
  }, [code]);

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const onNumberBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };
  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView>
      <Text className="font-bold text-2xl mt-20 self-center">
        Welcome back, {firstName}
      </Text>
      <Animated.View
        className={`flex-row justify-center gap-2 my-2 items-center ${style}`}
      >
        {codeLength.map((_, index) => (
          <View
            key={index}
            className={`w-11 h-11 justify-center items-center rounded-full  ${
              code[index] ? Colors.primary : Colors.lightGray
            }`}
          />
        ))}
      </Animated.View>
      <View className="my-20 gap-12">
        <View className="flex-row justify-between">
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text className="text-3xl">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between">
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text className="text-3xl">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between">
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text className="text-3xl">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={onBiometricAuthPress}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={26}
              color={Colors.dark}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text className="text-3xl">0</Text>
          </TouchableOpacity>
          <View className="min-w-[30px]">
            {code.length > 0 && (
              <TouchableOpacity onPress={onNumberBackSpace}>
                <MaterialCommunityIcons
                  name="backspace-outline"
                  size={26}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className="self-center text-lg font-medium text-[#3D38ED]">
          Forgot your passcode ?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;
