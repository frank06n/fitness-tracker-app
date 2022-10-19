import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RunScreen from "./screens/RunScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR, consoleLogDb, setTestDb } from "./Utils";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();

function App() {
	//AsyncStorage.clear().then(setTestDb);
	//consoleLogDb();
	const options = {
		statusBarColor: COLOR.primaryDark,
		headerTintColor: COLOR.anti,
		headerStyle: { backgroundColor: COLOR.primary },
		animation: 'fade_from_bottom',
	};
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={options} />
				<Stack.Screen name="Run" component={RunScreen} options={options} />
				<Stack.Screen name="History" component={HistoryScreen} options={options} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;