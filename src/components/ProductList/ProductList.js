import { useState, useEffect, useCallback } from "react";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "2",
    title: "Куртка",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "3",
    title: "Джинсы 2",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "4",
    title: "Куртка 8",
    price: 122,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "5",
    title: "Джинсы 3",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  {
    id: "6",
    title: "Куртка 7",
    price: 600,
    description: "Зеленого цвета, теплая",
  },
  {
    id: "7",
    title: "Джинсы 4",
    price: 5500,
    description: "Синего цвета, прямые",
  },
  {
    id: "8",
    title: "Куртка 5",
    price: 12000,
    description: "Зеленого цвета, теплая",
  },
];

const getTotalPrice = (items) => {
  return items.reduce((acc, cur) => {
    return (acc += cur.price);
  }, 0);
};

function ProductList() {
  const { tg, queryId } = useTelegram();
  const [addedItems, setAddedItems] = useState([]);

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    // fetch("http://localhost:8000/web-data", {
    fetch("https://th-bot-test.onrender.com/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };
  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={"item"}
        />
      ))}
    </div>
  );
}

export default ProductList;
