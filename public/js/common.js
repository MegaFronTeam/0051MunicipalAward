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


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	let defSliders = document.querySelectorAll('.def-slider-js');
	if (defSliders.length > 0) {
		defSliders.forEach((defSlider) => {
			new Swiper(defSlider, {
				slidesPerView: 'auto',
				loop: true,
				loopAdditionalSlides: 1,
				centeredSlides: defSlider.dataset.centered ? true : false,
				navigation: {
					nextEl: defSlider.querySelector('.swiper-button-next'),
					prevEl: defSlider.querySelector('.swiper-button-prev'),
				},
				pagination: {
					el: defSlider.querySelector('.swiper-pagination'),
					type: 'bullets',
					clickable: true,
				},
			});
		});
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
		});
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