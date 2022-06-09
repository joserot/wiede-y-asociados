const $slides = document.querySelectorAll(".slider-about img");

let i = 0;
const slides = () => {
	if (i < $slides.length - 1) {
		$slides[i].classList.remove("slide-active");
		i++;
		$slides[i].classList.add("slide-active");
	} else {
		$slides[i].classList.remove("slide-active");
		i = 0;
		$slides[i].classList.add("slide-active");
	}
};

document.addEventListener("DOMContentLoaded", (e) => {
	setInterval(() => {
		slides();
	}, 3000);
});
