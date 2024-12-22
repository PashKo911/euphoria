import { v4 as uuidv4 } from 'uuid'
import UsersDBService from '../src/v1/models/user/UsersDBService.mjs'

export async function initializeGuest(req, res, next) {
	if (req.session.userId) {
		req.user = await UsersDBService.getById(req.session.userId)
		return next()
	}

	if (!req.session.guestId) {
		const guest = await UsersDBService.create({
			email: `guest-${uuidv4()}@example.com`,
			password: '',
			status: 'guest',
			name: 'Guest',
		})

		req.session.guestId = guest._id
		req.user = guest
	} else {
		req.user = await UsersDBService.getById(req.session.guestId)
	}

	next()
}
