import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  // const {signUp} = useSignUp()

  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const onSignUp = async () => {};
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View
        className="p-4 flex-1"
        style={{
          backgroundColor: Colors.background,
        }}
      >
        <Text className="text-4xl font-extrabold">Let's get started!</Text>
        <Text className="text-lg text-[#626D77] mt-5">
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View className="flex flex-row my-10">
          <TextInput
            placeholder="Country Code"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            className="bg-[#D8DCE2] rounded-md text-lg mr-3 p-5 w-20"
            value={countryCode}
          />

          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            className="bg-[#D8DCE2] rounded-md text-lg mr-3 flex-1 p-5"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <Link href={"/login"} asChild replace>
          {/* replace: when user go back it routes to index instead of signup. bcs its not stacking but replacing*/}
          <TouchableOpacity>
            <Text
              className="text-lg font-semibold"
              style={{
                color: Colors.primary,
              }}
            >
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View className="flex-1" />

        <TouchableOpacity
          className={`p-2 h-14 rounded-md justify-center items-center mb-5 ${
            phoneNumber !== "" ? "bg-[#3D38ED]" : "bg-[#C9C8FA]"
          }`}
          onPress={onSignUp}
        >
          <Text className="text-lg font-semibold text-white">Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
