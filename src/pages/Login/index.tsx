import { GoogleLogin } from 'react-google-login';
import user from '../../store/userInfo';
import { observer } from 'mobx-react';

const Login = (): JSX.Element => {
	const responseGoogle = (resp: any) => {
		if (resp.error) {
			return;
		}
		const { googleId = '', name = '', email = '', givenName = '' } = { ...resp.profileObj };

		user.login({ id: googleId, name, email, givenName });
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
