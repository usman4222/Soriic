import {
    FINANCE_REQUEST,
    FINANCE_SUCCESS,
    FINANCE_FAIL,
    CLEAR_ERRORS,
    FINANCE_RESET,
    GET_ALL_EXPENSES_REQUEST,
    GET_ALL_EXPENSES_SUCCESS,
    GET_ALL_EXPENSES_FAIL,
    GET_CURRENT_MONTH_TOTAL_REQUEST,
    GET_CURRENT_MONTH_TOTAL_FAIL
} from '../constants/financeConstant';

// financeReducer function
export const financeReducer = (state = { expense: [] }, action) => {

    switch (action.type) {
        case FINANCE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FINANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                expense: action.payload.expense,
            }
        case FINANCE_RESET:
            return {
                ...state,
                success: false
            };
        case FINANCE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const allExpensesReducer = (state = { expenses: [] }, action) => {

    switch (action.type) {
        case GET_ALL_EXPENSES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_EXPENSES_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: action.payload
            }
        case GET_ALL_EXPENSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }
}


export const currentMonthTotalReducer = (state = { currentMonthTotal: [] }, action) => {

    switch (action.type) {
        case GET_CURRENT_MONTH_TOTAL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_EXPENSES_SUCCESS:
            return {
                ...state,
                loading: false,
                currentMonthTotal: action.payload
            }
        case GET_CURRENT_MONTH_TOTAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }
}
