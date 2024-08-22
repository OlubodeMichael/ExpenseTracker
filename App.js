import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator} from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from '@react-navigation/native';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from "@expo/vector-icons"
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import IconButton from './components/Ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';


const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator screenOptions={({navigation}) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => {
        return <IconButton icon="add" size='24' color={tintColor} onPress={() => {navigation.navigate("ManageExpense")}}/>
      }
    })}>
      <BottomTabs.Screen 
        name='RecentExpenses' 
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => <Ionicons name='hourglass' size={size} color={color}/>,

        }}
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Recent',
          tabBarIcon: ({color, size}) => <Ionicons name='calendar' size={size} color={color}/>
        }}
      />
    </BottomTabs.Navigator>
  )
}
export default function App() {
  return (
      <>
        <StatusBar style="auto" />
        <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Expenses Overview" 
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white'
            }}
          >
            <Stack.Screen  
              name="ManageExpense" 
              component={ManageExpense} 
              options={{
                headerBackTitle: 'Back',
                title: 'Manage Expense',
                presentation: 'modal'
              }}

            />
            <Stack.Screen  name="Expenses Overview" component={ExpensesOverview} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
        </ExpensesContextProvider>
      </>
      
    
  );
}


