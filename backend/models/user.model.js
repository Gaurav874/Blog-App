const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            require:true,
        },
        lastName:{
            type:String,
            require:true,
            maxLength:500
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{type:String,require:true,},
        bio:{type:String, default:""},
        occupation:{type:String, default:""},
        photoUrl:{type:String, default:""},
        instagram:{type:String, default:""},
        linkedin:{type:String, default:""},
        github:{type:String, default:""},
        facebook:{type:String, default:""},
    },{timestamps:true}
)

module.exports = mongoose.model("User", userSchema);