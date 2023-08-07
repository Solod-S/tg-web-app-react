import Button from "../Button/Button";
import "./ProductList.css";
import { useTelegram } from "../../hooks/useTelegram";

function ProductList() {
  const { user, onClose } = useTelegram();

  return <div>ProductList</div>;
}

export default ProductList;
