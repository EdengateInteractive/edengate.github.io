// Sample post data (you can load this dynamically from a JSON file or an API)
const posts = [
    { title: "Post Title 1", description: "Post description goes here...", imageUrl: "post1.jpg" },
    { title: "Post Title 2", description: "Post description goes here...", imageUrl: "post2.jpg" },
    // Add more posts as needed
];

// Function to generate HTML for each post
function generatePostHTML(post) {
    return `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title} Image">` : ''}
        </div>
    `;
}

// Function to display posts on the page
function displayPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = posts.map(post => generatePostHTML(post)).join('');
}

// Display posts when the page loads
window.onload = displayPosts;
