import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RunScreen from "./screens/RunScreen";
import { Image } from "react-native";
import TempScreen from "./screens/TempScreen";

const Stack = createNativeStackNavigator();

const Btn_LogScreen = () => (
	<Image
		style={{ width: 25, height: 25, margin: 5 }}
		source={{ uri: "https://www.freeiconspng.com/thumbs/history-icon-png/simple-history-icon-18.png" }}
	// on press go to all log view
	/>
);

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Temp">
				<Stack.Screen name="Home" component={HomeScreen} options={{ headerRight: Btn_LogScreen }} />
				<Stack.Screen name="Run" component={RunScreen} />
				<Stack.Screen name="Temp" component={TempScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;

// TODO
// Cario and Workout Screen
// Clean Up
// Make a proper plan ***
// color scheme & design

// https://hartaniyassir.medium.com/how-to-create-a-popup-menu-in-react-native-d2fc8908e932
