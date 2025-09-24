# ¿Cómo corro la app?
Clona el proyecto con `git clone`.
Después de clonar el proyecto, ingresa al directorio del proyecto:

`cd DIRECTORIO_PROYECTO`

Con tu gestor de paquetes favoritos, instala los paquetes, en mi caso utilizo pnpm

`pnpm i`
Si utilizas npm, usa `npm i`

Para correr el proyecto, haz `pnpm dev` (si usas pnpm), si usas npm: `npm run dev`

Listo! Ya deberias tener tu app funcionando.

## Estructuración de archivos
La estructuración actual de archivos es la que Next.js recomienda, utilizando el App Router.
`app/` (root directory del proyecto)
  - `posts/` (ruta de posts)
      - [post] (ruta para post individual)
  - `users/` (ruta de usuarios)
      -  [id] (ruta para usuario individual)
  - `interfaces/` (guarda las interfaces de typescript)
  - `providers/` (guarda providers que necesitan envolver la React app)
      - `QueryClient.tsx` (provider para React Query)


# SSR, o client & server components, o ISR?
En este caso me fui por client y server components, debido a que utilizo React Query, resulta mas fácil y mas al grano hacer los fetches directamente en los clients components para utilizar React Query.
Me parece que en este caso no es tan necesario utilizar SSR (si nuestra prioridad fuera el SEO, entonces si seria mejor SSR, debido a que el HTML ya llegaria pre-renderizado al cliente desde el servidor, aunque esto tambien se puede lograr con server components), esta app la consideraría mas SPA ya que no se utilizan muchos server components, si no utilizara React Query entonces me iria mas por Server Components para hacer los fetches.

# React Query
Utilicé React Query, es algo que hago en todos mis proyectos ya que me parece algo tan necesario para mejorar la performance de la página y reducir MUCHO el tráfico en el servidor (si tuvieramos uno, en este caso utilizamos la API de JSONPlaceholder directamente entonces eso no aplicaria mucho). Tambien mejora por montón la user experience gracias al cacheado, ganancias por todos lados.


- Por qué usaste Server Components / SSR?: ...
- Cómo organizaste tu carpeta /app o /pages: Como estoy utilizando App Router, me fui por el camino de /app, siguiendo el enrutamiento file-based.
- Cómo estructuraste la lógica con React Query: Las consultas (los fetches) estan separados en su propio archivo aparte, por individual, es decir, para las consultas de `user`, esta el archivo `user.api.ts`, y asi con los demás, dejando un diseño mucho más limpio y legible, ya que nos evitamos leer las llamadas repetitivas a los fetch(). La logica relacionada a React Query (useQuery() y uso de React Query en general) se queda en el mismo archivo donde se usan esos datos, solo se encargarían de asignar su respectiva queryKey y queryFn, cuyas funciones estan separadas en su archivo individual, como se mencionó anteriormente.
