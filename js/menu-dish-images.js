/*
 * Cấu hình ảnh cho menu-dish-photo; ảnh card nhóm nằm trong menu-images.js.
 * basePath là đường dẫn từ gốc website, không tính từ trang /menu/.
 * Dùng đúng tên món tiếng Việt bên dưới; đổi thứ tự món hoặc ngôn ngữ không đổi ảnh.
 * '' giữ ảnh minh họa của nhóm món cho đến khi có ảnh riêng.
 * Chuỗi: 'hau-nuong-pho-mai.webp' lấy từ assets/dishes-img/.
 * Cắt ảnh: { file: 'hau-nuong-pho-mai.webp', position: '50% 35%' }.
 * Ảnh ngoài thư mục: { src: 'assets/hau-sua-dai-duong.jpg' }.
 * Ảnh dùng chung: thêm altVi / altEn để mô tả đúng ảnh thay vì tên món.
 * Tên file phải đúng cả chữ hoa/thường trên máy chủ.
 */
window.CAYSI_MENU_DISH_IMAGES = {
    "basePath": "assets/dishes-img/",
    "dishes": {
        "cua": {
            "Cua hấp sả": "cua-hap-sa.jpg",
            "Cua cháy tỏi": "cua-chay-toi.jpg",
            "Cua rang me": "cua-rang-me.jpg",
            "Cua rang muối": "cua-rang-muoi.jpg",
            "Cua nấu lẩu": "cua-nau-lau.jpg"
        },
        "ngheu": {
            "Nghêu hấp sả": "ngheu-hap-xa.png",
            "Nghêu hấp Thái": "ngheu-hap-thai.jpg",
            "Nghêu xào mỡ hành": "ngheu-xao-mo-hanh.jpg",
            "Nghêu xào lá quế": "ngheu-xao-la-que.jpg",
        },
        "lau": {
            "Lẩu hải sản": "lau-hai-san.jpg",
            "Lẩu cá đuối": "",
            "Lẩu cá bớp": "lau-ca-bop.webp",
            "Lẩu cá chim": { "src": "/assets/menu-images/ca-chim.jpg", "altVi": "Cá chim tươi được cầm trên tay", "altEn": "Fresh pomfret held in a hand" },
            "Lẩu cá mú": { "src": "/assets/menu-images/ca-mu.jpg", "altVi": "Cá mú", "altEn": "Grouper" },
            "Lẩu Thái": "lau-thai.jpg"
        },
        "hau": {
            "Hàu nướng mỡ hành": "hau-nuong-mo-hanh.jpg",
            "Hàu nướng mọi": "hau-nuong-moi.jpg",
            "Hàu nướng phô mai": "hau-nuong-pho-mai.jpg",
            "Hàu ăn sống + mù tạt": ""
        },
        "ngheu-2-coi": {
            "Nghêu 2 còi hấp sả": "ngheu-2-coi-hap-sa.jpg",
            "Nghêu 2 còi hấp Thái": "ngheu-2-coi-hap-thai.png",
        },
        "ca-chim": {
            "Cá chim nướng mỡ hành": "ca-chim-nuong-mo-hanh.jpg",
            "Cá chim nướng muối ớt": "ca-chim-nuong-muoi-ot.jpg",
            "Cá chim chiên giòn": "ca-chim-chien-gion.png",
            "Cá chim hấp Hong Kong": "ca-chim-hap-hong-kong.jpg",
            "Cá chim sốt cà chua": "ca-chim-sot-ca-chua.jpg"
        },
        "ca-saba": {
            "Cá saba nướng mỡ hành": "ca-saba-nuong-mo-hanh.jpg",
            "Cá saba nướng muối ớt": "ca-saba-nuong-muoi-ot.png",
            "Cá saba chiên giòn": "ca-saba-chien-gion.webp"
        },
        "ca-duoi": {
            "Cá đuối hấp mỡ hành": "ca-duoi-hap-mo-hanh.webp",
            "Cá đuối nướng muối ớt": "ca-duoi-nuong-muoi-ot.jpg",
            "Lẩu cá đuối măng chua": {
                "src": "assets/hotpot.jpg"
            }
        },
        "mi-mien": {
            "Mì xào bò": "mi-xao-bo.jpg",
            "Mì xào hải sản": "",
            "Mì xào rau": "mi-xao-rau.webp",
            "Miến xào cua": "mien-xao-cua.jpg",
            "Miến xào hải sản": "mien-xao-hai-san.jpg",
        },
        "khai-vi": {
            "Nấm biển (Đặc sản Cây Si)": "",
            "Chả giò chiên": "cha-gio-chien.jpg",
            "Cá trứng chiên": "ca-trung-chien.jpg",
            "Xúc xích chiên": "xuc-xich-chien.jpg",
            "Khoai tây chiên": "khoai-tay-chien.webp"
        },
        "hai-san-mot-nang": {
            "Khô cá chỉ vàng": "kho-ca-chi-vang.jpg",
            "Khô cá đuối": "kho-ca-duoi.jpg",
            "Khô mực": "kho-muc.jpg",
            "Khô cá đục": "kho-ca-duc.jpg",
            "Khô đù 1 nắng (nướng/chiên)": "kho-du-1-nang.jpg",
            "Khô cá thu 1 nắng chiên": "kho-ca-thu-1-nang.jpg",
        },
        "sup": {
            "Súp hải sản": "",
            "Súp cua": "sup-cua.jpg",
            "Súp bào ngư": ""
        },
        "oc-mong-tay": {
            "Ốc móng tay hấp": "oc-mong-tay-hap.jpg",
            "Ốc móng tay xào mỡ hành": "oc-mong-tay-xao-mo-hanh.jpg",
            "Ốc móng tay xào tỏi": "",
            "Ốc móng tay xào sa tế": "oc-mong-tay-xao-sa-te.webp",
            "Ốc móng tay xào rau muống": "oc-mong-tay-xao-rau-muong.jpg",
            "Ốc móng tay xào lá quế": "oc-mong-tay-xa-la-que.jpg",
            "Ốc móng tay xào me": "oc-mong-tay-xao-me.jpg"
        },
        "hau-sua": {
            "Hàu sữa nướng mỡ hành": "hau-nuong-mo-hanh.jpg",
            "Hàu sữa nướng phô mai": "hau-nuong-pho-mai.jpg"
        },
        "ca-song": {
            "Cá sòng nướng mỡ hành": "ca-song-nuong-mo-hanh.jpg",
            "Cá sòng nướng muối ớt": "ca-song-nuong-muoi-ot.jpg",
            "Cá sòng nướng mọi": "ca-song-nuong-moi.jpg"
        },
        "ca-cam": {
            "Cá cam nướng mỡ hành": "",
            "Cá cam nướng muối ớt": "ca-cam-nuong-muoi-ot.jpg"
        },
        "ca-mu": {
            "Cá mú ăn sống + mù tạt": "ca-mu-song.jpg",
            "Cá mú hấp Hong Kong": {
                "src": "assets/ca-mu-hong-kong.jpg"
            },
            "Cá mú nướng muối ớt": "ca-mu-nuong-muoi-ot.webp",
            "Lẩu cá mú măng chua": {
                "src": "assets/hotpot.jpg",
                "altVi": "Nồi lẩu cá với rau và ớt",
                "altEn": "Fish hot pot with vegetables and chili"
            }
        },
        "muc-trung": {
            "Mực trứng hấp sả": "muc-trung-hap-sa.jpg",
            "Mực trứng chiên nước mắm": "muc-trung-chien-nuoc-mam.jpg"
        },
        "rang-muc": {
            "Răng mực xào bơ tỏi": "rang-muc-xao-bo-toi.jpg",
            "Răng mực chiên nước mắm": "rang-muc-chien-nuoc-mam.jpg"
        },
        "muc-sua": {
            "Mực sữa chiên nước mắm": "muc-sua-chien-mam.jpg",
            "Mực sữa hấp gừng": "muc-sua-hap-gung.jpg",
            "Mực sữa chiên bột": "muc-sua-chien-bot.jpg"
        },
        "bia": {
            "Tiger nâu": "tiger-nau.png",
            "Tiger bạc": { "file": "tiger-bac.jpg", "altVi": "Lon bia Tiger Crystal", "altEn": "Can of Tiger Crystal beer" },
            "Tiger bạc (nhỏ)": { "file": "tiger-bac.jpg", "altVi": "Lon bia Tiger Crystal", "altEn": "Can of Tiger Crystal beer" },
            "Heineken bạc": { "file": "Heineken-bac-nho.jpg", "altVi": "Lon bia Heineken Silver", "altEn": "Can of Heineken Silver beer" },
            "Heineken bạc (nhỏ)": { "file": "Heineken-bac-nho.jpg", "altVi": "Lon bia Heineken Silver", "altEn": "Can of Heineken Silver beer" },
            "Sài Gòn Special": "sai-gon-special.jpg",
            "Sài Gòn Lager": "saigon-lager.jpg"
        },
        "nuoc-ngot": {
            "Coca Cola": "cocacola.webp",
            "Pepsi": "pepsi.webp",
            "7 Up": "7up.webp",
            "Sting dâu": "sting.jpg",
            "Mirinda cam/xá xị": { "file": "mirinda.jpg", "altVi": "Hai lon Mirinda vị cam và xá xị", "altEn": "Cans of Mirinda orange and sarsi soft drinks" },
            "Nước suối": "nuoc-suoi.jpg"
        },
        "ruou": {
            "Soju": "soju.webp",
            "Vodka Men nhỏ": { "file": "vodka-men-nho.jpg", "altVi": "Chai rượu Vodka Men", "altEn": "Bottle of Vodka Men" },
            "Vodka Men lớn": { "file": "vodka-men-nho.jpg", "altVi": "Chai rượu Vodka Men", "altEn": "Bottle of Vodka Men" },
            "Rượu nếp mới": "ruou-nep-moi.jpg",
        },
        "nhum": {
            "Nhum nướng mỡ hành": "nhum-nuong-mo-hanh.jpg",
            "Nhum nướng trứng": "nhum-nuong-trung.jpg"
        },
        "so-diep": {
            "Sò điệp nướng mỡ hành": {
                "src": "assets/scallops.jpg"
            },
            "Sò điệp phô mai": "so-diep-pho-mai.jpg",
            "Sò điệp nướng trứng": "so-diep-nuong-trung.webp",
        },
        "so-huyet": {
            "Sò huyết rang me": "so-huyet-rang-me.jpg",
            "Sò huyết cháy tỏi": "so-huyet-chay-toi.jpg",
            "Sò huyết lascot": "so_huyet_lacoste.jpg",
            "Sò huyết nướng mọi": ""
        },
        "so-lua": {
            "Sò lụa hấp sả": "so-lua-hap-xa.jpg",
            "Sò lụa hấp Thái": "so-lua-hap-thai.jpg",
            "Sò lụa xào bơ tỏi": "so-lua-xao-bo-toi.jpg",
            "Sò lụa xào mỡ hành": "so-lua-xao-mo-hanh.png",
            "Sò lụa xào lá quế": "so_lua_xao_la_que.webp",
            "Sò lụa xào me": "so-lua-xao-me.jpg"
        },
        "so-duong": {
            "Sò dương nướng mỡ hành": "so-duong-nuong-mo-hanh.jpg",
            "Sò dương nướng phô mai": "so-duong-nuong-pho-mai.jpg",
            "Sò dương sốt hoàng kim": "",
            "Sò dương nướng muối ớt": "so-duong-nuong-muoi-ot.jpg",
            "Sò dương nướng tiêu": "so-duong-nuong-tieu.jpg"
        },
        "oc-len": {
            "Ốc len xào dừa": "oc-len-xao-dua.jpg",
        },
        "so-long": {
            "Sò lông nướng mỡ hành": "so-long-nuong-mo-hanh.jpg",
            "Sò lông nướng muối ớt": "so-long-nuong-muoi-ot.png"
        },
        "oc-toi": {
            "Ốc tỏi nướng mỡ hành": {
                "src": "assets/oc_nuong.jpg"
            },
            "Ốc tỏi nướng phô mai": "oc-toi-nuong-pho-mai.jpg",
            "Ốc tỏi sốt hoàng kim": "",
            "Ốc tỏi nướng muối ớt": "oc-toi-nuong-muoi-ot.webp",
            "Ốc tỏi nướng tiêu": "oc-toi-nuong-tieu.jpg"
        },
        "tom-su": {
            "Tôm sú hấp sả": "tom-su-hap-sa.jpg",
            "Tôm sú cháy tỏi": "tom-su-chay-toi.jpg",
            "Tôm sú rang me": "tom-su-rang-me.jpg",
            "Tôm sú nướng muối ớt": { "file": "tom-su-nuong.webp", "altVi": "Tôm sú nướng", "altEn": "Grilled black tiger prawns" },
            "Tôm sú nướng mọi": { "file": "tom-su-nuong.webp", "altVi": "Tôm sú nướng", "altEn": "Grilled black tiger prawns" },
            "Tôm sú phần": ""
        },
        "mon-ga": {
            "Cánh gà chiên nước mắm": "",
            "Cánh gà xào sả ớt": "canh-ga-xa-sa-ot.jpg",
            "Sụn gà chiên nước mắm": "sun-ga-chien-nuoc-mam.jpg",
            "Sụn gà xào sả ớt": "sun-ga-xao-sa-ot.jpg"
        },
        "bao-ngu": {
            "Bào ngư nướng mỡ hành": "bao-ngu-nuong-mo-hanh.png",
            "Bào ngư nướng muối ớt": "bao-ngu-nuong-muoi-ot.png",
            "Bào ngư súp": "bao-ngu-sup.jpg",
            "Bào ngư xào dầu hào": "bao-ngu-xao-dau-hao.png"
        },
        "oc-huong": {
            "Ốc hương hấp": "oc-huong-hap.jpg",
            "Ốc hương nướng mọi": "",
            "Ốc hương cháy tỏi": "oc-huong-chay-toi.jpg",
            "Ốc hương rang me": "oc-huong-rang-me.jpg",
            "Ốc hương rang muối": "oc-huong-rang-muoi.jpg",
            "Ốc hương sốt hoàng kim": "oc-huong-sot-hoang-kim.jpg",
            "Ốc hương xào bơ cay": "oc-huong-xao-bo-cay.webp"
        },
        "oc-ca-na": {
            "Ốc cà na hấp": "oc-ca-na-hap.jpg",
            "Ốc cà na cháy tỏi": "oc-ca-na-chay-toi.jpg",
            "Ốc cà na rang me": "oc-ca-na-rang-me.jpg",
            "Ốc cà na rang muối": "oc-ca-na-rang-muoi.jpg",
            "Ốc cà na sốt hoàng kim": "oc-ca-na-sot-hoang-kim.png",
            "Ốc cà na xào bơ cay": "oc-ca-na-xao-bo-cay.jpg"
        },
        "chao": {
            "Cháo hàu": "",
            "Cháo tôm": "chao-tom.jpg",
            "Cháo hải sản": "chao-hai-san.jpg"
        },
        "com-chien": {
            "Cơm chiên cá mặn": "com-chien-ca-man.jpg",
            "Cơm chiên hải sản": "",
            "Cơm chiên tỏi": { "file": "com-chien-ca-man.jpg", "altVi": "Cơm chiên cá mặn trong thố", "altEn": "Fried rice with salted fish in a clay pot" },
            "Cơm chiên dương châu": "com-chien-duong-chau.jpg",
            "Cơm chiên thịt cua": "com-chien-thit-cua.webp"
        },
        "rau-cu": {
            "Canh cải nghêu": "canh-cai-ngheu.jpg",
            "Rau luộc thập cẩm": "",
            "Bầu luộc": "bau-luoc.jpg",
            "Đậu bắp (luộc/nướng)": "dau-bap-nuong.jpg",
            "Cải thìa xào tỏi": "cai-thia-xao-toi.webp",
            "Cà tím (nướng/xào)": "ca-tim-nuong.jpg",
            "Khổ qua chà bông": "kho-qua-cha-bong.webp",
            "Khổ qua xào trứng": "kho-qua-xao-trung.jpg",
            "Rau muống (luộc/xào tỏi)": "rau-muong-xao-toi.jpg",
            "Canh bầu nấu tôm": "canh-bau-nau-tom.jpg",
        },
        "goi": {
            "Gỏi hải sản": "goi-hai-san.jpg",
            "Gỏi xoài ốc giác": "",
            "Gỏi khô mực": "goi-kho-muc.jpg",
        },
        "dau-hu": {
            "Đậu hủ tẩm hành": "",
            "Đậu hủ lướt ván": { "file": "dau-hu-luot-van.jpg", "altVi": "Đậu hủ chiên vàng ăn kèm nước chấm", "altEn": "Golden fried tofu with dipping sauces" },
            "Đậu hủ chiên sả": "dau-hu-chien-sa.jpg",
            "Đậu hủ chiên giòn": { "file": "dau-hu-luot-van.jpg", "altVi": "Đậu hủ chiên vàng ăn kèm nước chấm", "altEn": "Golden fried tofu with dipping sauces" },
            "Đậu hủ tẩm hành chà bông": "dau-hu-tam-hanh-cha-bong.jpg"
        },
        "mon-bo": {
            "Bò lúc lắc khoai tây": "",
            "Bò xào hành cần": "bo-xao-hanh-can.jpg",
            "Bò xào bông cải": "bo-xao-bong-cai.jpg",
        },
        "ghe": {
            "Ghẹ hấp sả": "ghe-hap-xa.jpg",
            "Ghẹ cháy tỏi": "ghe-chay-toi.jpg",
            "Ghẹ rang me": "ghe-rang-me.jpg",
            "Ghẹ rang muối": { "file": "cua-rang-muoi.jpg", "altVi": "Cua rang muối trên đĩa", "altEn": "Salted crab on a plate" },
            "Ghẹ nấu lẩu": ""
        },
        "muc-ong": {
            "Mực ống nướng sa tế": "muc-ong-nuong-sa-te.jpg",
            "Mực ống xào chua ngọt": "muc-ong-xao-chua-ngot.jpg",
            "Mực ống xào hành cần": "muc-ong-xao-hanh-can.jpg",
            "Mực ống xào bông cải": "muc-ong-xao-bong-cai.jpg",
            "Mực ống chiên bột": "muc-ong-chien-bot.jpg",
            "Mực ống hấp": "muc-ông-hap.jpeg"
        },
        "bach-tuoc": {
            "Bạch tuộc nướng sa tế": {
                "src": "assets/bach-tuoc-muoi-ot.jpg",
                "altVi": "Bạch tuộc tẩm gia vị trên đĩa",
                "altEn": "Seasoned octopus on a plate"
            },
            "Bạch tuộc nướng muối ớt": {
                "src": "assets/bach-tuoc-muoi-ot.jpg"
            },
            "Bạch tuộc hấp": "bach-tuoc-hap.webp"
        },
        "tom-tit": {
            "Tôm tít hấp sả": "tom-tit-hap-xa.jpg",
            "Tôm tít cháy tỏi": "tom-tit-chay-toi.jpg",
            "Tôm tít rang muối ớt": "tom-tit-rang-muoi.jpg",
            "Tôm tít rang me": "tom-tit-rang-me.jpg",
            "Tôm tít phần": "tom-tit-phan.jpg"
        },
        "tom-mu-ni": {
            "Tôm mũ ni hấp sả": "tom-mu-ni-hap-xa.jpg",
            "Tôm mũ ni cháy tỏi": "tom-mu-ni-chay-toi.jpg",
            "Tôm mũ ni nướng mỡ hành": "tom-mu-ni-nuong-mo-hanh.jpg",
            "Tôm mũ ni nướng phô mai": "tom-mu-ni-nuong-pho-mai.jpg",
        },
        "tom-hum": {
            "Tôm hùm hấp sả": "tom-hum-hap-sa.jpg",
            "Tôm hùm cháy tỏi": "tom-hum-chay-toi.jpg",
            "Tôm hùm nướng mỡ hành": "tom-hum-nuong-mo-hanh.jpg",
            "Tôm hùm nướng phô mai": {
                "src": "assets/hero_cover.jpg",
                "position": "50% 70%"
            }
        }
    }
};
