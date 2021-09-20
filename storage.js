const STORAGE_KEY = "BOOKSHELF";
let newbook = [];

function updatedatafromnewbook(){
    const listunreadbook = document.getElementById(unreadedbook);
    let listreadedbook = document.getElementById(readedbook);

    for(let book of newbook){
        const updatedbook = newlistofbooks(book.title, book.author, book.bookYear, book.isCompleted);
        updatedbook[idbook] = book.id

        if(book.isComplete){
            listreadedbook.append(updatedbook);
        }
        else {
            listunreadbook.append(updatedbook);
        }
    }
} 

function avaiablestorage(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function savingdatainput (){
    const parsed = JSON.stringify(newbook);
    localStorage.setItem(STORAGE_KEY,parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function storageupdated() {
    const updatedstatus = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(updatedstatus);
    
    if(data !== null)
        newbook = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
}
  
function updateDataToStorage() {
    if(avaiablestorage())
        savingdatainput();
}
  
function composerepbook (title, author, bookYear, isCompleted) {
    return {
        id: +new Date(), title, author, bookYear, isCompleted
    };
}
  
function lookingbook(bookId) {
    for(book of newbook){
        if(book.id === bookId)
            return book;
    }
    return null;
}
  
  
function lookingbookfromindex(bookId) {
    let index = 0
    for (book of newbook) {
        if(book.id === bookId)
            return index;
  
        index++;
    }
    return -1;
}
