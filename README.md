<h1>APT. (Apateu, 아파트)</h1>

## 배포 주소

https://apatue.vercel.app

## 0. 프로젝트 소개

> 개발 기간: 2024. 10. 30 ~

APT.는 '**🇰🇷 한국의 술게임인 아파트 게임을 하고, 게임 결과를 공유할 수 있는 서비스**'입니다.

## 폴더 구조

```bash
src/
├── app/
│ ├── layout.tsx // 공통 레이아웃 설정
│ ├── game/
│ │ ├── page.tsx // 게임 플레이 페이지
│ │ ├── result/
│ │ │ └── page.tsx // 게임 결과 페이지
│ │ └── tutorial/
│ │ └── page.tsx // 게임 튜토리얼 페이지
│ └── page.tsx // 홈 페이지
├── providers/ // 상태 관리 및 설정 제공 컴포넌트
│ ├── TanstackQueryProvider.tsx
│ └── RecoilProvider.tsx
├── components/ // 재사용 가능한 컴포넌트들
├── hooks/ // 커스텀 훅
├── services/ // API 요청 및 Supabase 관련 함수
├── styles/ // Tailwind 및 전역 스타일 관련 파일
├── lib/ // 라이브러리 관련 파일
├── types/ // 타입 정의 파일
└── public/ // 정적 파일
```
