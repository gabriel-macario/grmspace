$(document).ready(function() {
  //Verb Constructor
  function Verb(def, root, conj0, conj1, conj2, conj3) {
    this.def = def;
    this.root = root;
    this.conjugations = [conj0, conj1, conj2, conj3];
    this.aconjugations = [];
  }

  //AltVerb Constructor - Used for verbs with correct alternate conjugations
  function AltVerb(def, root, conj0, conj1, conj2, conj3, aconj0, aconj1) {
    this.def = def;
    this.root = root;
    this.conjugations = [conj0, conj1, conj2, conj3];
    this.aconjugations = [aconj0, aconj1];
  }

  //Answer Constructor - Used to store displayed answers and checked answers
  function Answer(show, conjugations) {
    this.show = show;
    this.conjugations = conjugations;
  }

  //CellHtml Function - Returns String for Cell Html with Passed Classes
  function CellHtml(content, classes) {
    return "<td class='" + classes + "'>" + content + "</td>";
  }

  //RowHtml Function - Used in Conjugtion with CellHtml of a row that contains passed in strings
  function RowHtml() {
    var toReturn = "<tr>";
    for (var i = 0; i < arguments.length; i++) {
      var cell = arguments[i];
      toReturn += cell;
    }
    toReturn += "/tr";
    return toReturn;
  }

  //Array Declaration
  var verbArr = [];
  var answerArr = [];

  //Verb Arrays
   var umVerbs = [
    new Verb("leave", "alis", "umalis", "umalis", "umaalis", "aalis"),
    new Verb("read", "basa", "bumasa", "bumasa", "bumabasa", "babasa"),
    new Verb("count", "bilang", "bumilang", "bumilang", "bumibilang", "bibilang"),
    new Verb("buy", "bili", "bumili", "bumili", "bumibili", "bibili"),
    new Verb("pass", "daan", "dumaan", "dumaan", "dumadaan", "dadaan"),
    new Verb("wake up", "gising", "gumising", "gumising", "gumigising", "gigising"),
    new Verb("look for", "hanap", "humanap", "humanap", "humahanap", "hahanap"),
    new Verb("borrow", "hiram", "humiram", "humiram", "humihiram", "hihiram"),
    new Verb("drink", "inom", "uminom", "uminom", "umiinom", "iinom"),
    new Verb("eat", "kain", "kumain", "kumain", "kumakain", "kakain"),
    new Verb("sing", "kanta", "kumanta", "kumanta", "kumakanta", "kakanta"),
    new Verb("get", "kuha", "kumuha", "kumuha", "kumukuha", "kukuha"),
    new Verb("go out", "labas", "lumabas", "lumabas", "lumalabas", "lalabas"),
    new Verb("walk", "lakad", "lumakad", "lumakad", "lumalakad", "lalakad"),
    new Verb("swim", "langoy", "lumangoy", "lumangoy", "lumalangoy", "lalangoy"),
    new Verb("enter", "pasok", "pumasok", "pumasok", "pumapasok", "papasok"),
    new Verb("choose", "pili", "pumili", "pumili", "pumipili", "pipili"),
    new Verb("go", "punta", "pumunta", "pumunta", "pumupunta", "pupunta"),
    new Verb("ride", "sakay", "sumakay", "sumakay", "sumasakay", "sasakay"),
    new Verb("go with", "sama", "sumama", "sumama", "sumasama", "sasama"),
    new Verb("dance", "sayaw", "sumayaw", "sumayaw", "sumasayaw", "sasayaw"),
    new Verb("write", "sulat", "sumulat", "sumulat", "sumusulat", "susulat"),
    new Verb("run", "takbo", "tumakbo", "tumakbo", "tumatakbo", "tatakbo"),
    new Verb("recite a poem", "tula", "tumula", "tumula", "tumutula", "tutula"),
    new Verb("jump", "talon", "tumalon", "tumalon", "tumatalon", "tatalon"),
    new Verb("laugh", "tawa", "tumawa", "tumawa", "tumatawa", "tatawa"),
    new Verb("stand", "tayo", "tumayo", "tumayo", "tumatayo", "tatayo"),
    new Verb("look", "tingin", "tumingin", "tumingin", "tumitingin", "titingin"),
    new Verb("help", "tulong", "tumulong", "tumulong", "tumutulong", "tutulong"),
    new Verb("come in", "tuloy", "tumuloy", "tumuloy", "tumutuloy", "tutuloy"),
    new Verb("sit", "upo", "umupo", "umupo", "umuupo", "uupo"),
    new Verb("go home", "uwi", "umuwi", "umuwi", "umuuwi", "uuwi"),
    new Verb("expect", "asa", "umasa", "umasa", "umaasa", "aasa"),
    new Verb("shake one's head", "iling", "umiling", "umiling", "umiiling", "iiling"),
    new Verb("think", "isip", "umisip", "umisip", "umiisip", "iisip"),
    new Verb("grind", "giling", "gumiling", "gumiling", "gumigiling", "gigiling"),
    new Verb("draw", "guhit", "gumuhit", "gumuhit", "gumuguhit", "guguhit"),
    new Verb("recover from sickness", "galing", "gumaling", "gumaling", "gumagaling", "gagaling"),
    new Verb("cough", "ubo", "umubo", "umubo", "umuubo", "uubo"),
    new Verb("cry", "iyak", "umiyak", "umiyak", "umiiyak", "iiyak"),
    new Verb("attract", "akit", "umakit", "umakit", "umaakit", "aakit"),
    new Verb("turn around", "ikot", "umikot", "umikot", "umiikot", "iikot")
  ];
  var magVerbs = [
    new Verb("shave", "ahit", "mag-ahit", "nag-ahit", "nag-aahit", "mag-aahit"),
    new Verb("breakfast", "almusal", "mag-almusal", "nag-almusal", "nag-aalmusal", "mag-aalmusal"),
    new Verb("study", "aral", "mag-aral", "nag-aral", "nag-aaral", "mag-aaral"),
    new Verb("(play) basketball", "basketbol", "magbasketbol", "nagbasketbol", "nagbabasketbol", "magbabasketbol"),
    new Verb("give", "bigay", "magbigay", "nagbigay", "nagbibigay", "magbibigay"),
    new Verb("get dressed", "bihis", "magbihis", "nagbihis", "nagbibihis", "magbibihis"),
    new Verb("bowl", "boling", "magboling", "nagboling", "nagboboling", "magboboling"),
    new Verb("wash ones's face", "hilamos", "maghilamos", "naghilamos", "naghihilamos", "maghihilamos"),
    new Verb("wait", "hintay", "maghintay", "naghintay", "naghihintay", "maghihintay"),
    new Verb("see each other", "kita", "magkita", "nagkita", "nagkikita", "magkikita"),
    new Verb("wash", "laba", "maglaba", "naglaba", "naglalaba", "maglalaba"),
    new Verb("play", "laro", "maglaro", "naglaro", "naglalaro", "maglalaro"),
    new Verb("put away / clear", "ligpit", "magligpit", "nagligpit", "nagliligpit", "magliligpit"),
    new Verb("clean", "linis", "maglinis", "naglinis", "naglilinis", "maglilinis"),
    new Verb("watch / observe", "masid", "magmasid", "nagmasid", "nagmamasid", "magmamasid"),
    new Verb("snack", "merienda", "magmerienda", "nagmerienda", "nagmemerienda", "magmemerienda"),
    new Verb("(have a) meeting", "miting", "magmiting", "nagmiting", "nagmimiting", "magmimiting"),
    new Verb("speak", "salita", "magsalita", "nagsalita", "nagsasalita", "magsasalita"),
    new Verb("return", "sauli", "magsauli", "nagsauli", "nagsasauli", "magsasauli"),
    new Verb("smoke cigarettes", "sigarilyo", "magsigarilyo", "nagsigarilyo", "nagsisigarilyo", "magsisigarilyo"    ),
    new Verb("go to church", "simba", "magsimba", "nagsimba", "nagsisimba", "magsisimba"),
    new Verb("(see a) movie", "sine", "magsine", "nagsine", "nagsisine", "magsisine"),
    new Verb("brush (teeth)", "sipilyo", "magsipilyo", "nagsipilyo", "nagsisipilyo", "magsisipilyo"),
    new Verb("comb", "suklay", "magsuklay", "nagsuklay", "nagsusuklay", "magsusuklay"),
    new Verb("work", "trabaho", "magtrabaho", "nagtrabaho", "nagtratrabaho", "magtratrabaho"),
    new Verb("teach", "turo", "magturo", "nagturo", "nagtuturo", "magtuturo"),
    new Verb("talk to each other", "usap", "mag-usap", "nag-usap", "nag-uusap", "mag-uusap"),
    new Verb("plant", "tanim", "magtanim", "nagtanim", "nagtatanim", "magtatanim"),
    new Verb("carve", "ukit", "mag-ukit", "nag-ukit", "nag-uukit", "mag-uukit"),
    new Verb("leave something behind", "iwan", "mag-iwan", "nag-iwan", "nag-iiwan", "mag-iiwan"),
    new Verb("sell", "tinda", "magtinda", "nagtinda", "nagtitinda", "magtitinda"),
    new Verb("(take an) exam (?)", "iksamin","mag-iksamin", "nag-iksamin", "nag-iiksamin", "mag-iiksamin"),
    new Verb("put on shoes (?)", "sapatos", "magsapatos", "nagsapatos", "nagsasapatos", "magsasapatos"),
    new Verb("plow", "araro", "mag-araro", "nag-araro", "nag-aararo", "mag-aararo"),
    new Verb("snack on something (?)", "isnak", "mag-isnak", "nag-isnak", "nag-iisnak", "mag-iisnak")
  ];
  var maVerbs = [
    new Verb("(be able to) read", "basa", "mabasa", "nabasa",  "nababasa",  "mababasa"),
    new Verb( "(go) fishing (??)", "bingwit", "mabingwit", "nabingwit", "nabibingwit", "mabibingwit"),
    new Verb( "(be) full", "busog", "mabusog", "nabusog", "nabubusog", "mabubusog"),
    new Verb( "(get) angry", "galit", "magalit", "nagalit", "nagagalit", "magagalit"),
    new Verb( "(get) hungry", "gutom", "magutom", "nagutom", "nagugutom", "magugutom"),
    new Verb("(be) late", "huli", "mahuli", "nahuli", "nahuhuli", "mahuhuli"),
    new Verb("fall", "hulog", "mahulog", "nahulog", "nahuhulog", "mahuhulog"),
    new Verb("leave behind", "iwan", "maiwan", "naiwan", "naiiwan", "maiiwan"),
    new Verb("(to) bear", "kaya", "makaya", "nakaya", "nakakaya", "makakaya"),
    new Verb("listen", "kinig", "makinig", "nakinig", "nakikinig", "makikinig"),
    new Verb("get", "kuha", "makuha", "nakuha", "nakukuha", "makukuha"),
    new Verb("bathe", "ligo", "maligo", "naligo", "naliligo", "maliligo"),
    new Verb( "(be) confused", "lito", "malito", "nalito", "nalilito", "malilito"),
    new Verb( "(become) crazy", "loko", "maloko", "naloko", "naloloko", "maloloko"),
    new Verb( "view / watch", "nood", "manood", "nanood", "nanonood", "manonood"),
    new Verb( "(get) tired", "pagod", "mapagod", "napagod", "napapagod", "mapapagod"),
    new Verb( "reach", "rating", "marating", "narating", "nararating", "mararating"),
    new Verb("(be) frightened", "takot", "matakot", "natakot", "natatakot", "matatakot"),
    new Verb("sleep", "tulog", "matulog", "natulog", "natutulog", "matutulog"),
    new Verb("learn", "tuto", "matuto", "natuto", "natututo", "matututo"),
    new Verb("(be) glad", "tuwa", "matuwa", "natuwa", "natutuwa", "matutuwa"),
    new Verb("(get) thirsty", "uhaw", "mauhaw", "nauhaw", "nauuhaw", "mauuhaw")
  ];
  var mangVerbs = [
    new Verb("snatch", "agaw", "mang-agaw", "nang-agaw", "nang-aagaw", "mang-aagaw"),
    new Verb("comfort", "aliw", "mang-aliw", "nang-aliw", "nang-aaliw", "mang-aaliw"),
    new Verb("tease", "asar", "mang-asar", "nang-asar", "nang-aasar", "mang-aasar"),
    new Verb("come from", "galing", "manggaling", "nanggaling", "nanggagaling", "manggagaling"),
    new Verb("use", "gamot", "manggamot", "nanggamot", "nanggagamot", "manggagamot"),
    new Verb("barber", "gupit", "manggupit", "nanggupit", "nanggugupit", "manggugupit"),
    new Verb("fish", "isda", "mangisda", "nangisda", "nangingisda", "mangingisda"),
    new Verb("get", "kuha", "manguha", "nanguha", "nangunguha", "mangunguha"),
    new Verb("borrow", "utang", "mangutang", "nangutang", "nangungutang", "mangungutang"),
    new Verb("give birth", "anak", "manganak", "nanganak", "nanganganak", "manganganak"),
    new Verb("happen", "yari", "mangyari", "nangyari", "nangyayari", "mangyayari"),
    new Verb("bother", "abala", "mang-abala", "nang-abala", "nang-aabala", "mang-aabala"),
    new Verb("create disorder", "gulo", "manggulo", "nanggulo", "manggugulo", "manggugulo"),
    new Verb("deceive with a confidence trick", "gantso", "manggantso", "nanggantso", "nanggagantso", "manggagantso"),
    new Verb("go horseback riding", "kabayo", "mangabayo", "nangabayo", "nangangabayo", "mangangabayo"),
    new Verb("blacken", "itim", "mangitim", "nangitim", "nangingitim", "mangingitim"),
    new Verb("yearn", "ulila", "mangulila", "nangulila", "nangungulila", "mangungulila")
  ];
  var manVerbs = [
    new Verb("cheat", "daya", "mandaya", "nandaya", "nandadaya", "mandadaya"),
    new Verb("take out from a pocket (?)", "dukot", "manukot", "nanukot", "nanunukot", "manunukot"),
    new Verb("court / woo", "ligaw", "manligaw", "nanligaw", "nanliligaw", "manliligaw"),
    new Verb("confuse", "lito", "manlito", "nanlito", "nanlilito", "manlilito"),
    new Verb("fool", "loko", "manloko", "nanloko", "nanloloko", "manloloko"),
    new Verb("hurt", "sakit", "manakit", "nanakit", "nananakit", "mananakit"),
    new Verb("measure (?)", "sukat", "manukat", "nanukat", "nanunukat", "manunukat"),
    new Verb("write", "sulat", "manulat", "nanulat", "nanunulat", "manunulat"),
    new Verb("scare", "takot", "manakot", "nanakot", "nananakot", "mananakot"),
    new Verb("harden", "tigas", "manigas", "nanigas", "naninigas", "maninigas"),
    new Verb("recite/write a poem (?)", "tula", "manula", "nanula", "nanunula", "manunula")
  ];
  var mamVerbs = [
    new Verb("go boating", "bangka", "mamangka", "namangka", "namamangka", "mamamangka"),
    new Verb("pronounce", "bigkas", "mamigkas", "namigkas", "namimigkas", "mamimigkas"),
    new Verb("go shopping", "bili", "mamili", "namili", "namimili", "mamimili"),
    new Verb("angle (?)", "bingwit", "mamingwit", "namingwit", "namimingwit", "mamimingwit"),
    new Verb("pound (?)", "bugbog", "mamugbog", "namugbog", "namumugbog", "mamumugbog"),
    new Verb("visit and walk around", "pasyal", "mamasyal", "namasyal", "namamasyal", "mamamasyal"),
    new Verb("line up", "pila", "mamila", "namila", "namimila", "mamimila"),
    new Verb("choose", "pili", "mamili", "namili", "namimili", "mamimili"),
    new Verb("pick (fruits, etc)", "pitas", "mamitas", "namitas", "namimitas", "mamimitas"),
    new Verb("destroy", "puksa", "mamuksa", "namuksa", "namumuksa", "mamumuksa"),
    new Verb("blush", "pula", "mamula", "namula", "namumula", "mamumula"),
    new Verb("pick up", "pulot", "mamulot", "namulot", "namumulot", "mamumulot"),
    new Verb("wipe", "punas", "mamunas", "namunas", "namumunas", "mamumunas")
  ];
  var inVerbs = [
    new Verb("", "ayos", "ayusin", "inayos", "inaayos", "aayusin"),
    new Verb("", "basa", "basahin", "binasa", "binabasa", "babasahin"),
    new Verb("", "bawal", "bawalin", "binawal", "binabawal", "babawalin"),
    new Verb("", "bura", "burahin", "binura", "binubura", "buburahin"),
    new Verb("", "dala", "dalhin", "dinala", "dinadala", "dadalhin"),
    new Verb("", "gamot", "gamutin", "ginamot", "ginagamot", "gagamutin"),
    new Verb("", "gawa", "gawin", "ginawa", "ginagawa", "gagawin"),
    new Verb("", "gising", "gisingin", "ginising", "ginigising", "gigisingin"),
    new Verb("", "gupit", "gupitin", "ginupit", "ginugupit", "gugupitin"),
    new Verb("", "hingi", "hingin", "hiningi", "hinihingi", "hihingin"),
    new Verb("", "hiram", "hiramin", "hiniram", "hinihiram", "hihiramin"),
    new Verb("", "hukay", "hukayin", "hinukay", "hinuhukay", "huhukayin"),
    new Verb("", "inom", "inumin", "ininom", "iniinom", "iinumin"),
    new Verb("", "kamot", "kamutin", "kinamot", "kinakamot", "kakamutin"),
    new Verb("", "kanta", "kantahin", "kinanta", "kinakanta", "kakantahin"),
    new Verb("", "kopya", "kopyahin", "kinopya", "kinokopya", "kokopyahin"),
    new Verb("", "kuha", "kunin", "kinuha", "kinukuha", "kukunin"),
    new Verb("", "pitas", "pitasin", "pinitas", "pinipitas", "pipitasin"),
    new Verb("", "pulot", "pulutin", "pinulot", "pinupulot", "pupulutin"),
    new Verb("", "punit", "punitin", "pinunit", "pinupunit", "pupunitin"),
    new Verb("", "putol", "putulin", "pinutol", "pinuputol", "puputulin"),
    new Verb("", "sipa", "sipain", "sinipa", "sinisipa", "sisipain"),
    new Verb("", "suklay", "suklayin", "sinuklay", "sinusuklay", "susuklayin"),
    new Verb("", "sunod", "sundin", "sinunod", "sinusunod", "susundin"),
    new Verb("", "tiklop", "tiklupin", "tiniklop", "tinitiklop", "titiklupin"),
    new Verb("", "walis", "walisin", "winalis", "winawalis", "wawalisin"),
    new Verb("", "wasak", "wasakin", "winasak", "winawasak", "wawasakin"),
    new AltVerb("", "linis", "linisin", "nilinis", "nililinis", "lilinisin", "lininis", "linilinis"),
    new AltVerb("", "luto", "lutuin", "niluto", "niluluto", "lulutuin", "linuto", "linuluto")
  ];
  var anVerbs = [
    new Verb("", "alaga", "alagaan", "inalagaan", "inaalagaan", "aalagaan"),
    new Verb("", "awit", "awitan", "inawitan", "inaawitan", "aawitan"),
    new Verb("", "ayos", "ayusan", "inayusan", "inaayusan", "aayusan"),
    new Verb("", "bukas", "buksan", "binuksan", "binubuksan", "bubuksan"),
    new Verb("", "halik", "halikan", "hinalikan", "hinahalikan", "hahalikan"),
    new Verb("", "hugas", "hugasan", "hinugasan", "hinuhugasan", "huhugasan"),
    new Verb("", "palit", "palitan", "pinalitan", "pinapalitan", "papalitan"),
    new Verb("", "pinta", "pintahan", "pinintahan", "pinipintahan", "pipintahan"),
    new Verb("", "punas", "punasan", "pinunasan", "pinupunasan", "pupunasan"),
    new Verb("", "sara", "sarhan", "sinarhan", "sinasarhan", "sasarhan"),
    new Verb("", "sayaw", "sayawan", "sinayawan", "sinasayawan", "sasayawan"),
    new Verb("", "takip", "takpan", "tinakpan", "tinatakpan", "tatakpan"),
    new Verb("", "tawag", "tawagan", "tinawagan", "tinatawagan", "tatawagan"),
    new Verb("", "tulong", "tulungan", "tinulungan", "tinutulungan", "tutulungan"),
    new Verb("", "walis", "walisan", "winalisan", "winawalisan", "wawalisan"),
    new AltVerb("", "laba", "labhan", "nilabhan", "nilalabhan", "lalabhan", "linabhan", "linalabhan"),
    new AltVerb("", "lagay", "lagyan", "nilagyan", "nilalagyan", "lalagyan", "linagyan", "linalagyan"),
    new AltVerb("", "luto", "lutuan", "nilutuan", "nilulutuan", "lulutuan", "linutuan", "linulutuan")
  ];
  var iVerbs = [
    new Verb("", "alis", "ialis", "inialis", "iniaalis", "iaalis"),
    new Verb("", "basa", "ibasa", "ibinasa", "ibinabasa", "ibabasa"),
    new Verb("", "bigay", "ibigay", "ibinigay", "ibinibigay", "ibibigay"),
    new Verb("", "gawa", "igawa", "iginawa", "iginagawa", "igagawa"),
    new Verb("", "kopya", "ikopya", "ikinopya", "ikinokopya", "ikokopya"),
    new Verb("", "pasa", "ipasa", "ipinasa", "ipinapasa", "ipapasa"),
    new Verb("", "pilit", "ipilit", "ipinilit", "ipinipilit", "ipipilit"),
    new Verb("", "prito", "iprito", "ipinirito", "ipiniprito", "ipriprito"),
    new Verb("", "sara", "isara", "isinara", "isinasara", "isasara"),
    new Verb("", "sauli", "isauli", "isinauli", "isinasauli", "isasauli"),
    new Verb("", "sayaw", "isayaw", "isinayaw", "isinasayaw", "isasayaw"),
    new Verb("", "sulat", "isulat", "isinulat", "isinusulat", "isusulat"),
    new Verb("", "tago", "itago", "itinago", "itinatago", "itatago"),
    new Verb("", "tanim", "itanim", "itinanim", "itinatanim", "itatanim"),
    new Verb("", "tapon", "itapon", "itinapon", "itinatapon", "itatapon"),
    new Verb("", "tiklop", "itiklop", "itiniklop", "itinitiklop", "ititiklop"),
    new Verb("", "tuloy", "ituloy", "itinuloy", "itinutuloy", "itutuloy"),
    new Verb("", "turo", "ituro", "itinuro", "itinuturo", "ituturo"),
    new AltVerb("", "laba", "ilaba", "inilaba", "inilalaba", "ilalaba", "ilinaba", "ilinalaba"),
    new AltVerb("", "lagay", "ilagay", "inilagay", "inilalagay", "ilalagay", "ilinagay", "ilinalagay"),
    new AltVerb("", "lakad", "ilakad", "inilakad", "inilalakad", "ilalakad", "ilinakad", "ilinalakad"),
    new AltVerb("", "luto", "iluto", "iniluto", "iniluluto", "iluluto", "ilinuto", "ilinuluto")
  ];

  //Time Element Arrays
  var presPhrases = [
    "ngayon", "kasalukyan", "ngayong araw", "araw-araw", "gabi-gabi", "linggu-linggo", "buwan-buwan", "taun-taon", "oras-oras", "tuwing"
  ]
  var pastPhrases = [
    "kanina", "kahapon", "kagabi", "kamakalawa", "noong araw", "noong unang panahon", "noong isang linggo", "noong isang buwan", "noong isang taon"
  ];
  var futPhrases = [
    "mamaya", "bukas", "samakalawa", "balang araw", "sa hinaharap"
  ];
  var days = [
    "Linggo", "Lunes", "Martes", "Miyerkoles", "Huwebes", "Biyernes", "Sabado"
  ];
  var months = [
    "Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"
  ];
  var timeParts = [
    "araw", "linggo", "buwan", "taon"
  ];
  var dayParts = [
    "umaga", "hapon", "gabi"
  ];

  //TimePhrase Function: combines pre and each element of arr2 and pushes it onto arr1. Used to populate various time element arrays.
  function PushTimePhrases(arr1, arr2, pre) {
    $.each(arr2, function(key, val) {
      var str = pre + " " + val;
      arr1.push(str);
    });

  }

  //Helper Functions

  //FormatAnswer: Removes spaces and makes strings lowercase - Used to format user answers
  function FormatAnswer (str) {
    var toReturn = str.toLowerCase().replace(/\s/g, '');
    return toReturn;
  }

  //ChooseRand Function: Chooses a random value from passed in arr.
  function ChooseRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  //SwapEle Function: Swaps y and z elements given arr and returns arr
  function SwapEle(arr, x, y) {
    var temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
  }

  //ShuffleArr Function: Shuffles the last x elements of arr
  function ShuffleLast(arr, x) {
    var num = 0;
    //If x is longer than arr, then shuffles all.
    if (x > arr.length) {
      num = arr.length;
    } else {
      num = x;
    }

    for (var i = arr.length - 1; i >= arr.length - num; i--) {
      SwapEle(arr, Math.floor(Math.random() * (i + 1)), i);
    }
  }

  //SelectLast Function: Returns last x elements of arr
  function SelectLast(arr, x) {
    var num = 0;
    //If x is longer than arr, then shuffles all.
    if (x > arr.length) {
      num = arr.length;
    } else {
      num = x;
    }

    var tempArr = [];
    for (var i = arr.length - 1; i >= arr.length - num; i--) {
      tempArr.push(arr[i]);
    }
    return tempArr;
  }

  //ShuffleSelectLast Function: Returns last x elements of shuffled arr
  function ShuffleSelectLast(arr, x) {
    ShuffleLast(arr, x);
    return SelectLast(arr, x);
  }

  //SelectTense: Randomly returns 1-3: 1=past 2=present 3=fut
  function SelectTense(){
    return Math.floor(Math.random() * 3 + 1);
  }

  //SelectTimeType: Randomly returns 0-3: [0, 2]->time phrase; 3->verb conjugation
  function SelectEleType () {
    return Math.floor(Math.random() * 4);
  }

  //SelectsPhraseExample: Returns a phrase of the appropriate type from the correct tense
  function SelectPhraseExample(tense) {
    switch (tense) {
      case 1:
        return ChooseRand(pastPhrases);
      case 2:
        return ChooseRand(presPhrases);
      case 3:
        return ChooseRand(futPhrases);
    }
  }
  //SelecctVerbExample: Randomly Chooses a verb of proper tense from verbArr that is not ansKey, returns nothing if verbArr < 2 (loop problem)
  function SelectVerbExample(tense, ansKey) {
    if (verbArr.lengh < 2) {
      return;
    } else {
      var example = ChooseRand(verbArr).conjugations[tense];
      while (example === ansKey) {
        example = ChooseRand(verbArr).conjugations[tense];
      }
      return example;
    }
  }
  //SelectEleExample: Passed a number and answer, returns appropriate example - [0, 2] -> PhraseExamle; 3 -> VerbExample
  function SelectExample(tense, ansKey) {
    var dice = SelectEleType();
    if (dice < 3) {
      return SelectPhraseExample(tense);
    } else {
      return SelectVerbExample(tense, ansKey);
    }
  }
  //ScrollTo Function: Scrolls to objId
  function ScrollTo(objId) {
    $("html, body").animate({
        scrollTop: $($(objId)).offset().top
      }, 100, 'linear');
  }

  //Makes Conjugation Table for User Input
  function GenInputTable(arr) {
    //Clears Previous Table
    $("#disp").empty();
    $("#btnDisp").removeClass("d-none");

    //Table Skeleton
    var tableHtml =
      '<table id="verbTable" class="table table-sm table-responsive-md table-bordered text-center">' +
      "<thead>" +
      "<tr>" +
      '<th scope="col">Salitang-ugat</th>' +
      '<th scope="col">Neutral</th>' +
      '<th scope="col">Perpektibo</th>' +
      '<th scope="col">Imperpektibo</th>' +
      '<th scope="col">Kontemplatibo</th>' +
      "</tr>" +
      "</thead>" +
      '<tbody id="verbTableBody">' +
      "</tbody>" +
      "</table>";

    //HTML String for tableRows to append
    var tableRows = "";

    $.each(arr, function(key, val) {
      var inf = val.conjugations[0];
      var past = val.conjugations[1];
      var pres = val.conjugations[2];
      var fut = val.conjugations[3];

      var rootCell = CellHtml(val.root, "align-middle root-cell");
      var infCell = CellHtml(inf, "align-middle");
      var pastCell = CellHtml(past, "align-middle");
      var presCell = CellHtml(pres, "align-middle");
      var futCell = CellHtml(fut, "align-middle");

      //checks for a conjugations and lists them
      if (val.aconjugations.length > 0) {
        past += "/" + val.aconjugations[0];
        pastCell = CellHtml(past, "align-middle aconj-cell");
        pres += "/" + val.aconjugations[1];
        presCell = CellHtml(pres, "align-middle aconj-cell");
      }

      tableRows += RowHtml(rootCell, infCell, pastCell, presCell, futCell);
    });

    $("#disp").html(tableHtml);

    $("#verbTableBody").append(tableRows);

    $("#verbTable > tbody > tr").each(function() {
      var exNum = Math.floor(Math.random() * 4 + 2);
      var exNumSelect = ":nth-child(" + exNum + ")";
      var rowAnswers = [];
      var rowShow = [];
      $(exNumSelect, this).addClass("example-cell");
      $(this)
        .find("td")
        .not(".root-cell, .example-cell")
        .each(function() {
          var cellContents = String($(this).html());
          var cellShow = $(this).html();
          var cellAnswer;
          if (cellContents.includes("/")) {
            cellAnswer = cellContents.split("/");
          } else {
            cellAnswer = $(this).html();
          }

          rowShow.push(cellShow);
          rowAnswers.push(cellAnswer);
          $(this).html(
            "<input type='text' class='form-control text-center' size='5'>"
          );
        });

      $("td > input[type='text']").on("change paste", function() {
        $(this).removeClass("incorrect no-answer");
      });

      $("td > input[type='text']").keypress(function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          var index = $("td > input[type='text']").index(this) + 1;
          $("td > input[type='text'").eq(index).focus();
          if(index === $("td > input[type='text']").length) {
            $("#check").focus();
          }
        }
      });

      answerArr.push(new Answer(rowShow, rowAnswers));
    }); //END OF TR FUNCTION;

    ScrollTo("thead");
  }

  //Generates Problems Basd On Time Elements
  function GenTimeProblems(arr) {
    $("#disp").empty();
    $("#btnDisp").removeClass("d-none");
    var conjEx = false;
    if ($("#yesConjTimeRadio").prop("checked") === true) {
      conjEx = true;
    }

    var listSkeleton = "<ul class='list-group mb-3' id='timeProblems'></ul>";
    var listItemHtml = "";

    //Start of $.each(arr, ...)
    $.each(arr, function(key, val) {
      var inf = val.conjugations[0];
      var ansTense = SelectTense();
      var altClass = "";
      var ans;

      if ((ansTense === 1 || ansTense === 2)&& val.aconjugations.length > 0) {
        ans = [val.conjugations[ansTense], val.aconjugations[ansTense-1]];
        altClass = "aconj-ans";
      } else {
        ans = val.conjugations[ansTense];
      }

      answerArr.push(ans);
      var timeEx;
      if (conjEx) {
        timeEx = SelectExample(ansTense, ans);
      } else {
        timeEx = SelectPhraseExample(ansTense);
      }
      var inpId = "answer-" + key;
      var dispId = "btnDisp-" + key;
      var showId = "show-" + key;
      var checkId = "check-" + key;


      listItemHtml +=
        '<li class="list-group-item pb-1">' +
          '<dl class="row mb-0">' +
            '<dt class="col-sm-3">Infinitive</dt>' +
            '<dd class="col-sm-9">' + inf + '</dd>' +
            '<dt class="col-sm-3">Time Element</dt>' +
            '<dd class="col-sm-9">' + timeEx + '</dd>' +
            '<dt class="col-sm-3 col-form-label"><label for="' + inpId + '">Answer</label></dt>' +
            '<dd class="col-sm-9">' +
              '<div class="row ">' +
                '<div class="col-sm-8">' +
                  '<input type="text" class="form-control ' + altClass + '" id="' + inpId + '" placeholder="Enter Answer">' +
                '</div>' +
                '<div class="col text-right">' +
                  '<div id="' + dispId + '">' +
                    '<button type="button" class="btn btn-info show-btn mr-2" id="' + showId + '">Show</button>' +
                    '<button type="button" class="btn btn-primary check-btn" id="' + checkId + '">Check</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</dd>' +
          '</dl>' +
        '</li>';

    });
    //End of $.each(arr, ....)

    $("#disp").html(listSkeleton);
    $("#timeProblems").append(listItemHtml);


    //.show-btn Click Assigment
    $(".show-btn").each(function (i) {
      var inpIdJQ = "#answer-" + i;
      var toShow = "";
      if ($(inpIdJQ).hasClass("aconj-ans")) {
          toShow = answerArr[i][0] + "/" + answerArr[i][1];
      } else {
        toShow = answerArr[i];
      }
      $(this).click(function() {
        $(inpIdJQ).removeClass("incorrect no-answer");
        $(inpIdJQ).val(toShow);
      });

    });

    $("li input[type='text']").each(function(i) {
      var toClick = "#check-" + i;
      //Clears Grading Marks On Change
      $(this).on("change paste", function() {
        $(this).removeClass("correct incorrect no-answer");
      });
      $(this).keypress(function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          $(this).blur();
          $("li input[type='text']").eq(i+1).focus();
          if(i === $("li input[type='text']").length - 1) {
            $("#check").focus();
          }
        }
      });
      $(this).click(function() {
        $(this).select();
      })
    });
    //.check-btn Click Assignment(...)
    $(".check-btn").each(function(i) {

      var inpIdJQ = "#answer-" + i;
      var ansKey;
      if ($(inpIdJQ).hasClass("aconj-ans")) {
        ansKey = [];
        ansKey.push(answerArr[i][0]);
        ansKey.push(answerArr[i][1]);
        ansKey.push(answerArr[i][0] + "/" + answerArr[i][1]);
        ansKey.push(answerArr[i][1] + "/" + answerArr[i][0]);
      } else {
        ansKey = answerArr[i];
      }

      $(this).click(function() {
        var userAns = FormatAnswer($(inpIdJQ).val());
        if(userAns === "") {
          $(inpIdJQ).addClass("no-answer");
        } else {
          if ($.isArray(ansKey) && ($.inArray(userAns, ansKey) > -1)) {
            $(inpIdJQ).addClass("correct");
          } else if (userAns === ansKey) {
            $(inpIdJQ).addClass("correct");
          } else {
            $(inpIdJQ).addClass("incorrect");
          }
        }
      });
    });
    //End of .check-btn Click Assignment

    ScrollTo("ul");
  }

  function ShowPrompt() {
    $("#disp").html(
      '<h1 class="display-4 text-center">Use Menu to Customize Problems</h1>'
    );
  }

  function ClearDisp() {
    ShowPrompt();
    $("#btnDisp").addClass("d-none");
  }

  function ScrollTo(objId) {
    $("html, body").animate({
        scrollTop: $($(objId)).offset().top
      }, 100, 'linear');
  }

  //GenerateTable Function: Populates verbArr, answerArr, and makes & displays #verbTable based on user selectioninput
  function Generate() {
    verbArr = [];
    answerArr = [];

    if ($("#umCheck").prop("checked") === true) {
      $.each(umVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#magCheck").prop("checked") === true) {
      $.each(magVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#maCheck").prop("checked") === true) {
      $.each(maVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#mangCheck").prop("checked") === true) {
      $.each(mangVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#manCheck").prop("checked") === true) {
      $.each(manVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#mamCheck").prop("checked") === true) {
      $.each(mamVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#inCheck").prop("checked") === true) {
      $.each(inVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#anCheck").prop("checked") === true) {
      $.each(anVerbs, function(key, value) {
        verbArr.push(value);
      });
    }
    if ($("#iCheck").prop("checked") === true) {
      $.each(iVerbs, function(key, value) {
        verbArr.push(value);
      });
    }

    if ($("#numVerbs").val() > verbArr.length) {
      $("#genBtnHelp").html("All Applicable Verbs Generated!");
    } else {
      $("#genBtnHelp").empty();
    }

    var probArr = ShuffleSelectLast(verbArr, $("#numVerbs").val());

    if ($("#tableRadio").prop("checked") === true) {
      GenInputTable(probArr);
    } else if ($("#timeRadio").prop("checked") === true) {
      GenTimeProblems(probArr);
    }
  }

  function CheckAnswers() {
    if ($("#verbTable").length > 0){
      $("#verbTable > tbody > tr").each(function(i) {
        $(this)
          .find("input")
          .not(".root-cell, .example-cell")
          .each(function(j) {
            $(this).removeClass("correct incorrect no-answer");
            var userInput = $(this)
              .val()
              .toLowerCase();
            var answerKey = [answerArr[i].show[j]];
            if ($.isArray(answerArr[i].conjugations[j])) {
              $.each(answerArr[i].conjugations[j], function(y, yval) {
                answerKey.push(yval);
              });
            }
            if (userInput === "") {
              $(this).addClass("no-answer");
            } else {
              //Else Grades Answer Given
              //Checks Alternate Conjugations
              if (answerKey.includes(userInput)) {
                $(this).addClass("correct");
              } else {
                $(this).addClass("incorrect");
              }
            }
          });
      });

      ScrollTo("thead");
    }
    else if ($("#timeProblems").length > 0) {
        $("li input[type='text']").each(function(i) {
          $("#check-" + i).click();
        });
        ScrollTo("#timeProblems");
    }
  }

  function ShowAnswers() {
    if ($("#verbTable").length > 0) {
      $("#verbTable > tbody > tr").each(function(i) {
        $(this)
          .find("input")
          .not(".root-cell, .example-cell")
          .each(function(j) {
            $(this).val(answerArr[i].show[j]);
            $(this).removeClass("correct incorrect no-answer");
          });
      });
    } else if ($("#timeProblems").length > 0) {

      $("li input[type='text']").each(function(i) {
          $(this).removeClass("correct incorrect no-answer");
          $("#show-" + i).click();
        });

      ScrollTo("#timeProblems");
    }
  }

  function ClearAnswers() {
    if ($("#verbTable").length > 0){
      $("#verbTable > tbody > tr").each(function(i) {
        $(this)
          .find("input")
          .not(".root-cell, .example-cell")
          .each(function(j) {
            $(this).val("");
            $(this).removeClass("correct incorrect no-answer");
          });
      });
    } else if ($("#timeProblems").length > 0) {

      $("li input[type='text']").each(function(i) {
          $(this).removeClass("correct incorrect no-answer");
          $(this).val("");
        });

      ScrollTo("#timeProblems");
    }
  }

  //Time Element Array Pushes
  //PastArr Push
  PushTimePhrases(pastPhrases, days, "noong");
  PushTimePhrases(pastPhrases, months, "noong");
  PushTimePhrases(pastPhrases, dayParts, "kaninang")
  PushTimePhrases(pastPhrases, timeParts, "noong nakraang");
  PushTimePhrases(presPhrases, dayParts, "ngagyong");
  PushTimePhrases(futPhrases, timeParts, "mamayang");
  PushTimePhrases(futPhrases, days, "sa");
  PushTimePhrases(futPhrases, months, "sa");
  PushTimePhrases(futPhrases, timeParts, "sa susunod na");
  PushTimePhrases(futPhrases, timeParts, "sa isang");
  //Click Event Assignment

  $("#gen").click(function() {

    var typeSelected = false;
    var numPositive = false;
    if ($('#verbSelect :input[type="checkbox"]:checked').length < 1) {
      $("#verbSelectHelp")
        .addClass("text-danger")
        .removeClass("text-muted");
      ScrollTo("#verbSelectHelp");
    } else {
      $("#verbSelectHelp")
        .removeClass("text-danger")
        .addClass("text-muted");
      typeSelected = true;
    }

    if ($("#numVerbs").val() < 1) {
      $("#numVerbsHelp")
        .addClass("text-danger")
        .removeClass("text-muted");
      ScrollTo("#numVerbs");
    } else {
      $("#numVerbsHelp")
        .removeClass("text-danger")
        .addClass("text-muted");
      numPositive = true;
    }

    if (typeSelected && numPositive) {
      Generate();
    }
  });

  $("#numVerbs").keypress(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#gen").click();
    }
  });

  $("#check").click(function() {
    CheckAnswers();
  });

  $("#show").click(function() {
    ShowAnswers();
  });

  $("#new").click(function() {
    $("#gen").click();
  });

  $("#clearAnswers").click(function() {
    ClearAnswers();
  });

  $("#allVerbCheck").click(function() {
    $(".all-verb-toggle").prop("checked", $(this).prop("checked"));
  });

  //Change Event for Verb Time Option
  //id="yesConjTimeRadio"
  $("#formatSelect").change(function() {
    if ($("#timeRadio").prop("checked") === true) {
      $("#conjTimeSelect").removeClass("d-none");
    } else {
      $("#conjTimeSelect").addClass("d-none");
    }
  });
});
