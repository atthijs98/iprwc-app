export class ProductImage {
  public id?: number;
  public path: string;
  public description: string;

  constructor(id: number, path: string, description: string) {
    this.id = id;
    this.path = path;
    this.description = description;
  }
}
