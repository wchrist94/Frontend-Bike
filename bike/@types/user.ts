import mongoose, { models } from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        company : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            required : true,
            default : "manager",
        },
    },
    {timestamps : true}
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
