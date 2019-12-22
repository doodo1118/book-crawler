const puppeteer = require('puppeteer');

class Book {
    coverImage : String;
    title: String;
    author: String;
    publisher: String;
    publicationYear: String;

    constructor(){};
}

class BookCrawler {
    database : Object;

    baseUrl : String;
    newProductsLocation : String[];

    selectorOfListItems : String;
    selectorOfCoverImage : String;
    selectorOfTitle: String;
    selectorOfAuthor: String;
    selectorOfPublisher: String;
    selectorOfPublicationYear: String;
    selectorOfBookLink : String;

    selectorOfSearchForm : String;

    selectorOfPage : String;
    selectorOfNextPage : String;

    crawlABookTitledAs (title : String) : void{

    }
    crawlBooksInPageOf (targetPage : String) : void{
        
    }

}

class KyoboBookCrawler extends BookCrawler{
    database = {};
    baseUrl = 'https://kyobobook.co.kr/';
    newProductsLocation = ['newproduct/newProductList.laf?mallGb=KOR'];

    selectorOfListItems : String;
    selectorOfCoverImage : String;
    selectorOfTitle: String;
    selectorOfAuthor: String;
    selectorOfPublisher: String;
    selectorOfPublicationYear: String;
    selectorOfBookLink : String;

    selectorOfSearchForm = "input.main_input";

    selectorOfPage : String;
    selectorOfNextPage : String;

    public crawlABookTitledAs(title){

    }

    public crawlBooksInPageOf(targetPage){
        
    }
    


}