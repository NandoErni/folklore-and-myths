const pages = [
    {
        logo: "img/gifs/jackolantern2.gif",
        title: "The Pumpkin Man",
        link: "pumpkinman.html"
    },
    {
        logo: "img/gifs/home.gif",
        title: "Honey I'm Home",
        link: "honeyimhome.html"
    },
    {
        logo: "img/gifs/uncannyvalley.gif",
        title: "Uncanny Valley",
        link: "uncannyvalley.html"
    },
]

function onEnterPressed(event) {
    if (event.key === 'Enter') {
        executeSearch()
    }
}

function executeSearch() {
    const searchTerm = document.getElementById('searchTermInput').value;
    if (!searchTerm) return

    const resultPages = []

    for (let i = 0; i < pages.length; i++) {
        let currentPage = pages[i]

        if (currentPage.logo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currentPage.link.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currentPage.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            resultPages.push(currentPage)
        }
    }


    const searchTable = document.getElementsByClassName('searchtable')[0]
    searchTable.innerHTML = null

    if (resultPages.length == 0) {
        searchTable.innerHTML = '<p>Nothing found using "' + searchTerm + '"!</p>'
        return
    }
    for (let i = 0; i < resultPages.length; i++) {
        let currentPage = resultPages[i]

        let row = searchTable.insertRow(i)
        row.onclick = () => window.location = currentPage.link;

        let logo = row.insertCell(0)
        let img = document.createElement('img')
        img.src = currentPage.logo
        logo.appendChild(img)
        let title = row.insertCell(1)
        title.innerText = currentPage.title
    }
}