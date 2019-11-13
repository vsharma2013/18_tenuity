window.onload = function() {
  this.document.querySelectorAll('.details-icon').forEach(e => {
    e.addEventListener('click', function() {
      document.querySelector('#cards-container').style.display = 'none';
      document.querySelector('#item-details').style.display = 'block';
    });
  });

  this.document.querySelector('.btn-back').addEventListener('click', function() {
    document.querySelector('#cards-container').style.display = 'flex';
    document.querySelector('#item-details').style.display = 'none';
  });
}

var item = {
  sku : 'S001',
  name : 'Gujiya',
  imgUrl : 'img/gujiya.svg',
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
