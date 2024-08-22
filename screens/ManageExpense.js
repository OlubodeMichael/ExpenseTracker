import { StyleSheet, View } from "react-native"
import { useLayoutEffect, useContext } from 'react'
import IconButton from "../components/Ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/Ui/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

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

    const confirmHandler = (expenseData) => {
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId, expenseData
            )
        } else {
            expensesCtx.addExpense(expenseData)
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler}  submitButtonLabel={isEditing ? 'Update' : 'Add'} onSubmit={confirmHandler} defaultValues={selectedExpense} />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})