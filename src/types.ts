export interface ShopItem {
  id: string;
  logo: string;
  logoImg: string;
  title: string;
  desc: string;
  subDesc: string;
  link: string;
  category: string;
  images: string[];
  clicks: number;
}

export type VideoCategory =
  | 'Letters' | 'Numbers' | 'Colors' | 'Shapes' | 'Animals' | 'New Uploads';

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  category: VideoCategory;
  youtubeId?: string;
  url?: string;
  description?: string;
}

export interface Partner {
  name: string;
  logo: string;
  logoImg: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export interface Profile {
  name: string;
  birthday: string;
  sex: string;
  address: string;
  picture: string;
  idNumber: string;
}
