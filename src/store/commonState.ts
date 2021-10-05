import { observable, computed, makeObservable } from 'mobx';

interface BookProps {
	isbn: string;
	_id: string;
}
class CommonState {
	bookListUpdate = '0';
	willChangeBook = { isbn: '', _id: '' };

	constructor() {
		makeObservable(this, {
			bookListUpdate: observable,
			bookFetch: computed,
			willChangeBook: observable,
		});
	}

	get bookFetch(): string {
		return this.bookListUpdate;
	}

	get willChangeData(): BookProps {
		return this.willChangeBook;
	}
}

const commonState = new CommonState();
export default commonState;
