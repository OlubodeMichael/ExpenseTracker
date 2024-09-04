import axios from "axios";
import { BACKEND_URL } from '@env'


export async function storeExpenses(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json',expenseData)
    const id = response.data.name
    return id
}

export async function fetchExpenses() {
    const res = await axios.get(BACKEND_URL + '/expenses.json')

    const expenses = []

    for (const key in res.data) {
        const expenseObj = {
            id: key,
            amount: res.data[key].amount,
            date: new Date(res.data[key].date),
            description: res.data[key].description
        }
        expenses.push(expenseObj)
    }

    return expenses
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL  + `/expenses/${id}.json`, expenseData)
}

export async function deleteExpense(id) {
    return await axios.delete(BACKEND_URL  + `/expenses/${id}.json`)
}