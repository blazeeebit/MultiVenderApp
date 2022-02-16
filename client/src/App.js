import HomePage from './pages/homepage';
import { Switch, Route } from 'react-router-dom';
import SignUp from './pages/signup';
import PrivateRoute from './components/privateRoutes';
import Dashboard from './pages/dashboard';
import CategoryUpdate from './pages/categoryUpdate';
import Nav from './components/nav';

function App() {
	return (
		<>
		<Nav />
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/auth" component={SignUp} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
			<PrivateRoute exact path="/dashboard/category-update/:slug" component={CategoryUpdate} />
		</Switch>
		</>
	);
}

export default App;
