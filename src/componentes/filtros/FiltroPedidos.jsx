import PropTypes from "prop-types";
import "./FiltroPedidos.css";

const opciones = [
  { value: "pending", label: "Pendientes" },
  { value: "shipped", label: "Enviados" },
  { value: "delivered", label: "Entregados" }
];

export function FiltroPedidos({ filter, onChange }) {
  return (
    <div className="filtro-pedidos">
      <label htmlFor="estado">Estado</label>
      <select
        id="estado"
        value={filter}
        onChange={(event) => onChange(event.target.value)}
      >
        {opciones.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </div>
  );
}

FiltroPedidos.propTypes = {
  filter: PropTypes.oneOf(["pending", "shipped", "delivered"]).isRequired,
  onChange: PropTypes.func.isRequired
};
