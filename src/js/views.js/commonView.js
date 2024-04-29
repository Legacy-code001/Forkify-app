import icons from '../../img/icons.svg' 

export default class commonView {
    _data;

    /**
     * rendering the received object to the dom
     * @param {object | object[]} data the data to be rendered e.g(recipe and search)
     * @param {boolean, render = true} render if false create a markup string instead of rendring to the dom
     * @returns {undefined | string} a markup string is retured if render = false
     * @this {object} view instance
     * @author Abdul-Mueez AlLegacyCode
     * @todo finish inplementation
     */
    render(data, render = true){
      if(!data || (Array.isArray(data) && Array.length === 0)) 
      return this.renderError()
      this._data = data;
      //console.log(this._data)
      const markup = this._generateMarkup();

      if (!render) return markup
      this._clear();
      this._parentEL.insertAdjacentHTML('afterbegin', markup);
    }

    update(data){
      // if(!data || (Array.isArray(data) && Array.length === 0)) 
      // return this.renderError()
      this._data = data;
      const oneMarkup = this._generateMarkup();

      const newDom = document.createRange().createContextualFragment(oneMarkup)
      const newElement = Array.from(newDom.querySelectorAll('*'))
      const curElement = Array.from(this._parentEL.querySelectorAll('*'))

      newElement.forEach((newEl, i) =>{
        const curEl = curElement[i]
        

        if(
          !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
          ){
          curEl.textContent = newEl.textContent

        }

        if(!newEl.isEqualNode(curEl)) 
        Array.from(newEl.attributes).forEach(attr =>  
          curEl.setAttribute(attr.name, attr.value)
    
        )
      
      
      })
      
    }

  
    _clear(){
      this._parentEL.innerHTML = '';
     }

     renderSpinner(){
      const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup)
  
    }
  
    
  
    renderError(message = this._errorMessage){
      const markup = `
          <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div> 
          `
          this._clear()
          this._parentEL.insertAdjacentHTML('afterbegin', markup)
        }
      renderMessage(message = this._message()){
  
        const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
        
        `
        this._clear()
        this._parentEL.insertAdjacentHTML('afterbegin', markup)
  
      }

      

}