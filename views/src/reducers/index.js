import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import errorsReducer from './errors.reducer'
import projectReducer from './project.reducer'
import messengerReducer from './messenger.reducer'

export default combineReducers({
    userReducer,
    errorsReducer,
    projectReducer,
    messengerReducer,
})