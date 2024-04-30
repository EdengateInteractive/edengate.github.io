let posts = [];

const postsPerPage = 5; // Number of posts to display per page
let currentPage = 1; // Current page number

function fetchAndDisplayPosts() {
    fetch('json/newspost.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((post, index) => {
                post.id = index + 1; // You can use any method to generate IDs
                post.url = `newsposts/${post.slug}.html`;
            });
            
            // Store the fetched posts data in a variable
            posts = data;

            // Call the functions to display posts and pagination
            displayPosts(currentPage);
            displayPagination();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function generatePostHTML(post, index) {
    let postHTML = `
        <div class="post-card" data-post-index="${index}">
            <div class="post-thumbnail">
                <img src="${post.imageUrl}" alt="${post.title} Image">
            </div>
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-date">Date Posted: ${post.datePosted}</p>
                <p class="post-description">${post.description}</p>
            </div>
        </div>`
    
    return postHTML;
}

function displayPosts(page) {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = '';

    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    for (let i = startIndex; i < Math.min(endIndex, posts.length); i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.innerHTML = generatePostHTML(post, i);
        postsContainer.appendChild(postElement);
    }

    attachPostCardClickEventListeners();
}

function displayPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const maxVisiblePages = 5; // Maximum number of visible page buttons

    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Adjust startPage and endPage if the current page is near the first or last page
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    // Add "First Page" button
    if (currentPage > 1) {
        addPageButton(paginationContainer, 1, "First");
    }

    // Add ellipsis before page buttons if necessary
    if (startPage > 1) {
        paginationContainer.appendChild(createEllipsis());
    }

    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
        addPageButton(paginationContainer, i, i);
    }

    // Add ellipsis after page buttons if necessary
    if (endPage < totalPages) {
        paginationContainer.appendChild(createEllipsis());
    }

    // Add "Last Page" button
    if (currentPage < totalPages) {
        addPageButton(paginationContainer, totalPages, "Last");
    }

    updateActivePageButton();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function updatePostDates() {
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
        const dateElement = card.querySelector('.date-placeholder');
        if (dateElement) {
            const postDate = formatDate(postsData[index].datePosted);
            dateElement.textContent = postDate;
        }
    });
}

window.addEventListener('DOMContentLoaded', updatePostDates);

function addPageButton(container, pageNumber, text) {
    const pageButton = document.createElement('button');
    pageButton.textContent = text;
    pageButton.addEventListener('click', () => {
        currentPage = pageNumber;
        displayPosts(currentPage);
        updateActivePageButton();
    });
    container.appendChild(pageButton);
}

function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    return ellipsis;
}

function updateActivePageButton() {
    const paginationButtons = document.querySelectorAll("#pagination button");
    paginationButtons.forEach(button => {
        if (parseInt(button.textContent) === currentPage) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

function navigateToPostPage(postId) {
    const post = posts.find(post => post.id === postId);
    if (post) {
        const url = post.url;
        window.location.href = url;
    }
}

function attachPostCardClickEventListeners() {
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(postCard => {
        postCard.removeEventListener('click', handleClick);
        postCard.addEventListener('click', handleClick);
    });
}

function handleClick(event) {
    const postCard = event.currentTarget;
    const postIndex = postCard.getAttribute('data-post-index');
    if (postIndex !== null) {
        const post = posts[postIndex];
        const postId = post.id;
        navigateToPostPage(postId);
    }
}

window.onload = function() {
    fetchAndDisplayPosts();
};
