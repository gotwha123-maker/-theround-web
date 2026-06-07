export default function AboutFounder() {
  return (
    <section id="about-founder" className="section founder-section dark-bg">
      <div className="container">
        <div className="founder-message-box reveal-on-scroll">
          <div className="founder-image-wrapper" style={{ position: "relative" }}>
            <img 
              src="assets/김은철.jpg" 
              alt="더라운드 김은철 대표" 
              className="founder-img" 
              id="founder-portrait-img"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000";
              }}
            />
          </div>
          <div className="founder-text-content">
            <blockquote className="founder-quote">
              "우리는 서로 다른 삶의 궤적이 만나는 접점에서 사회 통합의 가능성을 봅니다. 다양한 세대의 지성과 구성원들의 열정이 동등하게 어우러질 때, 한반도 통합을 위한 가장 혁신적이고 진정성 있는 아이디어가 태어납니다. 더라운드는 모두가 함께 내일의 비전을 설계하고 실천하는 연대의 공간이 될 것입니다."
            </blockquote>
            <div className="founder-info">
              <span className="founder-name">김 은 철</span>
              <span className="founder-title">더라운드(The Round) 대표</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
