import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

import * as ImagePicker from "expo-image-picker";

function Photo() {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [text, setText] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const { cancelled, uri, base64 } =
      await ImagePicker.launchImageLibraryAsync({ base64: true });

    // Explore the result

    if (!cancelled) {
      setPickedImagePath(uri);
      console.log(uri);
      try {
        // Call the Google API here
        const result = await callGoogleVisionAsync(base64);
        setText(result);
      } catch (error) {
        setText(`Error: ${error.message}`);
      }
    }
  };

  // const API_KEY = "AIzaSyAGJHE1OfMViyNtF3ypB07n2zn7NNw80Ak";
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAGJHE1OfMViyNtF3ypB07n2zn7NNw80Ak`;

  async function callGoogleVisionAsync(image) {
    const body = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("callGoogleVisionAsync -> result", result);
    console.log(result.responses[0].fullTextAnnotation);

    return result.responses[0].fullTextAnnotation;
  }

  // //This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    // Explore the result

    if (!cancelled) {
      setPickedImagePath(uri);
      console.log(uri);
      try {
        // Call the Google API here
        const result = await callGoogleVisionAsync(base64);
        setText(result);
      } catch (error) {
        setText(`Error: ${error.message}`);
      }
    }
  };

  // async function HandelText() {
  //   if (pickedImagePath) {
  //     // const result = await Tesseract.recognize(pickedImagePath.assets[0].uri);
  //     // console.log("FIRED");
  //     setText("Image");
  //   }
  // }

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
        {/* <Button onPress={HandleText} title="Show Text" /> */}
      </View>

      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>
      {/* {text && <Text>{text}</Text>} */}
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});

export default Photo;
