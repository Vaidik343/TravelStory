import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields from "../../components/InputFields";
import { useUser } from "../../context/UserContext";

const Register = () => {
  const { createUser, loading } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profile:"",
  });

  const handleSubmit = async () => {
    if (form.email === "" || form.name === "" || form.password === "") {
      Alert.alert("Please fill in all the fields!");
    }

    try {
      const result = await createUser(form.email, form.name, form.password);
      // add method

      router.replace("/MyJourneys");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-[#f8f6f1] h-full">
    <ScrollView>  
      {/* add images of gif just like aora */}
      {/* <View 
       
      >

      </View> */}
    
    <InputFields 
     title="Name"
     value={form.name}
     handleChangeText={}
     otherStyles={mt-7}
    />

    <InputFields 
     title="Email"
     value={form.email}
     handleChangeText={}
     otherStyles={mt-7}
    />
    <InputFields 
     title="Password"
     value={form.password}
     handleChangeText={}
     otherStyles={mt-7}
    />

    <InputFields 
     title="Profile"
     value={form.profile}
     handleChangeText={}
     otherStyles={mt-7}
    />
    </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
