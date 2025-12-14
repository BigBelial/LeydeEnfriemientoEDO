import React from 'react';
import { ArrowRight, Thermometer, Atom, TrendingUp, Activity, Globe, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-purple-900/20 to-gray-900 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
                    <div className="text-center max-w-4xl mx-auto animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-medium mb-8 backdrop-blur-md">
                            <Activity size={14} className="mr-2 animate-pulse" />
                            PROYECTO FINAL • ECUACIONES DIFERENCIALES
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
                            El Lenguaje del <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                                Cambio
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                            Explora cómo las matemáticas modelan la realidad. Desde el enfriamiento de la materia hasta la desintegración atómica.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link to="/cooling" className="group relative px-8 py-4 bg-blue-600 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12" />
                                <span className="relative flex items-center gap-2">
                                    <Thermometer className="group-hover:rotate-12 transition-transform" />
                                    Ley de Enfriamiento
                                </span>
                            </Link>
                            <Link to="/decay" className="group relative px-8 py-4 bg-gray-800 rounded-2xl font-bold text-lg border border-white/10 overflow-hidden transition-all hover:scale-105 hover:bg-gray-750 hover:border-purple-500/30">
                                <span className="relative flex items-center gap-2 text-gray-200 group-hover:text-purple-400 transition-colors">
                                    <Atom className="group-hover:spin-slow" />
                                    Decaimiento Radiactivo
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="py-24 bg-gray-900 relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                ¿Qué es una <span className="text-blue-400">Ecuación Diferencial?</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-loose">
                                Una ecuación diferencial es el puente entre las matemáticas y el mundo físico. Relaciona una función con sus derivadas, describiendo cómo cambian las cosas.
                            </p>
                            <p className="text-gray-400 text-lg leading-loose border-l-4 border-purple-500 pl-6 italic">
                                "La naturaleza no da saltos, todo fluye de manera continua y predecible bajo el lente del cálculo."
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {[
                                { icon: TrendingUp, color: "text-green-400", title: "Crecimiento", desc: "Economía y Población" },
                                { icon: Globe, color: "text-blue-400", title: "Clima", desc: "Modelos Predictivos" },
                                { icon: Clock, color: "text-orange-400", title: "Tiempo", desc: "Sistemas Dinámicos", delay: "translate-y-8" },
                                { icon: Activity, color: "text-red-400", title: "Medicina", desc: "Propagación Viral", delay: "translate-y-8" }
                            ].map((item, idx) => (
                                <div key={idx} className={`glass-card p-6 rounded-3xl hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-2 ${item.delay || ''}`}>
                                    <item.icon className={`${item.color} mb-4`} size={32} />
                                    <h3 className="font-bold text-xl mb-2 text-gray-200">{item.title}</h3>
                                    <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulations Preview */}
            <div className="py-24 bg-gray-900 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Simulaciones Interactivas</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Experimenta con modelos matemáticos en tiempo real. Visualiza los conceptos abstractos cobrando vida.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Cooling Law Card */}
                        <div className="group relative bg-gray-800/40 rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 hover:bg-gray-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            <div className="relative h-full bg-gray-900/90 rounded-[2.3rem] p-10 flex flex-col items-start border border-white/5 group-hover:border-blue-500/30 transition-colors">
                                <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <Thermometer size={32} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Enfriamiento de Newton</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                                    La tasa de pérdida de calor es proporcional a la diferencia de temperatura. Fundamental en termodinámica.
                                </p>
                                <div className="w-full pt-8 border-t border-white/5">
                                    <Link to="/cooling" className="flex items-center justify-between text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                                        Explorar Modelo <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Radioactive Decay Card */}
                        <div className="group relative bg-gray-800/40 rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 hover:bg-gray-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            <div className="relative h-full bg-gray-900/90 rounded-[2.3rem] p-10 flex flex-col items-start border border-white/5 group-hover:border-purple-500/30 transition-colors">
                                <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                    <Atom size={32} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Decaimiento Radiactivo</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
                                    Un proceso estocástico donde un núcleo inestable pierde energía. La base de la datación por carbono y la energía nuclear.
                                </p>
                                <div className="w-full pt-8 border-t border-white/5">
                                    <Link to="/decay" className="flex items-center justify-between text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                                        Explorar Modelo <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <BookOpen className="text-gray-600" />
                        <span className="text-gray-500 font-medium">Juan José Ospina</span>
                    </div>
                    <p className="text-gray-600 text-sm">© 2025 Universidad del Valle.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
