import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RunScreen from "./screens/RunScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { consoleLogDb, setTestDb } from "./Utils";

const Stack = createNativeStackNavigator();

function App() {
	//AsyncStorage.clear().then(setTestDb);
	//consoleLogDb();
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Today\'s tasks' }} />
				<Stack.Screen name="Run" component={RunScreen} />
				<Stack.Screen name="History" component={HistoryScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;