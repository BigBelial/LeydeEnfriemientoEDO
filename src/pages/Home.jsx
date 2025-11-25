import React from 'react';
import { ArrowRight, Thermometer, Atom, TrendingUp, Activity, Globe, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 border-b border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
                            <Activity size={16} className="mr-2" />
                            Proyecto Final de Ecuaciones Diferenciales
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            El Lenguaje del <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                                Cambio Universal
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Descubre cómo las matemáticas describen la realidad, desde el enfriamiento de tu café hasta la desintegración de los átomos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/cooling" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50 flex items-center justify-center">
                                <Thermometer className="mr-2" />
                                Ley de Enfriamiento
                            </Link>
                            <Link to="/decay" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-900/50 flex items-center justify-center">
                                <Atom className="mr-2" />
                                Decaimiento Radiactivo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                ¿Qué es una Ecuación Diferencial?
                            </h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                Una ecuación diferencial es una ecuación matemática que relaciona una función con sus derivadas. En las aplicaciones, las funciones generalmente representan cantidades físicas, las derivadas representan sus tasas de cambio y la ecuación define la relación entre ellas.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Son fundamentales porque la descripción de la mayoría de los fenómenos naturales implica el cambio. Si quieres predecir el futuro de un sistema, necesitas ecuaciones diferenciales.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 transform translate-y-8">
                                <TrendingUp className="text-green-400 mb-4" size={32} />
                                <h3 className="font-bold text-xl mb-2">Crecimiento</h3>
                                <p className="text-gray-400 text-sm">Poblaciones, economía y bacterias.</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                                <Globe className="text-blue-400 mb-4" size={32} />
                                <h3 className="font-bold text-xl mb-2">Clima</h3>
                                <p className="text-gray-400 text-sm">Predicción meteorológica y cambio climático.</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 transform translate-y-8">
                                <Clock className="text-orange-400 mb-4" size={32} />
                                <h3 className="font-bold text-xl mb-2">Tiempo</h3>
                                <p className="text-gray-400 text-sm">Evolución dinámica de sistemas.</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                                <Activity className="text-red-400 mb-4" size={32} />
                                <h3 className="font-bold text-xl mb-2">Medicina</h3>
                                <p className="text-gray-400 text-sm">Propagación de enfermedades y dosis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulations Preview */}
            <div className="py-20 bg-gray-800/50 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Simulaciones</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Interactúa con modelos matemáticos reales para entender intuitivamente cómo funcionan estas leyes fundamentales.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Cooling Law Card */}
                        <div className="group relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-8 relative z-10">
                                <div className="bg-blue-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <Thermometer size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Ley de Enfriamiento de Newton</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Establece que la tasa de pérdida de calor de un cuerpo es proporcional a la diferencia de temperatura entre el cuerpo y sus alrededores.
                                </p>
                                <ul className="space-y-2 mb-8 text-gray-400 text-sm">
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />Ecuación: dT/dt = -k(T - Ta)</li>
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />Aplicación: Forense, Climatización</li>
                                </ul>
                                <Link to="/cooling" className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                                    Explorar Simulación <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Radioactive Decay Card */}
                        <div className="group relative bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-8 relative z-10">
                                <div className="bg-purple-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                    <Atom size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">Decaimiento Radiactivo</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Describe cómo un núcleo inestable pierde energía mediante la emisión de radiación. Es un proceso estocástico a nivel atómico pero predecible en masa.
                                </p>
                                <ul className="space-y-2 mb-8 text-gray-400 text-sm">
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />Ecuación: dN/dt = -λN</li>
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2" />Aplicación: Datación C-14, Energía Nuclear</li>
                                </ul>
                                <Link to="/decay" className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                                    Explorar Simulación <ArrowRight size={20} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Historical Context */}
            <div className="py-20 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-8">Un Poco de Historia</h2>
                    <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 relative">
                        <div className="absolute -top-4 -left-4 text-6xl text-gray-700 font-serif"></div>
                        <p className="text-xl text-gray-300 italic mb-6">
                            Es útil resolver ecuaciones diferenciales. Pues quien sabe resolverlas, posee la llave para describir el mundo.
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="text-left">
                                <div className="font-bold text-white">Isaac Newton</div>
                                <div className="text-sm text-gray-500">Principia Mathematica, 1687</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>© 2025 Proyecto de Ecuaciones Diferenciales. Universidad del Valle.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
