import { observer } from 'mobx-react';
import user from '../../store/userInfo';

const Navigation = (): JSX.Element => {
	return (
		<nav>
			<ul>
				<li> {user.name}님 환영합니다</li>
			</ul>
		</nav>
	);
};

export default observer(Navigation);
