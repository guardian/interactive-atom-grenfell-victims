let detailOverlay;
let windowWidth;
let isInApp = false;

if(!window){
    windowWidth = 970;
    isInApp = true;
}else{
    window.onresize = addListeners;
    windowWidth = window.innerWidth;
}
var isMobile = windowWidth < 980 ? true : false;



function init() {
    detailOverlay = document.getElementById("detailOverlay");
    addListeners();
}

function addListeners() {
    [].slice.apply(document.querySelectorAll('.facewall-item')).forEach(el => {
        var elId = el.getAttribute("id");
        el.addEventListener('click', () => openDetailContainer(el,elId));
    });

    detailOverlay.addEventListener('click', function() { detailOverlay.classList.remove('opened'); });
}


function openDetailContainer(el,elId) {
    var bannerHeaderEl = document.getElementById("bannerandheader");
    var detailScrollEl = document.getElementById('detailScroll');

    let shim = 0;


    if (bannerHeaderEl) {
        isElementVisible(bannerHeaderEl) ? detailScrollEl.style.paddingTop = bannerHeaderEl.offsetHeight + "px" : detailScrollEl.style.paddingTop = 0;
        shim = bannerHeaderEl.offsetHeight;
    }


    setHighLight(elId);

    var detailContainerEl = document.getElementById('detailOverlay');
    var itemDetailEl = document.getElementById('detailItem_' + elId.split("_")[1]);
    var itemDetailOffset = itemDetailEl.getBoundingClientRect().top;
    var parentContainerOffset = document.getElementById('detailScroll').getBoundingClientRect().top;
    var parentContainerScroll = document.getElementById('detailScroll').scrollTop;
    var oldOffset = parentContainerScroll;
    var newOffset = itemDetailOffset - parentContainerOffset + parentContainerScroll - shim;


    //document.querySelector('.interactive-container').className += ' detail-panel-opened';
    detailOverlay.classList.add('opened');
    document.getElementById('detailScroll').scrollTop = newOffset;

    if(!isMobile){
        detailScrollEl.style.paddingTop = 0;
        moveDetail(el, detailContainerEl);       
    }



}


function moveDetail(el, detailContainerEl){
    let sectionRef = (el.getAttribute("section-ref") );



    [].slice.apply(document.querySelectorAll('.main-list-bullet')).forEach(sectionEl => {
        var elRef = sectionEl.getAttribute("section-ref");
        if(elRef == sectionRef){ detailContainerEl.style.top = (sectionEl.offsetTop+12) +"px" ;}

        console.log("windowWidth",windowWidth)
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