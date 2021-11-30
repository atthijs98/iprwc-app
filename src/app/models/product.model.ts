import {ProductImage} from "./productImage.model";
import {ProductDirector} from "./productDirector.model";

export class Product {
  public id: number;
  public englishTitle: string;
  public originalTitle?: string;
  public romanizedOriginalTitle: string;
  public runtime: string;
  public poster: string;
  public plot: string;
  public year: string;
  public price: number;
  public productDirectors: ProductDirector[];
  public productImages: ProductImage[];
  public trailer: string;

  constructor(id: number,
              enTitle: string,
              orTitle: string,
              romOrTitle: string,
              runtime: string,
              poster: string,
              plot: string,
              year: string,
              price: number,
              directors: ProductDirector[],
              images: ProductImage[],
              trailer: string) {
    this.id = id;
    this.englishTitle = enTitle;
    this.originalTitle = orTitle;
    this.romanizedOriginalTitle = romOrTitle;
    this.runtime = runtime;
    this.poster = poster;
    this.plot = plot;
    this.year = year;
    this.price = price;
    this.productDirectors = directors;
    this.productImages = images;
    this.trailer = trailer;
  }
}
