import mongoose, { models } from 'mongoose';

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tier : {
            type : String,
            required : true,
            default : "free",
        },
    },
    {timestamps : true}
);

const Company = models.Company || mongoose.model("Company", companySchema);

export default Company;
