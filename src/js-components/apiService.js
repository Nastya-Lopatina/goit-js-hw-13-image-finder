const  REQUEST_KEY = '21864650-2d6f5ba10b4ef36ee5398956b';
const MAIN_LINK = 'https://pixabay.com/api/';

export default class ServiceWithPictures {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async imageSearchByRequest() {
        try {
            const response = await fetch(`${MAIN_LINK}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${REQUEST_KEY}`);
            const pictures = await response.json();
            
            this.incrementPage();
            return pictures.hits;

        } catch (error) {
            console.log(error);
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