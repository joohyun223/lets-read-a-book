import { observer } from 'mobx-react';
import user from '../../store/userInfo';
import { GoogleLogout } from 'react-google-login';

const Navigation = (): JSX.Element => {
	const responseGoogleLogout = () => {
		user.logout();
	};
	return (
		<nav>
			<ul>
				<li> {user.name}님 환영합니다</li>
				<li>
					<GoogleLogout
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID + ''}
						buttonText="로그아웃"
						onLogoutSuccess={responseGoogleLogout}
					></GoogleLogout>
				</li>
			</ul>
		</nav>
	);
};

export default observer(Navigation);
