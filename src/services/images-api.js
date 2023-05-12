function fetchImages(searchQuery) {
  return fetch(
    `https://pixabay.com/api/?key=34753059-f7902d1f02de9c533025c1a5e&q=${nextSearchQuery}&image_type=photo`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Сталася помилка.'));
  });
}

const api = {
  fetchImages,
};

export default api;
