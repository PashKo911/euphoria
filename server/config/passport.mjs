import passport from 'passport'
import jwtStrategy from '../strategies/jwtStrategy.mjs'

passport.use('jwt', jwtStrategy)

export default passport
