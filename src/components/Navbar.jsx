import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Thermometer, Atom, Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/20'
            : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:backdrop-blur-sm';
    };

    const navLinks = [
        { path: '/', label: 'Inicio', icon: Home },
        { path: '/cooling', label: 'Ley de Enfriamiento', icon: Thermometer },
        { path: '/decay', label: 'Decaimiento Radiactivo', icon: Atom },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-lg">
                            <Activity size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Ecuaciones Diferenciales
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-2">
                            {navLinks.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-300 ${isActive(path)}`}
                                >
                                    <Icon size={18} />
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Abrir menú principal</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden transition-all duration-300 ease-in-out absolute w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/10 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
                    {navLinks.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${location.pathname === path
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800'
                                }`}
                        >
                            <Icon size={20} />
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
