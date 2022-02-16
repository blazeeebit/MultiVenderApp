let csvState = null;

const csvReducer = (state = csvState, action) => {
	//authenticaton reducer
	switch (action.type) {
		case 'CSV_FILE':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default csvReducer;
