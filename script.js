const apiKey = "YOUR_API_KEY_HERE"; 

const loader = document.getElementById("loader");

// 🔍 Search Coin
async function searchCoin() {
    let coin = document.getElementById("search").value.toLowerCase();

    if (!coin) {
        alert("Please enter a coin name");
        return;
    }

    loader.classList.remove("hidden");

    try {
        let response = await fetch(`https://openapiv1.coinstats.app/coins/${coin}`, {
            headers: {
                "X-API-KEY": apiKey
            }
        });

        let data = await response.json();

        loader.classList.add("hidden");

        if (data.error) {
            document.getElementById("result").innerHTML = "❌ Coin not found";
            return;
        }

        document.getElementById("result").innerHTML = `
            <div class="coin-card">
                <img src="${data.icon}" alt="${data.name}">
                <h3>${data.name}</h3>
                <p>$${data.price.toFixed(2)}</p>
            </div>
        `;
    } catch (error) {
        loader.classList.add("hidden");
        document.getElementById("result").innerHTML = "⚠️ Error fetching data";
    }
}

// 🔥 Top Coins List
async function loadCoins() {
    try {
        let response = await fetch("https://openapiv1.coinstats.app/coins?limit=10", {
            headers: {
                "X-API-KEY": apiKey
            }
        });

        let data = await response.json();

        let coinsHTML = "";

        data.result.forEach(coin => {
            coinsHTML += `
                <div class="coin-card">
                    <img src="${coin.icon}" alt="${coin.name}">
                    <h3>${coin.name}</h3>
                    <p>$${coin.price.toFixed(2)}</p>
                </div>
            `;
        });

        document.getElementById("coins").innerHTML = coinsHTML;

    } catch (error) {
        document.getElementById("coins").innerHTML = "Error loading coins";
    }
}

// Page load hote hi top coins dikhao
loadCoins();