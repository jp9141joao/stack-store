export interface ProductDTO {
    name: string;           // The name of the product (e.g., "Wireless Mouse")
    description: string;    // A detailed description of the product’s features or purpose
    color: string;          // The color of the product (e.g., "Red", "Black")
    weight: number;         // The weight of the product (e.g., in kilograms or grams)
    type: string;           // The category or type of the product (e.g., "Electronics", "Apparel")
    price: number;          // The retail price of the product (e.g., 49.99)
    dateRegister: Date;     // The date when the product was registered or added to the system
}
