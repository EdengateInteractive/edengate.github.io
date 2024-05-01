function handleAccessDeniedProjectCrimson() {
    const gameSection = document.querySelector('.game-section.left-layout .game-info');
    gameSection.innerHTML = '<h2>ACCESS DENIED</h2>';
    setTimeout(function () {
        gameSection.innerHTML = `
            <h2>Project Crimson</h2>
            <p>[REDACTED]</p>
        `;
    }, 2000);
}
