import { Document,Schema,model } from "mongoose";

// Interface
interface IMessage extends Document{
    numero : number,
    email : string,
    name : string,
    tel : number,
    message : string
}

interface IAdmin extends Document{
    email : string,
    name : string,
    tel : number,
    message : string
}
interface INombreMessageReçu extends Document{
    nombre : number
}

// Schema
const messageSchema = new Schema<IMessage>({
    numero : {type : Number},
    email : {type : String},
    name : {type : String},
    tel : {type : Number},
    message : {type : String}
})    
const adminSchema = new Schema<IAdmin>({
    email : {type : String},
    name : {type : String},
    tel : {type : Number},
    message : {type : String}
})    
const nombreMessageReçUSchema  = new Schema<INombreMessageReçu>({
    nombre : {type : Number}
})

// Model
export const NombreMessageReçu = model<INombreMessageReçu>('NombreMessageReçu',nombreMessageReçUSchema)
export const Message = model<IMessage>('messageclient',messageSchema)
export const Admin = model<IAdmin>('admin',adminSchema)
