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

	$('.js-lang-open').on('click', function (e) {
		e.preventDefault();

		if ($('.search-form').length) {
			$(document).trigger('closeSearchForm');
		}

		$(this).closest('.lang').toggleClass('lang-opened');

		e.stopPropagation();
	});

	$(document).on('click closeDropLong', function () {
		closeDropLong();
	});

	$(document).keyup(function(e) {
		if ($('.lang').hasClass('lang-opened') && e.keyCode === 27) {
			closeDropLong();
		}
	});

	$('.lang__list').on('click', function (e) {
		e.stopPropagation();
	});

	function closeDropLong() {
		$('.lang').removeClass('lang-opened');
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

	footerBottom();
});