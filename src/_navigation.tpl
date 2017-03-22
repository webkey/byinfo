<!-- @@if(mainNavItemActive === "biography"){ current} -->
<!-- @@if(mainNavItemActive === "biography"){ class="current"} -->
<!--NAVIGATION-->
<nav class="nav">
	<ul class="nav__list nav-js">
		<li class="has-drop@@if(mainNavItemActive === "Общая информация"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Общая информация", "itemLink": "index.html", "specialValue": "" })
			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": " История", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Гамма-квант индуцирует погранслой", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})
		</li>
		<li class="has-drop@@if(mainNavItemActive === "Государство и право"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Государство и право", "itemLink": "typography.html", "specialValue": "" })
			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Самосогласованная модель предсказывает, что при определенных условиях турбулентность трансформирует лептон", "itemLink": "#", "specialValue": "" })
			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Экономика и бизнес", "itemLink": "#", "specialValue": "" })</li>
		<li class="current">@@include('_nav-LINK.tpl', { "itemText": "Разрыв устойчив в магнитном поле", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Эксимер", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Вихрь мгновенно выталкивает фонон", "itemLink": "#", "specialValue": "" })
			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Гравитирующая сфера", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Вещество изотропно трансформирует короткоживущий магнит", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Вещество однородно сжимает резонатор", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Течение среды стабильно", "itemLink": "#", "specialValue": "" })
			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Плазма трансформирует фронт", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Туманность выталкивает объект", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Молекула теоретически возможна", "itemLink": "#", "specialValue": "" })
			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Галактика синхронизует фронт", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Фронт индуцирует спиральный объект", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Плазменное образование активно", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Плоскополяризованный квант", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Турбулентность", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})
		</li>
		<li class="@@if(mainNavItemActive === "Экономика и бизнес"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Экономика и бизнес", "itemLink": "404.html", "specialValue": "" })
		</li>
		<li class="@@if(mainNavItemActive === "Наука и инновации"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Наука и инновации", "itemLink": "404.html", "specialValue": "" })
		</li>
		<li class="has-drop@@if(mainNavItemActive === "Культура и искусство"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Культура и искусство", "itemLink": "404.html", "specialValue": "" })
			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Взвесь вертикально индуцирует пульсар", "itemLink": "#", "specialValue": "" })
			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Взрыв", "itemLink": "#", "specialValue": "" })
			@@include('_nav-drop-wrap-3_THREE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Струя устойчиво сжимает солитон", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Силовое поле", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-3_THREE.tpl', { "end": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Туманность", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Галактика ", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})
		</li>
		<li class="@@if(mainNavItemActive === "Спорт и туризм"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Спорт и туризм", "itemLink": "404.html", "specialValue": "" })
		</li>
		<li class="@@if(mainNavItemActive === "Ресурсы библиотек"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Ресурсы библиотек", "itemLink": "404.html", "specialValue": "" })
		</li>
	</ul>
</nav>
<!--NAVIGATION end-->