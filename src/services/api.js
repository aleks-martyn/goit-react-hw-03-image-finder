import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34753059-f7902d1f02de9c533025c1a5e';

export const fetchImages = async (searchQuery, page) => {
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

  const data = await axios.get(url);
  page += 1;
  return data;
};