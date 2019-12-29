import React from "react";
import {
  FlatList,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Typography from "../../styles/typography";

const renderItem = item => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", width: 200, marginBottom: 20 }}>
      <Text style={Typography.FONT_MED_BLACK}>{item.day}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={Typography.FONT_REGULAR_THIN}>{item.openTime}</Text>
        <Text style={Typography.FONT_REGULAR_THIN}> - </Text>
        <Text style={Typography.FONT_REGULAR_THIN}>{item.closeTime}</Text>
      </View>
    </View>
  );
};

const OpeningHours = ({ visible, data, backButton }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={backButton}>
          <Icon name={"chevron-left"} size={40} style={styles.button} />
        </TouchableOpacity>
        <Text
          style={[
            Typography.FONT_H3_BLACK,
            { alignSelf: "center", marginBottom: 30 }
          ]}
        >
          Opening Hours
        </Text>
        <View style={{ alignSelf: "center" }}>
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OpeningHours;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40
  }
});
