import './top-page.scss';

import { rirekishoService } from '../shared/js';

function loadContent() {
    const rirekishoList = document.querySelector('#rirekisho-list');

    if (!rirekishoList) {
        console.warn('failed to load initlal contents');
    }
    
    const documentList = rirekishoService.getAll();

    if (!documentList || documentList.length) {
        console.warn('no documents found');
    }
    
    console.table(documentList);
}

function initApplication() {
    loadContent();
}

function loadingLoop() {
    if (document.readyState === 'complete') {
        initApplication();
    } else {
        requestAnimationFrame(loadingLoop);
    }
};

loadingLoop();