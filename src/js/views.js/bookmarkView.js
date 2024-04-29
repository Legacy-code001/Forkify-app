import commonView from "./commonView";
import previewView from "./previewView";
import icons from '../../img/icons.svg'


class BookmarkView extends commonView{
    _parentEL = document.querySelector('.bookmarks__list')
    _errorMessage = 'No bookmark, bookMark a recipe now!';
    _message = ''

    addHandlerRender(handler) {
      window.addEventListener('load', handler);
    }

    _generateMarkup(){
        console.log(this._data)
       return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    }
    
    
}

export default new BookmarkView();