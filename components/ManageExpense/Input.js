import { Text, TextInput, View, StyleSheet} from "react-native"
import { GlobalStyles } from "../../constants/styles"


function Input({label, style, textInputConfig, invalid}) {
    const inputStyles = [styles.input]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }
    return (
        <View style={[styles.inputContainer, style]} >
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles}/>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    }, 
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline: {
        textAlignVertical: 'top',
        minHeight: 100
    }, 
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        color: GlobalStyles.colors.error50
    }

})