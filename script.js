document.addEventListener('DOMContentLoaded', () => {

    // --- منطق صفحة تسجيل الدخول ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // هنا يمكنك إضافة منطق التحقق من تسجيل الدخول
            // الآن سنقوم بالتحويل مباشرة إلى الصفحة الرئيسية
            window.location.href = 'home.html';
        });
    }

    // --- منطق الصفحة الرئيسية ---
    if (window.location.pathname.endsWith('home.html')) {
        const modal = document.getElementById('welcome-modal');
        const closeBtn = document.querySelector('.close-btn');
        const acceptBtn = document.getElementById('accept-welcome');
        const withdrawalText = document.getElementById('withdrawal-text');
        
        // إظهار الرسالة الترحيبية
        modal.style.display = 'flex';
        
        // إغلاق الرسالة
        closeBtn.onclick = () => modal.style.display = 'none';
        acceptBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // تحديث بانر السحب
        setInterval(() => {
            const randomAmount = (Math.random() * 100 + 10).toFixed(2);
            withdrawalText.textContent = `تم سحب ${randomAmount}$ بنجاح`;
            // إعادة تشغيل الأنيميشن
            withdrawalText.style.animation = 'none';
            withdrawalText.offsetHeight; /* Trigger reflow */
            withdrawalText.style.animation = null; 
        }, 5000);

        // تحميل الصفحة الرئيسية افتراضيًا
        showPage('home');
    }
});

// دالة لعرض الصفحات المختلفة داخل الواجهة الرئيسية
function showPage(pageName) {
    const mainContent = document.getElementById('main-content');
    
    // إزالة كلاس 'active' من كل الأزرار
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // إضافة كلاس 'active' للزر المناسب
    const activeItem = document.querySelector(`.nav-item[onclick="showPage('${pageName}')"]`);
    if(activeItem) {
        activeItem.classList.add('active');
    }

    let content = `<h1>محتوى صفحة ${pageName}</h1>`; // محتوى افتراضي

    if (pageName === 'home') {
        content = `
            <div class="page-content">
                <h2>أهلاً بك في الصفحة الرئيسية</h2>
                <p>هنا يمكنك تصفح آخر العروض والخطط.</p>
                <!-- يمكن إضافة محتوى تفاعلي هنا -->
            </div>
        `;
    }
    else if (pageName === 'deposit') {
        content = generateDepositPage();
    }
    else if (pageName === 'withdraw') {
        content = generateWithdrawPage();
    }
    else if (pageName === 'vip') {
        content = generateVipPage();
    }
    // ... يمكنك إضافة باقي الصفحات هنا بنفس الطريقة
    
    mainContent.innerHTML = content;
}

// دالة لتوليد محتوى صفحة الإيداع
function generateDepositPage() {
    return `
        <div class="page-content deposit-page">
            <h2>إيداع الأموال</h2>
            <div class="input-group">
                <label>اختر خطة VIP</label>
                <select><option>VIP 1</option><option>VIP 2</option><!-- ... --></select>
            </div>
            <div class="input-group">
                <label>اكتب ID حسابك</label>
                <input type="text" placeholder="ID: 12345678">
            </div>
            <hr>
            <h4>عناوين الإيداع بالعملات الرقمية</h4>
            <div class="wallet-address">
                <img src="assets/usdt.png" alt="USDT">
                <span>USDT (TRC20)</span>
                <input type="text" value="TLsGeELYfexmuhK6g3TVQ44AAt5kxZN3gb" readonly>
                <button class="btn-copy"><i class="fas fa-copy"></i> نسخ</button>
            </div>
            <div class="wallet-address">
                <img src="assets/btc.png" alt="BTC">
                <span>BTC (SegWit)</span>
                <input type="text" value="bc1qlvx4tzwzvm66p0ukfykkv4zsqq7ywug65282u2" readonly>
                <button class="btn-copy"><i class="fas fa-copy"></i> نسخ</button>
            </div>
             <div class="wallet-address">
                <img src="assets/bnb.png" alt="BNB">
                <span>BNB (BEP20)</span>
                <input type="text" value="0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e" readonly>
                <button class="btn-copy"><i class="fas fa-copy"></i> نسخ</button>
            </div>
             <div class="wallet-address">
                <img src="assets/eth.png" alt="ETH">
                <span>ETH (ERC20)</span>
                <input type="text" value="0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e" readonly>
                <button class="btn-copy"><i class="fas fa-copy"></i> نسخ</button>
            </div>
            <div class="local-deposit">
                <p>للإيداع بالعملات المحلية، الرجاء متابعة قناة التليجرام لمعرفة الوكلاء المعتمدين.</p>
            </div>
        </div>
    `;
}
// يجب إضافة باقي الدوال مثل generateWithdrawPage, generateVipPage بنفس الطريقة
