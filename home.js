const API_WP = "https://eficienteweb.com/wp-json/wp/v2",
	MEDIA = `${API_WP}/media`,
	INMUEBLES = `${API_WP}/inmuebles`,
	$inmueblesContainer = document.querySelector(".outstanding-container");

const storageChecks = () => {
	const $btnLoteos = document.getElementById("loteos"),
		$btnCasas = document.getElementById("casas"),
		$btnChacras = document.getElementById("chacras"),
		$btnAll = document.querySelector(".btn-all-inmuebles");

	$btnLoteos.addEventListener("click", (e) => {
		localStorage.setItem("category", "loteos");
	});

	$btnCasas.addEventListener("click", (e) => {
		localStorage.setItem("category", "casas");
	});

	$btnChacras.addEventListener("click", (e) => {
		localStorage.setItem("category", "chacras");
	});

	$btnAll.addEventListener("click", (e) => {
		localStorage.setItem("category", "all");
	});
};

const validateInmueble = (id) => {
	localStorage.setItem("inmueble", id);
};

const destacados = () => {
	fetch(INMUEBLES)
		.then((res) => (res.ok ? res.json() : Promise.reject()))
		.then((jsonInmuebles) => {
			console.log(jsonInmuebles);

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
				let inmuebleDestacado = el.acf.destacar;

				let data = () => {
					mediaId = el.acf.imagen_destacada;
					titulo = el.title.rendered;
					precioUSD = el.acf.precio_usd;
					precioPesos = el.acf.precio_pesos_total;
					tipo = el.acf.tipo_de_propiedad;
					ubi = el.acf.ubicacion_en_texto;
					id = el.id;
				};

				if (inmuebleDestacado === true) {
					data();
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

document.addEventListener("DOMContentLoaded", (e) => {
	storageChecks();
	destacados();
});
