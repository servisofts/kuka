/**
 * @format
 */

import { AppRegistry ,LogBox} from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning:','Animated:','VirtualizedList:','VirtualizedLists',"Animated.event"])
AppRegistry.registerComponent(appName, () => App);
