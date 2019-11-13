var item = {
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

$(document).ready(buildUI);


function getItems() {
  var itemsPromise = new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve([item, item, item]);
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
    <div class="details-icon">
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
          console.log($(allRatingIcons[iKey]));
          $(allRatingIcons[iKey]).addClass('f-c-gold');
        }
        i++;
      }
    }
  });
}

function addEventHandlers() {
  $('.details-icon').on('click', function() {
    $('#cards-container').hide();
    $('#item-details').show();
  });

  $('.btn-back').on('click', function() {
    $('#cards-container').show();
    $('#item-details').hide();
  });
}