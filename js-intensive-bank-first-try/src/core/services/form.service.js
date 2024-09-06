class FormService {
	/**
	 * Returns an object of values from a form, keyed by input name.
	 * @param {HTMLElement} formElement - The form element to get the values from.
	 * @returns {Object} - An object of values from the form, with keys matching
	 * the input names.
	 */

	getFormValues(formElement) {
		const inputs = formElement.querySelectorAll('input')
		const values = {}

		for (const input of inputs) {
			values[input.name] = input.value
		}

		return values
	}
}

export default new FormService()
