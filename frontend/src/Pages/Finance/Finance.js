import React, { Fragment, useEffect, useState } from 'react'
import { addNewExpense, clearErrors, getCurrentMonthExpenses } from '../../actions/financeController'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { getAllExpenses } from '../../actions/financeController'

const Finance = () => {

    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [ref, setRef] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const { error, success, expenses } = useSelector((state) => state.allExpenses)
    // const [totalCurrentMonthExpenses, setTotalCurrentMonthExpenses] = useState(0);

    const { error: currentMonthError, success: currentMonthSuccess, currentMonthTotal } = useSelector((state) => state.currentMonthTotal)


    useEffect(() => {
        if (currentMonthError) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (currentMonthSuccess) {
            enqueueSnackbar(error, { variant: 'success' });
            dispatch(clearErrors());
        }
        dispatch(getCurrentMonthExpenses())
    }, [dispatch, enqueueSnackbar, error])

    console.log("this is curent month expenes", currentMonthTotal)


    const addExpenseHandler = async (e) => {
        e.preventDefault();

        try {
            const expenseData = {
                title: title,
                ref: ref,
                amount: amount,
                description: description,
                date: date
            };

            await dispatch(addNewExpense(expenseData));
            enqueueSnackbar('Expense added Successfully', { variant: 'success' });
        } catch (error) {
            console.error(error.message);
        }
    };

    // const calculateTotalCurrentMonthExpenses = () => {
    //     const currentDate = new Date();
    //     const currentMonth = currentDate.getMonth() + 1;
    //     const currentYear = currentDate.getFullYear();

    //     const expensesForCurrentMonth = expenses.filter((expense) => {
    //         const expenseDate = new Date(expense.date);
    //         return (
    //             expenseDate.getMonth() + 1 === currentMonth &&
    //             expenseDate.getFullYear() === currentYear
    //         );
    //     });

    //     const totalExpenses = expensesForCurrentMonth.reduce(
    //         (total, expense) => total + parseFloat(expense.amount),
    //         0
    //     );

    //     setTotalCurrentMonthExpenses(totalExpenses);
    // };


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getAllExpenses());
        // calculateTotalCurrentMonthExpenses();
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
                                placeholder='Expense Title'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Ref'
                                required
                                value={ref}
                                onChange={(e) => setRef(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Amount'
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='Description'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                            <th style={{ padding: '10px' }}>Title</th>
                            <th style={{ padding: '10px' }}>Ref</th>
                            <th style={{ padding: '10px' }}>Date</th>
                            <th style={{ padding: '10px' }}>Amount</th>
                            <th style={{ padding: '10px' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.title}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.ref}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.date}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.amount}</td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>{expense.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px' }}>
                    <h2 className="text-center text-2xl font-bold mb-4">Total Expenses for Current Month</h2>
                    {/* <p>Total: ${totalCurrentMonthExpenses}</p> */}
                    {/* <p>Total: ${currentMonthTotal}</p> */}
                </div>
            </div>
        </Fragment>
    )
}

export default Finance
