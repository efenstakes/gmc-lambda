// export external libraries
const { check } = require('express-validator')

// import internal modules



module.exports.apply = [

    check('applicant_email')
        .exists().withMessage('Email must be provided')
        .isEmail().withMessage('Email provided must be valid'),

    check('applicant_fullname')
        .exists().withMessage('Name must be provided')
        .isLength({ min: 4, max: 15 }).withMessage('Name provided must be 4 - 15 characters long'),

    check('applicant_phone')
        .exists().withMessage('Phone must be provided')
        .isLength({ min: 10, max: 10 }).withMessage('Phone provided must be 10 numbers long'),

    check('applicant_title')
        .exists().withMessage('Your title must be provided')
        .isLength({ min: 3, max: 20 }).withMessage('Your title provided must be 10 numbers long'),

    check('applicant_dob')
        .exists().withMessage('Your Date of Birth must be provided'),

    check('expectations')
        .exists().withMessage('Expectations must be provided'),
        // .isLength({ min: 10, max: 10 }).withMessage('Expectations provided must be 10 numbers long'),

]



module.exports.inquire = [

    check('email')
        .exists().withMessage('Email must be provided')
        .isEmail().withMessage('Email provided must be valid'),

    check('name')
        .exists().withMessage('Name must be provided')
        .isLength({ min: 4, max: 15 }).withMessage('Name provided must be 4 - 15 characters long'),

    check('solution')
        .exists().withMessage('Solution must be provided'),

    check('company_or_individual')
        .exists().withMessage('Company or Individual must be provided'),

    check('expectation')
        .exists().withMessage('Expectation must be provided'),
        // .isLength({ min: 10, max: 10 }).withMessage('Expectations provided must be 10 numbers long'),

]