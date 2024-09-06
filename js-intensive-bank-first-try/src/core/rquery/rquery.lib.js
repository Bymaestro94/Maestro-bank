import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

class RQuery {
	/**
	 * Create a new RQuery instance.
	 * @param {string|HTMLElement} selector - The selector to query the element from.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element not found: ${selector}`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector type')
		}
	}

	/**
	 * Finds a descendant element matching the given selector.
	 * @param {string} selector - The CSS selector to query with.
	 * @returns {RQuery} A new RQuery instance, or throws an error if no element is found.
	 */

	find(selector) {
		const element = this.element.querySelector(selector)

		if (element) {
			return new RQuery(element)
		} else {
			throw new Error(`Element not found: ${selector}`)
		}
	}

	/**
	 * Finds all descendant elements matching the given selector.
	 * @param {string} selector - The CSS selector to query with.
	 * @returns {Array<RQuery>} An array of RQuery instances, one for each element found.
	 */

	findAll(selector) {
		const elements = this.element.querySelectorAll(selector)

		return Array.from(elements).map(element => new RQuery(element))
	}

	/**
	 * Appends the given child element to the element.
	 * @param {HTMLElement} childElement - The child element to append.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */

	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}

	/**
	 * Inserts the given new element before the element.
	 * @param {HTMLElement} newElement - The new element to insert.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */

	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement')
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)

			return this
		} else {
			throw new Error('Element must have a parent element')
		}
	}

	/**
	 * Gets or sets the inner HTML of the element.
	 * @param {string} [htmlContent] - The new inner HTML of the element.
	 * @returns {string|RQuery} The current inner HTML of the element,
	 * or the RQuery instance for chaining if the argument is not undefined.
	 */

	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/**
	 * Gets or sets the text content of the element.
	 * @param {string} [textContent] - The new text content of the element.
	 * @returns {string|RQuery} The current text content of the element,
	 * or the RQuery instance for chaining if the argument is not undefined.
	 */

	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent
		} else {
			this.element.innerHTML = textContent
			return this
		}
	}

	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error('Event type and callback must be strings and functions')
		}

		this.element.addEventListener(eventType, callback)
		return this
	}

	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener function to execute when the selected element is clicked. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */

	click(callback) {
		this.element.addEventListener('click', callback)
		return this
	}

	/**
	 * Attach a submit event listener to the selected element.
	 * @param {function(Event): void} onSubmit - The event listener function to execute when the selected element is submitted. The function will receive the event object as its argument.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLowerCase() === 'form') {
			this.element.addEventListener('submit', e => {
				e.preventDefault()
				onSubmit(e)
			})
		} else {
			throw new Error('Element must be a form')
		}

		return this
	}

	/**
	 * Sets attributes on an input element and adds an event listener for the "input" event.
	 * @param {function} onInput - The event listener callback.
	 * @param {...Object} rest - The attributes to set on the input element.
	 * Each attribute is specified as an object with a key-value pair.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input')
			throw new Error('Element must be an input')

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener('input', onInput)
		}

		return this
	}

	/**
	 * Sets up an input element of type number to only accept numbers, and optionally limits the length of the input.
	 * @param {number} [limit] - The maximum length of the input.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */

	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'number'
		) {
			throw new Error('Element must be an input of type number')
		}
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9.]/g, '')

			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})
		return this
	}

	/**
	 * Sets up an input element of type text to format the input like a credit card number.
	 * This will replace all non-numeric characters with nothing, and then insert a dash
	 * after every fourth number.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */
	creditCardInput() {
		let limit = 16
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'text'
		) {
			throw new Error('Element must be an input of type text')
		}
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9.]/g, '')

			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})
		return this
	}
	/**
	 * Shows the element by removing the CSS "display" property.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */

	show() {
		this.element.style.removeProperty('display')
		return this
	}

	/**
	 * Hides the element by setting the CSS "display" property to "none".
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */

	hide() {
		this.element.style.display = 'none'
		return this
	}

	/**
	 * Sets a CSS style property on the element.
	 * @param {string} property - The CSS property to set.
	 * @param {string} value - The value to set on the property.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be strings')
		}

		this.element.style[property] = value
		return this
	}

	/**
	 * Adds one or multiple class names to the element.
	 * @param {string|string[]} classNames - The class name(s) to add.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}

		return this
	}

	/**
	 * Removes one or multiple class names from the element.
	 * @param {string|string[]} classNames - The class name(s) to remove.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}

		return this
	}

	/**
	 * Gets or sets an attribute on the element.
	 * @param {string} attributeName - The name of the attribute to get or set.
	 * @param {string} [value] - The value to set on the attribute.
	 * @returns {string|RQuery} If `value` is not provided, the value of the attribute,
	 * otherwise the RQuery instance, for chaining.
	 */

	attr(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string')
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		} else {
			this.element.setAttribute(attributeName, value)
			return this
		}
	}

	/**
	 * Removes the attribute with the given name from the element.
	 * @param {string} attrName - The name of the attribute to remove.
	 * @returns {RQuery} The RQuery instance, for chaining.
	 */
	removeAttr(attrName) {
		if (typeof attrName !== 'string') {
			throw new Error('Attribute name must be a string')
		}
		this.element.removeAttribute(attrName)
		return this
	}

	/**
	 * Gets or sets the value of the element.
	 * @param {string} [newValue] - The value to set on the element.
	 * @returns {string|RQuery} If `newValue` is not provided, the value of the element,
	 * otherwise the RQuery instance, for chaining.
	 */
	value(newValue) {
		if (typeof newValue === 'undefined') {
			return this.element.value
		} else {
			this.element.value = newValue
			return this
		}
	}
}

/**
 * Create a new RQuery instance for the given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance for the given selector.
 */

export function $R(selector) {
	return new RQuery(selector)
}
