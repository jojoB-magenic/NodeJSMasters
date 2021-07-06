const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/', 
  userController.getAllUsers
);

router.get('/user/:username',
  userController.validateUsernameIfExist,
  userController.getUserByUsername
);

router.get('/user/email/:emailAddress', 
  userController.validateEmailAddressIfExist,
  userController.getUserByEmailAddress
);

router.post('/',
  userController.validateRequestRequiredPayload,
  userController.validateRequestExtraPayload,
  userController.validateEmailAddressFormat,
  userController.validateUsernameAndEmailAddressIfExist,
  userController.insertUser
);

router.put('/user/:username', 
  userController.validateUsernameIfExist,
  userController.validateRequestExtraPayloadUsername,  
  userController.validateEmailAddressFormat,
  userController.validateEmailAddressIfNotExist,
  userController.updateUser
);

router.delete('/user/:username', 
  userController.validateUsernameIfExist,
  userController.deleteUser
);

module.exports = router;