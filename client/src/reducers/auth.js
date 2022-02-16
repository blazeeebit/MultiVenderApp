let userstate;

if (window.localStorage.getItem('auth')) {
	userstate = JSON.parse(window.localStorage.getItem('auth'));
} else {
	userstate = null;
}

//create reducer
const authReducer = (state = userstate, action) => {
	//authenticaton reducer
	switch (action.type) {
		case 'LOGGED_IN_USER':
			return { ...state, ...action.payload };
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};

export default authReducer;
