import { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import user from '../../store/userInfo';
import { observer } from 'mobx-react';

const Login = (): JSX.Element => {
	const responseGoogle = (resp: any) => {
		const { googleId = '', name = '', email = '' } = { ...resp.profileObj };
		user.login({ id: googleId, name, email });
	};

	const responseGoogleLogout = () => {
		user.logout();
	};
	return (
		<>
			<div>로그인이 필요합니다.</div>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID + ''}
				buttonText="로그인"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>

			{/* <GoogleLogout
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID + ''}
				buttonText="로그아웃"
				onLogoutSuccess={responseGoogleLogout}
			></GoogleLogout> */}
		</>
	);
};
export default observer(Login);
