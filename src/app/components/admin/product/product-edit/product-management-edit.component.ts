import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../../product/product.service";
import {HttpService} from "../../../../shared/services/http.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../../models/product.model";

@Component({
  selector: 'app-product-management-edit',
  templateUrl: './product-management-edit.component.html',
  styleUrls: ['./product-management-edit.component.scss']
})
export class ProductManagementEditComponent implements OnInit {
  id!: number;
  editMode = false;
  imagesToBeDeleted = [];
  directorsToBeDeleted = [];
  productForm!: FormGroup;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private httpService: HttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm(): void {
    let englishTitle = '',
      originalTitle: string | undefined = '',
      romanizedOriginalTitle = '',
      runtime = '',
      poster = '',
      plot = '',
      year = '',
      price = 0.00,
      trailer = '',
      productDirectors = new FormArray([]),
      productImages = new FormArray([]);

   if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      this.productForm = new FormGroup({
        englishTitle: new FormControl('', [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(1)
        ]),
        originalTitle: new FormControl('', [
          Validators.minLength(1),
          Validators.maxLength(255)
        ]),
        romanizedOriginalTitle: new FormControl('', [
          Validators.minLength(1),
          Validators.maxLength(255),
        ]),
        runtime: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(15)
        ]),
        poster: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ]),
        plot: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(500)
        ]),
        year: new FormControl('', [
          Validators.required
        ]),
        price: new FormControl(0.00, [
          Validators.required,
          Validators.min(0.01),
          Validators.max(999999.99)
        ]),
        trailer: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(85)
        ]),
        productDirectors: new FormArray([]),
        productImages: new FormArray([])
      });
      console.log(product);
      englishTitle = product['englishTitle'];
      originalTitle = product['originalTitle'];
      romanizedOriginalTitle = product.romanizedOriginalTitle;
      runtime = product.runtime;
      poster = product.poster;
      plot = product.plot;
      year = product.year;
      price = product.price;
      trailer = product.trailer;
      for (let director of product.productDirectors) {
        productDirectors.push(
          new FormGroup({
            id: new FormControl(director.id),
            name: new FormControl(director.name)
          })
        )
      }
      for (let image of product.productImages) {
        productImages.push(
          new FormGroup({
            id: new FormControl(image.id),
            path: new FormControl(image.path)
          })
        )
      }
    }
    this.productForm = new FormGroup({
      englishTitle: new FormControl(englishTitle, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(1)
      ]),
      originalTitle: new FormControl(originalTitle, [
        Validators.minLength(1),
        Validators.maxLength(255)
      ]),
      romanizedOriginalTitle: new FormControl(romanizedOriginalTitle, [
        Validators.minLength(1),
        Validators.maxLength(255),
      ]),
      runtime: new FormControl(runtime, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ]),
      poster: new FormControl(poster, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(255)
      ]),
      plot: new FormControl(plot, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]),
      year: new FormControl(year, [
        Validators.required
      ]),
      price: new FormControl(price, [
        Validators.required,
        Validators.min(0.01),
        Validators.max(999999.99)
      ]),
      trailer: new FormControl(trailer, [
        Validators.required,
        Validators.min(1),
        Validators.max(85)
      ]),
      productDirectors: productDirectors,
      productImages: productImages
    });
    console.log(this.productForm);
  }



  onSubmit(): void {
    console.log(this.productForm.value);
   // if (this.editMode) {
     // this.productService.updateProduct(this.id, this.productForm.value);
      // for (let director of this.directorsToBeDeleted) {
      //   this.httpService.deleteDirector(director);
      // }
      // for (let image of this.imagesToBeDeleted) {
      //   this.httpService.deleteImage(image);
      // }
   // } else {
     // this.productService.addProduct(this.productForm.value);
   // }
    // this.imagesToBeDeleted = [];
    // this.directorsToBeDeleted = [];
  }

  onCancel(): void {
    this.imagesToBeDeleted = [];
    this.directorsToBeDeleted = [];
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get images() {
    return (<FormArray>this.productForm.get('productImages')).controls;
  }

  get directors() {
    return (<FormArray>this.productForm.get('productDirectors')).controls;
  }

  onDeleteImage(index: number, id: number) {
    // @ts-ignore
    this.imagesToBeDeleted.push(id);
    (<FormArray>this.productForm.get('productImages')).removeAt(index);
  }

  onDeleteDirector(index: number, id: number) {
    // @ts-ignore
    this.directorsToBeDeleted.push(id);
    (<FormArray>this.productForm.get('productDirectors')).removeAt(index);
  }

  onAddImage() {
    (<FormArray>this.productForm.get('productImages')).push(
      new FormGroup({
        'path': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
      })
    )
  }

  onAddDirector() {
    (<FormArray>this.productForm.get('productDirectors')).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
      })
    )
  }

}
