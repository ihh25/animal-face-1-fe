<<<<<<< HEAD
# 🐾 AnimalFace Frontend

나의 동물상을 찾아주는 AI 분석 웹 서비스입니다.

## 기술 스택

- React + Vite + TypeScript
- Zustand (상태관리)
- Axios (API 통신)
- React Router v6

## 폴더 구조

​```
animal-face-1-fe/
├── .env
└── src/
    ├── types/
    │   ├── result.ts                    # A
    │   └── collection.ts                # B
    ├── api/
    │   ├── axios.ts                     # A
    │   ├── upload.ts                    # A
    │   └── collection.ts                # B
    ├── store/
    │   ├── useResultStore.ts            # A
    │   └── useCollectionStore.ts        # B
    ├── components/
    │   ├── Loader.tsx                   # A
    │   ├── Header.tsx                   # B
    │   ├── Button.tsx                   # B
    │   ├── Modal.tsx                    # B
    │   └── AnimalCard.tsx               # B
    ├── pages/
    │   ├── upload/
    │   │   └── UploadPage.tsx           # A
    │   ├── loading/
    │   │   └── LoadingPage.tsx          # A
    │   ├── result/
    │   │   ├── ResultPage.tsx           # A
    │   │   └── AnimalChart.tsx          # A
    │   └── collection/
    │       ├── CollectionPage.tsx       # B
    │       └── CollectionDetailPage.tsx # B
    ├── styles/
    │   ├── global.css                   # B
    │   └── tokens.css                   # B
    ├── App.tsx                          # A
    └── main.tsx                         # A
​```

## 시작하기

​```bash
npm install
npm run dev
​```

## 환경변수

​```
VITE_API_BASE_URL=http://localhost:8080
​```

## 페이지 흐름

​```
/ (업로드)  →  /loading (분석 중)  →  /result (결과)  →  /collection (도감)
​```
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> origin/B
