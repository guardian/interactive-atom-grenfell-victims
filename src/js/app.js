import debounce from 'javascript-debounce'

let detailOverlay, mainContainer, windowWidth, shim;
let isInApp = false;

if(!window){
    windowWidth = 460;
    isInApp = true;
}else{
    window.onresize = delayedAdjust;
    windowWidth = window.innerWidth;
}
var isMobile = windowWidth < 460 ? true : false;
var isTablet = windowWidth > 459 && windowWidth < 980 ? true : false;
var isDesktop = windowWidth > 979 ? true : false;


var delayedAdjust = debounce(addListeners, 1000);


function init() {
    detailOverlay = document.getElementById("detailOverlay");
    mainContainer = document.getElementById("gv-content-container");
    addListeners();
}

function addListeners() {

    setShim();

    [].slice.apply(document.querySelectorAll('.facewall-item')).forEach(el => {
        var elId = el.getAttribute("id");
        el.addEventListener('click', () => openDetailContainer(el,elId));
    });

    if(isMobile){
       detailOverlay.addEventListener('click', function() { detailOverlay.classList.remove('opened'); });
    }

    [].slice.apply(document.querySelectorAll('.cta-button-holder')).forEach(el => {
          el.addEventListener('click', () => window.open(el.getAttribute("data-link")) );
    });

    
}


var isMobile = windowWidth < 460 ? true : false;
var isTablet = windowWidth > 459 && windowWidth < 980 ? true : false;
var isDesktop = windowWidth > 979 ? true : false;

function setShim(){
    let newShim = 0;
    if(isMobile) { newShim = 84 }
    if(isTablet) { newShim = 109 }
    if(isDesktop) { newShim = 0 }

    return newShim;
}

function openDetailContainer(el,elId) {
    var bannerHeaderEl = document.getElementById("bannerandheader");
    var detailScrollEl = document.getElementById('detailScroll');
    var detailContainerEl = document.getElementById('detailOverlay');


    if (bannerHeaderEl) {
        isElementVisible(bannerHeaderEl) ? detailScrollEl.style.paddingTop = bannerHeaderEl.offsetHeight + "px" : detailScrollEl.style.paddingTop = 0;
        shim = bannerHeaderEl.offsetHeight;
    }

   
    var itemDetailEl = document.getElementById('detailItem_' + elId.split("_")[1]);
    var itemDetailOffset = itemDetailEl.getBoundingClientRect().top;
    var parentContainerOffset = document.getElementById('detailScroll').getBoundingClientRect().top;
    var parentContainerScroll = document.getElementById('detailScroll').scrollTop;
    var oldOffset = parentContainerScroll;
    var newOffset = itemDetailOffset - parentContainerOffset + parentContainerScroll - shim;

    console.log(shim)
    //document.querySelector('.interactive-container').className += ' detail-panel-opened';
    detailOverlay.classList.add('opened');
    document.getElementById('detailScroll').scrollTop = newOffset;

    if(!isMobile){
        detailScrollEl.style.paddingTop = 0;
        moveDetail(el, detailContainerEl);       
    }

    setHighLight(elId);
}


function moveDetail(el, detailContainerEl){
    let sectionRef = (el.getAttribute("section-ref") );

    [].slice.apply(document.querySelectorAll('.main-list-bullet')).forEach(sectionEl => {
        var elRef = sectionEl.getAttribute("section-ref");
        if(elRef == sectionRef){ 
          detailScroll.classList.remove("add-border-bottom")
          detailContainerEl.style.top = (sectionEl.offsetTop+12) +"px" ;
          if(( sectionEl.offsetTop + detailContainerEl.offsetHeight ) > mainContainer.offsetHeight){ 

              detailScroll.classList.add("add-border-bottom")
              detailContainerEl.style.top =  (  ((sectionEl.offsetTop -  detailContainerEl.offsetHeight )+13)   +"px"   )
          
          }

      }
       
        
    });


}


function isElementVisible(el) {
    var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        efp = function(x, y) {
            return document.elementFromPoint(x, y) };

    return (rect.height * -1 < rect.top)
}

function setHighLight(elId) {
    let ref = elId.split("_")[1];
    [].slice.apply(document.getElementsByClassName('item-photo selected')).forEach(el => {
        el.classList.remove('selected');
    });

    [].slice.apply(document.getElementsByClassName('gv-detail-img selected')).forEach(el => {
        el.classList.remove('selected');
    });

    [].slice.apply(document.getElementsByClassName('gv-detail-item selected')).forEach(el => {
        el.classList.remove('selected');
    });

    document.getElementById(elId).getElementsByClassName("item-photo")[0].classList.add('selected');
    document.getElementById("detailItemImg_" + ref).classList.add('selected');
    document.getElementById("detailItem_" + ref).classList.add('selected');
}

init();