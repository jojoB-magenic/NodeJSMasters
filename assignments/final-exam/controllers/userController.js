const { userDataAccess } = require('../data-access');

/**
 * https://jsdoc.app/
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Gets all users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllUsers = async (req, res, next) => {
  const users = await userDataAccess.getAll();

  res.send(users);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateUsernameIfExist = async (req, res, next) => {
  const username = req.params.username;

  const user = await userDataAccess.getUserByAny('username', username);

  if(user) {
    return next();
  }
  
  res.status(404).send('Username does not exists');
};

/**
 * Gets user by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getUserByUsername = async (req, res, next) => {
  const username = req.params.username;

  const user = await userDataAccess.getUserByAny('username', username);

  res.send(user);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateEmailAddressIfExist = async (req, res, next) => {
  const emailAddress = req.params.emailAddress;

  const user = await userDataAccess.getUserByAny('emailAddress', emailAddress);

  if(user) {
    return next();
  }
  
  res.status(404).send('Email Address does not exists');
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateEmailAddressIfNotExist = async (req, res, next) => {

  const payload = req.body;
  const { emailAddress } = payload;

  const user = await userDataAccess.getUserByAny('emailAddress', emailAddress);

  if(!user) {
    return next();
  }
  
  res.status(409).send('Email Address already exists');
};

/**
 * Gets user by id
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const getUserByEmailAddress = async (req, res, next) => {
  const emailAddress = req.params.emailAddress;

  const user = await userDataAccess.getUserByAny('emailAddress', emailAddress);

  res.send(user);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequestRequiredPayload = (req, res, next) => {
  const payload = req.body;

  const areAllPropsPresent = ['username', 'emailAddress', 'firstName', 'lastName']
    .every(requiredProp => requiredProp in payload);

  if (areAllPropsPresent) {
    return next();
  }

  res.status(400).send('username/emailAddress must be present in the payload');
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateRequestExtraPayload = (req, res, next) => {
  const payload = req.body;
  const payloadPropNames = Object.keys(payload);
  const validPropNames = ['username', 'emailAddress', 'firstName', 'lastName'];

  const hasExtraProps = !payloadPropNames
    .every(payloadPropName => validPropNames.includes(payloadPropName));

  if (hasExtraProps) {
    return res.status(400).send('Request payload has extra properties');
  }

  next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateRequestExtraPayloadUsername = (req, res, next) => {
  const payload = req.body;
  const payloadPropNames = Object.keys(payload);
  const validPropNames = ['emailAddress', 'firstName', 'lastName'];

  const hasExtraProps = !payloadPropNames
    .every(payloadPropName => validPropNames.includes(payloadPropName));

  if (hasExtraProps) {
    return res.status(400).send('Request payload has extra properties');
  }

  next();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateEmailAddressFormat = (req, res, next) => {
  const payload = req.body;
  const { emailAddress } = payload;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isEmailAddressValid = emailRegexp.test(emailAddress);

  if(!isEmailAddressValid) {
    return res.status(400).send('Invalid email address.');
  }

  next();  
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
 const validateUsernameAndEmailAddressIfExist = async (req, res, next) => {

  const payload = req.body;

  const { username, emailAddress } = payload;

  const usernameExists = await userDataAccess.getUserByAny('username', username);
  const emailAddressExists = await userDataAccess.getUserByAny('emailAddress', emailAddress);

  if(usernameExists || emailAddressExists) {
    return res.status(409).send('Username / Email Address already exists');
  }
  
  next();
};

/**
 * Inserts user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const insertUser = async (req, res, next) => {
  const payload = req.body;

  const user = await userDataAccess.insert(payload);

  res.status(201).send(user);
};

/**
 * Updates user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateUser = async (req, res, next) => {
  const username = req.params.username;
  const payload = req.body;

  await userDataAccess.updateByUsername(username, payload);

  res.sendStatus(200);
};

/**
 * Deletes user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteUser = async (req, res, next) => {
  const username = req.params.username;

  await userDataAccess.deleteByUsername(username);

  res.sendStatus(200);
};

module.exports = {
  getAllUsers,
  validateUsernameIfExist,
  getUserByUsername,
  validateEmailAddressIfExist,
  getUserByEmailAddress,  
  validateRequestRequiredPayload,
  validateRequestExtraPayload,
  validateEmailAddressFormat,
  validateUsernameAndEmailAddressIfExist,
  insertUser,
  validateEmailAddressIfNotExist,
  validateRequestExtraPayloadUsername,
  updateUser,
  deleteUser
};
