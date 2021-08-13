import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Navigation from '../Navigation';

interface Props {
	isLoggedIn: boolean;
}
export default function AppRouter(props: Props): JSX.Element {
	return (
		<Router>
			{props.isLoggedIn && <Navigation></Navigation>}
			<Switch>
				<>
					{props.isLoggedIn ? (
						<Route exact path="/">
							<Main></Main>
						</Route>
					) : (
						<Route exact path="/">
							<Login></Login>
						</Route>
					)}
				</>
			</Switch>
		</Router>
	);
}
