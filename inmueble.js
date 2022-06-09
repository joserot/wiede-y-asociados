const inmuebleId = localStorage.getItem("inmueble");

const API_WP = "https://eficienteweb.com/wp-json/wp/v2",
	MEDIA = `${API_WP}/media`,
	INMUEBLE = `${API_WP}/inmuebles/${inmuebleId}`;

const $galleryContainer = document.querySelector(".gallery-container");

const getInmueble = () => {
	fetch(INMUEBLE)
		.then((res) => (res.ok ? res.json() : Promise.reject()))
		.then((jsonInmueble) => {
			// console.log(jsonInmueble);

			let featuredImage = jsonInmueble.acf.imagen_destacada;
			let image_1 = jsonInmueble.acf.imagen_1;
			let image_2 = jsonInmueble.acf.imagen_2;
			let image_3 = jsonInmueble.acf.imagen_3;
			let image_4 = jsonInmueble.acf.imagen_4;
			let image_5 = jsonInmueble.acf.imagen_5;
			let title = jsonInmueble.title.rendered;
			let descripcion = jsonInmueble.acf.descripcion;
			let precioUSD = jsonInmueble.acf.precio_usd;
			let precioPesos = jsonInmueble.acf.precio_pesos_total;
			let tipo = jsonInmueble.acf.tipo_de_propiedad;
			let ubi = jsonInmueble.acf.ubicacion_en_texto;
			let ubiMaps = jsonInmueble.acf.ubicacion_para_maps;
			let slug = jsonInmueble.slug;
			let precio;
			let gallery = [featuredImage];
			let imgArr = [];

			if (precioPesos === "") {
				precio = `Precio en USD: ${precioUSD} m2`;
			} else if (precioUSD === "") {
				precio = `Precio en ARS: ${precioPesos} `;
			} else {
				precio = "Este Inmueble no tiene el precio disponible";
			}

			if (image_1 !== "" && image_1 !== null) {
				gallery.push(image_1);
			}
			if (image_2 !== "" && image_2 !== null) {
				gallery.push(image_2);
			}
			if (image_3 !== "" && image_3 !== null) {
				gallery.push(image_3);
			}
			if (image_4 !== "" && image_4 !== null) {
				gallery.push(image_4);
			}
			if (image_5 !== "" && image_5 !== null) {
				gallery.push(image_5);
			}

			fetch(MEDIA)
				.then((res) => (res.ok ? res.json() : Promise.reject()))
				.then((jsonImages) => {
					//	console.log(jsonImages);

					jsonImages.forEach((img) => {
						for (let i = 0; i < gallery.length; i++) {
							if (img.id === gallery[i]) {
								imgArr.push(img.source_url);
							}
						}
					});

					let featuredUrl;

					jsonImages.forEach((img) => {
						if (img.id === featuredImage) {
							featuredUrl = img.source_url;
						}
					});

					const $featuredImg = (document.querySelector(
						".featured-image",
					).innerHTML = `
			<img src="${featuredUrl}" />
			`);

					imgArr.forEach((el) => {
						const $img = document.createElement("img");
						$img.classList.add("modal");
						$img.src = el;
						$galleryContainer.appendChild($img);
					});
				});

			const $h1 = (document.querySelector(".hero-inmueble h1").textContent =
				title);
			const $category = (document.querySelector(
				".hero-inmueble p",
			).textContent = `Categoría: ${tipo}`);

			const $price = (document.querySelector(
				".price-inmueble p",
			).innerHTML = `<span class="material-symbols-outlined">
            label_important
          </span>${precio} `);
			const $ubi = (document.querySelector(
				".ubi-inmueble p",
			).innerHTML = `<span class="material-symbols-outlined">
            label_important
          </span>${ubi} `);
			const $description = (document.querySelector(
				".description-inmueble p",
			).innerHTML = `<span class="material-symbols-outlined">
            label_important
          </span>${descripcion} `);
			const $map = (document.getElementById("map").innerHTML = `
             <iframe id="map" width="600" height="450" style="border:0" loading="lazy" allowfullscreen
          referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzNe1_n-C2f46J1ULOPm0We1wYzibNLx8
            &q=${ubiMaps.replace(" ", "")}">
        </iframe>
      `);

			const $btnWpp = document.querySelector(".btn-inmueble a");
			$btnWpp.href = `https://wa.me/0543756449478?text=Quiero%20más%20información%20sobre:%20${title}`;
		})

		.catch((err) => console.log(err));
};

const modalGallery = () => {
	document.addEventListener("click", (e) => {
		let $backGroundModal;
		let $modalImage;

		let $closeModal = document.createElement("span");
		$closeModal.textContent = "X";
		$closeModal.classList.add("close-modal");

		if (e.target.classList.contains("modal")) {
			let urlImage = e.target.src;
			$backGroundModal = document.createElement("div");
			$backGroundModal.classList.add("backgorund-modal");
			$modalImage = document.createElement("img");
			$modalImage.src = urlImage;
			$modalImage.classList.add("modal-active");
			document.body.appendChild($backGroundModal);
			$backGroundModal.appendChild($modalImage);
			$backGroundModal.appendChild($closeModal);
		}

		$closeModal.addEventListener("click", (e) => {
			document.body.removeChild($backGroundModal);
		});
	});
};

document.addEventListener("DOMContentLoaded", (e) => {
	getInmueble();
	modalGallery();
});
