


/*
When the page loads, get a list of books from http://localhost:3000/books and display 
their titles by creating a li for each book and adding each li to the ul#list element.
*/
const fetchBooks = () => {
    return fetch('http://localhost:3000/books')
        .then((response) => response.json())
        .then((data) => {
            const list = document.getElementById('list');
            for (const datum of data) {
                const li = document.createElement('li');
                li.textContent = datum.title;
                console.log(datum.subtitle);
                li.addEventListener('click', () => displayBook(datum));
                list.appendChild(li);
            }
        });
}

// Creates an image element for the book cover and returns it.
function bookCover(book) {
    const img = document.createElement('img');
    img.src = book.img_url;
    img.alt = `Cover of the book, ${book.title}`;
    return img;
}

function bookTitle(book) {
    const h2 = document.createElement('h2');
    h2.textContent = book.title;
    return h2;
}

function bookSubtitle(book) {
    const h3 = document.createElement('h3');
    if (book.subtitle === '') {
        throw error(`Book ${book.title} does not have a subtitle.`);
    }
    h3.textContent = book.subtitle;
    return h3;
}

function bookAuthor(book) {
    const h2 = document.createElement('h2');
    h2.textContent = book.author;
    return h2;
}

function bookDescription(book) {
    const p = document.createElement('p');
    p.textContent = book.description;
    return p;
}

function displayBook(book) {
    const panel = document.getElementById('show-panel');
    panel.innerHTML = "";
    console.log(book.img_url);
    panel.appendChild(bookCover(book));
    panel.appendChild(bookTitle(book));
    if (book.subtitle !== '') {
        panel.appendChild(bookSubtitle(book));
    }
    panel.appendChild(bookAuthor(book));
    panel.appendChild(bookDescription(book));

    const likeList = document.createElement('ul');
    console.log(likeList);
    for (const user of book.users) {
        const li = document.createElement('li');
        li.textContent = user.username;
        console.log(li.textContent);
        likeList.appendChild(li);
    }
    panel.appendChild(likeList);
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('body').style.background = '#444';
    console.log(fetchBooks());
});
