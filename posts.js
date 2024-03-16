class HTTPResponseError extends Error {
	constructor(response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		this.response = response;
	}
}

class PostItem {

    constructor() {
        this.postId = null;
        this.postTitle = null;
        this.postText = null;
        this.postComments = null;
    }

    get postId () {
        return this._postId;
    }

    set postId (id) {
        this._postId = id;
    }

    get postTitle () {
        return this._postTitle;
    }

    set postTitle (title) {
        this._postTitle = title;
    }

    get postText () {
        return this._postText;
    }

    set postText (text) {
        this._postText = text;
    }

    get postComments () {
        return this._postComments;
    }

    set postComments (comments) {
        this._postComments = comments;
    }

    restoreItemFromStorage () {
        let strPostObj = localStorage.getItem("postItem");
        let postObj = JSON.parse(strPostObj);
        return postObj
    }

    getPostComments = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this._postId}/comments`);
            if (!response.ok) {
                throw new HTTPResponseError(response);
            }
            const comments = await response.json();
            return comments;
        } 
        catch (err) {
            console.error(err);
        }
    }

    renderComments () {
        let commentSection = document.querySelector(".post__comments")
        this.postComments.forEach((comment) => {
            let html = ''
            html += `
                <h3>Comment title: ${comment.name}</h3>
                <p>Comment text: ${comment.body}</p>
                <h4>User e-mail: ${comment.email}</h4>
            _______________________________________________
                <br>
            `
            commentSection.insertAdjacentHTML('beforeend', html)
        }
        )
    }

    renderPostItem () {
        document.querySelector(".post__title").textContent = this.postTitle;
        document.querySelector(".post__text").textContent = this.postText;
    }

    init () {
        let postItem = this.restoreItemFromStorage();
        this.postId = postItem.id;
        this.postTitle = postItem.title;
        this.postText = postItem.text;
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    let post = new PostItem();
    post.init();
    generateURLRoute(post.postId);
    post.postComments = await post.getPostComments();
    console.log(post)
    post.renderPostItem();
    post.renderComments();
    console.log(post.postComments[0])
 });

const generateURLRoute = (postId) => {
    let newHref = `/posts/${postId}`
	window.history.pushState({}, "", newHref);
}