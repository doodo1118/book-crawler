const puppeteer = require('puppeteer');
// const mysql = require('mysql');

// async function setDatabase(){
//     const connection = await mysql.createConnection({
//         host: 'localhost', 
//         user: 'root',
//         database: 'p3',
//         password: 'mysql',
//         charset: 'utf8', 
//     })
// }


interface Item{}

class Book implements Item{
    coverImage : String;
    title : String;
    author : String;
    publisher : String;
    publicationYear : String;
    link : String;

    constructor( coverImage :String, title :String, author :String, publisher :String, publicationYear :String, link :String ){
        this.coverImage = coverImage;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.link = link;
    };
}


class Crawler{
    browser;
    page;

    database : Object;
    items : Item[];

    targetSite : targetSite;

    constructor( targetSite:targetSite ){
        console.log(targetSite );
        this.targetSite = targetSite;
    }
    
    async setPuppeteer(){
        this.browser = await puppeteer.launch({ headless:false});
        this.page = await this.browser.newPage();
        await this.page.setViewport({width: 0, height: 0});
    }
    async crawlItemTitledAs (title : String) {
        this.crawlItemsInPageOf( this.targetSite.search(title) );
        // parseItemInformation();
    }

    async crawlNewProducts() {
        let length = this.targetSite.newProductsLocation.length;

        for(let i=0; i<length; i++){
            this.crawlItemsInPageOf( this.targetSite.newProductsLocation[i] );
        }
    }
    async crawlItemsInPageOf (targetPage : String) {
        await this.page.goto( targetPage,  {waitUntil: 'load', timeout: 0} );
        await this.page.waitForSelector( this.targetSite.selector.ofItemWrap );
        let items = await this.page.$$(this.targetSite.selector.ofItemWrap);
        

        for(let item of items){

            let itemInformation = {
                title:"", author:"", coverImage:"", publisher:"", publicationYear:"",
            };


            itemInformation.title = await item.$eval(this.targetSite.selector.ofTitle, el=>el.innerText);
            itemInformation.author = await item.$eval(this.targetSite.selector.ofAuthor, el=>el.innerText);
            itemInformation.coverImage = await item.$eval(this.targetSite.selector.ofCoverImage, el=>el.getAttribute("src")); 
            [itemInformation.publisher, itemInformation.publicationYear] = await item.$$eval(this.targetSite.selector.ofPublisher, els=>{ return [ els[0].innerText, els[1].innerText ] }); 
            
            console.log(itemInformation);
            // save to database;
        }

    }
    saveItemsToDatabase ():void{
        
    }
}

interface targetSite{

    baseUrl : String;
    newProductsLocation : String[];
    searchUrl : String;

    selector:{
        ofItemWrap : String;
        ofCoverImage : String;
        ofTitle : String;
        ofAuthor : String;
        ofPublisher : String;
        ofPublicationYear : String;
        ofLink : String;

        ofNextPage : String;
        ofPageList : String;
    };

    search( title:String ) :String;
    parsePublicationYear();
    parseCoverImage(): String;
    parseLink()
}

class Kyobo implements targetSite{

    baseUrl = 'https://kyobobook.co.kr/';
    newProductsLocation = ['https://kyobobook.co.kr/newproduct/newProductList.laf?mallGb=KOR'];
    searchUrl= "https://search.kyobobook.co.kr/web/search?vPstrKeyWord=";

    selector={
            // li.detailli || 
            ofItemWrap : 'div.info_area',
            ofCoverImage : 'div.cover_wrap img',//src
            ofTitle : 'div.title',
            ofAuthor : 'span.author',
            ofPublisher : 'span.publication',
            ofPublicationYear : 'span.publication.text.trim()',
            ofLink : 'div.title a.href',

            ofNextPage : 'div.list_paging a.btn_next',
            ofPageList : 'div.list_paging li a',
        }


    search(title:String) :String{
        return this.searchUrl + title;
    }

    parsePublicationYear() {

    }

    parseCoverImage(): String{
        return ""
    }

    parseLink(){

    }
}
let kyobo = new Kyobo();
console.log(kyobo);
let kyoboCrawler = new Crawler(kyobo);

async function a() {
    await kyoboCrawler.setPuppeteer();
    await kyoboCrawler.crawlItemTitledAs('typescript');
};

a();


