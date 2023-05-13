function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34753059-f7902d1f02de9c533025c1a5e';

  const searchParams = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page: `${page}`,
  });

  const url = `${BASE_URL}?${searchParams}`;

  return fetch(url).then(response => {
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
