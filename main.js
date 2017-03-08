function saveBookmark(event) {

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);

    var bookmarksString = JSON.stringify(bookmarks);
    // save in localStorage
    localStorage.setItem('bookmarks', bookmarksString);
  }
  else
  {
    var bookmarksString = localStorage.getItem('bookmarks');
    var bookmarks = JSON.parse(bookmarksString);

    bookmarks.push(bookmark);

    var bookmarksString = JSON.stringify(bookmarks);
    localStorage.setItem('bookmarks', bookmarksString);
  }
  fetchBookmarks();
  event.preventDefault();
}

function deleteBookmark(url) {
  var bookmarksString = localStorage.getItem('bookmarks');
  var bookmarks = JSON.parse(bookmarksString);

  for(var i=0; i<bookmarks.length; i++){
    if (bookmarks[i].url === url) {
      bookmarks.splice(i,1);
    }
  }

  var bookmarksString = JSON.stringify(bookmarks);
  localStorage.setItem('bookmarks', bookmarksString);


  fetchBookmarks();
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('insert values');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('please insert a valid url');
    return false;
  }

  return true;
}

function fetchBookmarks() {
  if (localStorage.length > 0) {
    var bookmarksString = localStorage.getItem('bookmarks');
    var bookmarks = JSON.parse(bookmarksString);

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i=0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += `
        <div>
          <h3>${name}</h3>
          <a target="_blank" href="${url}">name</a>
          <a onclick="deleteBookmark('${url}')">Delete</a>
        </div>
      `;
    }
  }
}

function init() {
  fetchBookmarks();
  document.getElementById('myForm').addEventListener('submit', saveBookmark);
}

window.addEventListener('load', init, false);
