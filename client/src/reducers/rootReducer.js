import { combineReducers } from 'redux';
import authReducer from './auth';
import csvReducer from './csvReducer';

//combine multiple reducers
const rootReducer = combineReducers({
	auth: authReducer,
	csv: csvReducer
});

export default rootReducer;
