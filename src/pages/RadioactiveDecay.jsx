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
            <div className="grid grid-cols-10 gap-1 h-full w-auto aspect-square p-4 bg-gray-900/50 rounded-2xl border border-white/5 backdrop-blur-sm mx-auto">
                {[...Array(totalAtoms)].map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-500 ease-in-out ${i < activeAtoms
                            ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] scale-100'
                            : 'bg-gray-800 scale-50 opacity-20'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 pt-24 selection:bg-purple-500/30">
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-400 text-xs font-medium backdrop-blur-md">
                        <Atom size={14} className="mr-2 animate-spin-slow" />
                        MODELO ESTOCÁSTICO
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Decaimiento Radiactivo
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Simula cómo los núcleos inestables pierden energía a través del tiempo.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controles */}
                    <div className="lg:col-span-4 h-fit">
                        <div className="glass-card rounded-3xl p-6 lg:p-8 space-y-8 sticky top-24">
                            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-white/10 pb-4">
                                <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                                Configuración
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Isótopo</label>
                                    <div className="relative">
                                        <select
                                            value={isotopoSeleccionado.nombre}
                                            onChange={(e) => {
                                                const nuevo = isotopos.find(i => i.nombre === e.target.value);
                                                setIsotopoSeleccionado(nuevo);
                                                reiniciar();
                                            }}
                                            disabled={hasStarted}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-gray-700/50"
                                        >
                                            {isotopos.map(iso => (
                                                <option key={iso.nombre} value={iso.nombre}>
                                                    {iso.nombre} ({iso.vidaMedia} {iso.unidad})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="text-xs text-purple-400 mt-2 bg-purple-500/10 inline-block px-2 py-1 rounded-md">
                                        {isotopoSeleccionado.uso}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Cantidad (N₀)</label>
                                        <input
                                            type="number"
                                            value={cantidadInicial}
                                            onChange={(e) => setCantidadInicial(parseFloat(e.target.value))}
                                            disabled={hasStarted}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Duración (s)</label>
                                        <input
                                            type="number"
                                            value={duracionAnimacion}
                                            onChange={(e) => setDuracionAnimacion(parseFloat(e.target.value))}
                                            disabled={hasStarted}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={iniciarSimulacion}
                                    disabled={hasStarted}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl px-6 py-4 font-bold text-lg shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Iniciar Simulación
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Visualización */}
                    <div className="lg:col-span-8 space-y-6">
                        {hasStarted ? (
                            <div className="space-y-6 animate-fade-in">
                                {/* KPIs */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="glass-card rounded-2xl p-5 border-l-4 border-purple-500">
                                        <div className="text-sm text-gray-400 mb-1">Tiempo Transcurrido</div>
                                        <div className="text-2xl font-bold">
                                            {tiempoActual.toFixed(2)} <span className="text-sm font-normal text-gray-500">{isotopoSeleccionado.unidad}</span>
                                        </div>
                                    </div>
                                    <div className="glass-card rounded-2xl p-5 border-l-4 border-indigo-500">
                                        <div className="text-sm text-gray-400 mb-1">Cantidad Restante</div>
                                        <div className="text-2xl font-bold text-white">
                                            {cantidadActual.toFixed(2)} <span className="text-sm text-gray-500">/ {cantidadInicial}</span>
                                        </div>
                                    </div>
                                    <div className="glass-card rounded-2xl p-5 border-l-4 border-pink-500">
                                        <div className="text-sm text-gray-400 mb-1">Vida Media</div>
                                        <div className="text-2xl font-bold">
                                            {isotopoSeleccionado.vidaMedia} <span className="text-sm font-normal text-gray-500">{isotopoSeleccionado.unidad}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Gráfica */}
                                    <div className="glass-card rounded-3xl p-6 h-[400px] flex flex-col">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                            Decaimiento Exponencial
                                        </h3>
                                        <div className="flex-1 w-full text-xs">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                                    <XAxis
                                                        dataKey="tiempo"
                                                        stroke="#9CA3AF"
                                                        tick={{ fill: '#9CA3AF' }}
                                                        tickLine={false}
                                                        axisLine={false}
                                                    />
                                                    <YAxis
                                                        stroke="#9CA3AF"
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
                                                        dataKey="cantidad"
                                                        stroke="#A855F7"
                                                        strokeWidth={3}
                                                        dot={false}
                                                        activeDot={{ r: 6, fill: '#A855F7', stroke: '#fff', strokeWidth: 2 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Visualización Atómica */}
                                    <div className="glass-card rounded-3xl p-6 h-[400px] flex flex-col relative overflow-hidden">
                                        <div className="w-full z-10 mb-4">
                                            <h3 className="text-lg font-bold">Visualización Atómica</h3>
                                            <p className="text-xs text-gray-400">Representación estadística</p>
                                        </div>

                                        <div className="flex-1 w-full flex items-center justify-center relative">
                                            {renderAtoms()}
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
                                        {isRunning ? 'Pausar Simulación' : 'Continuar Simulación'}
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
                                    <Atom size={40} className="text-gray-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-300 mb-2">Simulación en Espera</h3>
                                <p className="text-gray-500 max-w-md">
                                    Configura los parámetros en el panel izquierdo y presiona "Iniciar Simulación" para comenzar el experimento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Teoría y Ecuaciones */}
                <div className="grid md:grid-cols-2 gap-8 mt-12 mb-12">
                    <div className="glass-card rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-6 text-purple-400">Modelo Matemático</h2>
                        <div className="space-y-6">
                            <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-white/5">
                                <p className="text-sm text-gray-400 mb-2 font-mono">Ecuación Diferencial</p>
                                <p className="text-2xl font-serif italic">
                                    dN/dt = -λN
                                </p>
                            </div>
                            <div className="bg-gray-800/50 rounded-xl p-6 text-center border border-white/5">
                                <p className="text-sm text-gray-400 mb-2 font-mono">Solución Analítica</p>
                                <p className="text-2xl font-serif italic">
                                    N(t) = N₀ · e<sup>-λt</sup>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="glass-card rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-6 text-purple-400">Conceptos Clave</h2>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                <span><strong className="text-white">Vida Media (t1/2):</strong> Tiempo necesario para que la mitad de los núcleos radiactivos se desintegren.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                <span><strong className="text-white">Constante λ:</strong> Probabilidad de desintegración por unidad de tiempo. Es inversamente proporcional a la vida media.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                <span><strong className="text-white">Estocasticidad:</strong> Aunque es imposible predecir cuándo se desintegrará un átomo específico, el comportamiento del grupo sigue una curva exponencial suave.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadioactiveDecay;
