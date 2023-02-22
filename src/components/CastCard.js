import React from "react";
import {View,StyleSheet,Text,Image} from "react-native";
import {getPoster} from "../services/MovieService";
import COLORS from "../constants/Colors";
import IMAGES from "../constants/Images";
const CastCard = ({originalName,image,characterName}) => {
    return(
        <View style={styles.container}>
            <Image source={image ? { uri: getPoster(image)}:IMAGES.NO_IMAGE}resizeMode={image ? "cover":"contain"} style={styles.image}/>
            <Text style={styles.originalName}number of lines={2}>{originalName}</Text>
            <Text style={styles.characterName}number of lines={2}>{characterName}</Text>
            </View>
    );
};
const styles = StyleSheet.create({

    container:{
    flex:1,
    

    },
    image: {
        height: 120,
        width: 80,
        borderRadius: 10,
      },
      originalName: {
        width: 80,
       color:COLORS.BLACK,
        fontSize: 12,
      },
      characterName: {
        width: 80,
        color:COLORS.LIGHT_GRAY,
        fontSize: 10,
      },
});
export default CastCard;