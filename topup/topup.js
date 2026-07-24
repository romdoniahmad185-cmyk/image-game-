/* ==========================================
   TOPUP.JS
   By Ahmad Romdoni Project
========================================== */

// Repository GitHub CDN
const BASE_URL = "https://cdn.jsdelivr.net/gh/USERNAME/image-game";

// Ambil id game dari URL
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

// Element HTML
const gameLogo = document.getElementById("gameLogo");
const gameBanner = document.getElementById("gameBanner");
const gameName = document.getElementById("gameName");
const gameCategory = document.getElementById("gameCategory");
const diamondList = document.getElementById("diamondList");

let selectedProduct = null;

// ===============================
// Load Data
// ===============================

async function loadGame(){

    try{

        // Ambil games.json
        const gamesResponse = await fetch(`${BASE_URL}/json/games.json`);
        const games = await gamesResponse.json();

        // Cari game berdasarkan id
        const game = games.find(g => String(g.id) === String(gameId));

        if(!game){

            gameName.innerHTML = "Game tidak ditemukan";

            return;

        }

        // Isi Header
        gameLogo.src = game.logo;
        gameBanner.src = game.banner;
        gameName.innerHTML = game.name;
        gameCategory.innerHTML = game.category;

        // Ambil produk
        loadProducts(game.products);

    }

    catch(error){

        console.log(error);

    }

}

// ===============================
// Load Produk
// ===============================

async function loadProducts(url){

    try{

        const response = await fetch(url);

        const data = await response.json();

        diamondList.innerHTML = "";

        data.products.forEach(product=>{

            diamondList.innerHTML += `

            <div class="card" data-id="${product.id}">

                <img src="${product.image}">

                <h3>${product.title}</h3>

                <p>Rp ${Number(product.price).toLocaleString('id-ID')}</p>

            </div>

            `;

        });

        cardEvent();

    }

    catch(error){

        console.log(error);

    }

}

// ===============================
// Klik Card
// ===============================

function cardEvent(){

    const cards = document.querySelectorAll(".card");

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            cards.forEach(c=>{

                c.classList.remove("selected");

            });

            card.classList.add("selected");

            selectedProduct = card.dataset.id;

            console.log(selectedProduct);

        });

    });

}

// ===============================
// Tombol Lanjut
// ===============================

document
.getElementById("continueButton")
.addEventListener("click",()=>{

    const userId = document.getElementById("userId").value;
    const zoneId = document.getElementById("zoneId").value;

    if(userId===""){

        alert("Masukkan User ID");

        return;

    }

    if(selectedProduct==null){

        alert("Pilih Diamond");

        return;

    }

    console.log({

        game:gameId,

        user:userId,

        zone:zoneId,

        product:selectedProduct

    });

});

// Jalankan
loadGame();