import { RefObject } from 'react';

function getItem(item: string): string {
	return localStorage.getItem(item) || '';
}

function getParsed<T>(item: string, valueIfItemDoesNotExist: string = '[]'): T {
	return JSON.parse(getItem(item) || valueIfItemDoesNotExist);
}

function setItem(item: string, value: string) {
	localStorage.setItem(item, value);
}

function setParsed(item: string, value: any) {
	setItem(item, JSON.stringify(value));
}

function keepInputValue(
	element: RefObject<HTMLInputElement | HTMLTextAreaElement>,
	item: string
) {
	if (!element.current) return;
	setItem(item, element.current.value);
}

function setMultipleItems(items: Object) {
	Object.entries(items).forEach(([key, value]) => {
		setItem(key, value);
	});
}

export {
	getItem,
	getParsed,
	setItem,
	setParsed,
	keepInputValue,
	setMultipleItems,
};
