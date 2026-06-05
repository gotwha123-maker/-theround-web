document.addEventListener('DOMContentLoaded', () => {
    console.log('THE ROUND App v1.0.6 Loaded');

    // --- DATA VERSIONING & FORCED UPDATE ---
    const CURRENT_DATA_VERSION = 'v1.0.6';
    if (localStorage.getItem('theround_data_version') !== CURRENT_DATA_VERSION) {
        console.log('New data version detected. Force updating local stories and designers.');
        // We do not clear EVERYTHING (to keep user logins), but we clear specific arrays to force them to use new defaults.
        localStorage.removeItem('theround_stories');
        localStorage.removeItem('theround_unified_designers');
        localStorage.setItem('theround_data_version', CURRENT_DATA_VERSION);
    }

    // --- GLOBAL ERROR CATCHER ---
    window.addEventListener('error', (e) => {
        console.error('Runtime Error:', e.message);
    });

    // --- TROUBLESHOOTING TOOL ---
    window.resetTheRound = () => {
        if(confirm('모든 데이터를 초기화하고 다시 시작하시겠습니까? (로그인 정보 포함)')) {
            localStorage.clear();
            location.reload();
        }
    };

    // ==========================================================================
    // 1. Core Utilities & UI Initialization
    // ==========================================================================

    const countUp = (element) => {
        if (element.classList.contains('animated')) return;
        element.classList.add('animated');
        const target = parseFloat(element.getAttribute('data-target'));
        const decimals = parseInt(element.getAttribute('data-decimals') || '0');
        const duration = 2000;
        const startTime = Date.now();

        const update = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress * (2 - progress);
            const currentValue = easeProgress * target;
            element.textContent = decimals > 0 ? currentValue.toFixed(decimals) : Math.floor(currentValue).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else element.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
        };
        requestAnimationFrame(update);
    };

    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
    }

    hamburger.addEventListener('click', toggleMenu);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                closeMenu();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'stats') entry.target.querySelectorAll('.counter-value').forEach(countUp);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    function initReveal() {
        document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));
    }
    initReveal();

    // ==========================================================================
    // 2. Authentication & Membership Module
    // ==========================================================================

    const authModalLink = document.getElementById('auth-modal-link');
    const authModal = document.getElementById('auth-modal');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const loginContainer = document.getElementById('login-form-container');
    const signupContainer = document.getElementById('signup-form-container');
    const authModalClose = authModal?.querySelector('.modal-close');
    const loginForm = document.getElementById('user-login-form');
    const signupForm = document.getElementById('user-signup-form');

    const adminPanel = document.getElementById('admin-dashboard-modal');
    const companionLounge = document.getElementById('user-dashboard-modal');
    const userNameDisplay = document.getElementById('header-user-name');
    const userProfileHeader = document.getElementById('user-profile-header');
    const headerAdminDashboard = document.getElementById('header-admin-dashboard');
    const logoutBtn = document.getElementById('modal-logout-btn');

    let initialUsers = JSON.parse(localStorage.getItem('theround_users') || '[]');
    // Clean up old admin account if it exists
    initialUsers = initialUsers.filter(u => u.email !== 'admin' && u.email !== 'admin@theround.kr');

    let adminUser = initialUsers.find(u => u.email === 'gotwha' || u.role === 'admin');
    if (!adminUser) {
        initialUsers.push({ id: 'admin-0', name: '최고관리자', email: 'gotwha', pw: 'aledma12!!@@', role: 'admin', date: '2026. 06. 04' });
        localStorage.setItem('theround_users', JSON.stringify(initialUsers));
    } else {
        adminUser.email = 'gotwha';
        adminUser.pw = 'aledma12!!@@';
        adminUser.role = 'admin';
        localStorage.setItem('theround_users', JSON.stringify(initialUsers));
    }

    const adminStoriesSec = document.getElementById('admin-stories-section');
    const adminUsersSec = document.getElementById('admin-users-section');

    function checkAuthSession() {
        const user = JSON.parse(localStorage.getItem('theround_logged_in_user'));
        const founderEditBtn = document.getElementById('admin-edit-founder-btn');

        if (user) {
            authModalLink.classList.add('hidden');
            userProfileHeader.classList.remove('hidden');
            userNameDisplay.textContent = user.name + '님';
            
            if (user.role === 'admin') {
                headerAdminDashboard.classList.remove('hidden');
                founderEditBtn?.classList.remove('hidden');
            } else {
                headerAdminDashboard.classList.add('hidden');
                founderEditBtn?.classList.add('hidden');
            }
        } else {
            authModalLink.classList.remove('hidden');
            userProfileHeader.classList.add('hidden');
            headerAdminDashboard.classList.add('hidden');
            founderEditBtn?.classList.add('hidden');
        }
    }

    document.getElementById('header-mypage-btn')?.addEventListener('click', () => {
        companionLounge.classList.add('open');
        const user = JSON.parse(localStorage.getItem('theround_logged_in_user'));
        if (user) {
            document.getElementById('card-user-name').textContent = user.name;
            document.getElementById('card-join-date').textContent = user.date || '2026. 06. 03';
        }
        // Reset password change section visibility when opening dashboard
        document.getElementById('edit-profile-section')?.classList.add('hidden');
    });

    // --- Profile Edit (Password Change) Logic ---
    const btnShowEdit = document.getElementById('btn-show-edit-profile');
    const btnCancelEdit = document.getElementById('btn-cancel-edit-profile');
    const editProfileSec = document.getElementById('edit-profile-section');
    const changePwForm = document.getElementById('change-pw-form');

    btnShowEdit?.addEventListener('click', () => {
        editProfileSec?.classList.toggle('hidden');
        if (!editProfileSec?.classList.contains('hidden')) {
            editProfileSec.scrollIntoView({ behavior: 'smooth' });
        }
    });

    btnCancelEdit?.addEventListener('click', () => {
        editProfileSec?.classList.add('hidden');
        changePwForm?.reset();
    });

    changePwForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPwInput = document.getElementById('current-pw').value;
        const newPwInput = document.getElementById('new-pw').value;
        const confirmPwInput = document.getElementById('confirm-new-pw').value;

        const loggedInUser = JSON.parse(localStorage.getItem('theround_logged_in_user'));
        if (!loggedInUser) return;

        // Find user in the full users list to verify current password and update
        let users = JSON.parse(localStorage.getItem('theround_users') || '[]');
        const userIdx = users.findIndex(u => u.email === loggedInUser.email);

        if (userIdx === -1) {
            alert('사용자 정보를 찾을 수 없습니다.');
            return;
        }

        // Verify current password
        if (users[userIdx].pw !== currentPwInput) {
            alert('현재 비밀번호가 일치하지 않습니다.');
            return;
        }

        // Validate new password
        if (newPwInput !== confirmPwInput) {
            alert('새 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (newPwInput === currentPwInput) {
            alert('새 비밀번호는 현재 비밀번호와 달라야 합니다.');
            return;
        }

        // Update password
        users[userIdx].pw = newPwInput;
        localStorage.setItem('theround_users', JSON.stringify(users));
        
        // Update logged in user session (though session usually doesn't store PW, let's be safe)
        loggedInUser.pw = newPwInput;
        localStorage.setItem('theround_logged_in_user', JSON.stringify(loggedInUser));

        alert('비밀번호가 성공적으로 변경되었습니다!');
        changePwForm.reset();
        editProfileSec.classList.add('hidden');
    });

    headerAdminDashboard?.addEventListener('click', () => {
        adminPanel.classList.add('open');
        renderAdminStories();
    });

    document.getElementById('dashboard-modal-close')?.addEventListener('click', () => {
        adminPanel.classList.remove('open');
    });

    companionLounge?.querySelector('.modal-close')?.addEventListener('click', () => {
        companionLounge.classList.remove('open');
    });

    authModalLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const user = localStorage.getItem('theround_logged_in_user');
        if (user) {
            if (confirm('로그아웃 하시겠습니까?')) {
                localStorage.removeItem('theround_logged_in_user');
                location.reload();
            }
        } else {
            authModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    authModalClose?.addEventListener('click', () => {
        authModal.classList.remove('open');
        document.body.style.overflow = '';
    });

    tabLogin?.addEventListener('click', () => {
        tabLogin.classList.add('active'); tabSignup.classList.remove('active');
        loginContainer.classList.remove('hidden'); signupContainer.classList.add('hidden');
    });

    tabSignup?.addEventListener('click', () => {
        tabSignup.classList.add('active'); tabLogin.classList.remove('active');
        signupContainer.classList.remove('hidden'); loginContainer.classList.add('hidden');
    });

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const pass = document.getElementById('login-password').value;

        if ((email === 'gotwha' || email === 'gotwha@theround.kr') && pass === 'aledma12!!@@') {
            const masterAdmin = { id: 'admin-0', name: '최고관리자', email: 'gotwha', role: 'admin' };
            localStorage.setItem('theround_logged_in_user', JSON.stringify(masterAdmin));
            alert('관리자 마스터 계정으로 로그인되었습니다.');
            location.reload();
            return;
        }

        const users = JSON.parse(localStorage.getItem('theround_users') || '[]');
        const found = users.find(u => u.email.toLowerCase() === email && u.pw === pass);
        if (found) {
            localStorage.setItem('theround_logged_in_user', JSON.stringify(found));
            alert(`${found.name}님, 반갑습니다!`);
            location.reload();
        } else {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    });

    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pw = document.getElementById('signup-password').value;
        const pwConfirm = document.getElementById('signup-password-confirm').value;
        const users = JSON.parse(localStorage.getItem('theround_users') || '[]');

        if (pw !== pwConfirm) { alert('비밀번호가 일치하지 않습니다.'); return; }
        if (users.find(u => u.email === email)) { alert('이미 가입된 이메일입니다.'); return; }

        const newUser = { 
            id: Date.now(), name, email, pw, 
            role: email === 'gotwha@theround.kr' || email === 'gotwha' ? 'admin' : 'user',
            date: new Date().toLocaleDateString()
        };
        users.push(newUser);
        localStorage.setItem('theround_users', JSON.stringify(users));
        localStorage.setItem('theround_logged_in_user', JSON.stringify(newUser));
        alert('회원가입이 완료되었습니다!');
        location.reload();
    });

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('theround_logged_in_user');
        location.reload();
    });

    // ==========================================================================
    // 3. News & Stories Strategic Content
    // ==========================================================================

    const storiesGrid = document.getElementById('stories-grid');
    const adminStoriesTbody = document.getElementById('admin-story-list-tbody');
    const writeModal = document.getElementById('story-write-modal');
    const writeForm = document.getElementById('story-write-form');
    const addStoryBtn = document.getElementById('admin-add-story-btn');
    const writeModalClose = document.getElementById('write-modal-close');

    let showAllStories = false;
    const btnViewAllStories = document.getElementById('btn-view-all-stories');

    const defaultStories = [
        { 
            id: 1, 
            date: '2026. 06. 01', 
            title: '남북청년 리더십 아카데미: 한반도의 미래를 디자인하는 청년 리더 육성', 
            excerpt: '단순한 정착을 넘어, 남북 청년들이 각자의 전문성을 바탕으로 우리 사회의 갈등을 조율하고 새로운 가치를 창출하는 핵심 리더로 성장합니다.', 
            img: 'assets/story_academy_censored.png', 
            content: `
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
                <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">남북 청년들이 우리 사회의 수혜자에 머물지 않고, 적극적으로 사회 문제 해결에 참여하는 '주권자'로 거듭나도록 돕는 고도화된 실무 교육 과정입니다.</p>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
                <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
                    <li>전문가 멘토링을 통한 구체적 진로 및 리더십 로드맵 설계</li>
                    <li>정책 제안 및 프로젝트 기획 등 실질적인 사회 문제 해결 역량 강화</li>
                    <li>출신 배경을 넘어 서로의 강점을 결합하는 시너지 효과 창출</li>
                </ul>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
                <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"아카데미를 수료한 청년들은 각자의 자리에서 작은 통일을 실천하는 변화의 주역이 될 것입니다. 이들이 빚어낼 한반도의 새로운 청사진을 기대합니다."</p>
            `
        },
        { 
            id: 2, 
            date: '2026. 05. 20', 
            title: '스포츠 활동 "UniOne FC": 그라운드 위에서 증명하는 통합의 가능성', 
            excerpt: '땀 흘리며 달리는 90분. 스포츠라는 보편적인 언어를 통해 심리적 경계를 허물고, 서로를 동등한 팀원으로 긍정하는 화합의 장입니다.', 
            img: 'assets/story_soccer_censored.png', 
            content: `
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
                <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">말보다는 행동과 땀방울이 때로는 더 큰 이해를 낳습니다. 축구를 매개로 남북 청년들이 한 팀이 되어 상호 신뢰와 협동심을 기르는 역동적인 소통 프로그램입니다.</p>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
                <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
                    <li>긴박한 경기 상황 속에서 자연스럽게 체득하는 상호 존중과 신뢰</li>
                    <li>규칙 준수와 페어플레이를 통한 성숙한 공동체 의식 함양</li>
                    <li>건강한 신체 활동을 통한 스트레스 해소 및 정서적 안정 도모</li>
                </ul>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
                <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"운동장에서 우리는 북한 출신, 남한 출신이 아닌 오직 승리를 위해 함께 달리는 동료일 뿐입니다. 이 작은 그라운드가 곧 우리가 꿈꾸는 통합된 사회의 축소판입니다."</p>
            `
        },
        { 
            id: 3, 
            date: '2026. 05. 12', 
            title: '더라운드 정기 송년회: 따뜻한 환대 속에서 다지는 연대의 힘', 
            excerpt: '서로의 일상을 지지하고 외로움을 극복할 수 있도록, 함께 음식을 나누고 한 해를 돌아보며 누구도 소외되지 않는 가족 같은 공동체를 만듭니다.', 
            img: 'assets/story_gathering_censored.png', 
            content: `
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
                <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">낯선 사회에서의 정착 과정은 종종 깊은 외로움을 동반합니다. 명절이나 연말연시, 함께 온기를 나눌 수 있는 든든한 '식구(食口)'가 되어주기 위한 정서적 안전망 구축 활동입니다.</p>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
                <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
                    <li>따뜻한 식사 공유를 통한 정서적 소외감 해소 및 심리적 안정 제공</li>
                    <li>정착 선배들의 진솔한 경험담 공유를 통한 실질적인 삶의 지혜 전수</li>
                    <li>자발적인 참여와 봉사로 이루어지는 자생적이고 건강한 커뮤니티 형성</li>
                </ul>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
                <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"서로의 온기를 나누는 이 작은 모임들이 모여, 어떤 어려움 앞에서도 쉽게 무너지지 않는 가장 견고한 사회적 지지망이 될 것이라 확신합니다."</p>
            `
        },
        { 
            id: 4, 
            date: '2026. 05. 05', 
            title: '인식 개선 캠페인 "공존의 길": 지역 사회의 포용력을 넓히다', 
            excerpt: '남북 청년들이 직접 기획한 캠페인을 통해 지역 주민들과 직접 만나 소통하며, 낡은 편견을 건강하고 열린 시각으로 디자인하는 퍼블릭 리더십 활동입니다.', 
            img: 'assets/story_cafe_censored.png', 
            content: `
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[활동 취지]</h4>
                <p style="margin-bottom: 2rem; color: var(--color-text-primary); line-height: 1.8;">통합은 일방적인 과정이 아니라 지역 공동체의 '상호 수용성'에 달려 있습니다. 이웃과 직접 마주하며 오해를 이해로 바꾸는 시민 참여형 인식 개선 프로그램입니다.</p>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[긍정적 임팩트]</h4>
                <ul style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 2; color: var(--color-text-primary);">
                    <li>지역 주민들과의 문턱 없는 스킨십을 통한 심리적 장벽 완화</li>
                    <li>북한이탈주민에 대한 막연한 편견을 객관적 사실과 공감으로 전환</li>
                    <li>참여 청년들에게는 사회 구성원으로서의 당당함과 효능감 부여</li>
                </ul>
                
                <h4 style="color: var(--color-primary); margin-bottom: 1.2rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; font-size: 1.2rem;">[더라운드의 비전]</h4>
                <p style="background: var(--color-bg-alt); padding: 1.5rem; border-radius: 12px; font-style: italic; color: var(--color-text-muted);">"인식의 변화는 소박하고 진정성 있는 대화에서 피어납니다. 지역 사회와 다리를 놓는 이 캠페인들이 모여 우리 사회 전체의 포용력을 넓히는 마중물이 될 것입니다."</p>
            `
        }
    ];

    if (!localStorage.getItem('theround_stories')) {
        localStorage.setItem('theround_stories', JSON.stringify(defaultStories));
    }

    function renderStories() {
        if (!storiesGrid) return;
        const stories = JSON.parse(localStorage.getItem('theround_stories') || '[]');
        if (stories.length === 0) {
            storiesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--color-text-muted);">등록된 소식이 없습니다.</div>';
            if (btnViewAllStories) btnViewAllStories.style.display = 'none';
            return;
        }

        const displayList = showAllStories ? stories : stories.slice(0, 4);

        storiesGrid.innerHTML = displayList.map(s => `
            <article class="story-card highlight-card reveal-on-scroll" data-id="${s.id}" style="display: flex; flex-direction: column; height: 100%;">
                <div class="story-img-wrap clickable-detail-area" style="cursor: pointer; position: relative; padding-top: 60%; overflow: hidden; border-radius: 12px 12px 0 0;">
                    <img src="${s.img}" alt="${s.title}" class="story-img" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onerror="this.src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop'">
                    <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.03); pointer-events: none;"></div>
                </div>
                <div class="story-content" style="padding: 1.8rem; flex-grow: 1; display: flex; flex-direction: column;">
                    <div class="story-meta" style="margin-bottom: 1rem;">
                        <span class="story-date" style="font-size: 0.85rem; color: var(--color-primary); font-weight: 800; letter-spacing: 0.02em;">${s.date}</span>
                    </div>
                    <h3 class="story-title clickable-detail-area" style="cursor: pointer; font-size: 1.25rem; line-height: 1.5; margin-bottom: 1.2rem; color: var(--color-text-primary); font-weight: 700; word-break: keep-all; transition: color 0.3s ease;">${s.title}</h3>
                    <p class="story-excerpt" style="font-size: 1rem; line-height: 1.7; color: var(--color-text-muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-top: auto;">${s.excerpt}</p>
                </div>
            </article>
        `).join('');
        document.querySelectorAll('#stories-grid .reveal-on-scroll').forEach(el => revealObserver.observe(el));
        document.querySelectorAll('.clickable-detail-area').forEach(el => {
            el.addEventListener('click', () => { showStoryDetail(el.closest('.story-card').getAttribute('data-id')); });
        });

        if (btnViewAllStories) {
            btnViewAllStories.textContent = showAllStories ? '간략히 보기' : '전체 소식 보기';
            btnViewAllStories.style.display = stories.length <= 4 ? 'none' : 'inline-block';
        }
    }

    btnViewAllStories?.addEventListener('click', () => {
        showAllStories = !showAllStories;
        renderStories();
    });

    const detailModal = document.getElementById('detail-modal');
    const modalContentArea = document.getElementById('modal-content-area');

    function showStoryDetail(id) {
        const stories = JSON.parse(localStorage.getItem('theround_stories') || '[]');
        const s = stories.find(item => item.id == id);
        if (!s) return;
        modalContentArea.innerHTML = `
            <div class="modal-article" style="max-width: 800px; margin: 0 auto; padding: 1.5rem 1rem;">
                <header class="modal-article-header" style="margin-bottom: 3rem; border-bottom: 2px solid var(--color-primary); padding-bottom: 2rem;">
                    <div class="meta" style="color: var(--color-primary); font-weight: 900; font-size: 0.95rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.8rem;">
                        <span style="background: var(--color-primary); color: white; padding: 0.2rem 0.6rem; border-radius: 4px;">활동 기록</span><span>${s.date}</span>
                    </div>
                    <h2 class="title" style="font-size: 2.2rem; line-height: 1.35; color: var(--color-text-primary); word-break: keep-all; font-weight: 800;">${s.title}</h2>
                </header>
                <div class="modal-article-img" style="margin-bottom: 3.5rem; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.12);">
                    <img src="${s.img}" alt="${s.title}" style="width: 100%; height: auto; max-height: 550px; object-fit: cover; display: block;">
                </div>
                <div class="modal-article-body" style="font-size: 1.15rem; line-height: 2; color: var(--color-text-primary);">${s.content}</div>
                <footer style="margin-top: 5rem; padding: 3rem 2rem; background: var(--color-bg-alt); border-radius: 16px; text-align: center;">
                    <h5 style="margin-bottom: 1rem; font-size: 1.2rem; color: var(--color-primary);">"미래를 함께 디자인하는 더라운드"</h5>
                    <p style="color: var(--color-text-muted); font-size: 1rem; line-height: 1.6;">더라운드는 단순한 지원을 넘어 실질적인 변화를 만듭니다.</p>
                </footer>
            </div>
        `;
        detailModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // ==========================================================================
    // 4. Hanbando Designer System & Management
    // ==========================================================================

    const designersGrid = document.getElementById('designers-grid');
    const designerDetailModal = document.getElementById('designer-detail-modal');
    const designerDetailContent = document.getElementById('designer-detail-content');

    const defaultDesigners = [
        {
            id: 'des-0', img: 'assets/김은주.jpg',
            ko: { name: '김은주', tag: '작가·인권활동가', slogan: '"열한 살의 유서에서 전 세계를 울린 희망의 작가로"', specialty: '북한 인권 실상 증언 / 글로벌 인권 소통 / 회고록 집필', bio: '김은주 작가는 1986년 북한 함경북도에서 태어나 고난의 행군 시기 극심한 기아를 겪었습니다. 11살의 나이에 굶주림 속에서 썼던 유서의 기억을 담은 회고록 《열한 살의 유서》(A Thousand Miles to Freedom)를 통해 전 세계에 북한의 실상을 알렸습니다. 현재는 국제 무대에서 북한 주민들의 자유와 인권을 위해 목소리를 내고 있습니다.', career: '• 서강대학교 중국문화학과 졸업\n• 회고록 《열한 살의 유서》 8개 국어 번역 및 베스트셀러 달성\n• 통일부 북한인권증진위원\n• 북한이탈주민 글로벌교육센터(FSI) 간사\n• 유엔(UN) 본부 및 제네바 인권이사회 증언\n• 다큐멘터리 《비욘드 유토피아》 출연' },
            en: { name: 'Kim Eun-ju', tag: 'Author · Human Rights Activist', slogan: '"From writing a will at age 11 to becoming a global messenger of hope"', specialty: 'North Korea Human Rights Testimony / Global Communication / Memoir Writing', bio: 'Author Kim Eun-ju was born in 1986 in North Korea and experienced extreme famine during the Arduous March. Through her memoir "A Thousand Miles to Freedom", she informed the world of the reality of North Korea. Currently, she raises her voice for the freedom and human rights of North Korean residents on the international stage.', career: '• Graduated from Sogang University\n• Memoir "A Thousand Miles to Freedom" translated into 8 languages\n• Member of the North Korean Human Rights Promotion Committee\n• Manager at Freedom Speakers International (FSI)\n• Testified at UN Headquarters and Geneva Human Rights Council' }
        },
        {
            id: 'des-1', img: 'assets/이영현.jpg',
            ko: { name: '이영현', tag: '변호사·인권가', slogan: '"법률의 시선으로 남북의 마음을 잇는 변호사"', specialty: '탈북민 법률 자문 / 북한 인권 정책', bio: '대한민국 1호 탈북민 변호사로서 법률적 전문성을 바탕으로 우리 사회 정착 과정의 실질적인 갈등을 해결하며, 보편적 인권과 통합의 가치를 새롭게 디자인합니다.', career: '• 법무법인 이래 파트너 변호사\n• 대한변협 인권재단 사무총장\n• KIS(Korea Internet Studio) 대표\n• 제8회 변호사시험 합격 / 연세대 법대 졸' },
            en: { name: 'Lee Young-hyun', tag: 'Lawyer · Human Rights', slogan: '"A Lawyer Connecting Hearts Through the Lens of Law"', specialty: 'Legal Counseling for Defectors / Human Rights Policy', bio: 'As the first North Korean defector lawyer in South Korea, he designs new values of universal human rights and integration by resolving practical conflicts in the settlement process based on legal expertise.', career: '• Partner Lawyer, Irae Law Firm\n• Secretary General, KBA Human Rights Foundation\n• CEO, KIS (Korea Internet Studio)\n• Passed the 8th Bar Exam / Yonsei Univ. Law Graduate' }
        },
        {
            id: 'des-2', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
            ko: { name: '정유나', tag: '방송인·유튜버', slogan: '"북한의 진실을 세계에 전하는 글로벌 디자이너"', specialty: '북한 실상 증언 / 글로벌 인권 소통', bio: '뛰어난 영어 실력과 대중적인 입담을 겸비한 인권 활동가로, 다양한 미디어를 통해 북한의 실상을 알리고 남북한 사이의 편견을 해소하는 활동을 합니다.', career: '• 유튜브 "정유나 TV" 운영 (구독자 30만+)\n• 채널A "이제 만나러 갑니다" 고정 출연\n• 투자자 짐 로저스 방한 전담 통역\n• 북한 인권 운동 및 국제 강연 다수' },
            en: { name: 'Jung Yu-na', tag: 'Broadcaster · YouTuber', slogan: '"Global Designer Telling the Truth of North Korea to the World"', specialty: 'North Korea Reality Testimony / Global Communication', bio: 'A human rights activist with excellent English skills and engaging talk, she works to inform the world about the reality of North Korea and resolve prejudices between the two Koreas through various media.', career: '• YouTuber "Jung Yu-na TV" (300k+ subscribers)\n• Regular on "Now on My Way to Meet You"\n• Exclusive Interpreter for Jim Rogers\' visit to Korea\n• International Lectures on Human Rights' }
        },
        {
            id: 'des-3', img: 'assets/김아라.jpg',
            ko: { name: '김아라', tag: '배우·방송인', slogan: '"예술을 통해 남북의 거리를 좁히는 화합의 아이콘"', specialty: '남북 문화 예술 / 미디어 속 북한 이미지', bio: '영화와 드라마를 넘나드는 배우로서, 문화 예술 콘텐츠가 가진 정서적 힘을 활용해 남북한 주민들이 서로를 따뜻하게 이해하도록 돕습니다.', career: '• 드라마 "사랑의 불시착" 출연 (사택 마을 주민)\n• 웹드라마 "아는 사람" 여주인공 역\n• 채널A "이제 만나러 갑니다" 메인 출연\n• 남북 문화 예술 교류 홍보대사 활동' },
            en: { name: 'Kim A-ra', tag: 'Actress · Broadcaster', slogan: '"Icon of Harmony Closing the Gap Through Art"', specialty: 'Inter-Korean Cultural Arts / North Korea in Media', bio: 'As an actress in films and dramas, she uses the emotional power of cultural content to help North and South Korean residents understand each other warmly.', career: '• Appeared in "Crash Landing on You"\n• Lead in web drama "Someone I Know"\n• Regular on "Now on My Way to Meet You"\n• Ambassador for Cultural Exchange' }
        },
        {
            id: 'des-4', img: 'assets/박유성.jpg',
            ko: { name: '박유성', tag: '감독·유튜버', slogan: '"미디어의 프레임을 넘어 새로운 북한을 그리는 감독"', specialty: '영상 서사 분석 / 미디어 편견 해소', bio: '영화를 전공한 전문가의 시각으로 북한을 재해석하며, 자극적인 이미지를 넘어 생생한 삶의 이야기를 영상과 강연으로 디자인합니다.', career: '• 유튜브 "북한남자" 채널 운영 및 기획\n• 다큐멘터리 영화 "메콩강에 악어가 산다" 감독\n• 동국대학교 영화영상학과 전공\n• 최근 사회 공헌 및 정책 참여 활동' },
            en: { name: 'Park Yu-sung', tag: 'Director · YouTuber', slogan: '"Director Drawing New North Korea Beyond Media Frames"', specialty: 'Media Narrative Analysis / Resolving Prejudices', bio: 'Reinterpreting North Korea through professional cinematic perspectives, he designs vivid stories beyond provocative images through film and lectures.', career: '• YouTuber "North Korean Guy" Channel\n• Director of "Crocodiles Live in the Mekong River"\n• Dongguk Univ. Film & Video Major\n• Policy Participation and Social Contribution' }
        },
        {
            id: 'des-5', img: 'assets/김소연.webp',
            ko: { name: '김소연', tag: '가수·뮤지션', slogan: '"목소리로 한반도의 희망을 노래하는 뮤지션"', specialty: '정서적 통합 음악 / 고난 극복 서사', bio: '역경을 딛고 일어선 개인의 삶을 음악에 담아 전달하며, 남북한이 공통으로 느끼는 보편적 감수성을 통해 하나 됨을 이끌어냅니다.', career: '• TV조선 "미스트롯 3" 최종 6위\n• "탈북 심청이" 별명으로 트로트 가수 활동\n• MBN "특종세상" 등 다수 방송 출연\n• 전국 희망 콘서트 및 정착 강연 진행' },
            en: { name: 'Kim So-yeon', tag: 'Singer · Musician', slogan: '"Musician Singing the Hope of the Peninsula with Her Voice"', specialty: 'Emotional Integration Music / Narrative of Overcoming Adversity', bio: 'She conveys her personal life story of rising from adversity through music, leading to unity through the universal sensitivity shared by both Koreas.', career: '• Final 6th place, TV Chosun "Miss Trot 3"\n• Active as a trot singer nicknamed "North Korean Sim-cheong"\n• Appeared in numerous broadcasts including MBN "Special World"\n• Conducted nation-wide hope concerts and settlement lectures' }
        },
        {
            id: 'des-6', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
            ko: { name: '나민희', tag: '유튜버·엘리트', slogan: '"우리가 몰랐던 진짜 평양의 일상을 전하는 디자이너"', specialty: '평양 상류층 문화 / 북한 엘리트 교육', bio: '유럽 유학 및 북한 엘리트 집안의 경험을 바탕으로, 기존의 고정관념에서 벗어난 세련되고 정확한 평양의 실상을 대중에게 전달합니다.', career: '• 유튜브 "평양여자 나민희" 채널 운영\n• 유럽(몰타) 유학 및 파견 근무 경험\n• 이화여자대학교 정치외교학과 재학\n• 방송 "이제 만나러 갑니다" 전문 패널' },
            en: { name: 'Na Min-hui', tag: 'YouTuber · Elite', slogan: '"Designer Delivering the Real Daily Life of Pyongyang We Never Knew"', specialty: 'Pyongyang Upper-Class Culture / North Korean Elite Education', bio: 'Based on her experience of studying in Europe and being part of a North Korean elite family, she delivers the sophisticated and accurate reality of Pyongyang, breaking away from existing stereotypes.', career: '• Operating YouTube channel "Pyongyang Woman Na Min-hui"\n• Experience studying in Europe (Malta) and overseas assignments\n• Student at Ewha Womans University, Dept. of Political Science & International Relations\n• Expert panelist on "Now on My Way to Meet You"' }
        },
        {
            id: 'des-7', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
            ko: { name: '김강혁', tag: '방송인·활동가', slogan: '"북한의 체제 모순을 넘어 자유의 가치를 증언하는 청년"', specialty: '북한 사회 체제 분석 / 군대 실상 교육', bio: '북한 내부의 생생한 군 조직 생활과 사회 체제를 날카롭게 분석하며, 남북 청년들이 함께 가져야 할 자유와 민주주의의 가치를 강연합니다.', career: '• 채널A "이제 만나러 갑니다" 정규 출연\n• 북한 인권 개선 캠페인 및 활동가\n• 공공기관/학교 대상 통일 안보 강사\n• 다수의 사회 정책 포럼 발제자' },
            en: { name: 'Kim Kang-hyeok', tag: 'Broadcaster · Activist', slogan: '"Youth Witnessing the Value of Freedom Beyond the Contradictions of the North Korean System"', specialty: 'North Korean Social System Analysis / Reality of Military Life', bio: 'He sharply analyzes the vivid organizational life and social system within North Korea, lecturing on the values of freedom and democracy that youth from both Koreas should share.', career: '• Regular on Channel A "Now on My Way to Meet You"\n• North Korean human rights improvement campaigner and activist\n• Unification and security lecturer for public institutions/schools\n• Presenter at numerous social policy forums' }
        },
        {
            id: 'des-8', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
            ko: { name: '이은평', tag: '방송인·분석가', slogan: '"핵시설 부대 출신의 눈으로 본 국제 정세 전문가"', specialty: '북한 국방 기술 / 러시아 파병 실상', bio: '북한 특수 공병 부대 근무 및 러시아 파병 경험을 토대로, 현재 급변하는 한반도 안보 상황과 국제 정세의 이면을 생생하게 해설합니다.', career: '• 북한군 131부대(핵시설 건설) 근무\n• 러시아 파병 근무 중 탈북 및 한국 입국\n• 파병 북한군 지원 캠페인 및 스피치 활동\n• 채널A "이제 만나러 갑니다" 출연' },
            en: { name: 'Lee Eun-pyeong', tag: 'Broadcaster · Analyst', slogan: '"International Affairs Expert from the Eyes of a Nuclear Facility Unit Veteran"', specialty: 'North Korean Defense Technology / Reality of Deployment to Russia', bio: 'Based on his experience serving in a North Korean special engineering unit and deployment to Russia, he provides vivid commentary on the rapidly changing security situation on the Korean Peninsula and the hidden side of international affairs.', career: '• Served in North Korean Unit 131 (Nuclear facility construction)\n• Defected during deployment to Russia and entered South Korea\n• Campaigner and speaker supporting deployed North Korean soldiers\n• Appeared on Channel A "Now on My Way to Meet You"' }
        }
    ];

    if (!localStorage.getItem('theround_unified_designers')) {
        localStorage.setItem('theround_unified_designers', JSON.stringify(defaultDesigners));
    } else {
        let currentDs = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        
        // Force merge all default designers to restore any missing ones
        defaultDesigners.forEach(defD => {
            const exists = currentDs.find(d => d.ko && d.ko.name === defD.ko.name);
            if (!exists) {
                defD.visible = true; // Set as visible by default
                currentDs.push(defD);
            }
        });
        
        // Ensure Kim Eun-ju is at the top
        const eunjuIdx = currentDs.findIndex(d => d.ko && d.ko.name === '김은주');
        if (eunjuIdx > 0) {
            const eunju = currentDs.splice(eunjuIdx, 1)[0];
            currentDs.unshift(eunju);
        }

        // Deduplicate currentDs by ko.name to completely eliminate duplicate designer bugs
        const uniqueDs = [];
        const seenNames = new Set();
        currentDs.forEach(d => {
            if (d.ko && d.ko.name) {
                if (!seenNames.has(d.ko.name)) {
                    seenNames.add(d.ko.name);
                    uniqueDs.push(d);
                }
            } else {
                uniqueDs.push(d);
            }
        });
        currentDs = uniqueDs;

        // Reassign unique IDs sequentially to completely eliminate duplicate ID bugs
        currentDs.forEach((d, idx) => {
            d.id = 'des-' + idx;
        });

        localStorage.setItem('theround_unified_designers', JSON.stringify(currentDs));
    }

    let showAllDesigners = false;
    const btnViewAll = document.getElementById('btn-view-all-designers');

    function renderDesigners() {
        if (!designersGrid) return;
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        const visibleDesigners = designers.filter(d => d.visible !== false);
        const displayList = showAllDesigners ? visibleDesigners : visibleDesigners.slice(0, 4);
        
        designersGrid.innerHTML = displayList.map(d => `
            <div class="designer-card highlight-card reveal-on-scroll" data-id="${d.id}">
                <div class="designer-img-wrapper clickable-detail" style="cursor: pointer;">
                    <img src="${d.img}" alt="${d.ko.name}" class="designer-img" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${d.ko.name}') + '&background=f44336&color=fff&size=512'">
                    <div class="img-overlay"><span class="view-text">프로필 보기</span></div>
                </div>
                <div class="designer-info">
                    <span class="designer-tag">${d.ko.tag}</span>
                    <h3 class="designer-name">${d.ko.name}</h3>
                    <p class="designer-slogan">${d.ko.slogan}</p>
                </div>
            </div>
        `).join('');
        document.querySelectorAll('#designers-grid .reveal-on-scroll').forEach(el => revealObserver.observe(el));
        document.querySelectorAll('.clickable-detail').forEach(el => {
            el.addEventListener('click', () => { showDesignerDetail(el.closest('.designer-card').getAttribute('data-id')); });
        });

        if (btnViewAll) {
            btnViewAll.textContent = showAllDesigners ? '간략히 보기' : '전체 디자이너 보기';
            btnViewAll.style.display = visibleDesigners.length <= 4 ? 'none' : 'inline-block';
        }
        
        const bookDesignerSelect = document.getElementById('book-designer');
        if (bookDesignerSelect) {
            bookDesignerSelect.innerHTML = `<option value="">디자이너 선택 (또는 추천받기)</option><option value="추천 희망">분야에 맞는 디자이너 추천 희망</option>` + 
                designers.map(d => `<option value="${d.ko.name}">${d.ko.name} (${d.ko.tag})</option>`).join('');
        }
    }

    btnViewAll?.addEventListener('click', () => {
        showAllDesigners = !showAllDesigners;
        renderDesigners();
    });

    function showDesignerDetail(id) {
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        const d = designers.find(item => String(item.id) === String(id));
        if (!d) return;
        designerDetailContent.innerHTML = `
            <div class="detail-layout">
                <div class="detail-header">
                    <div class="detail-img-wrap"><img src="${d.img}" alt="${d.ko.name}"></div>
                    <div class="detail-title-info">
                        <span class="designer-tag">${d.ko.tag}</span>
                        <h2 class="detail-name">${d.ko.name}</h2>
                        <p class="designer-slogan">${d.ko.slogan}</p>
                        <div class="designer-specialty-box"><span class="specialty-text">전문 분야: ${d.ko.specialty}</span></div>
                    </div>
                </div>
                <div class="detail-body">
                    <div class="detail-section"><h4>[소개]</h4><p class="designer-bio">${d.ko.bio}</p></div>
                    <div class="detail-section"><h4>[주요 경력]</h4><p class="designer-career" style="white-space: pre-line;">${d.ko.career}</p></div>
                    <button class="btn btn-primary btn-block open-booking-modal-from-detail" style="margin-top: 2rem;">강연 의뢰하기</button>
                </div>
            </div>
        `;
        designerDetailModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        designerDetailContent.querySelector('.open-booking-modal-from-detail').addEventListener('click', () => {
            designerDetailModal.classList.remove('open'); bookingModal.classList.add('open');
        });
    }

    function renderAdminDesignerList() {
        const tbody = document.getElementById('admin-designer-list-tbody');
        if (!tbody) return;
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        tbody.innerHTML = designers.map((d, index) => `
            <tr>
                <td style="width: 60px;">
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <button class="btn-reorder move-up" data-index="${index}" ${index === 0 ? 'disabled' : ''} style="padding: 2px 4px; font-size: 10px; cursor: pointer;">▲</button>
                        <button class="btn-reorder move-down" data-index="${index}" ${index === designers.length - 1 ? 'disabled' : ''} style="padding: 2px 4px; font-size: 10px; cursor: pointer;">▼</button>
                    </div>
                </td>
                <td><img src="${d.img}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; opacity: ${d.visible !== false ? '1' : '0.3'}"></td>
                <td><strong>${d.ko.name}</strong><br><span style="font-size:0.8rem; color:var(--color-text-muted);">${d.ko.tag}</span></td>
                <td>
                    <span class="res-type" style="background: ${d.visible !== false ? 'var(--color-primary)' : '#999'}">
                        ${d.visible !== false ? '노출중' : '숨김'}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 5px;">
                        <button class="btn btn-sm btn-outline edit-designer" data-id="${d.id}">수정</button>
                        <button class="btn btn-sm btn-outline toggle-vis" data-id="${d.id}">${d.visible !== false ? '숨기기' : '보이기'}</button>
                    </div>
                </td>
            </tr>
        `).join('');
        tbody.querySelectorAll('.move-up').forEach(btn => btn.addEventListener('click', () => moveDesigner(parseInt(btn.dataset.index), parseInt(btn.dataset.index) - 1)));
        tbody.querySelectorAll('.move-down').forEach(btn => btn.addEventListener('click', () => moveDesigner(parseInt(btn.dataset.index), parseInt(btn.dataset.index) + 1)));
        tbody.querySelectorAll('.toggle-vis').forEach(btn => btn.addEventListener('click', () => toggleDesignerVisibility(btn.dataset.id)));
        tbody.querySelectorAll('.edit-designer').forEach(btn => btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const ds = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
            const target = ds.find(i => String(i.id) === String(id));
            if (target) {
                const designerWriteModal = document.getElementById('designer-write-modal');
                document.getElementById('designer-modal-title').textContent = "디자이너 수정";
                document.getElementById('edit-designer-id').value = target.id;
                document.getElementById('designer-input-name').value = target.ko.name;
                document.getElementById('designer-input-tag').value = target.ko.tag;
                document.getElementById('designer-input-specialty').value = target.ko.specialty;
                document.getElementById('designer-input-slogan').value = target.ko.slogan || '';
                document.getElementById('designer-input-bio').value = target.ko.bio;
                document.getElementById('designer-input-career').value = target.ko.career || '';
                document.getElementById('designer-input-img').value = (target.img && target.img.startsWith('http')) ? target.img : '';
                designerWriteModal.classList.add('open');
            }
        }));
    }

    function moveDesigner(from, to) {
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        if (from >= 0 && from < designers.length && to >= 0 && to < designers.length) {
            const item = designers.splice(from, 1)[0];
            designers.splice(to, 0, item);
            localStorage.setItem('theround_unified_designers', JSON.stringify(designers));
            renderAdminDesignerList(); renderDesigners();
        }
    }

    function toggleDesignerVisibility(id) {
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        const targetIndex = designers.findIndex(item => String(item.id) === String(id));
        if (targetIndex !== -1) {
            designers[targetIndex].visible = designers[targetIndex].visible === false ? true : false;
            localStorage.setItem('theround_unified_designers', JSON.stringify(designers));
            renderAdminDesignerList(); renderDesigners();
        }
    }

    // ==========================================================================
    // 5. Admin Dashboard Tabs
    // ==========================================================================

    const adminTabStories = document.getElementById('admin-tab-stories');
    const adminTabUsers = document.getElementById('admin-tab-users');
    const adminTabDesigners = document.getElementById('admin-tab-designers');
    const adminTabRequests = document.getElementById('admin-tab-requests');
    const adminDesignersSection = document.getElementById('admin-designers-section');
    const adminRequestsSection = document.getElementById('admin-requests-section');
    const adminDesignerListTbody = document.getElementById('admin-designer-list-tbody');
    const adminRequestListTbody = document.getElementById('admin-request-list-tbody');
    const designerWriteModal = document.getElementById('designer-write-modal');
    const designerWriteForm = document.getElementById('designer-write-form');
    const adminAddDesignerBtn = document.getElementById('admin-add-designer-btn');

    function switchAdminTab(target) {
        [adminStoriesSec, adminDesignersSection, adminRequestsSection, adminUsersSec].forEach(s => s?.classList.add('hidden'));
        [adminTabStories, adminTabDesigners, adminTabRequests, adminTabUsers].forEach(t => t?.classList.remove('active'));

        if (target === 'stories') { adminTabStories?.classList.add('active'); adminStoriesSec?.classList.remove('hidden'); }
        if (target === 'designers') { adminTabDesigners?.classList.add('active'); adminDesignersSection?.classList.remove('hidden'); }
        if (target === 'requests') { adminTabRequests?.classList.add('active'); adminRequestsSection?.classList.remove('hidden'); }
        if (target === 'users') { adminTabUsers?.classList.add('active'); adminUsersSec?.classList.remove('hidden'); }
    }

    adminTabStories?.addEventListener('click', () => { switchAdminTab('stories'); renderAdminStories(); });
    adminTabUsers?.addEventListener('click', () => { switchAdminTab('users'); renderAdminUsers(); });
    adminTabDesigners?.addEventListener('click', () => { switchAdminTab('designers'); renderAdminDesignerList(); });
    adminTabRequests?.addEventListener('click', () => { switchAdminTab('requests'); renderAdminRequestList(); });

    function renderAdminStories() {
        if (!adminStoriesTbody) return;
        const stories = JSON.parse(localStorage.getItem('theround_stories') || '[]');
        adminStoriesTbody.innerHTML = stories.map(s => `<tr><td>${s.date}</td><td style="font-weight:700;">${s.title}</td><td><span class="res-type">활동</span></td><td><button class="btn btn-sm btn-outline edit-story" data-id="${s.id}">수정</button><button class="btn btn-sm btn-outline delete-story" data-id="${s.id}" style="color:var(--color-error);">삭제</button></td></tr>`).join('');
        adminStoriesTbody.querySelectorAll('.delete-story').forEach(btn => btn.addEventListener('click', () => {
            if(confirm('삭제하시겠습니까?')) {
                let ss = JSON.parse(localStorage.getItem('theround_stories') || '[]');
                ss = ss.filter(x => x.id != btn.dataset.id);
                localStorage.setItem('theround_stories', JSON.stringify(ss));
                renderAdminStories(); renderStories();
            }
        }));
    }

    function renderAdminRequestList() {
        if (!adminRequestListTbody) return;
        const requests = JSON.parse(localStorage.getItem('theround_lecture_requests') || '[]');
        adminRequestListTbody.innerHTML = requests.length === 0 ? '<tr><td colspan="5" style="text-align:center; padding:2rem;">접수된 의뢰가 없습니다.</td></tr>' : requests.map(r => `<tr><td>${new Date(r.timestamp).toLocaleDateString()}</td><td>${r.org}</td><td>${r.name}</td><td>대기중</td><td><button class="btn btn-sm btn-outline">상세보기</button></td></tr>`).join('');
    }

    function renderAdminUsers() {
        const usersTbody = document.getElementById('admin-user-list-tbody');
        const userCountSpan = document.getElementById('admin-total-user-count');
        if (!usersTbody) return;
        const users = JSON.parse(localStorage.getItem('theround_users') || '[]');
        if (userCountSpan) userCountSpan.textContent = users.length;
        usersTbody.innerHTML = users.map(u => `<tr><td>${u.date || '2026. 06. 03'}</td><td>${u.name}</td><td>${u.email}</td><td><span class="res-type ${u.role === 'admin' ? 'admin' : ''}">${u.role === 'admin' ? '관리자' : '일반회원'}</span></td></tr>`).join('');
    }

    // ==========================================================================
    // 6. Modal Interactions & Final Init
    // ==========================================================================

    // Global Modal Click-Outside to Close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    const bookingModal = document.getElementById('booking-modal');
    const bookingForm = document.getElementById('booking-form');
    const openBookingBtns = document.querySelectorAll('.open-booking-modal-btn, #nav-booking-btn');

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    document.getElementById('booking-modal-close')?.addEventListener('click', () => {
        bookingModal.classList.remove('open');
        document.body.style.overflow = '';
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const org = document.getElementById('book-org').value;
            const name = document.getElementById('book-name').value;
            const requests = JSON.parse(localStorage.getItem('theround_lecture_requests') || '[]');
            requests.unshift({ id: 'req-' + Date.now(), org, name, timestamp: new Date().toISOString(), status: '대기중' });
            localStorage.setItem('theround_lecture_requests', JSON.stringify(requests));
            alert(`강연 의뢰가 접수되었습니다! ${name}님(${org}), 조만간 연락드리겠습니다.`);
            bookingForm.reset();
            bookingModal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    adminAddDesignerBtn?.addEventListener('click', () => {
        designerWriteForm.reset();
        document.getElementById('edit-designer-id').value = '';
        document.getElementById('designer-modal-title').textContent = "새 디자이너 등록";
        designerWriteModal.classList.add('open');
    });

    document.getElementById('designer-write-modal-close')?.addEventListener('click', () => designerWriteModal.classList.remove('open'));
    document.getElementById('designer-write-cancel-btn')?.addEventListener('click', () => designerWriteModal.classList.remove('open'));

    designerWriteForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-designer-id').value;
        const name = document.getElementById('designer-input-name').value;
        const tag = document.getElementById('designer-input-tag').value;
        const specialty = document.getElementById('designer-input-specialty').value;
        const slogan = document.getElementById('designer-input-slogan').value;
        const bio = document.getElementById('designer-input-bio').value;
        const career = document.getElementById('designer-input-career').value;
        const urlImg = document.getElementById('designer-input-img').value;
        const fileInput = document.getElementById('designer-input-file');

        let ds = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        let finalImg = urlImg;

        let existing = null;
        if (id) {
            existing = ds.find(i => String(i.id) === String(id));
        }

        if (id && !finalImg && (!fileInput.files || !fileInput.files[0])) {
            if (existing) finalImg = existing.img;
        }

        if (fileInput.files && fileInput.files[0]) {
            finalImg = await new Promise((res) => {
                const r = new FileReader(); r.onload = (ev) => res(ev.target.result); r.readAsDataURL(fileInput.files[0]);
            });
        }

        if (!finalImg) {
            finalImg = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=f44336&color=fff';
        }

        const data = {
            id: id || 'des-' + Date.now(), 
            img: finalImg,
            visible: existing ? existing.visible : true,
            ko: { name, tag, slogan: slogan || `"${name} 디자이너"`, specialty, bio, career },
            en: existing && existing.en ? existing.en : { name, tag, slogan: slogan || `"${name} Designer"`, specialty, bio, career }
        };

        if (id) { 
            const idx = ds.findIndex(i => String(i.id) === String(id)); 
            if (idx !== -1) ds[idx] = data; 
        } else {
            ds.unshift(data);
        }

        localStorage.setItem('theround_unified_designers', JSON.stringify(ds));
        alert('저장되었습니다.');
        designerWriteModal.classList.remove('open');
        renderAdminDesignerList(); renderDesigners();
    });

    addStoryBtn?.addEventListener('click', () => {
        writeForm.reset();
        document.getElementById('edit-story-id').value = '';
        document.getElementById('write-modal-title').textContent = "새 소식 등록";
        writeModal.classList.add('open');
    });

    document.getElementById('write-modal-close')?.addEventListener('click', () => writeModal.classList.remove('open'));
    document.getElementById('story-write-cancel-btn')?.addEventListener('click', () => writeModal.classList.remove('open'));

    const founderFileInput = document.getElementById('founder-file-input');
    document.getElementById('admin-edit-founder-btn')?.addEventListener('click', () => founderFileInput?.click());
    founderFileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('founder-portrait-img').src = ev.target.result;
                localStorage.setItem('theround_founder_img', ev.target.result);
                alert('변경되었습니다.');
            };
            reader.readAsDataURL(file);
        }
    });

    const savedImg = localStorage.getItem('theround_founder_img');
    if (savedImg && document.getElementById('founder-portrait-img')) {
        document.getElementById('founder-portrait-img').src = savedImg;
    }

    checkAuthSession();
    renderDesigners();
    renderStories();
});