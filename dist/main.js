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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./API/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
// Middleware
const cheminStatic = path_1.default.join(__dirname, '../public');
const cheminStaticCSS = path_1.default.join(__dirname, '../public/dis/');
const cheminStaticJS = path_1.default.join(__dirname, '../public/script/');
const cheminStaticICO = path_1.default.join(__dirname, '../public/ico/');
const cheminStaticIMAGE = path_1.default.join(__dirname, '../public/image/');
const cheminStaticFONT = path_1.default.join(__dirname, '../public/Font/');
app.use(express_1.default.static(cheminStatic));
app.use(express_1.default.static(cheminStaticCSS));
app.use(express_1.default.static(cheminStaticJS));
app.use(express_1.default.static(cheminStaticICO));
app.use(express_1.default.static(cheminStaticIMAGE));
app.use(express_1.default.static(cheminStaticFONT));
app.use(express_1.default.json());
// Route 
const Route = new router_1.default(app);
Route.initialisation();
// Connecter au base de donnée
const demarrer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!MONGODB_URL) {
            console.log(`votre url : ${MONGODB_URL}`);
            throw new Error('base de donnée URL non definie ');
        }
        yield mongoose_1.default.connect(MONGODB_URL);
        console.log(" connexion à la base de donnée ok ");
    }
    catch (error) {
        console.log(error);
    }
});
demarrer();
app.listen(PORT, () => {
    console.log(` serveur demarrer sur le \"http://localhost:${PORT}\"`);
});
