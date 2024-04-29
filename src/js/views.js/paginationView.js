import commonView from "./commonView";
import icons from '../../img/icons.svg'

class PaginationView extends commonView {
    _parentEL = document.querySelector('.pagination')

    addHandlerClick(handler){
        this._parentEL.addEventListener('click', function(e){
           
            const currBtn = e.target.closest('.btn--inline')
            if(!currBtn) return
            const gotoPage = Number(currBtn.dataset.goto)
            console.log(gotoPage)
            handler(gotoPage);
        })    
        }
        

    _generateMarkup(){
        const currPage = this._data.page; 
        const pageNum = Math.ceil((this._data.results.length) / this._data.resultPerPage)
        console.log(pageNum)

    // to render only first page
    if(currPage === 1 && pageNum > 1){
         return `
         <button data-goto = "${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> -->`
        
    }

    // to render only last page
    if(currPage === pageNum && pageNum > 1){
        return `
        <button data-goto = "${currPage - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${currPage - 1}</span>
          </button>
        
        `
    }

    //to render other pages page
    if(currPage < pageNum && currPage > 1){
        return `
        <button data-goto = "${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${currPage - 1}</span>
          </button>
          <button data-goto = "${currPage + 1}" class="btn--inline pagination__btn--next">
            <span>page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> -->
          `
    }
    
    //to render on the available one page
    return ''

}
}




export default new PaginationView();