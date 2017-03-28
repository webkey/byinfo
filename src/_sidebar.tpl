<!--SIDEBAR-->
<aside class="sidebar">
	<a href="#" class="btn-menu-close btn-nav-close-js"><i></i><span>Закрыть</span></a>
	<!--logo-->
	<strong class="logo"><a href="index.html">Project Name</a><img style="display: none;" src="img/logo.png" alt="Project Name"></strong> <!--logo end-->
	<div class="sidebar__holder">
		<div class="sidebar__frame">
			@@include('_navigation.tpl', { "mainNavItemActive": "@@mainNavItemActive" })
			<!--<div class="sidebar__widget">
				<h3>Title of Sidebar Widget</h3>
				Content of Sidebar Widget
			</div>-->
		</div>
	</div>
</aside>
<!--SIDEBAR-->