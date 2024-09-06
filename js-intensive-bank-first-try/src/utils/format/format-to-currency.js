export function formatToCurrency(num) {
	return new Intl.NumberFormat('en-US', {
		currency: 'USD',
		style: 'currency'
	}).format(num)
}
