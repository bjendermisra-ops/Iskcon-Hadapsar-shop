// Illustrative opening catalog, NOT a verified inventory. Edit prices/variants here.
const bookNames = [
 ['Bhagavad-gita As It Is',250], ['Srimad-Bhagavatam · Canto 1',650],
 ['Sri Chaitanya-charitamrita · Adi-lila Vol. 1',600], ['Krishna Book',450],
 ['The Nectar of Devotion',300], ['The Nectar of Instruction',80],
 ['Sri Isopanisad',100], ['Teachings of Lord Chaitanya',250],
 ['Teachings of Queen Kunti',200], ['Teachings of Lord Kapila',200],
 ['The Science of Self-Realization',200], ['The Journey of Self-Discovery',180],
 ['Beyond Birth and Death',60], ['Easy Journey to Other Planets',60],
 ['Perfect Questions, Perfect Answers',100], ['Life Comes from Life',100],
 ['On the Way to Krishna',80], ['Raja-Vidya: The King of Knowledge',80],
 ['Elevation to Krishna Consciousness',80], ['Krishna Consciousness: The Topmost Yoga System',60]
];
const make=(id,name,category,image,description,variants)=>({id,name,category,image,description,variants:variants.map(([label,price],i)=>({id:String(i),label,price})),enabled:true});
export const products=[
 ...bookNames.map(([name,price],i)=>make('book-'+i,name,'Books','books','Explore devotional reading. Edition, language and availability will be confirmed by the temple shop.',[['Hindi',price],['English',price],['Marathi',price]])),
 make('kanthi-single','Tulsi Kanthi Mala','Malas','kanthi','Neck beads for devotional wear. Size and bead style subject to confirmation.',[['Single strand',60],['Double strand',100],['Triple strand',140]]),
 make('kanthi-small','Small-bead Kanthi Mala','Malas','kanthi','A simple small-bead neck mala. Confirm length before ordering.',[['Standard',80]]),
 make('japa-tulsi','Tulsi Japa Mala','Malas','malas','Chanting beads for daily japa. Confirm bead count and size with the shop.',[['Small beads',150],['Medium beads',200],['Large beads',280]]),
 make('japa-neem','Neem Japa Mala','Malas','malas','Wooden chanting beads for your daily practice.',[['Standard',120]]),
 make('counter','Japa Counter Beads','Malas','counter','Counter beads to help keep track of chanting rounds.',[['Standard',40]]),
 make('bag-cotton','Cotton Japa Bag','Accessories','bag','A cotton bag for keeping your chanting mala. Colour subject to availability.',[['Standard',100]]),
 make('bag-printed','Printed Japa Bag','Accessories','bag','Printed chanting bag. Pattern will be confirmed on WhatsApp.',[['Standard',150]]),
 make('bag-set','Japa Mala & Bag Set','Accessories','bag','A practical chanting set. Components will be confirmed before payment.',[['Set',250]]),
 make('tilak','Gopi Chandan Tilak','Puja','puja','Clay tilak for your daily devotional practice.',[['Small pack',40],['Large pack',80]]),
 make('tilak-stamp','Tilak Applicator','Puja','applicator','A tilak application accessory. Material and size subject to confirmation.',[['Standard',60]]),
 make('incense','Puja Incense Sticks','Puja','incense','Incense for your puja space. Fragrance subject to availability.',[['Sandal fragrance',60],['Rose fragrance',60]]),
 make('wicks','Cotton Diya Wicks','Puja','wicks','Cotton wicks for daily lamp offerings.',[['Pack',30]]),
 make('diya','Brass Diya','Puja','diya','A brass lamp for your home altar. Confirm exact size and design.',[['Small',180],['Medium',280]]),
 make('bell','Puja Bell','Puja','bell','A bell for your puja space. Confirm material and dimensions.',[['Small',200]]),
 make('plate','Puja Thali','Puja','thali','A puja plate for arranging offerings. Exact contents and size to be confirmed.',[['Small',250]]),
 make('altar-cloth','Altar Cloth','Accessories','cloth','Cloth for your home altar. Design and dimensions subject to confirmation.',[['Standard',150]]),
 make('book-stand','Scripture Book Stand','Accessories','stand','A stand for devotional reading. Material and size to be confirmed.',[['Standard',300]]),
 make('ghee','Gir Cow Ghee','Ghee','ghee','Gir cow ghee for your kitchen and puja. Packaging, ingredients, batch and availability must be confirmed with the shop.',[['500 g',850],['1 kg',1650]])
];
export const categories=['All','Books','Malas','Puja','Ghee','Accessories'];
