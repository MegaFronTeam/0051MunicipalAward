"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	// let defaultSl = {
	// 	spaceBetween: 0,
	// 	lazy: {
	// 		loadPrevNext: true,
	// 	},
	// 	watchOverflow: true,
	// 	loop: true,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
	// 	pagination: {
	// 		el: ' .swiper-pagination',
	// 		type: 'bullets',
	// 		clickable: true,
	// 		// renderBullet: function (index, className) {
	// 		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
	// 		// }
	// 	},
	// }

	// new Swiper('.breadcrumb-slider--js', {
	// 	slidesPerView: 'auto',
	// 	freeMode: true,
	// 	watchOverflow: true
	// });

	// const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
	// 	// slidesPerView: 5,
	// 	...defaultSl,
	// 	slidesPerView: 'auto',
	// 	freeMode: true,
	// 	loopFillGroupWithBlank: true,
	// 	touchRatio: 0.2,
	// 	slideToClickedSlide: true,
	// 	freeModeMomentum: true,

	// });

	if(document.querySelector('.sAwardStages__swiper')) {
		new Splide('.sAwardStages__swiper', {
			autoWidth: true,
			focus    : 0,
			omitEnd  : true,
			pagination: false
		}).mount();
	}

	if(document.querySelector('.sSupervisory__swiper')) {
		let sSupervisorySlider = new Splide('.sSupervisory__swiper', {
			autoWidth: true,
			focus    : 0,
			omitEnd  : true,
			type     : 'loop',
		}).mount();
	
		let slidesArr = sSupervisorySlider.Components.Elements.slides;
		sSupervisorySlider.on('move', function (newIndex, prevIndex) {
			slidesArr[newIndex].classList.add('active-slide-animated');
			slidesArr[prevIndex].classList.remove('active-slide-animated');
		} );
	}

	let sApplicationsCards = document.querySelectorAll('.sApplications__item');
	let sApplicationsMapClass = document.querySelectorAll('.sApplications__map g');
	
	if (sApplicationsCards.length > 0 && sApplicationsMapClass.length > 0) {
		document.addEventListener('click', (e) => {
			let sApplicationsCardTarget = e.target.closest('.sApplications__item');
			let sApplicationsMapTarget = e.target.closest('.sApplications__map g');
			
			if (sApplicationsCardTarget) {
				let sApplicationsCardTargetID = sApplicationsCardTarget.getAttribute('id');


				sApplicationsCards.forEach((item) => item.classList.remove('active'));
				sApplicationsCardTarget.classList.toggle('active');

				sApplicationsMapClass.forEach((mapClass) => {
					mapClass.classList.remove('active');
					if (mapClass.classList[0] === sApplicationsCardTargetID) {
						mapClass.classList.toggle('active');
					};
				});
			};

			
			if (sApplicationsMapTarget) {
				let sApplicationsMapTargetClass = sApplicationsMapTarget.classList[0];

				sApplicationsMapClass.forEach((item) => item.classList.remove('active'));
				sApplicationsMapTarget.classList.toggle('active');

				sApplicationsCards.forEach((cardsClass) => {
					cardsClass.classList.remove('active');
					if (cardsClass.getAttribute('id') === sApplicationsMapTargetClass) {
						cardsClass.classList.toggle('active');
					};
				});
			};

			if (!sApplicationsMapTarget && !sApplicationsCardTarget) {
				sApplicationsMapClass.forEach((mapClass) => {
					mapClass.classList.remove('active');
				});
				sApplicationsCards.forEach((cardsClass) => {
					cardsClass.classList.remove('active');
				});
			}
		});
	}

	function inputFile(){
		if (document.querySelector('.upload-field')){
			let uploadField = document.querySelectorAll('.upload-field');
			for (let i=0;i<uploadField.length;i++){
				let inputFile = uploadField[i].querySelector('.input-upload');
				inputFile.addEventListener('change',() => uploadField[i].querySelector('.upload-field__file-name').innerHTML = inputFile.files[0].name);
			}
		}
	}
	inputFile();

	let imgContainer = document.querySelector('.page-head__bg');
	let stopEvent = false;
	window.addEventListener('mousemove', function(e) {
		if (!stopEvent) {
			let x = e.clientX / window.innerWidth;
			let y = e.clientY / window.innerHeight;
			imgContainer.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
			stopEvent = true;
			setTimeout(function () {
				stopEvent = false;
			}, 33);
		}
	});
	
	let uploadavatar = document.querySelector('.upload-avatar');
	if (uploadavatar){
		let inputFile = uploadavatar.querySelector('.input-upload');
		let img = uploadavatar.querySelector('.img-wrap-center img');
		inputFile.addEventListener('change', () => {
			var reader = new FileReader();
			reader.onload = function(){ img.src = reader.result;}
			reader.readAsDataURL(event.target.files[0]);

			inputFile.files[0].name.length > 0 ? uploadavatar.classList.add('active') : uploadavatar.classList.remove('active');
		});
		uploadavatar.querySelector('.upload-avatar__delete-photo').addEventListener('click', () => {
			img.src = '';
			uploadavatar.classList.remove('active');
		})
	}
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }