/////////////   Data getting request    //////////
const connectionReq = new XMLHttpRequest()
connectionReq.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
connectionReq.send();

/////////////   Tags Creations by DOM   /////////
document.body.className="container";
var table = document.createElement('table')
table.className='table table-striped';
table.id='tmain';
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
        var totalPages = Math.floor(dataLength/dataPerPages);
        var div = document.createElement('div');
        div.className='btndiv'    
        for(i=1;i<=totalPages;i++){
            var btn = document.createElement('button')
            btn.className='pageBtn'
            btn.setAttribute('type','button');
            btn.innerHTML=i;
            div.append(btn);
            btn.addEventListener('click',function()
            {
                currentpage = parseInt(this.innerHTML);
                displaydata(currentpage)
            })
            btn.className='pageBtn'
            btn.setAttribute('type','button');
        }
        document.body.append(div);
    }
    displaydata(currentpage)
    pageLoaded();
}


thead.append(titletr);

table.append(thead,tbody);
document.body.append(table);