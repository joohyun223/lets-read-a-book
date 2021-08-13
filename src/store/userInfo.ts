import { observable, action, computed, makeObservable } from 'mobx';

interface Props {
	id: string;
	name: string;
	email: string;
}
class UserInfo {
	name = '';
	email = '';
	id = '';
	loggedIn = false;

	get userName(): string {
		return this.name;
	}
	get isLoggedIn(): boolean {
		return this.loggedIn;
	}
	constructor(name: string) {
		makeObservable(this, {
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
		this.email = props.email;
		this.loggedIn = true;
	}

	logout() {
		this.id = '';
		this.name = '';
		this.email = '';
		this.loggedIn = false;
	}
}

const user = new UserInfo('');
export default user;
