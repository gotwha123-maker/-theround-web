# 🤖 더라운드 웹사이트 n8n AI 자동화 에이전트 설정 가이드

이 가이드는 Next.js 웹사이트와 Airtable 클라우드 DB를 연동하여, **강연/예약 신청 실시간 알림** 및 **탈북민 정착 뉴스 AI 자동 수집/요약 크롤러**를 구축하는 n8n 워크플로우 가이드입니다.

---

## 🏗️ 1. 자동화 에이전트 아키텍처

```
[방문자 신청] ➡️ 웹사이트 API (/api/book, /api/contact 등)
                  ├── 1. Airtable 실시간 DB 기록 (완료)
                  └── 2. n8n 웹훅 트리거 전송 ➡️ [n8n 알림 워크플로우] ➡️ Slack/카카오톡/이메일 알림 전송

[AI 뉴스 수집] ➡️ [n8n AI 크롤러 워크플로우] (매일 아침 9시 실행)
                  ├── 1. 통일부/남북하나재단 정책 뉴스 자동 수집
                  ├── 2. OpenAI AI 노드가 관련성 판별 및 3줄 요약 생성
                  └── 3. Airtable 'SettlementNews' 테이블에 자동 업로드
```

---

## 🔌 2. n8n 워크플로우 파일 가져오기 (Import)

프로젝트 내 `automation/` 폴더에 생성된 다음 워크플로우 JSON 파일을 n8n에 가져오기(Import)하여 즉시 사용할 수 있습니다.

1. **[강연 및 문의 실시간 알림 워크플로우](file:///c:/Users/thero/더라운드%20웹사이트/automation/booking_notification_workflow.json)**
   * **기능**: 웹사이트에서 강연 신청이나 문의글이 등록되면 즉시 정보를 요약하여 관리자 이메일(또는 Slack)로 실시간 발송합니다.
2. **[정착 소식 AI 크롤링 및 업로드 워크플로우](file:///c:/Users/thero/더라운드%20웹사이트/automation/news_ai_crawler_workflow.json)**
   * **기능**: 매일 아침 자동으로 정부 부처 정책 소식을 수집하여 AI로 요약한 후 Airtable에 임시 저장 및 노출합니다.

### 📥 가져오는 방법:
1. 본인의 n8n 대시보드에 접속합니다.
2. **[Workflows]** ➡️ **[Add workflow]** (우측 상단) 클릭합니다.
3. 우측 상단의 점 3개 메뉴(⚙️)를 눌러 **[Import from file]**을 선택하고 위의 JSON 파일을 선택하여 로드합니다.

---

## 🛠️ 3. 환경 변수 연동 설정

n8n과 웹사이트를 온전히 연동하기 위해 Next.js의 `.env.local` 파일에 n8n 웹훅 주소를 등록해야 합니다.

1. n8n에 가져온 **알림 워크플로우**의 첫 번째 노드인 **Webhook** 노드를 클릭합니다.
2. `Production URL` 혹은 `Test URL` 주소를 복사합니다.
3. 프로젝트 루트 폴더의 `.env.local` 파일에 아래 변수를 추가합니다:

```env
N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/your-webhook-path
```

4. 이제 신청폼이 접수될 때마다 Airtable 저장과 동시에 n8n 자동 알림 파이프라인이 즉각 작동합니다!

---

*주의: n8n은 n8n Cloud 서비스를 이용하시거나, 개인 서버/PC에 도커(Docker) 혹은 npm을 통해 무료로 셀프 호스팅하여 운영하실 수 있습니다.*
