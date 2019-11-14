var item1 = {
  sku : 'S001',
  name : 'Gujiya',
  imgUrl : 'img/gujiya.png',
  rating : 4,
  description : 'A sweet deep-fried dumpling made with suji or maida and stuffed with a mixture of sweetened khoya and dried fruits.',
  geography : 'North India',
  ingredients : [{ name: 'Maida', isPresent: 1}, { name: 'Khoya', isPresent: 1}, { name: 'Sugar', isPresent: 1},{ name: 'Oil', isPresent: 1}],
  nutritionInfo : 'S001Nutri',
  taste : [{ name: 'Salty', isPresent: 0}, { name: 'Sweet', isPresent: 1}, { name: 'Plain', isPresent: 0},{ name: 'Masala', isPresent: 0}],
  cookingStyle : [{ name: 'Fired', isPresent: 1}, { name: 'Baked', isPresent: 0}, { name: 'Roasted', isPresent: 0},{ name: 'Raw', isPresent: 0}],
  shelfLife : 2,
  dispatchTime : 2,
  price : 350,
  minQuantity : 1,
  healthy : [{ name: 'Yes', isPresent: 1}, { name: 'No', isPresent: 0}],
  vendorName : 'Sunanda Foods',
  fssai : 'FSS01',
  vendorRating : 4,
  vendorLocation : 'Pune'
};

var strItem = JSON.stringify(item1);
var item2 = JSON.parse(strItem);
var item3 = JSON.parse(strItem);
item2.sku = 'S002';
item3.sku = 'S003';

var items = [item1, item2, item3];

$(document).ready(buildUI);


function getItems() {
  var itemsPromise = new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(items);
    }, 10);
  });
  return itemsPromise;
}

function buildUI() {
  getItems().then(function(items) {
    renderItems(items);
    addEventHandlers();
  });
}

function renderItems(items) {
  var section = $('#cards-container');
  items.forEach((function(item){
    var card = getCard(item);
    $(card).appendTo(section);
  }));

  reRenderRatings();
}

function getCard(item){
  var cardHtml = `
  <div class="card">
    <div class="details-icon"  sku=${item.sku}>
        <i class="fas fa-ellipsis-v"></i>
    </div>     
  <div class="card-content" rating=${item.rating}>
    <img src=${item.imgUrl} alt="" class="item-image">
    <h4 class="p-1">${item.name}</h4>
    <p class="f-sm-4x p-1">Local Delicacy From - ${item.geography}</p>
    <p class="f-sm-4x p-1">${item.description}</p>
    <i class="fas fa-star f-sm-4x"></i>
    <i class="fas fa-star f-sm-4x"></i>
    <i class="fas fa-star f-sm-4x"></i>
    <i class="fas fa-star f-sm-4x"></i>
    <i class="fas fa-star f-sm-4x"></i>
    <p class="f-sm-4x p-1">Minimum Order - ${item.minQuantity} kg</p>
    <div class="p-1"><i class="fas fa-rupee-sign"></i> ${item.price}</div>
    <a href="#" class="btn">Add To Cart</a>
  </div>
  `;
  return cardHtml;
}

function reRenderRatings(){
  var allCards = $('.card-content');
  var keys = Object.keys(allCards);
  keys.forEach(function(key){
    var card = $(allCards[key]);
    var rating = +$(card).attr('rating');
    if(rating) {
      var allRatingIcons = $(card).find('i.fa-star');
      var i = 0;
      for(var iKey in Object.keys(allRatingIcons)){
        if(i < rating){
          $(allRatingIcons[iKey]).addClass('f-c-gold');
        }
        i++;
      }
    }
  });
}

function renderItemDetails(itemSku) {
  var itemDetailsContainer = $('#item-details');
  itemDetailsContainer.empty();
  var item = items.find(i => {
    return i.sku == itemSku;
  })
  var detailsHtml=`
    <div id="item-details-container">
      <div class="p-1"><h1 class="clr-red">Item Details</h1></div>
      @PLACE_HOLDER_KEY_VALUES
    </div>
  `;
  
  var keyValues = ''
  var keys = [{ id: 'ingredients', display: 'Ingredients'},
              { id: 'nutritionInfo', display: 'Nutrition'},
              { id: 'taste', display: 'Taste'},
              { id: 'cookingStyle', display: 'Cooking Style'},
              { id: 'shelfLife', display: 'Shelf Life'},
              { id: 'dispatchTime', display: 'Dispatch Time'}, 
              { id: 'healthy', display: 'Healthy'},
              { id: 'vendorName', display: 'Vendor Name'},
              { id: 'fssai', display: 'FSSAI'},
              { id: 'vendorRating', display: 'Vendor Rating'},
              { id: 'vendorLocation', display: 'Vendor Location'}
            ];
  
  keys.forEach(key => {
    var value = item[key.id];
    if(typeof(value) === 'object'){
      var str = `
      <div class="details-key-value-container">
        <div class="detail detail-key">${key.display}</div>
        <div class="detail detail-value">
        @PLACE_HOLDER_KEY_VALUE
        </div>
      </div>
      `;
      var kv = '';
      for(vk in value) {
        var v = value[vk];
        var s = v.isPresent ?
                `<span class="clr-red"> ${v.name}</span> |` :
                `<span> ${v.name}</span> |`;
        kv += s;
      }
      str = str.replace('@PLACE_HOLDER_KEY_VALUE', kv)
      keyValues += str;
    } else{
      var str = `
      <div class="details-key-value-container">
          <div class="detail detail-key">${key.display}</div>
          <div class="detail detail-value"><span class="clr-red">${value}</span></div>
      </div>
      `;
      keyValues += str;
    }
  });  
  str = `
  <div class="details-key-value-container">
      <a href="" class="btn btn-back">Back</a>
  </div> 
  `;
  keyValues += str;       
  detailsHtml = detailsHtml.replace('@PLACE_HOLDER_KEY_VALUES', keyValues);
  $(detailsHtml).appendTo(itemDetailsContainer);
  itemDetailsContainer.show();
}

function addEventHandlers() {
  $('.details-icon').on('click', function(e) {
    renderItemDetails($(e.currentTarget).attr('sku'));
    $('#cards-container').hide();
  });

  $('.btn-back').on('click', function() {
    $('#cards-container').show();
    $('#item-details').hide();
  });
}