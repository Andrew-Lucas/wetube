import express from 'express'
import {protectedMiddleware, publicOnlyMiddleware} from "../middlewares"
import { getJoin, postJoin, getLogin, postLogin } from '../controllers/userController'
import {handleHome, searchVideo} from "../controllers/videoController"

const globalRouter = express.Router()

globalRouter.get('/', handleHome)
globalRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin)
globalRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin)
globalRouter.get("/search", searchVideo)

export default globalRouter