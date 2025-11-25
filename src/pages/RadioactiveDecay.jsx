import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Atom } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RadioactiveDecay = () => {
    // Isótopos y sus vidas medias (en años, días, etc.)
    // Para simplificar la visualización, normalizaremos el tiempo en la gráfica
    const isotopos = [
        { nombre: 'Carbono-14', vidaMedia: 5730, unidad: 'años', uso: 'Datación arqueológica' },
        { nombre: 'Uranio-238', vidaMedia: 4468000000, unidad: 'años', uso: 'Datación geológica' },
        { nombre: 'Yodo-131', vidaMedia: 8.02, unidad: 'días', uso: 'Medicina nuclear' },
        { nombre: 'Radón-222', vidaMedia: 3.82, unidad: 'días', uso: 'Riesgo ambiental' },
        { nombre: 'Cesio-137', vidaMedia: 30.17, unidad: 'años', uso: 'Radioterapia' }
    ];

    const [isotopoSeleccionado, setIsotopoSeleccionado] = useState(isotopos[0]);
    const [cantidadInicial, setCantidadInicial] = useState(100); // Porcentaje o cantidad absoluta
    const [tiempoActual, setTiempoActual] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [data, setData] = useState([]);
    const [hasStarted, setHasStarted] = useState(false);

    // Duración de la simulación en "vidas medias" para la visualización
    const vidasMediasSimulacion = 5;
    const [duracionAnimacion, setDuracionAnimacion] = useState(10); // Segundos reales que dura la animación

    const animationRef = useRef(null);

    // Constante de decaimiento lambda = ln(2) / vida_media
    const lambda = Math.log(2) / isotopoSeleccionado.vidaMedia;

    // Función N(t) = N0 * e^(-lambda * t)
    const calcularCantidadRestante = (t) => {
        return cantidadInicial * Math.exp(-lambda * t);
    };

    const generarDatos = () => {
        const puntos = [];
        const pasos = 100;
        const tiempoTotal = isotopoSeleccionado.vidaMedia * vidasMediasSimulacion;

        for (let i = 0; i <= pasos; i++) {
            const t = (i / pasos) * tiempoTotal;
            puntos.push({
                tiempo: t.toFixed(2),
                cantidad: calcularCantidadRestante(t).toFixed(2)
            });
        }
        return puntos;
    };

    const iniciarSimulacion = () => {
        setHasStarted(true);
        setData(generarDatos());
        setTiempoActual(0);
        setIsRunning(true);
    };

    const reiniciar = () => {
        setIsRunning(false);
        setTiempoActual(0);
        setHasStarted(false);
        setData([]);
    };

    useEffect(() => {
        if (isRunning && hasStarted) {
            const tiempoTotalSimulacion = isotopoSeleccionado.vidaMedia * vidasMediasSimulacion;
            const incremento = tiempoTotalSimulacion / (duracionAnimacion * 60);

            animationRef.current = setInterval(() => {
                setTiempoActual(prev => {
                    const nuevoTiempo = prev + incremento;
                    if (nuevoTiempo >= tiempoTotalSimulacion) {
                        setIsRunning(false);
                        return tiempoTotalSimulacion;
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
    }, [isRunning, hasStarted, isotopoSeleccionado, duracionAnimacion]);

    const cantidadActual = hasStarted ? calcularCantidadRestante(tiempoActual) : cantidadInicial;

    // Visualización de átomos (puntos que desaparecen)
    const renderAtoms = () => {
        const totalAtoms = 100; // Representación visual fija
        const activeAtoms = Math.round((cantidadActual / cantidadInicial) * totalAtoms);

        return (
            <div className="grid grid-cols-10 gap-1 w-64 h-64 p-4 bg-gray-900 rounded-lg border border-gray-700">
                {[...Array(totalAtoms)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-4 h-4 rounded-full transition-all duration-500 ${i < activeAtoms
                                ? 'bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.5)] scale-100'
                                : 'bg-gray-800 scale-50 opacity-20'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-gray-900 text-white p-6 overflow-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Simulador de Decaimiento Radiactivo
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Controles */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Configuración</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm mb-2">Isótopo</label>
                            <select
                                value={isotopoSeleccionado.nombre}
                                onChange={(e) => {
                                    const nuevo = isotopos.find(i => i.nombre === e.target.value);
                                    setIsotopoSeleccionado(nuevo);
                                    reiniciar();
                                }}
                                disabled={hasStarted}
                                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
                            >
                                {isotopos.map(iso => (
                                    <option key={iso.nombre} value={iso.nombre}>
                                        {iso.nombre} ({iso.vidaMedia} {iso.unidad})
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-400 mt-1">{isotopoSeleccionado.uso}</p>
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Cantidad Inicial (N₀)</label>
                            <input
                                type="number"
                                value={cantidadInicial}
                                onChange={(e) => setCantidadInicial(parseFloat(e.target.value))}
                                disabled={hasStarted}
                                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Duración Animación (s)</label>
                            <input
                                type="number"
                                value={duracionAnimacion}
                                onChange={(e) => setDuracionAnimacion(parseFloat(e.target.value))}
                                disabled={hasStarted}
                                className="w-full bg-gray-700 rounded px-3 py-2 disabled:opacity-50"
                            />
                        </div>

                        <button
                            onClick={iniciarSimulacion}
                            disabled={hasStarted}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded px-4 py-2 font-semibold transition-colors"
                        >
                            Iniciar Simulación
                        </button>
                    </div>
                </div>

                {/* Visualización */}
                <div className="lg:col-span-2 space-y-6">
                    {hasStarted && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Estado Actual</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-700 rounded p-3">
                                    <div className="text-sm text-gray-400">Tiempo Transcurrido</div>
                                    <div className="text-xl font-bold">
                                        {tiempoActual.toFixed(2)} {isotopoSeleccionado.unidad}
                                    </div>
                                </div>
                                <div className="bg-gray-700 rounded p-3">
                                    <div className="text-sm text-gray-400">Cantidad Restante</div>
                                    <div className="text-xl font-bold text-purple-400">
                                        {cantidadActual.toFixed(2)} / {cantidadInicial}
                                    </div>
                                </div>
                                <div className="bg-gray-700 rounded p-3">
                                    <div className="text-sm text-gray-400">Vida Media</div>
                                    <div className="text-xl font-bold">
                                        {isotopoSeleccionado.vidaMedia} {isotopoSeleccionado.unidad}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                                <div className="flex-1 w-full">
                                    <h3 className="text-lg font-medium mb-2 text-center">Decaimiento Exponencial</h3>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                            <XAxis
                                                dataKey="tiempo"
                                                stroke="#9CA3AF"
                                                label={{ value: `Tiempo (${isotopoSeleccionado.unidad})`, position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                label={{ value: 'Cantidad', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                                                labelStyle={{ color: '#9CA3AF' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="cantidad"
                                                stroke="#A855F7"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h3 className="text-lg font-medium mb-2">Visualización Atómica</h3>
                                    {renderAtoms()}
                                    <p className="text-xs text-gray-400 mt-2">Cada punto representa un % de la muestra</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => setIsRunning(!isRunning)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 rounded px-4 py-3 font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                                    {isRunning ? 'Pausar' : 'Continuar'}
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
                    )}
                </div>
            </div>

            <div className="mt-6 bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Modelo Matemático</h2>
                <div className="text-center font-mono text-lg space-y-2">
                    <p>dN/dt = -λN</p>
                    <p>N(t) = N₀ · e<sup>-λt</sup></p>
                    <p className="text-sm text-gray-400 mt-2">
                        Donde λ = ln(2) / t<sub>1/2</sub> (constante de desintegración)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RadioactiveDecay;
