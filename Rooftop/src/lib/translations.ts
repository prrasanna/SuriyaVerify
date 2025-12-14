
export const languages = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
};

export const defaultLang = 'en';

type Translations = {
  [key: string]: {
    [lang: string]: string;
  };
};

export const translations: Translations = {
  // ================= HEADER =================

  'header.title': {
    en: 'Surya Ghar AI Verification',
    hi: 'सूर्य घर एआई सत्यापन',
    ta: 'சூர்யா கர் AI சரிபார்ப்பு',
  },

  'header.subtitle': {
    en: 'Remote Verification for PM Surya Ghar Yojana',
    hi: 'पीएम सूर्य घर योजना के लिए दूरस्थ सत्यापन',
    ta: 'PM சூர்யா கர் யோஜனாவுக்கான தொலைநிலை சரிபார்ப்பு',
  },

  'header.selectLanguage': {
    en: 'Select Language',
    hi: 'भाषा चुनें',
    ta: 'மொழியைத் தேர்ந்தெடுக்கவும்',
  },

  'header.brand': {
    en: 'SuryaVerify',
    hi: 'सूर्यावेरिफ़ाई',
    ta: 'சூர்யா வெரிஃபை',
  },

  'header.badge.scheme': {
    en: 'PM Surya Ghar',
    hi: 'पीएम सूर्य घर',
    ta: 'PM சூர்யா கர்',
  },

  'header.badge.tool': {
    en: 'AI Tool',
    hi: 'एआई उपकरण',
    ta: 'AI கருவி',
  },

  // ================= NAVIGATION =================

  'nav.home': {
    en: 'Home',
    hi: 'होम',
    ta: 'முகப்பு',
  },

  'nav.apply': {
    en: 'Apply',
    hi: 'आवेदन',
    ta: 'விண்ணப்பம்',
  },

  'nav.verify': {
    en: 'Verify',
    hi: 'सत्यापन',
    ta: 'சரிபார்ப்பு',
  },

  'nav.ethics': {
    en: 'Ethics',
    hi: 'नैतिकता',
    ta: 'நெறிமுறை',
  },

  // ================= HOME PAGE =================

  home_title: {
    en: 'Governance-Ready Remote Solar Verification',
    hi: 'शासन के लिए तैयार दूरस्थ सोलर सत्यापन',
    ta: 'அரசுத் தயாரான தொலைநிலை சோலார் சரிபார்ப்பு',
  },

  home_subtitle: {
    en: 'An auditable, AI-powered digital pipeline to verify rooftop solar installations across India.',
    hi: 'भारत भर में छत सोलर स्थापना को सत्यापित करने के लिए एआई आधारित डिजिटल प्रणाली।',
    ta: 'இந்தியா முழுவதும் கூரை சோலார் நிறுவல்களை சரிபார்க்க AI அடிப்படையிலான டிஜிட்டல் அமைப்பு.',
  },

  home_start_verification: {
    en: 'Start Verification',
    hi: 'सत्यापन शुरू करें',
    ta: 'சரிபார்ப்பை தொடங்கு',
  },

  home_about_scheme_btn: {
    en: 'About the Scheme',
    hi: 'योजना के बारे में',
    ta: 'திட்டம் பற்றி',
  },

  home_capabilities_title: {
    en: 'PM Surya Ghar Core Capabilities',
    hi: 'पीएम सूर्य घर मुख्य क्षमताएं',
    ta: 'PM சூர்யா கர் முக்கிய அம்சங்கள்',
  },

  home_capabilities_subtitle: {
    en: 'Built for speed, accuracy, and accountability.',
    hi: 'तेज़, सटीक और जवाबदेह प्रणाली।',
    ta: 'வேகம், துல்லியம் மற்றும் பொறுப்புடன் உருவாக்கப்பட்டது.',
  },

  // ================= ETHICS PAGE =================

  ethics_title: {
    en: 'Ethics, Privacy & Methodology',
    hi: 'नैतिकता, गोपनीयता और कार्यप्रणाली',
    ta: 'நெறிமுறை, தனியுரிமை மற்றும் செயல்முறை',
  },

  ethics_subtitle: {
    en: 'Documentation on data usage, model assumptions, and privacy standards.',
    hi: 'डेटा उपयोग, मॉडल अनुमान और गोपनीयता मानकोंின் விளக்கம்.',
    ta: 'தரவு பயன்பாடு, மாதிரி கணிப்புகள் மற்றும் தனியுரிமை தரநிலைகள் பற்றிய விளக்கம்.',
  },

  ethics_privacy_title: {
    en: 'Privacy & Data Sources',
    hi: 'गोपनीयता और डेटा स्रोत',
    ta: 'தனியுரிமை மற்றும் தரவு ஆதாரங்கள்',
  },

  ethics_privacy_desc: {
    en: 'No Personally Identifiable Information (PII) is processed except coordinates.',
    hi: 'निर्देशांक के अलावा कोई व्यक्तिगत पहचान योग्य जानकारी संसाधित नहीं की जाती।',
    ta: 'இட இணக்கங்களை தவிர எந்த தனிப்பட்ட அடையாளத் தகவலும் பயன்படுத்தப்படாது.',
  },

  ethics_capacity_title: {
    en: 'Capacity Assumption Methodology',
    hi: 'क्षमता अनुमान विधि',
    ta: 'திறன் மதிப்பீட்டு முறை',
  },

  ethics_capacity_formula: {
    en: 'Capacity (kW) = Area (m²) × Packing Factor × Module Efficiency',
    hi: 'क्षमता (kW) = क्षेत्रफल (m²) × पैकिंग फैक्टर × दक्षता',
    ta: 'திறன் (kW) = பரப்பளவு (m²) × பேக்கிங் காரகம் × செயல்திறன்',
  },

  ethics_audit_footer: {
    en: 'All decisions are auditable with supporting evidence.',
    hi: 'सभी निर्णय प्रमाण के साथ ऑडिट योग्य हैं।',
    ta: 'அனைத்து முடிவுகளும் ஆதாரத்துடன் ஆய்வு செய்யக்கூடியவை.',
  },

  // ================= TABS =================

'tab.csv': {
  en: 'CSV Upload',
  hi: 'सीएसवी अपलोड',
  ta: 'CSV பதிவேற்றம்',
},

'tab.json': {
  en: 'JSON Upload',
  hi: 'जेएसओएन अपलोड',
  ta: 'JSON பதிவேற்றம்',
},

'tab.image': {
  en: 'Image Upload',
  hi: 'छवि अपलोड',
  ta: 'பட பதிவேற்றம்',
},

'tab.map': {
  en: 'Map View',
  hi: 'मानचित्र दृश्य',
  ta: 'வரைபடக் காட்சி',
},

// ================= VERIFICATION INTRO =================

'verification.intro.title': {
  en: 'AI-Powered Solar Verification',
  hi: 'एआई-संचालित सौर सत्यापन',
  ta: 'AI-ஆல் இயங்கும் சோலார் சரிபார்ப்பு',
},

'verification.intro.desc': {
  en: 'Verify rooftop solar installations instantly using advanced satellite imagery analysis. Choose a method below to get started.',
  hi: 'उन्नत उपग्रह इमेजरी विश्लेषण का उपयोग करके छत पर सौर प्रतिष्ठानों का तुरंत सत्यापन करें। शुरू करने के लिए नीचे एक विधि चुनें।',
  ta: 'மேம்பட்ட செயற்கைக்கோள் படப் பகுப்பாய்வைப் பயன்படுத்தி கூரை சோலார் நிறுவல்களை உடனடியாக சரிபார்க்கவும். தொடங்க கீழே உள்ள முறையைத் தேர்ந்தெடுக்கவும்.',
},

// ================= FILE UPLOAD =================

'upload.prompt': {
  en: 'Click to upload or drag and drop',
  hi: 'अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें',
  ta: 'பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்',
},

'upload.csv.description': {
  en: 'CSV with id, lat, long & optional capture_date',
  hi: 'आईडी, लैट, लॉन्ग और वैकल्पिक कैप्चर_डेट के साथ सीएसवी',
  ta: 'id, lat, long மற்றும் விருப்ப capture_date கொண்ட CSV',
},

'upload.json.description': {
  en: 'JSON with id, lat, long & optional capture_date',
  hi: 'आईडी, लैट, लॉन्ग और वैकल्पिक कैप्चर_डेट के साथ जेएसओएन',
  ta: 'id, lat, long மற்றும் விருப்ப capture_date கொண்ட JSON',
},

'upload.image.description': {
  en: 'Upload JPEG, PNG, or WEBP',
  hi: 'जेपीईजी, पीएनजी, या वेबपी अपलोड करें',
  ta: 'JPEG, PNG, அல்லது WEBP பதிவேற்றவும்',
},

'upload.change.file': {
  en: 'Click to choose a different file',
  hi: 'दूसरी फ़ाइल चुनने के लिए क्लिक करें',
  ta: 'வேறு கோப்பைத் தேர்ந்தெடுக்க கிளிக் செய்யவும்',
},

'tooltip.upload': {
  en: 'Click or drag-and-drop your file here',
  hi: 'अपनी फ़ाइल यहां क्लिक करें या खींचें और छोड़ें',
  ta: 'உங்கள் கோப்பை இங்கே கிளிக் செய்யவும் அல்லது இழுத்து விடவும்',
},

// ================= IMAGE URL INPUT =================

'image.url.label': {
  en: 'Image URL',
  hi: 'छवि यूआरएल',
  ta: 'பட URL',
},

'image.url.placeholder': {
  en: 'Paste image URL here...',
  hi: 'यहाँ छवि यूआरएल पेस्ट करें...',
  ta: 'பட URL ஐ இங்கே ஒட்டவும்...',
},

'image.url.load': {
  en: 'Load URL',
  hi: 'यूआरएल लोड करें',
  ta: 'URL ஏற்றவும்',
},

'image.url.or': {
  en: 'OR',
  hi: 'या',
  ta: 'அல்லது',
},

'error.url.fetch': {
  en: 'Unable to load image from URL. This is often due to security restrictions (CORS). Please download the image and upload it manually.',
  hi: 'URL से छवि लोड करने में असमर्थ। यह अक्सर सुरक्षा प्रतिबंधों (CORS) के कारण होता है। कृपया छवि डाउनलोड करें और मैन्युअल रूप से अपलोड करें।',
  ta: 'URL இலிருந்து படத்தை ஏற்ற முடியவில்லை. இது பெரும்பாலும் பாதுகாப்பு கட்டுப்பாடுகள் (CORS) காரணமாகும். தயவுசெய்து படத்தைப் பதிவிறக்கி கைமுறையாக பதிவேற்றவும்.',
},

'error.url.invalid': {
  en: 'Invalid URL format.',
  hi: 'अमान्य यूआरएल प्रारूप।',
  ta: 'தவறான URL வடிவம்.',
},

// ================= MAP FEATURE =================

'map.title': {
  en: 'Map Verification',
  hi: 'मानचित्र सत्यापन',
  ta: 'வரைபட சரிபார்ப்பு',
},

'map.description': {
  en: 'Use the interactive map to select a location for verification.',
  hi: 'सत्यापन के लिए स्थान चुनने के लिए इंटरैक्टिव मानचित्र का उपयोग करें।',
  ta: 'சரிபார்ப்பதற்கான இடத்தைத் தேர்வுசெய்ய ஊடாடும் வரைபடத்தைப் பயன்படுத்தவும்.',
},

'map.latitude': {
  en: 'Latitude',
  hi: 'अक्षांश',
  ta: 'அட்சரேகை',
},

'map.longitude': {
  en: 'Longitude',
  hi: 'देशांतर',
  ta: 'தீர்க்கரேகை',
},

'map.search': {
  en: 'Go to Location',
  hi: 'स्थान पर जाएं',
  ta: 'இடத்திற்குச் செல்',
},

'map.verify': {
  en: 'Verify This Location',
  hi: 'इस स्थान का सत्यापन करें',
  ta: 'இந்த இடத்தை சரிபார்க்கவும்',
},

// ================= LOADER =================

'loader.title': {
  en: 'AI Verification in Progress...',
  hi: 'एआई सत्यापन प्रगति पर है...',
  ta: 'AI சரிபார்ப்பு செயல்பாட்டில் உள்ளது...',
},

'loader.subtitle': {
  en: 'Analyzing data, please wait.',
  hi: 'डेटा का विश्लेषण किया जा रहा है, कृपया प्रतीक्षा करें।',
  ta: 'தரவை பகுப்பாய்வு செய்கிறது, தயவுசெய்து காத்திருக்கவும்.',
},

  // ================= PAGES (CSV, JSON, IMAGE) =================

'csv.title': {
  en: 'CSV Verification',
  hi: 'सीएसवी सत्यापन',
  ta: 'CSV சரிபார்ப்பு',
},

'csv.description': {
  en: 'Upload a CSV file with site coordinates to begin the AI-powered verification process.',
  hi: 'एआई-संचालित सत्यापन प्रक्रिया शुरू करने के लिए साइट निर्देशांक के साथ एक सीएसवी फ़ाइल अपलोड करें।',
  ta: 'AI-ஆல் இயக்கப்படும் சரிபார்ப்பு செயல்முறையைத் தொடங்க தள ஆயத்தொலைவுகளுடன் ஒரு CSV கோப்பைப் பதிவேற்றவும்.',
},

'csv.download_sample': {
  en: 'Download Sample CSV',
  hi: 'नमूना सीएसवी डाउनलोड करें',
  ta: 'மாதிரி CSV பதிவிறக்கவும்',
},

'json.title': {
  en: 'JSON Verification',
  hi: 'जेएसओएन सत्यापन',
  ta: 'JSON சரிபார்ப்பு',
},

'json.description': {
  en: 'Upload a JSON file with an array of sites to begin the AI-powered verification process.',
  hi: 'एआई-संचालित सत्यापन प्रक्रिया शुरू करने के लिए साइटों की एक श्रृंखला के साथ एक जेएसओएन फ़ाइल अपलोड करें।',
  ta: 'AI-ஆல் இயக்கப்படும் சரிபார்ப்பு செயல்முறையைத் தொடங்க தளங்களின் வரிசையுடன் ஒரு JSON கோப்பைப் பதிவேற்றவும்.',
},

'json.download_sample': {
  en: 'Download Sample JSON',
  hi: 'नमूना जेएसओएन डाउनलोड करें',
  ta: 'மாதிரி JSON பதிவிறக்கவும்',
},

'image.title': {
  en: 'Image Verification',
  hi: 'छवि सत्यापन',
  ta: 'பட சரிபார்ப்பு',
},

'image.description': {
  en: 'Upload a single rooftop image to begin the AI-powered verification process.',
  hi: 'एआई-संचालित सत्यापन प्रक्रिया शुरू करने के लिए एक ही छत की छवि अपलोड करें।',
  ta: 'AI-ஆல் இயக்கப்படும் சரிபார்ப்பு செயல்முறையைத் தொடங்க ஒற்றை கூரை படத்தைப் பதிவேற்றவும்.',
},

'image.preview': {
  en: 'Image Preview:',
  hi: 'छवि पूर्वावलोकन:',
  ta: 'பட முன்னோட்டம்:',
},

'image.analysis.result': {
  en: 'Analysis Result',
  hi: 'विश्लेषण परिणाम',
  ta: 'பகுப்பாய்வு முடிவு',
},

'sites.loaded.info': {
  en: '{count} of {total} sites match filter. {selected} selected for verification.',
  hi: '{total} में से {count} साइटें फ़िल्टर से मेल खाती हैं। सत्यापन के लिए {selected} का चयन किया गया।',
  ta: '{total} தளங்களில் {count} வடிகட்டியுடன் பொருந்துகிறது. சரிபார்ப்புக்கு {selected} தேர்ந்தெடுக்கப்பட்டது.',
},

// ================= FILTER =================

'filter.date.title': {
  en: 'Filter by Capture Date',
  hi: 'कैप्चर तिथि के अनुसार फ़िल्टर करें',
  ta: 'பிடிப்பு தேதிப்படி வடிகட்டவும்',
},

'filter.from': {
  en: 'From:',
  hi: 'से:',
  ta: 'இருந்து:',
},

'filter.to': {
  en: 'To:',
  hi: 'तक:',
  ta: 'வரை:',
},

'filter.clear': {
  en: 'Clear',
  hi: 'साफ़ करें',
  ta: 'நீக்கு',
},

'tooltip.filter.start': {
  en: 'Select a start date to filter sites',
  hi: 'साइटों को फ़िल्टर करने के लिए एक प्रारंभ तिथि चुनें',
  ta: 'தளங்களை வடிகட்ட ஒரு தொடக்க தேதியைத் தேர்ந்தெடுக்கவும்',
},

'tooltip.filter.end': {
  en: 'Select an end date to filter sites',
  hi: 'साइटों को फ़िल्टर करने के लिए एक अंतिम तिथि चुनें',
  ta: 'தளங்களை வடிகட்ட ஒரு இறுதி தேதியைத் தேர்ந்தெடுக்கவும்',
},

'tooltip.filter.clear': {
  en: 'Clear the date filter',
  hi: 'तिथि फ़िल्टर साफ़ करें',
  ta: 'தேதி வடிகட்டியை நீக்கு',
},

// ================= BUTTONS =================

'button.process': {
  en: 'Start Verification ({count})',
  hi: 'सत्यापन प्रारंभ करें ({count})',
  ta: 'சரிபார்ப்பைத் தொடங்கு ({count})',
},

'button.processing': {
  en: 'Processing...',
  hi: 'प्रसंस्करण...',
  ta: 'செயலாக்கத்தில் உள்ளது...',
},

'button.analyzing': {
  en: 'Analyzing...',
  hi: 'विश्लेषण...',
  ta: 'பகுப்பாய்வு செய்கிறது...',
},

'button.analyze': {
  en: 'Analyze Image',
  hi: 'छवि का विश्लेषण करें',
  ta: 'படத்தை பகுப்பாய்வு செய்',
},

'button.download': {
  en: 'Download JSON',
  hi: 'जेएसओएन डाउनलोड करें',
  ta: 'JSON பதிவிறக்கு',
},

'button.reset': {
  en: 'Verify Another Batch',
  hi: 'दूसरे बैच का सत्यापन करें',
  ta: 'மற்றொரு தொகுதியை சரிபார்க்கவும்',
},

// ================= TOOLTIPS =================

'tooltip.process': {
  en: 'Process the selected sites for AI analysis',
  hi: 'एआई विश्लेषण के लिए चयनित साइटों को संसाधित करें',
  ta: 'AI பகுப்பாய்வுக்காக தேர்ந்தெடுக்கப்பட்ட தளங்களைச் செயல்படுத்தவும்',
},

'tooltip.process.image': {
  en: 'Process the uploaded image for AI analysis',
  hi: 'एआई विश्लेषण के लिए अपलोड की गई छवि को संसाधित करें',
  ta: 'AI பகுப்பாய்வுக்காக பதிவேற்றப்பட்ட படத்தைச் செயல்படுத்தவும்',
},

'tooltip.download': {
  en: 'Download the verification results as a JSON file',
  hi: 'सत्यापन परिणामों को जेएसओएन फ़ाइल के रूप में डाउनलोड करें',
  ta: 'சரிபார்ப்பு முடிவுகளை ஒரு JSON கோப்பாகப் பதிவிறக்கவும்',
},

'tooltip.reset': {
  en: 'Clear current results to select and verify different sites',
  hi: 'विभिन्न साइटों का चयन और सत्यापन करने के लिए वर्तमान परिणाम साफ़ करें',
  ta: 'வெவ்வேறு தளங்களைத் தேர்ந்தெடுத்து சரிபார்க்க தற்போதைய முடிவுகளை அழிக்கவும்',
},

  // ================= SITE SELECTION =================

'selection.title': {
  en: 'Select Sites for Verification',
  hi: 'सत्यापन के लिए साइटें चुनें',
  ta: 'சரிபார்ப்புக்கு தளங்களைத் தேர்ந்தெடுக்கவும்',
},

'selection.all': {
  en: 'Select All',
  hi: 'सभी चुनें',
  ta: 'அனைத்தையும் தேர்ந்தெடு',
},

'selection.none': {
  en: 'Deselect All',
  hi: 'सभी अचयनित करें',
  ta: 'அனைத்தையும் நீக்கு',
},

'tooltip.select.all': {
  en: 'Select all loaded sites for processing',
  hi: 'प्रसंस्करण के लिए सभी लोड की गई साइटों का चयन करें',
  ta: 'செயலாக்கத்திற்காக ஏற்றப்பட்ட அனைத்து தளங்களையும் தேர்ந்தெடுக்கவும்',
},

'tooltip.select.none': {
  en: 'Deselect all sites',
  hi: 'सभी साइटों को अचयनित करें',
  ta: 'அனைத்து தளங்களையும் நீக்கு',
},

// ================= RESULTS DASHBOARD =================

'results.title': {
  en: 'Verification Results',
  hi: 'सत्यापन परिणाम',
  ta: 'சரிபார்ப்பு முடிவுகள்',
},

'summary.total': {
  en: 'Total Sites',
  hi: 'कुल साइटें',
  ta: 'மொத்த தளங்கள்',
},

'summary.verified': {
  en: 'Solar Verified',
  hi: 'सौर सत्यापित',
  ta: 'சோலார் சரிபார்க்கப்பட்டது',
},

'summary.not_present': {
  en: 'Solar Not Present',
  hi: 'सौर मौजूद नहीं है',
  ta: 'சோலார் இல்லை',
},

'summary.unverifiable': {
  en: 'Unverifiable',
  hi: 'असत्यापनीय',
  ta: 'சரிபார்க்க முடியாதது',
},

'tooltip.summary.total': {
  en: 'Total number of sites processed from the file.',
  hi: 'फ़ाइल से संसाधित साइटों की कुल संख्या।',
  ta: 'கோப்பிலிருந்து செயலாக்கப்பட்ட தளங்களின் மொத்த எண்ணிக்கை.',
},

'tooltip.summary.verified': {
  en: 'Sites where solar panels were detected and verified.',
  hi: 'वे साइटें जहां सौर पैनलों का पता चला और सत्यापित किया गया।',
  ta: 'சோலார் பேனல்கள் கண்டறியப்பட்டு சரிபார்க்கப்பட்ட தளங்கள்.',
},

'tooltip.summary.not_present': {
  en: 'Sites confirmed to have no solar panels.',
  hi: 'जिन साइटों पर सौर पैनल नहीं होने की पुष्टि हुई है।',
  ta: 'சோலார் பேனல்கள் இல்லை என்று உறுதிப்படுத்தப்பட்ட தளங்கள்.',
},

'tooltip.summary.unverifiable': {
  en: 'Sites that could not be verified due to issues like poor image quality.',
  hi: 'खराब छवि गुणवत्ता जैसी समस्याओं के कारण सत्यापित नहीं की जा सकने वाली साइटें।',
  ta: 'மோசமான படத் தரம் போன்ற சிக்கல்களால் சரிபார்க்க முடியாத தளங்கள்.',
},

// ================= RESULT CARDS =================

'result.card.qc.tooltip': {
  en: 'Quality Check status based on image clarity',
  hi: 'छवि स्पष्टता पर आधारित गुणवत्ता जांच स्थिति',
  ta: 'படத் தெளிவை அடிப்படையாகக் கொண்ட தர சோதனை நிலை',
},

'result.card.solar.present': {
  en: 'Solar Present',
  hi: 'सौर मौजूद है',
  ta: 'சோலார் உள்ளது',
},

'result.card.solar.absent': {
  en: 'No Solar',
  hi: 'कोई सौर नहीं',
  ta: 'சோலார் இல்லை',
},

'result.card.confidence': {
  en: 'Confidence',
  hi: 'आत्मविश्वास',
  ta: 'நம்பிக்கை',
},

'result.card.panels': {
  en: 'Panels',
  hi: 'पैनल',
  ta: 'பேனல்கள்',
},

'result.card.capacity': {
  en: 'Capacity',
  hi: 'क्षमता',
  ta: 'திறன்',
},

'result.card.potential.title': {
  en: 'Solar Potential Analysis',
  hi: 'सौर क्षमता विश्लेषण',
  ta: 'சோலார் சாத்தியக்கூறு பகுப்பாய்வு',
},

'result.card.potential.panels': {
  en: 'Pot. Panels',
  hi: 'संभावित पैनल',
  ta: 'சாத்தியமான பேனல்கள்',
},

'result.card.potential.capacity': {
  en: 'Pot. Capacity',
  hi: 'संभावित क्षमता',
  ta: 'சாத்தியமான திறன்',
},

'result.card.audit.details': {
  en: 'Audit Details',
  hi: 'लेखापरीक्षा विवरण',
  ta: 'தணிக்கை விவரங்கள்',
},

// ================= TOOLTIPS =================

'tooltip.audit.details': {
  en: 'Click to expand/collapse detailed audit information',
  hi: 'विस्तृत लेखापरीक्षा जानकारी का विस्तार/संक्षिप्त करने के लिए क्लिक करें',
  ta: 'விரிவான தணிக்கை தகவலை விரிவாக்க/சுருக்க கிளிக் செய்யவும்',
},

'tooltip.confidence': {
  en: 'AI\'s confidence in its \'has_solar\' assessment',
  hi: 'एआई का \'has_solar\' मूल्यांकन में आत्मविश्वास',
  ta: 'AI-யின் \'has_solar\' மதிப்பீட்டில் உள்ள நம்பிக்கை',
},

'tooltip.panels': {
  en: 'Estimated number of solar panels detected',
  hi: 'पता लगाए गए सौर पैनलों की अनुमानित संख्या',
  ta: 'கண்டறியப்பட்ட சோலார் பேனல்களின் மதிப்பிடப்பட்ட எண்ணிக்கை',
},

'tooltip.capacity': {
  en: 'Estimated power capacity in kilowatts (kW)',
  hi: 'किलोवाट (kW) में अनुमानित बिजली क्षमता',
  ta: 'கிலோவாட்களில் (kW) மதிப்பிடப்பட்ட சக்தி திறன்',
},

'tooltip.potential.panels': {
  en: 'Potential number of panels that could be installed',
  hi: 'स्थापित किए जा सकने वाले पैनलों की संभावित संख्या',
  ta: 'நிறுவக்கூடிய பேனல்களின் சாத்தியமான எண்ணிக்கை',
},

'tooltip.potential.capacity': {
  en: 'Potential power capacity for a new installation',
  hi: 'एक नई स्थापना के लिए संभावित बिजली क्षमता',
  ta: 'புதிய நிறுவலுக்கான சாத்தியமான சக்தி திறன்',
},

 // ================= ABOUT PAGE =================

// ================= ABOUT PAGE =================

// Title
'about.title': {
  en: 'About the Initiative',
  hi: 'पहल के बारे में',
  ta: 'திட்டம் பற்றி',
},

'about.scheme.name': {
  en: 'PM Surya Ghar: Muft Bijli Yojana',
  hi: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
  ta: 'PM சூர்யா கர்: இலவச மின்சாரத் திட்டம்',
},

'about.scheme.tagline': {
  en: 'Lighting up homes, powering the future',
  hi: 'घरों को रोशन करना, भविष्य को शक्ति देना',
  ta: 'வீடுகளை ஒளிரச்செய்து, எதிர்காலத்தை இயக்குவது',
},

// ---------------- Eligibility ----------------
'about.eligibility.title': {
  en: 'Eligibility Criteria',
  hi: 'पात्रता मानदंड',
  ta: 'தகுதி நிபந்தனைகள்',
},

'about.eligibility.item1': {
  en: 'Must be an Indian citizen.',
  hi: 'भारतीय नागरिक होना चाहिए।',
  ta: 'இந்தியக் குடிமகனாக இருக்க வேண்டும்.',
},

'about.eligibility.item2': {
  en: 'Should own a house with a suitable roof.',
  hi: 'उपयुक्त छत वाला घर होना चाहिए।',
  ta: 'சோலார் பேனல்களுக்கு ஏற்ற கூரை கொண்ட வீடு இருக்க வேண்டும்.',
},

'about.eligibility.item3': {
  en: 'Valid electricity connection required.',
  hi: 'वैध बिजली कनेक्शन होना चाहिए।',
  ta: 'செல்லுபடியாகும் மின் இணைப்பு இருக்க வேண்டும்.',
},

'about.eligibility.item4': {
  en: 'No prior solar subsidy availed.',
  hi: 'पहले कोई सौर सब्सिडी न ली हो।',
  ta: 'முன்னதாக சோலார் மானியம் பெற்றிருக்கக் கூடாது.',
},

// ---------------- Subsidy ----------------
'about.subsidy.title': {
  en: 'Subsidy Structure',
  hi: 'सब्सिडी संरचना',
  ta: 'மானிய அமைப்பு',
},

'about.subsidy.capacity': {
  en: 'Capacity',
  hi: 'क्षमता',
  ta: 'திறன்',
},

'about.subsidy.amount': {
  en: 'Subsidy Amount',
  hi: 'सब्सिडी राशि',
  ta: 'மானிய தொகை',
},

// ---------------- Process ----------------
'about.process.title': {
  en: 'Application Process',
  hi: 'आवेदन प्रक्रिया',
  ta: 'விண்ணப்ப செயல்முறை',
},

'about.step.1': { en: 'Register', hi: 'पंजीकरण', ta: 'பதிவு' },
'about.step.2': { en: 'Apply', hi: 'आवेदन', ta: 'விண்ணப்பம்' },
'about.step.3': { en: 'Install', hi: 'स्थापना', ta: 'நிறுவல்' },
'about.step.4': { en: 'Inspect', hi: 'निरीक्षण', ta: 'ஆய்வு' },
'about.step.5': { en: 'Subsidy', hi: 'सब्सिडी', ta: 'மானியம்' },

// ---------------- Scheme Benefits ----------------
'about.scheme.heading': {
  en: 'Scheme Benefits',
  hi: 'योजना के लाभ',
  ta: 'திட்டத்தின் நன்மைகள்',
},

'about.scheme.description': {
  en: 'The PM Surya Ghar scheme aims to provide free electricity to households through rooftop solar installations.',
  hi: 'पीएम सूर्य घर योजना का उद्देश्य छत पर सौर ऊर्जा के माध्यम से मुफ्त बिजली प्रदान करना है।',
  ta: 'PM சூர்யா கர் திட்டம் கூரை சோலார் மூலம் வீடுகளுக்கு இலவச மின்சாரம் வழங்குவதை நோக்கமாகக் கொண்டுள்ளது.',
},

// ---------------- Tool ----------------
'about.tool.heading': {
  en: 'About This Tool',
  hi: 'इस उपकरण के बारे में',
  ta: 'இந்த கருவி பற்றி',
},

'about.tool.description': {
  en: 'This AI-powered dashboard assists in the verification and monitoring of solar installations.',
  hi: 'यह एआई-संचालित डैशबोर्ड सौर प्रतिष्ठानों के सत्यापन और निगरानी में मदद करता है।',
  ta: 'இந்த AI-ஆல் இயங்கும் டாஷ்போர்டு சோலார் நிறுவல்களின் சரிபார்ப்பு மற்றும் கண்காணிப்புக்கு உதவுகிறது.',
},

// ---------------- Benefits ----------------
'about.benefit.financial.title': { en: 'Financial Savings', hi: 'वित्तीय बचत', ta: 'நிதி சேமிப்பு' },
'about.benefit.financial.desc': { en: 'Save on monthly electricity bills.', hi: 'बिजली बिल में बचत।', ta: 'மாதாந்திர மின் கட்டணத்தில் சேமிப்பு.' },

'about.benefit.clean.title': { en: 'Clean Energy', hi: 'स्वच्छ ऊर्जा', ta: 'சுத்தமான ஆற்றல்' },
'about.benefit.clean.desc': { en: 'Reduce carbon footprint.', hi: 'कार्बन उत्सर्जन कम करें।', ta: 'கார்பன் தடம் குறைக்கவும்.' },

'about.benefit.independence.title': { en: 'Independence', hi: 'स्वतंत्रता', ta: 'சுயாதீனம்' },
'about.benefit.independence.desc': { en: 'Generate your own power.', hi: 'अपनी बिजली स्वयं बनाएं।', ta: 'உங்கள் சொந்த மின்சாரம் உருவாக்குங்கள்.' },

'about.benefit.economic.title': { en: 'Economic Growth', hi: 'आर्थिक विकास', ta: 'பொருளாதார வளர்ச்சி' },
'about.benefit.economic.desc': { en: 'Creates employment opportunities.', hi: 'रोजगार के अवसर बनते हैं।', ta: 'வேலைவாய்ப்புகளை உருவாக்குகிறது.' },

'about.benefit.transparency.title': { en: 'Transparency', hi: 'पारदर्शिता', ta: 'வெளிப்படைத்தன்மை' },
'about.benefit.transparency.desc': { en: 'Clear audit trails.', hi: 'स्पष्ट ऑडिट ट्रेल।', ta: 'தெளிவான கண்காணிப்பு.' },

'about.benefit.efficiency.title': { en: 'Efficiency', hi: 'दक्षता', ta: 'செயல்திறன்' },
'about.benefit.efficiency.desc': { en: 'Rapid AI analysis.', hi: 'तेज़ एआई विश्लेषण।', ta: 'வேகமான AI பகுப்பாய்வு.' },

'about.benefit.insights.title': { en: 'Deep Insights', hi: 'गहन जानकारी', ta: 'ஆழமான நுண்ணறிவு' },
'about.benefit.insights.desc': { en: 'Potential estimation.', hi: 'संभाव्यता अनुमान।', ta: 'திறன் மதிப்பீடு.' },

'about.benefit.trust.title': { en: 'Reliability', hi: 'विश्वसनीयता', ta: 'நம்பகத்தன்மை' },
'about.benefit.trust.desc': { en: 'Consistent verification standards.', hi: 'सुसंगत सत्यापन मानक।', ta: 'நிலையான சரிபார்ப்பு தரநிலைகள்.' },

// ================= CHATBOT =================

'chatbot.title': {
  en: 'Surya Sahayak',
  hi: 'सूर्य सहायक',
  ta: 'சூர்யா உதவியாளர்',
},

'tooltip.chatbot.open': {
  en: 'Chat with AI Assistant',
  hi: 'एआई सहायक के साथ चैट करें',
  ta: 'AI உதவியாளருடன் அரட்டையடிக்கவும்',
},

'chatbot.welcome': {
  en: 'Namaste! I am your AI assistant for PM Surya Ghar Yojana. How can I help you today?',
  hi: 'नमस्ते! मैं पीएम सूर्य घर योजना के लिए आपका एआई सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
  ta: 'வணக்கம்! நான் PM சூர்யா கர் யோஜனாவுக்கான உங்கள் AI உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
},

'chatbot.placeholder': {
  en: 'Ask about subsidy, eligibility, or process...',
  hi: 'सब्सिडी, पात्रता, या प्रक्रिया के बारे में पूछें...',
  ta: 'மானியம், தகுதி அல்லது செயல்முறை பற்றி கேளுங்கள்...',
},

'chatbot.system.prompt': {
  en: 'You are a helpful assistant for the PM Surya Ghar: Muft Bijli Yojana. Answer questions about eligibility, subsidy (Rs 30k for 1kW, 60k for 2kW, 78k for 3kW+), application process, and benefits. Keep answers concise.',
  hi: 'आप पीएम सूर्य घर: मुफ्त बिजली योजना के लिए एक सहायक हैं। पात्रता, सब्सिडी (1kW के लिए 30k, 2kW के लिए 60k, 3kW+ के लिए 78k), आवेदन प्रक्रिया और लाभों के बारे में प्रश्नों के उत्तर दें। उत्तर संक्षिप्त रखें।',
  ta: 'நீங்கள் PM சூர்யா கர்: இலவச மின்சாரத் திட்டத்திற்கான உதவியாளர். தகுதி, மானியம் (1kW க்கு 30k, 2kW க்கு 60k, 3kW+ க்கு 78k), விண்ணப்ப செயல்முறை மற்றும் நன்மைகள் பற்றிய கேள்விகளுக்கு பதிலளிக்கவும். பதில்களை சுருக்கமாக வைத்திருங்கள்.',
},

// ================= REGISTRATION =================

'registration.title': {
  en: 'Apply for Solar Rooftop',
  hi: 'सौर छत के लिए आवेदन करें',
  ta: 'சோலார் கூரைக்கு விண்ணப்பிக்கவும்',
},

'registration.desc': {
  en: 'Fill out the form below to register for the PM Surya Ghar Yojana.',
  hi: 'पीएम सूर्य घर योजना के लिए पंजीकरण करने के लिए नीचे दिया गया फॉर्म भरें।',
  ta: 'PM சூர்யா கர் யோஜனாவுக்கு பதிவு செய்ய கீழே உள்ள படிவத்தை நிரப்பவும்.',
},

'form.fullname': { en: 'Full Name', hi: 'पूरा नाम', ta: 'முழு பெயர்' },
'form.mobile': { en: 'Mobile Number', hi: 'मोबाइल नंबर', ta: 'கைபேசி எண்' },
'form.state': { en: 'State', hi: 'राज्य', ta: 'மாநிலம்' },
'form.district': { en: 'District', hi: 'ज़िला', ta: 'மாவட்டம்' },
'form.consumer_number': { en: 'Consumer Number', hi: 'उपभोक्ता संख्या', ta: 'நுகர்வோர் எண்' },
'form.capacity': { en: 'Proposed Capacity (kW)', hi: 'प्रस्तावित क्षमता (kW)', ta: 'முன்மொழியப்பட்ட திறன் (kW)' },

'form.submit': {
  en: 'Submit Application',
  hi: 'आवेदन जमा करें',
  ta: 'விண்ணப்பத்தைச் சமர்ப்பிக்கவும்',
},

'form.success': {
  en: 'Application Submitted Successfully!',
  hi: 'आवेदन सफलतापूर्वक जमा किया गया!',
  ta: 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
},

'form.download_pdf': {
  en: 'Download Application PDF',
  hi: 'आवेदन पीडीएफ डाउनलोड करें',
  ta: 'விண்ணப்ப PDF ஐப் பதிவிறக்கவும்',
},

'form.application_id': {
  en: 'Application ID',
  hi: 'आवेदन आईडी',
  ta: 'விண்ணப்ப எண்',
},
};