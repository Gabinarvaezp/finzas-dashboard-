import React, { useState, useEffect } from "react";
import "./App.css";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, BarElement, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
Chart.register(BarElement, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MOTIVATIONALS = [
  "¡Sigue así, cada peso cuenta!",
  "Tu constancia te acerca a tus sueños.",
  "Ahorra hoy, disfruta mañana.",
  "¡Vas por buen camino!",
  "Pequeños ahorros, grandes logros.",
  "Organiza, ahorra y cumple tus metas.",
  "¡Tú puedes lograrlo!"
];
const SECTIONS = ["Resumen", "Ahorro", "Gastos", "Deudas", "Configuración"];

const INVESTMENT_OPTIONS = [
  {
    name: "CDT (Certificado de Depósito a Término)",
    info: "Inversión segura en bancos, rentabilidad fija y bajo riesgo. Ideal para quienes buscan estabilidad y no quieren arriesgar su capital." 
  },
  {
    name: "Fondos de inversión",
    info: "Diversifica tu dinero en varios activos. Riesgo y rentabilidad variable. Puedes elegir fondos conservadores o arriesgados según tu perfil." 
  },
  {
    name: "Criptomonedas",
    info: "Inversión digital de alto riesgo y alta volatilidad, potencial de grandes ganancias o pérdidas. Investiga bien antes de invertir." 
  },
  {
    name: "Educación",
    info: "Invierte en cursos, talleres o certificaciones para mejorar tus habilidades y aumentar tus ingresos futuros." 
  },
  {
    name: "Emprendimiento",
    info: "Usa tu ahorro para iniciar un pequeño negocio o proyecto personal. Puede ser muy gratificante y rentable a largo plazo." 
  },
  {
    name: "Acciones",
    info: "Compra participaciones en empresas. Riesgo y rentabilidad variable, ideal para largo plazo y quienes buscan crecimiento de capital." 
  }
];

function App() {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({ nombre: "", correo: "", meta: "" });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthlyData, setMonthlyData] = useState(() => {
    const saved = localStorage.getItem('finzas-monthly-data');
    return saved ? JSON.parse(saved) : Array(12).fill({ income: '', expenses: '' });
  });
  const [motivational, setMotivational] = useState("");
  const [activeSection, setActiveSection] = useState("Resumen");
  const [showInvestments, setShowInvestments] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  useEffect(() => {
    setMotivational(MOTIVATIONALS[Math.floor(Math.random() * MOTIVATIONALS.length)]);
  }, [step, selectedMonth]);

  useEffect(() => {
    localStorage.setItem('finzas-monthly-data', JSON.stringify(monthlyData));
  }, [monthlyData]);

  const handleIncomeChange = (e) => {
    const value = e.target.value;
    setMonthlyData(prev => prev.map((item, idx) => idx === selectedMonth ? { ...item, income: value } : item));
  };
  const handleExpensesChange = (e) => {
    const value = e.target.value;
    setMonthlyData(prev => prev.map((item, idx) => idx === selectedMonth ? { ...item, expenses: value } : item));
  };

  // Cambia el cálculo de ahorro mensual: 10% de los ingresos
  const ingreso = Number(monthlyData[selectedMonth].income) || 0;
  const gasto = Number(monthlyData[selectedMonth].expenses) || 0;
  const ahorroMensual = Math.round(ingreso * 0.10);

  // Datos de ejemplo para los gráficos (puedes adaptarlos a monthlyData si quieres)
  const barData = {
    labels: meses.slice(0, 4),
    datasets: [
      {
        label: "Ingresos",
        data: monthlyData.slice(0, 4).map(m => Number(m.income) || 0),
        backgroundColor: "#4f8cff",
      },
      {
        label: "Gastos",
        data: monthlyData.slice(0, 4).map(m => Number(m.expenses) || 0),
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

  // Contenido por sección
  function renderSection() {
    switch (activeSection) {
      case "Resumen":
        return (
          <>
            <section className="dashboard-cards">
              <div className="card-resumen">
                <span>Ingresos Totales</span>
                <input
                  type="number"
                  value={monthlyData[selectedMonth].income}
                  onChange={handleIncomeChange}
                  placeholder=""
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #e0e0e0', marginTop: '0.5rem' }}
                />
              </div>
              <div className="card-resumen">
                <span>Gastos Totales</span>
                <input
                  type="number"
                  value={monthlyData[selectedMonth].expenses}
                  onChange={handleExpensesChange}
                  placeholder=""
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #e0e0e0', marginTop: '0.5rem' }}
                />
              </div>
              <div className="card-resumen saldo">
                <span>Ahorro mensual (10% ingresos)</span>
                <b>${ahorroMensual.toLocaleString('es-CO')}</b>
              </div>
            </section>
            <div style={{ margin: '1.5rem 0', fontSize: '1.2rem', color: '#4f8cff', fontWeight: 'bold' }}>
              Para cumplir tu sueño, tu ahorro mensual es: ${ahorroMensual.toLocaleString('es-CO')}
              <div style={{ fontSize: '1rem', color: '#222', marginTop: '0.5rem' }}>{motivational}</div>
            </div>
            <div style={{ margin: '1.5rem 0' }}>
              <button
                style={{
                  background: '#ffb347',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.7rem 1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px #ffb34733',
                  marginBottom: '0.7rem'
                }}
                onClick={() => setShowInvestments(v => !v)}
              >
                ¿No sabes qué hacer con tu ahorro? Haz clic aquí para ver opciones de inversión
              </button>
              {showInvestments && (
                <div style={{ marginTop: '1rem', background: '#f7fafc', borderRadius: '12px', padding: '1rem', boxShadow: '0 2px 8px #4f8cff22' }}>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {INVESTMENT_OPTIONS.map((opt, idx) => (
                      <li key={opt.name} style={{ marginBottom: '0.7rem' }}>
                        <button
                          style={{
                            background: selectedInvestment === idx ? '#4f8cff' : '#eaf2ff',
                            color: selectedInvestment === idx ? '#fff' : '#222',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.5rem 1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left',
                            marginBottom: '0.2rem'
                          }}
                          onClick={() => setSelectedInvestment(idx)}
                        >
                          {opt.name}
                        </button>
                        {selectedInvestment === idx && (
                          <div style={{ background: '#fff', borderRadius: '8px', padding: '0.7rem 1rem', marginTop: '0.2rem', color: '#183153', fontSize: '0.98rem', boxShadow: '0 1px 4px #4f8cff11' }}>
                            {opt.info}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
          </>
        );
      case "Ahorro":
        return (
          <div style={{ margin: '2rem', fontSize: '1.2rem', color: '#4f8cff', fontWeight: 'bold' }}>
            <h2>Ahorro</h2>
            <p>Tu ahorro mensual actual es: <b>${ahorroMensual.toLocaleString('es-CO')}</b></p>
            <p>¡Sigue ahorrando para cumplir tu meta: {user.meta}!</p>
          </div>
        );
      case "Gastos":
        return (
          <div style={{ margin: '2rem', fontSize: '1.2rem', color: '#ffb347', fontWeight: 'bold' }}>
            <h2>Gastos</h2>
            <p>Gastos del mes de {meses[selectedMonth]}: <b>${gasto.toLocaleString('es-CO')}</b></p>
            <p>Revisa tus gastos y busca oportunidades para ahorrar más.</p>
          </div>
        );
      case "Deudas":
        return (
          <div style={{ margin: '2rem', fontSize: '1.2rem', color: '#f87171', fontWeight: 'bold' }}>
            <h2>Deudas</h2>
            <p>¿Tienes deudas este mes? ¡Organízalas y prioriza tu ahorro!</p>
          </div>
        );
      case "Configuración":
        return (
          <div style={{ margin: '2rem', fontSize: '1.2rem', color: '#183153', fontWeight: 'bold' }}>
            <h2>Configuración</h2>
            <p>Puedes personalizar tu experiencia aquí.</p>
          </div>
        );
      default:
        return null;
    }
  }

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
              {SECTIONS.map(section => (
                <button
                  key={section}
                  className={activeSection === section ? "sidebar-btn active" : "sidebar-btn"}
                  onClick={() => setActiveSection(section)}
                  style={{
                    background: activeSection === section ? '#4f8cff' : 'transparent',
                    color: activeSection === section ? '#fff' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1rem',
                    marginBottom: '0.5rem',
                    width: '100%',
                    fontWeight: activeSection === section ? 'bold' : 'normal',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                >
                  {section}
                </button>
              ))}
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
              <div className="mes-box">
                {meses.map((mes, idx) => (
                  <button
                    key={mes}
                    style={{
                      background: idx === selectedMonth ? '#4f8cff' : '#eaf2ff',
                      color: idx === selectedMonth ? '#fff' : '#222',
                      border: 'none',
                      borderRadius: '8px',
                      margin: '0 2px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontWeight: idx === selectedMonth ? 'bold' : 'normal'
                    }}
                    onClick={() => setSelectedMonth(idx)}
                  >
                    {mes}
                  </button>
                ))}
              </div>
            </header>
            {renderSection()}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;