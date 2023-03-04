import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/app/store'
import { Product } from "src/app/types";
import { stat } from "fs";


export interface IInitialState {
  items: Product[]
}

const initialState: IInitialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {

    addToBasket: (state, action: PayloadAction<Product>) => {
    
      let item: Product = {...action.payload}

      item.quantity = 1
      item.total = item.price

      state.items = [...state.items, item]
    },

    removeFromBasket: (state, action: PayloadAction<Product>) => {

      let items: Product[] =  [...state.items];
      const index = items.findIndex((basketItem: Product) => basketItem.id === action.payload.id);

      

      if(index >= 0){
        // The item exist in basket
        items.splice(index, 1);
      } else{
        console.warn(
          `(id : ${action.payload.id}) is not present in the Basket`
        );
      }
      state.items = items;
    },
    
    
    incrementProductQuantity: (state, action: PayloadAction<Product>) => {
      let items: Product[] = [...state.items]
      let index: number = items.findIndex((i) => i.id === action.payload.id)      
      
      let quantity: number = items[index].quantity
      if (quantity) {
        quantity = Number(quantity) + 1
      } else {
        quantity = 1
      }
      items[index].quantity = quantity
      items[index].total = Number(items[index].price) * quantity
      
      state.items = items//[...state.items, item]
    },

    decrementProductQuantity: (state, action: PayloadAction<Product>) => {
      let items: Product[] = [...state.items]
      let index: number = state.items.findIndex((i) => i.id === action.payload.id)
      let quantity: number = items[index].quantity
      if (quantity>1) {
        quantity = Number(quantity) - 1
      } else {
        quantity = 1
      }
      items[index].quantity = quantity
      items[index].total = Number(items[index].price) * quantity
      
      state.items = items//[...state.items, item]
    }/* ,

    removeGroupedFromBasket: (state, action: PayloadAction<Product>) => {
      let newBasket: Product[] = state.items.filter(
          (item: Product) => item.id !== action.payload.id
      );

      state.items = newBasket;
    }, */
  }
});

export const { 
  addToBasket, 
  removeFromBasket, 
  //removeGroupedFromBasket,
  incrementProductQuantity,
  decrementProductQuantity 
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState): Product[] => state.basket.items;
export const selectTotal = (state: RootState): number => state.basket.items.reduce((total: number, item: Product) => total + item.quantity, 0)
export const selectSubTotal = (state: RootState): number => state.basket.items.reduce((total: number, item: Product) => total + item.total, 0)

export default basketSlice.reducer;