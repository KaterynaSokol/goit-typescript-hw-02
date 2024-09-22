import axios from "axios";

const API_KEY = "9MhBBto5UJDIpiUJT9RFPe0axcb7LSHX4ZBTezerq0U";
axios.defaults.baseURL = "https://api.unsplash.com";

axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
};

export const requestPicturesBySearchValue = async (query, page) => {
  const { data } = await axios.get(
    `/search/photos?client_id=${API_KEY}&query=${query}&page=${page}`
  );

  return data;
};
