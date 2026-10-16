/* Menu pages 1–18 supplied by Cây Si. All prices in VND; market prices remain unspecified. */
const money=(value,unitVi,unitEn)=>({value,unitVi,unitEn});
const range=(min,max,unitVi,unitEn)=>({min,max,unitVi,unitEn});
const dish=(vi,en,price=null)=>({vi,en,...(price?{price}:{})});
const section=(id,category,vi,en,price,items)=>({id,category,vi,en,price,items});
window.CAYSI_MENU=[
section('cua','premium','Món cua','Crab',{market:true},[
 dish('Cua hấp sả','Steamed crab with lemongrass'),dish('Cua cháy tỏi','Garlic butter crab'),dish('Cua rang me','Tamarind-glazed crab'),dish('Cua rang muối','Salted crab'),dish('Cua nấu lẩu','Crab hot pot',{extra:true,value:50000})]),
section('ngheu','shellfish','Nghêu','Clams',money(109000,'tô','bowl'),[
 dish('Nghêu hấp sả','Steamed clams with lemongrass'),dish('Nghêu hấp Thái','Thai-style steamed clams'),dish('Nghêu xào mỡ hành','Clams stir-fried with scallion oil'),dish('Nghêu xào lá quế','Clams stir-fried with basil')]),
section('lau','hotpot','Lẩu','Hot pot',null,[
 dish('Lẩu hải sản','Seafood hot pot',money(299000,'lẩu','pot')),dish('Lẩu cá đuối','Stingray hot pot',money(299000,'lẩu','pot')),dish('Lẩu cá bớp','Cobia hot pot',money(299000,'lẩu','pot')),dish('Lẩu cá chim','Pomfret hot pot',money(350000,'lẩu','pot')),dish('Lẩu cá mú','Grouper hot pot',money(300000,'lẩu','pot')),dish('Lẩu Thái','Thai-style hot pot',money(350000,'lẩu','pot'))]),
section('hau','oysters','Hàu','Oysters',money(39000,'con','piece'),[
 dish('Hàu nướng mỡ hành','Grilled oysters with scallion oil'),dish('Hàu nướng mọi','Plain grilled oysters'),dish('Hàu nướng phô mai','Grilled oysters with cheese'),dish('Hàu ăn sống + mù tạt','Fresh oysters with mustard')]),
section('ngheu-2-coi','shellfish','Nghêu 2 còi','Large clams',money(155000,'tô','bowl'),[
 dish('Nghêu 2 còi hấp sả','Large clams steamed with lemongrass'),dish('Nghêu 2 còi hấp Thái','Thai-style steamed large clams')]),
section('ca-chim','fish','Cá chim','Pomfret',money(279000,'đĩa','plate'),[
 dish('Cá chim nướng mỡ hành','Grilled pomfret with scallion oil'),dish('Cá chim nướng muối ớt','Chili-salt grilled pomfret'),dish('Cá chim chiên giòn','Crispy fried pomfret'),dish('Cá chim hấp Hong Kong','Hong Kong-style steamed pomfret'),dish('Cá chim sốt cà chua','Pomfret in tomato sauce')]),
section('ca-saba','fish','Cá saba','Saba fish',money(149000,'con','fish'),[
 dish('Cá saba nướng mỡ hành','Grilled saba with scallion oil'),dish('Cá saba nướng muối ớt','Chili-salt grilled saba'),dish('Cá saba chiên giòn','Crispy fried saba')]),
section('ca-duoi','fish','Cá đuối','Stingray',money(250000,'phần','serving'),[
 dish('Cá đuối hấp mỡ hành','Steamed stingray with scallion oil'),dish('Cá đuối nướng muối ớt','Chili-salt grilled stingray'),dish('Lẩu cá đuối măng chua','Stingray hot pot with sour bamboo shoots',money(299000,'phần','serving'))]),
section('hai-san-mot-nang','dried','Hải sản một nắng','Lightly sun-dried seafood',null,[
 dish('Khô cá chỉ vàng','Sun-dried golden threadfin fish',money(79000,'đĩa','plate')),dish('Khô cá đuối','Sun-dried stingray',money(135000,'đĩa','plate')),dish('Khô mực','Sun-dried squid',money(149000,'con','piece')),dish('Khô cá đục','Sun-dried sand whiting',money(120000,'đĩa','plate')),dish('Khô đù 1 nắng (nướng/chiên)','Sun-dried croaker (grilled/fried)',money(99000,'đĩa','plate')),dish('Khô cá thu 1 nắng chiên','Fried sun-dried mackerel',money(120000,'đĩa','plate'))]),
section('sup','starters','Món súp','Soups',null,[
 dish('Súp hải sản','Seafood soup',money(79000,'tô','bowl')),dish('Súp cua','Crab soup',money(79000,'tô','bowl')),dish('Súp bào ngư','Abalone soup',money(129000,'tô','bowl'))]),
section('oc-mong-tay','shellfish','Ốc móng tay','Razor clams',money(109000,'đĩa','plate'),[
 dish('Ốc móng tay hấp','Steamed razor clams'),dish('Ốc móng tay xào mỡ hành','Razor clams stir-fried with scallion oil'),dish('Ốc móng tay xào tỏi','Garlic stir-fried razor clams'),dish('Ốc móng tay xào sa tế','Spicy satay razor clams'),dish('Ốc móng tay xào rau muống','Razor clams stir-fried with morning glory'),dish('Ốc móng tay xào lá quế','Razor clams stir-fried with basil'),dish('Ốc móng tay xào me','Razor clams in tamarind sauce')]),
section('hau-sua','oysters','Hàu sữa','Milk oysters',money(99000,'đĩa','plate'),[
 dish('Hàu sữa nướng mỡ hành','Grilled milk oysters with scallion oil'),dish('Hàu sữa nướng phô mai','Grilled milk oysters with cheese')]),
section('ca-song','fish','Cá sòng','Mackerel scad',money(100000,'con','fish'),[
 dish('Cá sòng nướng mỡ hành','Grilled mackerel scad with scallion oil'),dish('Cá sòng nướng muối ớt','Chili-salt grilled mackerel scad'),dish('Cá sòng nướng mọi','Plain grilled mackerel scad')]),
section('ca-cam','fish','Cá cam','Amberjack',money(199000,'con','fish'),[
 dish('Cá cam nướng mỡ hành','Grilled amberjack with scallion oil'),dish('Cá cam nướng muối ớt','Chili-salt grilled amberjack')]),
section('ca-mu','fish','Cá mú','Grouper',range(600000,650000,'kg','kg'),[
 dish('Cá mú ăn sống + mù tạt','Fresh grouper with wasabi & mustard'),dish('Cá mú hấp Hong Kong','Hong Kong-style steamed grouper'),dish('Cá mú nướng muối ớt','Chili-salt grilled grouper'),dish('Lẩu cá mú măng chua','Grouper hot pot with sour bamboo shoots')]),
section('muc-trung','squid','Mực trứng','Roe squid',money(189000,'đĩa','plate'),[
 dish('Mực trứng hấp sả','Steamed roe squid with lemongrass'),dish('Mực trứng chiên nước mắm','Roe squid fried in fish sauce')]),
section('rang-muc','squid','Răng mực','Squid beaks',money(189000,'đĩa','plate'),[
 dish('Răng mực xào bơ tỏi','Squid beaks stir-fried with garlic butter'),dish('Răng mực chiên nước mắm','Squid beaks fried in fish sauce')]),
section('muc-sua','squid','Mực sữa','Baby squid',money(169000,'đĩa','plate'),[
 dish('Mực sữa chiên nước mắm','Baby squid fried in fish sauce'),dish('Mực sữa hấp gừng','Steamed baby squid with ginger'),dish('Mực sữa chiên bột','Battered fried baby squid')]),
section('nhum','shellfish','Nhum','Sea urchin',range(49000,69000,'con','piece'),[
 dish('Nhum nướng mỡ hành','Grilled sea urchin with scallion oil'),dish('Nhum nướng trứng','Grilled sea urchin with egg')]),
section('so-diep','shellfish','Sò điệp','Scallops',money(109000,'đĩa','plate'),[
 dish('Sò điệp nướng mỡ hành','Grilled scallops with scallion oil'),dish('Sò điệp phô mai','Scallops with cheese'),dish('Sò điệp nướng trứng','Grilled scallops with egg')]),
section('so-huyet','shellfish','Sò huyết','Blood cockles',money(129000,'đĩa','plate'),[
 dish('Sò huyết rang me','Blood cockles with tamarind sauce'),dish('Sò huyết cháy tỏi','Garlic-fried blood cockles'),dish('Sò huyết lascot','Blood cockles with Lascot sauce'),dish('Sò huyết nướng mọi','Plain grilled blood cockles')]),
section('so-lua','shellfish','Sò lụa','White clams',money(99000,'đĩa','plate'),[
 dish('Sò lụa hấp sả','White clams steamed with lemongrass'),dish('Sò lụa hấp Thái','Thai-style steamed white clams'),dish('Sò lụa xào bơ tỏi','White clams stir-fried with garlic butter'),dish('Sò lụa xào mỡ hành','White clams stir-fried with scallion oil'),dish('Sò lụa xào lá quế','White clams stir-fried with basil'),dish('Sò lụa xào me','White clams with tamarind sauce')]),
section('so-duong','shellfish','Sò dương','Ark clams',money(79000,'con','piece'),[
 dish('Sò dương nướng mỡ hành','Grilled ark clams with scallion oil'),dish('Sò dương nướng phô mai','Grilled ark clams with cheese'),dish('Sò dương sốt hoàng kim','Ark clams with golden sauce'),dish('Sò dương nướng muối ớt','Chili-salt grilled ark clams'),dish('Sò dương nướng tiêu','Pepper-grilled ark clams')]),
// --- Menu pages 11–18: supplied 2026-10-11 ---
section('oc-len','shellfish','Ốc len','Mud creeper snails',money(139000,'đĩa','plate'),[
 dish('Ốc len xào dừa','Mud creeper snails in coconut sauce')]),
section('so-long','shellfish','Sò lông','Hairy clams',money(99000,'đĩa','plate'),[
 dish('Sò lông nướng mỡ hành','Grilled hairy clams with scallion oil'),dish('Sò lông nướng muối ớt','Grilled hairy clams with chili salt')]),
section('oc-toi','shellfish','Ốc tỏi','Babylon snails',range(59000,79000,'con','piece'),[
 dish('Ốc tỏi nướng mỡ hành','Grilled Babylon snails with scallion oil'),dish('Ốc tỏi nướng phô mai','Grilled Babylon snails with cheese'),dish('Ốc tỏi sốt hoàng kim','Babylon snails with golden sauce'),dish('Ốc tỏi nướng muối ớt','Grilled Babylon snails with chili salt'),dish('Ốc tỏi nướng tiêu','Grilled Babylon snails with pepper')]),
section('tom-su','prawns','Tôm sú','Black tiger prawns',money(649000,'kg','kg'),[
 dish('Tôm sú hấp sả','Steamed black tiger prawns with lemongrass'),dish('Tôm sú cháy tỏi','Garlic butter black tiger prawns'),dish('Tôm sú rang me','Tamarind-glazed black tiger prawns'),dish('Tôm sú nướng muối ớt','Grilled black tiger prawns with chili salt'),dish('Tôm sú nướng mọi','Charcoal-grilled black tiger prawns'),dish('Tôm sú phần','Black tiger prawns (portion)',money(219000,'đĩa','plate'))]),
section('bao-ngu','premium','Bào ngư','Abalone',null,[
 dish('Bào ngư nướng mỡ hành','Grilled abalone with scallion oil',money(49000,'con','piece')),dish('Bào ngư nướng muối ớt','Grilled abalone with chili salt',money(49000,'con','piece')),dish('Bào ngư súp','Abalone soup',money(129000,'tô','bowl')),dish('Bào ngư xào dầu hào','Stir-fried abalone with oyster sauce',money(189000,'phần','serving'))]),
section('oc-huong','shellfish','Ốc hương','Sweet snails',money(169000,'đĩa','plate'),[
 dish('Ốc hương hấp','Steamed sweet snails'),dish('Ốc hương nướng mọi','Plain grilled sweet snails'),dish('Ốc hương cháy tỏi','Garlic-fried sweet snails'),dish('Ốc hương rang me','Sweet snails with tamarind sauce'),dish('Ốc hương rang muối','Salted sweet snails'),dish('Ốc hương sốt hoàng kim','Sweet snails with golden sauce'),dish('Ốc hương xào bơ cay','Spicy butter sweet snails')]),
section('oc-ca-na','shellfish','Ốc cà na','Spiral snails',money(139000,'đĩa','plate'),[
 dish('Ốc cà na hấp','Steamed spiral snails'),dish('Ốc cà na cháy tỏi','Garlic-fried spiral snails'),dish('Ốc cà na rang me','Spiral snails with tamarind sauce'),dish('Ốc cà na rang muối','Salted spiral snails'),dish('Ốc cà na sốt hoàng kim','Spiral snails with golden sauce'),dish('Ốc cà na xào bơ cay','Spicy butter spiral snails')]),
section('ghe','premium','Món ghẹ','Blue swimmer crab',{market:true},[
 dish('Ghẹ hấp sả','Steamed crab with lemongrass'),dish('Ghẹ cháy tỏi','Garlic-fried crab'),dish('Ghẹ rang me','Tamarind-glazed crab'),dish('Ghẹ rang muối','Salted stir-fried crab'),dish('Ghẹ nấu lẩu','Crab hot pot',{extra:true,value:50000})]),
section('muc-ong','squid','Mực ống','Squid',money(189000,'đĩa','plate'),[
 dish('Mực ống nướng sa tế','Grilled squid with satay sauce'),dish('Mực ống xào chua ngọt','Sweet & sour stir-fried squid'),dish('Mực ống xào hành cần','Squid stir-fried with celery and scallions'),dish('Mực ống xào bông cải','Squid stir-fried with broccoli'),dish('Mực ống chiên bột','Crispy fried squid'),dish('Mực ống hấp','Steamed squid')]),
section('bach-tuoc','squid','Bạch tuộc','Octopus',money(139000,'đĩa','plate'),[
 dish('Bạch tuộc nướng sa tế','Grilled octopus with satay'),dish('Bạch tuộc nướng muối ớt','Grilled octopus with chili salt'),dish('Bạch tuộc hấp','Steamed octopus')]),
section('tom-tit','prawns','Tôm tít','Mantis shrimp',{market:true},[
 dish('Tôm tít hấp sả','Steamed mantis shrimp with lemongrass'),dish('Tôm tít cháy tỏi','Garlic butter mantis shrimp'),dish('Tôm tít rang muối ớt','Salt & chili mantis shrimp'),dish('Tôm tít rang me','Tamarind-glazed mantis shrimp'),dish('Tôm tít phần','Mantis shrimp (portion)',money(289000,'đĩa','plate'))]),
section('tom-mu-ni','premium','Tôm mũ ni','Slipper lobster',{market:true},[
 dish('Tôm mũ ni hấp sả','Steamed slipper lobster with lemongrass'),dish('Tôm mũ ni cháy tỏi','Garlic butter slipper lobster'),dish('Tôm mũ ni nướng mỡ hành','Grilled slipper lobster with scallion oil'),dish('Tôm mũ ni nướng phô mai','Grilled slipper lobster with cheese')]),
section('tom-hum','premium','Tôm hùm','Lobster',{market:true},[
 dish('Tôm hùm hấp sả','Steamed lobster with lemongrass'),dish('Tôm hùm cháy tỏi','Garlic butter lobster'),dish('Tôm hùm nướng mỡ hành','Grilled lobster with scallion oil'),dish('Tôm hùm nướng phô mai','Grilled lobster with cheese')]),
section('khai-vi','starters','Món khai vị','Starters',null,[
 dish('Nấm biển (Đặc sản Cây Si)','Seaweed (Cây Si signature dish)',money(145000,'đĩa','plate')),dish('Chả giò chiên','Fried spring rolls',money(119000,'đĩa','plate')),dish('Cá trứng chiên','Fried smelt fish',money(99000,'con','fish')),dish('Xúc xích chiên','Fried sausages',money(89000,'đĩa','plate')),dish('Khoai tây chiên','French fries',money(79000,'đĩa','plate'))]),
section('mi-mien','noodles','Mì & miến xào','Stir-fried noodles & glass noodles',null,[
 dish('Mì xào bò','Beef stir-fried noodles',money(119000,'đĩa','plate')),dish('Mì xào hải sản','Seafood stir-fried noodles',money(139000,'đĩa','plate')),dish('Mì xào rau','Vegetable stir-fried noodles',money(79000,'đĩa','plate')),dish('Miến xào cua','Crab stir-fried glass noodles',money(139000,'đĩa','plate')),dish('Miến xào hải sản','Seafood stir-fried glass noodles',money(119000,'đĩa','plate'))]),
section('bia','drinks','Bia (lon)','Beer (cans)',null,[
 dish('Tiger nâu','Tiger Beer',money(23000,'lon','can')),dish('Tiger bạc','Tiger Crystal',money(25000,'lon','can')),dish('Tiger bạc (nhỏ)','Tiger Crystal (small)',money(20000,'lon','can')),dish('Heineken bạc','Heineken Silver',money(27000,'lon','can')),dish('Heineken bạc (nhỏ)','Heineken Silver (small)',money(23000,'lon','can')),dish('Sài Gòn Special','Saigon Special',money(22000,'lon','can')),dish('Sài Gòn Lager','Saigon Lager',money(20000,'lon','can'))]),
section('nuoc-ngot','drinks','Nước ngọt','Soft drinks',null,[
 dish('Coca Cola','Coca-Cola',money(16000,'','')),dish('Pepsi','Pepsi',money(16000,'','')),dish('7 Up','7UP',money(16000,'','')),dish('Sting dâu','Strawberry Sting',money(16000,'','')),dish('Mirinda cam/xá xị','Mirinda orange/sarsaparilla',money(16000,'','')),dish('Nước suối','Bottled water',money(10000,'',''))]),
section('ruou','drinks','Rượu (chai)','Alcoholic beverages (bottles)',null,[
 dish('Soju','Soju',money(120000,'chai','bottle')),dish('Vodka Men nhỏ','Vodka Men (small)',money(80000,'chai','bottle')),dish('Vodka Men lớn','Vodka Men (large)',money(140000,'chai','bottle')),dish('Rượu nếp mới','Vietnamese rice liquor',money(120000,'chai','bottle'))]),
section('chao','rice','Món cháo','Congee',money(89000,'tô','bowl'),[
 dish('Cháo hào','Oyster congee'),dish('Cháo tôm','Shrimp congee'),dish('Cháo hải sản','Seafood congee')]),
section('com-chien','rice','Cơm chiên','Fried rice',money(99000,'phần','serving'),[
 dish('Cơm chiên cá mặn','Fried rice with salted fish'),dish('Cơm chiên hải sản','Seafood fried rice'),dish('Cơm chiên tỏi','Garlic fried rice',money(69000,'đĩa','plate')),dish('Cơm chiên dương châu','Yangzhou-style fried rice'),dish('Cơm chiên thịt cua','Crab fried rice')]),
section('rau-cu','vegetables','Món rau củ','Vegetables',null,[
 dish('Canh cải nghêu','Clam & mustard greens soup',money(100000,'tô','bowl')),dish('Rau luộc thập cẩm','Assorted boiled vegetables',money(79000,'đĩa','plate')),dish('Bầu luộc','Steamed bottle gourd',money(59000,'đĩa','plate')),dish('Đậu bắp (luộc/nướng)','Okra (boiled/grilled)',money(39000,'đĩa','plate')),dish('Cải thìa xào tỏi','Garlic stir-fried bok choy',money(69000,'đĩa','plate')),dish('Cà tím (nướng/xào)','Eggplant (grilled/stir-fried)',money(39000,'đĩa','plate')),dish('Khổ qua chà bông','Bitter melon with pork floss',money(89000,'đĩa','plate')),dish('Khổ qua xào trứng','Bitter melon stir-fried with eggs',money(69000,'đĩa','plate')),dish('Rau muống (luộc/xào tỏi)','Water spinach (boiled/garlic stir-fried)',money(69000,'đĩa','plate')),dish('Canh bầu nấu tôm','Shrimp & bottle gourd soup',money(99000,'tô','bowl'))]),
section('goi','starters','Món gỏi','Salads',money(139000,'đĩa','plate'),[
 dish('Gỏi hải sản','Lotus root salad with shrimp and squid'),dish('Gỏi xoài ốc giác','Mango & conch salad'),dish('Gỏi khô mực','Dried squid & mango salad')]),
section('dau-hu','vegetables','Món đậu hủ','Tofu',money(59000,'đĩa','plate'),[
 dish('Đậu hủ tẩm hành','Crispy tofu with scallion oil'),dish('Đậu hủ lướt ván','Sizzling tofu (hot plate)'),dish('Đậu hủ chiên sả','Lemongrass fried tofu'),dish('Đậu hủ chiên giòn','Crispy fried tofu'),dish('Đậu hủ tẩm hành chà bông','Crispy tofu with scallion oil & pork floss',money(99000,'đĩa','plate'))]),
section('mon-bo','beef','Món bò','Beef',money(159000,'đĩa','plate'),[
 dish('Bò lúc lắc khoai tây','Vietnamese shaking beef with potatoes'),dish('Bò xào hành cần','Beef stir-fried with celery and onions'),dish('Bò xào bông cải','Beef stir-fried with broccoli')]),
section('mon-ga','chicken','Món gà','Chicken',money(109000,'đĩa','plate'),[
 dish('Cánh gà chiên nước mắm','Crispy chicken wings with fish sauce'),dish('Cánh gà xào sả ớt','Lemongrass chili chicken wings'),dish('Sụn gà chiên nước mắm','Crispy chicken cartilage with fish sauce'),dish('Sụn gà xào sả ớt','Lemongrass chili chicken cartilage')])

];
window.CAYSI_MENU_NOTES=[
 {vi:'Hóa đơn chưa bao gồm thuế VAT.',en:'VAT is not included in the listed prices.'},
 {vi:'Phụ thu lễ, Tết 10%.',en:'A 10% surcharge applies on public holidays and Tết.'},
 {vi:'Có phụ thu làm món (mức phí vui lòng hỏi nhân viên).',en:'Dish preparation surcharge applies (please ask staff for the rate).'},
 {vi:'Phụ thu bia rượu mang vào (mức phí vui lòng hỏi nhân viên).',en:'Corkage fee applies to outside alcoholic beverages (please ask staff).'},
 {vi:'Sau 01:00 sáng tính phí phục vụ 10%.',en:'A 10% service fee applies after 1:00 AM.'}
];
window.CAYSI_CATEGORIES=[
 {id:'all',vi:'Tất cả',en:'All'},
 {id:'premium',vi:'Cua · Ghẹ · Hải sản cao cấp',en:'Crab & Premium Seafood'},
 {id:'shellfish',vi:'Nghêu · Sò · Ốc',en:'Clams & Shellfish'},
 {id:'hotpot',vi:'Lẩu',en:'Hot Pot'},
 {id:'oysters',vi:'Hàu',en:'Oysters'},
 {id:'fish',vi:'Các món cá',en:'Fish'},
 {id:'squid',vi:'Mực',en:'Squid'},
 {id:'noodles',vi:'Mì · Miến',en:'Noodles'},
 {id:'starters',vi:'Khai vị · Súp',en:'Starters & Soups'},
 {id:'dried',vi:'Hải sản một nắng',en:'Sun-dried Seafood'},
 {id:'drinks',vi:'Đồ uống',en:'Drinks'},
 {id:'prawns',vi:'Tôm',en:'Prawns & Shrimp'},
 {id:'chicken',vi:'Món gà',en:'Chicken'},
 {id:'beef',vi:'Món bò',en:'Beef'},
 {id:'vegetables',vi:'Rau củ · Đậu hủ',en:'Vegetables & Tofu'},
 {id:'rice',vi:'Cơm · Cháo',en:'Rice & Congee'}
];
