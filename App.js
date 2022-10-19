import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RunScreen from "./screens/RunScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR, consoleLogDb, initExercisesDb, setTestDb } from "./Utils";
import ExercisesScreen from "./screens/ExercisesScreen";
const Color = require('color');

const Stack = createNativeStackNavigator();

function App() {
	//AsyncStorage.clear().then(setTestDb);
	//consoleLogDb();
	initExercisesDb();
	const options = {
		statusBarColor: COLOR.primaryDark,
		statusBarStyle: Color(COLOR.primaryDark).isDark() ? 'light' : 'dark',
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
				<Stack.Screen name="Exercises" component={ExercisesScreen} options={options} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;