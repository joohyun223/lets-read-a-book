import { GoogleLogin } from 'react-google-login';
import user from '../../store/userInfo';
import { observer } from 'mobx-react';

const Login = (): JSX.Element => {
	const responseGoogle = (resp: any) => {
		if (resp.error) {
			console.error(resp.error);
			return;
		}

		const {
			googleId = '',
			name = '',
			email = '',
			givenName = '',
			access_token = '',
			imageUrl = '',
		} = { ...resp.profileObj, ...resp.tokenObj };
		const loginInfo = { id: googleId, name, email, givenName, token: access_token, imageUrl };
		user.login(loginInfo);
		sessionStorage.setItem('login_session', JSON.stringify(loginInfo));
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
		</>
	);
};
export default observer(Login);
