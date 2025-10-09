import { useState } from "react";
import PropTypes from "prop-types";
import "./FormularioPedido.css";

const estados = ["pending", "shipped", "delivered"];

const itemVacio = () => ({
  productId: "",
  name: "",
  quantity: 1,
  price: 0
});

export function FormularioPedido({ onCreate }) {
  const [cliente, setCliente] = useState("");
  const [estado, setEstado] = useState(estados[0]);
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([itemVacio()]);
  const [errores, setErrores] = useState([]);

  const actualizarItem = (indice, campo, valor) => {
    setItems((prev) =>
      prev.map((item, i) => (i === indice ? { ...item, [campo]: valor } : item))
    );
  };

  const agregarItem = () => {
    setItems((prev) => [...prev, itemVacio()]);
  };

  const eliminarItem = (indice) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== indice)));
  };

  const validar = () => {
    const mensajes = [];

    if (cliente.trim().length < 3) {
      mensajes.push("El nombre del cliente debe tener al menos 3 caracteres.");
    }

    items.forEach((item, index) => {
      if (item.name.trim().length === 0) {
        mensajes.push(`El producto #${index + 1} debe tener un nombre.`);
      }
      if (item.productId === "" || Number.isNaN(Number(item.productId))) {
        mensajes.push(`El producto #${index + 1} debe tener un ID numérico.`);
      }
      if (Number(item.quantity) <= 0) {
        mensajes.push(`La cantidad del producto #${index + 1} debe ser mayor a 0.`);
      }
      if (Number(item.price) < 0) {
        mensajes.push(`El precio del producto #${index + 1} no puede ser negativo.`);
      }
    });

    if (!items.length) {
      mensajes.push("El pedido debe incluir al menos un producto.");
    }

    return mensajes;
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const mensajes = validar();
    if (mensajes.length) {
      setErrores(mensajes);
      return;
    }

    const nuevoPedido = {
      customer: cliente.trim(),
      status: estado,
      date: new Date(fecha),
      items: items.map((item) => ({
        productId: Number(item.productId),
        name: item.name.trim(),
        quantity: Number(item.quantity),
        price: Number(item.price)
      }))
    };

    onCreate(nuevoPedido);
    setErrores([]);
    setCliente("");
    setEstado(estados[0]);
    setFecha(new Date().toISOString().slice(0, 10));
    setItems([itemVacio()]);
  };

  return (
    <form className="formulario-pedido" onSubmit={manejarEnvio}>
      <h2>Nuevo pedido</h2>

      {errores.length > 0 && (
        <ul className="alerta-errores">
          {errores.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <label htmlFor="cliente">Cliente</label>
      <input
        id="cliente"
        type="text"
        value={cliente}
        onChange={(event) => setCliente(event.target.value)}
        placeholder="Nombre y apellido"
      />

      <label htmlFor="estado">Estado</label>
      <select id="estado" value={estado} onChange={(event) => setEstado(event.target.value)}>
        {estados.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      <label htmlFor="fecha">Fecha</label>
      <input
        id="fecha"
        type="date"
        value={fecha}
        onChange={(event) => setFecha(event.target.value)}
      />

      <fieldset className="items">
        <legend>Productos</legend>
        {items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="number"
              min="1"
              placeholder="ID"
              value={item.productId}
              onChange={(event) => actualizarItem(index, "productId", event.target.value)}
            />
            <input
              type="text"
              placeholder="Nombre"
              value={item.name}
              onChange={(event) => actualizarItem(index, "name", event.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Cantidad"
              value={item.quantity}
              onChange={(event) => actualizarItem(index, "quantity", event.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Precio"
              value={item.price}
              onChange={(event) => actualizarItem(index, "price", event.target.value)}
            />
            <button
              type="button"
              className="boton-eliminar"
              onClick={() => eliminarItem(index)}
              aria-label={`Eliminar producto ${index + 1}`}
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" className="boton-secundario" onClick={agregarItem}>
          Agregar producto
        </button>
      </fieldset>

      <button type="submit" className="boton-principal">
        Guardar pedido
      </button>
    </form>
  );
}

FormularioPedido.propTypes = {
  onCreate: PropTypes.func.isRequired
};
