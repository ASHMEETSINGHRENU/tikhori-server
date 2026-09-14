import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Entrepreneur from '../models/Entrepreneur.js';
import Banner from '../models/Banner.js';
import Content from '../models/Content.js';
import Setting from '../models/Setting.js';
import ContactEnquiry from '../models/ContactEnquiry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tikhori_foods';
    await mongoose.connect(mongoUri);
    console.log('[Seed]: Connected to MongoDB:', mongoUri);

    // Clear existing collections
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await Entrepreneur.deleteMany({});
    await Banner.deleteMany({});
    await Content.deleteMany({});
    await Setting.deleteMany({});
    await ContactEnquiry.deleteMany({});
    console.log('[Seed]: Cleared existing database records.');

    // 1. Seed Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tikhorifoods.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Tikhori@Admin2026';
    const admin = new Admin({
      name: process.env.ADMIN_NAME || 'Tikhori Administrator',
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin'
    });
    await admin.save();
    console.log(`[Seed]: Created Admin: ${adminEmail}`);

    // 2. Seed Flagship Products
    const productsData = [
      {
        name: {
          en: 'Red Chilli Powder',
          hi: 'लाल मिर्च पाउडर'
        },
        slug: 'red-chilli-powder',
        shortDescription: {
          en: '100% Organic Stemless Red Chilli Powder with pure heat, vibrant natural color, and zero additives.',
          hi: '१००% जैविक डंठल-रहित लाल मिर्च पाउडर, प्राकृतिक तीखापन और शुद्ध रंग के साथ।'
        },
        description: {
          en: 'Crafted from hand-selected, stemless red chillies, our red chilli powder delivers an authentic pungency and rich natural red hue without artificial dyes or chemical preservatives. Every batch is freshly ground to maintain peak volatile oils.',
          hi: 'डंठल-रहित जैविक लाल मिर्च से तैयार यह मिर्च पाउडर आपके भोजन को देता है प्रामाणिक तीखापन और प्राकृतिक गहरा रंग, बिना किसी मिलावट या रसायनों के।'
        },
        features: ['100% Organic', 'Stemless Chilli', 'Chemical Free', 'Zero Added Colours', 'Zero Added Flavours'],
        ingredients: {
          en: ['Whole Stemless Red Chillies'],
          hi: ['डंठल-रहित साबुत लाल मिर्च']
        },
        benefits: {
          en: [
            'Carefully stemless preparation ensures clean, unadulterated texture',
            'Zero artificial dyes, Sudan colours, or synthetic preservatives',
            'Naturally rich in capsaicin for authentic, balanced heat',
            'Sourced directly from local sustainable organic farm networks'
          ],
          hi: [
            'डंठल-रहित होने से मिलती है शुद्धता और महीन बनावट',
            'बिना किसी कृत्रिम रंग या मिलावट के १००% शुद्ध',
            'प्राकृतिक तीखेपन और ताजी खुशबू से भरपूर',
            'जैविक किसानों से सीधे प्राप्त'
          ]
        },
        usage: {
          en: 'Use 1/2 to 1 teaspoon in gravies, dals, curries, dry roasts, or tandoori marinades according to desired heat levels.',
          hi: 'सब्जी, दाल या तड़के में स्वादानुसार आधा से एक चम्मच इस्तेमाल करें।'
        },
        storage: {
          en: 'Store in a cool, dry place away from direct sunlight. Seal airtight after each use.',
          hi: 'ठंडी और सूखी जगह पर रखें। सीधी धूप से बचाएं और हवा-बंद डिब्बे में रखें।'
        },
        packaging: {
          en: 'Packaged in multi-layer food-safe barrier pouches that lock in freshness and aroma.',
          hi: 'खुशबू और ताजगी सुरक्षित रखने वाले विशेष फूड-ग्रेड पाउच में उपलब्ध।'
        },
        image: '/assets/products/product-1.png',
        gallery: ['/assets/products/product-1.png'],
        isActive: true,
        sortOrder: 1
      },
      {
        name: {
          en: 'Turmeric Powder',
          hi: 'हल्दी पाउडर'
        },
        slug: 'turmeric-powder',
        shortDescription: {
          en: '100% Organic Pure Turmeric Powder renowned for its natural golden hue, rich earthy aroma, and high purity.',
          hi: 'प्राकृतिक सुनहरे रंग और मिट्टी की सौंधी खुशबू से भरपूर १००% जैविक शुद्ध हल्दी पाउडर।'
        },
        description: {
          en: 'Ground from naturally cured organic turmeric rhizomes, our Haldi powder brings traditional warmth, deep golden character, and time-honored goodness to your everyday family meals.',
          hi: 'जैविक रूप से उगाई गई हल्दी की गांठों से पारंपरिक तरीके से पिसी शुद्ध हल्दी, जो प्राकृतिक गुणों और सुनहरे रंग को बनाए रखती है।'
        },
        features: ['100% Organic Pure', 'Chemical Free', 'Zero Added Colours', 'Zero Added Flavours'],
        ingredients: {
          en: ['Pure Whole Turmeric Rhizomes'],
          hi: ['शुद्ध साबुत हल्दी']
        },
        benefits: {
          en: [
            'High natural curcumin content preserved through low-temperature grinding',
            'Completely unadulterated with starch, chalk, or synthetic yellow dyes',
            'Warm, comforting aroma that defines authentic Indian cooking',
            'Processed with strict food-grade cleanliness standards'
          ],
          hi: [
            'प्राकृतिक गुणों और सुगंध से भरपूर',
            'स्टार्च या पीले कृत्रिम रंगों की कोई मिलावट नहीं',
            'प्रामाणिक मिट्टी जैसी सौंधी खुशबू और गहरा रंग',
            'स्वच्छ और सुरक्षित वातावरण में तैयार'
          ]
        },
        usage: {
          en: 'Add 1/4 to 1/2 teaspoon into hot oil or ghee with temperings, curries, lentils, or golden turmeric milk.',
          hi: 'तड़के, दाल, करी या हल्दी वाले दूध में एक चौथाई से आधा चम्मच उपयोग करें।'
        },
        storage: {
          en: 'Store in an airtight jar away from humidity and direct light.',
          hi: 'नमी और धूप से दूर एक वायुरोधी डिब्बे में रखें।'
        },
        packaging: {
          en: 'Protected with aroma-lock pouch preventing moisture ingress.',
          hi: 'नमी-रोधी फूड-ग्रेड सुरक्षा पाउच।'
        },
        image: '/assets/products/product-2.png',
        gallery: ['/assets/products/product-2.png'],
        isActive: true,
        sortOrder: 2
      },
      {
        name: {
          en: 'Coriander Powder',
          hi: 'धनिया पाउडर'
        },
        slug: 'coriander-powder',
        shortDescription: {
          en: '100% Organic Pure Coriander Powder with a refreshing citrus-warm aroma and full-bodied gravy texture.',
          hi: 'ताजगी और सौंधी सुगंध से भरपूर १००% जैविक धनिया पाउडर।'
        },
        description: {
          en: 'Harvested from select aromatic coriander seeds, this powder delivers a mild citrus undertone that binds complex spices together into harmonious curries and marinades.',
          hi: 'सुगंधित धनिया के दानों से धीमी गति से पीसा गया पाउडर, जो हर भारतीय व्यंजन को देता है संतुलित स्वाद, गाढ़ापन और लाजवाब महक।'
        },
        features: ['100% Organic Pure', 'Chemical Free', 'Zero Added Flavours', 'Zero Added Colours'],
        ingredients: {
          en: ['Selected Whole Coriander Seeds'],
          hi: ['चयनित जैविक साबुत धनिया बीज']
        },
        benefits: {
          en: [
            'Rich in fragrant essential oils providing sweet citrus aroma',
            'Adds body, thickness, and balanced flavor to all gravies',
            'Single-ingredient purity with zero adulterants or fillers',
            'Cleaned and ground using modern hygienic methods'
          ],
          hi: [
            'स्वाभाविक रूप से सुगंधित और ताजगी भरा',
            'सब्जियों और रसेदार व्यंजनों को देता है गाढ़ापन',
            'बिना किसी मिलावट के १००% शुद्ध धनिया',
            'स्वच्छता के उच्चतम मानकों पर तैयार'
          ]
        },
        usage: {
          en: 'Add 1 to 2 teaspoons during onion-tomato masala sautéing.',
          hi: 'मसाला भूनते समय एक से दो चम्मच धनिया पाउडर का उपयोग करें।'
        },
        storage: {
          en: 'Keep in an airtight container in a dry, cool pantry.',
          hi: 'हवाबंद जार में ठंडी व सूखी जगह पर रखें।'
        },
        packaging: {
          en: 'Multi-barrier foil pack preserving delicate aromatics.',
          hi: 'ताजगी बनाए रखने के लिए मल्टी-लेयर फॉयल पैकेजिंग।'
        },
        image: '/assets/products/product-3.png',
        gallery: ['/assets/products/product-3.png'],
        isActive: true,
        sortOrder: 3
      },
      {
        name: {
          en: 'Kaala Masala',
          hi: 'काला मसाला'
        },
        slug: 'kaala-masala',
        shortDescription: {
          en: 'Traditional roasted spice blend with deep smoky notes, crafted for rich regional curries.',
          hi: 'पारंपरिक भुने हुए मसालों का प्रामाणिक मिश्रण, गहरे स्वाद और महक के लिए।'
        },
        description: {
          en: 'Our signature Kaala Masala honors the heritage of slow-roasting whole spices to develop a smoky, intensely savory complexity. Perfect for rustic Maharashtrian gravies, misal, and slow-cooked dishes.',
          hi: 'पारंपरिक विधि से साबुत मसालों को धीमी आंच पर भूनकर तैयार किया गया काला मसाला, जो हर रसेदार डिश में अद्वितीय सौंधी सुगंध और स्वाद भर देता है।'
        },
        features: ['100% Organic', 'Authentic Heritage Blend', 'Chemical Free', 'Zero Added Flavours'],
        ingredients: {
          en: ['Coriander Seeds', 'Cumin', 'Black Cardamom', 'Cloves', 'Cinnamon', 'Star Anise', 'Bay Leaf', 'Sesame', 'Traditional Spices'],
          hi: ['धनिया', 'जीरा', 'बड़ी इलायची', 'लौंग', 'दालचीनी', 'चक्रफूल', 'तेजपत्ता', 'तिल', 'पारंपरिक साबुत मसाले']
        },
        benefits: {
          en: [
            'Heritage recipe crafted with authentic slow-roasted technique',
            'No MSG, synthetic flavors, or artificial colors',
            'Imparts dark velvety color and depth to vegetarian and non-vegetarian dishes',
            'Blended with care by experienced spice artisans'
          ],
          hi: [
            'धीमी आंच पर भुने मसालों का पारंपरिक स्वाद',
            'कोई कृत्रिम स्वाद, रंग या प्रिजर्वेटिव नहीं',
            'ग्रेवी को गाढ़ा, गहरा और लाजवाब स्वाद प्रदान करता है',
            'पारंपरिक अनुभव और शुद्धता से परिपूर्ण'
          ]
        },
        usage: {
          en: 'Add 1 to 2 tablespoons when simmering gravies, misal tarri, or spiced vegetable curries.',
          hi: 'ग्रेवी या रसेदार व्यंजन पकाते समय १-२ चम्मच डालें।'
        },
        storage: {
          en: 'Store in an airtight container away from heat sources and moisture.',
          hi: 'गर्मी और धूप से दूर एयरटाइट डिब्बे में रखें।'
        },
        packaging: {
          en: 'Moisture-barrier sealed aroma pack.',
          hi: 'नमी-रोधी सील पैक पाउच।'
        },
        image: '/assets/products/product-4.png',
        gallery: ['/assets/products/product-4.png'],
        isActive: true,
        sortOrder: 4
      }
    ];

    await Product.insertMany(productsData);
    console.log(`[Seed]: Seeded ${productsData.length} flagship products.`);

    // 3. Seed CMS Dynamic Content
    const cmsContents = [
      {
        section: 'hero',
        data: {
          badge: {
            en: '100% Organic & Chemical Free',
            hi: '१००% जैविक और रसायन मुक्त'
          },
          title: {
            en: 'Spice Crafted Right',
            hi: 'स्वाद और शुद्धता का सही संगम'
          },
          subtitle: {
            en: 'Pure. Organic. Authentic. Made with Purpose.',
            hi: 'शुद्ध। जैविक। प्रामाणिक। एक सार्थक उद्देश्य के साथ।'
          },
          description: {
            en: 'Tikhori Foods brings you single-origin, stemless, and unadulterated spices from India’s heartlands while championing rural women entrepreneurs and grassroots micro-enterprises.',
            hi: 'टिखोरी फूड्स आपके लिए लाता है भारत की मिट्टी से उपजी शुद्ध, डंठल-रहित और रसायन-मुक्त मसाले, साथ ही ग्रामीण महिला उद्यमियों को सशक्त बनाकर उनके सपनों को नई उड़ान देता है।'
          },
          ctaPrimary: {
            en: 'Explore Our Spices',
            hi: 'हमारे मसाले देखें'
          },
          ctaSecondary: {
            en: 'Our Mission',
            hi: 'हमारा उद्देश्य'
          },
          heroImage: '/assets/products/product-1.png'
        }
      },
      {
        section: 'whyTikhori',
        data: {
          tagline: {
            en: 'The Tikhori Difference',
            hi: 'टिखोरी की विशेषता'
          },
          title: {
            en: 'Why Tikhori Foods?',
            hi: 'टिखोरी फूड्स ही क्यों?'
          },
          subtitle: {
            en: 'Every spoonful is grounded in authenticity, uncompromising quality, and grassroots empowerment.',
            hi: 'हर चम्मच में है प्रामाणिकता, शुद्धता और ग्रामीण भारत के स्वावलंबन का विश्वास।'
          },
          points: [
            {
              id: 'organic',
              icon: 'Leaf',
              title: { en: '100% Organic', hi: '१००% जैविक' },
              description: {
                en: 'Carefully selected ingredients grown naturally without synthetic fertilizers or harmful additives.',
                hi: 'प्राकृतिक रूप से उगाए गए मसाले, बिना किसी रासायनिक खाद या हानिकारक तत्वों के।'
              }
            },
            {
              id: 'chemical-free',
              icon: 'ShieldCheck',
              title: { en: 'Chemical Free', hi: 'रसायन मुक्त' },
              description: {
                en: 'A transparent, clean approach to spice processing that guarantees zero pesticide residues.',
                hi: 'मसालों की शुद्ध और पारदर्शी प्रक्रिया जो पूरी तरह रसायन और कीटनाशक मुक्त है।'
              }
            },
            {
              id: 'zero-additives',
              icon: 'Sparkles',
              title: { en: 'Zero Added Flavours & Colours', hi: 'शून्य कृत्रिम रंग व स्वाद' },
              description: {
                en: 'Letting the natural aroma, vibrant hue, and authentic pungency of each spice speak for itself.',
                hi: 'मसालों का प्राकृतिक रंग और सौंधी खुशबू बिना किसी कृत्रिम रंग या फ्लेवर के।'
              }
            },
            {
              id: 'stemless',
              icon: 'CheckCircle2',
              title: { en: 'Stemless Chilli', hi: 'डंठल-रहित मिर्च' },
              description: {
                en: 'Meticulously destemmed chillies before grinding for superior smoothness, purity, and rich color.',
                hi: 'पीसने से पहले डंठल अलग करने की विशेष प्रक्रिया, जिससे मिले बेहतर शुद्धता और गाढ़ा रंग।'
              }
            },
            {
              id: 'purpose',
              icon: 'HeartHandshake',
              title: { en: 'Crafted With Purpose', hi: 'सार्थक उद्देश्य' },
              description: {
                en: 'Connecting premium kitchen essentials with meaningful rural livelihoods and women empowerment.',
                hi: 'रसोई के शुद्ध स्वाद को ग्रामीण महिलाओं की आत्मनिर्भरता और गरिमा से जोड़ना।'
              }
            }
          ]
        }
      },
      {
        section: 'empowerment',
        data: {
          tagline: {
            en: 'Social Impact',
            hi: 'सामाजिक प्रभाव'
          },
          title: {
            en: 'Empowering Women. Strengthening Rural Businesses.',
            hi: 'महिला सशक्तिकरण। ग्रामीण उद्यमों की मजबूती।'
          },
          heading: {
            en: 'More Than Spices. A Purpose to Empower.',
            hi: 'सिर्फ मसाले नहीं, बदलाव की एक पहल।'
          },
          story: {
            en: 'Tikhori Foods believes that meaningful economic growth begins at the grassroots level. By partnering with women entrepreneurs and rural micro-enterprises, we help establish sustainable processing clusters, provide fair earnings, and foster financial independence for rural households.',
            hi: 'टिखोरी फूड्स का मानना है कि वास्तविक आर्थिक उन्नति की शुरुआत ज़मीनी स्तर से होती है। ग्रामीण महिला उद्यमियों और छोटे व्यवसायों के साथ जुड़कर, हम टिकाऊ रोजगार, उचित आय और महिलाओं की आर्थिक स्वतंत्रता को बढ़ावा देते हैं।'
          },
          pillars: [
            {
              title: { en: 'Economic Independence', hi: 'आर्थिक आत्मनिर्भरता' },
              description: { en: 'Fair pricing and direct market access for women-led processing collectives.', hi: 'महिला स्वयं-सहायता समूहों के लिए उचित मूल्य और सीधा बाजार।' }
            },
            {
              title: { en: 'Grassroots Entrepreneurship', hi: 'ग्रामीण उद्यमिता' },
              description: { en: 'Encouraging rural small businesses through equipment, grading training, and clean storage.', hi: 'उपकरण, गुणवत्ता प्रशिक्षण और सुरक्षित भंडारण के माध्यम से ग्रामीण व्यापार को बढ़ावा।' }
            },
            {
              title: { en: 'Dignity Through Work', hi: 'काम से सम्मान' },
              description: { en: 'Honoring the traditional wisdom of rural women with modern opportunities.', hi: 'ग्रामीण महिलाओं के पारंपरिक कौशल को आधुनिक अवसरों से जोड़कर आत्मनिर्भर बनाना।' }
            }
          ]
        }
      },
      {
        section: 'qualityProcess',
        data: {
          tagline: {
            en: 'Our Philosophy',
            hi: 'हमारी कार्यशैली'
          },
          title: {
            en: 'The Journey from Farm to Kitchen',
            hi: 'खेत से रसोई तक का सफर'
          },
          subtitle: {
            en: 'How we preserve natural aroma, purity, and nutrients at every step.',
            hi: 'शुद्धता और पोषण बनाए रखने की पारदर्शी प्रक्रिया।'
          },
          steps: [
            {
              step: '01',
              title: { en: 'Careful Selection', hi: 'उत्तम चयन' },
              description: { en: 'Hand-sorted raw spices sourced directly from certified organic partner growers.', hi: 'प्राकृतिक रूप से उपजे उत्तम मसालों की हाथ से छंटाई।' }
            },
            {
              step: '02',
              title: { en: 'Stemming & Cleaning', hi: 'सफाई व डंठल निकालना' },
              description: { en: 'Thorough destemming and traditional solar drying under hygienic conditions.', hi: 'धूल-मिट्टी और डंठल को अलग कर स्वच्छ धूप में सुखाना।' }
            },
            {
              step: '03',
              title: { en: 'Gentle Grinding', hi: 'पारंपरिक पिसाई' },
              description: { en: 'Low-temperature slow stone milling to lock in volatile oils and natural color.', hi: 'धीमी गति से पिसाई ताकि प्राकृतिक तेल और खुशबू सुरक्षित रहें।' }
            },
            {
              step: '04',
              title: { en: 'Aroma-Lock Packaging', hi: 'सुरक्षित पैकेजिंग' },
              description: { en: 'Hermetically sealed food-grade pouches that preserve aroma and protect from moisture.', hi: 'नमी-रोधी फूड-ग्रेड पाउच में सीलिंग ताकि ताजगी बनी रहे।' }
            },
            {
              step: '05',
              title: { en: 'Your Kitchen', hi: 'आपकी रसोई' },
              description: { en: 'Delivering authentic, chemical-free flavor to elevate every family meal.', hi: 'आपकी थाली तक बिना किसी मिलावट का प्रामाणिक स्वाद।' }
            }
          ]
        }
      },
      {
        section: 'about',
        data: {
          tagline: {
            en: 'About Tikhori Foods',
            hi: 'टिखोरी फूड्स के बारे में'
          },
          title: {
            en: 'Authentic Spices. Clean Ingredients. Social Mission.',
            hi: 'प्रामाणिक मसाले। शुद्ध सामग्री। सामाजिक संकल्प।'
          },
          story: {
            en: 'Tikhori Foods was founded with a single mission: to return Indian cooking to its purest roots while creating meaningful livelihoods for rural women. We reject shortcuts, artificial enhancements, and chemical additives in favor of authentic aroma, rich flavors, and ethical practices.',
            hi: 'टिखोरी फूड्स की शुरुआत एक स्पष्ट उद्देश्य के साथ हुई: भारतीय रसोई को उसकी शुद्धतम जड़ों से जोड़ना और साथ ही ग्रामीण महिलाओं के लिए सम्मानजनक आजीविका का निर्माण करना। हम रसायनों और कृत्रिम मिलावट को नकारते हुए प्रामाणिक स्वाद को प्राथमिकता देते हैं।'
          },
          philosophy: {
            en: 'We believe good food starts with honest farming, careful processing, and community respect. Every blend we craft reflects patience, purity, and our profound love for India’s spice heritage.',
            hi: 'हमारा मानना है कि अच्छा भोजन ईमानदार खेती, पारदर्शी प्रसंस्करण और समाज के प्रति सम्मान से शुरू होता है।'
          }
        }
      },
      {
        section: 'footer',
        data: {
          brandStatement: {
            en: 'Tikhori Foods is dedicated to pure, organic Indian spices crafted with traditional integrity while fostering grassroots women entrepreneurship.',
            hi: 'टिखोरी फूड्स शुद्ध और जैविक भारतीय मसालों के साथ-साथ ग्रामीण महिला उद्यमियों के सशक्तिकरण के लिए समर्पित है।'
          },
          copyright: {
            en: '© 2026 Tikhori Foods. All rights reserved.',
            hi: '© २०२६ टिखोरी फूड्स। सर्वाधिकार सुरक्षित।'
          }
        }
      }
    ];

    for (const item of cmsContents) {
      await Content.create(item);
    }
    console.log(`[Seed]: Seeded ${cmsContents.length} CMS content sections.`);

    // 4. Seed Initial Women Entrepreneur Profiles
    const entrepreneursData = [
      {
        name: 'Sunita Patil',
        location: 'Satara, Maharashtra',
        photo: '',
        businessName: {
          en: 'Maa Annapurna Spice Collective',
          hi: 'मां अन्नपूर्णा मसाला समूह'
        },
        story: {
          en: 'Sunita started her small-scale spice grading micro-enterprise with Tikhori Foods. Today, she leads a group of 8 women from her village, ensuring fair wages and economic self-sufficiency.',
          hi: 'सुनीता जी ने टिखोरी फूड्स के साथ जुड़कर मसाला सफाई और ग्रेडिंग का छोटा व्यवसाय शुरू किया। आज वे अपने गांव की ८ महिलाओं के समूह का नेतृत्व करती हैं।'
        },
        journey: {
          en: 'From home-maker to recognized rural entrepreneur managing raw chilli sorting and grading.',
          hi: 'गृहिणी से एक सम्मानित ग्रामीण उद्यमी बनने तक का प्रेरणादायी सफर।'
        },
        quote: {
          en: 'Earning our own income gave us a voice in our families and pride in our work.',
          hi: 'अपनी कमाई ने हमें परिवार में निर्णय लेने का अधिकार और काम में गर्व दिया है।'
        },
        isActive: true,
        sortOrder: 1
      },
      {
        name: 'Savita Meena',
        location: 'Sikar, Rajasthan',
        photo: '',
        businessName: {
          en: 'Shree Kripa Agri Processing',
          hi: 'श्री कृपा कृषि प्रसंस्करण'
        },
        story: {
          en: 'Partnering with Tikhori Foods allowed Savita to build a solar drying station for organic coriander, training fellow village women in clean post-harvest handling.',
          hi: 'टिखोरी फूड्स के सहयोग से सविता जी ने जैविक धनिया सुखाने के लिए सोलर ड्रायर यूनिट लगाई और गांव की अन्य महिलाओं को प्रशिक्षण दिया।'
        },
        journey: {
          en: 'Pioneered clean spice drying techniques in her block.',
          hi: 'अपने क्षेत्र में स्वच्छ मसाला प्रसंस्करण की नई शुरुआत की।'
        },
        quote: {
          en: 'Quality spices bring taste to homes, and clean work brings dignity to our lives.',
          hi: 'शुद्ध मसाले घरों में स्वाद लाते हैं, और सम्मानजनक काम हमारे जीवन में खुशहाली लाता है।'
        },
        isActive: true,
        sortOrder: 2
      }
    ];

    await Entrepreneur.insertMany(entrepreneursData);
    console.log(`[Seed]: Seeded ${entrepreneursData.length} women entrepreneur profiles.`);

    // 5. Seed Promotional Banner
    const bannerData = {
      title: {
        en: 'The Taste of True Purity',
        hi: 'सच्ची शुद्धता का प्रामाणिक स्वाद'
      },
      subtitle: {
        en: '100% Organic • Chemical Free • Supporting Rural Women',
        hi: '१००% जैविक • रसायन मुक्त • ग्रामीण महिलाओं का सहयोग'
      },
      description: {
        en: 'Experience the distinction of slow-ground, stemless Indian spices crafted without artificial colours or synthetic preservatives.',
        hi: 'बिना किसी कृत्रिम रंग या मिलावट के पारंपरिक तरीके से पिसे भारतीय मसालों का अनूठा अनुभव।'
      },
      image: '/assets/products/product-1.png',
      ctaText: {
        en: 'Explore Products',
        hi: 'मसाले देखें'
      },
      ctaLink: '#products',
      badge: {
        en: 'Harvest Special',
        hi: 'विशेष संकलन'
      },
      isActive: true,
      sortOrder: 1
    };
    await Banner.create(bannerData);
    console.log('[Seed]: Seeded promotional banner.');

    // 6. Seed Default Settings
    const settingData = {
      brandName: 'Tikhori Foods',
      tagline: {
        en: 'Spice Crafted Right',
        hi: 'स्वाद और शुद्धता का सही संगम'
      },
      logo: '/assets/logo/logo.png',
      contactEmail: 'contact@tikhorifoods.com',
      contactPhone: '+91 98765 43210',
      address: {
        en: 'Plot 42, Spice Industrial Zone, Rural Enterprise Corridor, India',
        hi: 'प्लॉट 42, मसाला औद्योगिक क्षेत्र, ग्रामीण उद्यमिता कॉरिडोर, भारत'
      },
      businessHours: {
        en: 'Monday to Saturday: 9:00 AM - 6:00 PM IST',
        hi: 'सोमवार से शनिवार: सुबह 9:00 बजे से शाम 6:00 बजे तक'
      },
      socialLinks: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        linkedin: 'https://linkedin.com'
      },
      defaultLanguage: 'en'
    };
    await Setting.create(settingData);
    console.log('[Seed]: Seeded brand settings.');

    // 7. Seed Sample Client/User
    const sampleUser = {
      username: 'rajesh_sharma',
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@example.com',
      password: 'User@Tikhori2026',
      phone: '+91 98111 22334',
      companyOrStore: 'Sharma Organic Store',
      city: 'Pune',
      status: 'active',
      notes: 'Wholesale retailer interested in Red Chilli and Turmeric Powder'
    };
    await User.create(sampleUser);
    console.log('[Seed]: Seeded sample client/user.');

    console.log('\n[Seed Success]: Database successfully populated with initial data!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
