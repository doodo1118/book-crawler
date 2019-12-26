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
    
    database : Object;

    items : Item[];

    config:{
        baseUrl : String;
        newProductsLocation : String[];
    
        selector :{
            ofItemWrap : String;
            ofCoverImage : String;
            ofTitle : String;
            ofAuthor : String;
            ofPublisher : String;
            ofPublicationYear : String;
            ofLink : String;
    
            ofSearchInput : String;
    
            ofPageList : String;
            ofNextPage : String;
        }
    }

    constructor( site:targetSite ){
        this.config = site.config;
    }
    

    
    setPuppeteer(): void{
        
    }
    crawlItemTitledAs (title : String) : void{

    }
    crawlItemsInPageOf (targetPage : String) : void{
        
    }
    saveItemsToDatabase ():void{
        
    }
}

interface targetSite{
    config:{
        baseUrl : String;
        newProductsLocation : String[];
        selector:{
            ofItemWrap : String;
            ofCoverImage : String;
            ofTitle : String;
            ofAuthor : String;
            ofPublisher : String;
            ofPublicationYear : String;
            ofLink : String;
    
            ofSearchInput : String;
    
            ofNextPage : String;
            ofPageList : String;
        }
    }
}

class Kyobo implements targetSite{
    config:{

        baseUrl : 'https://kyobobook.co.kr/';
        newProductsLocation : ['newproduct/newProductList.laf?mallGb=KOR'];
        selector:{
            ofItemWrap : 'li.detailli  || div.info_area';
            ofCoverImage : 'div.cover_wrap img.src';
            ofTitle : 'div.title strong.text';
            ofAuthor : 'span.author.text';
            ofPublisher : 'span.publication.text';
            ofPublicationYear : 'span.publication.text.trim()';
            ofLink : 'div.title a.href';
    
            ofSearchInput : "input.main_input";
    
            ofNextPage : 'div.list_paging a.btn_next';
            ofPageList : 'div.list_paging li a';
        }

    }
}
