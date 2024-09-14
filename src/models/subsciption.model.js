import mongoose, { Schema } from "mongoose";

const subsciptionSchema = new Schema({

    subscriber: {
        type: Schema.Types.ObjectId, // one who subscribing
        ref:"User"
    
    },
    channel: {
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subsribing
        ref:"User"
    
    }
},
{
    timestamps: true
}
)


export const Subsciption = mongoose.model("Subsciption",subsciptionSchema)