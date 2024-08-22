import { StyleSheet, View } from "react-native"
import { useLayoutEffect, useContext } from 'react'
import IconButton from "../components/Ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/Ui/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [isEditing, navigation])
    
    const deleteExpense = () => {
        expensesCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const confirmHandler = () => {
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId,
                {
                    description: 'Test!!!',
                    amount: 29.99,
                    date: new Date('2024-08-20')
                }
            )
        } else {
            expensesCtx.addExpense({
                description: 'Test',
                amount: 19.99,
                date: new Date('2024-08-21')
            })
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            <View style={styles.deleteContainer}>
                {isEditing && <IconButton icon="trash" color={GlobalStyles.colors.error500} size={34} onPress={deleteExpense}/>}
            </View>
        </View>
    )
}
export default ManageExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})