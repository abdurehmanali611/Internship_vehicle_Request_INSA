import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

const Assign_Car = () => {
  
  const router = useRoute();

  const Assign_key = router.params?.key;

  const [datas, setDatas] = useState([]);
  const [requester, setRequester] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // the below method is to fetch the car informations from the API and also the requester informations 
  const getData = async () => {
    
  };

  // the below method is used to post(update) to the API of car informations a variable called isAssigned to be true
  // And sending an Email to the requester
  const Approved = async () => {

  }

  // the below method is used to confirm the assigned car to the requester by sending a sms text to the driver's phone Number 
  const Confirmation = async () => { 

  }

  useEffect(() => {
    getData();

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
          {(item.isAssigned && requester.endDate > new Date().toLocaleDateString()) && (
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
                onPress={Approved}
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
                onPress={Confirmation}
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
