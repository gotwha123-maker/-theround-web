export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">
                THE <span className="accent-text">ROUND</span>
              </span>
            </div>
            <p className="brand-desc">
              배경과 세대를 넘어 모든 이가 대등한 구성원으로 만나는 한반도 미래의 원형 테이블입니다.
            </p>
          </div>
          <div className="footer-links">
            <h4>더라운드</h4>
            <ul>
              <li><a href="/#about">단체 소개</a></li>
              <li><a href="/#stats">데이터와 현실</a></li>
              <li><a href="/#contact">오시는 길</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>주요 활동</h4>
            <ul>
              <li><a href="/#solutions">핵심 실천 활동</a></li>
              <li><a href="/#stories">활동 소식/스토리</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>문의</h4>
            <ul>
              <li><a href="/#contact">문의 및 오시는 길</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="org-details">
            <p>비영리 민간단체 더라운드 | 대표자: 김은철 | 고유번호: 123-45-67890</p>
            <p>주소: 서울특별시 금천구 가산동 459-7 | TEL: 02-866-6296 | Email: theround2030@naver.com</p>
            <p style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--color-primary)" }}>Official Website: www.theroundyouth.org</p>
            <p className="copyright">&copy; 2026 The Round. All Rights Reserved.</p>
          </div>
          <div className="footer-legal">
            <a href="#">개인정보 처리방침</a>
            <a href="#">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
