import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/Router';
import { observer } from 'mobx-react';
import user from './store/userInfo';

const App = observer((): JSX.Element => {
	useEffect(() => {
		console.log('App mounted');
	}, []);

	return (
		<div className="App">
			<AppRouter isLoggedIn={user.isLoggedIn}></AppRouter>
		</div>
	);
});

export default App;
