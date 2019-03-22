import request from 'superagent';
import $ from 'cheerio';
import wtf from "wtf_wikipedia";

const listUrl = 'https://en.wikipedia.org/wiki/List_of_casinos';
const listOfUsKeyWordPrefix = 'List of casinos in ';

export async function getCasinoList(){
    try {
        console.log("getCasinoList");
        const res = await request
            .get(listUrl).set("Access-Control-Allow-Origin", "*");
        // res.body, res.headers, res.status
        // refno = $(res.text).find('div[class="mw-parser-output"] > ul > li > a );
        console.log($('div[class="mw-parser-output"] > ul > li > a', res.text));
        return res;
    } catch(err) {
        // err.message, err.response
    }
};

let searchWiki = (keyWord) => {
    return wtf.fetch(keyWord);
};

export async function getCasinoListExt(){
    searchWiki("List of casinos").then(doc => {

        console.log(doc);
        for(let item of doc.sections()){
            if(item && item.depth > 0){
                console.log(item.links().map(p => p.page));
            }
        }
    console.log(doc.sections(2).links().map(p => p.page));

    // doc.categories();
    // //['Oral communication', 'Vocal music', 'Vocal skills']
    //
    //
    //
    // doc.sections('As communication').text();
    // // 'A traditional whistled language named Silbo Gomero..'
    //
    // doc.images(0).thumb();
    // // 'https://upload.wikimedia.org..../300px-Duveneck_Whistling_Boy.jpg'
    //
    // doc.sections('See Also').links().map(link => link.page)
    // //['Slide whistle', 'Hand flute', 'Bird vocalization'...]
});

}
export  function getUsCasinoList(stateName, successHandler,failHandler) {
    // try {
    //     const doc = await searchWiki(listOfUsKeyWordPrefix);
    //     // res.body, res.headers, res.status
    //     // refno = $(res.text).find('div[class="mw-parser-output"] > ul > li > a );
    //     // console.log(doc.sections('Organized by state').tables().data);
    //     return doc.tables('0').data.map(p=>{
    //         let newObj = {};
    //         for(var key in p) {
    //             console.log(p[key]);
    //             newObj[key] = p[key].data.text;
    //         }
    //         return newObj;
    //     });
    // } catch(err) {
    //     // err.message, err.response
    // }
    var i = 0;
    let searchKeyword = listOfUsKeyWordPrefix + stateName||'';
    console.log(searchKeyword);
    searchWiki(searchKeyword).then(doc => {

        // console.log(doc.tables(0).keyValue());

        let result = doc.tables(0).keyValue().map(p=>{
            p.id = ++i;
            p.DateOpened = "2019";
            return p;
        });

        successHandler(result);
        // for(let item of doc.sections()){
        //     if(item && item.depth > 0){
        //         console.log(item.links().map(p => p.page));
        //     }
        // }
        // console.log(doc.sections(2).links().map(p => p.page));

        // doc.categories();
        // //['Oral communication', 'Vocal music', 'Vocal skills']
        //
        //
        //
        // doc.sections('As communication').text();
        // // 'A traditional whistled language named Silbo Gomero..'
        //
        // doc.images(0).thumb();
        // // 'https://upload.wikimedia.org..../300px-Duveneck_Whistling_Boy.jpg'
        //
        // doc.sections('See Also').links().map(link => link.page)
        // //['Slide whistle', 'Hand flute', 'Bird vocalization'...]
    });
}
