# 🌡️☢️ Simulador de Ecuaciones Diferenciales: Enfriamiento y Decaimiento

Aplicación interactiva y didáctica para visualizar dos fenómenos fundamentales modelados por ecuaciones diferenciales de primer orden: la Ley de Enfriamiento de Newton y el Decaimiento Radioactivo.

![Simulador de Enfriamiento](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)

## ✨ Características Principales

- Doble Simulación: Contiene dos módulos independientes y completos:

   - 🔥 Ley de Enfriamiento: Simulación del enfriamiento de diferentes metales con constantes de enfriamiento reales.

   - ⚛️ Decaimiento Radioactivo: Simulación de la desintegración de isótopos clave usados en medicina y datación.

- 📊 Gráfica en Tiempo Real: Visualización dinámica de la variable (Temperatura o Cantidad) vs. Tiempo.

- 🎨 Visualización: Incorpora elementos visuales (cambio de color térmico o íconos de decaimiento) para una mejor comprensión.

- ⏯️ Controles de Simulación: Controles unificados (Play, Pausa, Reiniciar) y barra de tiempo para navegación manual.

- 🧮 Fundamento Matemático: Presentación clara de las Ecuaciones Diferenciales y sus soluciones analíticas para ambos casos.

## 🧪 Fundamento Científico

La aplicación implementa la siguiente ecuación diferencial de primer orden.

### 1. Ley de Enfriamiento de Newton

Describe la tasa de cambio de la temperatura de un objeto en función de la diferencia entre su temperatura y la del entorno.

**Ecuación diferencial:**

$\frac{dT}{dt} = -k(T - T_{ambiente})$

**Solución analítica:**

$T(t) = T_{ambiente} + (T_{inicial} - T_{ambiente}) \cdot e^{-kt}$

**Donde:**

- $T$: Temperatura del metal en el tiempo $t$  
- $k$: Constante de enfriamiento  
- $T_{ambiente}$: Temperatura del entorno  
- $T_{inicial}$: Temperatura inicial del metal  

### 2. Decaimiento Radioactivo

Describe la tasa a la que una cantidad de sustancia radioactiva se desintegra, proporcional a la cantidad presente.

**Ecuación diferencial:**

$\frac{dA}{dt} = -\lambda A$

**Solución analítica:**

$A(t) = A_0 \cdot e^{-\lambda t}$

La constante de decaimiento se obtiene a partir de la vida media:

$\lambda = \frac{\ln(2)}{T_{1/2}}$

**Donde:**

- $A$: Cantidad de sustancia radioactiva en el tiempo $t$  
- $\lambda$: Constante de decaimiento  
- $A_0$: Cantidad inicial de sustancia  
- $T_{1/2}$: Vida media  


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

### 🌡️ Módulo: Enfriamiento de Newton

1. **Configura los parámetros iniciales:**
   - Temperatura inicial del metal (°C)
   - Temperatura ambiente (°C)
   - Selecciona el metal de la lista
   - Tiempo de la simulacion

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

### ⚛️ Módulo: Decaimiento Radioactivo

Configura los parámetros iniciales.

- Cantidad inicial de sustancia $A_0$  
- Selección de isótopo para fijar la vida media $T_{1/2}$ y calcular $\lambda$  
- Inicio de la simulación para observar el comportamiento de $A(t)$

**Isótopos disponibles**

| Isótopo      | Vida Media ($T_{1/2}$)        | Unidad                     | Uso común                |
|--------------|-------------------------------|-----------------------------|---------------------------|
| Carbono-14   | 5730                           | años                        | Datación arqueológica     |
| Uranio-238   | 4.468 miles de millones        | años                        | Datación geológica        |
| Yodo-131     | 8.02                           | días                        | Medicina nuclear          |
| Radón-222    | 3.82                           | días                        | Riesgo ambiental          |
| Cesio-137    | 30.17                          | años                        | Radioterapia              |

### 🕹️ Controles Generales

1. **Configura los parámetros iniciales:**
   - Isotopo
   - Cantidad inicial $N_0$
   - Duracion de la animacion

2. **Inicia la simulación:**
   - Haz clic en "Iniciar Simulación"

3. **Controla la animación:**
   - Pausa la simulacion
   - Reiniciar la simulacion

## 🙏 Agradecimientos

- Basado en los principios de la **Ley de Enfriamiento de Newton**
- Desarrollado como proyecto académico de Ecuaciones Diferenciales

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub
