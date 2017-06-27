import rp from 'request-promise-native'
import Handlebars from 'handlebars'
import mainTemplate from './src/templates/main.html!text'
import gridPicTemplate from './src/templates/gridPic.html!text'
import slideDrawerTemplate from './src/templates/slideDrawer.html!text'

let mainEl; 


export async function render() {
    let data = formatData(await rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1K896qTOpgJQhG2IfGAChZ1WZjQAYn7-i869tA5cKaVU.json',
        json: true
    }));

   //	console.log(data) 

	var compiledHTML =	compileHTML(data)

   return compiledHTML;
    
    //let picGridHTML = Mustache.render(picGridHTML, { "sections": data.sections });


}





function formatData(data) {

	let output = data.sheets.people;
    // let sectionsCopy = data.sheets.sectionHeads;
    let count = 0;

    output.map((obj) => {
        obj.ref = count;
        // obj.spriteClass = "obj-"+obj.name.replace(/("|')/g, "").replace(" ", "");
        // obj.photo_filename = encodeURIComponent(obj.name.replace(/'/, '') + '.jpg');
        count++;
    })

    return output;

}

function compileHTML(dataIn){

	var data = {
		gridItems : dataIn
	}
	
	Handlebars.registerPartial({
        'gridPic': gridPicTemplate,
        'slideDrawer': slideDrawerTemplate
    });


    var content = Handlebars.compile( 
                    mainTemplate,
                        { 
                            compat: true                        
                        }
            );

    var newHTML = content(data);

    console.log(data)

    return newHTML
}
