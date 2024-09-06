import { redQuery } from '@/core/red-query/red-query.lib'

export class UserService {
	#BASE_URL = '/users'

	getALl(searchTerm, onSuccess) {
		return redQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}
