/*
 * Cấu hình ảnh cho menu-dish-photo; ảnh card nhóm nằm trong menu-images.js.
 * basePath là đường dẫn từ gốc website, không tính từ trang /menu/.
 * Dùng đúng tên món tiếng Việt bên dưới; đổi thứ tự món hoặc ngôn ngữ không đổi ảnh.
 * '' giữ ảnh minh họa của nhóm món cho đến khi có ảnh riêng.
 * Chuỗi: 'hau-nuong-pho-mai.webp' lấy từ assets/dishes-img/.
 * Cắt ảnh: { file: 'hau-nuong-pho-mai.webp', position: '50% 35%' }.
 * Ảnh ngoài thư mục: { src: 'assets/hau-sua-dai-duong.jpg' }.
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
            "Nghêu hấp Thái": "ngheu-hap-thai.png",
            "Nghêu xào mỡ hành": "ngheu-xao-mo-hanh.jpg",
            "Nghêu xào lá quế": ""
        },
        "lau": {
            "Lẩu hải sản": "lau-hai-san.jpg",
            "Lẩu cá đuối": {
                "src": "assets/hotpot.jpg"
            },
            "Lẩu cá bớp": "",
            "Lẩu cá chim": "",
            "Lẩu cá mú": "",
            "Lẩu Thái": ""
        },
        "hau": {
            "Hàu nướng mỡ hành": "",
            "Hàu nướng mọi": "",
            "Hàu nướng phô mai": "",
            "Hàu ăn sống + mù tạt": ""
        },
        "ngheu-2-coi": {
            "Nghêu 2 còi hấp sả": "",
            "Nghêu 2 còi hấp Thái": ""
        },
        "ca-chim": {
            "Cá chim nướng mỡ hành": "",
            "Cá chim nướng muối ớt": "ca-chim-nuong-muoi-ot.jpg",
            "Cá chim chiên giòn": "",
            "Cá chim hấp Hong Kong": "",
            "Cá chim sốt cà chua": ""
        },
        "ca-saba": {
            "Cá saba nướng mỡ hành": "",
            "Cá saba nướng muối ớt": "",
            "Cá saba chiên giòn": ""
        },
        "ca-duoi": {
            "Cá đuối hấp mỡ hành": "",
            "Cá đuối nướng muối ớt": "",
            "Lẩu cá đuối măng chua": {
                "src": "assets/hotpot.jpg"
            }
        },
        "mi-mien": {
            "Mì xào bò": "",
            "Mì xào hải sản": "",
            "Mì xào rau": "",
            "Miến xào cua": "",
            "Miến xào hải sản": ""
        },
        "khai-vi": {
            "Nấm biển (Đặc sản Cây Si)": "",
            "Chả giò chiên": "",
            "Cá trứng chiên": "",
            "Xúc xích chiên": "",
            "Khoai tây chiên": ""
        },
        "hai-san-mot-nang": {
            "Khô cá chỉ vàng": "",
            "Khô cá đuối": "",
            "Khô mực": "",
            "Khô cá đục": "",
            "Khô đù 1 nắng (nướng/chiên)": "",
            "Khô cá thu 1 nắng chiên": ""
        },
        "sup": {
            "Súp hải sản": "",
            "Súp cua": "sup-cua.jpg",
            "Súp bào ngư": ""
        },
        "oc-mong-tay": {
            "Ốc móng tay hấp": "",
            "Ốc móng tay xào mỡ hành": "",
            "Ốc móng tay xào tỏi": "",
            "Ốc móng tay xào sa tế": "",
            "Ốc móng tay xào rau muống": "",
            "Ốc móng tay xào lá quế": "",
            "Ốc móng tay xào me": ""
        },
        "hau-sua": {
            "Hàu sữa nướng mỡ hành": "",
            "Hàu sữa nướng phô mai": ""
        },
        "ca-song": {
            "Cá sòng nướng mỡ hành": "",
            "Cá sòng nướng muối ớt": "",
            "Cá sòng nướng mọi": ""
        },
        "ca-cam": {
            "Cá cam nướng mỡ hành": "",
            "Cá cam nướng muối ớt": ""
        },
        "ca-mu": {
            "Cá mú ăn sống + mù tạt": "",
            "Cá mú hấp Hong Kong": {
                "src": "assets/ca-mu-hong-kong.jpg"
            },
            "Cá mú nướng muối ớt": "",
            "Lẩu cá mú măng chua": ""
        },
        "muc-trung": {
            "Mực trứng hấp sả": "",
            "Mực trứng chiên nước mắm": ""
        },
        "rang-muc": {
            "Răng mực xào bơ tỏi": "",
            "Răng mực chiên nước mắm": ""
        },
        "muc-sua": {
            "Mực sữa chiên nước mắm": "",
            "Mực sữa hấp gừng": "",
            "Mực sữa chiên bột": ""
        },
        "bia": {
            "Tiger nâu": "",
            "Tiger bạc": "",
            "Tiger bạc (nhỏ)": "",
            "Heineken bạc": "",
            "Heineken bạc (nhỏ)": "",
            "Sài Gòn Special": "",
            "Sài Gòn Lager": ""
        },
        "nuoc-ngot": {
            "Coca Cola": "",
            "Pepsi": "",
            "7 Up": "",
            "Sting dâu": "",
            "Mirinda cam/xá xị": "",
            "Nước suối": ""
        },
        "ruou": {
            "Soju": "",
            "Vodka Men nhỏ": "",
            "Vodka Men lớn": "",
            "Rượu nếp mới": ""
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
            "Sò huyết rang me": "",
            "Sò huyết cháy tỏi": "",
            "Sò huyết lascot": "",
            "Sò huyết nướng mọi": ""
        },
        "so-lua": {
            "Sò lụa hấp sả": "",
            "Sò lụa hấp Thái": "",
            "Sò lụa xào bơ tỏi": "",
            "Sò lụa xào mỡ hành": "",
            "Sò lụa xào lá quế": "",
            "Sò lụa xào me": ""
        },
        "so-duong": {
            "Sò dương nướng mỡ hành": "",
            "Sò dương nướng phô mai": "",
            "Sò dương sốt hoàng kim": "",
            "Sò dương nướng muối ớt": "",
            "Sò dương nướng tiêu": ""
        },
        "oc-len": {
            "Ốc len xào dừa": ""
        },
        "so-long": {
            "Sò lông nướng mỡ hành": {
                "src": "assets/about-cuisine-2.jpg",
                "position": "75% 50%"
            },
            "Sò lông nướng muối ớt": ""
        },
        "oc-toi": {
            "Ốc tỏi nướng mỡ hành": "",
            "Ốc tỏi nướng phô mai": "",
            "Ốc tỏi sốt hoàng kim": "",
            "Ốc tỏi nướng muối ớt": "",
            "Ốc tỏi nướng tiêu": ""
        },
        "tom-su": {
            "Tôm sú hấp sả": "",
            "Tôm sú cháy tỏi": "",
            "Tôm sú rang me": "",
            "Tôm sú nướng muối ớt": "",
            "Tôm sú nướng mọi": "",
            "Tôm sú phần": ""
        },
        "mon-ga": {
            "Cánh gà chiên nước mắm": "",
            "Cánh gà xào sả ớt": "",
            "Sụn gà chiên nước mắm": "",
            "Sụn gà xào sả ớt": ""
        },
        "bao-ngu": {
            "Bào ngư nướng mỡ hành": "",
            "Bào ngư nướng muối ớt": "",
            "Bào ngư súp": "",
            "Bào ngư xào dầu hào": ""
        },
        "oc-huong": {
            "Ốc hương hấp": "",
            "Ốc hương nướng mọi": "",
            "Ốc hương cháy tỏi": "",
            "Ốc hương rang me": "",
            "Ốc hương rang muối": "",
            "Ốc hương sốt hoàng kim": "",
            "Ốc hương xào bơ cay": ""
        },
        "oc-ca-na": {
            "Ốc cà na hấp": "",
            "Ốc cà na cháy tỏi": "",
            "Ốc cà na rang me": "",
            "Ốc cà na rang muối": "",
            "Ốc cà na sốt hoàng kim": "",
            "Ốc cà na xào bơ cay": ""
        },
        "chao": {
            "Cháo hào": "",
            "Cháo tôm": "",
            "Cháo hải sản": ""
        },
        "com-chien": {
            "Cơm chiên cá mặn": "",
            "Cơm chiên hải sản": "",
            "Cơm chiên tỏi": "",
            "Cơm chiên dương châu": "",
            "Cơm chiên thịt cua": ""
        },
        "rau-cu": {
            "Canh cải nghêu": "",
            "Rau luộc thập cẩm": "",
            "Bầu luộc": "",
            "Đậu bắp (luộc/nướng)": "",
            "Cải thìa xào tỏi": "",
            "Cà tím (nướng/xào)": "",
            "Khổ qua chà bông": "",
            "Khổ qua xào trứng": "",
            "Rau muống (luộc/xào tỏi)": "",
            "Canh bầu nấu tôm": ""
        },
        "goi": {
            "Gỏi hải sản": "",
            "Gỏi xoài ốc giác": "",
            "Gỏi khô mực": ""
        },
        "dau-hu": {
            "Đậu hủ tẩm hành": "",
            "Đậu hủ lướt ván": "",
            "Đậu hủ chiên sả": "",
            "Đậu hủ chiên giòn": "",
            "Đậu hủ tẩm hành chà bông": ""
        },
        "mon-bo": {
            "Bò lúc lắc khoai tây": "",
            "Bò xào hành cần": "",
            "Bò xào bông cải": ""
        },
        "ghe": {
            "Ghẹ hấp sả": {
                "src": "assets/about-cuisine-1.jpg"
            },
            "Ghẹ cháy tỏi": "",
            "Ghẹ rang me": "",
            "Ghẹ rang muối": "",
            "Ghẹ nấu lẩu": ""
        },
        "muc-ong": {
            "Mực ống nướng sa tế": "",
            "Mực ống xào chua ngọt": "",
            "Mực ống xào hành cần": "",
            "Mực ống xào bông cải": "",
            "Mực ống chiên bột": "",
            "Mực ống hấp": ""
        },
        "bach-tuoc": {
            "Bạch tuộc nướng sa tế": {
                "src": "assets/bach-tuoc-muoi-ot.jpg"
            },
            "Bạch tuộc nướng muối ớt": {
                "src": "assets/bach-tuoc-muoi-ot.jpg"
            },
            "Bạch tuộc hấp": "bach-tuoc-hap.webp"
        },
        "tom-tit": {
            "Tôm tít hấp sả": "",
            "Tôm tít cháy tỏi": "tom-tit-chay-toi.jpg",
            "Tôm tít rang muối ớt": "tom-tit-rang-muoi.jpg",
            "Tôm tít rang me": "",
            "Tôm tít phần": ""
        },
        "tom-mu-ni": {
            "Tôm mũ ni hấp sả": "",
            "Tôm mũ ni cháy tỏi": "",
            "Tôm mũ ni nướng mỡ hành": "",
            "Tôm mũ ni nướng phô mai": ""
        },
        "tom-hum": {
            "Tôm hùm hấp sả": "",
            "Tôm hùm cháy tỏi": "",
            "Tôm hùm nướng mỡ hành": "",
            "Tôm hùm nướng phô mai": {
                "src": "assets/hero_cover.jpg",
                "position": "50% 70%"
            }
        }
    }
};
