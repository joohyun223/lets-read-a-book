import { observable, action, computed, makeObservable } from 'mobx';

interface Props {
	id: string;
	name: string;
	givenName: string;
	email: string;
}
class UserInfo {
	givenName = '';
	name = '';
	email = '';
	id = '';
	loggedIn = false;

	get userGivenName(): string {
		return this.givenName;
	}
	get userName(): string {
		return this.name;
	}
	get isLoggedIn(): boolean {
		return this.loggedIn;
	}
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

	login(props: Props) {
		this.id = props.id;
		this.name = props.name;
		this.givenName = props.givenName;
		this.email = props.email;
		this.loggedIn = true;
	}

	logout() {
		this.id = '';
		this.name = '';
		this.givenName = '';
		this.email = '';
		this.loggedIn = false;
	}
}

const user = new UserInfo('');
export default user;
