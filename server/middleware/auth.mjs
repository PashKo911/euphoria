export function ensureAuthenticated(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(401).json({ message: 'Unauthorized' })
		}
		req.user = user
		return next()
	})(req, res, next)
}
