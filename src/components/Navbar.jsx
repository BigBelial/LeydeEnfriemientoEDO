import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Thermometer, Atom } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-xl font-bold text-white">Ecuaciones Diferenciales</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/"
                                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isActive('/')}`}
                                >
                                    <Home size={18} />
                                    Inicio
                                </Link>

                                <Link
                                    to="/cooling"
                                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isActive('/cooling')}`}
                                >
                                    <Thermometer size={18} />
                                    Ley de Enfriamiento
                                </Link>

                                <Link
                                    to="/decay"
                                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${isActive('/decay')}`}
                                >
                                    <Atom size={18} />
                                    Decaimiento Radiactivo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
