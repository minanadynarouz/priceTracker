import mongoose from "mongoose";

// Mongoose Schema is ODM (Object Document Model)
// It is same concept of ORMs with RDMS but using objects as MongoDB is not RDMS
// Schema is exactly matching the variables we logically scrapped from the website

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, require: true },
    image: { type: String, required: true }, // Image type string because we will store URL in the image
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
        {
            price: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [
        { email: { type: String, required: true } },
    ], default: [],


}, { timestamps: true });

// Below the schema above into a model, which will be able to create documents
// It save the product from the models to Product var or if not found it create it in the models
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;