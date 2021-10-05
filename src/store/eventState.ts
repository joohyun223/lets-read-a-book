import { makeObservable, observable, computed } from 'mobx';

class EventState {
	runGoHome = '0';

	constructor() {
		makeObservable(this, {
			triggeredGoHome: computed,
			runGoHome: observable,
		});
	}

	get triggeredGoHome(): string {
		return this.runGoHome;
	}
}

const evtState = new EventState();
export default evtState;
