const API_WP = "https://eficienteweb.com/wp-json/wp/v2",
	MEDIA = `${API_WP}/media`,
	INMUEBLES = `${API_WP}/inmuebles`,
	$inmueblesContainer = document.getElementById("inmuebles");

const $checkboxes = document.querySelectorAll(".filter-types-container input");

let typesArr = [];

const validateInmueble = (id) => {
	localStorage.setItem("inmueble", id);
};

const postsInmuebles = (query) => {
	let types = typesArr;

	fetch(INMUEBLES)
		.then((res) => (res.ok ? res.json() : Promise.reject()))
		.then((jsonInmuebles) => {
			//	console.log(jsonInmuebles);

			$inmueblesContainer.innerHTML = null;

			jsonInmuebles.forEach((el) => {
				let mediaId;
				let titulo;
				let precioUSD;
				let precioPesos;
				let precio;
				let tipo;
				let ubi;
				let id;
				let titleMin = el.title.rendered.toLowerCase();
				let typeMin = el.acf.tipo_de_propiedad.toLowerCase();

				let data = () => {
					mediaId = el.acf.imagen_destacada;
					titulo = el.title.rendered;
					precioUSD = el.acf.precio_usd;
					precioPesos = el.acf.precio_pesos_total;
					tipo = el.acf.tipo_de_propiedad;
					ubi = el.acf.ubicacion_en_texto;
					id = el.id;
				};

				if (types.length !== 0) {
					types.forEach((type) => {
						typeMin.includes(type) ? data() : false;
					});
				} else if (
					query === undefined ||
					(query === "" && types.length === 0)
				) {
					data();
				} else if (titleMin.includes(query)) {
					data();
				} else {
					return false;
				}

				if (precioPesos === "") {
					precio = `USD ${precioUSD} m2`;
				} else if (precioUSD === "") {
					precio = `$ ${precioPesos} `;
				} else {
					precio = "";
				}

				if (mediaId === undefined) {
					return false;
				}

				fetch(`${MEDIA}/${mediaId}`)
					.then((res) => (res.ok ? res.json() : Promise.reject()))
					.then((jsonImages) => {
						//	console.log(jsonImages);

						let imageSrc = jsonImages.source_url;

						let $articleInmueble = document.createElement("article");
						$articleInmueble.classList.add("inmueble-card");

						$articleInmueble.innerHTML = `
            <img src="${imageSrc}" alt="${titulo}" / >
            <h4>${titulo}</h4>
            <div>
              <span>${tipo}</span>
              <span>
                <i class="material-symbols-outlined">home_pin</i>
                ${ubi}</span>
            </div>
            <p>${precio}</p>
            `;

						const $linkInmueble = document.createElement("a");
						$linkInmueble.classList.add("link-inmueble");
						$linkInmueble.href = "inmueble.html";
						$linkInmueble.setAttribute("data-id", id);

						$linkInmueble.appendChild($articleInmueble);
						$inmueblesContainer.appendChild($linkInmueble);

						$linkInmueble.addEventListener("click", (e) => {
							validateInmueble($linkInmueble.getAttribute("data-id"));
						});
					});
			});
		})
		.catch((err) => console.log(err));
};

const search = (reset) => {
	const $inputSearch = document.querySelector("#search-from");
	$inputSearch.addEventListener("search", (e) => {
		let query = e.target.value.toLowerCase();
		if (reset == true) {
			query = "";
			e.target.value = "";
		} else {
			typesFilter(true);
			dataChecks(true);
			postsInmuebles(query);
		}
	});
};

const typesFilter = (reset) => {
	if (reset === true) {
		$checkboxes.forEach((check) => {
			check.checked = false;
		});
		typesArr = [];
	} else {
		$checkboxes.forEach((check) => {
			check.addEventListener("change", (e) => {
				search(true);
				if (check.checked) {
					typesArr.push(e.target.value);
				} else if (!check.checked) {
					const arrFilter = typesArr.filter((item) => item !== e.target.value);
					typesArr = arrFilter;
				}
				postsInmuebles();
			});
		});
	}
};

const dataChecks = (reset) => {
	let savedCategory = localStorage.getItem("category");

	if (savedCategory === "casas") {
		$checkboxes[1].checked = true;
	} else if (savedCategory === "loteos") {
		$checkboxes[2].checked = true;
	} else if (savedCategory === "chacras") {
		$checkboxes[0].checked = true;
	} else if (savedCategory === "all") {
		$checkboxes[0].checked = false;
		$checkboxes[1].checked = false;
		$checkboxes[2].checked = false;
	}

	if (reset === true) {
		$checkboxes.forEach((check) => {
			check.checked = false;
		});
		typesArr = [];
	} else {
		$checkboxes.forEach((check) => {
			//	search(true);
			if (check.checked) {
				typesArr.push(check.value);
			} else if (!check.checked) {
				const arrFilter = typesArr.filter((item) => item !== check.value);
				typesArr = arrFilter;
			}
		});
	}
};

document.addEventListener("DOMContentLoaded", (e) => {
	dataChecks();
	postsInmuebles();
	search();
	typesFilter();
});
