const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/registration',
    [check('userName', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть более 3 и меньше 10 символов").isLength({min: 4, max: 10})],
    controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers)

module.exports = router