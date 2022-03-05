//selecting values
// let ar1=JSON.parse(localStorage.setItem("list"),JSON.stringify("list"));
// let ar1=[];
// localStorage.setItem("list",JSON.stringify(ar1));
const form=document.querySelector('.grocery-form');
const submitbtn=document.querySelector('.submit-btn');
const alert=document.querySelector('.alert');
const input=document.querySelector('.invariable');
const container=document.querySelector('.grocery-list');
const mainlist=document.querySelector('.grocery-mainlist');
const clearbtn=document.querySelector('.clear');



//
let editflag=false; 
var editId="";
let editElement;
var x;
clearbtn.addEventListener('click',clearAll);
//function
submitbtn.addEventListener('click',addItem);
clearbtn.addEventListener('click',clearAll);
window.addEventListener("DOMContentLoaded",setUp);
function addItem(e)
{
    e.preventDefault();
    const value=input.value;
    const id=new Date().getTime().toString();
    if(value && editflag===false)
    {
        
        console.log("add");
        var art=document.createElement("article");
        var para=document.createElement("p");
        var text=document.createTextNode(value);
        para.appendChild(text);
        art.appendChild(para);
        art.classList.add("list");
        var div=document.createElement("div");
        div.classList.add("list-btn");
        var btn1=document.createElement("button");
        btn1.classList.add("edit");
        var btnelement1=document.createElement("i");
        btnelement1.classList.add("fas", "fa-edit");
        btn1.appendChild(btnelement1);
        var btn2=document.createElement("button");
        btn2.classList.add("remove");
        var btnelement2=document.createElement("i");
        btnelement2.classList.add("fas","fa-trash");
        btn2.appendChild(btnelement2);
        
        div.appendChild(btn1);div.appendChild(btn2);
        art.appendChild(div);
        //add id
        let att=document.createAttribute("data-id");
        att.value=id;
        art.setAttributeNode(att);
        const delbtn=div.querySelector('.remove');
        delbtn.addEventListener("click",deleteItem);
        const editbtn=div.querySelector('.edit');
        editbtn.addEventListener("click",editItem);
        document.querySelector(".grocery-mainlist").appendChild(art);
        displayAlert("item added to the list", "success");
       
        ///////********************************** */
        // container.classList.add("show-container");
        // set local storage
        addToLocalStorage(id, value);
        // // set back to default
        setBackToDefault();
       

   

    }
    else if(value && editflag===true){

        console.log("edit");
        editElement.innerHTML=input.value;
        editflag=false;
        submitbtn.textContent="Submit";
        setBackToDefault();
        console.log(x);
        editLoacalstorage(x,value);
        displayAlert("edited","success");
    }
    else{
        console.log("do not empty value");
        displayAlert("please enter value", "danger");
    }
}
///clearing all functions
function clearAll()
{
    var n=document.querySelector(".grocery-mainlist");
    var items=document.querySelectorAll(".list");
    var array=[...items];
    
    
    array.forEach((e)=> {
        n.removeChild(e);
    });
    
    
    localStorage.clear();
    console.log("clearing all values");
}
function deleteItem(e)
{
    console.log('delete');

    var n=document.querySelector(".grocery-mainlist");
    var ele=e.currentTarget.parentElement.parentElement;
    const id = ele.dataset.id;
   
    n.removeChild(ele);
  
   
    displayAlert("item removed", "danger");
    deleteFromLocalStorage(id);
    setBackToDefault();
 
    
    
}

function editItem(e)
{
    console.log('edit');
    submitbtn.textContent="Edit";
    var ele=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;
    input.value=editElement.innerHTML;
    editflag=true;
    editId=ele.dataset.id;
    
    x=editId;
    

    
    
}
function displayAlert(text,text2)
{
    alert.innerText=text;
    alert.classList.add(`alert-${text2}`);
    setTimeout(() => {
        alert.innerText=text2;
        
    }, 2000);
    setTimeout(() => {
        alert.innerText="";
    }, 4000);
    

}

function geEditID()
{
    return editId;
}

///setting back to default
function setBackToDefault()
{
    editflag=false;
    editId="";
   setTimeout(()=>{
    input.value="";
    console.log("value back to defalut");
   },750);
}
function addToLocalStorage(id,value)
{
    
    const grocery={id:id,value:value};
    let items=getLocalStorage(); 
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
    
    console.log(items);

}
function deleteFromLocalStorage(id)
{
    let items=getLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
        
      });
   
      localStorage.setItem("list", JSON.stringify(items));
    

}
function editLoacalstorage(id,value)
{
    let iit=getLocalStorage();
    iit=iit.map(function(item){
        if(item.id == id )
        {
            item.value=value;
            
        }
        return  item;
    })
    localStorage.setItem("list", JSON.stringify(iit));

}
function getLocalStorage() {
   
    return localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
}
//setup
function setUp()
{
    let it=getLocalStorage();
    if(it.length)
    {
        it.forEach((e)=>{
            var art=document.createElement("article");
            var para=document.createElement("p");
            var text=document.createTextNode(e.value);
            para.appendChild(text);
            art.appendChild(para);
            art.classList.add("list");
            var div=document.createElement("div");
            div.classList.add("list-btn");
            var btn1=document.createElement("button");
            btn1.classList.add("edit");
            var btnelement1=document.createElement("i");
            btnelement1.classList.add("fas", "fa-edit");
            btn1.appendChild(btnelement1);
            var btn2=document.createElement("button");
            btn2.classList.add("remove");
            var btnelement2=document.createElement("i");
            btnelement2.classList.add("fas","fa-trash");
            btn2.appendChild(btnelement2);
            
            div.appendChild(btn1);div.appendChild(btn2);
            art.appendChild(div);
            //add id
            let att=document.createAttribute("data-id");
            att.value=e.id;
            art.setAttributeNode(att);
            const delbtn=div.querySelector('.remove');
            delbtn.addEventListener("click",deleteItem);
            const editbtn=div.querySelector('.edit');
            editbtn.addEventListener("click",editItem);
            document.querySelector(".grocery-mainlist").appendChild(art);


        });

       
    }
}