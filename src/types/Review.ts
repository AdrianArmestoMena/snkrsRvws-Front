export interface ReviewAdd {
  brand: string;
  model: string;
  review: string;
  picture: string;
  owner: string;
}

export interface Review {
  brand: string;
  model: string;
  review: string;
  picture: string;
  owner: string;
  likes: string[];
  comments: string[];
  id: string;
}

export interface ReviewsResponse {
  reviews: Review[];
}
