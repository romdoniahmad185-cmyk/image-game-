// =======================================
// Ambil parameter game dari URL
// =======================================


const jsonURL = "https://romdoniahmad185-cmyk.github.io/image-game-/topup/json/mobile-legend.json";
fetch(jsonURL)
    .then(response => response.json())
    .then(data => {
        loadGame(data);
    })


    .catch(error => console.error(error));

// =======================================
// Element HTML
// =======================================

const gameLogo = document.getElementById("gameLogo");
const gameName = document.getElementById("gameName");
const bannerImage = document.getElementById("bannerImage");
const diamondContainer = document.getElementById("diamondContainer");
const buyButton = document.getElementById("buyButton");


// =======================================
// Variabel
// =======================================

let banners = [];
let currentSlide = 0;
let selectedProduct = null;


// =======================================
// Ambil JSON
// =======================================



// =======================================
// Load Data
// =======================================

function loadGame(data){

    gameName.textContent = data.game;

    if(data.logo){

        gameLogo.src = data.logo;

    }

    banners = data.banner;

    bannerImage.src = banners[0];

    createSlider();

    createProducts(data.products);

}


// =======================================
// Slider
// =======================================

function createSlider(){

    setInterval(()=>{

        currentSlide++;

        if(currentSlide >= banners.length){

            currentSlide = 0;

        }

        bannerImage.style.opacity = 0;

        setTimeout(()=>{

            bannerImage.src = banners[currentSlide];

            bannerImage.style.opacity = 1;

        },250);

    },3000);

}


// =======================================
// Produk
// =======================================

function createProducts(products){

    diamondContainer.innerHTML = "";

    products.forEach(product=>{

        const card = document.createElement("div");

        card.className = "diamond-card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.amount} Diamond">

            

            <p>Rp ${product.price.toLocaleString('id-ID')}</p>

        `;

        card.onclick = ()=>{

            document.querySelectorAll(".diamond-card").forEach(item=>{

                item.classList.remove("active");

            });

            card.classList.add("active");

            selectedProduct = product;
             openPopup(product);

        };

        diamondContainer.appendChild(card);

    });

}


// =======================================
// Tombol Top Up
// =======================================

buyButton.onclick = function(){

    if(selectedProduct == null){

        alert("Silakan pilih nominal terlebih dahulu.");

        return;

    }

    openPopup(selectedProduct);

};

// =============================
// POPUP
// =============================

const popup = document.getElementById("popupTopup");

const popupImage = document.getElementById("popupImage");

const popupNominal = document.getElementById("popupNominal");

const popupHarga = document.getElementById("popupHarga");

const btnCancel = document.getElementById("btnCancel");

const btnContinue = document.getElementById("btnContinue");

const userId = document.getElementById("userId");

const zoneId = document.getElementById("zoneId");

function openPopup(product){
  


    popupImage.src = product.image;

    /*popupNominal.textContent =
        product.amount + " " + product.unit;*/

    popupHarga.textContent =
        "Rp " + product.price.toLocaleString("id-ID");

    userId.value = "";

    zoneId.value = "";

  
        popup.style.display = "flex";
  


}

function closePopup(){

    popup.style.display = "none";

}

btnCancel.onclick = closePopup;

popup.onclick = function(e){

    if(e.target===popup){

        closePopup();

    }

};

btnContinue.onclick = function(){

    if(userId.value==""){

        alert("Masukkan ID Game");

        return;

    }

    if(zoneId.value==""){

        alert("Masukkan Zone ID");

        return;

    }

    alert("Lanjut ke pembayaran");

    closePopup();

};
