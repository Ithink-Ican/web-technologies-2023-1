export class Post {
    #el = null
    #itemsEl = null
    #postId = null
    #renderItem = null
    #getItem = null

    constructor(el, options) {
        const { renderItem, getItem } = options
        this.#el = el
        this.#postId = this.getPostId()
        this.#itemsEl = el.querySelector('post')
        this.#renderItem = renderItem
        this.#getItem = getItem
    }

    init () {
        window.onpopstate = () => {
            const url = new URL(window.location.href);
            const postId = url.pathname.slice(-1);

            if (postId !== this.#postId) {
                this.setPostId(postId);
            }
        }

        const postId = url.pathname.slice(-1);

        this.setPostId(postId);
        this.pushState();
    }

    getPostId () {
        const url = new URL(window.location.href);
        const postId = url.pathname.slice(-1);

        return postId;
    }

    setPostId (postId) {
        this.#postId = postId
    }

    pushState () {
        window.history.pushState({}, '', url)
    }

    renderItem (item) {
        this.#itemsEl.innerHTML = item.map(this.#renderItem).join('')
    }

}