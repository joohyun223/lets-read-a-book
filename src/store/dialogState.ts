import { observable, computed, makeObservable, action } from 'mobx';

interface Props {
	msg: string;
	tit?: string;
	display?: boolean;
	type: string;
	data: any;
}

class DialogState {
	msg = '';
	tit = '책을 읽읍시다';
	type = 'rent';
	display = false;
	data = [];

	constructor() {
		makeObservable(this, {
			msg: observable,
			display: observable,
			data: observable,
			isDisplay: computed,
			dialogMessage: computed,
			getData: computed,
			showDialog: action,
			closeDialog: action,
		});
	}

	get isDisplay(): boolean {
		return this.display;
	}
	get dialogMessage(): string {
		return this.msg;
	}
	get dialogType(): string {
		return this.type;
	}
	get getData(): any {
		return this.data;
	}
	showDialog(props: Props) {
		this.display = true;
		this.msg = props.msg;
		this.type = props.type;
		this.data = props.data;
	}
	closeDialog() {
		this.display = false;
	}
}

const dialogState = new DialogState();
export default dialogState;
