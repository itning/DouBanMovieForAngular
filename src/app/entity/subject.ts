/* tslint:disable:variable-name */
export class Subject {
  rating: Rating;
  genres: [];
  title: string;
  casts: Array<Cast>;
  collect_count: number;
  original_title: string;
  subtype: string;
  directors: Array<Director>;
  year: number;
  images: Avatars;
  alt: string;
  id: string;
}

export class Rating {
  max: number;
  average: number;
  stars: string;
  min: number;
}

export class Cast {
  alt: string;
  avatars: Avatars;
  name: string;
  id: string;
}

export class Avatars {
  small: string;
  large: string;
  medium: string;
}

export class Director {
  alt: string;
  name: string;
  id: string;
  avatars: Avatars;
}
