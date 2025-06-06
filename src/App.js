import React, { useState } from "react";
import "./App.css";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, BarElement, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
Chart.register(BarElement, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function App() {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({ nombre: "", correo: "", meta: "" });

  // Datos de ejemplo para los gráficos
  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        label: "Ingresos",
        data: [3500000, 4000000, 3200000, 3700000],
        backgroundColor: "#4f8cff",
      },
      {
        label: "Gastos",
        data: [1800000, 2100000, 1700000, 2000000],
        backgroundColor: "#ffb347",
      },
    ],
  };

  const doughnutData = {
    labels: ["Facturas", "Gastos", "Ahorro", "Deudas"],
    datasets: [
      {
        data: [42, 26, 19, 13],
        backgroundColor: ["#4f8cff", "#ffb347", "#a3e635", "#f87171"],
      },
    ],
  };

  const lineData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Presupuesto",
        data: [2000000, 2200000, 2100000, 2500000, 2300000, 2400000, 2600000],
        borderColor: "#4f8cff",
        backgroundColor: "rgba(79,140,255,0.1)",
        tension: 0.4,
      },
      {
        label: "Real",
        data: [1800000, 2100000, 1700000, 2000000, 2200000, 2100000, 2500000],
        borderColor: "#ffb347",
        backgroundColor: "rgba(255,179,71,0.1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="finzas-dashboard">
      {step === 0 && (
        <div className="welcome-hero">
          <div className="hero-box">
            <h1>Finzas</h1>
            <h2>¡Haz tus sueños realidad!</h2>
            <p className="sub">
              Organiza, ahorra y cumple tus metas financieras con una app visual, moderna y familiar.
            </p>
            <button className="btn-hero" onClick={() => setStep(1)}>
              Empieza ahora
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="registro-box">
          <h2>Registro</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              setStep(2);
            }}
          >
            <input
              type="text"
              placeholder="Nombre"
              value={user.nombre}
              onChange={e => setUser({ ...user, nombre: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Correo"
              value={user.correo}
              onChange={e => setUser({ ...user, correo: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="¿Cuál es tu meta principal?"
              value={user.meta}
              onChange={e => setUser({ ...user, meta: e.target.value })}
              required
            />
            <button className="btn-hero" type="submit">
              Ir al dashboard
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="dashboard-main">
          <aside className="sidebar">
            <h3>PRESUPUESTO<br />MENSUAL</h3>
            <nav>
              <a href="#">Resumen</a>
              <a href="#">Ahorro</a>
              <a href="#">Gastos</a>
              <a href="#">Deudas</a>
              <a href="#">Configuración</a>
            </nav>
            <div className="sidebar-footer">
              <span>Finzas</span>
            </div>
          </aside>
          <main className="dashboard-content">
            <header className="dashboard-header">
              <div>
                <h2>¡Hola, {user.nombre}!</h2>
                <span className="meta-dash">Meta: {user.meta}</span>
              </div>
              <div className="mes-box">Enero</div>
            </header>
            <section className="dashboard-cards">
              <div className="card-resumen">
                <span>Ingresos Totales</span>
                <b>$4,950,000</b>
              </div>
              <div className="card-resumen">
                <span>Gastos Totales</span>
                <b>$1,891,000</b>
              </div>
              <div className="card-resumen saldo">
                <span>Saldo</span>
                <b>$3,059,000</b>
              </div>
            </section>
            <section className="dashboard-graphs">
              <div className="graph-box">
                <Bar data={barData} options={{ plugins: { legend: { position: "bottom" } } }} />
              </div>
              <div className="graph-box">
                <Doughnut data={doughnutData} options={{ plugins: { legend: { position: "bottom" } } }} />
              </div>
              <div className="graph-box">
                <Line data={lineData} options={{ plugins: { legend: { position: "bottom" } } }} />
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;