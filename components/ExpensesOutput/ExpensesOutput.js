import { View, StyleSheet} from "react-native"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../constants/styles"

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A parir of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 23.99,
        date: new Date('2022-01-21')
    },
    {
        id: 'e3',
        description: 'A pair of Pant',
        amount: 32.99,
        date: new Date('2021-01-29')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2021-01-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.49,
        date: new Date('2021-04-28')
    },
    
    
    
]
function ExpensesOutput({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700, 
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        flex: 1
    }
})