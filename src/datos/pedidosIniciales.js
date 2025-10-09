export const pedidosIniciales = [
  {
    id: 1,
    customer: "Laura Fernández",
    date: new Date("2024-05-14"),
    status: "pending",
    items: [
      { productId: 10, name: "Auriculares inalámbricos", quantity: 1, price: 189.99 },
      { productId: 11, name: "Funda para notebook", quantity: 2, price: 35.5 }
    ]
  },
  {
    id: 2,
    customer: "Miguel Pérez",
    date: new Date("2024-05-10"),
    status: "shipped",
    items: [
      { productId: 15, name: "Teclado mecánico", quantity: 1, price: 120.0 }
    ]
  },
  {
    id: 3,
    customer: "Carolina Soto",
    date: new Date("2024-04-28"),
    status: "delivered",
    items: [
      { productId: 21, name: "Monitor 24\"", quantity: 2, price: 210.75 },
      { productId: 22, name: "Cable HDMI", quantity: 3, price: 15.99 }
    ]
  }
];
