import { observable, computed, makeObservable, action } from 'mobx';
interface Props {
	msg: string;
	tit: string;
	display?: boolean;
	severity: string;
}

class AlertState {
	msg = '';
	tit = '';
	display = false;
	severity = 'success';
	constructor() {
		makeObservable(this, {
			tit: observable,
			msg: observable,
			severity: observable,
			display: observable,
			isDisplay: computed,
			alertMsg: computed,
			alertTit: computed,
			alertSeverity: computed,
			showAlert: action,
		});
	}
	get alertTit(): string {
		return this.tit;
	}
	get alertMsg(): string {
		return this.msg;
	}
	get isDisplay(): boolean {
		return this.display;
	}
	get alertSeverity(): any {
		return this.severity;
	}

	showAlert(props: Props) {
		this.tit = props.tit;
		this.msg = props.msg;
		this.display = true;
		this.severity = props.severity;
	}
}

const alertState = new AlertState();
export default alertState;
