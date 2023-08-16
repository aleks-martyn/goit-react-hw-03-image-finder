async function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = process.env.REACT_APP_API_KEY;

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
