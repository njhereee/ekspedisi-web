// ============================
// PT Tunas Tumbur Sejahtera
// Complete JavaScript - Updated
// ============================

// Safe fallback so errors don't block other features
if (typeof window !== 'undefined' && typeof window.renderFleet !== 'function') {
  window.renderFleet = function() { /* no-op fallback */ };
}

document.addEventListener("DOMContentLoaded", function() {
  // ---------- HELPERS ----------
  const $ = function(sel, root) {
    root = root || document;
    return root.querySelector(sel);
  };
  
  const $$ = function(sel, root) {
    root = root || document;
    return Array.from(root.querySelectorAll(sel));
  };

  // ---------- HEADER SCROLL ----------
  const header = document.getElementById('mainHeader');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      if (header) header.classList.add('is-solid');
    } else {
      if (header) header.classList.remove('is-solid');
    }
    lastScroll = currentScroll;
  });

  // ---------- HAMBURGER MENU ACTION ----------
  const hamburger = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('navDropdown');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isHidden = mobileMenu.hidden;
      mobileMenu.hidden = !isHidden;
      hamburger.setAttribute('aria-expanded', !isHidden);
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && e.target !== hamburger) {
        mobileMenu.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- FADE UP ANIMATION untuk Why Choose Us ----------
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('fade-in');
        }, index * 150);
      }
    });
  }, observerOptions);

  const whyListItems = document.querySelectorAll('.list-why li');
  whyListItems.forEach(function(li) {
    fadeObserver.observe(li);
  });

  // ---------- DICTIONARY ----------
  const dict = {
    id: {
      "nav.about": "Tentang Kami",
      "nav.vision": "Visi & Misi",
      "nav.services": "Layanan",
      "nav.fleet": "Armada",
      "nav.portfolio": "Portofolio",
      "nav.contact": "Kontak",
      "hero.title": "Solusi Armada Terpercaya untuk Bisnis Anda",
      "hero.desc": "Kami menyediakan solusi armada yang inovatif dan terpercaya untuk membantu bisnis Anda mencapai tujuan dengan layanan distribusi container via darat, haulage pelabuhan, dan logistik proyek.",
      "about.title": "Tentang Kami",
      "about.desc": "PT Tunas Tumbur Sejahtera (TTS) memahami bahwa setiap bisnis memiliki kebutuhan yang unik. Kami menyediakan kendaraan yang tepat sesuai anggaran dan persyaratan operasional, dengan fokus pada keandalan, inovasi, dan kepuasan pelanggan.",
      "about.profile1": "Kami, PT. Tunas Tumbur Sejahtera (TTS Transport) karena itulah kami menyediakan layanan pengangkutan dan pengiriman barang yang professional, yang dapat menyentuh kebutuhan anda dalam membantu menyediakan pelayanan yang baik dalam pengangkutan dan pengiriman barang kepada pelanggan/ partner usaha anda sehingga akan memberikan kesan dan kesetiaan perusahaan anda dari para pelanggan dan partner usaha anda.",
      "about.profile2": "Demikianlah Company Profile singkat PT. Tunas Tumbur Sejahtera (TTS Transport) yang dapat diberikan untuk menjadi bahan pertimbangan didalam melakukan hubungan kerja sama / partner yang saling menguntungkan untuk kedua belah pihak. Bilamana ada hal-hal yang masih belum jelas, PT. Tunas Tumbur Sejahtera (TTS Transport) bersedia untuk menjelaskan maksud dan tujuan di atas lebih lanjut baik langsung, melalui surat, telepon atupun e-mail. Atas perhatian dan kerjasamanya, PT. Tunas Tumbur Sejahtera (TTS Transport) mengucapkan, Terima Kasih.",
      "about.whatIs.title": "Apa Itu Tunas Tumbur Sejahtera?",
      "about.whatIs.desc": "PT Tunas Tumbur Sejahtera (TTS Transport) hadir untuk membantu bisnis Anda mencapai tujuan dengan solusi armada yang inovatif dan terpercaya. PT Tunas Tumbur Sejahtera (TTS Transport) memahami bahwa setiap bisnis memiliki kebutuhan yang unik, dan kami siap menyediakan kendaraan yang tepat, sesuai dengan anggaran dan persyaratan operasional Anda.",
      "why.title": "Mengapa Memilih Kami?",
      "why.1.title": "Armada Terlengkap dan Terawat",
      "why.1.desc": "Kami memiliki berbagai jenis kendaraan yang selalu dalam kondisi prima, siap memenuhi segala kebutuhan transportasi bisnis Anda.",
      "why.2.title": "Pengalaman dan Keahlian",
      "why.2.desc": "Dengan pengalaman kami dan tim profesional, kami siap memberikan solusi armada yang efektif dan efisien.",
      "why.3.title": "Harga Kompetitif",
      "why.3.desc": "Kami menawarkan harga yang bersaing dengan fleksibilitas yang sesuai dengan anggaran Anda.",
      "vision.title": "Visi & Misi",
      "vision.intro": "Kami berkomitmen untuk menghadirkan solusi armada yang andal, aman, dan inovatif guna mendukung pertumbuhan bisnis Anda secara berkelanjutan.",
      "vision.visionTitle": "Visi",
      "vision.visionText": "Menjadi penyedia solusi armada terkemuka yang dikenal karena keandalan, inovasi, dan komitmen terhadap kepuasan pelanggan.",
      "vision.missionTitle": "Misi",
      "vision.mission1": "Menyediakan armada berkualitas tinggi yang selalu dalam kondisi prima",
      "vision.mission2": "Memberikan layanan pelanggan yang responsif dan personal",
      "vision.mission3": "Membangun hubungan jangka panjang dengan pelanggan dan mitra",
      "services.title": "Layanan Kami",
      "services.overview": "Perusahaan yang bergerak dibidang usaha jasa pengiriman barang, termasuk paket/parcel dan dokumen, dengan sistem service Door To Door (DTD), Door To Port (DTP), Port To Port (PTP) dan Port To Door (PTD), sesuai dengan keinginan customer. Diharapkan, PT. Tunas Tumbur Sejahtera (TTS Transport) dapat membantu pelanggan untuk pengangkutan dan pengiriman barangnya baik melalui darat, laut dan udara ke seluruh Indonesia maupun Internasional.",
      "services.op1": "Pelayanan tepat waktu dengan semua jenis armada yang dibutuhkan baik box maupun terbuka/triway",
      "services.op2": "Memberikan Briefing setiap pagi dan sebelum berangkat ke lokasi muat untuk tim hingga driver",
      "services.lead": "Sebagai penyedia layanan logistik terpercaya, kami menghadirkan solusi Full Truck Load (FTL) yang efisien, aman, dan tepat waktu untuk memenuhi kebutuhan pengiriman skala besar Anda.",
      "services.1.title": "TRUCKING",
      "services.1.desc": "Dapat mensupport pengiriman Blindvan, Traga Box, Pickup Bak, CDE Box, CDE Bak, CDD Box, CDD Bak, CDD Triway, CDD Long Box, Fuso Box, Wingbox, Tronton, Trailer 20ft & 40ft, dan Dump Truck.",
      "services.2.title": "PLANNING TRUCKING",
      "services.2.1": "Pelayanan tepat waktu dengan semua jenis armada yang dibutuhkan baik box maupun terbuka/triway.",
      "services.2.2": "Memberikan Briefing setiap pagi dan sebelum berangkat ke lokasi muat untuk tim hingga driver.",
      "fleet.title": "Armada Kami",
      "fleet.lead": "Pilihan unit untuk kebutuhan container trucking (darat & laut). Klik untuk melihat detail.",
      "contact.title": "Hubungi Kami",
      "contact.desc": "Tim kami siap membantu kebutuhan pengiriman kontainer Anda.",
      "contact.addrLabel": "ALAMAT KANTOR",
      "portfolio.title": "Portofolio Kami",
      "portfolio.desc": "Lihat berbagai proyek dan layanan pengiriman yang telah kami tangani untuk klien-klien kami di seluruh Indonesia",
      "portfolio.filter.all": "Semua",
      "portfolio.filter.box": "Pengiriman Box",
      "portfolio.filter.flatbed": "Pengiriman Bak",
      "portfolio.filter.special": "Proyek Khusus",
      "portfolio.filter.intercity": "Antarkota",
      "portfolio.filter.interisland": "Antarpulau",
      "footer.rights": "Semua hak cipta dilindungi.",
      "footer.contactTitle": "Hubungi Kami",
      "footer.mapLink": "lihat di google maps →",
      "footer.addressLabel": "ALAMAT KAMI",
      "footer.address": "Jl. Ketapang Raya, Blok DD 19 No. 2,<br>RT.001/RW.009, Pekayon Jaya,<br>Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148",
      "footer.contactsLabel": "KONTAK KAMI"
    },
    en: {
      "nav.about": "About Us",
      "nav.vision": "Vision & Mission",
      "nav.services": "Services",
      "nav.fleet": "Fleet",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "hero.title": "Trusted Fleet Solutions for Your Business",
      "hero.desc": "We provide innovative and reliable fleet solutions to help your business achieve its goals with land container distribution services, port haulage, and project logistics.",
      "about.title": "About Us",
      "about.desc": "PT Tunas Tumbur Sejahtera (TTS) understands that every business has unique needs. We provide the right vehicles according to budget and operational requirements, with a focus on reliability, innovation, and customer satisfaction.",
      "about.profile1": "We at PT. Tunas Tumbur Sejahtera (TTS Transport) provide professional freight and delivery services tailored to your needs. We help you deliver excellent transportation and shipping services to your customers and business partners, strengthening your company’s reputation and fostering their loyalty.",
      "about.profile2": "This brief company profile of PT. Tunas Tumbur Sejahtera (TTS Transport) is provided for your consideration in establishing a mutually beneficial partnership. Should anything remain unclear, PT. Tunas Tumbur Sejahtera (TTS Transport) is ready to further explain the objectives above, either in person or via letter, phone, or email. Thank you for your attention and cooperation.",
      "about.whatIs.title": "What is Tunas Tumbur Sejahtera?",
      "about.whatIs.desc": "PT Tunas Tumbur Sejahtera (TTS Transport) is here to help your business achieve its goals with innovative and reliable fleet solutions. PT Tunas Tumbur Sejahtera (TTS Transport) understands that every business has unique needs, and we are ready to provide the right vehicles according to your budget and operational requirements.",
      "why.title": "Why Choose Us?",
      "why.1.title": "Complete and Well-Maintained Fleet",
      "why.1.desc": "We have various types of vehicles that are always in prime condition, ready to meet all your business transportation needs.",
      "why.2.title": "Experience and Expertise",
      "why.2.desc": "With our experience and professional team, we are ready to provide effective and efficient fleet solutions.",
      "why.3.title": "Competitive Pricing",
      "why.3.desc": "We offer competitive prices with flexibility that suits your budget.",
      "vision.title": "Vision & Mission",
      "vision.intro": "We are committed to delivering reliable, safe, and innovative fleet solutions to sustainably support your business growth.",
      "vision.visionTitle": "Vision",
      "vision.visionText": "To become a leading fleet solution provider known for reliability, innovation, and commitment to customer satisfaction.",
      "vision.missionTitle": "Mission",
      "vision.mission1": "Provide high-quality fleet that is always in prime condition",
      "vision.mission2": "Deliver responsive and personal customer service",
      "vision.mission3": "Build long-term relationships with customers and partners",
      "services.title": "Our Services",
      "services.overview": "A company engaged in freight forwarding services, including packages/parcels and documents, with Door To Door (DTD), Door To Port (DTP), Port To Port (PTP) and Port To Door (PTD) service systems, according to customer needs. We hope PT. Tunas Tumbur Sejahtera (TTS Transport) can help customers for transporting and shipping their goods by land, sea and air throughout Indonesia and internationally.",
      "services.op1": "On-time service with all types of fleet needed, both box and open/triway",
      "services.op2": "Providing daily morning briefings and pre-departure briefings for the team and drivers heading to the loading location",
      "services.lead": "As a trusted logistics service provider, we deliver efficient, safe, and timely Full Truck Load (FTL) solutions to meet your large-scale shipping needs.",
      "services.1.title": "TRUCKING",
      "services.1.desc": "We support deliveries using Blindvan, Traga Box, Pickup Flatbed, CDE Box, CDE Flatbed, CDD Box, CDD Flatbed, CDD Triway, CDD Long Box, Fuso Box, Wingbox, Tronton, 20ft & 40ft Trailers, and Dump Trucks.",
      "services.2.title": "TRUCKING PLANNING",
      "services.2.1": "On-time service with all types of fleet needed, both box and open/triway.",
      "services.2.2": "Providing daily morning briefings and pre-departure briefings for the team and drivers heading to the loading location.",
      "fleet.title": "Our Fleet",
      "fleet.lead": "Unit options for container trucking needs (land & sea). Click to see details.",
      "contact.title": "Contact Us",
      "contact.desc": "Our team is ready to assist with your container shipping needs.",
      "contact.addrLabel": "OFFICE ADDRESS",
      "portfolio.title": "Our Portfolio",
      "portfolio.desc": "See various projects and delivery services we have handled for our clients throughout Indonesia",
      "portfolio.filter.all": "All",
      "portfolio.filter.box": "Box Delivery",
      "portfolio.filter.flatbed": "Flatbed Delivery",
      "portfolio.filter.special": "Special Projects",
      "portfolio.filter.intercity": "Intercity",
      "portfolio.filter.interisland": "Inter-island",
      "footer.rights": "All rights reserved.",
      "footer.contactTitle": "Contact us",
      "footer.mapLink": "look at google maps →",
      "footer.addressLabel": "OUR ADDRESS",
      "footer.address": "Jl. Ketapang Raya, Blok DD 19 No. 2,<br>RT.001/RW.009, Pekayon Jaya,<br>Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148",
      "footer.contactsLabel": "OUR CONTACTS"
    }
  };

  // ---------- LANGUAGE TOGGLE ----------
  let currentLang = localStorage.getItem('tts_lang') || 'id';
  
  const langToggle = document.getElementById('langToggle');
  const langToggleDD = document.getElementById('langToggleDD');
  const flagImg = document.getElementById('flagImg');
  const flagImgDD = document.getElementById('flagImgDD');
  const langText = document.getElementById('langText');
  const langTextDD = document.getElementById('langTextDD');
  
  const updateLanguageUI = function(lang) {
    // Update flag images
    if (flagImg) {
      flagImg.src = lang === 'en' ? 'asset/EN.jpg' : 'asset/ID.jpg';
    }
    if (flagImgDD) {
      flagImgDD.src = lang === 'en' ? 'asset/EN.jpg' : 'asset/ID.jpg';
    }
    
    // Update text
    if (langText) {
      langText.textContent = lang === 'en' ? 'EN' : 'ID';
    }
    if (langTextDD) {
      langTextDD.textContent = lang === 'en' ? 'EN' : 'ID';
    }
    
    // Update all translatable content
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
    
    localStorage.setItem('tts_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    
    // Re-render fleet with new language
    renderFleet();
  };
  
  const toggleLanguage = function() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguageUI(currentLang);
  };
  
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }
  
  if (langToggleDD) {
    langToggleDD.addEventListener('click', function() {
      toggleLanguage();
      // Close mobile menu after language switch
      if (mobileMenu) {
        mobileMenu.hidden = true;
      }
    });
  }
  
  // Initialize language on load
  updateLanguageUI(currentLang);

  // ---------- DATA ARMADA ----------
  const daftarTruck = [
    { 
      id: "blindvan", 
      name: "Blindvan", 
      image: "asset/Blindvan.png", 
      capacity: "0.8 Ton / 3 CBM",
      descID: "Kendaraan cepat tertutup, cocok untuk pengiriman barang bernilai tinggi atau dalam jumlah kecil.",
      descEN: "Fast, enclosed vehicle, suitable for high-value or small-quantity shipments."
    },
    { 
      id: "traga_box", 
      name: "Traga Box", 
      image: "asset/traga_box.png", 
      capacity: "2.5 Ton / 6 CBM",
      descID: "Truk ringan box yang lincah, ideal untuk pengiriman di dalam kota atau jarak dekat.",
      descEN: "Agile light box truck, ideal for inner-city or short-distance delivery."
    },
    { 
      id: "pickup_bak", 
      name: "Pickup Bak", 
      image: "asset/cde back.png", 
      capacity: "1 Ton / 3 CBM",
      descID: "Pickup dengan bak terbuka untuk pengangkutan barang ringan dan material.",
      descEN: "Pickup with open bed for light cargo and material transport."
    },
    { 
      id: "cde_box", 
      name: "CDE Box", 
      image: "asset/CDE Box.png", 
      capacity: "2 Ton / 6 CBM",
      descID: "Truk box CDE untuk pengiriman barang dengan perlindungan dari cuaca.",
      descEN: "CDE box truck for shipments with weather protection."
    },
    { 
      id: "cde_bak", 
      name: "CDE Bak", 
      image: "asset/cde back.png", 
      capacity: "2 Ton / 5 CBM",
      descID: "Truk CDE dengan bak terbuka untuk muatan yang tidak memerlukan penutup.",
      descEN: "CDE truck with open bed for cargo that doesn't require cover."
    },
    { 
      id: "cde_triway", 
      name: "CDE Triway", 
      image: "asset/cde triway.png", 
      capacity: "2 Ton / 4 CBM",
      descID: "Truk dengan bak triway (buka 3 sisi) untuk kemudahan bongkar muat.",
      descEN: "Truck with triway bed (3-side opening) for easy loading and unloading."
    },
    { 
      id: "cdd_box", 
      name: "CDD Box", 
      image: "asset/CDD box.png", 
      capacity: "4 Ton / 12 CBM",
      descID: "Truk box medium untuk pengiriman antarkota dengan kapasitas lebih besar.",
      descEN: "Medium box truck for intercity delivery with greater capacity."
    },
    { 
      id: "cdd_bak", 
      name: "CDD Bak", 
      image: "asset/CDD Bak.png", 
      capacity: "4 Ton / 12 CBM",
      descID: "Truk bak terbuka serbaguna untuk muatan barang curah.",
      descEN: "Versatile open bed truck for bulk cargo."
    },
    { 
      id: "cdd_longbox", 
      name: "CDD Long Box", 
      image: "asset/CCD Longbox.png", 
      capacity: "4 Ton / 15 CBM",
      descID: "Box panjang untuk barang bervolume besar seperti furniture.",
      descEN: "Long box for high-volume goods such as furniture."
    },
    { 
      id: "fuso_box", 
      name: "Fuso Box", 
      image: "asset/Fuso Bpx.png", 
      capacity: "8 Ton / 25 CBM",
      descID: "Truk Fuso berkapasitas besar untuk distribusi skala besar.",
      descEN: "Large capacity Fuso truck for large-scale distribution."
    },
    { 
      id: "wingbox", 
      name: "Wingbox", 
      image: "asset/background.jpg", 
      capacity: "8 Ton / 30 CBM",
      descID: "Truk dengan pintu samping yang dapat terbuka seperti sayap untuk kemudahan akses.",
      descEN: "Truck with side doors that open like wings for easy access."
    },
    { 
      id: "tronton", 
      name: "Tronton", 
      image: "asset/background.jpg", 
      capacity: "15 Ton / 40 CBM",
      descID: "Truk tronton berkapasitas sangat besar untuk muatan berat.",
      descEN: "Very large capacity tronton truck for heavy loads."
    },
    { 
      id: "trailer", 
      name: "Trailer 20ft & 40ft", 
      image: "asset/background.jpg", 
      capacity: "20-30 Ton",
      descID: "Container trailer 20ft dan 40ft untuk pengiriman kargo skala besar.",
      descEN: "Container trailers 20ft and 40ft for large-scale cargo shipping."
    },
    { 
      id: "dump_truck", 
      name: "Dump Truck", 
      image: "asset/background.jpg", 
      capacity: "10 Ton",
      descID: "Dump truck untuk material konstruksi seperti pasir, tanah, dan kerikil.",
      descEN: "Dump truck for construction materials such as sand, soil, and gravel."
    }
  ];

// ============================
// PT Tunas Tumbur Sejahtera
// Complete JavaScript - Updated
// ============================

document.addEventListener("DOMContentLoaded", function() {
  // ---------- HELPERS ----------
  const $ = function(sel, root) {
    root = root || document;
    return root.querySelector(sel);
  };
  
  const $$ = function(sel, root) {
    root = root || document;
    return Array.from(root.querySelectorAll(sel));
  };

  // ---------- HEADER SCROLL ----------
  const header = document.getElementById('mainHeader');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      if (header) header.classList.add('is-solid');
    } else {
      if (header) header.classList.remove('is-solid');
    }
    lastScroll = currentScroll;
  });

  // ---------- HAMBURGER MENU ACTION ----------
  const hamburger = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('navDropdown');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isHidden = mobileMenu.hidden;
      mobileMenu.hidden = !isHidden;
      hamburger.setAttribute('aria-expanded', !isHidden);
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && e.target !== hamburger) {
        mobileMenu.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- FADE UP ANIMATION untuk Why Choose Us ----------
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('fade-in');
        }, index * 150);
      }
    });
  }, observerOptions);

  const whyListItems = document.querySelectorAll('.list-why li');
  whyListItems.forEach(function(li) {
    fadeObserver.observe(li);
  });

  // ---------- DICTIONARY ----------
  const dict = {
    id: {
      "nav.about": "Tentang Kami",
      "nav.vision": "Visi & Misi",
      "nav.services": "Layanan",
      "nav.fleet": "Armada",
      "nav.portfolio": "Portofolio",
      "nav.contact": "Kontak",
      "hero.title": "Solusi Armada Terpercaya untuk Bisnis Anda",
      "hero.desc": "Kami menyediakan solusi armada yang inovatif dan terpercaya untuk membantu bisnis Anda mencapai tujuan dengan layanan distribusi container via darat, haulage pelabuhan, dan logistik proyek.",
      "about.title": "Tentang Kami",
      "about.desc": "PT Tunas Tumbur Sejahtera (TTS) memahami bahwa setiap bisnis memiliki kebutuhan yang unik. Kami menyediakan kendaraan yang tepat sesuai anggaran dan persyaratan operasional, dengan fokus pada keandalan, inovasi, dan kepuasan pelanggan.",
      "about.whatIs.title": "Apa Itu Tunas Tumbur Sejahtera?",
      "about.whatIs.desc": "PT Tunas Tumbur Sejahtera (TTS Transport) hadir untuk membantu bisnis Anda mencapai tujuan dengan solusi armada yang inovatif dan terpercaya. PT Tunas Tumbur Sejahtera (TTS Transport) memahami bahwa setiap bisnis memiliki kebutuhan yang unik, dan kami siap menyediakan kendaraan yang tepat, sesuai dengan anggaran dan persyaratan operasional Anda.",
      "why.title": "Mengapa Memilih Kami?",
      "why.1.title": "Armada Terlengkap dan Terawat",
      "why.1.desc": "Kami memiliki berbagai jenis kendaraan yang selalu dalam kondisi prima, siap memenuhi segala kebutuhan transportasi bisnis Anda.",
      "why.2.title": "Pengalaman dan Keahlian",
      "why.2.desc": "Dengan pengalaman kami dan tim profesional, kami siap memberikan solusi armada yang efektif dan efisien.",
      "why.3.title": "Harga Kompetitif",
      "why.3.desc": "Kami menawarkan harga yang bersaing dengan fleksibilitas yang sesuai dengan anggaran Anda.",
      "vision.title": "Visi & Misi",
      "vision.visionTitle": "Visi",
      "vision.visionText": "Menjadi penyedia solusi armada terkemuka yang dikenal karena keandalan, inovasi, dan komitmen terhadap kepuasan pelanggan.",
      "vision.missionTitle": "Misi",
      "vision.mission1": "Menyediakan armada berkualitas tinggi yang selalu dalam kondisi prima",
      "vision.mission2": "Memberikan layanan pelanggan yang responsif dan personal",
      "vision.mission3": "Membangun hubungan jangka panjang dengan pelanggan dan mitra",
      "services.title": "Layanan Kami",
      "services.overview": "Perusahaan yang bergerak dibidang usaha jasa pengiriman barang, termasuk paket/parcel dan dokumen, dengan sistem service Door To Door (DTD), Door To Port (DTP), Port To Port (PTP) dan Port To Door (PTD), sesuai dengan keinginan customer. Diharapkan, PT. Tunas Tumbur Sejahtera (TTS Transport) dapat membantu pelanggan untuk pengangkutan dan pengiriman barangnya baik melalui darat, laut dan udara ke seluruh Indonesia maupun Internasional.",
      "services.op1": "Pelayanan tepat waktu dengan semua jenis armada yang dibutuhkan baik box maupun terbuka/triway",
      "services.op2": "Memberikan Briefing setiap pagi dan sebelum berangkat ke lokasi muat untuk tim hingga driver",
      "services.lead": "Sebagai penyedia layanan logistik terpercaya, kami menghadirkan solusi Full Truck Load (FTL) yang efisien, aman, dan tepat waktu untuk memenuhi kebutuhan pengiriman skala besar Anda.",
      "services.1.title": "TRUCKING",
      "services.1.desc": "Dapat mensupport pengiriman Blindvan, Traga Box, Pickup Bak, CDE Box, CDE Bak, CDD Box, CDD Bak, CDD Triway, CDD Long Box, Fuso Box, Wingbox, Tronton, Trailer 20ft & 40ft, dan Dump Truck.",
      "services.2.title": "PLANNING TRUCKING",
      "services.2.1": "Pelayanan tepat waktu dengan semua jenis armada yang dibutuhkan baik box maupun terbuka/triway.",
      "services.2.2": "Memberikan Briefing setiap pagi dan sebelum berangkat ke lokasi muat untuk tim hingga driver.",
      "fleet.title": "Armada Kami",
      "fleet.lead": "Pilihan unit untuk kebutuhan container trucking (darat & laut). Klik untuk melihat detail.",
      "contact.title": "Hubungi Kami",
      "contact.desc": "Tim kami siap membantu kebutuhan pengiriman kontainer Anda.",
      "contact.addrLabel": "ALAMAT KANTOR",
      "portfolio.title": "Portofolio Kami",
      "portfolio.desc": "Lihat berbagai proyek dan layanan pengiriman yang telah kami tangani untuk klien-klien kami di seluruh Indonesia",
      "portfolio.filter.all": "Semua",
      "portfolio.filter.box": "Pengiriman Box",
      "portfolio.filter.flatbed": "Pengiriman Bak",
      "portfolio.filter.special": "Proyek Khusus",
      "portfolio.filter.intercity": "Antarkota",
      "portfolio.filter.interisland": "Antarpulau",
      "footer.rights": "Semua hak cipta dilindungi.",
      "footer.contactTitle": "Hubungi Kami",
      "footer.mapLink": "lihat di google maps →",
      "footer.addressLabel": "ALAMAT KAMI",
      "footer.address": "Jl. Ketapang Raya, Blok DD 19 No. 2,<br>RT.001/RW.009, Pekayon Jaya,<br>Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148",
      "footer.contactsLabel": "KONTAK KAMI"
    },
    en: {
      "nav.about": "About Us",
      "nav.vision": "Vision & Mission",
      "nav.services": "Services",
      "nav.fleet": "Fleet",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",
      "hero.title": "Trusted Fleet Solutions for Your Business",
      "hero.desc": "We provide innovative and reliable fleet solutions to help your business achieve its goals with land container distribution services, port haulage, and project logistics.",
      "about.title": "About Us",
      "about.desc": "PT Tunas Tumbur Sejahtera (TTS) understands that every business has unique needs. We provide the right vehicles according to budget and operational requirements, with a focus on reliability, innovation, and customer satisfaction.",
      "about.whatIs.title": "What is Tunas Tumbur Sejahtera?",
      "about.whatIs.desc": "PT Tunas Tumbur Sejahtera (TTS Transport) is here to help your business achieve its goals with innovative and reliable fleet solutions. PT Tunas Tumbur Sejahtera (TTS Transport) understands that every business has unique needs, and we are ready to provide the right vehicles according to your budget and operational requirements.",
      "why.title": "Why Choose Us?",
      "why.1.title": "Complete and Well-Maintained Fleet",
      "why.1.desc": "We have various types of vehicles that are always in prime condition, ready to meet all your business transportation needs.",
      "why.2.title": "Experience and Expertise",
      "why.2.desc": "With our experience and professional team, we are ready to provide effective and efficient fleet solutions.",
      "why.3.title": "Competitive Pricing",
      "why.3.desc": "We offer competitive prices with flexibility that suits your budget.",
      "vision.title": "Vision & Mission",
      "vision.visionTitle": "Vision",
      "vision.visionText": "To become a leading fleet solution provider known for reliability, innovation, and commitment to customer satisfaction.",
      "vision.missionTitle": "Mission",
      "vision.mission1": "Provide high-quality fleet that is always in prime condition",
      "vision.mission2": "Deliver responsive and personal customer service",
      "vision.mission3": "Build long-term relationships with customers and partners",
      "services.title": "Our Services",
      "services.overview": "A company engaged in freight forwarding services, including packages/parcels and documents, with Door To Door (DTD), Door To Port (DTP), Port To Port (PTP) and Port To Door (PTD) service systems, according to customer needs. We hope PT. Tunas Tumbur Sejahtera (TTS Transport) can help customers for transporting and shipping their goods by land, sea and air throughout Indonesia and internationally.",
      "services.op1": "On-time service with all types of fleet needed, both box and open/triway",
      "services.op2": "Providing daily morning briefings and pre-departure briefings for the team and drivers heading to the loading location",
      "services.lead": "As a trusted logistics service provider, we deliver efficient, safe, and timely Full Truck Load (FTL) solutions to meet your large-scale shipping needs.",
      "services.1.title": "TRUCKING",
      "services.1.desc": "We support deliveries using Blindvan, Traga Box, Pickup Flatbed, CDE Box, CDE Flatbed, CDD Box, CDD Flatbed, CDD Triway, CDD Long Box, Fuso Box, Wingbox, Tronton, 20ft & 40ft Trailers, and Dump Trucks.",
      "services.2.title": "TRUCKING PLANNING",
      "services.2.1": "On-time service with all types of fleet needed, both box and open/triway.",
      "services.2.2": "Providing daily morning briefings and pre-departure briefings for the team and drivers heading to the loading location.",
      "fleet.title": "Our Fleet",
      "fleet.lead": "Unit options for container trucking needs (land & sea). Click to see details.",
      "contact.title": "Contact Us",
      "contact.desc": "Our team is ready to assist with your container shipping needs.",
      "contact.addrLabel": "OFFICE ADDRESS",
      "portfolio.title": "Our Portfolio",
      "portfolio.desc": "See various projects and delivery services we have handled for our clients throughout Indonesia",
      "portfolio.filter.all": "All",
      "portfolio.filter.box": "Box Delivery",
      "portfolio.filter.flatbed": "Flatbed Delivery",
      "portfolio.filter.special": "Special Projects",
      "portfolio.filter.intercity": "Intercity",
      "portfolio.filter.interisland": "Inter-island",
      "footer.rights": "All rights reserved.",
      "footer.contactTitle": "Contact us",
      "footer.mapLink": "look at google maps →",
      "footer.addressLabel": "OUR ADDRESS",
      "footer.address": "Jl. Ketapang Raya, Blok DD 19 No. 2,<br>RT.001/RW.009, Pekayon Jaya,<br>Kec. Bekasi Sel., Kota Bks, Jawa Barat 17148",
      "footer.contactsLabel": "OUR CONTACTS"
    }
  };

  // ---------- LANGUAGE TOGGLE ----------
  let currentLang = localStorage.getItem('tts_lang') || 'id';
  
  const langToggle = document.getElementById('langToggle');
  const langToggleDD = document.getElementById('langToggleDD');
  const flagImg = document.getElementById('flagImg');
  const flagImgDD = document.getElementById('flagImgDD');
  const langText = document.getElementById('langText');
  const langTextDD = document.getElementById('langTextDD');
  
  const updateLanguageUI = function(lang) {
    // Update flag images
    if (flagImg) {
      flagImg.src = lang === 'en' ? 'asset/EN.jpg' : 'asset/ID.jpg';
    }
    if (flagImgDD) {
      flagImgDD.src = lang === 'en' ? 'asset/EN.jpg' : 'asset/ID.jpg';
    }
    
    // Update text
    if (langText) {
      langText.textContent = lang === 'en' ? 'EN' : 'ID';
    }
    if (langTextDD) {
      langTextDD.textContent = lang === 'en' ? 'EN' : 'ID';
    }
    
    // Update all translatable content
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      if (dict[lang] && dict[lang][key]) {
        el.textContent = dict[lang][key];
      }
    });
    
    localStorage.setItem('tts_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    
    // Re-render fleet with new language
    renderFleet();
  };
  
  const toggleLanguage = function() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguageUI(currentLang);
  };
  
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }
  
  if (langToggleDD) {
    langToggleDD.addEventListener('click', function() {
      toggleLanguage();
      // Close mobile menu after language switch
      if (mobileMenu) {
        mobileMenu.hidden = true;
      }
    });
  }
  
  // Initialize language on load
  updateLanguageUI(currentLang);

  // ---------- DATA ARMADA ----------
  const daftarTruck = [
    { 
      id: "blindvan", 
      name: "Blindvan", 
      image: "asset/Blindvan.png", 
      capacity: "0.8 Ton / 3 CBM",
      descID: "Kendaraan cepat tertutup, cocok untuk pengiriman barang bernilai tinggi atau dalam jumlah kecil.",
      descEN: "Fast, enclosed vehicle, suitable for high-value or small-quantity shipments."
    },
    { 
      id: "traga_box", 
      name: "Traga Box", 
      image: "asset/traga_box.png", 
      capacity: "2.5 Ton / 6 CBM",
      descID: "Truk ringan box yang lincah, ideal untuk pengiriman di dalam kota atau jarak dekat.",
      descEN: "Agile light box truck, ideal for inner-city or short-distance delivery."
    },
    { 
      id: "pickup_bak", 
      name: "Pickup Bak", 
      image: "asset/cde back.png", 
      capacity: "1 Ton / 3 CBM",
      descID: "Pickup dengan bak terbuka untuk pengangkutan barang ringan dan material.",
      descEN: "Pickup with open bed for light cargo and material transport."
    },
    { 
      id: "cde_box", 
      name: "CDE Box", 
      image: "asset/CDE Box.png", 
      capacity: "2 Ton / 6 CBM",
      descID: "Truk box CDE untuk pengiriman barang dengan perlindungan dari cuaca.",
      descEN: "CDE box truck for shipments with weather protection."
    },
    { 
      id: "cde_bak", 
      name: "CDE Bak", 
      image: "asset/cde back.png", 
      capacity: "2 Ton / 5 CBM",
      descID: "Truk CDE dengan bak terbuka untuk muatan yang tidak memerlukan penutup.",
      descEN: "CDE truck with open bed for cargo that doesn't require cover."
    },
    { 
      id: "cde_triway", 
      name: "CDE Triway", 
      image: "asset/cde triway.png", 
      capacity: "2 Ton / 4 CBM",
      descID: "Truk dengan bak triway (buka 3 sisi) untuk kemudahan bongkar muat.",
      descEN: "Truck with triway bed (3-side opening) for easy loading and unloading."
    },
    { 
      id: "cdd_box", 
      name: "CDD Box", 
      image: "asset/CDD box.png", 
      capacity: "4 Ton / 12 CBM",
      descID: "Truk box medium untuk pengiriman antarkota dengan kapasitas lebih besar.",
      descEN: "Medium box truck for intercity delivery with greater capacity."
    },
    { 
      id: "cdd_bak", 
      name: "CDD Bak", 
      image: "asset/CDD Bak.png", 
      capacity: "4 Ton / 12 CBM",
      descID: "Truk bak terbuka serbaguna untuk muatan barang curah.",
      descEN: "Versatile open bed truck for bulk cargo."
    },
    { 
      id: "cdd_longbox", 
      name: "CDD Long Box", 
      image: "asset/CCD Longbox.png", 
      capacity: "4 Ton / 15 CBM",
      descID: "Box panjang untuk barang bervolume besar seperti furniture.",
      descEN: "Long box for high-volume goods such as furniture."
    },
    { 
      id: "fuso_box", 
      name: "Fuso Box", 
      image: "asset/Fuso Bpx.png", 
      capacity: "8 Ton / 25 CBM",
      descID: "Truk Fuso berkapasitas besar untuk distribusi skala besar.",
      descEN: "Large capacity Fuso truck for large-scale distribution."
    },
    { 
      id: "wingbox", 
      name: "Wingbox", 
      image: "asset/background.jpg", 
      capacity: "8 Ton / 30 CBM",
      descID: "Truk dengan pintu samping yang dapat terbuka seperti sayap untuk kemudahan akses.",
      descEN: "Truck with side doors that open like wings for easy access."
    },
    { 
      id: "tronton", 
      name: "Tronton", 
      image: "asset/background.jpg", 
      capacity: "15 Ton / 40 CBM",
      descID: "Truk tronton berkapasitas sangat besar untuk muatan berat.",
      descEN: "Very large capacity tronton truck for heavy loads."
    },
    { 
      id: "trailer", 
      name: "Trailer 20ft & 40ft", 
      image: "asset/background.jpg", 
      capacity: "20-30 Ton",
      descID: "Container trailer 20ft dan 40ft untuk pengiriman kargo skala besar.",
      descEN: "Container trailers 20ft and 40ft for large-scale cargo shipping."
    },
    { 
      id: "dump_truck", 
      name: "Dump Truck", 
      image: "asset/background.jpg", 
      capacity: "10 Ton",
      descID: "Dump truck untuk material konstruksi seperti pasir, tanah, dan kerikil.",
      descEN: "Dump truck for construction materials such as sand, soil, and gravel."
    }
  ];

// ---------- FLEET AUTO SLIDER ----------
(function () {
  const track = document.getElementById('fleetCarousel');
  if (!track) return;

  track.style.overflowX = 'auto';
  track.style.scrollBehavior = 'smooth';

  const getStep = () => {
    const first = track.querySelector('.fleet-item');
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    const w = first ? first.getBoundingClientRect().width : Math.max(280, track.clientWidth * 0.6);
    return w + gap;
  };

  const slideNext = () => {
    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;
    const nextLeft = track.scrollLeft + step;
    if (nextLeft >= maxScroll - 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: nextLeft, behavior: 'smooth' });
    }
  };

  let timer = setInterval(slideNext, 2000);
  track.addEventListener('mouseenter', function(){ clearInterval(timer); });
  track.addEventListener('mouseleave', function(){ timer = setInterval(slideNext, 2000); });
})();

// ---------- FLEET MODAL INTERACTION ----------
(function () {
  const modal = document.getElementById('fleetModal');
  if (!modal) return;
  const modalImg  = document.getElementById('fleetModalImg');
  const modalName = document.getElementById('fleetModalName');
  const modalDesc = document.getElementById('fleetModalDesc');
  const btnClose  = modal.querySelector('.fleet-close');
  const track     = document.getElementById('fleetCarousel');
  if (!modalImg || !modalName || !track) return;

  const items = Array.from(track.querySelectorAll('.fleet-item'));
  let currentIndex = -1;

  const idAliasMap = {
    'blindvan': 'blindvan',
    'traga': 'traga_box',
    'pickup': 'pickup_bak',
    'cdebox': 'cde_box',
    'cdebak': 'cde_bak',
    'cdetriway': 'cde_triway',
    'cddbox': 'cdd_box',
    'cddbak': 'cdd_bak',
    'cddlong': 'cdd_longbox',
    'fuso': 'fuso_box',
    'wingbox': 'wingbox',
    'losbak': 'cde_bak',
    'trailer': 'trailer',
    'dump': 'dump_truck'
  };

  const findTruckData = (alias) => {
    const key = idAliasMap[alias] || alias;
    return daftarTruck.find(t => t.id === key);
  };

  const getLang = () => (localStorage.getItem('tts_lang') || 'id');

  const openModalAt = (index) => {
    const item = items[index];
    if (!item) return;
    currentIndex = index;
    const alias = item.getAttribute('data-truck');
    const data  = findTruckData(alias);
    const img   = item.querySelector('img');
    if (img) {
      modalImg.src = img.getAttribute('src');
      modalImg.alt = img.getAttribute('alt') || (data ? data.name : 'Truck');
    }
    const lang = getLang();
    const title = data ? data.name : (img ? (img.getAttribute('alt') || 'Truck') : 'Truck');
    const capacity = data && data.capacity ? data.capacity : '';
    const desc = data ? (lang === 'en' ? (data.descEN || '') : (data.descID || '')) : '';
    modalName.innerHTML = '<h3>' + title + '</h3>' + (capacity ? '<div class="capacity-text">' + capacity + '</div>' : '');
    if (modalDesc) { modalDesc.textContent = desc; }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  };

  items.forEach((item, idx) => {
    // open when clicking on the whole card, image, or text
    item.addEventListener('click', function() { openModalAt(idx); });
    const img = item.querySelector('img');
    const info = item.querySelector('.fleet-info');
    if (img) { img.style.cursor = 'pointer'; img.addEventListener('click', function(){ openModalAt(idx); }); }
    if (info) { info.addEventListener('click', function(){ openModalAt(idx); }); }
  });

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
    if (!modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight') openModalAt(Math.min(items.length - 1, currentIndex + 1));
    if (e.key === 'ArrowLeft')  openModalAt(Math.max(0, currentIndex - 1));
  });

})();








  // ---------- INIT ----------
  renderFleet();
});






  // ---------- INIT ----------
  renderFleet();
});