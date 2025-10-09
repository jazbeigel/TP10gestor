import PropTypes from "prop-types";
import "./ItemPedido.css";

const estadosLegibles = {
  pending: "Pendiente",
  shipped: "Enviado",
  delivered: "Entregado"
};

export function ItemPedido({ id, customer, date, status, items }) {
  return (
    <article className="pedido">
      <header className="encabezado-pedido">
        <h3>Pedido #{id}</h3>
        <p className={`estado estado-${status}`}>{estadosLegibles[status]}</p>
      </header>
      <div className="datos-cliente">
        <p><strong>Cliente:</strong> {customer}</p>
        <p><strong>Fecha:</strong> {date.toLocaleDateString()}</p>
      </div>
      <ul className="lista-productos">
        {items.map((item) => (
          <li key={item.productId} className="producto">
            <span className="producto-nombre">{item.name}</span>
            <span className="producto-cantidad">Cantidad: {item.quantity}</span>
            <span className="producto-precio">
              Precio: $ {item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

ItemPedido.defaultProps = {
  status: "pending",
  date: new Date()
};

ItemPedido.propTypes = {
  id: PropTypes.number.isRequired,
  customer: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== "string") {
      return new Error(`La prop ${propName} en ${componentName} debe ser una cadena.`);
    }
    if (value.trim().length < 3) {
      return new Error(
        `La prop ${propName} en ${componentName} debe tener al menos 3 caracteres.`
      );
    }
    return null;
  },
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: (props, propName, componentName) => {
        const value = props[propName];
        if (typeof value !== "number" || Number.isNaN(value)) {
          return new Error(
            `La prop ${propName} en ${componentName} debe ser un número válido.`
          );
        }
        if (value <= 0) {
          return new Error(
            `La cantidad en ${componentName} debe ser mayor a 0.`
          );
        }
        return null;
      },
      price: PropTypes.number.isRequired
    })
  ).isRequired,
  status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
  date: PropTypes.instanceOf(Date)
};
