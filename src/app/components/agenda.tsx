"use client";

import { useEffect, useState } from "react";

interface Evento {
  fecha: string;
  fecha_fin?: string;
  evento: string;
}

export default function Agenda() {
  const [eventosVisibles, setVisibles] = useState<Evento[]>([]);
  const [eventosFuturos, setFuturos] = useState<Evento[]>([]);
  const [mostrarFuturos, setMostrarFuturos] = useState(false);

  useEffect(() => {
    fetch("/api/agenda")
      .then((res) => res.json())
      .then((data: Evento[]) => {
        const hoy = new Date();
        const limite = new Date();
        limite.setMonth(hoy.getMonth() + 2);

        const parseLocalDate = (f: string) => {
          const [y, m, d] = f.split("-").map(Number);
          return new Date(y, m - 1, d);
        };

        const visibles = data.filter((e) => parseLocalDate(e.fecha) <= limite);
        const futuros = data.filter((e) => parseLocalDate(e.fecha) > limite);

        setVisibles(visibles);
        setFuturos(futuros);
      })
      .catch(console.error);
  }, []);

  const formatFecha = (f: string) => {
    const [y, m, d] = f.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
    });
  };

  const renderEvento = (item: Evento, i: number) => {
    const inicio = formatFecha(item.fecha);
    const fin =
      item.fecha_fin && item.fecha_fin !== item.fecha
        ? ` - ${formatFecha(item.fecha_fin)}`
        : "";
    return (
      <li key={i}>
        <strong>{inicio + fin}</strong> — {item.evento}
      </li>
    );
  };

  return (
    <>
      <ul id="agenda-list">
        {(mostrarFuturos
          ? [...eventosVisibles, ...eventosFuturos]
          : eventosVisibles
        ).map(renderEvento)}
      </ul>
      {eventosFuturos.length > 0 && (
        <div className="agenda-buttons">
          {!mostrarFuturos ? (
            <button onClick={() => setMostrarFuturos(true)} id="mostrar-mas">
              +
            </button>
          ) : (
            <button onClick={() => setMostrarFuturos(false)} id="mostrar-menos">
              -
            </button>
          )}
        </div>
      )}
    </>
  );
}