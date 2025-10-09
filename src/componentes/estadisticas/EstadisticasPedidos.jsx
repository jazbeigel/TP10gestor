import PropTypes from "prop-types";
import "./EstadisticasPedidos.css";

export function EstadisticasPedidos({ total, pending, shipped, delivered }) {
  return (
    <section className="estadisticas">
      <div className="estadistica">
        <h4>Total</h4>
        <p>{total}</p>
      </div>
      <div className="estadistica">
        <h4>Pendientes</h4>
        <p>{pending}</p>
      </div>
      <div className="estadistica">
        <h4>Enviados</h4>
        <p>{shipped}</p>
      </div>
      <div className="estadistica">
        <h4>Entregados</h4>
        <p>{delivered}</p>
      </div>
    </section>
  );
}

EstadisticasPedidos.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired
};
