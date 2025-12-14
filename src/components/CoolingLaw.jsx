import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CoolingLaw = () => {
  // Constantes de enfriamiento para diferentes metales
  const metales = [
    { nombre: 'Aluminio', k: 0.15, color: '#9CA3AF' },
    { nombre: 'Cobre', k: 0.18, color: '#F87171' },
    { nombre: 'Hierro', k: 0.10, color: '#6B7280' },
    { nombre: 'Acero', k: 0.08, color: '#94A3B8' },
    { nombre: 'Plata', k: 0.20, color: '#E5E7EB' },
    { nombre: 'Latón', k: 0.12, color: '#FCD34D' },
    { nombre: 'Bronce', k: 0.11, color: '#D97706' },
    { nombre: 'Plomo', k: 0.06, color: '#4B5563' }
  ];

  // Función para calcular el tiempo real de enfriamiento
  const calcularTiempoRealEnfriamiento = (k) => {
    return 5 / k;
  };

  // Estados para los parámetros iniciales
  const [tempInicial, setTempInicial] = useState(100);
  const [tempAmbiente, setTempAmbiente] = useState(25);
  const [metalSeleccionado, setMetalSeleccionado] = useState(metales[0]);
  const [constanteK, setConstanteK] = useState(0.15);
  const [tiempoTotal, setTiempoTotal] = useState(calcularTiempoRealEnfriamiento(0.15));
  const [duracionSimulacion, setDuracionSimulacion] = useState(10);

  // Estados para la simulación
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [data, setData] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  const animationRef = useRef(null);

  // Solución analítica: T(t) = T_ambiente + (T_inicial - T_ambiente) * e^(-k*t)
  const calcularTemperatura = (t) => {
    return tempAmbiente + (tempInicial - tempAmbiente) * Math.exp(-constanteK * t);
  };

  const generarDatos = () => {
    const puntos = [];
    const pasos = 100;
    for (let i = 0; i <= pasos; i++) {
      const t = (i / pasos) * tiempoTotal;
      puntos.push({
        tiempo: (t / 60).toFixed(2),
        temperatura: calcularTemperatura(t).toFixed(2)
      });
    }
    return puntos;
  };

  const iniciarSimulacion = () => {
    setHasStarted(true);
    setData(generarDatos());
    setCurrentTime(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning && hasStarted) {
      const incremento = tiempoTotal / (duracionSimulacion * 60);

      animationRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const nuevoTiempo = prev + incremento;
          if (nuevoTiempo >= tiempoTotal) {
            setIsRunning(false);
            return tiempoTotal;
          }
          return nuevoTiempo;
        });
      }, 1000 / 60);
    } else {
      if (animationRef.current) clearInterval(animationRef.current);
    }

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [isRunning, hasStarted, tiempoTotal, duracionSimulacion]);

  const temperaturaActual = hasStarted ? calcularTemperatura(currentTime) : tempInicial;

  // Calcular color del metal (interpolación entre rojo caliente y color del metal)
  const calcularColorVisual = (temp) => {
    const ratio = Math.max(0, Math.min(1, (temp - tempAmbiente) / (100 - tempAmbiente)));
    // De rojo brillante (caliente) a color base del metal (frío)
    // Rojo: 255, 50, 50
    const hotR = 255, hotG = 60, hotB = 60;

    // Parsear color base del metal (muy simplificado, asumiendo grises/azules para la mayoría)
    // Usaremos valores fijos para "frío" por simplicidad de la demo visual
    const coldR = 100, coldG = 116, coldB = 139; // slate-500

    const r = Math.round(coldR + (hotR - coldR) * ratio);
    const g = Math.round(coldG + (hotG - coldG) * ratio);
    const b = Math.round(coldB + (hotB - coldB) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const reiniciar = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setHasStarted(false);
    setData([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-medium backdrop-blur-md">
            <Thermometer size={14} className="mr-2 animate-pulse" />
            MODELO DETERMINISTA
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ley de Enfriamiento de Newton
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Analiza la transferencia de calor entre un cuerpo y su entorno.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Panel de controles */}
          <div className="lg:col-span-4 h-fit">
            <div className="glass-card rounded-3xl p-6 lg:p-8 space-y-8 sticky top-24">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                Parámetros
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">T. Inicial (°C)</label>
                    <input
                      type="number"
                      value={tempInicial}
                      onChange={(e) => setTempInicial(parseFloat(e.target.value))}
                      disabled={hasStarted}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">T. Ambiente (°C)</label>
                    <input
                      type="number"
                      value={tempAmbiente}
                      onChange={(e) => setTempAmbiente(parseFloat(e.target.value))}
                      disabled={hasStarted}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Material</label>
                  <select
                    value={metalSeleccionado.nombre}
                    onChange={(e) => {
                      const metal = metales.find(m => m.nombre === e.target.value);
                      setMetalSeleccionado(metal);
                      setConstanteK(metal.k);
                      setTiempoTotal(calcularTiempoRealEnfriamiento(metal.k));
                      reiniciar();
                    }}
                    disabled={hasStarted}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 cursor-pointer hover:bg-gray-700/50"
                  >
                    {metales.map(metal => (
                      <option key={metal.nombre} value={metal.nombre}>
                        {metal.nombre} (k ≈ {metal.k})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Duración Animación (s)</label>
                  <input
                    type="number"
                    value={duracionSimulacion}
                    onChange={(e) => setDuracionSimulacion(parseFloat(e.target.value))}
                    disabled={hasStarted}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  onClick={iniciarSimulacion}
                  disabled={hasStarted}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl px-6 py-4 font-bold text-lg shadow-lg shadow-blue-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Iniciar Experimento
                </button>
              </div>
            </div>
          </div>

          {/* Panel de visualización */}
          <div className="lg:col-span-8 space-y-6">
            {hasStarted ? (
              <div className="space-y-6 animate-fade-in">
                {/* Tarjetas de Estado */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tiempo</div>
                    <div className="text-xl font-bold">{(currentTime / 60).toFixed(2)}m</div>
                  </div>
                  <div className="glass-card rounded-2xl p-4 text-center border border-blue-500/30 bg-blue-500/5">
                    <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Temperatura</div>
                    <div className="text-2xl font-bold text-blue-300">{temperaturaActual.toFixed(1)} °C</div>
                  </div>
                  <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ambiente</div>
                    <div className="text-xl font-bold">{tempAmbiente} °C</div>
                  </div>
                  <div className="glass-card rounded-2xl p-4 text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Constante k</div>
                    <div className="text-xl font-bold">{constanteK}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gráfica */}
                  <div className="glass-card rounded-3xl p-6 h-[350px] flex flex-col">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      Curva de Enfriamiento
                    </h3>
                    <div className="flex-1 w-full text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                          <XAxis
                            dataKey="tiempo"
                            stroke="#9CA3AF"
                            label={{ value: 'min', position: 'insideBottomRight', offset: -5, fill: '#9CA3AF' }}
                            tick={{ fill: '#9CA3AF' }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            label={{ value: '°C', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                            tick={{ fill: '#9CA3AF' }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                            labelStyle={{ color: '#9CA3AF' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="temperatura"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Visualización Visual */}
                  <div className="glass-card rounded-3xl p-6 h-[350px] flex flex-col items-center justify-center relative">
                    <div className="absolute top-6 left-6 z-10 text-left">
                      <h3 className="text-lg font-bold">Simulación Térmica</h3>
                      <p className="text-xs text-gray-400">Representación visual del calor</p>
                    </div>

                    <div
                      className="w-48 h-48 rounded-2xl shadow-2xl transition-all duration-300 flex items-center justify-center relative group"
                      style={{
                        backgroundColor: calcularColorVisual(temperaturaActual),
                        boxShadow: `0 0 ${Math.max(10, (temperaturaActual - tempAmbiente) * 1.5)}px ${calcularColorVisual(temperaturaActual)}`
                      }}
                    >
                      <div className="absolute inset-0 bg-black/10 rounded-2xl backdrop-blur-[1px]"></div>
                      <div className="z-10 text-center">
                        <span className="text-4xl font-bold text-white drop-shadow-md">
                          {temperaturaActual.toFixed(0)}°
                        </span>
                        <div className="text-xs text-white/80 font-medium uppercase tracking-widest mt-1">
                          {metalSeleccionado.nombre}
                        </div>
                      </div>

                      {/* Efecto de humo/calor (simulado con CSS) */}
                      {(temperaturaActual - tempAmbiente) > 10 && (
                        <div className="absolute -top-10 w-full h-20 bg-gradient-to-t from-white/10 to-transparent blur-xl opacity-50 animate-pulse rounded-t-full"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controles de Reproducción */}
                <div className="glass-card rounded-2xl p-4 flex gap-4 justify-center">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isRunning
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                  >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {isRunning ? 'Pausar' : 'Continuar'}
                  </button>

                  <button
                    onClick={reiniciar}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <RotateCcw size={20} />
                    Reiniciar
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-700">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <Thermometer size={40} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Laboratorio Listo</h3>
                <p className="text-gray-500 max-w-md">
                  Selecciona un metal y las condiciones iniciales para visualizar la ley de enfriamiento en tiempo real.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Footer Teórico */}
        <div className="glass-card rounded-3xl p-8 mt-12 mb-12 border-t-4 border-blue-500">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Fundamento Matemático</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                La rapidez con la que cambia la temperatura de un objeto es proporcional a la diferencia entre su temperatura y la del medio ambiente.
              </p>

              <div className="flex gap-4">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-white/5 text-center flex-1">
                  <div className="text-xs text-blue-400 font-mono mb-2">EDO</div>
                  <div className="font-serif italic text-xl">dT/dt = -k(T - Tₐ)</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-white/5 text-center flex-1">
                  <div className="text-xs text-green-400 font-mono mb-2">SOLUCIÓN</div>
                  <div className="font-serif italic text-xl">T(t) = Tₐ + (T₀ - Tₐ)e⁻ᵏᵗ</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "k", desc: "Constante de proporcionalidad (depende del material)" },
                { label: "T", desc: "Temperatura del cuerpo en el tiempo t" },
                { label: "Tₐ", desc: "Temperatura ambiente (constante)" },
                { label: "T₀", desc: "Temperatura inicial del cuerpo" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="bg-blue-500/20 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg font-bold font-serif shadow-sm">{item.label}</span>
                  <span className="text-sm text-gray-400 mt-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoolingLaw;
