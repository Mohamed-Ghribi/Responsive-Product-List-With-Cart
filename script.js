const cart = document.getElementById("cart")
const emptyCart = document.querySelector(".emptyCart")
const addButtons = document.querySelectorAll(".addBtn")
const orderList = document.getElementById("orderList")
const totalPrice = document.querySelector(".total")
const cartData = document.querySelector(".cart-data")
const OrdersNb = document.querySelector(".cart-title")
const confirmBtn = document.querySelector(".confirmBtn")
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const ConfirmedOrderList = document.getElementById("ConfirmedOrderList")
const totalOrders = document.querySelector(".totalOrders")
const newOrder = document.getElementById("newOrder")
const Products = document.querySelectorAll(".productCard")
const decrementBtn = document.querySelectorAll(".fa-solid.fa-circle-minus")
const incrementBtn = document.querySelectorAll(".fa-solid.fa-circle-plus")
function updateOrdersNumber(operator){
  let Orders = parseInt(OrdersNb.textContent.match(/\d+/)[0]) || 0;
  if(operator === "+"){
    Orders++;
  }else{
    Orders--;
  }
  OrdersNb.textContent =  `Your Cart (${Orders})`
}
function updateCartUI() {
  if (orderList.children.length > 0) {
    cartData.classList.remove("hidden")
    emptyCart.classList.add("hidden")
  } else {
    cartData.classList.add("hidden")
    emptyCart.classList.remove("hidden")
  }
}
addButtons.forEach(element =>{
    element.addEventListener("click",function(){
        const productCard = element.closest(".productCard")
        const selector = productCard.querySelector(".selector")
        const imgProduct = productCard.querySelector(".productImg")
        selector.classList.remove("hidden")
        element.classList.add("hidden")
        imgProduct.style.border = "2px solid hsl(14, 86%, 42%)"
        const productName = productCard.querySelector(".productName")
        const price = productCard.querySelector(".price")
        let existingItem = null ;
         [...orderList.children].forEach(item =>{
            if(productName.textContent === item.querySelector(".pName").textContent){
             existingItem = item
          }
         })
         if(existingItem){
            const Qty = existingItem.querySelector(".quantity")
            Qty.textContent = parseInt(Qty.textContent)+1 + "X";
            updateOrdersNumber("+")
         }else{
             const item = document.createElement("div")
             item.classList.add("cart-item")
             item.innerHTML = `<div class="order-data">
             <h2 class="pName">${productName.textContent}</h2>
             <div class="priceAndQuantity">
                <h3 class="priceProduct">${price.textContent}</h3>
                <h3 class="quantity">1x</h3>
             </div>
             </div>
             <img class="fa-solid fa-trash" src="/assets/images/icon-remove-item.svg">`
             orderList.append(item)
            //  OrdersNb.innerHTML = `Your Cart (${orderList.children.length})`
            updateOrdersNumber("+")
          }
        updateCartUI()
        Cost = parseFloat(totalPrice.textContent.replace("$","")) + parseFloat(price.textContent.replace("$",""))
        totalPrice.innerHTML = "$"+ Cost
    })
})
orderList.addEventListener("click",function(e){
   if(e.target.classList.contains("fa-trash")){
     const parent = e.target.closest(".cart-item")
     const  quantity = parent.querySelector(".quantity")
     if(parseInt(quantity.textContent)>1){
      quantity.textContent = parseInt(quantity.textContent)-1 + "X"
      updateOrdersNumber()
      const price = parent.querySelector(".priceProduct")
      totalPrice.innerHTML = parseFloat(totalPrice.innerHTML) - parseFloat(price.textContent.replace("$",""))
     }else{
       orderList.removeChild(parent)
     const price = parent.querySelector(".priceProduct")
     Cost = parseFloat(totalPrice.textContent.replace("$","")) + parseFloat(price.textContent.replace("$",""))
        totalPrice.innerHTML = "$"+ Cost
     updateOrdersNumber()
     }
     
    //  OrdersNb.innerHTML = `Your Cart (${orderList.children.length})`
     updateCartUI()
   }
})

confirmBtn.addEventListener('click',function(){
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
  let img = "";
  const ComfirmedOrders = [...orderList.children];
     ComfirmedOrders.forEach(element=>{
      const name = element.querySelector(".pName").textContent
      const Qty = element.querySelector(".quantity").textContent
      const price = element.querySelector(".priceProduct").textContent
      let productArrays = [...Products]
      productArrays.map(element =>{
          const nameP = element.querySelector(".productName")
          if(nameP.textContent === name){
             img = element.querySelector(".productImg").getAttribute("src")
          }
      })
      const ComfirmedOrder = document.createElement("div")
      ComfirmedOrder.classList.add("ComfirmedOrder")
      ComfirmedOrder.innerHTML = `
      <div class="orderInfo">
                      <img src="${img}" alt="">
                      <div class="orderDetails">
                         <h3 class="nameP">${name}</h3>
                         <div class="QtyAndUnit">
                             <p class="Qty">${Qty}</p>
                              <p class="prixUnitaire">@${price}</p>
                         </div>
                      </div>
                    </div>
                     <p class="totalP">$${parseFloat(price.replace("$",""))*parseInt(Qty)}</p>`;
    ConfirmedOrderList.prepend(ComfirmedOrder)
    
  })
  totalOrders.innerHTML = totalPrice.textContent;
})

newOrder.addEventListener('click',function(){
  location.reload()
})

incrementBtn.forEach(element=>{
  element.addEventListener("click",function(){
    const productCard = element.closest(".productCard")
    const Qty = productCard.querySelector(".selectorQty")
    Qty.textContent = parseInt(Qty.textContent) + 1;
        const imgProduct = productCard.querySelector(".productImg")
        imgProduct.style.border = "2px solid hsl(14, 86%, 42%)"
        const productName = productCard.querySelector(".productName")
        const price = productCard.querySelector(".price")
        let existingItem = null ;
         [...orderList.children].forEach(item =>{
            if(productName.textContent === item.querySelector(".pName").textContent){
             existingItem = item
          }
         })
         if(existingItem){
            const Qty = existingItem.querySelector(".quantity")
            Qty.textContent = parseInt(Qty.textContent)+1 + "X";
            updateOrdersNumber("+")
         }else{
             const item = document.createElement("div")
             item.classList.add("cart-item")
             item.innerHTML = `<div class="order-data">
             <h2 class="pName">${productName.textContent}</h2>
             <div class="priceAndQuantity">
                <h3 class="priceProduct">${price.textContent}</h3>
                <h3 class="quantity">1x</h3>
             </div>
             </div>
             <img class="fa-solid fa-trash" src="/assets/images/icon-remove-item.svg">`
             orderList.append(item)
            //  OrdersNb.innerHTML = `Your Cart (${orderList.children.length})`
            updateOrdersNumber("+")
          }
        updateCartUI()
       Cost = parseFloat(totalPrice.textContent.replace("$","")) + parseFloat(price.textContent.replace("$",""))
        totalPrice.innerHTML = "$"+ Cost
  })
})


decrementBtn.forEach(element =>{
  element.addEventListener('click',function(){
      const productCard = element.closest(".productCard");
      const QtySelector = productCard.querySelector(".selectorQty");
      const productName = productCard.querySelector(".productName");
      const selector = productCard.querySelector(".selector")
       const imgProduct = productCard.querySelector(".productImg")
       const addBtn = productCard.querySelector(".addBtn")
      console.log(QtySelector.textContent)
      if(parseInt(QtySelector.textContent)=== 1){
         selector.classList.add("hidden")
         imgProduct.style.border ="none"
         addBtn.classList.remove("hidden")
      }
      [...orderList.children].forEach(item =>{
            if(productName.textContent === item.querySelector(".pName").textContent){
               const quantity = item.querySelector(".quantity")
                if(parseInt(quantity.textContent)>1){
                  quantity.textContent = parseInt(quantity.textContent)-1 + "X"
                  updateOrdersNumber()
                  const price = item.querySelector(".priceProduct")
                  Cost = parseFloat(totalPrice.textContent.replace("$","")) - parseFloat(price.textContent.replace("$",""))
        totalPrice.innerHTML = "$"+ Cost
                  QtySelector.textContent = parseInt(QtySelector.textContent) - 1 ;
                }else{
                const price = item.querySelector(".priceProduct")
                Cost = parseFloat(totalPrice.textContent.replace("$","")) - parseFloat(price.textContent.replace("$",""))
                totalPrice.innerHTML = "$"+ Cost
                 orderList.removeChild(item)
                updateOrdersNumber()
                }
          }
         })
         updateCartUI()
  })
  
})