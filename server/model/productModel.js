import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Corrected typo from "require" to "required"
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,  // Corrected the reference to Schema.Types.ObjectId
        ref: "productCategory",
        required: true,
    },
    color: {
        type: [String],  // Corrected the array type declaration
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
    },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
