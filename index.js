const d = document,
	$btnBurger = d.querySelector(".burger-menu"),
	$nav = d.querySelector(".nav"),
	$btnDark = d.querySelector(".btn-dark-mode"),
	$heroPages = d.querySelector(".hero-pages"),
	$containerHeroPages = d.querySelector(".hero-pages__container");

const burgerMenu = (btn, nav) => {
	btn.addEventListener("click", (e) => {
		if (btn.classList.contains("menu-close")) {
			btn.classList.remove("menu-close");
			nav.classList.add("hidden");
		} else {
			btn.classList.add("menu-close");
			nav.classList.remove("hidden");
		}
	});
};

const darkMode = (btn) => {
	let sun = "brightness_5";
	let moon = "dark_mode";
	const $logo = d.querySelector(".header__logo img");

	const lingth = () => {
		btn.childNodes[1].textContent = moon;
		document.body.removeAttribute("darkMode");
		$nav.removeAttribute("darkMode");
		$logo.src = "./img/logo-negro.png";
		localStorage.setItem("theme", "ligth");
	};

	const dark = () => {
		btn.childNodes[1].textContent = sun;
		document.body.setAttribute("darkMode", true);
		$nav.setAttribute("darkMode", true);
		$logo.src = "./img/logo-blanco.png";
		localStorage.setItem("theme", "dark");
	};

	btn.addEventListener("click", () => {
		if (btn.childNodes[1].textContent === sun) {
			lingth();
		} else {
			dark();
		}
	});

	d.addEventListener("DOMContentLoaded", (e) => {
		if (localStorage.getItem("theme") === null) {
			localStorage.setItem("theme", "ligth");
		}

		if (localStorage.getItem("theme") === "ligth") {
			lingth();
		}

		if (localStorage.getItem("theme") === "dark") {
			dark();
		}
	});
};

const cleanStorage = () => {
	const $linksNav = document.querySelectorAll(".nav a");

	$linksNav.forEach(($a) => {
		$a.addEventListener("click", (e) => {
			localStorage.setItem("category", "all");
		});
	});
};

d.addEventListener("DOMContentLoaded", (e) => {
	burgerMenu($btnBurger, $nav);
	cleanStorage();
});

darkMode($btnDark);
