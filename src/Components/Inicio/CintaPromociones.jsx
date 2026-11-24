import React from "react";

const CintaPromociones = () => {
  const mensajes = [
    "3 CUOTAS SIN INTERÉS CON TODAS LAS TARJETAS",
    "6 CUOTAS SIN INTERÉS CON BANCO GALICIA",
    "10% OFF ABONANDO CON TRANSFERENCIA BANCARIA",
    "ENVÍOS A TODO EL PAÍS EN 24/48 HS",
  ];

  // Duplicamos el array para lograr el loop infinito continuo
  const itemsDuplicados = [...mensajes, ...mensajes];

  return (
    <div className="marquee-contenedor my-3">
      <div className="marquee-contenido">
        {itemsDuplicados.map((texto, index) => (
          <div key={index} className="d-flex align-items-center">
            <span className="marquee-item">{texto}</span>
            <span className="marquee-punto"></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CintaPromociones;