// brand 88 256~ 
const puppeteer = require("puppeteer");
const mysql = require("mysql");
const links = require("./links");


// loop links
// check whether new series are there 

(async function main() {
    try{

        const connection = await mysql.createConnection({
            host: 'localhost', 
            user: 'root',
            database: 'p3',
            password: 'mysql',
            charset: 'utf8', 
        })

        const latest_season = links.vogue.season[links.vogue.season.length-1];
        const link = links.vogue.site + latest_season;

        //browser setting
        const browser = await puppeteer.launch({ headless:false});
        const page = await browser.newPage();
        await page.setViewport({width: 0, height: 0});

        await page.goto(link,  {waitUntil: 'load', timeout: 0});
        await page.waitForSelector("li.tab-list--item__brand");   
        const lis = await page.$$("li.tab-list--item__brand");

        // for( const li of lis){
        for(let i=256; i<lis.length; i++){
            let count =0;
        
            await page.goto('https://www.vogue.com/fashion-shows/spring-2020-ready-to-wear',  {waitUntil: 'load', timeout: 0});
            await page.waitForSelector("li.tab-list--item__brand");   
            const lis = await page.$$("li.tab-list--item__brand");

            const [brand_name, link_to_brand] = await lis[i].$eval('a', a=>[a.innerText, a.getAttribute("href")]);
            
            // brand list 저장
            // connection.query(
            //     `INSERT INTO brands(brand_id) VALUES('${brand_name}')`,
            //     function(err, results){
            //         console.log(err);
            //         console.log(results);
            //     }
            // )

            await page.goto(link_to_brand, {timeout:0});

            // click 왜안돼
            // const brand_name = await li.$eval("a", a=>a.innerText);
            // await li.click();
            

            
            // depth 2
            await page.waitForSelector("div.gallery-marker", {timeout:0});
            const gallery_marker_div = await page.$("div.gallery-marker");
            await gallery_marker_div.click();

            // depth 3 
            await page.waitForSelector("button.gallery--thumbnails--handle", {timeout:0});
            const gallery_thumbnails_handle_button = await page.$("button.gallery--thumbnails--handle");
            await gallery_thumbnails_handle_button.click();

            // change view in depth 3
            await page.waitForSelector("div.lazyload-wrapper", {timeout:0});
            await page.waitFor(5000);
            const lazyload_wrappers = await page.$$("div.lazyload-wrapper");
            for(const lazyload_wrapper of lazyload_wrappers){
                const style_img_link = await lazyload_wrapper.$eval("img", img=>img.getAttribute("data-original"));
                // save into database
                connection.query(`INSERT INTO style(brand_id, image_small) VALUE( "${brand_name}", "${style_img_link}" )`);
                
                count++
                console.log("brand", i, brand_name, count);
                
            }
        }
        
        
        
    }catch(e){
        console.log('our error', e);
    }
    
})();
