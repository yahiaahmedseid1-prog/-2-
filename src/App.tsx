import { useState, useEffect } from 'react';
import {
  Tv,
  Play,
  Download,
  Smartphone,
  Tv2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  QrCode,
  AlertTriangle,
  CheckCircle2,
  Settings,
  ShieldCheck,
  FileText,
  Share2,
  HelpCircle,
  Info,
  ExternalLink,
  Wifi,
  Menu,
  X,
  PlayCircle,
  Globe,
  Link2
} from 'lucide-react';

export default function App() {
  // Navigation active tab tracking for smooth navigation
  const [activeTab, setActiveTab] = useState('downloads');
  const [copiedAppUrl, setCopiedAppUrl] = useState(false);
  const [copiedPlayerUrl, setCopiedPlayerUrl] = useState(false);
  const [showAppQr, setShowAppQr] = useState(false);
  const [showPlayerQr, setShowPlayerQr] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smart Link custom guide states
  const [customShortName, setCustomShortName] = useState('yahia-tv');
  const [selectedProvider, setSelectedProvider] = useState('bitly');
  const [copiedPublicUrl, setCopiedPublicUrl] = useState(false);

  // FAQ Accordion status
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Custom Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDevUrl, setIsDevUrl] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href.includes('-dev-')) {
      setIsDevUrl(true);
    }
  }, []);

  const getShareableUrl = () => {
    if (typeof window === 'undefined') return '';
    let url = window.location.href;
    if (url.includes('-dev-')) {
      // Automatic dev environment prefix replacement to pre (Public Shared URL)
      url = url.replace('-dev-', '-pre-');
    }
    return url;
  };

  const appDownloadUrl = 'https://www.mediafire.com/file/st0wz11ug19x3h2/Yahia_TV.apk/file';
  const playerDownloadUrl = 'https://www.mediafire.com/file/m26e0ajh3hu2yb4/YAHIA_Player.apk/file';

  // Function to show toast
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fallbackCopyToClipboard = (text: string): boolean => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      console.warn('Fallback copy failed', err);
      return false;
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string, isApp: boolean) => {
    const handleSuccess = () => {
      if (isApp) {
        setCopiedAppUrl(true);
        setTimeout(() => setCopiedAppUrl(false), 2000);
      } else {
        setCopiedPlayerUrl(true);
        setTimeout(() => setCopiedPlayerUrl(false), 2000);
      }
      triggerToast('تم نسخ الرابط بنجاح إلى الحافظة! يمكنك الآن مشاركته أو نقله.');
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(handleSuccess)
        .catch((err) => {
          console.warn('Navigator clipboard failing, trying fallback:', err);
          if (fallbackCopyToClipboard(text)) {
            handleSuccess();
          } else {
            triggerToast('عذراً، فشل نسخ الرابط. يمكنك نسخه يدوياً.');
          }
        });
    } else {
      if (fallbackCopyToClipboard(text)) {
        handleSuccess();
      } else {
        triggerToast('عذراً، فشل نسخ الرابط. يمكنك نسخه يدوياً.');
      }
    }
  };

  const handleShare = () => {
    const url = getShareableUrl();
    const copyShareLinkOnly = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
          .then(() => triggerToast('تم نسخ رابط الموقع لمشاركته مع أصدقائك!'))
          .catch(() => {
            if (fallbackCopyToClipboard(url)) {
              triggerToast('تم نسخ رابط الموقع لمشاركته مع أصدقائك!');
            } else {
              triggerToast('عذراً، فشل نسخ الرابط. الرابط هو: ' + url);
            }
          });
      } else {
        if (fallbackCopyToClipboard(url)) {
          triggerToast('تم نسخ رابط الموقع لمشاركته مع أصدقائك!');
        } else {
          triggerToast('عذراً، فشل نسخ الرابط. الرابط هو: ' + url);
        }
      }
    };

    if (navigator.share) {
      navigator.share({
        title: 'تحميل تطبيق YAHIA TV مع المشغل الرسمي',
        text: 'موقع تحميل تطبيق البث المباشر YAHIA TV ومشدد البث المساعد YAHIA PLAYER.',
        url: url,
      }).then(() => {
        triggerToast('شكراً لك على مشاركة الموقع!');
      }).catch((err) => {
        console.warn('Share API failed:', err);
        copyShareLinkOnly();
      });
    } else {
      copyShareLinkOnly();
    }
  };

  const faqs = [
    {
      q: "لماذا يحتاج تطبيق YAHIA TV لتنزيل مشغل خارجي (YAHIA PLAYER)؟",
      a: "تم تصميم تطبيق YAHIA TV بأعلى معايير السرعة وخفة الوزن، حيث يعتمد على مشغله البرمجي الخاص YAHIA PLAYER لمعالجة تدفقات الفيديو وفك التشفير بجودة عالية وبدون تقطيع. كلاهما مكمل للآخر ولن تتمكن من تفعيل القنوات أو تشغيل البث في التلفزيون أو الهاتف بدونه."
    },
    {
      q: "ما هي الأجهزة التي يتوافق معها التطبيق؟",
      a: "التطبيق متوافق بنسبة 100% مع جميع أجهزة أندرويد بدءاً من الإصدار 5.0 وما فوق. يشمل ذلك الهواتف الذكية، الأجهزة اللوحية (Tablets)، الشاشات الذكية بنظام أندرويد (Android TV)، وأجهزة التي في بوكس (Android TV Box) مثل Xiaomi Mi Box وغيرها، بالإضافة إلى أجهزة Firestick."
    },
    {
      q: "تظهر لي رسالة 'تطبيق غير معروف' أو 'خطأ في الأمان' عند التثبيت؟",
      a: "هذا طبيعي جداً لأن التطبيق يُثبّت بصيغة APK من خارج متجر Google Play. كل ما عليك فعله هو التوجه إلى إعدادات الهاتف > الأمان والحماية > ثم تفعيل خيار 'تثبيت تطبيقات من مصادر غير معروفة' لمتصفحك أو لمدير الملفات لديك."
    },
    {
      q: "هل يتطلب التطبيق كود تفعيل مدفوع؟",
      a: "لا، باقة تطبيق ومشغل YAHIA تقدم خدمة مجانية تماماً للمستخدمين لمشاهدة البث المباشر المفضل بأعلى استقرار وبدون تكاليف اشتراك معقدة."
    },
    {
      q: "كيف يمكنني تثبيت التطبيق على شاشة التلفات (Android TV) المتطورة؟",
      a: "يمكنك تحميل الملفات على هاتفك ثم استخدام تطبيق مثل 'Send Files to TV' لإرسال ملفات الـ APK من الهاتف للتلفاز وتثبيتها، أو فتح هذا الموقع مباشرة على متصفح التلفاز وسحب الملفات وتثبيتها بكل بساطة."
    }
  ];

  return (
    <div className="min-h-screen bg-[#060913] text-gray-100 flex flex-col selection:bg-rose-500 selection:text-white font-sans antialiased relative">
      {/* Glow Ambient Highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-indigo-950/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-teal-950/10 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Header section */}
      <header className="sticky top-0 z-40 bg-[#060913]/90 backdrop-blur-md border-b border-gray-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div id="logo-holder" className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-2.5 flex items-center justify-center shadow-lg shadow-rose-900/30 animate-pulse">
                <Tv className="w-7 h-7 text-white stroke-[2.2]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-l from-white via-gray-100 to-rose-400 bg-clip-text text-transparent tracking-tight">
                  YAHIA TV
                </h1>
                <span className="text-xs text-rose-500 font-bold block -mt-1 tracking-wider">
                  & YAHIA PLAYER
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 bg-gray-900/50 p-1.5 rounded-full border border-gray-800/40">
              <a
                href="#downloads"
                onClick={() => setActiveTab('downloads')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'downloads'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                تنزيل التطبيق والمشغل
              </a>
              <a
                href="#smartlink"
                onClick={() => setActiveTab('smartlink')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'smartlink'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                دليل الروابط الذكية 🌐
              </a>
              <a
                href="#steps"
                onClick={() => setActiveTab('steps')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'steps'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                خطوات التثبيت بالتفصيل
              </a>
              <a
                href="#features"
                onClick={() => setActiveTab('features')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'features'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                الميزات والتوافق
              </a>
              <a
                href="#faq"
                onClick={() => setActiveTab('faq')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'faq'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                الأسئلة الشائعة
              </a>
            </nav>

            {/* Support button and share */}
            <div className="hidden md:flex items-center gap-3">
              <button
                id="share-btn"
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition"
                title="مشاركة الموقع"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <a
                href="#steps"
                className="bg-gray-900 border border-gray-800 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 transition flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-rose-500" />
                دليل المساعدة
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                id="share-btn-mobile"
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-850 text-gray-300 mr-1"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-450 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0d1d] border-b border-gray-800/80 animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a
                href="#downloads"
                onClick={() => {
                  setActiveTab('downloads');
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  activeTab === 'downloads' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                تنزيل التطبيق والمشغل
              </a>
              <a
                href="#smartlink"
                onClick={() => {
                  setActiveTab('smartlink');
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  activeTab === 'smartlink' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                دليل الروابط الذكية 🌐
              </a>
              <a
                href="#steps"
                onClick={() => {
                  setActiveTab('steps');
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  activeTab === 'steps' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                خطوات التثبيت بالتفصيل
              </a>
              <a
                href="#features"
                onClick={() => {
                  setActiveTab('features');
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  activeTab === 'features' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                الميزات والتوافق
              </a>
              <a
                href="#faq"
                onClick={() => {
                  setActiveTab('faq');
                  setMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                  activeTab === 'faq' ? 'bg-rose-600 text-white' : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                الأسئلة الشائعة
              </a>
              <div className="pt-2 border-t border-gray-800 flex justify-between gap-3">
                <button
                  id="mobile-share"
                  onClick={handleShare}
                  className="w-1/2 flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 py-2.5 rounded-xl text-sm font-semibold"
                >
                  <Share2 className="w-4 h-4" />
                  مشاركة الموقع
                </button>
                <a
                  href="#steps"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-1/2 flex items-center justify-center gap-2 bg-rose-900/20 text-rose-400 py-2.5 rounded-xl text-sm font-semibold border border-rose-900/30"
                >
                  <Info className="w-4 h-4" />
                  شرح التثبيت
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main hero section and notice badge */}
      <main className="flex-grow">
        {/* Urgent Warning Announcement Banner */}
        <div className="bg-gradient-to-r from-amber-600/30 via-amber-500/20 to-amber-600/30 border-b border-amber-500/30 py-3.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base font-medium">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-gray-950 font-bold text-xs sm:text-sm animate-bounce">
              <AlertTriangle className="w-4 h-4" />
              تنبيه تفعيل هام للغاية
            </span>
            <p className="text-amber-100">
              تطبيق <strong className="text-white underline">YAHIA TV</strong> لا يشتغل ولا يبث البث المباشر بدون مشغله المرفق <strong className="text-white underline">YAHIA PLAYER</strong>. يرجى تحميل وتثبيت التطبيقين معاً!
            </p>
          </div>
        </div>

        {/* Dynamic Developer Sharing Helper Banner */}
        {isDevUrl && (
          <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-blue-900/40 border-b border-indigo-500/30 py-4 px-4 text-center">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-right flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 text-indigo-400 mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">
                    تنبيه ومساعدة لمشاركة هذا الموقع بنجاح:
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    رابط المتصفح الحالي لديك يحتوي على <strong className="text-amber-400 font-bold">(-dev-)</strong> وهو مخصص للمطور فقط ولا يفتح عند الآخرين. الرابط الحقيقي والجاهز للنشر هو الرابط العام أدناه:
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  readOnly
                  value={getShareableUrl()}
                  className="bg-slate-950 border border-gray-800 text-xs text-gray-300 rounded-xl py-2 px-3 focus:outline-none w-full md:w-64 font-mono select-all text-left"
                />
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(getShareableUrl())
                        .then(() => triggerToast('تم نسخ الرابط العام الجاهز للنشر بنجاح!'));
                    } else if (fallbackCopyToClipboard(getShareableUrl())) {
                      triggerToast('تم نسخ الرابط العام الجاهز للنشر بنجاح!');
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-4 rounded-xl transition shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  نسخ الرابط العام
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hero Area */}
        <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Spark badge */}
            <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-rose-400 tracking-wide">
                أسرع مشغل للبث المباشر والقنوات عبر الأندرويد لعام 2026
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              تطبيق ومستعرض القنوات
              <span className="block mt-2 bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                YAHIA TV & PLAYER
              </span>
            </h2>

            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              المشغل المثالي المجاني لمتابعة أفضل القنوات وعروض البث على الهواتف والأجهزة وشاشات التلفزيون الذكية بضغطة زر واحدة. احصل على التنزيل الآمن والمباشر للملفات الآن.
            </p>

            {/* Quick action scroll buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#downloads"
                className="px-8 py-4 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-rose-900/20 hover:shadow-rose-500/25 transform hover:-translate-y-0.5 transition duration-150 flex items-center gap-3"
              >
                <Download className="w-5 h-5 animate-bounce" />
                ابدأ عملية التحميل
              </a>
              <a
                href="#steps"
                className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white font-bold text-base rounded-2xl border border-gray-800 hover:border-gray-700 transition flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5 text-rose-500" />
                كيفية التثبيت بالتفصيل
              </a>
            </div>

            {/* Mock Vector TV Setup Graphics showcasing the beautiful relation */}
            <div className="mt-16 relative rounded-3xl overflow-hidden border border-gray-800 bg-slate-950 p-4 sm:p-8 max-w-3xl mx-auto shadow-2xl shadow-rose-950/20">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 pb-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/60"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/60"></span>
                <span className="w-3 h-3 rounded-full bg-teal-500/60"></span>
              </div>
              
              <div className="bg-[#0c0d1b] rounded-2xl p-6 sm:p-10 border border-gray-850 flex flex-col md:flex-row items-center justify-around gap-8 relative mt-2 md:mt-4">
                {/* TV Graphic Side 1 */}
                <div className="flex flex-col items-center bg-gray-900/60 border border-gray-800 p-5 rounded-2xl w-full max-w-[240px] shadow-lg relative group">
                  <div className="absolute -top-3 right-4 bg-rose-600 text-[10px] text-white font-bold uppercase py-0.5 px-2 rounded-md">
                    مستعرض القنوات
                  </div>
                  <div className="w-16 h-12 bg-gradient-to-br from-rose-900/40 to-rose-700/20 rounded-xl flex items-center justify-center mb-3.5 border border-rose-500/30">
                    <Tv className="w-8 h-8 text-rose-400" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-100">YAHIA TV</h4>
                  <p className="text-[11px] text-gray-400 mt-1.5 text-center">يقدم واجهة القنوات وتصنيفات البث المفضلة لديك</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-rose-400">
                    <Smartphone className="w-3.5 h-3.5" />
                    أندرويد APK
                  </div>
                </div>

                {/* Connection visual middle */}
                <div className="flex flex-col items-center justify-center gap-2 shrink-0 my-2 md:my-0">
                  <div className="flex items-center gap-1">
                    <div className="h-1 w-8 bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full animate-pulse"></div>
                    <span className="p-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold">يقترن معاً</span>
                    <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-[10px] text-rose-400 font-bold bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-900/30 mt-1">تزامن فوري وتلقائي</p>
                </div>

                {/* TV Graphic Side 2 (The Player) */}
                <div className="flex flex-col items-center bg-gray-900/60 border border-gray-800 p-5 rounded-2xl w-full max-w-[240px] shadow-lg relative">
                  <div className="absolute -top-3 right-4 bg-indigo-600 text-[10px] text-white font-bold uppercase py-0.5 px-2 rounded-md">
                    المشغل البرمجي
                  </div>
                  <div className="w-16 h-12 bg-gradient-to-br from-indigo-900/40 to-indigo-700/20 rounded-xl flex items-center justify-center mb-3.5 border border-indigo-500/30">
                    <Play className="w-8 h-8 text-indigo-400 fill-indigo-400/20" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-100">YAHIA PLAYER</h4>
                  <p className="text-[11px] text-gray-400 mt-1.5 text-center">يقوم بفك التشفير وتشغيل البث بجودة فائقة السرعة</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-indigo-400">
                    <Tv2 className="w-3.5 h-3.5" />
                    محرك البث الإلزامي
                  </div>
                </div>
              </div>

              {/* Status bar block at the base of mock TV screen inside container */}
              <div className="mt-5 flex items-center justify-between px-2 bg-gray-900/30 py-2.5 rounded-xl text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-emerald-400 font-bold">الخادم نشط وجاهز للتحميل</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>الأجهزة المتوافقة: تلفونات ومخارج TV Box</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Downloads section */}
        <section id="downloads" className="py-16 px-4 bg-slate-900/40 border-t border-gray-800/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                روابط التنزيل المباشرة لأجهزة الأندرويد
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                اضغط على زر التنزيل لفتح رابط التحميل المباشر الآمن عبر MediaFire. تأكد من تحميل كلا التطبيقين لتحصل على الخدمة المثالية.
              </p>
            </div>

            {/* Twin download cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Card 1: YAHIA TV */}
              <div className="relative group rounded-3xl bg-[#0d1122]/90 border border-gray-800/70 p-6 sm:p-8 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl overflow-hidden">
                {/* Background glow effects for card hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-500/10 transition-all"></div>
                
                {/* Header info */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-rose-500/10 text-rose-400 text-xs font-black uppercase tracking-wider py-1.5 px-3.5 rounded-full border border-rose-500/20">
                      التطبيق الأساسي (الواجهة الرئيسية)
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                      <Tv className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                    YAHIA TV
                    <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-0.5 rounded">v2.1.0</span>
                  </h4>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    هذا هو التطبيق الرئيسي الذي يحمل أقسام القنوات التلفزيونية، البث الرياضي المشوق، والأفلام مع قائمة سهلة الاستخدام وتصميم حديث وممتاز.
                  </p>

                  {/* Metrics and file format */}
                  <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/40 p-3 rounded-2xl border border-gray-800/60 text-xs">
                    <div>
                      <span className="text-gray-400 block mb-1">صيغة الملف:</span>
                      <strong className="text-white font-bold">APK (أندرويد)</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">حجم الملف المدور:</span>
                      <strong className="text-rose-400 font-bold">31.32 ميجابايت</strong>
                    </div>
                  </div>
                </div>

                {/* Actions & QR block */}
                <div className="space-y-3.5 pt-4 border-t border-gray-800/80">
                  <a
                    href={appDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => triggerToast('جاري توجيهك إلى خادم MediaFire لتنزيل تطبيق YAHIA TV...')}
                    className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-center font-black rounded-xl transition duration-150 flex items-center justify-center gap-3 shadow-lg shadow-rose-950/20"
                  >
                    <Download className="w-5 h-5" />
                    تنزيل تطبيق YAHIA TV (APK)
                  </a>

                  <div className="flex items-center gap-2.5">
                    {/* Copy Link Button */}
                    <button
                      id="copy-app-link"
                      onClick={() => copyToClipboard(appDownloadUrl, true)}
                      className="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      {copiedAppUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-rose-500" />}
                      <span>{copiedAppUrl ? 'تم نسخ الرابط!' : 'نسخ رابط التحميل'}</span>
                    </button>

                    {/* QR Code toggle */}
                    <button
                      id="qr-app-toggle"
                      onClick={() => setShowAppQr(!showAppQr)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                        showAppQr
                          ? 'bg-rose-500/15 border-rose-500 text-rose-400'
                          : 'bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-300'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>{showAppQr ? 'إغلاق رمز QR' : 'رمز الاستجابة السريعة'}</span>
                    </button>
                  </div>

                  {/* Dynamic QR Display */}
                  {showAppQr && (
                    <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 text-center animate-fade-in flex flex-col items-center max-w-xs mx-auto">
                      <p className="text-gray-900 text-xs font-bold mb-3">
                        امسح الرمز أدناه بكاميرا هاتفك أو بالتلفاز للتحميل مباشرة:
                      </p>
                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(appDownloadUrl)}`}
                          alt="YAHIA TV QR Code"
                          className="w-36 h-36"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 mt-2 block">
                        سيقوم الرمز بفتح صفحة تنزيل الـ APK تلقائياً
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: YAHIA PLAYER */}
              <div className="relative group rounded-3xl bg-[#0d1122]/90 border border-gray-800/70 p-6 sm:p-8 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl overflow-hidden">
                {/* Background glow effects for card hover */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-all"></div>

                {/* Header info */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-indigo-500/15 text-indigo-400 text-xs font-black uppercase tracking-wider py-1.5 px-3.5 rounded-full border border-indigo-500/20">
                      محرك التشغيل الرسمي (إلزامي وتلقائي)
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Play className="w-5 h-5 fill-indigo-400/20" />
                    </div>
                  </div>

                  <h4 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                    YAHIA PLAYER
                    <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-0.5 rounded">v1.0.5</span>
                  </h4>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    المشغل الرسمي والمساعد البرمجي المطلوب. دوره معالجة تدفقات قنوات IPTV وفك تشفير البث الآمن لضمان استقرار المشاهدة وحل مشكلة الشاشة السوداء.
                  </p>

                  {/* Metrics and file format */}
                  <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-900/40 p-3 rounded-2xl border border-gray-800/60 text-xs">
                    <div>
                      <span className="text-gray-400 block mb-1">صيغة الملف:</span>
                      <strong className="text-white font-bold">APK (أندرويد)</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">حجم الملف المدور:</span>
                      <strong className="text-indigo-400 font-bold">22.51 ميجابايت</strong>
                    </div>
                  </div>
                </div>

                {/* Actions & QR block */}
                <div className="space-y-3.5 pt-4 border-t border-gray-800/80">
                  <a
                    href={playerDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => triggerToast('جاري توجيهك إلى خادم MediaFire لتنزيل مشغل YAHIA PLAYER...')}
                    className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-center font-black rounded-xl transition duration-150 flex items-center justify-center gap-3 shadow-lg shadow-indigo-950/20 animate-pulse"
                  >
                    <Download className="w-5 h-5" />
                    تنزيل مشغل YAHIA PLAYER (APK)
                  </a>

                  <div className="flex items-center gap-2.5">
                    {/* Copy Link Button */}
                    <button
                      id="copy-player-link"
                      onClick={() => copyToClipboard(playerDownloadUrl, false)}
                      className="flex-1 py-3 px-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      {copiedPlayerUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
                      <span>{copiedPlayerUrl ? 'تم نسخ الرابط!' : 'نسخ رابط التحميل'}</span>
                    </button>

                    {/* QR Code toggle */}
                    <button
                      id="qr-player-toggle"
                      onClick={() => setShowPlayerQr(!showPlayerQr)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                        showPlayerQr
                          ? 'bg-indigo-500/15 border-indigo-500 text-indigo-400'
                          : 'bg-gray-900 hover:bg-gray-800 border-gray-100/10 text-gray-300'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>{showPlayerQr ? 'إغلاق رمز QR' : 'رمز الاستجابة السريعة'}</span>
                    </button>
                  </div>

                  {/* Dynamic QR Display */}
                  {showPlayerQr && (
                    <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 text-center animate-fade-in flex flex-col items-center max-w-xs mx-auto">
                      <p className="text-gray-900 text-xs font-bold mb-3">
                        امسح الرمز أدناه بكاميرا هاتف أندرويد لتنزيل المشغل إجبارياً:
                      </p>
                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(playerDownloadUrl)}`}
                          alt="YAHIA PLAYER QR Code"
                          className="w-36 h-36"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 mt-2 block">
                        لا يكتمل فتح البث بدون هذا الملف الإضافي الصغير
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Smart Link section */}
        <section id="smartlink" className="py-20 px-4 bg-slate-950 border-t border-gray-800/80 scroll-mt-20 relative overflow-hidden">
          {/* Decorative subtle background visual representing redirection */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-450 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-emerald-500/20">
                <Globe className="w-4 h-4 animate-pulse" />
                استضافة الموقع ونشره برابط احترافي ذكي
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white mb-4">
                توجيه فوري ومغناطيسي للمستخدمين 🚀
              </h3>
              <p className="text-gray-450 text-sm sm:text-base leading-relaxed">
                هل تريد مشاركة موقعك عبر رابط مميز وقصير؟ نحن نوضح لك هنا كيف تستفيد من رابط الاستضافة العام المجاني وتنشئ رابطاً متغيراً ومباشراً يفتح موقعك لجميع زوارك فوراً بلا قيود!
              </p>
            </div>

            {/* Smart info panels split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
              
              {/* Panel A: The Real Active Direct URL */}
              <div className="lg:col-span-5 bg-[#0e1224] border border-emerald-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl"></div>
                
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-black py-1 px-3 rounded-full border border-emerald-500/20">
                      رابط النشر العام الفعّال 🟢
                    </span>
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-3">رابطك العام والدائم (Hosted Link)</h4>
                  <p className="text-gray-450 text-xs sm:text-sm leading-relaxed mb-6">
                    هذا هو الرابط الرسمي الذي تمنحه لك خدمة السحاب للتشغيل والاستضافة المباشرة في Google AI Studio. هو رابط حقيقي دائم، مجاني، وسريع جداً، ويعمل لدى الجميع دون استثناء.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-gray-800/80 mb-6 font-sans">
                    <div className="text-[10px] text-gray-500 font-mono mb-2">رابط الخادم العام المباشر:</div>
                    <div className="text-xs text-emerald-400 font-mono select-all break-all overflow-hidden text-left bg-slate-900/60 p-2.5 rounded-lg border border-gray-800 font-semibold flex items-center justify-between gap-2">
                      <span className="truncate">{getShareableUrl()}</span>
                      <button
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(getShareableUrl())
                              .then(() => {
                                setCopiedPublicUrl(true);
                                setTimeout(() => setCopiedPublicUrl(false), 2000);
                                triggerToast('تم نسخ الرابط العام الجاهز للمشاركة بنجاح!');
                              });
                          } else if (fallbackCopyToClipboard(getShareableUrl())) {
                            setCopiedPublicUrl(true);
                            setTimeout(() => setCopiedPublicUrl(false), 2000);
                            triggerToast('تم نسخ الرابط العام الجاهز للمشاركة بنجاح!');
                          }
                        }}
                        className="p-1 px-2.5 bg-emerald-500/10 text-emerald-400 text-[10px] hover:bg-emerald-500/20 rounded border border-emerald-500/20 font-bold shrink-0 transition cursor-pointer"
                      >
                        {copiedPublicUrl ? 'تم النسخ!' : 'نسخ'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="py-3 px-4 rounded-xl bg-slate-900/40 border border-gray-800 text-[11px] text-gray-400 leading-relaxed">
                  <span className="text-amber-400 font-bold">لماذا يفشل رابط الـ dev؟</span> روابط التطوير التي تحتوي على <strong className="font-mono text-white text-xs whitespace-nowrap">-dev-</strong> تطلب صلاحيات حساب المطور الخاص بك، لذلك لا تفتح مع زوار الموقع. دائماً وزّع الرابط العام أعلاه!
                </div>
              </div>

              {/* Panel B: Short Redirect Generator & Simulator */}
              <div className="lg:col-span-7 bg-[#0b0d1a] border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-rose-500/10 text-rose-400 text-xs font-black py-1 px-3 rounded-full border border-rose-500/20">
                      محاكي ومساعد تقصير الروابط 🔗
                    </span>
                    <Link2 className="w-5 h-5 text-rose-400" />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">اصنع رابطاً مخصصاً يسهل تذكره</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    الرابط الذي تمنحه لك السحابة قد يكون عميقاً وطويلاً، لذا يُفضّل ربطه برابط متغير فوري (Redirect) يحوّل الزائر تلقائياً إلى خادم التنزيل وبنقرة رشيقة واحدة. جرّب محاكي صنع الروابط بالأسفل لمعاينة النتيجة:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-450 mb-2">اسم الرابط المخصص:</label>
                      <input
                        type="text"
                        value={customShortName}
                        onChange={(e) => setCustomShortName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                        className="w-full bg-slate-950 border border-gray-800 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs font-bold font-mono text-left text-white"
                        placeholder="مثال: yahiatv"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-450 mb-2">مزوّد الخدمة الذكية الموصى به:</label>
                      <select
                        value={selectedProvider}
                        onChange={(e) => setSelectedProvider(e.target.value)}
                        className="w-full bg-slate-950 border border-gray-800 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs font-bold text-right text-gray-300"
                      >
                        <option value="bitly">Bitly (بشكل مجاني تماماً)</option>
                        <option value="tinyurl">TinyURL (روابط فائقة السرعة)</option>
                        <option value="rebrandly">Rebrandly (توجيه مخصص باسم نطاقك)</option>
                        <option value="custom">شراء نطاق وحجز دومين مخصص (com / net)</option>
                      </select>
                    </div>
                  </div>

                  {/* Simulator Preview Card */}
                  <div className="bg-[#0b0c15] p-5 rounded-2xl border border-indigo-900/40 relative">
                    <span className="absolute -top-3 right-4 bg-indigo-600/20 text-indigo-400 text-[10px] font-semibold py-0.5 px-2 rounded-md border border-indigo-500/30">
                      معاينة الرابط المتغير المباشر المقترح
                    </span>
                    <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        {selectedProvider === 'bitly' && (
                          <div className="text-sm font-bold text-white font-mono break-all text-left">
                            bit.ly/{customShortName || 'yahiatv'}
                          </div>
                        )}
                        {selectedProvider === 'tinyurl' && (
                          <div className="text-sm font-bold text-white font-mono break-all text-left">
                            tinyurl.com/{customShortName || 'yahiatv'}
                          </div>
                        )}
                        {selectedProvider === 'rebrandly' && (
                          <div className="text-sm font-bold text-white font-mono break-all text-left">
                            rebrand.ly/{customShortName || 'yahiatv'}
                          </div>
                        )}
                        {selectedProvider === 'custom' && (
                          <div className="text-sm font-bold text-white font-mono break-all text-left">
                            www.{customShortName || 'yahia-live'}.com
                          </div>
                        )}
                        <p className="text-[10px] text-gray-400 mt-1">عند النقر، يقوم بتحويل متصفح المستخدم فوراً لموقع البث والتنزيل الخاص بك!</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          let finalLink = `bit.ly/${customShortName || 'yahiatv'}`;
                          if (selectedProvider === 'tinyurl') finalLink = `tinyurl.com/${customShortName || 'yahiatv'}`;
                          if (selectedProvider === 'rebrandly') finalLink = `rebrand.ly/${customShortName || 'yahiatv'}`;
                          if (selectedProvider === 'custom') finalLink = `www.${customShortName || 'yahia-live'}.com`;
                          
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(finalLink)
                              .then(() => triggerToast(`تم نسخ الرابط المقترح: ${finalLink}`));
                          } else if (fallbackCopyToClipboard(finalLink)) {
                            triggerToast(`تم نسخ الرابط المقترح: ${finalLink}`);
                          }
                        }}
                        className="py-2.5 px-5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        نسخ الرابط الذكي المقترح
                      </button>
                    </div>
                  </div>
                </div>

                {/* Configuration steps guide depending on choice */}
                <div className="mt-6 border-t border-gray-800/80 pt-6">
                  <h5 className="text-xs font-bold text-white mb-3">خطوات إعداد هذا الرابط خطوة بخطوة بالصور التوجيهية وتسهيل استضافته:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-440 leading-normal">
                    {selectedProvider !== 'custom' ? (
                      <>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-gray-850">
                          <strong className="text-white block mb-1">1. افتح الموقع المزود</strong>
                          توجّه لموقع <a href={selectedProvider === 'bitly' ? "https://bitly.com" : selectedProvider === 'tinyurl' ? "https://tinyurl.com" : "https://rebrandly.com"} target="_blank" rel="noreferrer" className="text-rose-450 underline inline-flex items-center gap-1 font-bold">المزود <ExternalLink className="w-3 h-3 text-rose-500" /></a> وافتح حسابًا مجانيًا ببساطة.
                        </div>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-gray-850">
                          <strong className="text-white block mb-1">2. الصق رابط الاستضافة العام</strong>
                          اضغط على <strong>Create New Link</strong>، والصق رابطك السحابي الطويل النشط المكتوب في لوحة التحكم جهة اليمين.
                        </div>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-gray-850">
                          <strong className="text-white block mb-1">3. اختر الاسم المخصص</strong>
                          اكتب الاسم المفضل في مربع <strong>Back-half name</strong> (مثلاً: <span className="font-mono text-cyan-400 font-bold">{customShortName || 'yahiatv'}</span>) واصنع الرابط المتغير!
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-gray-850">
                          <strong className="text-white block mb-1">1. شراء الدومين الفريد</strong>
                          توجَّه لأي شركة حجز نطاقات شهيرة مثل <strong>GoDaddy</strong> أو <strong>Namecheap</strong> واشترِ دومين باسمك.
                        </div>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-gray-850">
                          <strong className="text-white block mb-1">2. أضف تحويل النطاق الذكي (Forwarding)</strong>
                          من لوحة تحكم النطاق، توجه لقسم <strong>Domain Forwarding</strong> (توجيه النطاقات).
                        </div>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-gray-850">
                          <strong className="text-white block mb-1">3. الصق رابطك السحابي</strong>
                          الصق رابطك السحابي الفعّال <span className="text-emerald-400">({getShareableUrl().substring(0, 15)}...)</span> واجعله دائمًا (301) ليتم التوجيه فوراً عند دخول الدومين المخصص!
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Quick interactive test block */}
            <div className="bg-gradient-to-r from-rose-950/20 via-slate-900/60 to-rose-950/20 rounded-3xl p-6 sm:p-8 border border-gray-800 text-center max-w-4xl mx-auto">
              <h5 className="font-bold text-white text-base mb-2">تريد تجربة تحويل الرابط الآن مجاناً؟</h5>
              <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-4">
                تعد خدمة <strong>Bitly</strong> الخيار الأمثل والأنسب لمجتمع YAHIA لكونها تمنح روابط مجانية قصيرة لا تنتهي صلاحيتها أبداً وتوفر إحصائيات دقيقة عن عدد الأشخاص الذين ضغطوا على الرابط لتحميل التطبيق الخاص بك.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold bg-[#131c36] text-rose-400 border border-indigo-500/30 px-4 py-2 rounded-full shadow-lg shadow-indigo-950/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>الرابط العام جاهز 100% للنشر والمشاركة المباشرة!</span>
              </div>
            </div>

          </div>
        </section>

        {/* Step-by-Step Installation Guide */}
        <section id="steps" className="py-20 px-4 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-indigo-500/25">
              <Settings className="w-4 h-4 animate-spin" />
              دليل الإرشاد السهل والتثبيت السريع
            </div>
            <h3 className="text-3xl sm:text-5xl font-black text-white mb-4">
              خطوات التثبيت والتشغيل بالتفصيل
            </h3>
            <p className="text-gray-450 text-sm sm:text-base leading-relaxed">
              لتفادي أي مشاكل أو توقف للبث، اتبع الخطوات الـ 4 المرتبة بدقة لتضمن عمل التطبيق بنجاح كامل على جهازك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Step 1 */}
            <div className="bg-gradient-to-b from-[#0e1224] to-[#090b16] rounded-2xl p-6 border border-gray-800 hover:border-rose-500/30 transition-all duration-300 relative">
              <span className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-rose-500 text-white font-extrabold flex items-center justify-center text-lg shadow-lg">
                1
              </span>
              <div className="mb-4 text-rose-450 pt-2">
                <Download className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">تنزيل الملفات أولاً</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                اضغط على الأزرار الزرقاء والحمراء في الأعلى لتنزيل كِلا الملفين بصيغة <strong>APK</strong> على الهاتف أو جهاز التلفزيون الخاص بك.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-[#0e1224] to-[#090b16] rounded-2xl p-6 border border-gray-800 hover:border-rose-500/30 transition-all duration-300 relative">
              <span className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-rose-500 text-white font-extrabold flex items-center justify-center text-lg shadow-lg">
                2
              </span>
              <div className="mb-4 text-amber-500 pt-2">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">السماح بالمصادر المجهولة</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                اذهب إلى إعدادات أندرويد ثم <strong>الأمان</strong>، وقم بتفعيل خيار <strong>تثبيت التطبيقات من مصادر مجهولة</strong> لتتمكن من التثبيت.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-b from-[#0e1224] to-[#090b16] rounded-2xl p-6 border border-gray-800 hover:border-rose-500/30 transition-all duration-300 relative">
              <span className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-rose-500 text-white font-extrabold flex items-center justify-center text-lg shadow-lg">
                3
              </span>
              <div className="mb-4 text-indigo-400 pt-2">
                <PlayCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">تثبيت المشغل أولاً</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                ابدأ بتثبيت ملف <strong>YAHIA Player</strong> لتشغيل تدفق القنوات بالشكل الصحيح وتأمين مسار تشغيل الفيديو في الخلفية.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-b from-[#0e1224] to-[#090b16] rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/30 transition-all duration-300 relative">
              <span className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-rose-500 text-white font-extrabold flex items-center justify-center text-lg shadow-lg">
                4
              </span>
              <div className="mb-4 text-emerald-400 pt-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">تثبيت واستمتع</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                قم بتثبيت تطبيق <strong>YAHIA TV</strong> ثم افتحه بكل سهولة، ستلاحظ ارتباطه الذكي بالمشغل وستفتح الباقات التلفزيونية في ثوانٍ.
              </p>
            </div>

          </div>

          {/* Quick instructions on Smart TV devices (Firestick / TV boxes) */}
          <div className="mt-12 bg-indigo-950/20 border border-indigo-900/30 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/25">
              <Tv2 className="w-8 h-8" />
            </div>
            <div>
              <h5 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                ملاحظة لمستخدمي شاشات التلفزيون والأجهزة الذكية (Android TV & Firestick)
              </h5>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">
                لتثبيت التطبيق على التلفزيون دون متاهات، يرجى كتابة الروابط المباشرة التالية في متصفح التلفزيون أو استخدام تطبيق <strong>Downloader</strong> وكتابة كود التحميل أو تحميلها في هاتفك ثم إرسالها للتلفاز عن طريق شبكة الواي فاي المشتركة.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-900 border border-gray-800 py-1.5 px-3 rounded-lg text-xs font-mono select-all">
                  YAHIA TV Apk Link: {appDownloadUrl.substring(0, 31)}...
                </span>
                <span className="bg-gray-900 border border-gray-800 py-1.5 px-3 rounded-lg text-xs font-mono select-all">
                  YAHIA PLAYER Link: {playerDownloadUrl.substring(0, 31)}...
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Compatibility Details */}
        <section id="features" className="py-20 px-4 bg-slate-900/20 border-t border-gray-800/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            {/* Split layout: text and core checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <span className="bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase py-1.5 px-3.5 rounded-full border border-indigo-500/20 mb-4 inline-block">
                  الأداء الاستثنائي والجودة
                </span>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                  لماذا يتفوق ثنائي YAHIA TV والمشغل معاً؟
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
                  عند دمج مستعرض واجهة القنوات مع مشغله الخاص، ستبتعد تماماً عن المشاكل التقنية التي تظهر في برامج البث الأخرى. هنا نوضح لك أبرز التقنيات التي يستعملها المشغل لتوفير أفضل تجربة ترفيه ذكية.
                </p>

                {/* Bullets layout */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-450 mt-1 border border-emerald-500/20">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">ثبات رهيب في البث المباشر</h4>
                      <p className="text-xs text-gray-400 mt-1">تزامن حصري يضمن تحويل مسار الترددات تلقائياً لمقاومة الضغط على الخوادم.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-450 mt-1 border border-emerald-500/20">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">متوافق مع أجهزة التحكم عن بعد (Remote)</h4>
                      <p className="text-xs text-gray-400 mt-1">واجهة تحكم كاملة في المشغل مخصصة لأجهزة التحكم للتنقل السلس والسريع بداخل الشاشة الذكية.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-450 mt-1 border border-emerald-500/20">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">تعديل جودة الفيديو تلقائياً</h4>
                      <p className="text-xs text-gray-400 mt-1">يدعم المشغل التحويل الديناميكي بين جودة HD و FHD و SD لتناسب سرعة الإنترنت المنزلي لديك.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0b0c15] border border-gray-800/80 p-6 rounded-2xl hover:border-rose-500/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4 border border-orange-500/20">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1.5">إنترنت ضعيف؟</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">المشغل مبرمج باستهلاك بيانات منخفض ونظام ضغط متطور ليعمل بثبات رائع.</p>
                </div>

                <div className="bg-[#0b0c15] border border-gray-800/80 p-6 rounded-2xl hover:border-indigo-500/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1.5">امان وتعديل مخصص</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">ملف الـ APK نظيف تماماً وخالٍ تماماً من البرمجيات الضارة والمزعجة للمستخدمين.</p>
                </div>

                <div className="bg-[#0b0c15] border border-gray-800/80 p-6 rounded-2xl hover:border-teal-500/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4 border border-teal-500/20">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1.5">الأندرويد كله مدعوم</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">يدعم الهواتف بشاشات الطولية واللوحيات والأجهزة بمختلف أحجام الشاشات الممكنة.</p>
                </div>

                <div className="bg-[#0b0c15] border border-gray-800/80 p-6 rounded-2xl hover:border-pink-500/20 transition duration-300">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 border border-pink-500/20">
                    <Play className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-1.5">تشغيل ذاتي نقرة واحدة</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">يفتح المشغل فورياً في الخلفية ويبدأ البث دون الحاجة لضبط معقد في برمجته.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Accordion section */}
        <section id="faq" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              الأسئلة الشائعة حول التطبيق والمشغل
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              إليك إجابات تفصيلية سريعة وموثوقة عن أبرز استفسارات وتساؤلات المستخدمين لحل الصعوبات الشائعة.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/30 border border-gray-800 hover:border-gray-700/80 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-right font-bold text-white text-sm sm:text-base gap-4"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      {item.q}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-450" /> : <ChevronDown className="w-5 h-5 text-gray-450" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-gray-400 text-xs sm:text-sm border-t border-gray-800/40 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Installation Troubleshooting Advice Block */}
        <section className="py-12 px-4 max-w-4xl mx-auto mb-20 bg-rose-950/15 border border-rose-900/30 rounded-3xl">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 shrink-0 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white mb-2">
                دليل حل مشاكل التثبيت وحل خطأ 'حدثت مشكلة أثناء تحليل الحزمة'
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                في بعض الهواتف القديمة، قد تفشل الحزمة في التثبيت. لحل هذه المشكلة اتبع ما يلي:
              </p>
              <ul className="text-gray-400 text-xs list-disc pr-5 space-y-1.5 leading-relaxed">
                <li>
                  تأكد من توفر مساحة تخزين داخلية لا تقل عن 100 ميجابايت فارغة في هاتفك.
                </li>
                <li>
                  قم بإلغاء تنزيل الملفات وإعادة تحميلها مجدداً، حيث تتسبب جودة الإنترنت غير المستقرة في تلف جزئي لملف الـ APK أحياناً.
                </li>
                <li>
                  إذا رفض نظام الحماية Play Protect التثبيت، اضغط على <strong>خيار التفاصيل</strong> ثم اختر <strong>التثبيت على أي حال (Install anyway)</strong> لأن الحزمة غير مسجلة بالمتجر الرسمي، ولا تسبب أي ضرر مطلقاً.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Area */}
      <footer className="bg-[#04060d] border-t border-gray-800/70 pt-16 pb-8 text-center text-gray-450">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right max-w-5xl mx-auto mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tv className="w-6 h-6 text-rose-500" />
                <span className="font-extrabold text-white">تطبيق YAHIA TV</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                موقع تنزيل داعم مخصص لنشر وتبسيط خطوات تثبيت تطبيق البث المباشر المفضل والشهير والمشغل ومساعد فك الشفرة المصاحب له لحلول تشغيل آمنة وسلسة.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">روابط سريعة</h5>
              <ul className="text-xs space-y-2.5">
                <li>
                  <a href="#downloads" className="hover:text-rose-400 transition">تحميل YAHIA TV APK</a>
                </li>
                <li>
                  <a href="#downloads" className="hover:text-indigo-400 transition">تحميل المشغل YAHIA PLAYER</a>
                </li>
                <li>
                  <a href="#steps" className="hover:text-white transition">خطوات التفعيل خطوة بخطوة</a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition">قائمة الأسئلة الشائعة والأمان</a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">تحذير قانوني وإخلاء مسؤولية</h5>
              <p className="text-[11px] text-gray-450 leading-relaxed">
                هذا الموقع يوفر فقط روابط تنزيل معلنة رسمياً من قبل مطوري تطبيق YAHIA لشرح وتحسين تجربة التثبيت على نظام أندرويد. نحن لا نستضيف ملفات التطبيق ولا نعد كخوادم للبث لضمان حقوق النشر المعتمدة.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-gray-500">
              جميع الحقوق محفوظة © {new Date().getFullYear()} - YAHIA TV & PLAYER
            </p>
            <div className="flex items-center gap-4 text-gray-500">
              <span>نظام الأندرويد المدعوم: Android 5.0+</span>
              <span>•</span>
              <button onClick={handleShare} className="hover:text-white transition flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" />
                شارك هذا الموقع
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Persistent Toast Notifications */}
      {toastMessage && (
        <div id="alert-toast" className="fixed bottom-6 left-6 right-6 sm:left-auto sm:max-w-md bg-[#0e1224] border border-rose-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 z-50 animate-bounce">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 mt-0.5 border border-rose-500/20">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold leading-normal">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
