// js/i18n.js
const translations = {
    en: {
        // Nav
        navHome: "Home",
        navAbout: "About",
        navMenu: "Menu",
        navContact: "Gallery",
        
        // Hero Section
        heroTitle: "CAYSI SEAFOOD RESTAURANT VUNG TAU",
        heroDesc: "Freshly caught, expertly prepared, and served straight from the ocean to your plate. Experience flavors that celebrate the sea in every bite.",
        bookBtn: "Book a table",
        exploreBtn: "Explore menu",

        // About Section
        aboutSubtitle: "ABOUT US",
        aboutTitle: "FLAVORFUL CREATIONS EVERY PLATE",
        aboutDesc1: "At Caysi, we bring the freshest seafood from ocean to table. Our passion is simple: to serve dishes that celebrate the flavors of the sea, crafted with care, quality ingredients, and culinary expertise. Every day, our chefs select the finest catches, creating meals that are fresh, flavorful, and unforgettable. From classic favorites to signature creations, we combine tradition and innovation to deliver a dining experience that delights every sense.",
        aboutDesc2: "Whether you're joining us for a casual meal, a special occasion, or to savor the freshest seafood in town, we promise a journey of taste, freshness, and ocean-inspired excellence.",
        travellerSearch: "TRAVELLER SEARCH",
        yearsText: "YEARS",

        // Menu Section
        menuSubtitle: "Restaurant Menu",
        menuDescription: "EACH DISH IS A CULINARY JOURNEY, ALLOWING GUESTS TO FULLY EXPERIENCE THE FLAVORS OF THE OCEAN."
    },
    vi: {
        // Nav
        navHome: "Trang chủ",
        navAbout: "Giới thiệu",
        navMenu: "Thực đơn",
        navContact: "Không gian",
        
        // Hero Section
        heroTitle: "NHÀ HÀNG HẢI SẢN CÂY SI VŨNG TÀU",
        heroDesc: "Tươi sống, chế biến chuyên nghiệp và phục vụ trực tiếp từ đại dương đến đĩa của bạn. Trải nghiệm hương vị tôn vinh biển cả trong từng miếng cắn.",
        bookBtn: "Đặt bàn",
        exploreBtn: "Xem thực đơn",

        // About Section
        aboutSubtitle: "VỀ CHÚNG TÔI",
        aboutTitle: "SÁNG TẠO HƯƠNG VỊ TRONG TỪNG MÓN ĂN",
        aboutDesc1: "Tại Caysi, chúng tôi mang đến hải sản tươi sống nhất từ đại dương đến bàn ăn. Đam mê của chúng tôi rất đơn giản: phục vụ những món ăn tôn vinh hương vị biển cả, được chế biến bằng sự tận tâm, nguyên liệu hảo hạng và chuyên môn ẩm thực. Mỗi ngày, các đầu bếp của chúng tôi chọn lọc những mẻ lưới ngon nhất, tạo ra những bữa ăn tươi mới, đậm đà và khó quên. Từ các món ăn cổ điển được yêu thích đến các sáng tạo độc quyền, chúng tôi kết hợp truyền thống và sự đổi mới để mang lại trải nghiệm ẩm thực đánh thức mọi giác quan.",
        aboutDesc2: "Cho dù bạn đến với chúng tôi vì một bữa ăn bình dị, một dịp đặc biệt hay để thưởng thức hải sản tươi ngon nhất thị trấn, chúng tôi hứa hẹn một hành trình của hương vị, sự tươi mới và tinh hoa đại dương.",
        travellerSearch: "DU KHÁCH TÌM KIẾM",
        yearsText: "NĂM TUỔI",

        // Menu Section
        menuSubtitle: "Menu nhà hàng",
        menuDescription: "MỖI MÓN ĂN LÀ MỘT HÀNH TRÌNH ẨM THỰC GIÚP THỰC KHÁCH THƯỞNG THỨC TRỌN VẸN HƯƠNG VỊ ĐẠI DƯƠNG."

    }
};

function setLanguage(lang) {
    // Lưu lựa chọn vào localStorage
    localStorage.setItem('preferredLang', lang);
    
    // Tìm tất cả các thẻ có thuộc tính data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Cập nhật trạng thái active cho nút bấm
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
}

// Khởi tạo ngôn ngữ khi trang vừa load
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('preferredLang') || 'vi'; // Mặc định tiếng Việt
    setLanguage(savedLang);
});