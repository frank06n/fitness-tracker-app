import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RunScreen from "./screens/RunScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { COLOR, initExercisesDb } from "./Utils";
import ExercisesScreen from "./screens/ExercisesScreen";
const Color = require('color');

const Stack = createNativeStackNavigator();

function App() {
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

/*
Issues:
When renaming list of 'Date X' to 'Date Y' which already exists in database
Expected: error is shown, and no action is performed
What happens: 'Date X's list is saved at 'Date Y', so list of 'Date Y' is lost
'Date X' becomes an empty list

Support different themes, and theme changing

StopWatch implementation uses too much CPU,
due to repeated deep renders on each update (100ms on 'precise' mode)
Soltuion maybe to keep state update only to the component,
and derive some other way to pass back info.

Select Exercise (Dropdown) on clicked first time, change of dropdown
position is very noticeable. Fix it

@RunScreen On cancel/save/backpress, if no changes are made, dont prompt.

Option to Save database in JSON, or load from JSON file (backup file)
full, or selected months.
Dedicated loader UI with conflict solver
*/