import { DateTime } from 'luxon';

/**
 * @description it's an MVP
 *
 * @param {number} num number to format
 * @param {Intl.NumberFormatOptions} [options]
 * @returns {string} formatted num
 */
export function formatNumber(num, options) {
	return new Intl.NumberFormat('en', options).format(num);
}

/**
 * @param {Date} date
 * @returns {string} formatted date
 */
export function formatDate(date) {
	return DateTime.fromJSDate(date).toFormat('LLL dd, yyyy');
}
