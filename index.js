document.addEventListener('DOMContentLoaded', () => {
	fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
		.then((response) => response.json())
		.then((data) => {
			console.log('Data', data);
			// debugger
			data.forEach((obj) => {
				inputData(obj);
			});
		});

	updateCartLabel();
});

const container = document.querySelector('.product_section');
const cartContainer = document.querySelector('.cart');
const cartLabel = document.querySelector('#cart');
const cartSection = document.querySelector('.cart-section');

function inputData(makeupInfo) {
	const divCard = document.createElement('div');
	const btn = document.createElement('button');
	const ratingCounter = document.createElement('div');
	const cart = document.createElement('div');
	const name = document.createElement('div');
	const img = document.createElement('img');
	const desc = document.createElement('div');
	desc.innerText = makeupInfo.description;
	desc.setAttribute('class', 'desc');
	img.setAttribute('class', 'makeup-products');
	const price = document.createElement('price');
	divCard.setAttribute('class', 'card');
	// debugger
	btn.setAttribute('class', 'like-btn');
	btn.setAttribute('id', makeupInfo.id);
	btn.innerHTML = '♥';
	ratingCounter.innerText = 0;
	
		btn.addEventListener('click', function (event) {
		ratingCounter.innerText = parseInt(ratingCounter.innerText) + 1;
		addtoCart(makeupInfo);
	});

	img.src = 'https:' + makeupInfo.api_featured_image; //concatenation
	name.innerText = makeupInfo.name;
	price.innerText = `Price: Ksh${makeupInfo.price}`;
	divCard.append(name, img, price, btn, ratingCounter, cart, desc);

	img.addEventListener('mouseover', function () {
		console.log('working');
		// alert('working');
		console.log(makeupInfo.description);
		desc.style.display = 'block';
	});
	img.addEventListener('mouseleave', function () {
		console.log('working');
		// alert('working');
		console.log(makeupInfo.description);
		desc.style.display = 'none';
	});
	container.append(divCard);
}

function addtoCart(item) {
	if (localStorage.getItem('cart')) {
		let cart = JSON.parse(localStorage.getItem('cart'));

		let itemExits = false;

		cart.map((cartItem) => {
			if (cartItem.id === item.id) {
				let qty = cartItem.qty;
				qty++;
				cartItem.qty = qty;
				itemExits = true;
			}
		});

		if (itemExits === false) {
			item.qty = 1;
			cart.push(item);
		}

		localStorage.setItem('cart', JSON.stringify(cart));
	} else {
		let cart = [];
		item.qty = 1;
		cart.push(item);
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	updateCartLabel();
    
}

function updateCartLabel() {
	if (localStorage.getItem('cart')) {
		let cart = JSON.parse(localStorage.getItem('cart'));

		let totalQty = 0;

		cart.forEach((cartItem) => {
			totalQty = totalQty + cartItem.qty;
			// totalQty += cartItem.qty;
		});

		cartLabel.innerText = totalQty;
	}
}

cartContainer.addEventListener('click', function () {
	container.classList.add('hide');

	cartSection.classList.remove('hide');
});

