import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './circle-chart.module.scss'
import template from './circle-chart.template.html'

import { DonutChart } from '@/components/ui/donut-chart/donut-chart.component'

export class CircleChart extends ChildComponent {
	constructor(incomePercent, expensePercent) {
		super()

		this.incomePercent = incomePercent
		this.expensePercent = expensePercent
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new DonutChart([
					{ value: this.incomePercent, color: '#08f0c8' },
					{ value: this.expensePercent, color: '#3e71cf' }
				])
			],
			styles
		)

		return this.element
	}
}
