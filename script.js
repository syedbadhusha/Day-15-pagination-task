/////////////   Data getting request    //////////
const connectionReq = new XMLHttpRequest()
connectionReq.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
connectionReq.send();

/////////////   Tags Creations by DOM   /////////
document.body.className="container";
var title = document.createElement('h1')
title.id='title'
title.className='title'
title.innerHTML='WEB DEVELOPER TASK'

var pdesc = document.createElement('p');
pdesc.id='description';
pdesc.className='title';
pdesc.innerHTML='Pagination in DOM Manipulation'

var div = document.createElement('div')
div.setAttribute('class','table-responsive')

var table = document.createElement('table')
table.setAttribute('class','table table-bordered');
table.id='table';
var thead = document.createElement('thead');
thead.className='thead-dark'

function tr(){
    var ele = document.createElement('tr');
    return ele
}
var tbody = document.createElement('tbody');

function th_td(tagName,classvalue,content){
    var ele = document.createElement(tagName)
    ele.className=classvalue;
    ele.innerHTML = content;
    return ele;
}
var titletr = tr();
var titleid = th_td('th','col-md-4 aligntitleid','ID');
var titlename = th_td('th','col-md-4','NAME');
var titleemail = th_td('th','col-md-4','EMAIL');

titletr.append(titleid,titlename,titleemail);
connectionReq.onload = function(){
    var res = JSON.parse(connectionReq.response)
    var currentpage = 1;
    var dataLength = res.length;
    var dataPerPages = 10;
    function displaydata(pageNo){
        tbody.innerHTML='';
        var startData = (pageNo-1)*dataPerPages
        var endData = pageNo*dataPerPages;
        var dataPerpageloaded = res.slice(startData,endData)
        dataPerpageloaded.forEach(element => {
            var bodytr = tr();
            var bodyid = th_td('td','col-md-2 alignbodyid',element.id);
            var bodyname = th_td('td','col-md-5',element.name);
            var bodyemail = th_td('td','col-md-5',element.email);
            tbody.append(bodytr);
            bodytr.append(bodyid,bodyname,bodyemail);
                
        });
    }
    function pageLoaded(){
        var existbtndiv = document.querySelector('#buttons')
        if(existbtndiv){
            existbtndiv.parentNode.removeChild(existbtndiv)
        }
        var totalPages = Math.floor(dataLength/dataPerPages);
        var divpgNo = document.createElement('div');
        divpgNo.className='d-flex justify-content-center'
        divpgNo.id='buttons'
        var fbtn = document.createElement('button')
        fbtn.className='pageBtn'
        fbtn.setAttribute('type','button');
        fbtn.innerHTML='First';
        fbtn.addEventListener('click',function(){
            currentpage = 1;
            displaydata(currentpage)
            pageLoaded();
        })
        divpgNo.append(fbtn);
        var pbtn = document.createElement('button')
        pbtn.className='pageBtn'
        pbtn.setAttribute('type','button');
        pbtn.innerHTML='Prev';
        pbtn.addEventListener('click',function(){
            if(currentpage>1)
            currentpage--;
            displaydata(currentpage)
            pageLoaded();
        })
        divpgNo.append(pbtn);

        var startpage = Math.max(1,currentpage-2)
        var endpage = Math.min(startpage+4,totalPages)
        
        for(i=startpage;i<=endpage;i++){
            var btn = document.createElement('button')
            btn.className='pageBtn'
            btn.setAttribute('type','button');
            btn.innerHTML=i;
            divpgNo.append(btn);
            btn.addEventListener('click',function()
            {
                currentpage = parseInt(this.innerHTML);
                displaydata(currentpage)
                pageLoaded();
            })
            btn.className='pageBtn'
            btn.setAttribute('type','button');
        }
        var nbtn = document.createElement('button')
        nbtn.className='pageBtn'
        nbtn.setAttribute('type','button');
        nbtn.innerHTML='Next';
        nbtn.addEventListener('click',function(){
            if(currentpage<totalPages)
            currentpage++;
            displaydata(currentpage)
            pageLoaded();
        })
        divpgNo.append(nbtn);
        var lbtn = document.createElement('button')
        lbtn.className='pageBtn'
        lbtn.setAttribute('type','button');
        lbtn.innerHTML='Last';
        lbtn.addEventListener('click',function(){
            currentpage=totalPages;
            displaydata(currentpage)
            pageLoaded();
        })
        if(startpage>1){
            var continuedots = document.createElement('span')
            continuedots.innerHTML='<<<'
            divpgNo.insertBefore(continuedots,divpgNo.children[2])
        }
        if(endpage<totalPages){
            var continuedotsend = document.createElement('span')
            continuedotsend.innerHTML='>>>'
            divpgNo.insertBefore(continuedotsend,divpgNo.children[divpgNo.children.length-1])
        }
        divpgNo.append(lbtn);
        document.body.append(divpgNo);
    }
    displaydata(currentpage)
    pageLoaded();
}


thead.append(titletr);

table.append(thead,tbody);
div.append(table)
document.body.append(title,pdesc,div);