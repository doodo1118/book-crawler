const puppeteer = require('puppeteer');
const mysql = require('mysql');

async function setDatabase(){
    const connection = await mysql.createConnection({
        host: 'localhost', 
        user: 'root',
        database: 'p3',
        password: 'mysql',
        charset: 'utf8', 
    })
}





interface Item{}

class Book implements Item{
    coverImage : String;
    title : String;
    author : String;
    publisher : String;
    publicationYear : String;

    constructor( coverImage :String, title :String, author :String, publisher :String, publicationYear :String ){
        this.coverImage = coverImage;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
    };
}


interface Crawler {
    items : Item[];

    selectors :{
        ofItemWrap : String;
        ofCoverImage : String;
        ofTitle : String;
        ofAuthor : String;
        ofPublisher? : String;
        ofPublicationYear? : String;
        ofSiteLink? : String;

        ofSearchInput : String;

        ofNextPage : String;
    }

    setPuppeteer(): void;
    crawlItemTitledAs(title: String) : void;
    crawlItemsInPageOf(targetPage : String) : void;
    saveItemsToDatabase(items : Item[]) : void;
}

class BookCrawler implements Crawler{
    database : Object;

    items : Item[];

    baseUrl : String;
    newProductsLocation : String[];

    selectors :{
        ofItemWrap : String;
        ofCoverImage : String;
        ofTitle : String;
        ofAuthor : String;
        ofPublisher : String;
        ofPublicationYear : String;
        ofSiteLink : String;

        ofSearchInput : String;

        ofNextPage : String;
    }

    constructor(site:targetSite, item:Item){
        this.baseUrl = site.baseUrl;
        this.newProductsLocation = site.newProductsLocation;

        this.selectors = site.selectors;
    }
    

    
    setPuppeteer(): void{

    }
    crawlItemTitledAs (title : String) : void{

    }
    crawlItemsInPageOf (targetPage : String) : void{
        
    }
    saveItemsToDatabase (items : Item[]):void{

    }
}
interface targetSite{
    baseUrl : String;
    newProductsLocation : String[];
    selectors:{
        ofItemWrap : String;
        ofCoverImage : String;
        ofTitle : String;
        ofAuthor : String;
        ofPublisher : String;
        ofPublicationYear : String;
        ofSiteLink : String;

        ofSearchInput : String;

        ofNextPage : String;
    }
}
class Kyobo implements targetSite{
    baseUrl : 'https://kyobobook.co.kr/';
    newProductsLocation : ['newproduct/newProductList.laf?mallGb=KOR'];
    selectors:{
        ofItemWrap : String;
        ofCoverImage : String;
        ofTitle : String;
        ofAuthor : String;
        ofPublisher : String;
        ofPublicationYear : String;
        ofSiteLink : String;

        ofSearchInput : "input.main_input";

        ofNextPage : String;
    }
}
