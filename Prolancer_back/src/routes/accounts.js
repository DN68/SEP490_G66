const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.post('/create',
    AccountController.register
);
router.post('/login',
    AccountController.login
);
router.put('/:email/changepw',
    AccountController.changePassword
);
router.post('/forgotPassword',
    AccountController.forgotPassword
);
router.get('/info',
    AccountController.getAccountInfo
);
router.get('/:email/checkEmail',
    AccountController.checkMailExist
);
router.get('/:username/checkUsername',
    AccountController.checkUsernameExist
);
// router.put('/:email/info/update',
//     AccountController.updateProfile
// );
// router.get('/details/:id',
//     UrderController.getOrderById
// );
// router.put('/roleChange',
//     AccountController.changeFreelancerMode
// );
module.exports = router;