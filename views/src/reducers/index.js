import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import errorsReducer from './errors.reducer'

export default combineReducers({
    userReducer,
    errorsReducer,
})