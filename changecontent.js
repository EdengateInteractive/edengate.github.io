function changeContent(selection) {
    var contentDiv = document.getElementById('content');
    var bottomBox = document.getElementById('bottomBox');
    
    switch(selection) {
        case 'home':
            contentDiv.innerHTML = '<h2>Welcome to Edengate Interactive!</h2><p>This is the home page.</p>';
            break;
        case 'games':
            contentDiv.innerHTML = '<h2>Our Games</h2><p>Explore our amazing collection of games.</p>';
            break;
        case 'about':
            contentDiv.innerHTML = '<h2>About Us</h2><p>Learn more about Edengate Interactive.</p>';
            break;
        case 'contact':
            contentDiv.innerHTML = '<h2>Contact Us</h2><p>Reach out to us for any queries.</p>';
            break;
        default:
            contentDiv.innerHTML = '<h2>Welcome to Edengate Interactive!</h2><p>This is the home page.</p>';
    }

    bottomBox.innerHTML = '<h3>Selection: ' + selection + '</h3>';
}
