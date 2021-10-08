import { observable, computed, makeObservable, action } from 'mobx';
interface Props {
	msg?: string;
	tit: string;
	cont: any;
	display?: boolean;
}

class ModalState {
	msg = '';
	tit = '';
	cont = [];
	display = false;
	constructor() {
		makeObservable(this, {
			tit: observable,
			msg: observable,
			cont: observable,
			display: observable,
			isDisplay: computed,
			modalMsg: computed,
			modalTit: computed,
			modalCont: computed,
			showModal: action,
		});
	}
	get modalTit(): string {
		return this.tit;
	}
	get modalMsg(): string {
		return this.msg;
	}
	get isDisplay(): boolean {
		return this.display;
	}
	get modalCont(): any {
		return this.cont;
	}
	showModal(props: Props) {
		this.tit = props.tit;
		this.cont = props.cont;
		this.display = true;
	}
}

const modalState = new ModalState();
export default modalState;
