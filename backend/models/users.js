import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxLength: 30,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 30,
        default: '',
    },
    phone: {
        type: String,
        trim: true,
        default: '',
    },
    country: {
        type: String,
        trim: true,
        default: 'Georgia',
    },
    city: {
        type: String,
        trim: true,
        default: '',
    },
    zip: {
        type: String,
        trim: true,
        default: '',
    },
    address: {
        type: String,
        trim: true,
        default: '',
    },
    address2: {
        type: String,
        trim: true,
        default: '',
    },
})

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    address: {
        type: AddressSchema,
        default: () => ({}), 
    },
}, { timestamps: true })

export default mongoose.model('Users', UsersSchema)