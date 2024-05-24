import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SMS from "expo-sms";
import * as Mail from "expo-mail-composer";
import { CheckBox } from "react-native-elements";

const Assign_Car = () => {
  const router = useRoute();

  const Assign_key = router.params?.key;

  const [datas, setDatas] = useState([]);
  const [keys, setKeys] = useState([]);
  const [carKey, setCarKey] = useState([]);
  const [tosendEmail, setTosendEmail] = useState({});
  const [smsAvailable, setSmsAvailable] = useState(false);
  const [emailAvailability, setEmailAvailability] = useState(false);
  const [requestorPhone, setRequestorPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const collectionRef = collection(database, "Requests");
  const collectionRef2 = collection(database, "Car Informations");

  const getData = async () => {
    const response = await getDocs(collectionRef2);
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDatas(data);
    setCarKey(data.map((car) => car.id));

    const response2 = await getDocs(collectionRef);
    const data2 = response2.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTosendEmail(data2.find((item) => item.id == Assign_key));
    setKeys(data2.map((item) => item.id));
    setRequestorPhone(tosendEmail.Email);
    setIsLoading(false);
  };

  useEffect(() => {

    getData();

    const ispossible = async () => {
      const availability = await SMS.isAvailableAsync();
      setSmsAvailable(availability);

      const emailAvailable = await Mail.isAvailableAsync();
      setEmailAvailability(emailAvailable);
    };

    ispossible();
  }, []);

  if (isLoading) {
    <Text>Loading</Text>;
  } else if (!isLoading && datas.length == 0) {
    <Text>No car Data</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {datas.map((item, index) => (
        <View key={index}>
          {item.isAssigned && (
            <View style={{alignSelf: 'flex-end', zIndex: 20, position: 'absolute'}}>
              <CheckBox 
               checked = {true}
               title='Assigned'
              />
            </View>
          )}
          <Text
            style={{
              fontSize: 20,
              backgroundColor: `rgba(120,100,102,0.5)`,
              height: 80,
              textAlignVertical: "center",
              textAlign: "flex-start",
              borderRadius: 30,
              marginHorizontal: 15,
              paddingHorizontal: 30
            }}
          >
            Car {index + 1}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              marginVertical: 20,
              flexWrap: "wrap",
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                backgroundColor: `rgba(102,102,120,0.3)`,
                width: 150,
                height: 100,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: "700" }}>Driver Name</Text>
              <Text style={{ marginTop: 10, flexWrap: "wrap" }}>
                {item.DriverName}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: `rgba(102,102,120,0.3)`,
                width: 150,
                height: 100,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: "700" }}>Driver Phone</Text>
              <Text style={{ marginTop: 10, flexWrap: "wrap" }}>
                {item.DriverPhone}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: `rgba(102,102,120,0.3)`,
                width: 150,
                height: 100,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: "700" }}>Car Name</Text>
              <Text style={{ marginTop: 10, flexWrap: "wrap" }}>
                {item.carName}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: `rgba(102,102,120,0.3)`,
                width: 155,
                height: 110,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontWeight: "700" }}>Plate Number</Text>
              <Text style={{ marginTop: 10, flexWrap: "wrap" }}>
                {item.PlateNumber}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                gap: 20,
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  const uptoDate = doc(database, "Requests", Assign_key);
                  updateDoc(uptoDate, {
                    isAssigned: true,
                    plate: `Plate Number: ${item.PlateNumber}`,
                  });
 
                  Mail.composeAsync({
                    subject: "Approved",
                    recipients: [tosendEmail.Email],
                    body: `you can use ${item.DriverName}'s car Plate Number: ${item.PlateNumber}`,
                  })
                  
                  .catch((err) => alert(`update Error: ${err.message}`));
                }}
                style={{
                  backgroundColor: `rgba(120,160,130,0.4)`,
                  width: 150,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                }}
              >
                <Text>Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  const uptoDate = doc(
                    database,
                    "Car Informations",
                    carKey[index]
                  );
                  updateDoc(uptoDate, {
                    isAssigned: true,
                  });

                  await SMS.sendSMSAsync(
                    [item.DriverPhone],
                    `You will serve ${tosendEmail.name} from ${tosendEmail.startDate} to ${tosendEmail.endDate} check his/her Email`
                  ).catch((err) => alert(`update Error: ${err.message}`));
                }}
                style={{
                  backgroundColor: `rgba(120,160,130,0.4)`,
                  width: 150,
                  height: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                }}
              >
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Assign_Car;
