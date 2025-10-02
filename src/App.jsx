import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CoolingSimulation = () => {
  // Constantes de enfriamiento para diferentes metales
  // Estos valores son aproximados y dependen de las condiciones específicas del experimento
  const metales = [
    { nombre: 'Aluminio', k: 0.15 },
    { nombre: 'Cobre', k: 0.18 },
    { nombre: 'Hierro', k: 0.10 },
    { nombre: 'Acero', k: 0.08 },
    { nombre: 'Plata', k: 0.20 },
    { nombre: 'Latón', k: 0.12 },
    { nombre: 'Bronce', k: 0.11 },
    { nombre: 'Plomo', k: 0.06 }
  ];
  
  // Función para calcular el tiempo real de enfriamiento
  // El tiempo depende de múltiples factores físicos:
  // - Masa y forma del metal
  // - Temperatura ambiente
  // - Convección (presencia de aire o ventilador)
  // - Conducción (superficie de apoyo)
  // Para esta simulación, usamos t = 5/k como tiempo para alcanzar ~99% de enfriamiento
  // Esto da tiempos más realistas (minutos u horas según el metal y condiciones)
  const calcularTiempoRealEnfriamiento = (k) => {
    return 5 / k;
  };
  
  // Estados para los parámetros iniciales de la ecuación diferencial
  const [tempInicial, setTempInicial] = useState(100);
  const [tempAmbiente, setTempAmbiente] = useState(25);
  const [metalSeleccionado, setMetalSeleccionado] = useState('Aluminio');
  const [constanteK, setConstanteK] = useState(0.15);
  const [tiempoTotal, setTiempoTotal] = useState(calcularTiempoRealEnfriamiento(0.15));
  const [duracionSimulacion, setDuracionSimulacion] = useState(10);
  
  // Estados para la simulación
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [data, setData] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Referencia para el intervalo de animación
  const animationRef = useRef(null);
  
  // Función que calcula la temperatura según la Ley de Enfriamiento de Newton
  // Solución analítica: T(t) = T_ambiente + (T_inicial - T_ambiente) * e^(-k*t)
  const calcularTemperatura = (t) => {
    return tempAmbiente + (tempInicial - tempAmbiente) * Math.exp(-constanteK * t);
  };
  
  // Función que genera los datos para la gráfica
  const generarDatos = () => {
    const puntos = [];
    const pasos = 100;
    for (let i = 0; i <= pasos; i++) {
      const t = (i / pasos) * tiempoTotal;
      puntos.push({
        tiempo: (t / 60).toFixed(2), // Convertir a minutos para mejor visualización
        temperatura: calcularTemperatura(t).toFixed(2)
      });
    }
    return puntos;
  };
  
  // Función que inicia la simulación
  const iniciarSimulacion = () => {
    setHasStarted(true);
    setData(generarDatos());
    setCurrentTime(0);
  };
  
  // Efecto para manejar la animación cuando está en play
  useEffect(() => {
    if (isRunning && hasStarted) {
      // Calcular incremento de tiempo real basado en la duración de la simulación
      const incremento = tiempoTotal / (duracionSimulacion * 60); // 60 FPS aproximadamente
      
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
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isRunning, hasStarted, tiempoTotal, duracionSimulacion]);
  
  // Calcular la temperatura actual
  const temperaturaActual = hasStarted ? calcularTemperatura(currentTime) : tempInicial;
  
  // Calcular color del metal basado en la temperatura
  const calcularColor = (temp) => {
    const normalizado = (temp - tempAmbiente) / (tempInicial - tempAmbiente);
    const r = Math.floor(255 * normalizado);
    const g = Math.floor(100 * (1 - normalizado));
    const b = Math.floor(100 * (1 - normalizado));
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  // Función para reiniciar la simulación
  const reiniciar = () => {
    setIsRunning(false);
    setCurrentTime(0);
    setHasStarted(false);
    setData([]);
  };
  
  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Simulador de Enfriamiento de Newton
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de controles iniciales */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Parámetros Iniciales</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">
                Temperatura Inicial del Metal (°C)
              </label>
              <input
                type="number"
                value={tempInicial}
                onChange={(e) => setTempInicial(parseFloat(e.target.value))}
                disabled={hasStarted}
                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">
                Temperatura Ambiente (°C)
              </label>
              <input
                type="number"
                value={tempAmbiente}
                onChange={(e) => setTempAmbiente(parseFloat(e.target.value))}
                disabled={hasStarted}
                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">
                Metal
              </label>
              <select
                value={metalSeleccionado}
                onChange={(e) => {
                  const metal = e.target.value;
                  setMetalSeleccionado(metal);
                  const metalInfo = metales.find(m => m.nombre === metal);
                  if (metalInfo) {
                    setConstanteK(metalInfo.k);
                    setTiempoTotal(calcularTiempoRealEnfriamiento(metalInfo.k));
                  }
                }}
                disabled={hasStarted}
                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
              >
                {metales.map(metal => (
                  <option key={metal.nombre} value={metal.nombre}>
                    {metal.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm mb-2">
                Constante de Enfriamiento k
              </label>
              <input
                type="text"
                value={constanteK}
                disabled
                className="w-full bg-gray-600 rounded px-3 py-2 text-gray-300 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">
                Tiempo Real de Enfriamiento
              </label>
              <input
                type="text"
                value={`${(tiempoTotal / 60).toFixed(2)} minutos`}
                disabled
                className="w-full bg-gray-600 rounded px-3 py-2 text-gray-300 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Calculado automáticamente según el metal (t = 5/k)
              </p>
            </div>
            
            <div>
              <label className="block text-sm mb-2">
                Duración de la Simulación (s)
              </label>
              <input
                type="number"
                value={duracionSimulacion}
                onChange={(e) => setDuracionSimulacion(parseFloat(e.target.value))}
                disabled={hasStarted}
                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
              />
              <p className="text-xs text-gray-400 mt-1">
                Tiempo que tarda en ejecutarse la animación
              </p>
            </div>
            
            <button
              onClick={iniciarSimulacion}
              disabled={hasStarted}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded px-4 py-2 font-semibold transition-colors"
            >
              Iniciar Simulación
            </button>
          </div>
        </div>
        
        {/* Panel de visualización en tiempo real */}
        <div className="lg:col-span-2 space-y-6">
          {/* Valores actuales */}
          {hasStarted && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Valores Actuales</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded p-3">
                  <div className="text-sm text-gray-400">Tiempo Real</div>
                  <div className="text-2xl font-bold">{(currentTime / 60).toFixed(2)} min</div>
                </div>
                <div className="bg-gray-700 rounded p-3">
                  <div className="text-sm text-gray-400">Temperatura</div>
                  <div className="text-2xl font-bold">{temperaturaActual.toFixed(2)} °C</div>
                </div>
                <div className="bg-gray-700 rounded p-3">
                  <div className="text-sm text-gray-400">T. Ambiente</div>
                  <div className="text-2xl font-bold">{tempAmbiente} °C</div>
                </div>
                <div className="bg-gray-700 rounded p-3">
                  <div className="text-sm text-gray-400">Metal</div>
                  <div className="text-2xl font-bold">{metalSeleccionado}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Gráfica */}
          {hasStarted && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Gráfica de Temperatura vs Tiempo</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="tiempo" 
                    stroke="#9CA3AF"
                    label={{ value: 'Tiempo (minutos)', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperatura" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                    name="Temperatura (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {/* Representación visual del metal */}
          {hasStarted && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Visualización del Metal</h2>
              <div className="flex justify-center items-center mb-6">
                <div 
                  className="w-64 h-64 rounded-lg shadow-2xl transition-colors duration-300"
                  style={{ 
                    backgroundColor: calcularColor(temperaturaActual),
                    boxShadow: `0 0 40px ${calcularColor(temperaturaActual)}`
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {temperaturaActual.toFixed(1)}°C
                      </div>
                      <div className="text-sm mt-2 opacity-75">
                        Metal en enfriamiento
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Barra de tiempo */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Control de Tiempo: {(currentTime / 60).toFixed(2)} minutos
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={tiempoTotal}
                    step={tiempoTotal / 1000}
                    value={currentTime}
                    onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                {/* Botones de control */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="flex-1 bg-green-600 hover:bg-green-700 rounded px-4 py-3 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {isRunning ? 'Pausar' : 'Play'}
                  </button>
                  
                  <button
                    onClick={reiniciar}
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded px-4 py-3 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Ecuación diferencial */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Ecuación Diferencial</h2>
        <div className="text-center">
          <p className="text-lg font-mono">
            dT/dt = -k(T - T<sub>ambiente</sub>)
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Solución: T(t) = T<sub>ambiente</sub> + (T<sub>inicial</sub> - T<sub>ambiente</sub>) · e<sup>-kt</sup>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoolingSimulation;