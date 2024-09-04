import { StyleSheet, View } from "react-native"
import { useLayoutEffect, useContext, useState } from 'react'
import IconButton from "../components/Ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpenses, updateExpense } from "../util/http";
import LoadingOverlay from "../components/Ui/LoadingOverlay";
import ErrorOverlay from "../components/Ui/ErrorOverlay";

function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [isEditing, navigation])
    
    const deleteExpense = async () => {
        setIsSubmitting(true)
        try {
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId)
            navigation.goBack()
        } catch (error) {
            setError('Could not delete expense - please try again later')
            setIsSubmitting(false)
        }
        
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const  confirmHandler = async (expenseData) => {
        setIsSubmitting(true)
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData)
            } else {
                const id = await storeExpenses(expenseData)
                expensesCtx.addExpense({...expenseData, id: id})
            }
            navigation.goBack()
        } catch (error) {
            setError('Could not save data - please try again later')
            setIsSubmitting(false)
        }
        
    }

    
    if (error && !isSubmitting) {
        return <ErrorOverlay message={error}/>
    }

    if (isSubmitting) {
        return <LoadingOverlay />
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