import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { StorageService } from '@/core/services/storage.service'

import styles from './notification.module.scss'
import template from './notification.template.html'

export class Notification extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		window.storageService = new StorageService()

		return this.element
	}
}
