import { tintColorLightBlue } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function DeviceIcon() {
  return (
    <MaterialIcons
      name="perm-device-info"
      size={20}
      color={tintColorLightBlue}
    />
  );
}
