export interface Urls {
  small: string;
  regular: string;
}

export interface Image {
  id: string;
  alt_description: string;
  urls: Urls;
  color: string;
}
export interface Response {
  total: number;
  total_pages: number;
  results: Image[];
}
