
/*if ("serviceWorker" in navigator) {
	  window.addEventListener("load", function() {
		navigator.serviceWorker
		  .register("./serviceWorker.js")
		  .then(res => console.log("service worker registered"))
		  .catch(err => console.log("service worker not registered", err))
	  })
	}*/


let shopItemsData = [];

let suculentas = [
  {
    id: "s1",
    name: "Suculenta Rosa",
    price: 15000,
    desc: `
    También conocida como la echeveria labial, es una suculenta formadora de rosetas 
    que se caracteriza por su coloración verde y roja. Originaria de las regiones 
    montañosas de México, esta suculenta prefiere climas cálidos y secos y suelos rocosos. 
    La echeveria labial crece mejor al aire libre, pero en regiones más frías se puede cultivar 
    como planta de interior. 
    `,
    desc1: "Plantas resistentes con encanto natural.",
    img: "images/productos/plantas/suculentas/rosa/rosa1.png",
    img1: "images/productos/plantas/suculentas/rosa/rosa2.jpg",
    img2: "images/productos/plantas/suculentas/rosa/rosa3.jpg",
    img3: "images/productos/plantas/suculentas/rosa/rosa4.jpg",
  },
  {
    id: "s2",
    name: "Suculenta Bananito",
    price: 15000,
    desc: `
    La cola de burro es sin duda una de las suculentas colgantes más encantadoras. 
    Hay tres características principales que hacen que esta planta se destaque del resto. 
    En primer lugar, sin duda, está la fascinante textura de esas pequeñas hojas de color verde claro. 
    La segunda característica importante es su capacidad para propagarse con gran facilidad. 
    Y en tercer lugar, pero no menos importante, están sus largas ramas colgantes en forma de cola que 
    le dan al lugar una apariencia tropical única.  Es simplemente un placer ver esta suculenta de hoja 
    perenne que tiene muchos nombres lindos.
    `,
    desc1: "Belleza botánica de bajo cuidado.",
    img: "images/productos/plantas/suculentas/banano/banano1.png",
    img1: "images/productos/plantas/suculentas/banano/banano2.jpg",
    img2: "images/productos/plantas/suculentas/banano/banano3.jpg",
    img3: "images/productos/plantas/suculentas/banano/banano4.png",
  },
  {
    id: "s3",
    name: "Suculenta Cactus",
    price: 15000,
    desc: `
    Si bien puede parecer una planta navideña inusual , la suculenta cactus, 
    también llamada cactus navideño, está repleto de flores llamativas, 
    lo que lo convierte en una vista bienvenida en pleno invierno. 
    Los tallos carnosos y segmentados de la planta son hojas aplanadas y ligeramente 
    dentadas en cada lado. A finales del otoño o principios del invierno, florecen flores 
    tubulares en los extremos de cada tallo. 
    `,
    desc1: "Hojas exuberantes y colores cautivadores.",
    img: "images/productos/plantas/suculentas/cactus/cactus1.jpeg",
    img1: "images/productos/plantas/suculentas/cactus/cactus2.jpg",
    img2: "images/productos/plantas/suculentas/cactus/cactus3.png",
    img3: "images/productos/plantas/suculentas/cactus/cactus4.jpg",
  }
];
let bromelias = [
  {
    id: "b1",
    name: "Bromelia Pluma",
    price: 20000,
    desc: `
    La planta Pink Quill, o Tillandsia Cyanea, es una pequeña planta dulce. 
    Cyanea Pink Quill tiene una flor de color rosa intenso con hojas exteriores verdes. 
    Esta planta se envía completamente florecida y se parece mucho a la planta de la imagen. 
    La Pink Quill, una bromelia que también produce una planta aérea, es una planta de interior 
    fácil y resistente.
    `,
    desc1: "Elegancia natural con toque exótico.",
    img: "images/productos/plantas/bromelias/indio/indio1.jpeg",
    img1: "images/productos/plantas/bromelias/indio/indio2.jpg",
    img2: "images/productos/plantas/bromelias/indio/indio3.jpg",
    img3: "images/productos/plantas/bromelias/indio/indio2.jpg",
  },
  {
    id: "b2",
    name: "Bromelia Medusa",
    price: 20000,
    desc: `
    También llamadas Neoregelia medusa,
    crecen bien en una sala de estar o cocina como planta de interior, 
    y realmente en cualquier otro lugar con luz indirecta brillante y humedad de moderada a alta.
    <br><br>
    Son conocidos por sus hojas verdes en forma de roseta y sus centros rojos que añaden un toque 
    de color a cualquier habitación. 
    `,
    desc1: "Belleza tropical en casa",
    img: "images/productos/plantas/bromelias/rosa/rosa1.jpg",
    img1: "images/productos/plantas/bromelias/rosa/rosa2.jpg",
    img2: "images/productos/plantas/bromelias/rosa/rosa3.jpg",
    img3: "images/productos/plantas/bromelias/rosa/rosa4.jpg",
  },
  {
    id: "b3",
    name: "Bromelia Plata",
    price: 20000,
    desc: `
    Esta bromelia es una planta con flores originaria de Brasil. 
    En la naturaleza, es una planta epífita, lo que significa que crece sobre otras plantas o árboles. 
    Esta variedad de bromelia tiene hojas gruesas, arqueadas y de color verde grisáceo.
    `,
    desc1: "Flores tropicales en vivos colores.",
    img: "images/productos/plantas/bromelias/estrella/plata1.jpg",
    img1: "images/productos/plantas/bromelias/estrella/plata2.jpg",
    img2: "images/productos/plantas/bromelias/estrella/plata3.jpg",
    img3: "images/productos/plantas/bromelias/estrella/plata2.jpg",
  },
];
let orquideas = [
  {
    id: "o1",
    name: "Orquidea Zapatico",
    price: 60000,
    desc: `
    Esta orquídea suele ser mitad terrestre y mitad epífita, lo que significa que crece de forma natural 
    en el suelo y también en otras plantas y árboles. Algunas especies crecen sobre rocas, 
    pero esto es menos común. Por lo general espera un ambiente tropical con mucha humedad y sombra. 
    `,
    desc1: "Flores únicas de gran sofisticación.",
    img: "images/productos/plantas/orquideas/zapatico/zapatico1.jpg",
    img1: "images/productos/plantas/orquideas/zapatico/zapatico3.jpg",
    img2: "images/productos/plantas/orquideas/zapatico/zapatico3.png",
    img3: "images/productos/plantas/orquideas/zapatico/zapatico4.png",
  },
  {
    id: "o2",
    name: "Orquidea Cattleya",
    price: 30000,
    desc: `
    Originaria de Costa Rica y gran parte de América del Sur, por lo general tiene flores grandes 
    y fragantes que duran menos tiempo que otras orquídeas. Las Cattleya son orquídeas epífitas 
    (que crecen en árboles) que crecen en lo alto de las copas de los árboles de la jungla. 
    A estas orquídeas les gustan las raíces bien drenadas y mucha luz. 
    `,
    desc1: "Belleza etérea en tu hogar.",
    img: "images/productos/plantas/orquideas/crespa/crespa1.png",
    img1: "images/productos/plantas/orquideas/crespa/crespa1.png",
    img2: "images/productos/plantas/orquideas/crespa/crespa1.png",
    img3: "images/productos/plantas/orquideas/crespa/crespa1.png",
  },
  {
    id: "o3",
    name: "Orquidea Petalo",
    price: 30000,
    desc: `Elegancia en cada pétalo.`,
    desc1: "Elegancia en cada pétalo.",
    img: "images/productos/plantas/orquideas/petalo/petalo1.jpeg",
    img1: "images/productos/plantas/orquideas/petalo/petalo1.jpeg",
    img2: "images/productos/plantas/orquideas/petalo/petalo1.jpeg",
    img3: "images/productos/plantas/orquideas/petalo/petalo1.jpeg",
  }
];
let anturios = [
  {
    id: "an1",
    name: "Anturio Rojo",
    price: 25000,
    desc: `Toque de color en hojas exóticas.`,
    desc1: "Toque de color en hojas exóticas.",
    img: "images/productos/plantas/anturios/rojo/rojo1.jpeg",
    img1: "images/productos/plantas/anturios/rojo/rojo1.jpeg",
    img2: "images/productos/plantas/anturios/rojo/rojo1.jpeg",
    img3: "images/productos/plantas/anturios/rojo/rojo1.jpeg",
  },
  {
    id: "an2",
    name: "Anturio Salmón",
    price: 25000,
    desc: `Exuberancia tropical en cada planta.`,
    desc1: "Exuberancia tropical en cada planta.",
    img: "images/productos/plantas/anturios/salmon/salmon1.jpeg",
    img1: "images/productos/plantas/anturios/salmon/salmon1.jpeg",
    img2: "images/productos/plantas/anturios/salmon/salmon1.jpeg",
    img3: "images/productos/plantas/anturios/salmon/salmon1.jpeg",
  },
  {
    id: "an3",
    name: "Anturio Mini",
    price: 15000,
    desc: `Elegancia natural con acento de selva.`,
    desc1: "Elegancia natural con acento de selva.",
    img: "images/productos/plantas/anturios/mini/mini2.jpg",
    img1: "images/productos/plantas/anturios/mini/mini.jpeg",
    img2: "images/productos/plantas/anturios/mini/mini3.png",
    img3: "images/productos/plantas/anturios/mini/mini1.png",
  }
];
let cartuchos = [
  {
    id: "ca1",
    name: "Cartucho Blanco",
    price: 25000,
    desc: `Toque floral exquisito y original.`,
    desc1: "Toque floral exquisito y original.",
    img: "images/productos/plantas/cartuchos/blanco/blanco1.jpg",
    img1: "images/productos/plantas/cartuchos/blanco/blanco1.jpg",
    img2: "images/productos/plantas/cartuchos/blanco/blanco1.jpg",
    img3: "images/productos/plantas/cartuchos/blanco/blanco1.jpg",
  },
  {
    id: "ca2",
    name: "Cartucho Color",
    price: 25000,
    desc: `Inflorescencias de elegancia singular.`,
    desc1: "Inflorescencias de elegancia singular.",
    img: "images/productos/plantas/cartuchos/color/color1.png",
    img1: "images/productos/plantas/cartuchos/color/color1.png",
    img2: "images/productos/plantas/cartuchos/color/color1.png",
    img3: "images/productos/plantas/cartuchos/color/color1.png",
  },
  {
    id: "ca3",
    name: "Cartucho Mini",
    price: 10000,
    desc: `Flores con forma embellecedora.`,
    desc1: "Flores con forma embellecedora.",
    img: "images/productos/plantas/cartuchos/mini/mini1.jpg",
    img1: "images/productos/plantas/cartuchos/mini/mini1.jpg",
    img2: "images/productos/plantas/cartuchos/mini/mini1.jpg",
    img3: "images/productos/plantas/cartuchos/mini/mini1.jpg",
  }
];
let platiceros = [
  {
    id: "p1",
    name: "Platicero Cuerno",
    price: 60000,
    desc: `Verdor vibrante y toque de selva.`,
    desc1: "Verdor vibrante y toque de selva.",
    img: "images/productos/plantas/platiceros/alce/alce1.jpeg",
    img1: "images/productos/plantas/platiceros/alce/alce2.jpg",
    img2: "images/productos/plantas/platiceros/alce/alce1.jpeg",
    img3: "images/productos/plantas/platiceros/alce/alce2.jpg",
  },
  {
    id: "p2",
    name: "Platicero Oreja",
    price: 60000,
    desc: `Elegancia tropical en cada planta.`,
    desc1: "Elegancia tropical en cada planta.",
    img: "images/productos/plantas/platiceros/elefante/elefante1.jpg",
    img1: "images/productos/plantas/platiceros/elefante/elefante1.jpg",
    img2: "images/productos/plantas/platiceros/elefante/elefante1.jpg",
    img3: "images/productos/plantas/platiceros/elefante/elefante1.jpg",
  },
  {
    id: "p3",
    name: "Platicero Común",
    price: 45000,
    desc: `Hojas exóticas en forma de lanza.`,
    desc1: "Hojas exóticas en forma de lanza.",
    img: "images/productos/plantas/platiceros/comun/comun1.jpg",
    img1: "images/productos/plantas/platiceros/comun/comun1.jpg",
    img2: "images/productos/plantas/platiceros/comun/comun1.jpg",
    img3: "images/productos/plantas/platiceros/comun/comun1.jpg",
  }
];
let complementos = [
  {
    id: "c1",
    name: "Estantería Bambú",
    price: 90000,
    desc: `Ideal para exhibir tus plantas con estilo y armonía.`,
    desc1: "Ideal para exhibir tus plantas con estilo y armonía.",
    img: "images/productos/complementos/soportes/bamboo/estante/estante1.jpg",
    img1: "images/productos/complementos/soportes/bamboo/estante/estante1.jpg",
    img2: "images/productos/complementos/soportes/bamboo/estante/estante1.jpg",
    img3: "images/productos/complementos/soportes/bamboo/estante/estante1.jpg",
  },
  {
    id: "c2",
    name: "Matera Concreto",
    price: 45000,
    desc: `Aspecto contemporáneo y duradero, un hogar sólido y elegante para tus plantas.`,
    desc1: "Aspecto contemporáneo y duradero, un hogar sólido y elegante para tus plantas.",
    img: "images/productos/complementos/materas/concreto/concreto1.jpg",
    img1: "images/productos/complementos/materas/concreto/concreto1.jpg",
    img2: "images/productos/complementos/materas/concreto/concreto1.jpg",
    img3: "images/productos/complementos/materas/concreto/concreto1.jpg",
  },
  {
    id: "c3",
    name: "Soporte Bambú",
    price: 30000,
    desc: `Para elevar tus plantas y crear una presentación atractiva, simplicidad y belleza.`,
    desc1: "Para elevar tus plantas y crear una presentación atractiva, simplicidad y belleza.",
    img: "images/productos/complementos/soportes/bamboo/base/base1.jpg",
    img1: "images/productos/complementos/soportes/bamboo/base/base1.jpg",
    img2: "images/productos/complementos/soportes/bamboo/base/base1.jpg",
    img3: "images/productos/complementos/soportes/bamboo/base/base1.jpg",
  },
  {
    id: "c4",
    name: "Canasta Bambú 30x30",
    price: 45000,
    desc: `Toque rústico y tropical, una forma única de presentar y proteger tus plantas.`,
    desc1: "Toque rústico y tropical, una forma única de presentar y proteger tus plantas.",
    img: "images/productos/complementos/materas/bamboo/30x30/30x30_1.png",
    img1: "images/productos/complementos/materas/bamboo/30x30/30x30_2.png",
    img2: "images/productos/complementos/materas/bamboo/30x30/30x30_1.png",
    img3: "images/productos/complementos/materas/bamboo/30x30/30x30_2.png",
  },
  {
    id: "c5",
    name: "Canasta Bambú 20x20",
    price: 30000,
    desc: `Fusión perfecta de funcionalidad y estilo para exhibir tus verdaderos tesoros verdes.`,
    desc1: "Fusión perfecta de funcionalidad y estilo para exhibir tus verdaderos tesoros verdes.",
    img: "images/productos/complementos/materas/bamboo/20x20/20x20_1.png",
    img1: "images/productos/complementos/materas/bamboo/20x20/20x20_2.png",
    img2: "images/productos/complementos/materas/bamboo/20x20/20x20_3.png",
    img3: "images/productos/complementos/materas/bamboo/20x20/20x20_4.png",
  },
  {
    id: "c6",
    name: "Canasta Bambú 40x20",
    price: 45000,
    desc: `Funcionalidad y estilo rústico.`,
    desc1: "Funcionalidad y estilo rústico.",
    img: "images/productos/complementos/materas/bamboo/40x20/40x20_1.png",
    img1: "images/productos/complementos/materas/bamboo/40x20/40x20_2.png",
    img2: "images/productos/complementos/materas/bamboo/40x20/40x20_1.png",
    img3: "images/productos/complementos/materas/bamboo/40x20/40x20_2.png",
  },
  {
    id: "c7",
    name: "Combo Bambú SixPack",
    price: 180000,
    desc: "Set x6 Canasta Bambu: 20x20 (2und), 30x30 (2und), 40x20 (2und).)",
    desc1: "Fusión perfecta de funcionalidad y estilo para exhibir tus verdaderos tesoros verdes.",
    img: "images/productos/complementos/materas/bamboo/sixPack/sixPack1.png",
    img1: "images/productos/complementos/materas/bamboo/20x20/20x20_1.png",
    img2: "images/productos/complementos/materas/bamboo/30x30/30x30_1.png",
    img3: "images/productos/complementos/materas/bamboo/40x20/40x20_1.png",
  },
  {
    id: "c8",
    name: "Abono Orgánico",
    price: 10000,
    desc: `Una forma natural de nutrir y asegurar su esplendor en cada temporada.`,
    desc1: "Una forma natural de nutrir y asegurar su esplendor en cada temporada.",
    img: "images/productos/complementos/abonos/abono1.png",
    img1: "images/productos/complementos/abonos/abono1.png",
    img2: "images/productos/complementos/abonos/abono1.png",
    img3: "images/productos/complementos/abonos/abono1.png",
  },
  {
    id: "c9",
    name: "Set x100 Ganchos Cadena",
    price: 30000,
    desc: `Ganchos en Acero galvanizado resistentes y duraderos.`,
    desc1: "Ganchos en Acero galvanizado resistentes y duraderos.",
    img: "images/productos/complementos/accesorios/ganchos/ganchos100.png",
    img1: "images/productos/complementos/accesorios/ganchos/ganchos100_1.png",
    img2: "images/productos/complementos/accesorios/ganchos/ganchos100.png",
    img3: "images/productos/complementos/accesorios/ganchos/ganchos100_1.png",
  }
];


suculentas.forEach((planta) => {
  shopItemsData.push(planta);
});
bromelias.forEach((planta) => {
  shopItemsData.push(planta);
});
orquideas.forEach((planta) => {
  shopItemsData.push(planta);
});
anturios.forEach((planta) => {
  shopItemsData.push(planta);
});
cartuchos.forEach((planta) => {
  shopItemsData.push(planta);
});
platiceros.forEach((planta) => {
  shopItemsData.push(planta);
});
complementos.forEach((planta) => {
  shopItemsData.push(planta);
});



