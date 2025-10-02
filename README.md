# 🌡️ Simulador de Enfriamiento de Newton

Aplicación interactiva para visualizar la **Ley de Enfriamiento de Newton**, que permite simular cómo diferentes metales se enfrían a temperatura ambiente mediante ecuaciones diferenciales.

![Simulador de Enfriamiento](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)

## ✨ Características

- 🔥 **Metales diferentes** con constantes de enfriamiento reales
- 📊 **Gráfica en tiempo real** de temperatura vs tiempo
- 🎨 **Visualización térmica** del metal con cambio de color
- ⏯️ **Controles de simulación** (play, pausa, reiniciar)
- 🎚️ **Barra de tiempo** para navegar manualmente
- 🧮 **Ecuación diferencial** con solución analítica

## 🧪 Fundamento Científico

La aplicación implementa la **Ley de Enfriamiento de Newton**:

$\frac{dT}{dt} = -k(T - T_{ambiente})$

**Solución analítica:**

$T(t) = T_{ambiente} + (T_{inicial} - T_{ambiente}) \cdot e^{-kt}$

Donde:
- $T$ : Temperatura del metal en el tiempo $t$
- $k$ : Constante de enfriamiento (depende del metal)
- $T_{ambiente}$ : Temperatura del entorno
- $T_{inicial}$ : Temperatura inicial del metal

## 🚀 Instalación

### Requisitos previos
- Node.js 18 o superior
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/simulador-enfriamiento.git
cd simulador-enfriamiento
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🛠️ Tecnologías

- **React 18** - Librería de interfaz de usuario
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Recharts** - Librería de gráficas
- **Lucide React** - Iconos

## 📖 Uso

1. **Configura los parámetros iniciales:**
   - Temperatura inicial del metal (°C)
   - Temperatura ambiente (°C)
   - Selecciona el metal de la lista

2. **Inicia la simulación:**
   - Haz clic en "Iniciar Simulación"

3. **Controla la animación:**
   - **Play/Pausa**: Ejecuta o detiene la simulación
   - **Barra de tiempo**: Navega a cualquier momento
   - **Reiniciar**: Vuelve a la configuración inicial

## 🔬 Metales Disponibles

| Metal | Constante k | Tiempo de enfriamiento |
|-------|-------------|------------------------|
| Plata | 0.20 | ~25 min |
| Cobre | 0.18 | ~28 min |
| Aluminio | 0.15 | ~33 min |
| Latón | 0.12 | ~42 min |
| Bronce | 0.11 | ~45 min |
| Hierro | 0.10 | ~50 min |
| Acero | 0.08 | ~63 min |
| Plomo | 0.06 | ~83 min |

## 👨‍💻 Autor

**Juan Jose Ospina Sanchez**
- GitHub: [@BigBelial](https://github.com/BigBelial)
- Universidad del Valle

## 🙏 Agradecimientos

- Basado en los principios de la **Ley de Enfriamiento de Newton**
- Desarrollado como proyecto académico de Ecuaciones Diferenciales

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub
