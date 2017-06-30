import rp from 'request-promise-native'
import Handlebars from 'handlebars'
import {groupBy,sortByKey} from './js/libs/arrayObjectUtils.js'
import mainTemplate from './src/templates/main.html!text'
import gridPicTemplate from './src/templates/gridPic.html!text'
import detailItemTemplate from './src/templates/detailItem.html!text'

let mainEl; 
let sections;

export async function render() {
    let data = await loadData();

    var compiledHTML = compileHTML(data)

    return compiledHTML;
}



function formatData(data) {

	let output = data.sheets.people;
    // let sectionsCopy = data.sheets.sectionHeads;
    let count = 0;

    output.map((obj) => {
        obj.ref = count;
        obj.formatName = obj.name.split(",")[0];
        obj.grouping = obj.name.charAt(0).toUpperCase();
        obj.id = obj.name.replace(/[^0-9a-z]/gi, '');
        
        count++;

    })

    output.sort((obj1, obj2) => {return obj1.name > obj2.name});

    
    return output;
}  



function sortByKeys(obj) {
    let keys = Object.keys(obj),i, len = keys.length;

    keys.sort();

    var a = []
    
    for (i = 0; i < len; i++) {

        let k = keys[i];
        let t = {}
        t.sortOn = k;
        t.objArr = obj[k]
        a.push(t);
    }

    return a;
}


function compileHTML(dataIn){

    sections = groupBy(dataIn, 'grouping'); 
    sections = sortByKeys(sections);

	var data = {
        pageSections : sections
	}
	

	Handlebars.registerPartial({
        'gridPic': gridPicTemplate,
        'detailItem': detailItemTemplate
    });


    var content = Handlebars.compile( 
                    mainTemplate,
                        { 
                            compat: true                        
                        }
            );

    var newHTML = content(data); 

    return newHTML
}

// broke this out into a function so it could also be used in the gulpfile for the image resizing
export async function loadData() {
    let data = formatData(await rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1K896qTOpgJQhG2IfGAChZ1WZjQAYn7-i869tA5cKaVU.json',
        json: true
    }));

    return data;
}
