document.addEventListener("DOMContentLoaded", function() {

/***********  Dom Elements *************/
const bookList = document.querySelector("ul#list")
const bookShow = document.querySelector("div#show-panel")
/***********  Render Functions *************/

function renderBook(bookObj){
    const bookLi = document.createElement("li")
        bookLi.textContent = bookObj.title
        bookLi.addEventListener("click", event => {
            bookShowEvent(bookObj, event)
        })
    bookList.append(bookLi)
}

function clearShow() {
    bookShow.innerHTML = ""
}


/***********  Event Handlers *************/

function bookShowEvent(bookObj, event){
    clearShow()
    const thumbnail = document.createElement("img")
       thumbnail.src = bookObj.img_url
    
    const title = document.createElement("h2")
        title.textContent = bookObj.title

    const author = document.createElement("h3")
        author.textContent = bookObj.author

    const description = document.createElement("p")
        description.textContent = bookObj.description
    
    const userLikes = document.createElement("ul")
        userLikes.id = "likes"

    const users = bookObj.users
        users.forEach(user => {
            const userLi = document.createElement("li")
            userLi.textContent = user.username
            userLikes.append(userLi)
        })
    
    const bookId = bookObj.id
    const likeButton = document.createElement("button")
        likeButton.textContent = "Like"
        likeButton.id = `${bookId}`
        likeButton.addEventListener("click", event  => {
            likeABook(event, users)
        })
    bookShow.append(thumbnail, title, author, description, userLikes, likeButton)
}


function likeABook(event, users){
  const currentUser = {"id":1, "username":"pouros"}  
  users.push(currentUser)
  updateUserLikes(event, users)
}

/***********  Fetch Functions *************/
function getBooks(){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then((booksArray) => {
        booksArray.forEach(book => {
            renderBook(book)
        })
    })
}

function updateUserLikes(event, newArray){
    fetch(`http://localhost:3000/books/${event.target.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({users: newArray}),
    })
    .then(response => response.json())
    .then(updatedLike => {
        const userLikes = document.querySelector("#likes")
        userLikes.innerHTML = ""
        updatedLike.users.forEach(user => {
            const userLi = document.createElement("li")
            userLi.textContent = user.username
            userLikes.append(userLi)
        })
    })
}

/***********  Initialize *************/

getBooks()

});
