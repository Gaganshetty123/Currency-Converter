const BASE_URL="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Oj4qj9J460vi1HoJ4rNSsflEKnJAP5oJLtgHLdv7&currencies=USD&base_currency=INR";
let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCur=document.querySelector(".from select");
let toCur=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=code;
        newOption.value=code;
        if(select.name=="from"&&code=="USD"){
            newOption.selected="selected";
        }
        if(select.name=="to"&&code=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

async function updateExchange(){
    let amt=document.querySelector("input");
    let amount=amt.value;
    let am=amount;
    if(amount=""||amount<1){
        amount=1;
        amt.value="1";
    }
    const url=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Oj4qj9J460vi1HoJ4rNSsflEKnJAP5oJLtgHLdv7&currencies=${toCur.value}&base_currency=${fromCur.value}`;
    let promise=await fetch(url);
    let response=await promise.json();
    let dat=response["data"];
    let rate=dat[toCur.value];
    let finalamt=am*rate;
    msg.innerText=`${am} ${fromCur.value} = ${finalamt} ${toCur.value}`;
}
window.addEventListener("load",()=>{
    updateExchange();
});
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
});