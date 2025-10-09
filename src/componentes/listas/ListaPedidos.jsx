import PropTypes from "prop-types";
import { ItemPedido } from "./ItemPedido";
import "./ListaPedidos.css";

export function ListaPedidos({ orders }) {
  if (!orders.length) {
    return <p className="lista-vacia">No hay pedidos para el estado seleccionado.</p>;
  }

  return (
    <section className="lista-pedidos">
      {orders.map((order) => (
        <ItemPedido key={order.id} {...order} />
      ))}
    </section>
  );
}

const itemPropType = PropTypes.shape({
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
});

ListaPedidos.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customer: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(itemPropType).isRequired,
      status: PropTypes.oneOf(["pending", "shipped", "delivered"]).isRequired,
      date: PropTypes.instanceOf(Date)
    })
  ).isRequired
};
