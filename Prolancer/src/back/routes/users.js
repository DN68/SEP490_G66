const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create',
    UserController.register
);
router.post('/login',
    UserController.login
);
router.put('/:email/changepw',
    UserController.changePassword
);
router.post('/forgotPassword',
    UserController.forgotPassword
);
router.get('/info',
    UserController.getUserInfo
);
router.put('/:email/info/update',
    UserController.updateProfile
);

// router.get('/details/:id',
//     UrderController.getOrderById


// );
module.exports = router;