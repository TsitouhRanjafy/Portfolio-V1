"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageValidator = void 0;
const Yup = __importStar(require("yup"));
const MINIMUM_LENGTH = {
    name: 4,
    tel: 10
};
const MAXIMUM_LENGTH = {
    name: 30,
    tel: 30,
    message: 255
};
exports.messageValidator = {
    schema: {
        body: {
            yupSchema: Yup.object().shape({
                email: Yup.string().email().required(),
                name: Yup.string().min(MINIMUM_LENGTH.name).max(MAXIMUM_LENGTH.name),
                tel: Yup.string().min(MINIMUM_LENGTH.tel).max(MAXIMUM_LENGTH.tel).required(),
                message: Yup.string().max(MAXIMUM_LENGTH.message)
            })
        }
    }
};
