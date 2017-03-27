<!-- @@if(mainNavItemActive === "biography"){ current} -->
<!-- @@if(mainNavItemActive === "biography"){ class="current"} -->
<!--NAVIGATION-->
<nav class="nav">
	<ul class="nav__list nav-js">
		<li class="has-drop@@if(mainNavItemActive === "Общая информация"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Общая информация", "itemLink": "index.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": " История", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})

		</li>

		<li class="has-drop@@if(mainNavItemActive === "Государство и право"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Государство и право", "itemLink": "typography.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Правовая система Республики Беларусь", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Государственная система правовой информации", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})

		</li>

		<li class="has-drop@@if(mainNavItemActive === "Экономика и бизнес"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Экономика и бизнес", "itemLink": "404.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Инвестиционная деятельность", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Информационные технологии", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Малый бизнес", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Промышленность", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Сельское хозяйство", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Свободная экономическая зона", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Торговля", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Транспортно-логистическая система", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Финансы", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})

		</li>

		<li class="has-drop@@if(mainNavItemActive === "Наука и инновации"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Наука и инновации", "itemLink": "404.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Национальная академия наук", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Национальная инновационная система", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Вузовская наука", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Научные коммуникации", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Международное сотрудничество", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})
		</li>

		<li class="has-drop@@if(mainNavItemActive === "Культура и искусство"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Культура и искусство", "itemLink": "404.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Литература", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Архитектурное наследие", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Театральное искусство", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Музыкальное искусство", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Музеи Беларуси", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Изобразительное искусство", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Киноискусство", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})

		</li>

		<li class="has-drop is-open@@if(mainNavItemActive === "Спорт и туризм"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Спорт и туризм", "itemLink": "404.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1", "display": "block"})
		<li class="has-drop">@@include('_nav-LINK.tpl', { "itemText": "Беларусь спортивная", "itemLink": "#", "specialValue": "" })

			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Спорт высших достижений", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Спортивные сооружения", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})

		<li class="has-drop is-open">@@include('_nav-LINK.tpl', { "itemText": "Беларусь туристическая", "itemLink": "#", "specialValue": "" })

			@@include('_nav-drop-wrap-2_TWO.tpl', { "start": "1", "display": "block"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Экотуризм", "itemLink": "#", "specialValue": "" })</li>
		<li class="current">@@include('_nav-LINK.tpl', { "itemText": "Культурно-познавательный туризм", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Агротуризм", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Лечебно-оздоровительный туризм", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Религиозный туризм", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Активный туризм", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Деловой туризм", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Военно-исторический туризм", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-2_TWO.tpl', { "end": "1"})
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})

		</li>

		<li class="has-drop@@if(mainNavItemActive === "Ресурсы библиотек"){ current}">
			@@include('_nav-LINK.tpl', { "itemText": "Ресурсы библиотек", "itemLink": "404.html", "specialValue": "" })

			@@include('_nav-drop-wrap-1_ONE.tpl', { "start": "1"})
		<li>@@include('_nav-LINK.tpl', { "itemText": "Национальная библиотека Беларуси", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Республиканские отраслевые библиотеки", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Публичные библиотеки", "itemLink": "#", "specialValue": "" })</li>
		<li>@@include('_nav-LINK.tpl', { "itemText": "Библиотеки вузов", "itemLink": "#", "specialValue": "" })</li>
			@@include('_nav-drop-wrap-1_ONE.tpl', { "end": "1"})

		</li>
	</ul>
</nav>
<!--NAVIGATION end-->