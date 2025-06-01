import mongoose from "mongoose";                              // Import the mongoose library to define schemas and models

const productSchema = new mongoose.Schema({                  // Create a new Mongoose schema for the "Product" collection
    id: String,                                              // 'id' field: stored as a String; can be used for a custom identifier
    name: String,                                            // 'name' field: stored as a String; represents the product's name
    description: String,                                     // 'description' field: stored as a String; provides details about the product
    color: String,                                           // 'color' field: stored as a String; indicates the product's color
    weight: Number,                                          // 'weight' field: stored as a Number; represents the product's weight (e.g., in kilograms)
    type: String,                                            // 'type' field: stored as a String; categorizes the product (e.g., "electronics", "apparel")
    price: Number,                                           // 'price' field: stored as a Number; indicates the cost or retail price of the product
    dateRegister: Date                                       // 'dateRegister' field: stored as a Date; records when the product was registered or added
});

const Product = mongoose.model('Product', productSchema);    // Create a Mongoose model named "Product" based on the defined schema
                                                             // This model provides an interface to interact with the "products" collection in MongoDB
                                                             
export default Product;                                      // Export the model so it can be imported and used in other parts of the application
