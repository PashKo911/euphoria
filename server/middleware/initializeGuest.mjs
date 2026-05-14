import { randomUUID } from 'crypto'
import UsersDBService from '../src/v1/models/user/UsersDBService.mjs'

export async function initializeGuest(req, res, next) {
	const guestId = req.headers['x-guest-id']

	if (!guestId) {
		const guest = await UsersDBService.create({
			email: `guest-${randomUUID()}@example.com`,
			password: '',
		})

		res.setHeader('x-guest-id', guest._id.toString())
		req.user = guest
	} else {
		const guest = await UsersDBService.getById(guestId)

		if (!guest) {
			return res.status(404).json({ message: 'Guest not found' })
		}

		req.user = guest
	}

	next()
}
