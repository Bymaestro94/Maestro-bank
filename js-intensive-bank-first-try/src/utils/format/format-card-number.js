/**
 * Format a card number with dashes.
 *
 * This function takes a card number as a string, and returns a new string with
 * dashes separating each group of four numbers.
 *
 * @example
 * formatCardNumberWithDashes('1234567890123456') // '1234-5678-9012-3456'
 *
 * @param {string} cardNumber - The card number to be formatted
 * @returns {string} The formatted card number
 */

export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}

/**
 * Format a card number with spaces.
 *
 * This function takes a card number as a string, and returns a new string with
 * spaces separating each group of four numbers.
 *
 * @example
 * formatCardNumber('1234567890123456') // '1234 5678 9012 3456'
 *
 * @param {string} cardNumber - The card number to be formatted
 * @returns {string} The formatted card number
 */

export function formatCardNumber(cardNumber) {
	const formattedNumber = cardNumber.replace(/\s/g, '').match(/.{1,4}/g)
	return formattedNumber ? formattedNumber.join(' ') : ''
}
