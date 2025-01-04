// src/types/index.ts
export interface Recipe {
    _id: string;
    title: string;
    description: string;
    price: number;
    previewContent: string;
    fullContent: string;
    image: string;
    author: string;
    createdAt: Date;
  }
  
  export interface User {
    _id: string;
    email: string;
    name: string;
    purchasedRecipes: string[]; // Array of recipe IDs
  }
  