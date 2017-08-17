/**
 * !blocked scroll
 * */
var docElem = window.document.documentElement,
	didScroll,
	scrollPosition;

function noScrollFn() {
	window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
}

function noScroll() {
	window.removeEventListener( 'scroll', scrollHandler );
	window.addEventListener( 'scroll', noScrollFn );
}

function scrollFn() {
	window.addEventListener( 'scroll', scrollHandler );
}

function canScroll() {
	window.removeEventListener( 'scroll', noScrollFn );
	scrollFn();
}

function scrollHandler() {
	if( !didScroll ) {
		didScroll = true;
		setTimeout( function() { scrollPage(); }, 60 );
	}
}

function scrollPage() {
	scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
	didScroll = false;
}

scrollFn();
/*blocked scroll end*/

/**
 * !resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth != currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});
/*resize only width end*/

/**
 * !device detected
 * */
var DESKTOP = device.desktop();
//console.log('DESKTOP: ', DESKTOP);
var MOBILE = device.mobile();
//console.log('MOBILE: ', MOBILE);
var TABLET = device.tablet();
//console.log('MOBILE: ', MOBILE);
/*device detected end*/

/**
 *  !placeholder
 *  */
function placeholderInit() {
	$('[placeholder]').placeholder();
}
/*placeholder end*/

/**
 * !print
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}
/*print end*/

/**
 * !fixed header
 * */
function fixedHeader(){
	// external js:
	// 1) resizeByWidth (resize only width);

	var $fixedElement = $('.header');

	if ( $fixedElement.length ) {
		var $page = $('html'),
			$parent = $fixedElement.parent(),
			$window = $(window);

		$window.on('load resizeByWidth scroll', function () {

			var minScrollTop = $parent.offset().top;
			var currentScrollTop = $window.scrollTop();

			$page.toggleClass('header-fixed', (currentScrollTop > minScrollTop));
		})
	}
}
/*fixed header end*/

/**
 * !css object fit fixed for ie 9
 * */
// add to css
// /*object fit fixed for ie9*/
// .object-fit-bg
//      background: no-repeat center center
//
//  &--contain
//      background-size: contain
//
//  &--cover
//      background-size: cover
//
//  img
//      opacity: 0
//      visibility: hidden
//      display: none

/*object fit fixed for ie9 end*/
function objectFitFix() {
	function objectfitContainFixed($img, type) {
		var imgUrl = $img.prop('src');
		if (imgUrl) {
			$img.parent()
				.css('backgroundImage', 'url(' + imgUrl + ')')
				.addClass('object-fit-bg object-fit-bg--' + type);
		}
	}

	if ( !Modernizr.objectfit ) {
		var $galleryImg = $('.visual-item__img img');
		if ($galleryImg.length) {
			$galleryImg.each(function () {
				var $thisImg = $(this);
				objectfitContainFixed($thisImg, 'cover');
			});
		}
	}
}
/*css object fit fixed for ie 9 end*/

/**
 * !language switcher behavior
 * */
function languageBehavior() {
	var $langContainer = $('.lang-js');
	var langClassOpen = 'lang-opened';

	$('.lang-open-js').on('click', function (e) {
		e.preventDefault();

		if ($('.search-form').length) {
			$(document).trigger('closeSearchForm');
		}

		$(this).closest($langContainer).toggleClass(langClassOpen);

		e.stopPropagation();
	});

	// close lang drop on document click
	$(document).on('click closeDropLong', function () {
		closeDropLong();
	});

	// close lang drop on esc key click
	$(document).keyup(function(e) {
		if ($langContainer.hasClass(langClassOpen) && e.keyCode === 27) {
			closeDropLong();
		}
	});

	// trigger event lang drop close
	$($langContainer).on('langDropClose', function() {
		if ($langContainer.hasClass(langClassOpen)) {
			closeDropLong();
		}
	});

	// do not close drop on click inside this drop
	$('.lang__list').on('click', function (e) {
		e.stopPropagation();
	});

	// close drop function
	function closeDropLong() {
		$($langContainer).removeClass(langClassOpen);
	}
}
/*drop language end*/

/**
 * !show form search
 * */
function showFormSearch(){
	var $searchFormContainer = $('.search-form-js');
	if(!$searchFormContainer.length){ return; }

	var $html = $('html');
	var $searchField = $('.search-field-js');
	var btnSearchCloseClass = 'btn-search-close-js';
	var classFormIsOpen = 'form-is-open';

	$html.on('click', '.btn-search-open-js', function(e){
		e.stopPropagation();

		// !important
		// var $searchForm = $searchFormContainer.find('form');
		// if ( $searchForm.find($searchField).val().length && $searchFormContainer.is(':visible') ){
		// 	$searchForm.submit();
		// 	return;
		// }

		// close lang drop
		$('.lang-js').trigger('langDropClose');

		if ($html.hasClass(classFormIsOpen)){
			closeSearchForm($searchFormContainer);
			return;
		}

		setTimeout(function () {
			$searchField.trigger('focus');
		}, 50);

		$html.addClass(classFormIsOpen);

		e.preventDefault();

	});

	$html.on('click', '.' + btnSearchCloseClass, function(e){
		e.stopPropagation();
		e.preventDefault();

		closeSearchForm($searchFormContainer);
	});

	$(document).on('click', function (e) {
		closeSearchForm();
	});

	$(document).keyup(function(e) {
		if ($html.hasClass(classFormIsOpen) && e.keyCode === 27) {
			closeSearchForm($searchFormContainer);
		}
	});

	$searchFormContainer.on('click', function (e) {
		if($(e.target).hasClass(btnSearchCloseClass)) {
			return
		}

		e.stopPropagation();
	});

	function closeSearchForm(){
		$('html').removeClass(classFormIsOpen)
	}
}
/*show form search end*/

/**
 * !multi accordion
 * */
(function ($) {
	var MultiAccordion = function (settings) {
		var options = $.extend({
			collapsibleAll: false,
			resizeCollapsible: false,
			accordionContainer: null,
			accordionItem: null,
			handler: null,
			collapsibleElement: null,
			openClass: 'active',
			animateSpeed: 300
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);
		this.$accordionContainer = container; //блок с аккордеоном
		this.$accordionItem = $(options.accordionItem, container); //непосредственный родитель сворачиваемого элемента
		this.$handler = $(options.handler, container); //элемент, по которому производим клик
		this.collapsibleElement = options.collapsibleElement; //элемент, который сворачивается/разворачивается
		this.$collapsibleElement = $(this.collapsibleElement); //элемент, который сворачивается/разворачивается
		this._collapsibleAll = options.collapsibleAll;
		this._animateSpeed = options.animateSpeed;
		this.$totalCollapsible = $(options.totalCollapsible);//элемент, по клику на который сворачиваются все аккордены в наборе
		this._resizeCollapsible = options.resizeCollapsible;//флаг, сворачивание всех открытых аккордеонов при ресайзе

		this.modifiers = {
			active: options.openClass,
			current: 'current'
		};

		this.bindEvents();
		this.totalCollapsible();
		this.totalCollapsibleOnResize();

	};

	MultiAccordion.prototype.totalCollapsible = function () {
		var self = this;
		self.$totalCollapsible.on('click', function () {
			self.$collapsibleElement.slideUp(self._animateSpeed, function () {
				self.$accordionContainer.trigger('accordionChange');
			});
			self.$accordionItem.removeClass(self.modifiers.active);
			self.$accordionItem.removeClass(self.modifiers.current);
		})
	};

	MultiAccordion.prototype.totalCollapsibleOnResize = function () {
		var self = this;
		$(window).on('resize', function () {
			if(self._resizeCollapsible){
				self.$collapsibleElement.slideUp(self._animateSpeed, function () {
					self.$accordionContainer.trigger('accordionChange');
				});
				self.$accordionItem.removeClass(self.modifiers.active);
			}
		});
	};

	MultiAccordion.prototype.bindEvents = function () {
		var self = this,
			modifiers = this.modifiers,
			animateSpeed = this._animateSpeed,
			$accordionContainer = this.$accordionContainer,
			$anyAccordionItem = this.$accordionItem,
			collapsibleElement = this.collapsibleElement,
			$collapsibleElement = this.$collapsibleElement;

		self.$handler.on('click', function (e) {
			var current = $(this);
			var currentAccordionItem = current.closest($anyAccordionItem);

			if (!currentAccordionItem.has($collapsibleElement).length){
				return;
			}

			e.preventDefault();

			if (current.parent().prop('tagName') !== currentAccordionItem.prop('tagName')) {
				current = current.parent();
			}

			if (current.siblings(collapsibleElement).is(':visible')){
				currentAccordionItem.removeClass(modifiers.active).find($collapsibleElement).slideUp(animateSpeed, function () {
					self.$accordionContainer.trigger('accordionChange');
				});
				// currentAccordionItem.removeClass(modifiers.current);
				currentAccordionItem
					.find($anyAccordionItem)
					.removeClass(modifiers.active);
				// .removeClass(modifiers.current);
				return;
			}


			if (self._collapsibleAll){
				var siblingContainers = $($accordionContainer).not(current.closest($accordionContainer));
				siblingContainers.find($collapsibleElement).slideUp(animateSpeed, function () {
					self.$accordionContainer.trigger('accordionChange');
				});
				siblingContainers
					.find($anyAccordionItem)
					.removeClass(modifiers.active);
				// .removeClass(modifiers.current);
			}

			currentAccordionItem
				.siblings()
				.removeClass(modifiers.active)
				.find($collapsibleElement)
				.slideUp(animateSpeed, function () {
					self.$accordionContainer.trigger('accordionChange');
				});
			// currentAccordionItem.siblings().removeClass(modifiers.current);
			currentAccordionItem.siblings()
				.find($anyAccordionItem)
				.removeClass(modifiers.active);
			// .removeClass(modifiers.current);

			currentAccordionItem.addClass(modifiers.active);
			current.siblings($collapsibleElement).slideDown(animateSpeed, function () {
				self.$accordionContainer.trigger('accordionChange');
			});
		})
	};

	window.MultiAccordion = MultiAccordion;
}(jQuery));

function menuAccordionInit() {
	var nav = '.nav-js';
	if($(nav).length){
		new MultiAccordion({
			accordionContainer: nav,
			accordionItem: 'li',
			handler: '.nav-handler-js',
			collapsibleElement: '.nav-drop-js',
			openClass: 'is-open',
			animateSpeed: 200
		});
	}
}
/*multi accordion end*/

function blockedScrollOnPage() {
	$(window).on('load debouncedresize', function () {
		if (Modernizr.objectfit) { // shame: detect ie 11 and older
			// if (window.innerWidth > 1279) {
			// 	$('.visual').on('mouseenter', function () {
			// 		noScroll();
			// 	}).on('mouseleave', function () {
			// 		canScroll();
			// 	});
			// } else {
			// 	$('.visual').on('mouseenter', function () {
			// 		canScroll();
			// 	})
			// }

			// if (window.innerWidth > 992) {
			// 	$('.sidebar').on('mouseenter', function () {
			// 		noScroll();
			// 	}).on('mouseleave', function () {
			// 		canScroll();
			// 	});
			// }
		}
	})
}

/**
 * !sliders initial
 * */
function slidersInit() {
	/*slider visual*/
	var $sliderVisual = $('.main-slider-js');

	if($sliderVisual.length){

		$sliderVisual.each(function () {
			var $currentSlider = $(this);
			var dur = 200;

			$currentSlider.slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				infinite: true,
				dots: false,
				arrows: true,

				accessibility: false,
				draggable: false,
				swipe: false,
				touchMove: false,

				responsive: [
					{
						breakpoint: 1280,
						settings: {
							accessibility: true,
							draggable: true,
							swipe: true,
							touchMove: true
						}
					}
				]
			});

		});
	}

	/*slider inner*/
	var $sliderInner = $('.slider-inner-js');

	if($sliderInner.length){

		$sliderInner.each(function () {
			var $currentSlider = $(this);

			$currentSlider.slick({
				fade: true,
				speed: 700,
				slidesToShow: 1,
				slidesToScroll: 1,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				infinite: false ,
				dots: false,
				arrows: true,

				autoplay: true,
				autoplaySpeed: 6000,
				pauseOnHover: true,

				responsive: [
					{
						breakpoint: 1280,
						settings: {
							fade: false,
							speed: 300,
							autoplay: false
						}
					}
				]
			});

		});
	}

	/*slider strip*/
	var $sliderStrip = $('.slider-strip-js');

	if($sliderStrip.length){

		$sliderStrip.each(function () {
			var $currentSlider = $(this);
			var dur = 200;

			$currentSlider.slick({
				fade: false,
				speed: dur,
				slidesToShow: 3,
				slidesToScroll: 3,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				infinite: false,
				dots: false,
				arrows: true,

				responsive: [
					{
						breakpoint: 1920,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});

		});
	}
}
/*sliders initial*/

/**
 * !extra popup jQuery plugin
 * */
(function ($) {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (libs);
	// 2) device.js (libs);
	// 3) resizeByWidth (resize only width);
	// 4) blocked scroll;

	// add css style
	// .nav-opened-before{
	// 	width: 100%!important;
	// 	height: 100%!important;
	// 	max-width: 100%!important;
	// 	max-height: 100%!important;
	// 	margin: 0!important;
	// 	padding: 0!important;
	// 	overflow: hidden!important;
	// }

	// .nav-opened-before .wrapper{ z-index: 99; } // z-index of header must be greater than footer
	//
	// if nav need to hide
	// @media only screen and (min-width: [example: 1280px]){
	// .nav{
	// 		-webkit-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		-ms-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 	}
	// .nav-list > li{
	// 		-webkit-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		-ms-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		opacity: 1 !important;
	// 		visibility: visible !important;
	// 	}
	// }
	var ExtraPopup = function (settings) {
		var options = $.extend({
			mainContainer: 'html', // container wrapping all elements
			navContainer: null, // main navigation container
			navMenu: null, // menu
			btnMenu: null, // element which opens or switches menu
			btnMenuClose: null, // element which closes a menu
			navMenuItem: null,
			navMenuAnchor: 'a',
			staggerItems: null,
			overlay: '.nav-overlay', // overlay's class
			overlayAppendTo: 'body', // where to place overlay
			overlayAlpha: 0.8,
			overlayIndex: 'auto',
			classReturn: null,
			overlayBoolean: true,
			animationSpeed: 300,
			animationSpeedOverlay: null,
			minWidthItem: 100,
			mediaWidth: null,
			closeOnResize: true,
			closeEsc: true // close popup on click Esc
		}, settings || {});

		var container = $(options.navContainer),
			_animateSpeed = options.animationSpeed;

		var self = this;
		self.options = options;
		self.$mainContainer = $(options.mainContainer);            // . по умолчанию <html></html>
		self.$navMenu = $(options.navMenu);
		self.$btnMenu = $(options.btnMenu);
		self.$btnMenuClose = $(options.btnMenuClose);
		self.$navContainer = container;
		self.$navMenuItem = $(options.navMenuItem, container);     // Пункты навигации;
		self.$navMenuAnchor = $(options.navMenuAnchor, container); // Элемент, по которому производится событие (клик);
		self.$staggerItems = options.staggerItems || self.$navMenuItem;  //Элементы в стеке, к которым применяется анимация. По умолчанию navMenuItem;

		self._animateSpeed = _animateSpeed;

		// overlay
		self.overlayBoolean = options.overlayBoolean;
		self.overlayAppendTo = options.overlayAppendTo;
		self.$overlay = $('<div class="' + options.overlay.substring(1) + '"></div>'); // Темплейт оверлея;
		self._overlayAlpha = options.overlayAlpha;
		self._overlayIndex = options.overlayIndex;
		self._animateSpeedOverlay = options.animationSpeedOverlay || _animateSpeed;
		self._minWidthItem = options.minWidthItem;
		self._mediaWidth = options.mediaWidth;
		self.closeOnResize = options.closeOnResize;
		self.closeEsc = options.closeEsc;

		self.desktop = device.desktop();

		self.modifiers = {
			active: 'active',
			opened: 'nav-opened',
			openStart: 'nav-opened-before'
		};

		self.outsideClick();
		if ( self._mediaWidth === null || window.innerWidth < self._mediaWidth ) {
			self.preparationAnimation();
		}
		// $(window).on('debouncedresize', function () {
		// 	self.preparationAnimation();
		// });
		self.toggleMenu();
		self.eventsBtnMenuClose();
		self.clearStyles();
		self.closeNavOnEsc();
	};

	ExtraPopup.prototype.navIsOpened = false;

	// overlay append to "overlayAppendTo"
	ExtraPopup.prototype.createOverlay = function () {
		var self = this,
			$overlay = self.$overlay;

		$overlay.appendTo(self.overlayAppendTo);

		TweenMax.set($overlay, {
			autoAlpha: 0,
			position: 'fixed',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			background: '#000',
			'z-index': self._overlayIndex,
			onComplete: function () {
				TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {autoAlpha: self._overlayAlpha});
			}
		});
	};

	// toggle overlay
	ExtraPopup.prototype.toggleOverlay = function (close) {
		var self = this,
			$overlay = self.$overlay;

		if (close === false) {
			TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {
				autoAlpha: 0,
				onComplete: function () {
					$overlay.remove();
				}
			});
			return false;
		}

		self.createOverlay();
	};

	// toggle menu
	ExtraPopup.prototype.toggleMenu = function () {
		var self = this,
			$buttonMenu = self.$btnMenu;

		$buttonMenu.on('mousedown touchstart vmousedown', function (e) {
			e.preventDefault();

			if (self.navIsOpened) {
				self.closeNav();
			} else {
				self.openNav();
			}

			e.stopPropagation();
		});
	};

	// events btn close menu
	ExtraPopup.prototype.eventsBtnMenuClose = function () {

		var self = this;

		self.$btnMenuClose.on('click', function (e) {
			e.preventDefault();

			if ( self.navIsOpened ) {
				self.closeNav();
			}

			e.stopPropagation();
		});
	};

	// click outside menu
	ExtraPopup.prototype.outsideClick = function () {
		var self = this;

		$(document).on('click', function () {
			if ( self.navIsOpened ) {
				self.closeNav();
			}
		});

		self.$navContainer.on('click', function (e) {
			if ( self.navIsOpened ) {
				e.stopPropagation();
			}
		})
	};

	// close popup on click to "Esc" key
	ExtraPopup.prototype.closeNavOnEsc = function () {
		var self = this;

		$(document).keyup(function(e) {
			if (self.navIsOpened && self.closeEsc && e.keyCode == 27) {
				self.closeNav();
			}
		});
	};

	// open nav
	ExtraPopup.prototype.openNav = function() {

		// console.log("openNav");

		var self = this,
			$html = self.$mainContainer,
			$navContainer = self.$navContainer,
			$buttonMenu = self.$btnMenu,
			_animationSpeed = self._animateSpeedOverlay,
			$staggerItems = self.$staggerItems;

		$buttonMenu.addClass(self.modifiers.active);
		$html.addClass(self.modifiers.openStart);

		$navContainer.css({
			'-webkit-transition-duration': '0s',
			'transition-duration': '0s'
		});

		TweenMax.to($navContainer, _animationSpeed / 1000, {
			xPercent: 0,
			autoAlpha: 1,
			ease: Cubic.easeOut,
			onComplete: function () {
				$html.addClass(self.modifiers.opened);

				noScroll();
			}
		});

		TweenMax.staggerTo($staggerItems, 0.85, {
			// autoAlpha:1,
			// scale:1,
			// y: 0,
			ease:Cubic.easeOut
		}, 0.1);


		if (self.overlayBoolean) {
			self.toggleOverlay();
		}

		self.navIsOpened = true;
	};

	// close nav
	ExtraPopup.prototype.closeNav = function() {

		// console.log("closeNav");

		var self = this,
			$html = self.$mainContainer,
			$navContainer = self.$navContainer,
			$buttonMenu = self.$btnMenu,
			_animationSpeed = self._animateSpeedOverlay,
			_mediaWidth = self._mediaWidth;

		$html.removeClass(self.modifiers.opened);
		$html.removeClass(self.modifiers.openStart);
		$buttonMenu.removeClass(self.modifiers.active);

		if (self.overlayBoolean) {
			self.toggleOverlay(false);
		}

		TweenMax.to($navContainer, _animationSpeed / 1000, {
			xPercent: -100,
			ease: Cubic.easeOut,
			onComplete: function () {
				if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
					self.preparationAnimation();
				}

				TweenMax.set($navContainer, {
					autoAlpha: 0
				});

				canScroll();
			}
		});

		self.navIsOpened = false;
	};

	// preparation element before animation
	ExtraPopup.prototype.preparationAnimation = function() {
		var self = this;

		var $navContainer = self.$navContainer,
			$staggerItems = self.$staggerItems;

		// console.log('preparationAnimation');

		TweenMax.set($navContainer, {
			xPercent: -100,
			autoAlpha: 0,
			onComplete: function () {
				$navContainer.show(0);
			}
		});
		TweenMax.set($staggerItems, {
			// autoAlpha: 0,
			// scale: 0.6,
			// y: 50
		});
	};

	// clearing inline styles
	ExtraPopup.prototype.clearStyles = function() {
		var self = this;
			// $btnMenu = self.$btnMenu,
			// $navContainer = self.$navContainer,
			// $staggerItems = self.$staggerItems;

		//clear on horizontal resize
		if (self.closeOnResize === true) {

			$(window).on('debouncedresize', function () {
				self.closeNav();
				// if (self.navIsOpened) {
				// 	if (!$btnMenu.is(':visible')) {
				// 		$navContainer.attr('style', '');
				// 		$staggerItems.attr('style', '');
				// 	} else {
				// 		self.closeNav();
				// 	}
				// }
			});

		}
	};

	window.ExtraPopup = ExtraPopup;

}(jQuery));

/**
 * !extra popup nav for device
 * */
function navForDevice(){
	var siteMapSelector = '.sidebar';
	if($(siteMapSelector).length){

		new ExtraPopup({
			navContainer: siteMapSelector,
			navMenu: '.nav-js',
			btnMenu: '.btn-nav-js',
			btnMenuClose: '.btn-nav-close-js',
			navMenuItem: '.nav-js > li',
			closeOnResize: true,
			// mediaWidth: 992,
			mediaWidth: 1600,
			animationSpeed: 300,
			overlayAppendTo: '.wrapper > .max-wrap',
			overlayAlpha: 0.35,
			overlayIndex: 80
		});

	}
}
/*extra popup nav for device end*/

/**
 * tooltip initial
 */
function tooltipInitial() {
	var $tplTooltip = $('<div class="tooltip"><div class="tooltip-inner"></div></div>');
	var timeout;

	$('.slider-strip-item').on('mouseenter', function () {
		if(DESKTOP) {
			var $currentElem = $(this);

			var $containerCurrentElem = $currentElem.closest('.slider-strip');

			clearTimeout(timeout);

			timeout = setTimeout(function () {
				$tplTooltip.clone().appendTo($containerCurrentElem).find('.tooltip-inner').html($currentElem.data('title')).end().css('left', $currentElem.offset().left + $currentElem.outerWidth()/2).hide(0).fadeIn(200);
			}, 600);
		}
	}).on('mouseleave', function () {
		if(DESKTOP) {
			clearInterval(timeout);

			$('.tooltip').fadeOut(100, function () {
				$(this).remove();
			});
		}
	});
}
 /*tooltip initial*/

/**
 * !footer at bottom
 * */
function footerBottom() {
	var $footer = $('.footer__holder');

	if ($footer.length) {
		$('.main').after($('<div class="spacer"></div>'));

		setTimeout(function () {
			layoutFooter();
		}, 50);

		$(window).on('resizeByWidth', function () {
			layoutFooter();
		});

		function layoutFooter() {
			// var footerHeight = $('.footer__holder', $footer).outerHeight();
			var footerHeight = $($footer).outerHeight();
			// $footer.css({
			// 	'margin-top': -footerHeight
			// });

			$('.spacer').css({
				'height': footerHeight
			});
		}
	}
}
/*footer at bottom end*/

/** ready/load/resize document **/

$(document).ready(function () {
	placeholderInit();
	printShow();
	// fixedHeader();
	objectFitFix();
	languageBehavior();
	showFormSearch();
	menuAccordionInit();
	blockedScrollOnPage();
	slidersInit();
	navForDevice();
	tooltipInitial();

	footerBottom();
});