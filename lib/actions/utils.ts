import { PriceHistoryItem, Product } from "@/types";
import { connectToDB } from "./mongoose";
import User from "../models/user";

const Notification = {
    WELCOME: 'WELCOME',
    CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
    LOWEST_PRICE: 'LOWEST_PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

// Extracts and returns the price from a list of possible elements.
export function extractPrice(...elements: any) {
    for (const element of elements) {
        const priceText = element.text().trim();

        if (priceText) {
            const cleanPrice = priceText.replace(/[^\d.]/g, '');

            let firstPrice;

            if (cleanPrice) {
                firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
            }

            return firstPrice || cleanPrice;
        }
    }

    return '';
}

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: any) {
    let currencyText = element.text().trim();

    const pattern = /[A-Z]{3}/;

    // Extract the currency code if it starts with "EGP"
    if (currencyText.includes(currencyText.match(pattern))) {
        return currencyText.slice(0, 3) + " ";
    }

    // If not "EGP", extract the first character as the currency code
    return currencyText.charAt(0) + " ";
}


// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
    // these are possible elements holding description of the product
    const selectors = [
        ".a-unordered-list .a-list-item",
        ".a-expander-content p",
        // Add more selectors here if needed
    ];

    for (const selector of selectors) {
        const elements = $(selector);
        if (elements.length > 0) {
            const textContent = elements
                .map((_: any, element: any) => $(element).text().trim())
                .get()
                .join("\n");
            return textContent;
        }
    }

    // If no matching elements were found, return an empty string
    return "";
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
    let highestPrice = priceList[0];

    for (let i = 0; i < priceList.length; i++) {
        if (priceList[i].price > highestPrice.price) {
            highestPrice = priceList[i];
        }
    }

    return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
    let lowestPrice = priceList[0];

    for (let i = 0; i < priceList.length; i++) {
        if (priceList[i].price < lowestPrice.price) {
            lowestPrice = priceList[i];
        }
    }

    return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
    const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
    const averagePrice = sumOfPrices / priceList.length || 0;

    return averagePrice;
}

export const getEmailNotifType = (
    scrapedProduct: Product,
    currentProduct: Product
) => {
    const lowestPrice = getLowestPrice(currentProduct.priceHistory);

    if (scrapedProduct.currentPrice < lowestPrice) {
        return Notification.LOWEST_PRICE as keyof typeof Notification;
    }
    if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
        return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
    }
    if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
        return Notification.THRESHOLD_MET as keyof typeof Notification;
    }

    return null;
};

export const formatNumber = (num: number = 0) => {
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};


// export async function addUserProduct(userId: string, productId: string) {
//     try {
//         connectToDB();

//         // Find the user by ID and update its followedProducts array
//         const user = await User.findById(userId);
//         if (!user) throw new Error('User not found');

//         // Check if the product is already in the followed products list
//         if (!user.followedProducts.includes(productId)) {
//             // Add the product ID to the user's followedProducts array
//             user.followedProducts.push(productId);
//             await user.save();
//         }

//         return user;
//     } catch (error: any) {
//         throw new Error(`Failed to add product to user: ${error.message}`);
//     }
// }