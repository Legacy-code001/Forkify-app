import commonView from "./commonView";
import PreviewView from "./previewView"
import icons from '../../img/icons.svg'


class SearchResults extends commonView{
    _parentEL = document.querySelector('.results')
    _errorMessage = 'No recipe match your query, try another search!';
    _message = ''

   
    _generateMarkup(){
      console.log(this._data)
     return this._data.map(result => PreviewView.render(result, false)).join('')
  }
   

    
}

export default new SearchResults();