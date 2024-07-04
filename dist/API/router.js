"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const path_1 = __importDefault(require("path"));
const express_yup_middleware_1 = require("express-yup-middleware");
const message_validator_1 = require("../Models/message.validator");
const body_parser_1 = __importDefault(require("body-parser"));
const message_modele_1 = require("../Models/message.modele");
class Routes {
    constructor(app) {
        this.rout = app;
    }
    initialisation() {
        this.rout.use(body_parser_1.default.urlencoded({ extended: true }));
        // '/postMessage'
        this.rout.post('/postMessage', (0, express_yup_middleware_1.expressYupMiddleware)({
            schemaValidator: message_validator_1.messageValidator,
            expectedStatusCode: http_status_codes_1.StatusCodes.BAD_REQUEST
        }), (req, res) => {
            const enregistrer = (I) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const message = new message_modele_1.Message(I);
                    const adminArray = yield message_modele_1.Admin.find({}, { _id: 0 });
                    let adminObjet = adminArray[0];
                    let { email: email, name: name, tel: tel, message: mess } = adminObjet;
                    if (email == I.email && name == I.name && tel == I.tel && mess == I.message) {
                        res.status(http_status_codes_1.StatusCodes.OK).sendFile(path_1.default.join(__dirname, '../../public/admin.html'));
                    }
                    else {
                        yield message.save();
                        let nombreCourant = yield message_modele_1.NombreMessageReçu.find({}, { nombre: 1, _id: 0 });
                        nombreCourant[0].nombre += 1;
                        yield message_modele_1.NombreMessageReçu.updateOne({}, { $set: { nombre: nombreCourant[0].nombre } });
                        res.status(http_status_codes_1.StatusCodes.CREATED).redirect('/');
                    }
                    console.log("saved");
                }
                catch (error) {
                    console.log(error);
                    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(error);
                }
            });
            const { body: message } = req;
            enregistrer(message);
        });
        this.rout.get('/postMessage', (req, res) => {
            const getMessage = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = yield message_modele_1.Message.find();
                    res.send(data);
                }
                catch (error) {
                    console.log(error);
                    res.send(error);
                }
            });
            getMessage();
        });
    }
}
exports.default = Routes;
