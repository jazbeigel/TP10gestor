import { useMemo, useState } from "react";
import { pedidosIniciales } from "../datos/pedidosIniciales";
import { FiltroPedidos } from "../componentes/filtros/FiltroPedidos";
import { ListaPedidos } from "../componentes/listas/ListaPedidos";
import { EstadisticasPedidos } from "../componentes/estadisticas/EstadisticasPedidos";
import { FormularioPedido } from "../componentes/formularios/FormularioPedido";
import "./PanelPrincipal.css";

const estados = ["pending", "shipped", "delivered"];

const calcularSiguienteId = (pedidos) =>
  pedidos.reduce((maximo, pedido) => Math.max(maximo, pedido.id), 0) + 1;

export function PanelPrincipal() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [filtro, setFiltro] = useState(estados[0]);

  const pedidosFiltrados = useMemo(
    () => pedidos.filter((pedido) => pedido.status === filtro),
    [pedidos, filtro]
  );

  const estadisticas = useMemo(() => {
    const conteos = pedidos.reduce(
      (acumulador, pedido) => {
        acumulador[pedido.status] += 1;
        return acumulador;
      },
      { pending: 0, shipped: 0, delivered: 0 }
    );

    return {
      total: pedidos.length,
      ...conteos
    };
  }, [pedidos]);

  const manejarCreacion = (nuevoPedido) => {
    setPedidos((prev) => [
      ...prev,
      {
        ...nuevoPedido,
        id: calcularSiguienteId(prev),
        date: nuevoPedido.date instanceof Date ? nuevoPedido.date : new Date()
      }
    ]);
  };

  return (
    <div className="panel-principal">
      <header className="panel-encabezado">
        <div>
          <h1>Gestor de pedidos</h1>
          <p className="panel-descripcion">
            Visualiza el estado de los envíos y crea nuevos pedidos para MailAméricas.
          </p>
        </div>
        <EstadisticasPedidos {...estadisticas} />
      </header>

      <section className="panel-contenido">
        <div className="panel-listado">
          <div className="panel-controles">
            <h2>Pedidos</h2>
            <FiltroPedidos filter={filtro} onChange={setFiltro} />
          </div>
          <ListaPedidos orders={pedidosFiltrados} />
        </div>
        <FormularioPedido onCreate={manejarCreacion} />
      </section>
    </div>
  );
}
