"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
class EnregistrementMessage {
    constructor() {
        this.router = express_1.default.Router();
        this.init();
    }
    init() {
        this.router.get('/', (req, res) => {
            res.status(http_status_codes_1.StatusCodes.OK).send({
                status: http_status_codes_1.ReasonPhrases.OK,
                message: "Enregistrer"
            });
        });
    }
}
exports.default = EnregistrementMessage;
