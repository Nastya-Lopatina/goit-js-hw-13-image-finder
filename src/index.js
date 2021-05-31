var debounce = require('lodash.debounce');

import pictureTpl from './templates/picture-card.hbs';
import LoadMoreBtn from './js-components/load-more-btn.js';
import ImagesApi from './js-components/apiService';
import './style.css'

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
loadMoreBtn.refs.button.addEventListener('click',fetchPictures)

const imagesApi = new ImagesApi();

function onImageSearch (e){
    imagesApi.queri =  e.target.value;

    if(imagesApi.queri === ' '){
        return error('Invalid input parameter!');
    }
    loadMoreBtn.show();
    imagesApi.resetPage();
    clearingMarkup();
    fetchPictures();
}


function fetchPictures() {
    loadMoreBtn.disable();

    imagesApi.fetchPictures().then(data => {
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