import { Input } from "@/components/ui/input";
import { useState } from "react";
import SearchProduct from "./search-product";
import { IProduct } from "@/types/backend.d";

interface IProp {
    data: {
        productOnBill: IProduct[];
        setProductOnBill: React.Dispatch<React.SetStateAction<IProduct[]>>;
        quantities: number[];
        setQuantities: React.Dispatch<React.SetStateAction<number[]>>;
    }
}

export function Left(prop: IProp) {

    const removeItem = (index: number) => {
        prop.data.setProductOnBill((prevProducts: IProduct[]) => {
            const newProducts = [...prevProducts];
            newProducts.splice(index, 1);
            return newProducts;
        });
        prop.data.setQuantities((prevQuantities: number[]) => {
            const newQuantities = [...prevQuantities];
            newQuantities.splice(index, 1);
            return newQuantities;
        });
    }

    const decreaseQuantity = (index: number) => {
        prop.data.setQuantities((prevQuantities: number[]) => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] > 1) {
                newQuantities[index]--;
            }
            return newQuantities;
        });
    };

    const increaseQuantity = (index: number) => {
        prop.data.setQuantities((prevQuantities: number[]) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index]++;
            return newQuantities;
        });
    };

    const handleQuantityChange = (index: number, value: string) => {
        prop.data.setQuantities((prevQuantities: number[]) => {
            const newQuantities = [...prevQuantities];
            const numericValue = parseInt(value, 10);
            if (!isNaN(numericValue) && numericValue > 0) {
                newQuantities[index] = numericValue;
            }
            return newQuantities;
        });
    };

    const addProductToBill = (product: IProduct) => {
        const products = [...prop.data.productOnBill];

        let flag = true;
        products.forEach((p: IProduct, index: number) => {
            if (p.id === product.id) {
                flag = false;
            }
        })
        if (flag) products.push(product);

        prop.data.setProductOnBill(products);
        prop.data.setQuantities([...prop.data.quantities, 1]);
    }

    return (
        <div className="h-full flex flex-col mt-6" style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', width: 'calc(100% - calc(100vw*2/7) - 4px)' }}>
            <div>
                <SearchProduct data={{ addProductToBill }}></SearchProduct>
            </div>

            <div className="grow-0 w-full ml-1 p-1 overflow-y-auto min-h-[96%]" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                {prop.data.productOnBill.map((product: IProduct, index: number) => (
                    <div key={product.id} className={"flex flex-row p-2 border-b items-center" + (index % 2 === 0 ? ' bg-green-100' : '')}>
                        <div>{index + 1}</div>
                        <button className="pl-1 pr-3 text-red-500" onClick={() => removeItem(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="pr-3">SP_{product.id}</div>
                        <div className="w-full truncate">{product.name}</div>
                        <div className="flex flex-row items-center justify-between max-w-80">
                            <div className="pl-3 pr-3">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                            <div className="flex items-center space-x-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded w-8 h-8 flex items-center justify-center" onClick={() => decreaseQuantity(index)}>-</button>
                                <Input
                                    className="inline-block w-12 text-center border border-gray-300 rounded"
                                    type="text"
                                    value={prop.data.quantities[index]}
                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                    name="quantity"
                                />
                                <button className="bg-green-500 text-white px-2 py-1 rounded w-8 h-8 flex items-center justify-center" onClick={() => increaseQuantity(index)}>+</button>
                            </div>
                            <div className="font-bold pl-3 text-right max-w-24 min-w-24 truncate">{(product.price * prop.data.quantities[index]).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}