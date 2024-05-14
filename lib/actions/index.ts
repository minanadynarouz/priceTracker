"use server"

import Product from "../models/product.model";
import { connectToDB } from "./mongoose";
import { scrapeAmazonProduct } from "./scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "./utils";
import { revalidatePath } from "next/cache";



export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        connectToDB();
        const scrappedProduct = await scrapeAmazonProduct(productUrl);

        if (!scrappedProduct) return;

        //Find product in DB or create product in DB
        // Already created the DB connection in mongoose.ts file
        // We created a DB model/schema in models dir under lib in order to continue below

        let product = scrappedProduct;

        // Use findone method to find the product based on the URL 
        const existingProduct = await Product.findOne({ url: scrappedProduct.url });
        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrappedProduct.currentPrice }
            ]

            product = {
                ...scrappedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrappedProduct.url },
            product,
            { upsert: true, new: true }
        )

        revalidatePath(`/products/${newProduct._id}`);

    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDB();
        const product = await Product.findOne({ _id: productId });

        if (!product) return null;

        return product;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllProducts() {
    try {
        connectToDB();
        const products = Product.find();
        return products;
    } catch (error) {
        console.log(error);
        return;
    }
}