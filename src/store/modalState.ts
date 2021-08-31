import { observable, computed, makeObservable } from 'mobx';
import React, { Component } from 'react';

interface Props {
	msg: string;
	tit: string;
	display: boolean;
}

class ModalState {
	msg = '';
	tit = '';
	display = false;
	constructor() {
		makeObservable(this, {
			tit: observable,
			msg: observable,
			display: observable,
			modalMsg: computed,
			modalTit: computed,
			isDisplay: computed,
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
}

const modalState = new ModalState();
export default modalState;
