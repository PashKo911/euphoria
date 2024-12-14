import passport from 'passport'
import localStrategy from '../strategies/localStrategy'
import jwtStrategy from '../strategies/jwtStrategy'

passport.use('local', localStrategy)
passport.use('jwt', jwtStrategy)
