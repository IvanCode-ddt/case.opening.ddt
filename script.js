const cases = [
    {
        name: "Cơm case",
        img: "images/cases/comcase.png",
        items: [
            {name: "Buterfly Gamma", img: "images/Comcase/buterflyknifegamma.png", rarity: "legendary", weight: 3},
            {name: "Awp Dragon Lore", img: "images/Comcase/awpdragonlore.png", rarity: "legendary", weight: 3},
            {name: "Ak47 Bluegem Titan", img: "images/Comcase/ak47titanholoblue.jpg", rarity: "legendary", weight: 3},
            {name: "Sports Gloves | Hedge Maze", img: "images/Comcase/gloves.webp", rarity: "legendary", weight: 3},
            {name: "12 Đôi dép", img: "images/Comcase/12doidep.png", rarity: "common", weight: 14},
            {name: "Cứt", img: "images/Comcase/cut1.jpg", rarity: "common", weight: 14},
            {name: "Cứt", img: "images/Comcase/cut.jpg", rarity: "common", weight: 14},
            {name: "Đường ray", img: "images/Comcase/duongray.png", rarity: "common", weight: 14},
            {name: "Nem chua", img: "images/Comcase/nemchua.jpg", rarity: "common", weight: 14},
            {name: "Rau Má", img: "images/Comcase/rauma.png", rarity: "common", weight: 18}
        ]
    },
    {
        name: "Cứt case",
        img: "images/cases/cutcase.png",
        items: [
            {name: "Coming soon", img: "images/mystic_staff.png", rarity: "legendary", weight: 5},
            {name: "Coming soon", img: "images/mystic_orb.png", rarity: "epic", weight: 15},
            {name: "Coming soon", img: "images/mystic_wand.png", rarity: "rare", weight: 30},
            {name: "Coming soon", img: "images/mystic_scroll.png", rarity: "common", weight: 50}
        ]
    },
];

// =========================
// 🌐 DOM elements
// =========================
const homeScreen = document.getElementById('homeScreen');
const caseDetailScreen = document.getElementById('caseDetailScreen');
const caseAnimationScreen = document.getElementById('caseAnimationScreen');

const caseListDiv = document.getElementById('caseList');
const itemListDiv = document.getElementById('itemList');
const caseTitle = document.getElementById('caseTitle');

const openCaseBtn = document.getElementById('openCaseBtn');
const cancelBtn = document.getElementById('cancelBtn');
const openNextBtn = document.getElementById('openNextBtn');
const backHomeBtn = document.getElementById('backHomeBtn');

const lootTrack = document.getElementById('lootTrack');
const resultText = document.getElementById('resultText');
const particleContainer = document.getElementById('particleContainer');
const recentWinsList = document.getElementById('recentWinsList');

const openSound = document.getElementById('openSound');
const rareSound = document.getElementById('rareSound');

let currentCase = null;

// Ẩn nút ban đầu (tránh hiển thị trước khi mở)
openNextBtn.style.display = 'none';
backHomeBtn.style.display = 'none';

// =========================
// 🧭 Hiển thị danh sách hòm
// =========================
function showCases() {
    caseListDiv.innerHTML = '';
    cases.forEach((c, i) => {
        const div = document.createElement('div');
        div.className = 'case-card';
        div.innerHTML = `<img src="${c.img}" alt="${c.name}"><p>${c.name}</p>`;
        div.onclick = () => selectCase(i);
        caseListDiv.appendChild(div);
    });
}

// =========================
// 📌 Chọn hòm
// =========================
function selectCase(index) {
    currentCase = cases[index];
    caseTitle.textContent = currentCase.name;
    itemListDiv.innerHTML = '';
    currentCase.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `<img src="${item.img}" alt="${item.name}"><p>${item.name}</p>`;
        itemListDiv.appendChild(div);
    });
    homeScreen.classList.add('hidden');
    caseDetailScreen.classList.remove('hidden');
}

// =========================
// 🔙 Cancel
// =========================
cancelBtn.addEventListener('click', () => {
    caseDetailScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
});

// =========================
// 🧰 Mở hòm
// =========================
openCaseBtn.addEventListener('click', () => {
    caseDetailScreen.classList.add('hidden');
    caseAnimationScreen.classList.remove('hidden');
    animateCase(currentCase.items);
});

// =========================
// ⏭️ Open Next / Back Home
// =========================
openNextBtn.addEventListener('click', () => { animateCase(currentCase.items); });
backHomeBtn.addEventListener('click', () => {
    caseAnimationScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
});

// =========================
// ✨ Particle effect
// =========================
function createParticles(x, y) {
    particleContainer.innerHTML = '';
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.position = 'absolute';
        p.style.width = '5px';
        p.style.height = '5px';
        p.style.background = 'gold';
        p.style.borderRadius = '50%';
        // x,y expected relative to top-left of case-window
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        particleContainer.appendChild(p);

        const angle = Math.random() * 2 * Math.PI;
        const distance = 50 + Math.random() * 50;
        const duration = 500 + Math.random() * 300;
        p.animate([
            { transform: `translate(0,0)`, opacity: 1 },
            { transform: `translate(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance}px)`, opacity: 0 }
        ], { duration: duration, easing: 'ease-out', fill: 'forwards' });
    }
}

// =========================
// 🎲 Random theo weight (an toàn hơn)
 // =========================
function getRandomItem(items) {
    if (!items || items.length === 0) return null;
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);
    if (totalWeight <= 0) return items[0];
    let rand = Math.random() * totalWeight;
    for (const item of items) {
        if (rand < (item.weight || 0)) return item;
        rand -= (item.weight || 0);
    }
    return items[items.length - 1];
}

// =========================
// 📝 Thêm Recent Wins
// =========================
function addToRecentWins(item) {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${item.img}" alt="${item.name}">${item.name} (${item.rarity})`;
    recentWinsList.prepend(li);
    setTimeout(() => li.classList.add('new-item'), 50);
}

// =========================
// 🎰 Animation mở hòm (FIXED alignment)
// =========================
function animateCase(items) {
    lootTrack.innerHTML = '';
    // chọn trước item thắng
    const winningItem = getRandomItem(items);

    const totalSlots = 200;
    const winningIndex = Math.floor(totalSlots / 2);
    const itemElements = [];

    // chèn các ảnh (winningItem đặt ở winningIndex)
    for (let i = 0; i < totalSlots; i++) {
        const item = (i === winningIndex) ? winningItem : getRandomItem(items);
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        img.dataset.rarity = item.rarity;
        lootTrack.appendChild(img);
        itemElements.push(img);
    }

    // đảm bảo transform về 0 trước khi đo
    lootTrack.style.transform = 'translateX(0px)';

    // đợi layout hoàn tất trước khi đo vị trí thực tế
    requestAnimationFrame(() => {
        // đo vị trí thực tế của ảnh thắng so với container
        const parentRect = lootTrack.parentElement.getBoundingClientRect();
        const targetImg = itemElements[winningIndex];
        const imgRect = targetImg.getBoundingClientRect();

        // vị trí x hiện tại của ảnh (tính từ bên trái container)
        const currentLeft = imgRect.left - parentRect.left;
        // vị trí mong muốn để ảnh nằm chính giữa trong container
        const desiredLeft = (parentRect.width - imgRect.width) / 2;
        // khoảng dịch chuyển cần thiết từ vị trí hiện tại đến vị trí mong muốn
        const targetScroll = currentLeft - desiredLeft;

        // animation scroll: translateX từ 0 -> -targetScroll
        let startTime = null;
        const duration = 7000;

        // play open sound (nhiều trình duyệt có thể chặn, dùng catch)
        if (openSound) openSound.currentTime = 0, openSound.play().catch(()=>{});

        resultText.textContent = '';
        openNextBtn.style.display = 'none';
        backHomeBtn.style.display = 'none';

        function easeOutCubic(t) {  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

        function animateScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(t);
            const current = eased * targetScroll;
            lootTrack.style.transform = `translateX(-${current}px)`;
            if (t < 1) requestAnimationFrame(animateScroll);
            else finalize();
        }

        function finalize() {
            // ảnh đã nằm chính giữa
            const finalImg = itemElements[winningIndex];

            if (finalImg.dataset.rarity !== 'common') {
                finalImg.style.transform = 'scale(1.6)';
                finalImg.style.boxShadow = '0 0 35px gold';
                if (rareSound) { rareSound.currentTime = 0; rareSound.play().catch(()=>{}); }

                const rect = finalImg.getBoundingClientRect();
                const parentRect2 = lootTrack.parentElement.getBoundingClientRect();
                // toạ độ relative to parent container
                createParticles(rect.left + rect.width / 2 - parentRect2.left, rect.top + rect.height / 2 - parentRect2.top);
            }

            resultText.textContent = `🎉 You got: ${winningItem.name} (${winningItem.rarity}) 🎉`;
            addToRecentWins(winningItem);

            openNextBtn.style.display = 'inline-block';
            backHomeBtn.style.display = 'inline-block';
        }

        requestAnimationFrame(animateScroll);
    });
}

// gọi showCases khi script load xong
showCases();
