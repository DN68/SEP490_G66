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
router.get('/:email/checkEmail',
    UserController.checkMailExist
);
router.get('/:username/checkUsername',
    UserController.checkUsernameExist
);
router.put('/:email/info/update',
    UserController.updateProfile
);

// router.get('/details/:id',
//     UrderController.getOrderById


// );
router.put('/roleChange',
    UserController.changeFreelancerMode
);
module.exports = router;