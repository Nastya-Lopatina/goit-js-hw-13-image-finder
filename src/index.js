var debounce = require('lodash.debounce');

import pictureTpl from './templates/picture-card.hbs';
import LoadMoreBtn from './js-components/load-more-btn.js';
import ServiceWithPictures from './js-components/apiService';
//import './style.css'

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import {error} from '@pnotify/core/dist/PNotify.js';


const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const refs ={
    searthForm: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
 }

refs.searthForm.addEventListener('input',debounce(onImageSearch,500));
loadMoreBtn.refs.button.addEventListener('click',imageSearchByRequest)

const serviceWithPictures = new ServiceWithPictures();

function onImageSearch (e){

    serviceWithPictures.queri =  e.target.value;

    if(serviceWithPictures.queri === ' '){
        return error('Invalid input parameter!');
    }

    loadMoreBtn.show();
    serviceWithPictures.resetPage();
    clearingMarkup();
    imageSearchByRequest;
}

async function imageSearchByRequest () {
    loadMoreBtn.disable();

    serviceWithPictures.imageSearchByRequest().then(data => {
        addMarkupForPictures(data);
        loadMoreBtn.enable();
        loadMoreBtn.refs.button.scrollIntoView({
             behavior: 'smooth', 
             block: 'end', });
    })
}



function addMarkupForPictures(data){
    refs.gallery.insertAdjacentHTML('beforeend',pictureTpl(data));
}

function clearingMarkup(){
    refs.gallery.innerHTML = '';
}