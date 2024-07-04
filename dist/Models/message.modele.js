"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Message = exports.NombreMessageReçu = void 0;
const mongoose_1 = require("mongoose");
// Schema
const messageSchema = new mongoose_1.Schema({
    numero: { type: Number },
    email: { type: String },
    name: { type: String },
    tel: { type: Number },
    message: { type: String }
});
const adminSchema = new mongoose_1.Schema({
    email: { type: String },
    name: { type: String },
    tel: { type: Number },
    message: { type: String }
});
const nombreMessageReçUSchema = new mongoose_1.Schema({
    nombre: { type: Number }
});
// Model
exports.NombreMessageReçu = (0, mongoose_1.model)('NombreMessageReçu', nombreMessageReçUSchema);
exports.Message = (0, mongoose_1.model)('messageclient', messageSchema);
exports.Admin = (0, mongoose_1.model)('admin', adminSchema);
