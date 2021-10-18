import { GoogleLogin } from 'react-google-login';
import user from '../../store/userInfo';
import { observer } from 'mobx-react';
import { Typography } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

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
		<div
			style={{ backgroundColor: '#ebf6ff', position: 'absolute', width: '100%', height: '100%' }}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					marginTop: '260px',
					alignItems: 'center',
				}}
			>
				<img src="/img/Rsupport_logo_gray.png" style={{ width: '180px', marginBottom: '-20px' }} />
				<MenuBookIcon style={{ fontSize: '200px', color: '#5e7fb9' }} />
			</div>

			<Typography
				variant="h5"
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					margin: '10px 0px 10px 0px ',
				}}
			>
				~책을 읽읍시다~
			</Typography>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID + ''}
				buttonText="알서포트 이메일로 로그인"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};
export default observer(Login);
