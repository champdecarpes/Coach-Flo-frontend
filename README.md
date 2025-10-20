### Folder Structure

```
coach_flo_frontend/
├── README.md                 # установка, openapi-ts, dev-режим
├── package.json / package-lock.json
├── tsconfig.json             # базовый TS
├── tsconfig.app.json         # TS для приложения
├── tsconfig.node.json        # TS для build-скриптов
├── vite.config.js            # сборка Vite
├── tailwind.config.js        # тема и пресеты Tailwind
├── .eslintrc.cjs / .gitignore / Dockerfile
├── index.html                # если рендер вне Django-шаблона
├── public/                   # статика (иконки/manifest и т.п.)
└── src/
├── index.tsx             # bootstrap (createRoot + провайдеры)
├── App.tsx               # корневой макет и <Outlet/>
├── routes/               # React Router v6 (lazy, loaders/actions*)
├── pages/                # экраны (Auth, Dashboard, Library, Settings…)
├── components/
│   ├── ui/               # Button/Card/Modal/Avatar/Loader/Toast
│   ├── form/             # Input/Select/DatePicker/FileUpload
│   └── layout/           # Header/Footer/Sidebar/Breadcrumbs
├── services/
│   ├── api.ts            # axios; withCredentials; Token/Djoser схема
│   ├── openapi/          # сгенерированное API из /api/schema/
│   └── *entity*.ts       # users/brands/exercises/workouts/…
├── store/                # Redux Toolkit (configureStore, slices)
├── hooks/                # useAuth/useFetch/useWebSocket…
├── types/                # TS-модели домена
├── utils/                # helpers, formatters, constants
└── assets/               # styles (Tailwind), шрифты, изображения
```

### Frontend

* `react` рендеринг интерактивного UIs
* `react-dom` монтирование в DOM
* `react-router` навигация между страницами
* `vite` сборка статических ассетов
* Стилизация

  * `bootstrap` готовые адаптивные стили
  * `react-bootstrap` компоненты поверх Bootstrap CSS без плагинов
  * `tailwind` utility-first CSS со скоростной стилизацией прямо в разметке
  * `styled-components` для написания локализованных, динамических стилей CSS внутри компонентов JavaScript/TypeScript
* Состояние и интеграция с backend-ом

  * `axios` асинхронные HTTP-запросы
  * `cookie` удобная работа с `csrftoken` при интеграции с Django
  * `openapi-ts` генерация типобезопасного TS-клиента из OpenAPI-схемы
  * `history` управление историей браузера для React Router
  * `Apollo Client` управление GraphQL-запросами на стороне клиента
  * `Redux` централизованное хранилище состояния приложения и данных
* Утилиты

  * `lodash` общие вспомогательные функции
  * `classnames` удобная сборка сложных классов CSS
  * `react-refresh` для улучшения QoL через автоперезагрузку браузера при разработке

### If you're not using Docker:

#### Setup and run the frontend app

* Откройте новое окно командной строки и перейдите в директорию проекта
* Выполните команду `npm install`
* Выполните `npm run openapi-ts`

  * Эта команда генерирует типобезопасный клиентский API на TypeScript на основе OpenAPI-схемы бэкенда
* Выполните `npm run dev`
* Откройте браузер и перейдите по адресу `http://localhost:8000`, чтобы увидеть запущенный проект


## What needs to be completed

```
coach_flo_frontend/
├── README.md                 # установка, openapi-ts, dev-режим
├── package.json / package-lock.json
├── tsconfig.json             # базовый TS
├── tsconfig.app.json         # TS для приложения
├── tsconfig.node.json        # TS для build-скриптов
├── vite.config.js            # сборка Vite
├── tailwind.config.js        # тема и пресеты Tailwind
├── .eslintrc.cjs / .gitignore / Dockerfile
├── index.html                # если рендер вне Django-шаблона
├── public/                   # статика (иконки/manifest и т.п.)
└── src/
├── index.tsx             # bootstrap (createRoot + провайдеры)
├── App.tsx               # корневой макет и <Outlet/>
├── routes/               # React Router v6 (lazy, loaders/actions*)
├── pages/                # экраны (Auth, Dashboard, Library, Settings…)
├── components/
│   ├── ui/               # Button/Card/Modal/Avatar/Loader/Toast
│   ├── form/             # Input/Select/DatePicker/FileUpload
│   └── layout/           # Header/Footer/Sidebar/Breadcrumbs
├── services/
│   ├── api.ts            # axios; withCredentials; Token/Djoser схема
│   ├── openapi/          # сгенерированное API из /api/schema/
│   └── *entity*.ts       # users/brands/exercises/workouts/…
├── store/                # Redux Toolkit (configureStore, slices)
├── hooks/                # useAuth/useFetch/useWebSocket…
├── types/                # TS-модели домена
├── utils/                # helpers, formatters, constants
└── assets/               # styles (Tailwind), шрифты, изображения
```
