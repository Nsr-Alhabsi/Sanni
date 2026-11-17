/* Sample data — edit freely. Titles/descriptions are {ar, en} pairs. */
const CATS = [
  {id:"tech",   icon:"code",   ar:"برمجة وتقنية", en:"Tech & coding"},
  {id:"design", icon:"pen",    ar:"تصميم",        en:"Design"},
  {id:"media",  icon:"camera", ar:"تصوير وإعلام", en:"Photo & media"},
  {id:"biz",    icon:"brief",  ar:"ريادة وأعمال", en:"Business"},
  {id:"lang",   icon:"chat",   ar:"لغات",         en:"Languages"},
  {id:"craft",  icon:"craft",  ar:"حِرف ومهارات يدوية", en:"Crafts"}
];
const GOVS = [
  {id:"muscat",    ar:"مسقط",          en:"Muscat"},
  {id:"batinah",   ar:"شمال الباطنة",  en:"North Al Batinah"},
  {id:"dhofar",    ar:"ظفار",          en:"Dhofar"},
  {id:"dakhiliyah",ar:"الداخلية",      en:"Ad Dakhiliyah"},
  {id:"online",    ar:"عن بُعد",       en:"Online"}
];
const TYPES = [
  {id:"workshop", ar:"ورشة", en:"Workshop"},
  {id:"course",   ar:"دورة", en:"Course"},
  {id:"program",  ar:"برنامج تدريبي", en:"Training programme"},
  {id:"session",  ar:"جلسة", en:"Session"}
];
const PROVIDERS = [
  {id:"p1", kind:"org", ar:"استوديو عدسة", en:"Adasa Studio", gov:"muscat",
   bio:{ar:"استوديو للتصوير وصناعة المحتوى يقدّم ورشًا عملية للمبتدئين.", en:"A photo and content studio running hands-on workshops for beginners."}},
  {id:"p2", kind:"org", ar:"أكاديمية رمز", en:"Ramz Academy", gov:"muscat",
   bio:{ar:"أكاديمية لتعليم البرمجة والأمن السيبراني بمشاريع تطبيقية.", en:"An academy teaching coding and cybersecurity through practical projects."}},
  {id:"p3", kind:"ind", ar:"المدرّبة ريم", en:"Trainer Reem", gov:"batinah",
   bio:{ar:"مصمّمة جرافيك ومدرّبة في الهوية البصرية وتصميم الواجهات.", en:"Graphic designer and trainer in visual identity and interface design."}},
  {id:"p4", kind:"org", ar:"مركز ريادة صلالة", en:"Salalah Enterprise Hub", gov:"dhofar",
   bio:{ar:"مركز يدعم الشباب في تحويل الأفكار إلى مشاريع صغيرة.", en:"A hub helping young people turn ideas into small ventures."}},
  {id:"p5", kind:"ind", ar:"المدرّب سالم", en:"Trainer Salem", gov:"dakhiliyah",
   bio:{ar:"حِرفي يدرّس الفخار والخط العربي بأسلوب مبسّط.", en:"A craftsman teaching pottery and Arabic calligraphy in a simple style."}},
  {id:"p6", kind:"org", ar:"نادي اللغات", en:"Languages Club", gov:"online",
   bio:{ar:"نادٍ لتعلّم اللغات عبر المحادثة والممارسة الأسبوعية.", en:"A club for learning languages through weekly conversation and practice."}}
];
// Programme fields: cat/type/prov/gov = ids from the lists above; lvl = beginner|intermediate|advanced|all;
// d = days from today, h = start hour, seats = 0 means full, price = 0 means free.
const PROGRAMS = [
  {id:1,  cat:"media",  type:"workshop", prov:"p1", gov:"muscat",    lvl:"beginner",     d:6,  h:17, dur:{ar:"3 ساعات",en:"3 hours"},  price:10, seats:12,
   t:{ar:"التصوير الفوتوغرافي للمبتدئين",en:"Photography for beginners"},
   desc:{ar:"تعرّف على الإضاءة والتكوين واستخدام كاميرا الهاتف، ثم طبّق ما تعلمته في جولة تصوير قصيرة.",en:"Learn light, composition and phone-camera basics, then apply them on a short photo walk."}},
  {id:2,  cat:"tech",   type:"course",   prov:"p2", gov:"online",    lvl:"beginner",     d:10, h:19, dur:{ar:"6 أسابيع",en:"6 weeks"},  price:25, seats:20,
   t:{ar:"أساسيات بايثون",en:"Python fundamentals"},
   desc:{ar:"من المتغيرات والحلقات إلى مشروع صغير كامل، بأسلوب تطبيقي وأسبوعي.",en:"From variables and loops to a complete small project, in a weekly hands-on format."}},
  {id:3,  cat:"design", type:"workshop", prov:"p3", gov:"batinah",   lvl:"intermediate", d:4,  h:16, dur:{ar:"4 ساعات",en:"4 hours"},  price:0,  seats:8,
   t:{ar:"تصميم الهوية البصرية",en:"Designing a visual identity"},
   desc:{ar:"ابنِ هوية بسيطة لمشروعك: الشعار والألوان والخطوط وكيف تتسق معًا.",en:"Build a simple identity for your project: logo, colours, type and how they work together."}},
  {id:4,  cat:"biz",    type:"program",  prov:"p4", gov:"dhofar",    lvl:"beginner",     d:20, h:10, dur:{ar:"4 أسابيع",en:"4 weeks"},  price:0,  seats:25,
   t:{ar:"ابنِ مشروعك الأول",en:"Build your first venture"},
   desc:{ar:"من الفكرة إلى نموذج أولي وعرض تقديمي، مع إرشاد من رواد أعمال.",en:"From idea to prototype and pitch, with guidance from entrepreneurs."}},
  {id:5,  cat:"craft",  type:"workshop", prov:"p5", gov:"dakhiliyah",lvl:"beginner",     d:12, h:9,  dur:{ar:"نصف يوم",en:"Half a day"},price:12, seats:10,
   t:{ar:"الفخار والحِرف اليدوية",en:"Pottery & hand crafts"},
   desc:{ar:"اصنع قطعتك الأولى من الطين وتعلّم أساسيات التشكيل والحرق.",en:"Make your first clay piece and learn the basics of shaping and firing."}},
  {id:6,  cat:"lang",   type:"course",   prov:"p6", gov:"online",    lvl:"intermediate", d:3,  h:20, dur:{ar:"8 أسابيع",en:"8 weeks"},  price:20, seats:15,
   t:{ar:"المحادثة الإنجليزية",en:"English conversation"},
   desc:{ar:"جلسات محادثة أسبوعية صغيرة لرفع الطلاقة والثقة.",en:"Small weekly conversation sessions to build fluency and confidence."}},
  {id:7,  cat:"tech",   type:"course",   prov:"p2", gov:"muscat",    lvl:"beginner",     d:15, h:17, dur:{ar:"5 أسابيع",en:"5 weeks"},  price:30, seats:16,
   t:{ar:"تطوير مواقع الويب: HTML وCSS",en:"Web development: HTML & CSS"},
   desc:{ar:"ابنِ موقعك الشخصي الأول بخطوات واضحة وتصميم متجاوب.",en:"Build your first personal site step by step, with a responsive design."}},
  {id:8,  cat:"media",  type:"workshop", prov:"p1", gov:"muscat",    lvl:"beginner",     d:25, h:16, dur:{ar:"3 ساعات",en:"3 hours"},  price:10, seats:0,
   t:{ar:"مونتاج الفيديو بالهاتف",en:"Phone video editing"},
   desc:{ar:"قصّ ودمج وإضافة الصوت والعناوين لإنتاج فيديو قصير احترافي.",en:"Cut, combine, add audio and titles to produce a polished short video."}},
  {id:9,  cat:"design", type:"course",   prov:"p3", gov:"online",    lvl:"intermediate", d:34, h:19, dur:{ar:"6 أسابيع",en:"6 weeks"},  price:28, seats:14,
   t:{ar:"تصميم واجهات المستخدم UI",en:"UI design"},
   desc:{ar:"مبادئ تصميم الشاشات والمكوّنات والتجربة، مع مشروع نهائي.",en:"Principles of screens, components and experience, with a final project."}},
  {id:10, cat:"biz",    type:"workshop", prov:"p4", gov:"online",    lvl:"beginner",     d:8,  h:18, dur:{ar:"ساعتان",en:"2 hours"},    price:15, seats:30,
   t:{ar:"التسويق عبر وسائل التواصل",en:"Social media marketing"},
   desc:{ar:"كيف تبني محتوى وتصل إلى جمهورك وتقيس نتائجك.",en:"How to build content, reach your audience and measure results."}},
  {id:11, cat:"biz",    type:"session",  prov:"p4", gov:"online",    lvl:"all",          d:2,  h:20, dur:{ar:"ساعة",en:"1 hour"},      price:0,  seats:40,
   t:{ar:"جلسة إرشادية: مسارك المهني",en:"Mentoring session: your career path"},
   desc:{ar:"جلسة مفتوحة للأسئلة عن اختيار المسار وبناء الخبرة المبكرة.",en:"An open Q&A on choosing a path and building early experience."}},
  {id:12, cat:"craft",  type:"course",   prov:"p5", gov:"dakhiliyah",lvl:"beginner",     d:40, h:16, dur:{ar:"6 أسابيع",en:"6 weeks"},  price:20, seats:12,
   t:{ar:"الخط العربي",en:"Arabic calligraphy"},
   desc:{ar:"تعلّم قواعد الخط وأدواته وتدرّب على لوحة نهائية.",en:"Learn the rules and tools of calligraphy and finish with a final piece."}},
  {id:13, cat:"tech",   type:"workshop", prov:"p2", gov:"muscat",    lvl:"beginner",     d:18, h:17, dur:{ar:"3 ساعات",en:"3 hours"},  price:0,  seats:24,
   t:{ar:"الأمن السيبراني للمبتدئين",en:"Cybersecurity for beginners"},
   desc:{ar:"كيف تحمي حساباتك وتتعرّف على أشهر الهجمات بأسلوب مبسّط.",en:"How to protect your accounts and recognise common attacks, in plain language."}}
];
