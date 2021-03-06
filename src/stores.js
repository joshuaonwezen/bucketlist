import { writable } from 'svelte/store';

const createWritableStore = (key, startValue) => {
	const { subscribe, set } = writable(startValue);

	return {
		subscribe,
		set,
		useLocalStorage: () => {
			const json = localStorage.getItem(key);
			if (json) {
				set(JSON.parse(json));
			}

			subscribe((current) => {
				localStorage.setItem(key, JSON.stringify(current));
			});
		}
	};
};

export const checkedAnswers = createWritableStore('checkedAnswers', []);
export const details = createWritableStore('details', {});
export const score = createWritableStore('score', 0);
export const editDetails = writable(false);
export const averageScore = writable(0);
