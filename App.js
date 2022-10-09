import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RunScreen from "./screens/RunScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Run" component={RunScreen} />
				<Stack.Screen name="History" component={HistoryScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;

/** /// TODO ///
 * >> create history button beside (+) button in home screen
 * 
 * >> create such that homescreen can open old day's tasklist (add close/list/today buttons)
 * >>   ``    ``   ``  runscreen can edit a task when provided (hook the edit button from homescreen)
 * 
 * 
 * >> on App Open
 * if asyncStorage '@date' not exists
 * 	  save current date to '@date'	  
 * else if '@date' != (current date)
 *    save tasklist as a history of '@date'
 *    clear tasklist
 * 	  save current date to '@date'
 * -----------------------------------
 * 
 */