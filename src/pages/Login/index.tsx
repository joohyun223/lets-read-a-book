import { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default function Login(): JSX.Element {
	const responseGoogle = (resp: any) => {
		console.log('response', resp);
		setProfileName(resp.profileObj.name);
	};
	const responseGoogleLogout = () => {
		setProfileName('');
		console.log('로그아웃!');
	};
	const [profileName, setProfileName] = useState<string>('');
	// useEffect(() => {});
	return (
		<>
			<div>로그인 하세요...</div>
			<div>{profileName}</div>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID + ''}
				buttonText="로그인"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>

			<GoogleLogout
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID + ''}
				buttonText="로그아웃"
				onLogoutSuccess={responseGoogleLogout}
			></GoogleLogout>
		</>
	);
}
