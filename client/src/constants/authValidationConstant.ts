import * as Yup from 'yup';

import { Strings } from '../assets/Strings';

const loginRules = {
    email: Yup.string()
        .max(30, Strings.authValidation.limitExceeded)
        .email(Strings.authValidation.incorrectEmail)
        .required(Strings.authValidation.required),
    password: Yup.string()
        .min(8, Strings.authValidation.passwordIsShort)
        .max(30, Strings.authValidation.limitExceeded)
        .required(Strings.authValidation.required),
};

const registrationRules = {
    firstName: Yup.string()
        .max(30, Strings.authValidation.limitExceeded)
        .required(Strings.authValidation.required),
    lastName: Yup.string()
        .max(30, Strings.authValidation.limitExceeded)
        .required(Strings.authValidation.required),
    phoneNumber: Yup.string()
        .length(18, Strings.authValidation.incorrectNumber)
        .required(Strings.authValidation.required),
    confirmedPassword: Yup.string()
        .oneOf([Yup.ref('password')], Strings.authValidation.PSWDDoNotMatch)
        .required(Strings.authValidation.required),
};

export const loginSchema = Yup.object().shape(loginRules);

export const registrationSchema = Yup.object().shape({ ...loginRules, ...registrationRules });
