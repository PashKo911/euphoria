import React from 'react'
import Preloader from './Preloader'

const ProcessMessage = ({ process, items }) => {
	if (process === 'loading') {
		return (
			<div className="message-block">
				<Preloader />
			</div>
		)
	}

	if (items) {
		if (process !== 'loading' && items.length === 0) {
			return <div className="message-block">{'No items available...'}</div>
		}
	}

	return null
}

export default ProcessMessage
