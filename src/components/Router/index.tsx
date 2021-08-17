import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Navigation from '../Navigation';
import UserStore from '../../store/userInfo';
interface Props {
	isLoggedIn: boolean;
}
// const userStore = new UserStore();

export default function AppRouter(props: Props): JSX.Element {
	return (
		<Router>
			{props.isLoggedIn && <Navigation></Navigation>}
			<Switch>
				<>
					{props.isLoggedIn ? (
						<Route path="/">
							<Main></Main>
						</Route>
					) : (
						<Route path="/">
							<Login></Login>
						</Route>
					)}
				</>
			</Switch>
		</Router>
	);
}
