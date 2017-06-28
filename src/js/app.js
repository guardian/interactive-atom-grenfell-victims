let detailOverlay;

function init(){
    detailOverlay = document.getElementById("detailOverlay");
	addListeners()
}

function addListeners(){
	[].slice.apply(document.querySelectorAll('.gv-pic-grid-item')).forEach(el => {
            el.addEventListener('click', () => openDetailContainer(el));         
    });

    detailOverlay.addEventListener('click', function(){ detailOverlay.classList.remove('opened'); } ); 
}




    
function openDetailContainer(el){
		document.getElementById('detailScroll').scrollTop = 0;
		
        let detailEl = document.getElementById('detailItem_'+el.getAttribute("id").split("_")[1]);

        var mainContentOffset = document.getElementById('mainContent').offsetTop;	
        var gridItemOffSet = el.offsetTop;

        console.log(mainContentOffset, gridItemOffSet)

        var detailOffset = detailEl.offsetTop;
        var parentContainerOffset = document.getElementById('detailScroll').offsetTop;
        var parentContainerScroll  = document.getElementById('detailScroll').scrollTop;
        var oldOffset = parentContainerScroll;

        
        var newOffset = detailOffset - parentContainerOffset + parentContainerScroll - gridItemOffSet - 16;
        
        detailOverlay.classList.add('opened');   
        
       document.getElementById('detailScroll').scrollTop = newOffset;

       console.log(document.getElementById('detailScroll').scrollTop)
}



init();