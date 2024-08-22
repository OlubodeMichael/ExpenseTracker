import { View, Text, StyleSheet, Alert } from "react-native";
import { useState} from "react"
import Input from "./Input";
import Button from "../Ui/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";


function ExpenseForm({onCancel, submitButtonLabel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {
          value: defaultValues ? defaultValues.amount.toString() :'',
          isValid: true,
        },
        date: { 
          value: defaultValues ? getFormattedDate(defaultValues.date): '',
          isValid: true,
        },
        description: {
          value:defaultValues ? defaultValues.description :'',
          isValid: true,
        }
    })

    const inputHandler = (indentifier, enterValue) => {
        setInputs((curInput) => {
            return {
                ...curInput,
                [indentifier]: {value: enterValue, isValid: true}
            }
        })
    }

    const submitHandler = () => {
        const expenseDate = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        const amountIsValid = !isNaN(expenseDate.amount) && expenseDate.amount > 0
        const dateIsValid = expenseDate.date.toString() !== 'Invalid Date'
        const descriptionIsValid = expenseDate.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input', 'Please check your input values')
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid },
                }
            })
            return 
        }
        onSubmit(expenseDate)
    }
    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.smallInput}>
            <Input 
                label="Amount" 
                style={{flex: 1}}
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputHandler.bind(this, "amount"),
                    value: inputs.amount.value,
                }}
            />
            <Input 
                label="Date"
                style={{flex: 1}}
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputHandler.bind(this, "date"),
                    value: inputs.date.value,
                }}
            />
            </View>
            <Input 
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    value: inputs.description.value,
                    onChangeText: inputHandler.bind(this, "description"),
                }}
            />
            {formIsValid && <Text style={styles.errorText}>Invalid input values - Please check your entered data!</Text>}
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button  style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;
const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24
    },
    smallInput: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})