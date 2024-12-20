function showLargeImage(img) {
    const largeImageContainer = document.createElement('div');
    largeImageContainer.className = 'large-image';

    const largeImage = document.createElement('img');
    largeImage.src = img.src;

    const closeButton = document.createElement('div');
    closeButton.className = 'close';
    closeButton.innerText = 'X';
    closeButton.onclick = () => document.body.removeChild(largeImageContainer);

    largeImageContainer.appendChild(largeImage);
    largeImageContainer.appendChild(closeButton);
    document.body.appendChild(largeImageContainer);
}