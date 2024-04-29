class searchView {
    _parentEL = document.querySelector('.search')

    getQuery(){
      const value = this._parentEL.querySelector('.search__field').value
      console.log(value)
      this._clearInput();
      return value;
      
    }

    _clearInput(){
        this._parentEL.querySelector('.search__field').value = ''
    }
    
    addHandlerSearch(handler){
         this._parentEL.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
            
            
        })
    }

}
export default new searchView() 