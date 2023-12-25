import React, { Fragment, useEffect, useState } from 'react'
import { addNewExpense, clearErrors } from '../../actions/financeController'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { getAllExpenses } from '../../actions/financeController'

const Finance = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [expense, setExpense] = useState("")
    const [date, setDate] = useState("")
    const { enqueueSnackbar } = useSnackbar();

    const { error, success, expenses } = useSelector((state) => state.allExpenses)

    const addExpenseHandler = async (e) => {
        e.preventDefault();

        try {
            if (!name || !expense || !date) {
                throw new Error('Missing required fields');
            }

            const expenseData = {
                text: expense,
                name: name,
                date: date
            };

            await dispatch(addNewExpense(expenseData));
            enqueueSnackbar('Expense added Successfully', { variant: 'success' });
        } catch (error) {
            console.error(error.message);
        }
    };


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getAllExpenses());
    }, [error, dispatch]);


    return (
        <Fragment>
            <div className='main-form'>
                <div className='addUser'>
                    <div className='addUser'>
                        <form
                            className='createProductForm'
                            encType='multipart/form-data'
                            onSubmit={addExpenseHandler}
                        >
                            <h2 >Add Expenses</h2>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Expense'
                                required
                                value={expense}
                                onChange={(e) => setExpense(e.target.value)}
                            />
                            <input
                                type='date'
                                placeholder='Date'
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <div className='submitBtn'>
                                <button type='submit'>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2 className="text-center text-2xl font-bold mb-4">All Expenses</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ padding: '10px' }}>Name</th>
                            <th style={{ padding: '10px' }}>Date</th>
                            <th style={{ padding: '10px' }}>Expenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.name}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.date}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Finance
