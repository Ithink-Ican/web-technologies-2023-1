import { Catalog } from "./src/components/catalog.js"

const renderPostItem = item => `
    <a  
        href="posts/${item.id}"
        class="post-item"
    >
        <span class="post-item__title">
            ${item.title}
        </span>

        <span class="post-item__body">
            ${item.body}
        </span>
    </a>
`

// const getPostItems = ({ limit, page }) => {
//     return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
//         .then(async res => {
//             const total = +res.headers.get('x-total-count')
//             const items = await res.json()
//             return { items, total }
//         })
// }

class HTTPResponseError extends Error {
	constructor(response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
	}
}

const getPostItems = async ({limit, page}) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
        if (!response.ok) {
            throw new HTTPResponseError(response);
        }
        const total = +response.headers.get('x-total-count');
        const items = await response.json();
        return {items, total};
    } 
    catch (err) {
        console.error(err);
    }
}

const renderPhotoItem = item => `
    <a  
        href="photos/${item.id}"
        class="photo-item"
    >
        <span class="photo-item__title">
            ${item.title}
        </span>

        <img 
            src=${item.url}
            class="photo-item__image"
        >
    </a>
`

// const getPhotoItems = ({ limit, page }) => {
//     return fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
//         .then(async res => {
//             const total = +res.headers.get('x-total-count')
//             const items = await res.json()
//             return { items, total }
//         })
// }

const getPhotoItems = async ({ limit, page }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
        if (!response.ok) {
            throw new HTTPResponseError(response);
        }
        const total = +response.headers.get('x-total-count')
        const items = await response.json()
        return {items, total}
    }
    catch (err) {
        console.error(err)
    }
}

const init = () => {
    const catalog = document.getElementById('catalog')
    new Catalog(catalog, { 
        renderItem: renderPostItem,
        getItems: getPostItems
     }).init()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}
