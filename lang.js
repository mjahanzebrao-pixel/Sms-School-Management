/* =====================================================================
   SMS — lang.js
   Urdu / English switching for every screen.

   HOW IT WORKS
   A dictionary of exact English strings maps to Urdu. On switch, the
   whole document is walked and any text node or placeholder matching a
   key *exactly* is swapped. A MutationObserver re-runs on anything the
   modules render afterwards, so dynamically built tables translate too.

   WHY EXACT MATCHES ONLY
   Student names, father names and school names are data, not interface.
   Exact whole-string matching means "Absent" (a column header) is
   translated while "Absent Ali" (if such a name existed) is not. No
   partial replacement, ever.

   NUMBERS STAY LEFT-TO-RIGHT
   Urdu is RTL but Pakistani schools read amounts, dates and admission
   numbers in Western digits, left to right. Those are isolated so RTL
   never reverses "Rs 4,200" into "200,4 sR".
   ===================================================================== */

(function(){

const UR = {
  /* ---- navigation ---- */
  'Students':'طلبہ', 'Fees':'فیس', 'Challans':'چالان', 'Deposit':'جمع',
  'Reminders':'یاد دہانی', 'Attendance':'حاضری', 'Sign out':'لاگ آؤٹ',
  'Refresh':'تازہ کریں',

  /* ---- tabs & headings ---- */
  'Classes & Sections':'جماعتیں اور سیکشن', 'CLASSES & SECTIONS':'جماعتیں اور سیکشن',
  'Import':'درآمد', 'Import Students':'طلبہ درآمد کریں',
  'Fee Heads':'فیس کی مدات', 'Class Fees':'جماعت کی فیس', 'Concessions':'رعایت',
  'Generate':'چالان بنائیں', 'Generate Challans':'چالان بنائیں',
  'Challan Register':'چالان رجسٹر',
  'Fee Counter':'فیس کاؤنٹر', "Today's Collection":'آج کی وصولی',
  'Collection':'وصولی', 'Outstanding':'واجب الادا',
  'Defaulters':'نادہندگان',
  'Mark Register':'حاضری لگائیں', "Today's Status":'آج کی صورتحال',
  'Monthly Report':'ماہانہ رپورٹ',

  /* ---- buttons ---- */
  'Add class':'جماعت شامل کریں', 'Add student':'طالب علم شامل کریں',
  'Add fee head':'فیس کی مد شامل کریں', 'Load standard classes':'معیاری جماعتیں لوڈ کریں',
  'Save':'محفوظ کریں', 'Save class':'جماعت محفوظ کریں',
  'Save student':'طالب علم محفوظ کریں', 'Save fee head':'مد محفوظ کریں',
  'Save register':'حاضری محفوظ کریں', 'Save fee changes':'فیس محفوظ کریں',
  'Save concession':'رعایت محفوظ کریں', 'Save templates':'پیغامات محفوظ کریں',
  'Cancel':'منسوخ', 'Close':'بند کریں', 'Done':'مکمل', 'Remove':'حذف کریں',
  'Clear':'صاف کریں', 'Select all':'سب منتخب کریں', 'Back':'واپس',
  'Print':'پرنٹ', 'Print selected':'منتخب پرنٹ کریں', 'Print receipt':'رسید پرنٹ کریں',
  'Print day book':'روزنامچہ پرنٹ کریں', 'Edit':'ترمیم', 'Open':'کھولیں',
  'Receive':'وصول کریں', 'Reverse':'واپس کریں', 'Skip':'چھوڑیں', 'Stop':'روکیں',
  'Choose file':'فائل منتخب کریں', 'Change file':'فائل بدلیں',
  'Check for errors':'غلطیاں چیک کریں', 'Check the run':'جانچ کریں',
  'Save students':'طلبہ محفوظ کریں', 'Issue challans':'چالان جاری کریں',
  'New run':'نیا رن', 'Open register':'رجسٹر کھولیں',
  'Start sending':'بھیجنا شروع کریں', 'Open WhatsApp':'واٹس ایپ کھولیں',
  'Sent, next':'بھیج دیا، اگلا', 'Edit messages':'پیغامات میں ترمیم',
  'Reset all present':'سب حاضر کریں', 'Import another file':'دوسری فائل درآمد کریں',
  'Back to columns':'کالم پر واپس', 'Annual revision':'سالانہ نظرثانی',
  'Copy one class to others':'ایک جماعت سے دوسری میں نقل',
  'Copy fees':'فیس نقل کریں', 'Apply revision':'نظرثانی لاگو کریں',
  'Set concession':'رعایت مقرر کریں',

  /* ---- table headers ---- */
  'Student':'طالب علم', 'Father':'والد', 'Class':'جماعت', 'Section':'سیکشن',
  'Roll':'رول نمبر', 'Roll no':'رول نمبر', 'Adm. No':'داخلہ نمبر',
  'Adm No':'داخلہ نمبر', 'Admission no':'داخلہ نمبر', 'Admission No':'داخلہ نمبر',
  'Status':'حالت', 'Amount':'رقم', 'Month':'مہینہ', 'Date':'تاریخ',
  'Time':'وقت', 'Method':'طریقہ', 'Receipt':'رسید', 'Challan':'چالان',
  'Arrears':'بقایا جات', 'Payable':'قابل ادائیگی', 'Charged':'واجب',
  'Paid':'ادا شدہ', 'Fine':'جرمانہ', 'Fine now':'موجودہ جرمانہ',
  'Discount':'رعایت', 'Particulars':'تفصیل', 'Strength':'تعداد',
  'Present':'حاضر', 'Absent':'غیر حاضر', 'Leave':'رخصت', 'Late':'تاخیر',
  'Days':'دن', 'Overdue':'زائد المیعاد', 'Guardian':'سرپرست',
  'Marked by':'حاضری لگانے والا', 'Applied to':'کس کے لیے',
  'Fee head':'فیس کی مد', 'Billing':'بلنگ', 'Classes set':'مقررہ جماعتیں',
  'Type':'قسم', 'Off / month':'ماہانہ رعایت', 'Special amounts':'خصوصی رقوم',
  'Last reminded':'آخری یاد دہانی', 'Oldest due':'قدیم ترین واجب',
  'Monthly total':'ماہانہ کل', 'This month':'اس ماہ',

  /* ---- field labels ---- */
  'Student name':'طالب علم کا نام', 'Father name':'والد کا نام',
  'Class name':'جماعت کا نام', 'Urdu name':'اردو نام',
  'Guardian WhatsApp':'سرپرست واٹس ایپ', 'Father CNIC':'والد کا شناختی کارڈ',
  'B-Form / CRC':'ب فارم / سی آر سی', 'Gender':'جنس', 'Male':'مرد', 'Female':'عورت',
  'Date of birth':'تاریخ پیدائش', 'Address':'پتہ', 'Guardian name':'سرپرست کا نام',
  'Amount received':'وصول شدہ رقم', 'Reference / slip no':'حوالہ / سلپ نمبر',
  'Due date':'آخری تاریخ', 'Year':'سال', 'Name':'نام',
  'Sort order':'ترتیب', 'Order on challan':'چالان پر ترتیب',
  'Concession type':'رعایت کی قسم', 'Amount off per month (Rs)':'ماہانہ رعایت (روپے)',
  'Message':'پیغام', 'Template':'سانچہ', 'Kind':'قسم',
  'Copy from':'سے نقل کریں', 'Copy to':'میں نقل کریں', 'Increase by':'اضافہ',
  'Apply to':'لاگو کریں', 'All fee heads':'تمام مدات',

  /* ---- stat labels ---- */
  'Billed':'بل شدہ', 'Collected':'وصول شدہ', 'Cash':'نقد',
  'Other methods':'دیگر طریقے', 'Receipts':'رسیدیں',
  'Students':'طلبہ', 'Rows read':'قطاریں پڑھیں', 'Will be added':'شامل ہوں گے',
  'Will be updated':'اپ ڈیٹ ہوں گے', 'Will be skipped':'چھوڑے جائیں گے',
  'Added':'شامل کیے', 'Updated':'اپ ڈیٹ ہوئے', 'Skipped':'چھوڑے گئے',
  'Issued':'جاری شدہ', 'Arrears carried':'منتقل شدہ بقایا',
  'Total payable':'کل قابل ادائیگی', 'Average due':'اوسط واجب',
  'Over 30 days':'30 دن سے زائد', 'Sections marked':'حاضری شدہ سیکشن',
  'Total strength':'کل تعداد', 'Average attendance':'اوسط حاضری',
  'Below 75%':'75% سے کم', 'Days marked':'حاضری کے دن',
  'Challans to issue':'جاری کرنے کے لیے چالان',
  'Bad or missing number':'غلط یا غائب نمبر',

  /* ---- filters & options ---- */
  'All classes':'تمام جماعتیں', 'All sections':'تمام سیکشن', 'All':'تمام',
  'Unpaid':'غیر ادا شدہ', 'Part paid':'جزوی ادا', 'All overdue':'تمام زائد المیعاد',
  '15+ days':'15+ دن', '30+ days':'30+ دن', '60+ days':'60+ دن',
  'Search':'تلاش', 'Only those who owe':'صرف واجب الادا',
  'or browse':'یا براؤز کریں', 'Active only':'صرف فعال',
  'Bank slip':'بینک سلپ', 'Cheque':'چیک', 'Online':'آن لائن',
  'Choose class…':'جماعت منتخب کریں…', 'Monthly':'ماہانہ', 'One-off':'یکبارگی',
  'Marked':'ہو گئی', 'Pending':'باقی', 'Reversed':'واپس شدہ',
  'Tuition':'ٹیوشن', 'Transport':'ٹرانسپورٹ', 'Exam':'امتحان',
  'Admission':'داخلہ', 'Annual':'سالانہ', 'Other':'دیگر',
  'Sibling':'بہن بھائی', 'Scholarship':'وظیفہ', 'Staff child':'ملازم کا بچہ',
  'None':'کوئی نہیں', 'never':'کبھی نہیں',

  /* ---- steps ---- */
  'Choose file':'فائل منتخب کریں', 'Match columns':'کالم ملائیں',
  'Check errors':'غلطیاں دیکھیں', 'Choose month':'مہینہ منتخب کریں',
  'Check the run':'جانچ کریں', 'Preview':'جھلک', 'Problems found':'مسائل',
};

const KEYS = Object.keys(UR).sort((a,b)=>b.length-a.length);
const SKIP = new Set(['SCRIPT','STYLE','TEXTAREA','CODE','PRE']);

let mode = 'en';
let observer = null;

function translateNode(root){
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n){
      if (SKIP.has(n.parentNode.nodeName)) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const jobs = [];
  let n;
  while ((n = walker.nextNode())) jobs.push(n);

  jobs.forEach(node=>{
    const raw = node.nodeValue;
    const key = raw.trim();
    if (mode === 'ur') {
      if (UR[key]) {
        if (!node._en) node._en = raw;
        node.nodeValue = raw.replace(key, UR[key]);
      }
    } else if (node._en) {
      node.nodeValue = node._en;
      delete node._en;
    }
  });

  root.querySelectorAll?.('[placeholder]').forEach(el=>{
    if (mode === 'ur') {
      const k = el.placeholder.trim();
      if (UR[k]) { el._enPh = el.placeholder; el.placeholder = UR[k]; }
    } else if (el._enPh) { el.placeholder = el._enPh; delete el._enPh; }
  });
}

function apply(){
  if (observer) observer.disconnect();

  document.documentElement.lang = (mode === 'ur') ? 'ur' : 'en';
  document.body.dir = (mode === 'ur') ? 'rtl' : 'ltr';
  document.body.classList.toggle('sms-urdu', mode === 'ur');

  translateNode(document.body);

  const btn = document.getElementById('smsLangBtn');
  if (btn) btn.textContent = (mode === 'ur') ? 'English' : 'اردو';

  if (observer) observer.observe(document.body, {childList:true, subtree:true});
}

function toggle(){
  mode = (mode === 'ur') ? 'en' : 'ur';
  try { localStorage.setItem('sms_lang', mode); } catch(e){}
  apply();
}

function init(){
  /* Nastaliq for Urdu text; numbers keep the Latin face and LTR flow. */
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600&display=swap';
  document.head.appendChild(link);

  const css = document.createElement('style');
  css.textContent = `
    body.sms-urdu{font-family:'Noto Nastaliq Urdu','IBM Plex Sans',serif;line-height:2.05}
    body.sms-urdu .lbl{letter-spacing:0;font-family:'Noto Nastaliq Urdu',sans-serif;font-size:12.5px}
    body.sms-urdu .tab,body.sms-urdu .btn,body.sms-urdu thead th,
    body.sms-urdu .head h2,body.sms-urdu .brand h1{letter-spacing:0;text-transform:none}
    body.sms-urdu .num,body.sms-urdu td.r,body.sms-urdu .stat .v,
    body.sms-urdu input,body.sms-urdu .amt{
      font-family:'IBM Plex Mono',monospace;direction:ltr;unicode-bidi:isolate}
    body.sms-urdu td.r,body.sms-urdu th.r{text-align:left}
    body.sms-urdu .sc-bal,body.sms-urdu .cno{text-align:left}
    #smsLangBtn{font-family:'Noto Nastaliq Urdu','Barlow Condensed',sans-serif}
  `;
  document.head.appendChild(css);

  /* toggle sits in the nav if there is one, otherwise floats */
  const nav = document.querySelector('.nav');
  const btn = document.createElement('button');
  btn.id = 'smsLangBtn';
  btn.className = 'btn';
  btn.textContent = 'اردو';
  btn.onclick = toggle;
  if (nav) nav.insertBefore(btn, nav.firstChild);
  else {
    btn.style.cssText='position:fixed;top:12px;right:12px;z-index:200';
    document.body.appendChild(btn);
  }

  observer = new MutationObserver(muts=>{
    if (mode !== 'ur') return;
    observer.disconnect();
    muts.forEach(m=>m.addedNodes.forEach(n=>{
      if (n.nodeType === 1) translateNode(n);
      else if (n.nodeType === 3 && UR[n.nodeValue.trim()]) {
        n._en = n.nodeValue;
        n.nodeValue = UR[n.nodeValue.trim()];
      }
    }));
    observer.observe(document.body, {childList:true, subtree:true});
  });

  try { mode = localStorage.getItem('sms_lang') || 'en'; } catch(e){ mode = 'en'; }
  apply();
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', init);
else init();

window.smsLang = { toggle, get mode(){ return mode; } };

})();
