import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import { IMyBagCountValue } from "../interface/types";
import { CART_ITEMS_KEY } from "../constants/Constants";

export const MyBagContext = createContext<IMyBagCountValue>({
  mybagCount: 0,
  updateMyBagCount: () => {},
});

function BagProvider({ children }) {
  const [mybagCount, setMybagCount] = useState(0);

  const updateMyBagCount = () => {
    var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);

    var localStorageProductParse = localStorageProductData
      ? JSON.parse(localStorageProductData)
      : null;
    const arrayCount = localStorageProductParse
      ? localStorageProductParse.length
      : 0;

    if (!isNaN(arrayCount)) {
      setMybagCount(arrayCount);
    } else {
      setMybagCount(0);
    }
  };

  useEffect(() => {
    updateMyBagCount();
  }, []);

  const contextValue: IMyBagCountValue = {
    mybagCount,
    updateMyBagCount,
  };

  return (
    <MyBagContext.Provider value={contextValue}>
      {children}
    </MyBagContext.Provider>
  );
}
export function useMyBag() {
  const context = useContext<IMyBagCountValue>(MyBagContext);
  return context;
}

export default BagProvider;
