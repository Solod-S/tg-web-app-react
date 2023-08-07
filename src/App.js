import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";

import { useTelegram } from "./hooks/useTelegram";

import "./App.css";

function App() {
  const { tg, onToggleButton, onClose } = useTelegram();

  useEffect(() => {
    tg.ready();

    // сообщает что приложение проинициализировано
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
