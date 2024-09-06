import { SERVER_URL } from '@/config/url.config'

import { NotificationService } from '../services/notification.service'
import { StorageService } from '../services/storage.service'

import { extractErrorMessage } from './extract-error-message'
import { ACCESS_TOKEN_KEY } from '@/constants/auth.constants'

/**
 * Performs an AJAX request to the given path.
 * @param {string} path - The path to make the request to.
 * @param {object} [body] - The data to send with the request.
 * @param {object} [headers] - Additional headers to send with the request.
 * @param {string} [method=GET] - The HTTP method to use.
 * @param {function} [onError] - The callback to call if the request fails.
 * @param {function} [onSuccess] - The callback to call if the request succeeds.
 * @returns {Promise<{isLoading: boolean, error: string, data: object}>} - A promise that resolves with an object containing the isLoading flag, an error message, and the response data.
 */
export async function redQuery({
	path,
	body,
	headers = {},
	method = 'GET',
	onError = null,
	onSuccess = null
}) {
	let isLoading = true
	let error = null
	let data = null
	const url = `${SERVER_URL}/api${path}`

	const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY)

	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		requestOptions.headers.Authorization = `Bearer ${accessToken}`
	}

	if (body) {
		requestOptions.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, requestOptions)

		if (response.ok) {
			data = await response.json()
			if (onSuccess) {
				onSuccess(data)
			}
		} else {
			const errorData = await response.json()
			const errorMessage = extractErrorMessage(errorData)

			if (onError) {
				onError(errorMessage)
			}

			new NotificationService().show('error', errorMessage)
		}
	} catch (errorData) {
		const errorMessage = extractErrorMessage(errorData)

		if (onError) {
			onError(errorMessage)
		}
		new NotificationService().show('error', errorMessage)
	} finally {
		isLoading = false
	}

	return { isLoading, error, data }
}
