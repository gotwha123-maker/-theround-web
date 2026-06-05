    function renderDesigners() {
        if (!designersGrid) return;
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        // Filter only visible designers
        const displayList = designers.filter(d => d.visible !== false).slice(0, 4);
        
        designersGrid.innerHTML = displayList.map(d => `
            <div class="designer-card highlight-card reveal-on-scroll" data-id="${d.id}">
                <div class="designer-img-wrapper clickable-detail">
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
    }

    function showDesignerDetail(id) {
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        const d = designers.find(item => item.id === id);
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
        
        tbody.querySelectorAll('.edit-designer').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
                const d = designers.find(item => item.id == id);
                if (d) {
                    document.getElementById('designer-modal-title').textContent = "디자이너 수정 (통합)";
                    document.getElementById('edit-designer-id').value = d.id;
                    document.getElementById('designer-input-name').value = d.ko.name;
                    document.getElementById('designer-input-tag').value = d.ko.tag;
                    document.getElementById('designer-input-specialty').value = d.ko.specialty;
                    document.getElementById('designer-input-slogan').value = d.ko.slogan || '';
                    document.getElementById('designer-input-bio').value = d.ko.bio;
                    document.getElementById('designer-input-career').value = d.ko.career || '';
                    document.getElementById('designer-input-img').value = (d.img && d.img.startsWith('http')) ? d.img : '';
                    designerWriteModal.classList.add('open');
                }
            });
        });
    }

    function moveDesigner(from, to) {
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        const item = designers.splice(from, 1)[0];
        designers.splice(to, 0, item);
        localStorage.setItem('theround_unified_designers', JSON.stringify(designers));
        renderAdminDesignerList(); renderDesigners();
    }

    function toggleDesignerVisibility(id) {
        const designers = JSON.parse(localStorage.getItem('theround_unified_designers') || '[]');
        const d = designers.find(item => item.id == id);
        if (d) {
            d.visible = d.visible === false ? true : false;
            localStorage.setItem('theround_unified_designers', JSON.stringify(designers));
            renderAdminDesignerList(); renderDesigners();
        }
    }