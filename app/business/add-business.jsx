import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { query } from "firebase/database";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirbaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const router = useRouter();
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://vero-asean.com/wp-content/uploads/2024/04/insight-banner-default.jpg"
  );
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("Business Name");
  const [address, setAddress] = useState("Some Address required");
  const [contact, setContact] = useState("1234567890");
  const [website, setWebsite] = useState("http://www.facebook.com");
  const [about, setAbout] = useState("Some Description");
  const [category, setCategory] = useState("Shopping");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
    GetCategoryList();
  }, []);
  const onImagePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
  };
  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "business-promote-mobile-app/" + fileName);
    uploadBytes(imageRef, blob)
      .then((snapshot) => {})
      .then((resp) => getDownloadURL(imageRef))
      .then(async (downloadUrl) => {
        saveBusinessDetail(downloadUrl);
      });
    setLoading(false);
  };
  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name,
      address,
      contact,
      about,
      website,
      category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl,
    });
    setLoading(false);
    ToastAndroid.show("New Business Added", ToastAndroid.LONG);
    router.push("/business/my-business");
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          color: Colors.GRAY,
        }}
      >
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity
        style={{
          margin: 20,
        }}
        onPress={() => onImagePic()}
      >
        {!image ? (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChangeText={(v) => setName(v)}
          placeholder="Name"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          onChangeText={(v) => setAddress(v)}
          placeholder="Address"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          onChangeText={(v) => setContact(v)}
          placeholder="Contact"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          onChangeText={(v) => setWebsite(v)}
          placeholder="Website"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
          }}
        />
        <TextInput
          onChangeText={(v) => setAbout(v)}
          multiline
          numberOfLines={5}
          placeholder="About"
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit-regular",
            height: 100,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => onAddNewBusiness()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
