# Sistema de gestión de pedidos

Aplicación web creada con React y Vite para administrar los pedidos de MailAméricas. El panel permite ver los pedidos existentes, filtrarlos por estado y crear nuevos registros respetando las validaciones de `PropTypes` y las reglas de negocio.

## Estructura de carpetas

```
src/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── componentes/
│   ├── estadisticas/EstadisticasPedidos.jsx
│   ├── estadisticas/EstadisticasPedidos.css
│   ├── filtros/FiltroPedidos.jsx
│   ├── filtros/FiltroPedidos.css
│   ├── formularios/FormularioPedido.jsx
│   ├── formularios/FormularioPedido.css
│   ├── listas/ItemPedido.jsx
│   ├── listas/ItemPedido.css
│   ├── listas/ListaPedidos.jsx
│   └── listas/ListaPedidos.css
├── datos/pedidosIniciales.js
└── vistas/
    ├── PanelPrincipal.jsx
    └── PanelPrincipal.css
```

La estructura replica el enfoque modular del TP de referencia y agrupa los componentes según su responsabilidad.

## Scripts disponibles

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run build`: compila la aplicación para producción.
- `npm run preview`: sirve la compilación generada.

## Cómo funcionan PropTypes

`PropTypes` es la librería oficial de React para validar las propiedades que reciben los componentes. Cada componente declara su contrato de props indicando el tipo esperado, si son obligatorias y reglas personalizadas. Durante el desarrollo, React mostrará advertencias en la consola si un componente recibe datos que no cumplen con esas reglas. En este proyecto se emplean varias estrategias:

- Tipos básicos como `PropTypes.number` o `PropTypes.string` para validar identificadores y textos.
- Enumeraciones con `PropTypes.oneOf([...])` para restringir el estado del pedido a `pending`, `shipped` o `delivered`.
- Validaciones personalizadas para campos que requieren reglas extra, como la cantidad mayor a cero o el nombre del cliente con un mínimo de caracteres.
- `PropTypes.instanceOf(Date)` para asegurarnos de que las fechas se manejen como objetos `Date`.

Estas validaciones facilitan el mantenimiento, documentan el uso correcto de cada componente y previenen errores al reutilizar la interfaz.
