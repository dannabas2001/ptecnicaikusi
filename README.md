# Dashboard React
Visita aqui: [Dashboard](https://ptecnicaikusi.vercel.app/)

Este proyecto es un **dashboard interactivo** desarrollado en **React** que muestra información de una organización con presencia multinacional. Utiliza **Chart.js** para gráficos y proporciona filtros dinámicos por país, ciudad y oficina.

---

## 🔹 Descripción del Proyecto

El dashboard permite:

- Crear una cuenta para acceder al Dashboard.
- Iniciar sesión con email y contraseña.
- Visualizar el total de oficinas por país y ciudad.
- Visualizar el total de empleados por país, ciudad y oficina.
- Visualizar el revenue de la empresa por país, ciudad y oficina.
- Visualizar la cantidad de tickets abiertos por país, ciudad y oficina.
- Filtrar la información según la selección del usuario.
- Ver datos de manera gráfica y fácil de interpretar.

---

## 🛠 Tecnologías y Librerías Usadas

- **react / react-dom**: Librerías principales para construir la interfaz y renderizar en el DOM.
- **react-router / react-router-dom**: Manejo de rutas y navegación.
- **chart.js**: Creación de gráficos dinámicos y personalizables.
- **react-chartjs-2**: Integración de Chart.js con React como componentes.
- **react-hook-form**: Gestión de formularios con validación y control de inputs.
- **@hookform/resolvers**: Integración de librerías de validación como Zod con react-hook-form.
- **zod**: Validación y parsing de datos de entrada.
- **tailwindcss / @tailwindcss/vite**: Framework CSS para estilos rápidos y consistentes.
- **react-icons**: Conjunto de iconos listos para usar en componentes React.

---

## 📂 Estructura del Proyecto

```bash
.
├── public/                  # Archivos públicos servidos tal cual
│   └── data/                # Datos estáticos accesibles desde el cliente
│
├── src/                     # Código fuente principal
│   ├── components/          # Componentes reutilizables de UI
│   ├── context/             # Contextos de React (estado global)
│   ├── helpers/             # Funciones auxiliares
│   ├── hooks/               # Custom hooks
│   ├── providers/           # Providers de contexto
│   ├── routes/              # Definición de rutas
│   ├── schema/              # Esquemas de validación
│   ├── services/            # Llamadas a APIs/servicios
│   ├── types/               # Definición de tipos TypeScript
│   └── views/               # Vistas/páginas principales
```
# Instrucciones de instalación del proyecto
## ⚙️ Requisitos Previos

Antes de correr el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- Node.js v20.19.0+
- npm o yarn

## 🚀 Clonar e Instalar

1. Clonar el repositorio:

```bash
git clone https://github.com/dannabas2001/ptecnicaikusi.git
cd ptecnicaikusi
```
2.Instalar dependencias 
```bash
npm install
# o
yarn install
```
3. Abrir el proyecto en el navegador: [http://localhost:5173](http://localhost:5173)

## 🧩 Decisiones Técnicas

- **React**: Elegido por su capacidad de construir interfaces interactivas y reutilizables con componentes.
- **Chart.js / react-chartjs-2**: Para gráficos dinámicos y fáciles de integrar con React.
- **TailwindCSS**: Permite estilizar rápidamente sin crear hojas de estilo largas y facilita mantener consistencia en UI.
- **react-hook-form + Zod**: Para manejar formularios con validación robusta y mínima configuración.
- **Estructura de carpetas**: Separación clara entre componentes, hooks, servicios y vistas para mantener escalabilidad y claridad.
- **TypeScript**: Mayor seguridad de tipos y prevención de errores comunes en tiempo de desarrollo.
- **Vite**: Elegido como bundler por su rapidez en desarrollo y facilidad de configuración.
