const mongoose = require("mongoose");

const schema=new mongoose.Schema({
    title:{
         type: String,
        isRequired:true 
    },
    isCompleted:{
        type:Boolean,
        default:false
    }

},{timestamps:{createdAt:true,updatedAt:false}})

const TodoModel = mongoose.model("Todo", schema);
 
module.exports = TodoModel
