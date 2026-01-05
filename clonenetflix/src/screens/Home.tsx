import { View, ScrollView } from "react-native";
import Header from "../components/header/Header";
import FeaturedMovie from "../components/FeatureMovie/FeatureMovie";


export default function Home(){
    return(
        <View style= {{
            flex:1,
            backgroundColor: '#000'
        }}>
            <Header/>
            <ScrollView>
                <FeaturedMovie />
            </ScrollView>
        </View>
    )
}