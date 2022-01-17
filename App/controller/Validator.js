const {check, validationResult} = require('express-validator');

exports.validateUser = [
  check('first_name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('First name can not be empty!')
    .bail()
    .isLength({min: 3})
    .withMessage('First name must be minimum 3 characters')
    .bail(),
    check('last_name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('last name can not be empty!')
    .bail()
    .isLength({min: 2})
    .withMessage('Last name must be minimum 2 characters')
    .bail(),
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .isEmail()
    .withMessage('Invalid email address!')
    .bail(),
    check('gender')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Gender can not be empty!')
    .bail()
    .isLength({min: 4})
    .withMessage('Gender must be male or female')
    .bail(),
    check('phone')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid phone number!')
    .bail()
    .isLength(10)
    .withMessage('Phone number must be 10 characters')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({err: errors.array()[0].msg,status_code:422});
      next();
  },
];
exports.validateUpd = [
    check('first_name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('User name can not be empty!')
      .bail()
      .isLength({min: 3})
      .withMessage('First name must be minimum 2 characters')
      .bail(),
      check('last_name')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('last name can not be empty!')
      .bail()
      .isLength({min: 2})
      .withMessage('Last name must be minimum 2 characters')
      .bail(),
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .isEmail()
    .withMessage('Invalid email address!')
      .bail(),
      check('gender')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Gender can not be empty!')
    .bail()
    .isLength({min: 4})
    .withMessage('Gender must be male or female')
    .bail(),
    check('phone_no')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid phone number!')
      .bail()
      .isLength(10)
      .withMessage('Phone number must be 10 characters')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.json({err: errors.array()[0].msg,status_code:422});
      next();
    },
  ];
exports.validateLogin = [
    check('email')
      .trim()
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage('Invalid email address!')
      .isEmail()
    .withMessage('Invalid email address!')
      .bail(),
  check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid password!')
      .bail()
      .isLength({min: 8})
      .withMessage('Password of minimum 8 characters required!')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.json({err: errors.array()[0].msg, status_code:422});
      next();
    },
  ];
  exports.validateAddress = [
    check('pincode')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('pincode can not be empty!')
      .bail()
      .isLength(6)
      .withMessage('Pincode must be 6 characters!')
      .bail(),
    check('address_line')
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage('address can not be empty!')
      .bail()
      .isLength({min: 16})
      .withMessage('Address line of minimum 16 characters required!')
      .bail(),
    check('state')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid state')
      .bail()
      .isLength({min: 4})
      .withMessage('State of minimum 4 characters required!')
      .bail(),
  check('city')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid city')
      .bail()
      .isLength({min: 4})
      .withMessage('City of minimum 4 characters required!')
      .bail(),
      check('country')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid Country!')
      .bail()
      .isLength({min: 4})
      .withMessage('Country of minimum 4 characters required!')
      .bail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.json({err: errors.array()[0].msg,status_code:422});
      next();
    },
  ];
  