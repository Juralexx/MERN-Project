import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import errorsReducer from './errors.reducer'
import projectReducer from './project.reducer'

export default combineReducers({
    userReducer,
    errorsReducer,
    projectReducer,
})