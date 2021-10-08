import { observable, computed, makeObservable } from 'mobx';

interface BookProps {
	isbn: string;
	_id: string;
	lender: string;
}
class CommonState {
	bookListUpdate = false;
	willChangeBook = { isbn: '', _id: '', lender: '' };

	constructor() {
		makeObservable(this, {
			bookListUpdate: observable,
			bookFetch: computed,
			willChangeBook: observable,
		});
	}

	get bookFetch(): boolean {
		return this.bookListUpdate;
	}

	get willChangeData(): BookProps {
		return this.willChangeBook;
	}
}

const commonState = new CommonState();
export default commonState;
