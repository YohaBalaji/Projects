const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const fruitInput = document.getElementById('fruit-name');
const priceInput = document.getElementById('fruit-price');
const quantityInput = document.getElementById('fruit-quantity');
const totalPrice = document.getElementById('total-price');
const fruitBasket = document.getElementById('fruit-basket');
const totalDiv = document.getElementById('total-div');
const sms = document.getElementById('sms');
const bal = document.getElementById('bal');
let fruitList = [];
const fruitLists = [];
let total = 0;
const state = {};
addButton.addEventListener('click', (e)=> {
    e.preventDefault();
    const fruitName = capitalize(fruitInput.value);
    const fruitPrice = priceInput.value;
    const fruitQuantity = quantityInput.value;
    if(fruitName !== '' && !fruitList.includes(fruitName)){
        state[`${fruitName}`] = { 
            price: `${fruitPrice}`,
            quantity: `${fruitQuantity}`
        };
        fruitList.push(fruitName);
        fruitList.forEach(function (value){
            console.log(`${value}`);
        });
        fruitLists.push(parseFloat(fruitPrice)*parseInt(fruitQuantity));
        renderList();
        total += parseFloat(fruitPrice) * parseInt(fruitQuantity);
        fruitInput.value = '';
        quantityInput.value = '1';
        priceInput.value = '';
        renderTotal();
    }
});
list.addEventListener('click', (e)=>{
    const element = e.target;
    if(element.classList[0] === 'button') {
        const elementNode = element.parentElement;
        const elementDataName = element.dataset.name;
        let elementDataPrice = parseFloat(element.dataset.price);
        let elementDataQuantity = parseInt(element.dataset.quantity);
        total = total - (parseFloat(elementDataPrice) * parseInt(elementDataQuantity));
        elementNode.remove();
        if(fruitList.includes(elementDataName))
        {
            const index = fruitList.indexOf(elementDataName);
            fruitList.splice(index,1);
            delete state[`${elementDataName}`];
        }
        renderList();
        renderTotal();
    }
});
totalPrice.addEventListener('click', () => {

    totalDiv.classList.toggle('hidden');
    renderTotal();   
})
fruitBasket.addEventListener('click', () => {
    list.classList.toggle('hidden');
})
const renderList = () => {
    list.innerHTML = '';   
    //console.log(quantityInput.value);
    // Setting the items in alphabetical order
    fruitList.sort();
    fruitList.forEach((fruit) => {        
        itemHtml = `
            <div class="mt-sm-3 bg-light alert flexview">
                <p class="large"><span>${fruit}  |  Price: ${state[`${fruit}`].price}  |  Quantity: ${state[`${fruit}`].quantity}</span> </p>
                <button type="button" class="button col-sm-2 remove-btn" data-name="${fruit}" data-price="${state[`${fruit}`].price}" data-quantity="${state[`${fruit}`].quantity}">Remove</button>
            </div>`;    
        list.insertAdjacentHTML('beforeend', itemHtml);
    })
}
const renderTotal = () => {
    totalDiv.innerHTML = '';
    //const html = `Total : <span>${total}</span>`;
    const html = `<p class="display-4"style="color:">AMOUNT : <span>${total}</span></p>
    <p><input type="number" class='pr-2 total container bg-info hidden' placeholder="Given Amount"></p>
    <p style="color:#FFCC66;"><b><i>Thanks For Purchasing.. Happy Shopping!!</i></b></p>`;
    totalDiv.insertAdjacentHTML('afterbegin', html);
}
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
mail.addEventListener('click', (e)=>{
  let copyText = document.getElementById("myInputs");
  window.open("mailto:"+ copyText.value +"?&&subject=<NoReplayMail>&body=Dear customer,You Have Purchased The Following Products : " + fruitList + " and The Total Bill Amount is Rs"+total+ "Please refer attached bill.. Thank you!");
});
sms.addEventListener('click', (e)=>{
  let copyText = document.getElementById("myInputs");
  var n=document.getElementById("list").innerHTML;
 window.open("http://wa.me/+91"+copyText.value + "?text=Dear customer,You Have Purchased The Following Products : " + fruitList + " and The Total Bill Amount is Rs"+total +" Please refer attached bill.. Thank you!");
});
bala.addEventListener('click', (e)=>{
    var b=bal.value-total;
    if(bal.value==total){
        alert("No More Balance");
   }
   else if(bal.value<=total){
       alert("Insufficient Amount:(\nCustomer has to pay Rs."+b);
   }
    else{
        alert("Please! Give the Excess Amount Rs."+b);
   }
});
var d = new Date();
document.getElementById("demo").innerHTML = d;

