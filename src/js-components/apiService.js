const  REQUEST_KEY = '21864650-2d6f5ba10b4ef36ee5398956b';
const MAIN_LINK = 'https://pixabay.com/api/';

export default class ImagesApi {

    constructor() {
        this.searchQuery = '';
        this.page = 1;

    }

     async fetchPicture(){

        try{
             const response = await fetch(`${MAIN_LINK}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=${this.page}&per_page=12&key=${REQUEST_KEY}`);
             const pictures = await response.json();

             this.incrementPage();
             return pictures.hits;
        }

        catch(error){
            console.log('This is error:', error)
        }

     }

     incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}