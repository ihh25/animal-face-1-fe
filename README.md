# 🐾 AnimalFace Frontend

나의 동물상을 찾아주는 AI 분석 웹 서비스입니다.

## 기술 스택

- React + Vite + TypeScript
- Zustand (상태관리)
- Axios (API 통신)
- React Router v6

## 폴더 구조

```
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
```

## 시작하기

```bash
# 패키지 설치
npm install

# 환경변수 설정
cp .env.example .env

# 개발 서버 실행
npm run dev
```

## 환경변수

```
VITE_API_BASE_URL=http://localhost:8080
```

## 페이지 흐름

```
/ (업로드)  →  /loading (분석 중)  →  /result (결과)  →  /collection (도감)
```
