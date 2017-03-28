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
			if (window.innerWidth > 1279) {
				$('.visual').on('mouseenter', function () {
					noScroll();
				}).on('mouseleave', function () {
					canScroll();
				});
			} else {
				$('.visual').on('mouseenter', function () {
					canScroll();
				})
			}

			$('.sidebar').on('mouseenter', function () {
				noScroll();
			}).on('mouseleave', function () {
				canScroll();
			});
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
			var dur = 300;

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
}
/*sliders initial*/

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
	fixedHeader();
	objectFitFix();
	languageBehavior();
	showFormSearch();
	menuAccordionInit();
	blockedScrollOnPage();
	slidersInit();

	footerBottom();
});