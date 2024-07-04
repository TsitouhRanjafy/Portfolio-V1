import express,{ Application,Request,Response,Router } from "express";
import { StatusCodes,ReasonPhrases } from "http-status-codes";
import path from "path"
import { expressYupMiddleware } from "express-yup-middleware";
import { messageValidator } from "../Models/message.validator";
import bodyParser from "body-parser";
import { Admin, Message, NombreMessageReçu } from "../Models/message.modele";

interface InterfaceMessage {
    numero : number,
    email : string,
    name : string,
    tel : number,
    message : string
} 
interface INombreMessageReçu{
    nombre : number;
}

interface IAdmin{
    email : string,
    name : string,
    tel : number,
    message : string
}



export default class Routes {
    private rout : Application
    constructor(app : Application){
        this.rout = app
    }
    public initialisation(){
        this.rout.use(bodyParser.urlencoded({extended : true}))
        // '/postMessage'
        this.rout.post(
            '/postMessage',
            expressYupMiddleware({
                schemaValidator : messageValidator,
                expectedStatusCode : StatusCodes.BAD_REQUEST
            }),
            (req : Request,res : Response) =>{
            const enregistrer = async (I : InterfaceMessage) =>{
                try{
                    const message = new Message(I)
                    const adminArray  = await Admin.find({},{_id : 0})
                    let adminObjet : IAdmin = adminArray[0]
                    let { email : email ,name : name ,tel : tel ,message : mess} = adminObjet
                    if (email == I.email && name == I.name && tel == I.tel && mess == I.message){
                        res.status(StatusCodes.OK).sendFile(path.join(__dirname,'../../public/admin.html'))
                    }else{
                        await message.save();
                        let nombreCourant = await NombreMessageReçu.find({},{nombre : 1,_id : 0})
                        nombreCourant[0].nombre += 1
                        await NombreMessageReçu.updateOne({},{$set : {nombre : nombreCourant[0].nombre}});
                        res.status(StatusCodes.CREATED).redirect('/')
                    }
                    console.log("saved");
                }catch(error){
                    console.log(error);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
                }
            }
            const {body : message} = req
            enregistrer(message)
        })

        this.rout.get('/postMessage' ,(req : Request,res : Response) =>{
            const getMessage = async () =>{
                try{
                    const data = await Message.find();
                    res.send(data)
                }catch(error){
                    console.log(error);
                    res.send(error)
                }
            }
            getMessage();
        })
    }
}