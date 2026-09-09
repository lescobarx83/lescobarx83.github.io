// Notes Page — Filter & Technical Paper Reader Logic
document.addEventListener('DOMContentLoaded', () => {

    // Category filter
    const filterBtns = document.querySelectorAll('.notes-filter-btn');
    const cards = document.querySelectorAll('.note-card');
    const countEl = document.getElementById('filter-count');
    const emptyState = document.getElementById('notes-empty');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide cards
            let visible = 0;
            cards.forEach(card => {
                const cat = card.dataset.category;
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // reflow
                    card.style.animation = '';
                    visible++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Update count
            if (countEl) countEl.textContent = visible;

            // Empty state
            if (emptyState) {
                emptyState.style.display = visible === 0 ? 'flex' : 'none';
            }
        });
    });

    // Nav scroll solidify
    const nav = document.querySelector('.notes-nav-wrapper');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.style.background = window.scrollY > 40
                ? 'rgba(5, 6, 8, 0.97)'
                : 'rgba(5, 6, 8, 0.85)';
        }, { passive: true });
    }

    // =========================================================================
    // RESEARCH PAPER & TECHNICAL GUIDES READER MODAL
    // =========================================================================
    const paperModalOverlay = document.getElementById('paper-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCloseBottomBtn = document.getElementById('modal-close-bottom-btn');
    const modalPaperType = document.getElementById('modal-paper-type');
    const modalPaperDoi = document.getElementById('modal-paper-doi');
    const modalPaperBody = document.getElementById('modal-paper-body');
    const papersDatabase = (typeof window !== 'undefined' && window.papersDatabase) ? window.papersDatabase : {};

    let currentActiveDoc = null;

    function openPaperModal(paperId) {
        let doc = papersDatabase[paperId];

        // Intelligent DOM Fallback: extract info directly from card if not in database
        if (!doc) {
            const cardEl = document.querySelector(`[data-paper="${paperId}"]`)?.closest('.pub-card, .note-card') 
                        || document.getElementById(`note-${paperId.replace('paper-', '')}`)
                        || document.getElementById(`card-${paperId.replace('paper-', '')}`);
            if (cardEl) {
                const title = cardEl.querySelector('.pub-title, .note-title')?.textContent || 'Documento Técnico';
                const type = cardEl.querySelector('.pub-type-badge, .note-category')?.textContent || 'DOCUMENTO TÉCNICO';
                const doi = cardEl.querySelector('.pub-doi-tag')?.textContent || 'REF: NOC-2026';
                const excerpt = cardEl.querySelector('.pub-excerpt, .note-excerpt')?.textContent || '';
                const category = cardEl.querySelector('.pub-category, .note-category')?.textContent || '';
                const hlItems = Array.from(cardEl.querySelectorAll('.pub-hl-item, .note-toc li')).map(el => el.textContent.trim());

                doc = {
                    type: type,
                    doi: doi,
                    title: title,
                    meta: `Autor: Leonardo Escobar &bull; Categoría: ${category} &bull; NOC Knowledge Hub`,
                    abstract: excerpt,
                    sections: [
                        {
                            heading: 'Puntos Clave y Especificaciones',
                            content: hlItems.length > 0 ? hlItems.map(item => `&bull; ${item}`).join('<br>') : 'Especificación técnica de ingeniería.'
                        }
                    ]
                };
            }
        }

        if (!doc || !paperModalOverlay || !modalPaperBody) return;
        currentActiveDoc = doc;

        if (modalPaperType) modalPaperType.textContent = doc.type || 'DOCUMENTO TÉCNICO';
        if (modalPaperDoi) modalPaperDoi.textContent = doc.doi || 'REF: NOC-2026';

        // External Link button toggle
        const modalExternalLink = document.getElementById('modal-external-link');
        if (modalExternalLink) {
            if (doc.externalUrl || doc.pdfUrl) {
                modalExternalLink.href = doc.externalUrl || doc.pdfUrl;
                modalExternalLink.style.display = 'inline-flex';
            } else {
                modalExternalLink.style.display = 'none';
            }
        }

        let bodyHtml = `
            <h1 class="modal-doc-title">${doc.title}</h1>
            <div class="modal-doc-meta">${doc.meta}</div>
            <div class="modal-doc-abstract">
                <strong>ABSTRACT:</strong>
                ${doc.abstract}
            </div>
        `;

        if (doc.sections && Array.isArray(doc.sections)) {
            doc.sections.forEach(sec => {
                bodyHtml += `<h2 class="modal-doc-h2">${sec.heading}</h2>`;
                if (sec.content) {
                    bodyHtml += `<p class="modal-doc-p">${sec.content}</p>`;
                }
                if (sec.code) {
                    bodyHtml += `<pre class="modal-doc-code">${sec.code}</pre>`;
                }
            });
        }

        if (doc.references && Array.isArray(doc.references)) {
            bodyHtml += `
                <div class="modal-doc-references">
                    <h2 class="modal-doc-h2"><ion-icon name="library-outline"></ion-icon> Fuentes &amp; Referencias Técnicas</h2>
                    <ul class="modal-doc-ref-list">
            `;
            doc.references.forEach(ref => {
                bodyHtml += `<li class="modal-ref-item">&bull; ${ref}</li>`;
            });
            bodyHtml += `</ul></div>`;
        }

        modalPaperBody.innerHTML = bodyHtml;
        modalPaperBody.scrollTop = 0;
        paperModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePaperModal() {
        if (paperModalOverlay) {
            paperModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Event delegation for all read paper buttons (existing & dynamic)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.note-btn-read, .pub-btn-read, .btn-read-paper');
        if (btn) {
            e.preventDefault();
            const paperId = btn.getAttribute('data-paper');
            if (paperId) openPaperModal(paperId);
        }
    });

    // BibTeX Citation Copy Handler
    const modalCiteBtn = document.getElementById('modal-cite-btn');
    if (modalCiteBtn) {
        modalCiteBtn.addEventListener('click', () => {
            if (!currentActiveDoc) return;
            const cleanDoi = (currentActiveDoc.doi || 'NOC2026').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const bibtex = `@article{escobar2026_${cleanDoi},
  author    = {Escobar, Leonardo},
  title     = {${currentActiveDoc.title}},
  journal   = {NOC Datacenter Systems & Engineering Research Hub},
  year      = {2026},
  note      = {${currentActiveDoc.doi}}
}`;
            navigator.clipboard.writeText(bibtex).then(() => {
                const originalHtml = modalCiteBtn.innerHTML;
                modalCiteBtn.classList.add('copied');
                modalCiteBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> <span>¡Copiado!</span>';
                setTimeout(() => {
                    modalCiteBtn.classList.remove('copied');
                    modalCiteBtn.innerHTML = originalHtml;
                }, 2200);
            }).catch(() => {
                alert('Cita BibTeX:\n\n' + bibtex);
            });
        });
    }

    // Print / PDF Export Handler
    const modalPrintBtn = document.getElementById('modal-print-btn');
    if (modalPrintBtn) {
        modalPrintBtn.addEventListener('click', () => {
            window.print();
        });
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePaperModal);
    if (modalCloseBottomBtn) modalCloseBottomBtn.addEventListener('click', closePaperModal);
    if (paperModalOverlay) {
        paperModalOverlay.addEventListener('click', (e) => {
            if (e.target === paperModalOverlay) closePaperModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePaperModal();
    });
});


