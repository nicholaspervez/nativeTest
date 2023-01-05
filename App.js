import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import HomePage from "./camera";
// import ImagePickerExample from "./image";
import Photo from "./photo";
let object = { fruit: "mango" };
export default function App() {
  return (
    <View style={styles.container}>
      <Text>BAD nanaaas annnnd {object.fruit}</Text>
      <StatusBar style="auto" />
      {/* <ImagePickerExample /> */}
      <Photo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
