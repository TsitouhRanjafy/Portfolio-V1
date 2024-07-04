import { expressYupMiddleware } from "express-yup-middleware";
import * as Yup from 'yup'

const MINIMUM_LENGTH = {
    name : 4,
    tel : 10
}

const MAXIMUM_LENGTH = {
    name : 30,
    tel : 30,
    message : 255
}

export const messageValidator = {
    schema : {
        body : {
            yupSchema: Yup.object().shape({
                email : Yup.string().email().required(),
                name : Yup.string().min(MINIMUM_LENGTH.name).max(MAXIMUM_LENGTH.name),
                tel : Yup.string().min(MINIMUM_LENGTH.tel).max(MAXIMUM_LENGTH.tel).required(),
                message : Yup.string().max(MAXIMUM_LENGTH.message)
            })
        }
    }
}