export interface BooksState {
  books: Ibooks;
  searchString: string;
  loadBookDetails: string;
  cart: Iitems[];
  collections: Iitems[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface Ibooks {
  items: Iitems[]
}


export interface Iitems {
  id: string;
  volumeInfo: volumeInfo
  billingDetails?: billingDetails
}
export interface volumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  description: string;
  imageLinks: imageLinks;
  averageRating: number;
  publisher: string;
  pageCount: number;
  language: string;
}

export interface imageLinks {
  thumbnail: string
}

export interface billingDetails {
  name: string;
  email: string;
  phone: number;
  address: string;
}