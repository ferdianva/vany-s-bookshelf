const unreadedbook = "incompleteBookshelfList", readedbook = "completeBookshelfList", idbook = "itemId";

function addnewbook() {
    const unreaded = document.getElementById(unreadedbook), 
    hasbeenreaded = document.getElementById(readedbook);

    const fromtitle = document.getElementById("inputBookTitle").value; 
    const withAuthor = document.getElementById("inputBookAuthor").value;
    const withYear = document.getElementById("inputBookYear").value;
    const checkedbox = document.getElementById("inputBookIsComplete").checked;
    const listofbook = newlistofbooks(fromtitle, withAuthor, withYear, checkedbox);

    if (checkedbox == true){
        const repbook = composerepbook(fromtitle, withAuthor, withYear, true);
        listofbook[idbook] = repbook.id;
        hasbeenreaded.append(listofbook);
        newbook.push(repbook);
        
    } 
    else {
        const repbook = composerepbook(fromtitle, withAuthor, withYear, false);
        listofbook[idbook] = repbook.id;
        unreaded.append(listofbook);
        newbook.push(repbook);
    }

    updateDataToStorage();
}

function newlistofbooks(title,author,year,checkBox, isRead = false){
    const titleofbook = document.createElement("h3");
    titleofbook.classList.add("title");
    titleofbook.innerText = title;

    const authorofbook = document.createElement("p");
    authorofbook.classList.add("author");
    authorofbook.innerText = author;

    const pubyear = document.createElement("p");
    pubyear.classList.add("year");
    pubyear.innerText = year;
 
    const containtxt = document.createElement("article");
    containtxt.classList.add("book_item");
    containtxt.append(titleofbook, authorofbook, pubyear);
 
    const action = document.createElement("div");
    action.classList.add("action");
    containtxt.append(action);

    if (checkBox == true || isRead == true){
        action.append(createGreenNotDoneButton());
    }
    else {
        action.append(createGreenDoneButton());
    }
    action.append(createRedButton());

    return containtxt;
}

function makeabutton(buttonTypeClass, eventListener, textButton){
    const clicbutton = document.createElement("clicbutton");
    clicbutton.classList.add(buttonTypeClass);
    clicbutton.innerText = textButton;
    clicbutton.addEventListener("click", function(event){
        eventListener(event)
    });
    return clicbutton;
}

function newunreadedbook(bookListElement){
    const titleofbook = bookListElement.querySelector(".title").innerText ,
    authorofbook = bookListElement.querySelector(".author").innerText , 
    pubyear = bookListElement.querySelector(".year").innerText , 
    newlist = newlistofbooks(titleofbook,authorofbook,pubyear) ,
    booknewest = lookingbook(bookListElement[idbook]);
    booknewest.isComplete = false;
    newlist[idbook] = booknewest.id;
    const unreadedlist = document.getElementById(unreadedbook);
    unreadedlist.append(newlist);

    bookListElement.remove();
    updateDataToStorage();

}

function newreadedbook(bookListElement){
    const titleofbook = bookListElement.querySelector(".title").innerText ,
    authorofbook = bookListElement.querySelector(".author").innerText , 
    pubyear = bookListElement.querySelector(".year").innerText , 
    newlist = newlistofbooks(titleofbook,authorofbook,pubyear,true) ,
    booknewest = lookingbook(bookListElement[idbook]);
    booknewest.isComplete = true;
    newlist[idbook] = booknewest.id;
    const unreadedlist = document.getElementById(readedbook);
    unreadedlist.append(newlist);

    bookListElement.remove();
    updateDataToStorage();
}


function deletesomebook(bookListElement){
    var r = confirm("Apakah Anda yakin ingin menghapus buku dari rak?");
    if (r == true) {
        const locationofbook = lookingbookfromindex(bookListElement[idbook]);
        newbook.splice(locationofbook,1);
        bookListElement.remove();
        updateDataToStorage()
        alert("Buku akan dihapus.")
    } else {
        alert("Buku batal dihapus.")
    }
}

const createGreenDoneButton = function() {
    return makeabutton("green", function(event) {
        newreadedbook(event.target.parentElement.parentElement);
        }, "Selesai dibaca");
};

const createGreenNotDoneButton = function() {
    return makeabutton("green", function(event) {
        newunreadedbook(event.target.parentElement.parentElement);
        }, "Belum dibaca");
};

const createRedButton = function() {
    return makeabutton("red", function(event) {
        deletesomebook(event.target.parentElement.parentElement);
    }, "Hapus Buku")
}

const searchBar = document.forms["searchBook"].querySelector("input");
searchBar.addEventListener("keyup", function(event){
    const term = event.target.value.toLowerCase();
    const newbook = document.getElementsByTagName("article");
    Array.from(newbook).forEach(function(booknewest){
        const title = booknewest.firstElementChild.textContent;
        if (title.toLowerCase().indexOf(term) != -1) {
            booknewest.style.display = "block";
        }else{
            booknewest.style.display = "none";
        }
    })
}) 

function changeText(){
    const newstatusbook = document.getElementById("inputBookIsComplete");
    if (newstatusbook.checked){
        let bookhasbeenread = document.getElementById("newstatusbook");
        bookhasbeenread.innerText = "Selesai Dibaca";
      
    } else {
        let bookhasbeenread = document.getElementById("newstatusbook");
        bookhasbeenread.innerText = "Belum Selesai Dibaca";
        
    }    
}

document.getElementById("inputBookIsComplete").addEventListener('change',changeText);
const cekb = document.querySelector('#inputBookIsComplete');
const button = document.querySelector('#bookSubmit');
button.onclick = () => {
        if (document.getElementById('inputBookIsComplete').checked){
            alert("Buku telah dimasukkan ke rak sudah selesai dibaca")

        } else {
            alert("Buku telah dimasukkan ke rak belum selesai dibaca")
        }
} 
  

























