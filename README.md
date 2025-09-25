# Requisitos
Antes de correr el proyecto, necesitas instalar estas tres cosas:

- **Node.js** → Para correr código JavaScript fuera del navegador.  
- **npm (o pnpm)** → Es el gestor de paquetes, sirve para instalar librerías de JS/TS.  
- **git** → Para clonar el proyecto desde GitHub.  

---

## Instalación de Node.js y npm
Para instalar **npm**, primero necesitas instalar **Node.js**.

### En Windows
1. Ve a la página oficial de Node:  
   👉 https://nodejs.org/en/download  
2. Descarga el instalador de Windows (`Windows Installer (.msi)`).  
3. Haz doble clic en el archivo descargado y sigue el instalador como cualquier otro programa.  
4. Cuando termine, abre una terminal (**cmd** o **PowerShell**) y ejecuta:
   ```sh
   node -v
   ```
   Te debería salir algo como `v22.20.0`.  
   Después prueba:
   ```sh
   npm -v
   ```
   Te debería salir la versión de npm, por ejemplo `10.9.3`.

---

### En Linux
En Linux es mejor instalar Node con **nvm** (Node Version Manager).  
Abre una terminal y ejecuta:

```sh
# Descarga e instala nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Activa nvm (sin reiniciar la terminal):
\. "$HOME/.nvm/nvm.sh"

# Instala Node.js (incluye npm automáticamente):
nvm install 22

# Verifica que Node está instalado:
node -v   # debería mostrar v22.20.0
npm -v    # debería mostrar 10.9.3
```

---

## Instalación de Git
Necesitamos Git para clonar el repositorio.  

- En **Windows**:  
  👉 https://git-scm.com/downloads  
  Descarga el instalador, sigue los pasos y listo.  

- En **Linux**:  
  ```sh
  sudo apt update
  sudo apt install git -y
  ```

Verifica que está instalado:  
```sh
git --version
```

---

# ¿Cómo corro la app?
1. Clona el proyecto con git:
   ```sh
   git clone URL_DEL_REPO
   ```

2. Ingresa al directorio del proyecto:
   ```sh
   cd DIRECTORIO_PROYECTO
   ```

3. Instala las dependencias:
   - Con pnpm:
     ```sh
     pnpm i
     ```
   - Con npm:
     ```sh
     npm i
     ```

4. Corre el proyecto:
   - Con pnpm:
     ```sh
     pnpm dev
     ```
   - Con npm:
     ```sh
     npm run dev
     ```

Listo 🚀, ya deberías tener la app corriendo.

---

## Estructuración de archivos
La estructuración actual de archivos es la que Next.js recomienda, utilizando el **App Router**.

```
app/ (root directory del proyecto)
  ├── posts/         (ruta de posts)
  │     └── [post]   (ruta para post individual)
  ├── users/         (ruta de usuarios)
  │     └── [id]     (ruta para usuario individual)
  ├── interfaces/    (guarda las interfaces de typescript)
  └── providers/     (guarda providers que envuelven la React app)
        └── QueryClient.tsx (provider para React Query)
```

---

# SSR, Client & Server Components, ISR
En este caso opté por **client y server components** porque estoy usando **React Query**.  
Es más fácil hacer los fetches directamente en los client components para aprovechar React Query.  

- **Si la prioridad fuera el SEO**, sería mejor usar SSR porque el HTML llega ya renderizado al cliente desde el servidor.  
- También podría haberse usado más **server components** si no usara React Query.  
- Así como está, esta app es más como una **SPA** (Single Page Application), ya que la mayoría de la lógica ocurre en el cliente.  

---

# React Query
Utilicé **React Query** en todo el proyecto.  
Ventajas:
- Mejora la performance gracias al **caché**.  
- Reduce el tráfico innecesario hacia el servidor.  
- Mejora la experiencia del usuario al evitar recargas constantes.  

La lógica está organizada así:
- Cada recurso tiene su propio archivo de consultas, por ejemplo `user.api.ts` para usuarios.  
- En los componentes solo se usa `useQuery()` con su respectiva `queryKey` y `queryFn`.  
- Esto hace que el código sea mucho más limpio y mantenible.  
