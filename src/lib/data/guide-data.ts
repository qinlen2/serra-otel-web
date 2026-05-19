import { Compass, Grape, Landmark, TreePalm, UtensilsCrossed } from "lucide-react";
import type { Language } from "@/components/layout/preference-provider";

export interface GuideSection {
  id: string;
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  intro: string;
  items: {
    name: string;
    image: string;
    description: string;
    detail?: string;
    distance?: string;
    tip?: string;
  }[];
}

const dataTR: GuideSection[] = [
  {
    id: "tarih",
    icon: Landmark,
    eyebrow: "Tarih & Kültür",
    title: "6.000 yıllık hikâyeye dokunun.",
    intro:
      "Urla, Ege'nin en eski yerleşimlerinden biri. Antik limanlardan zeytinyağı müzelerine, her köşede tarihin izlerini taşıyor.",
    items: [
      {
        name: "Klazomenai Antik Kenti",
        image: "/serra/guide/klazomenai.png",
        description:
          "Anadolu'nun bilinen en eski zeytinyağı işliğine ev sahipliği yapan 6.000 yıllık antik kent. Kazı alanında Arkaik dönem surları, tapınak temelleri ve seramik atölye kalıntıları görülebilir.",
        detail: "İskele yolu üzerinde, otelden 4 km",
        tip: "Kazı alanı ziyarete açıktır. Hafta içi sakin saatleri tercih edin.",
      },
      {
        name: "Köstem Zeytinyağı Müzesi",
        image: "/serra/guide/kostem.png",
        description:
          "Dünyanın en büyük zeytinyağı müzelerinden biri. Roma dönemi taş preslerinden modern sıkma makinelerine kadar zeytinyağının 5.000 yıllık yolculuğunu anlatan 1.500 m² sergi alanı.",
        detail: "Uzunkuyu mevkii, Urla merkez yakını",
        tip: "Müze çıkışında butik zeytinyağı tadımı ve alışveriş imkânı var.",
      },
      {
        name: "Necati Cumalı Anı Evi",
        image: "/serra/nearby/urla-sanat-sokagi.png",
        description:
          "Türk edebiyatının önemli ismi Necati Cumalı'nın kişisel eşyaları, el yazmaları ve fotoğraflarının sergilendiği restore edilmiş tarihi ev. Urla'nın edebi mirasını keşfetmek için.",
        detail: "Urla ilçe merkezi, Sanat Sokağı yakını",
      },
    ],
  },
  {
    id: "plajlar",
    icon: TreePalm,
    eyebrow: "Plajlar & Koylar",
    title: "Her zevke bir sahil.",
    intro:
      "Aileler için sığ kumlu plajlardan, doğaseverler için bakir koylarına kadar Urla'nın kıyı şeridi her ihtiyaca cevap veriyor.",
    items: [
      {
        name: "Çeşmealtı Mavi Plaj",
        image: "/serra/nearby/cesmealt-plaj.png",
        description:
          "Serra Otel'e en yakın plaj. Mavi bayraklı, sığ ve berrak suyu ile çocuklu aileler için ideal. Beach club ve halk plajı alanları mevcut.",
        distance: "Otelden 1.5 km (araçla 3 dk)",
        tip: "Çakıllı zemin olduğu için deniz ayakkabısı tavsiye edilir.",
      },
      {
        name: "Kum Denizi Plajı",
        image: "/serra/guide/kum-denizi.png",
        description:
          "Mavi bayraklı halk plajı. Adından da anlaşılacağı gibi tamamen kumlu zemine sahip. Sığ denizi ve yürüyüş-bisiklet yollarıyla aileler için en güvenli tercih.",
        distance: "Otelden 6 km (araçla 12 dk)",
        tip: "Urla Belediyesi tarafından işletiliyor. Duş, tuvalet ve kafeterya mevcut.",
      },
      {
        name: "Demircili Koyu",
        image: "/serra/guide/demircili.png",
        description:
          "Urla'nın en bakir ve doğal güzelliğini koruyan koylarından biri. Berrak turkuaz suyu, çam ağaçlarıyla çevrili kıyısı ve sessiz atmosferiyle doğa kaçamağı arayanlar için.",
        distance: "Otelden 18 km (araçla 25 dk)",
        tip: "Hafta sonları kalabalık olabilir. Hafta içi gitmeniz tavsiye edilir. Kamp alanları mevcut.",
      },
    ],
  },
  {
    id: "sarap",
    icon: Grape,
    eyebrow: "Şarap & Bağ Yolu",
    title: "Ege'nin Toskana'sı.",
    intro:
      "Urla Bağ Yolu, sürdürülebilir turizm çalışmalarıyla uluslararası \"Green Destinations\" ödüllerine layık görülmüş, dünya standartlarında bir gastronomi rotası.",
    items: [
      {
        name: "Urla Şarapçılık",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Bölgenin en köklü ve profesyonel üretim tesisi. Bağ turu, şarap tadımı ve restoranıyla tam gün geçirilebilecek bir deneyim sunuyor. Özellikle Cabernet Franc ve Nero d'Avola çeşitleriyle tanınır.",
        distance: "Otelden 8 km (araçla 15 dk)",
        tip: "Tadım için mutlaka önceden rezervasyon yapın.",
      },
      {
        name: "Urlice Bağları",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Organik tarım prensipleriyle üretim yapan butik işletme. Restoranında bağ manzarası eşliğinde yerel lezzetler ve kendi üretimi şaraplar sunuluyor.",
        distance: "Otelden 10 km (araçla 18 dk)",
        tip: "Bağ bozumu dönemi (Ağustos sonu – Eylül başı) özel bir deneyim.",
      },
      {
        name: "Mozaik & Diğer Bağ Evleri",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Sulama sistemi olmayan bağlarıyla deneysel tatlar üreten Mozaik, USCA, Perdix, İkideniz Arası ve MMG gibi butik üreticiler rotanın diğer önemli durakları.",
        distance: "Urla Bağ Yolu güzergâhı boyunca",
        tip: "Tüm bağ evleri rezervasyonla çalışır. Önceden arayın.",
      },
    ],
  },
  {
    id: "gastronomi",
    icon: UtensilsCrossed,
    eyebrow: "Gastronomi",
    title: "Michelin yıldızından köy lokantasına.",
    intro:
      "Urla, son yıllarda açılan iddialı şef restoranlarıyla Türkiye'nin gastronomi başkentlerinden biri haline geldi. Yerel lezzetlerden fine dining'e geniş bir yelpaze sunuyor.",
    items: [
      {
        name: "OD Urla",
        image: "/serra/guide/od-urla.png",
        description:
          "Şef Osman Sezener'in Michelin yıldızlı \"tarladan sofraya\" restoranı. Zeytin ağaçları arasında, odun ateşinde pişirilen mevsimsel tadım menüleri. Dana yanak, mevsim otu risottosu ve deniz mahsulleri imza lezzetleri arasında.",
        distance: "Otelden 10 km (araçla 20 dk)",
        tip: "Haftalar öncesinden rezervasyon gerekli. Akşam menüsü için 3 saat ayırın.",
      },
      {
        name: "Vino Locale",
        image: "/serra/nearby/urla-gastronomi.png",
        description:
          "Şef Ozan Kumbasar & sommelier Seray Kumbasar'ın Michelin yıldızlı restoranı. Modern Ege-İtalyan füzyon mutfağı, mevsimsel menü ve etkileyici şarap eşleşmeleri.",
        distance: "Urla merkez yakını",
        tip: "Yerel şarap eşleşmeli tadım menüsünü deneyin.",
      },
      {
        name: "Yengeç Restaurant",
        image: "/serra/nearby/urla-iskele.png",
        description:
          "Urla İskele'de tarihi taş binada hizmet veren efsanevi deniz ürünleri restoranı. 100'den fazla meze çeşidi, ballı kalamar, levrek simit ve ahtapot güveç imza lezzetleri.",
        distance: "Otelden 4 km (araçla 8 dk)",
        tip: "Akşam yemeği için rezervasyon şart. Gün batımında dış alanı tercih edin.",
      },
    ],
  },
  {
    id: "kesfet",
    icon: Compass,
    eyebrow: "Keşfedilecek Duraklar",
    title: "Yolun güzeli, Urla'nın köyleri.",
    intro:
      "Taş evleri, organik pazarları ve samimi kahvehaneleriyle Urla'nın köyleri, modern Ege yaşamının en güzel örneklerini sunuyor.",
    items: [
      {
        name: "Bademler Köyü",
        image: "/serra/guide/bademler.png",
        description:
          "Türkiye'nin ilk köy tiyatrosuna ev sahipliği yapan, tertemiz sokakları ve doğal ürün pazarıyla ünlü köy. Yerel kadınların hazırladığı gözleme ve mantı deneyimi için.",
        distance: "Otelden 12 km (araçla 20 dk)",
        tip: "Pazar günleri organik köy pazarı kuruluyor.",
      },
      {
        name: "Güvendik Tepesi",
        image: "/serra/nearby/guvendik-tepesi.png",
        description:
          "İzmir Körfezi'nin panoramik manzarasına karşı gün batımı izlemek için Urla'nın en iyi noktası. Tepedeki meşhur tarçınlı lokma, ziyaretin olmazsa olmazı.",
        distance: "Otelden 2 km (araçla 5 dk)",
        tip: "Gün batımından 30 dk önce gidin. Çay ve lokma yetişir.",
      },
      {
        name: "Malgaca Pazarı & Sanat Sokağı",
        image: "/serra/nearby/malgaca-pazari.png",
        description:
          "Urla'nın en eski ticaret merkezi Malgaca Pazarı, geleneksel esnafları ve tarihi kahvehaneleriyle zaman tüneli gibi. Sanat Sokağı'nda (Zafer Caddesi) ise seramik atölyeleri, antikacılar ve butik kafeler sıralanıyor.",
        distance: "Otelden 4 km (araçla 8 dk)",
        tip: "Katmerci'nin tahinli katmerini mutlaka deneyin.",
      },
    ],
  },
];

const dataEN: GuideSection[] = [
  {
    id: "history",
    icon: Landmark,
    eyebrow: "History & Culture",
    title: "Touch a 6,000-year-old story.",
    intro:
      "Urla is one of the oldest settlements in the Aegean. From ancient ports to olive oil museums, it carries traces of history in every corner.",
    items: [
      {
        name: "Ancient City of Klazomenai",
        image: "/serra/guide/klazomenai.png",
        description:
          "A 6,000-year-old ancient city housing Anatolia's oldest known olive oil workshop. Archaic period walls, temple foundations, and ceramic workshop ruins can be seen.",
        detail: "On the Pier road, 4 km from the hotel",
        tip: "The excavation site is open to visitors. Prefer quiet hours on weekdays.",
      },
      {
        name: "Köstem Olive Oil Museum",
        image: "/serra/guide/kostem.png",
        description:
          "One of the world's largest olive oil museums. A 1,500 m² exhibition area explaining the 5,000-year journey of olive oil, from Roman stone presses to modern extraction machines.",
        detail: "Uzunkuyu area, near Urla center",
        tip: "Boutique olive oil tasting and shopping available at the museum exit.",
      },
      {
        name: "Necati Cumalı Memorial House",
        image: "/serra/nearby/urla-sanat-sokagi.png",
        description:
          "A restored historical house exhibiting the personal belongings, manuscripts, and photographs of Necati Cumalı, an important figure in Turkish literature.",
        detail: "Urla district center, near Art Street",
      },
    ],
  },
  {
    id: "beaches",
    icon: TreePalm,
    eyebrow: "Beaches & Coves",
    title: "A shore for every taste.",
    intro:
      "From shallow sandy beaches for families to pristine coves for nature lovers, Urla's coastline caters to every need.",
    items: [
      {
        name: "Çeşmealtı Blue Beach",
        image: "/serra/nearby/cesmealt-plaj.png",
        description:
          "The closest beach to Serra Hotel. Blue-flagged, shallow and clear water, ideal for families with children. Beach club and public beach areas available.",
        distance: "1.5 km from the hotel (3 mins by car)",
        tip: "Sea shoes are recommended due to the pebbly bottom.",
      },
      {
        name: "Sand Sea Beach (Kum Denizi)",
        image: "/serra/guide/kum-denizi.png",
        description:
          "Blue-flagged public beach. As the name suggests, it has a completely sandy bottom. The safest choice for families with its shallow sea and walking-cycling paths.",
        distance: "6 km from the hotel (12 mins by car)",
        tip: "Operated by Urla Municipality. Showers, toilets, and cafeteria available.",
      },
      {
        name: "Demircili Cove",
        image: "/serra/guide/demircili.png",
        description:
          "One of Urla's most pristine coves preserving its natural beauty. For those seeking a nature getaway with its clear turquoise water, pine tree-lined shore, and quiet atmosphere.",
        distance: "18 km from the hotel (25 mins by car)",
        tip: "Can be crowded on weekends. Weekdays are recommended. Camping areas available.",
      },
    ],
  },
  {
    id: "wine",
    icon: Grape,
    eyebrow: "Wine & Vineyard Route",
    title: "The Tuscany of the Aegean.",
    intro:
      "The Urla Vineyard Route is a world-class gastronomy route, awarded international \"Green Destinations\" awards for its sustainable tourism efforts.",
    items: [
      {
        name: "Urla Winery",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "The most established and professional production facility in the region. Offers a full-day experience with a vineyard tour, wine tasting, and restaurant. Known especially for Cabernet Franc and Nero d'Avola.",
        distance: "8 km from the hotel (15 mins by car)",
        tip: "Be sure to make a reservation for tasting in advance.",
      },
      {
        name: "Urlice Vineyards",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "A boutique enterprise producing with organic farming principles. Its restaurant offers local flavors and its own wines accompanied by vineyard views.",
        distance: "10 km from the hotel (18 mins by car)",
        tip: "The vintage period (late August – early September) is a special experience.",
      },
      {
        name: "Mozaik & Other Vineyards",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Mozaik, producing experimental tastes with its non-irrigated vineyards, and boutique producers like USCA, Perdix, İkideniz Arası, and MMG are other important stops.",
        distance: "Along the Urla Vineyard Route",
        tip: "All vineyards work by reservation. Call ahead.",
      },
    ],
  },
  {
    id: "gastronomy",
    icon: UtensilsCrossed,
    eyebrow: "Gastronomy",
    title: "From Michelin stars to village diners.",
    intro:
      "Urla has become one of Turkey's gastronomy capitals with ambitious chef restaurants opening in recent years. Offers a wide range from local flavors to fine dining.",
    items: [
      {
        name: "OD Urla",
        image: "/serra/guide/od-urla.png",
        description:
          "Chef Osman Sezener's Michelin-starred \"farm to table\" restaurant. Seasonal tasting menus cooked on wood fire among olive trees. Beef cheek and seafood are among the signature flavors.",
        distance: "10 km from the hotel (20 mins by car)",
        tip: "Reservation required weeks in advance. Allocate 3 hours for the dinner menu.",
      },
      {
        name: "Vino Locale",
        image: "/serra/nearby/urla-gastronomi.png",
        description:
          "Chef Ozan Kumbasar & sommelier Seray Kumbasar's Michelin-starred restaurant. Modern Aegean-Italian fusion cuisine, seasonal menu, and impressive wine pairings.",
        distance: "Near Urla center",
        tip: "Try the tasting menu with local wine pairing.",
      },
      {
        name: "Yengeç Restaurant",
        image: "/serra/nearby/urla-iskele.png",
        description:
          "A legendary seafood restaurant serving in a historical stone building at Urla Pier. Over 100 appetizer varieties, honey calamari, and octopus stew are signature flavors.",
        distance: "4 km from the hotel (8 mins by car)",
        tip: "Reservation required for dinner. Prefer the outdoor area at sunset.",
      },
    ],
  },
  {
    id: "explore",
    icon: Compass,
    eyebrow: "Stops to Explore",
    title: "The beauty of the road, Urla's villages.",
    intro:
      "With their stone houses, organic markets, and sincere coffeehouses, Urla's villages offer the finest examples of modern Aegean life.",
    items: [
      {
        name: "Bademler Village",
        image: "/serra/guide/bademler.png",
        description:
          "Home to Turkey's first village theater, famous for its clean streets and natural product market. For a gözleme and mantı experience prepared by local women.",
        distance: "12 km from the hotel (20 mins by car)",
        tip: "An organic village market is set up on Sundays.",
      },
      {
        name: "Güvendik Hill",
        image: "/serra/nearby/guvendik-tepesi.png",
        description:
          "The best spot in Urla to watch the sunset against the panoramic view of the Gulf of Izmir. The famous cinnamon lokma at the top is a must-have.",
        distance: "2 km from the hotel (5 mins by car)",
        tip: "Go 30 minutes before sunset to catch the view and the fresh lokma.",
      },
      {
        name: "Malgaca Market & Art Street",
        image: "/serra/nearby/malgaca-pazari.png",
        description:
          "Urla's oldest trade center, Malgaca Market is like a time tunnel with its traditional tradesmen and historical coffeehouses. Art Street is lined with ceramic workshops, antique dealers, and boutique cafes.",
        distance: "4 km from the hotel (8 mins by car)",
        tip: "You must try the tahini katmer from the local Katmerci.",
      },
    ],
  },
];

const dataDE: GuideSection[] = [
  {
    id: "historie",
    icon: Landmark,
    eyebrow: "Geschichte & Kultur",
    title: "Berühren Sie eine 6.000 Jahre alte Geschichte.",
    intro:
      "Urla ist eine der ältesten Siedlungen in der Ägäis. Von antiken Häfen bis hin zu Olivenölmuseen trägt es an jeder Ecke Spuren der Geschichte.",
    items: [
      {
        name: "Antike Stadt Klazomenai",
        image: "/serra/guide/klazomenai.png",
        description:
          "Eine 6.000 Jahre alte antike Stadt, die Anatoliens älteste bekannte Olivenölwerkstatt beherbergt. Zu sehen sind Mauern aus der archaischen Zeit, Tempelfundamente und Ruinen von Keramikwerkstätten.",
        detail: "An der Pier-Straße, 4 km vom Hotel entfernt",
        tip: "Die Ausgrabungsstätte ist für Besucher geöffnet. Bevorzugen Sie ruhige Stunden an Wochentagen.",
      },
      {
        name: "Köstem Olivenölmuseum",
        image: "/serra/guide/kostem.png",
        description:
          "Eines der größten Olivenölmuseen der Welt. Eine 1.500 m² große Ausstellungsfläche erklärt die 5.000-jährige Reise des Olivenöls, von römischen Steinpressen bis hin zu modernen Extraktionsmaschinen.",
        detail: "Uzunkuyu-Gebiet, in der Nähe des Zentrums von Urla",
        tip: "Boutique-Olivenölverkostung und Einkaufsmöglichkeiten am Museumsausgang.",
      },
      {
        name: "Necati Cumalı Gedenkhaus",
        image: "/serra/nearby/urla-sanat-sokagi.png",
        description:
          "Ein restauriertes historisches Haus, in dem persönliche Gegenstände, Manuskripte und Fotos von Necati Cumalı, einer wichtigen Figur der türkischen Literatur, ausgestellt sind.",
        detail: "Bezirkszentrum Urla, in der Nähe der Kunststraße",
      },
    ],
  },
  {
    id: "straende",
    icon: TreePalm,
    eyebrow: "Strände & Buchten",
    title: "Ein Ufer für jeden Geschmack.",
    intro:
      "Von flachen Sandstränden für Familien bis hin zu unberührten Buchten für Naturliebhaber bietet die Küste von Urla für jedes Bedürfnis das Richtige.",
    items: [
      {
        name: "Çeşmealtı Blauer Strand",
        image: "/serra/nearby/cesmealt-plaj.png",
        description:
          "Der dem Serra Hotel am nächsten gelegene Strand. Blau beflaggt, flaches und klares Wasser, ideal für Familien mit Kindern. Beach Club und öffentliche Strandbereiche vorhanden.",
        distance: "1,5 km vom Hotel entfernt (3 Autominuten)",
        tip: "Wegen des kieseligen Grundes werden Badeschuhe empfohlen.",
      },
      {
        name: "Sandmeer-Strand (Kum Denizi)",
        image: "/serra/guide/kum-denizi.png",
        description:
          "Blau beflaggter öffentlicher Strand. Wie der Name schon sagt, hat er einen reinen Sandboden. Die sicherste Wahl für Familien mit seinem flachen Meer und Spazier-/Radwegen.",
        distance: "6 km vom Hotel entfernt (12 Autominuten)",
        tip: "Wird von der Gemeinde Urla betrieben. Duschen, Toiletten und Cafeteria vorhanden.",
      },
      {
        name: "Demircili Bucht",
        image: "/serra/guide/demircili.png",
        description:
          "Eine der unberührtesten Buchten Urlas, die ihre natürliche Schönheit bewahrt hat. Für diejenigen, die einen Naturausflug mit klarem türkisfarbenem Wasser, von Pinien gesäumten Ufern und ruhiger Atmosphäre suchen.",
        distance: "18 km vom Hotel entfernt (25 Autominuten)",
        tip: "Kann an Wochenenden überfüllt sein. Wochentage werden empfohlen. Campingplätze vorhanden.",
      },
    ],
  },
  {
    id: "wein",
    icon: Grape,
    eyebrow: "Wein & Weinroute",
    title: "Die Toskana der Ägäis.",
    intro:
      "Die Urla-Weinroute ist eine erstklassige Gastronomieroute, die für ihre nachhaltigen Tourismusbemühungen mit internationalen \"Green Destinations\"-Preisen ausgezeichnet wurde.",
    items: [
      {
        name: "Urla Weingut",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Die etablierteste und professionellste Produktionsstätte der Region. Bietet ein ganztägiges Erlebnis mit Weinbergstour, Weinprobe und Restaurant. Besonders bekannt für Cabernet Franc und Nero d'Avola.",
        distance: "8 km vom Hotel entfernt (15 Autominuten)",
        tip: "Unbedingt im Voraus reservieren für die Weinprobe.",
      },
      {
        name: "Urlice Weinberge",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Ein Boutique-Unternehmen, das nach biologischen Landwirtschaftsprinzipien produziert. Sein Restaurant bietet lokale Aromen und eigene Weine, begleitet von einem Blick auf den Weinberg.",
        distance: "10 km vom Hotel entfernt (18 Autominuten)",
        tip: "Die Weinlese (Ende August – Anfang September) ist ein besonderes Erlebnis.",
      },
      {
        name: "Mozaik & Weitere Weinberge",
        image: "/serra/nearby/urla-bag-yolu.png",
        description:
          "Mozaik, das experimentelle Geschmacksrichtungen mit seinen unbewässerten Weinbergen produziert, sowie Boutique-Produzenten wie USCA, Perdix, İkideniz Arası und MMG sind weitere wichtige Stationen.",
        distance: "Entlang der Urla-Weinroute",
        tip: "Alle Weinberge arbeiten mit Reservierung. Vorher anrufen.",
      },
    ],
  },
  {
    id: "gastronomie",
    icon: UtensilsCrossed,
    eyebrow: "Gastronomie",
    title: "Von Michelin-Sternen bis zu Dorflokalen.",
    intro:
      "Urla hat sich in den letzten Jahren mit der Eröffnung ehrgeiziger Chef-Restaurants zu einer der Gastronomie-Hauptstädte der Türkei entwickelt. Bietet eine große Bandbreite von lokalen Aromen bis hin zu Fine Dining.",
    items: [
      {
        name: "OD Urla",
        image: "/serra/guide/od-urla.png",
        description:
          "Chef Osman Sezeners Michelin-Stern \"Farm to Table\"-Restaurant. Saisonale Degustationsmenüs, zubereitet auf Holzfeuer zwischen Olivenbäumen. Rinderwange und Meeresfrüchte gehören zu den Signature-Aromen.",
        distance: "10 km vom Hotel entfernt (20 Autominuten)",
        tip: "Reservierung Wochen im Voraus erforderlich. Planen Sie 3 Stunden für das Abendmenü ein.",
      },
      {
        name: "Vino Locale",
        image: "/serra/nearby/urla-gastronomi.png",
        description:
          "Michelin-Stern-Restaurant von Chef Ozan Kumbasar & Sommeliere Seray Kumbasar. Moderne ägäisch-italienische Fusionsküche, saisonales Menü und beeindruckende Weinbegleitungen.",
        distance: "In der Nähe des Zentrums von Urla",
        tip: "Probieren Sie das Degustationsmenü mit lokaler Weinbegleitung.",
      },
      {
        name: "Yengeç Restaurant",
        image: "/serra/nearby/urla-iskele.png",
        description:
          "Ein legendäres Meeresfrüchte-Restaurant in einem historischen Steingebäude am Pier von Urla. Über 100 Vorspeisenvarianten, Honig-Calamari und Oktopus-Eintopf sind Signature-Gerichte.",
        distance: "4 km vom Hotel entfernt (8 Autominuten)",
        tip: "Reservierung für das Abendessen erforderlich. Bevorzugen Sie den Außenbereich bei Sonnenuntergang.",
      },
    ],
  },
  {
    id: "entdecken",
    icon: Compass,
    eyebrow: "Stationen zum Entdecken",
    title: "Die Schönheit der Straße, Urlas Dörfer.",
    intro:
      "Mit ihren Steinhäusern, Bio-Märkten und herzlichen Kaffeehäusern bieten Urlas Dörfer die schönsten Beispiele modernen ägäischen Lebens.",
    items: [
      {
        name: "Dorf Bademler",
        image: "/serra/guide/bademler.png",
        description:
          "Heimat von Türkeis erstem Dorftheater, berühmt für seine sauberen Straßen und seinen Naturproduktemarkt. Für ein Gözleme- und Mantı-Erlebnis, zubereitet von einheimischen Frauen.",
        distance: "12 km vom Hotel entfernt (20 Autominuten)",
        tip: "Sonntags findet ein Bio-Dorfmarkt statt.",
      },
      {
        name: "Güvendik-Hügel",
        image: "/serra/nearby/guvendik-tepesi.png",
        description:
          "Der beste Ort in Urla, um den Sonnenuntergang vor dem Panoramablick auf den Golf von Izmir zu beobachten. Das berühmte Zimt-Lokma oben ist ein Muss.",
        distance: "2 km vom Hotel entfernt (5 Autominuten)",
        tip: "Gehen Sie 30 Minuten vor Sonnenuntergang, um die Aussicht und frisches Lokma zu genießen.",
      },
      {
        name: "Malgaca Markt & Kunststraße",
        image: "/serra/nearby/malgaca-pazari.png",
        description:
          "Urlas ältestes Handelszentrum, der Malgaca-Markt, ist mit seinen traditionellen Händlern und historischen Kaffeehäusern wie ein Zeittunnel. Die Kunststraße ist gesäumt von Keramikwerkstätten, Antiquitätenhändlern und Boutique-Cafés.",
        distance: "4 km vom Hotel entfernt (8 Autominuten)",
        tip: "Probieren Sie unbedingt das Tahini-Katmer vom lokalen Katmerci.",
      },
    ],
  },
];

export function getGuideSections(lang: Language): GuideSection[] {
  if (lang === "en") return dataEN;
  if (lang === "de") return dataDE;
  return dataTR;
}
