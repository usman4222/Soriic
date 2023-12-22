import { combineReducers, applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { addUserReducer } from './reducers/addUserReducer';
import { allUsersReducer } from './reducers/allUserReducer';
import { deleteReducer } from './reducers/deleteUser';
import { getUserReducer, updateUserDetails } from './reducers/updateUser';
import { userUpdateReducer } from './reducers/attendanceReducer';

const rootReducer = combineReducers({
    user: userReducer,
    newUser: addUserReducer,
    allUser: allUsersReducer,
    delUser: deleteReducer,
    getUser: getUserReducer,
    updateUser: updateUserDetails,
    editUser: userUpdateReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
