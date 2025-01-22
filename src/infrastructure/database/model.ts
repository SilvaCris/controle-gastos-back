import { model, Schema } from 'mongoose'

const DespesaSchema = new Schema({
    descricao:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    data:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    
})

export const DespesaModel = model('despesas', DespesaSchema)