import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    // remove the selector because we no long nest this component
    // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    // providers: [ProductService] // only register the service for this component and its children
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;    

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        // console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    sub!: Subscription; // add ! to tell it the value will be assigned later
    errorMessage: string = '';

    constructor(private productService: ProductService) {        
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        let result: IProduct[] = this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().includes(filterBy));
        return result;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
        // remove this so the inital page display full product list
        // this.listFilter = 'cart';

        // had to add this to make initial filter with 'cart' on page load work
        // or change this._listFilter = 'cart'; to be without underscore
        // this.filteredProducts = this.performFilter(this._listFilter);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
