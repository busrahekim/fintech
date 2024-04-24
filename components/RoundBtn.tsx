import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

interface IProps {
  title: string;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
}
const RoundBtn = ({ title, icon, onPress }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="items-center gap-2">
      <View className="rounded-full w-14 h-14 bg-[#D8DCE2] justify-center items-center">
        <Ionicons name={icon} size={30} color={Colors.dark} />
      </View>
      <Text className="text-lg font-medium text-[#141518]">{title}</Text>
    </TouchableOpacity>
  );
};

export default RoundBtn;
