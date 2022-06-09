const $formOne = document.getElementById("form-contact-step-1"),
	$formTwo = document.getElementById("form-contact-step-2"),
	$formThree = document.getElementById("form-contact-step-3"),
	$circleOne = document.querySelector(".circle-1"),
	$circleTwo = document.querySelector(".circle-2"),
	$circleThree = document.querySelector(".circle-3"),
	activeCircle = "active-circle",
	completeCircle = "complete-circle";

const formSteps = () => {
	const $nextOne = $formOne.querySelector(".next");
	let name;
	let email;

	$nextOne.addEventListener("click", (e) => {
		e.preventDefault();
		name = $formOne.name.value;
		email = $formOne.email.value;
		if (name.length !== 0 && email.length !== 0) {
			$formOne.classList.add("d-none");
			$formTwo.classList.remove("d-none");
			$circleOne.classList.remove(activeCircle);
			$circleOne.classList.add(completeCircle);
			$circleTwo.classList.add(activeCircle);
		} else {
			console.log("completa los campos");
		}
	});

	const $nextTwo = $formTwo.querySelector(".next");
	const $prevTwo = $formTwo.querySelector(".prev");
	let select;

	$prevTwo.addEventListener("click", (e) => {
		e.preventDefault();
		$formTwo.classList.add("d-none");
		$formOne.classList.remove("d-none");
		$circleOne.classList.add(activeCircle);
		$circleOne.classList.remove(completeCircle);
		$circleTwo.classList.remove(activeCircle);
		$circleTwo.classList.remove(completeCircle);
	});

	$nextTwo.addEventListener("click", (e) => {
		e.preventDefault();
		select = $formTwo.select.value;
		$formTwo.classList.add("d-none");
		$formThree.classList.remove("d-none");
		$circleTwo.classList.remove(activeCircle);
		$circleTwo.classList.add(completeCircle);
		$circleThree.classList.add(activeCircle);
	});

	const $send = $formThree.querySelector(".send");
	const $prevThree = $formThree.querySelector(".prev");
	let message;

	$prevThree.addEventListener("click", (e) => {
		e.preventDefault();
		$formTwo.classList.remove("d-none");
		$formThree.classList.add("d-none");
		$circleTwo.classList.add(activeCircle);
		$circleTwo.classList.remove(completeCircle);
		$circleThree.classList.remove(activeCircle);
	});

	$send.addEventListener("click", (e) => {
		e.preventDefault();
		message = $formThree.message.value;
		if (message.length !== 0) {
			$formThree.classList.add("d-none");
			$formOne.classList.remove("d-none");
			$circleThree.classList.remove(activeCircle);
			$circleThree.classList.add(completeCircle);

			console.log({
				nombre: name,
				email: email,
				select: select,
				mensaje: message,
			});

			$formOne.reset();
			$formTwo.reset();
			$formThree.reset();
			$circleThree.classList.remove(activeCircle);
			$circleThree.classList.remove(completeCircle);
			$circleOne.classList.remove(completeCircle);
			$circleTwo.classList.remove(completeCircle);
		} else {
			console.log("Escribi el mensaje");
		}
	});
};

d.addEventListener("DOMContentLoaded", (e) => {
	formSteps();
});
