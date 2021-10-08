import { observable, action, computed, makeObservable } from 'mobx';

interface Props {
	id: string;
	name: string;
	givenName: string;
	email: string;
	imageUrl: string;
	token: string;
}
class UserInfo {
	givenName = '';
	name = '';
	email = '';
	id = '';
	token = '';
	imageUrl = '';
	loggedIn = false;

	constructor(name: string) {
		makeObservable(this, {
			givenName: observable,
			name: observable,
			id: observable,
			loggedIn: observable,
			logout: action,
			login: action,
			userName: computed,
			isLoggedIn: computed,
		});
		this.name = name;
	}

	get userGivenName(): string {
		return this.givenName;
	}
	get userName(): string {
		return this.name;
	}
	get isLoggedIn(): boolean {
		const sessionInfo = sessionStorage.getItem('login_session');
		if (sessionInfo) {
			this.login(JSON.parse(sessionInfo));
		}
		return this.loggedIn;
	}

	login(props: Props) {
		this.id = props.id;
		this.name = props.name;
		this.givenName = props.givenName;
		this.email = props.email;
		this.token = props.token;
		this.imageUrl = props.imageUrl;
		this.loggedIn = true;
	}

	logout() {
		this.id = '';
		this.name = '';
		this.givenName = '';
		this.email = '';
		this.token = '';
		this.imageUrl = '';
		this.loggedIn = false;
	}
}

const user = new UserInfo('');
export default user;
