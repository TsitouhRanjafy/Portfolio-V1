import  express, { Application }  from "express";
import  path  from "path";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Routes from "./API/router";

dotenv.config();
const app : Application = express()
const PORT = process.env.PORT || 3000
const  MONGODB_URL = process.env.MONGODB_URL 

// Middleware
const cheminStatic = path.join(__dirname,'../public');
const cheminStaticCSS = path.join(__dirname,'../public/dis/');
const cheminStaticJS = path.join(__dirname,'../public/script/');
const cheminStaticICO = path.join(__dirname,'../public/ico/');
const cheminStaticIMAGE = path.join(__dirname,'../public/image/');
const cheminStaticFONT = path.join(__dirname,'../public/Font/');
app.use(express.static(cheminStatic))
app.use(express.static(cheminStaticCSS))
app.use(express.static(cheminStaticJS))
app.use(express.static(cheminStaticICO))
app.use(express.static(cheminStaticIMAGE))
app.use(express.static(cheminStaticFONT))
app.use(express.json())

// Route 
const Route : Routes = new Routes(app)
Route.initialisation();



// Connecter au base de donnée
const demarrer = async () =>{
    try{
        if (!MONGODB_URL){
            console.log(`votre url : ${MONGODB_URL}`);
            throw new Error('base de donnée URL non definie ');
        }
        await mongoose.connect(MONGODB_URL)
        console.log(" connexion à la base de donnée ok ");
    }catch(error){
        console.log(error);
        
    }
   
}
demarrer();

app.listen(PORT, () =>{
    console.log(` serveur demarrer sur le \"http://localhost:${PORT}\"`);
})
