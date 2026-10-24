# 10초 몸속 시계

https://nanalab.kr/body-clock/

원본 승인 게임을 한국어 루트 및 `/ko/`, `/en/`, `/zh/`, `/es/`로 제공하는 정적 사이트입니다. 게임 플레이·결과·공유·JPG 저장 문구와 엔진 결과명을 각 언어로 빌드합니다.

- GitHub Pages: main 브랜치의 `/docs`. `.nojekyll` 포함. 프로젝트별 CNAME 없음.
- 수동 언어 선택은 이 기기에 저장합니다. GeoJS로 IP 국가에 따른 추천을 표시하고 실패 시 브라우저 언어로 대체합니다. 강제 이동하지 않습니다. GeoJS에는 요청자의 IP가 전달되며 추천 안내에 표시됩니다.
- 자체 제작 코드·CSS/SVG/Canvas 그래픽·시스템 폰트. 외부 이미지·게임 폰트 없음.
- 광고·분석은 기존 NaNa 게시자 설정을 사용합니다. IP 추천·광고·분석을 제외한 게임 입력은 브라우저에서 처리합니다.
- 대표 카드: `docs/og/default.jpg`, 언어별 `docs/{언어}/og/default.jpg`, 1200×630 JPG. 직접 그린 글자·도형 카드입니다.
- 다국어 canonical·hreflang·OG·sitemap.xml 포함.

설치: `npm install`. 빌드: `npm run build`. 테스트: `npm test`. 원본 엔진 테스트를 네 언어 각각에 대해 실행합니다.

권리·도구 출처: PROVENANCE.json, THIRD_PARTY_NOTICES.md.
