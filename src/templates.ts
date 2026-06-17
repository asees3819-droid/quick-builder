export const defaultTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Craft Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0f172a] text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-300">

  <!-- Header -->
  <header class="border-b border-slate-800 sticky top-0 bg-[#0f172a]/95 backdrop-blur z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div id="logo" class="flex items-center space-x-3 cursor-pointer">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <span class="text-white font-bold text-lg">A</span>
        </div>
        <span class="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AuraCraft</span>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-8">
        <a href="#services" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Services</a>
        <a href="#portfolio" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Portfolio</a>
        <a href="#testimonials" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Testimonial</a>
        <a href="#faq" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">FAQ</a>
        <a href="#contact" class="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</a>
      </nav>

      <div class="hidden md:block">
        <a href="#contact" class="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-sky-500/20">
          Let's Build
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="menu-btn" class="md:hidden text-slate-400 hover:text-white focus:outline-none" aria-label="Toggle Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div id="mobile-menu" class="hidden md:hidden border-b border-slate-800 bg-[#0f172a] px-6 py-4 space-y-4">
      <a href="#services" class="block text-sm font-medium text-slate-400 hover:text-white py-1">Services</a>
      <a href="#portfolio" class="block text-sm font-medium text-slate-400 hover:text-white py-1">Portfolio</a>
      <a href="#testimonials" class="block text-sm font-medium text-slate-400 hover:text-white py-1">Testimonials</a>
      <a href="#faq" class="block text-sm font-medium text-slate-400 hover:text-white py-1">FAQ</a>
      <a href="#contact" class="block text-sm font-medium text-slate-400 hover:text-white py-1">Contact</a>
      <a href="#contact" class="block text-center px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm rounded-xl">
        Get Started
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative py-20 lg:py-32 overflow-hidden flex-grow flex items-center">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950 -z-10"></div>
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <div class="space-y-6 text-center lg:text-left">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          Design & Web Agency
        </span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
          We Craft <span class="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">Immersive</span> Interfaces
        </h1>
        <p class="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
          Welcome! This is an interactive preview of our default generated website. Aura Craft crafts cutting-edge, conversion-focused websites and brand identity solutions. Try generating a brand-new page from the builder inputs!
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a href="#portfolio" class="w-full sm:w-auto text-center px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20">
            View Our Work
          </a>
          <a href="#contact" class="w-full sm:w-auto text-center px-6 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition-all">
            Get in Touch
          </a>
        </div>
      </div>
      <div class="relative flex justify-center">
        <!-- Floating Canvas Preview Concept -->
        <div class="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 p-0.5 shadow-2xl shadow-sky-500/10 animate-pulse">
          <div class="w-full h-full bg-[#1e293b] rounded-2xl overflow-hidden flex flex-col justify-center items-center p-8 space-y-4">
            <svg class="w-16 h-16 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 class="text-lg font-bold text-white">Full-Stack Magic</h3>
            <p class="text-xs text-slate-400 text-center">
              Fully customized Tailwind elements, interactive JavaScript, and dynamic stock images.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-slate-950 border-t border-slate-900">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-lg mx-auto mb-16 space-y-4">
        <h2 class="text-3xl font-bold tracking-tight">Our Services</h2>
        <p class="text-slate-400 text-sm">We provide full-lifecycle digital craftsmanship designed to accelerate growth.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Service Card -->
        <div class="p-8 rounded-2xl bg-[#0f172a] border border-slate-800 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-6 font-bold">01</div>
          <h3 class="text-lg font-semibold mb-2">Web Engineering</h3>
          <p class="text-slate-400 text-sm">Blazing fast single-page architectures optimized for search visibility and organic reach.</p>
        </div>
        <!-- Service Card -->
        <div class="p-8 rounded-2xl bg-[#0f172a] border border-slate-800 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 font-bold">02</div>
          <h3 class="text-lg font-semibold mb-2">Brand Craft</h3>
          <p class="text-slate-400 text-sm">Bespoke identity design, typography guidelines, and design systems for coherent products.</p>
        </div>
        <!-- Service Card -->
        <div class="p-8 rounded-2xl bg-[#0f172a] border border-slate-800 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300">
          <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 font-bold">03</div>
          <h3 class="text-lg font-semibold mb-2">Interactive AI</h3>
          <p class="text-slate-400 text-sm">Smart systems and content models customized to prompt customer actions immediately.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Grid -->
  <section id="portfolio" class="py-20 bg-[#0f172a]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 class="text-3xl font-bold tracking-tight mb-3">Featured Creations</h2>
          <p class="text-slate-400 text-sm">A small compilation of modern layouts built with perfection.</p>
        </div>
        <!-- Simple Interactive Tab filtering -->
        <div class="flex items-center space-x-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 self-start">
          <button onclick="filterPortfolio('all')" class="port-filter px-4 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 text-slate-950 transition-all">All</button>
          <button onclick="filterPortfolio('brand')" class="port-filter px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all">Branding</button>
          <button onclick="filterPortfolio('web')" class="port-filter px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all">Web development</button>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Item 1 -->
        <div class="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 portfolio-item" data-category="web">
          <div class="aspect-video bg-slate-800 overflow-hidden relative">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" alt="Sandy shores website">
            <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="px-4 py-2 bg-white text-slate-950 rounded-xl font-bold text-xs">Live Preview</span>
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs text-sky-400 font-bold uppercase tracking-wider">Web Project</span>
            <h3 class="text-lg font-bold mt-1 text-white">Sandy Coastline</h3>
            <p class="text-xs text-slate-400 mt-2">Breathtaking luxury travel landing page with fine interactions.</p>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 portfolio-item" data-category="brand">
          <div class="aspect-video bg-slate-800 overflow-hidden relative">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Tech workspace">
            <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="px-4 py-2 bg-white text-slate-950 rounded-xl font-bold text-xs">Case Study</span>
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider">Branding</span>
            <h3 class="text-lg font-bold mt-1 text-white">Synergy Workspace</h3>
            <p class="text-xs text-slate-400 mt-2">Sleek brand architecture and modern assets for coworking hubs.</p>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 portfolio-item" data-category="web">
          <div class="aspect-video bg-slate-800 overflow-hidden relative">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Marketing stats mockup">
            <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span class="px-4 py-2 bg-white text-slate-950 rounded-xl font-bold text-xs">Live Preview</span>
            </div>
          </div>
          <div class="p-6">
            <span class="text-xs text-sky-400 font-bold uppercase tracking-wider">Web Project</span>
            <h3 class="text-lg font-bold mt-1 text-white">FinTech Flow</h3>
            <p class="text-xs text-slate-400 mt-2">Dynamic dashboard mockup engineered with speed and clarity.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="py-20 bg-slate-950 border-y border-slate-900">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-lg mx-auto mb-16 space-y-4">
        <h2 class="text-3xl font-bold tracking-tight">Our Clients Agree</h2>
        <p class="text-slate-400 text-sm">Feedback from creators and teams we work with everyday.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div class="p-8 rounded-2xl bg-[#0f172a] border border-slate-800 text-slate-300 italic relative">
          <span class="text-6xl text-sky-500/10 absolute top-4 left-6 pointer-events-none font-serif">“</span>
          <p class="relative z-10 text-sm mb-6">
            "We wanted a coffee brand landing page that looks and acts sleek. Aura Craft developed a wonderful interface that helped increase our conversions within weeks of release!"
          </p>
          <div class="flex items-center space-x-3 not-italic">
            <div class="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0"></div>
            <div>
              <h4 class="text-white text-xs font-bold font-sans">Sophia Henderson</h4>
              <span class="text-slate-500 text-[10px]">Co-founder, Roaster Hub</span>
            </div>
          </div>
        </div>

        <div class="p-8 rounded-2xl bg-[#0f172a] border border-slate-800 text-slate-300 italic relative">
          <span class="text-6xl text-sky-500/10 absolute top-4 left-6 pointer-events-none font-serif">“</span>
          <p class="relative z-10 text-sm mb-6">
            "Exceptional clarity, modern styling, and simple setup instructions. Aura Craft created our beautiful portfolio within days, and we could easily maintain and edit it."
          </p>
          <div class="flex items-center space-x-3 not-italic">
            <div class="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0"></div>
            <div>
              <h4 class="text-white text-xs font-bold font-sans">Marcus Reed</h4>
              <span class="text-slate-500 text-[10px]">Lead Designer, Vector lab</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq" class="py-20 bg-[#0f172a]">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p class="text-slate-400 text-sm">Query clarification about our fast development processes.</p>
      </div>

      <!-- Accordion Grid -->
      <div class="space-y-4">
        <div class="border border-slate-800/80 rounded-xl bg-slate-900/40">
          <button class="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold hover:text-sky-400" onclick="toggleAccordion(1)">
            <span>How fast can I generate a website using this platform?</span>
            <svg id="chevron-1" class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="answer-1" class="hidden px-6 pb-4 text-xs text-slate-400 leading-relaxed">
            Instantly! In less than 10 seconds, our server-side engine queries modern models to output fully functional, beautiful CSS styled components and functional scripts.
          </div>
        </div>

        <div class="border border-slate-800/80 rounded-xl bg-slate-900/40">
          <button class="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold hover:text-sky-400" onclick="toggleAccordion(2)">
            <span>Can I customize the generated design?</span>
            <svg id="chevron-2" class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="answer-2" class="hidden px-6 pb-4 text-xs text-slate-400 leading-relaxed">
            Absolutely! You can insert custom refinement instructions in the input panel and the builder will seamlessly update your mockup with flawless precision.
          </div>
        </div>

        <div class="border border-slate-800/80 rounded-xl bg-slate-900/40">
          <button class="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold hover:text-sky-400" onclick="toggleAccordion(3)">
            <span>Are the outputs responsive off-the-shelf?</span>
            <svg id="chevron-3" class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div id="answer-3" class="hidden px-6 pb-4 text-xs text-slate-400 leading-relaxed">
            Yes! We leverage Tailwind CSS utility grids, custom flex layouts, and viewport adaptions so your single page looks premium on phones, tablets, and massive screens.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form Section -->
  <section id="contact" class="py-20 bg-slate-950 border-t border-slate-900">
    <div class="max-w-xl mx-auto px-6">
      <div class="text-center mb-12 space-y-4">
        <h2 class="text-3xl font-bold tracking-tight">Initiate Inquiry</h2>
        <p class="text-slate-400 text-sm">Send us a direct message and let's craft something special.</p>
      </div>

      <form onsubmit="handleSubmit(event)" class="space-y-6">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
          <input required type="text" class="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 text-white" placeholder="Johnathan Doe">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
          <input required type="email" class="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 text-white" placeholder="john@example.com">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Detailed Message</label>
          <textarea required rows="4" class="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 text-white" placeholder="I would love a coffee hub brand identity with 3 subsections..."></textarea>
        </div>
        <button type="submit" class="w-full py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-sky-500/20 text-sm">
          Dispatch Message
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-slate-950 py-12 border-t border-slate-900">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <p class="text-slate-500 text-xs">
        &copy; 2026 Aura Craft Web Studio. Generated instantly with AI Website Builder.
      </p>
      <div class="flex items-center space-x-6">
        <a href="#" class="text-slate-500 hover:text-white text-xs">Terms of Usage</a>
        <a href="#" class="text-slate-500 hover:text-white text-xs">Privacy Directives</a>
        <a href="#" class="text-slate-500 hover:text-white text-xs" onclick="toggleDarkMode()">Toggle Theme</a>
      </div>
    </div>
  </footer>

  <!-- Vanilla Scripts -->
  <script>
    // Toggle Mobile Menu Drawer
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Simple toggle icon flip
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      } else {
        menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
      }
    });

    // Handle interactive form submits
    function handleSubmit(event) {
      event.preventDefault();
      alert('Mock Contact Form Sent Successfully! Real scripts can capture this trigger.');
      event.target.reset();
    }

    // Toggle FAQ Accordions
    function toggleAccordion(idx) {
      const ans = document.getElementById('answer-' + idx);
      const chev = document.getElementById('chevron-' + idx);
      if (ans.classList.contains('hidden')) {
        ans.classList.remove('hidden');
        chev.classList.add('rotate-180');
      } else {
        ans.classList.add('hidden');
        chev.classList.remove('rotate-180');
      }
    }

    // Filter Portfolio items
    function filterPortfolio(category) {
      // Toggle button active styling
      const buttons = document.querySelectorAll('.port-filter');
      buttons.forEach(btn => {
        btn.classList.remove('bg-sky-500', 'text-slate-950');
        btn.classList.add('text-slate-400', 'hover:text-white');
      });

      const event = window.event;
      if (event && event.currentTarget) {
        event.currentTarget.classList.add('bg-sky-500', 'text-slate-950');
        event.currentTarget.classList.remove('text-slate-400', 'hover:text-white');
      }

      // Filter grid items
      const items = document.querySelectorAll('.portfolio-item');
      items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Interactive custom Dark Mode toggle
    function toggleDarkMode() {
      const isDark = document.body.classList.contains('bg-[#0f172a]');
      if (isDark) {
        document.body.classList.remove('bg-[#0f172a]', 'text-slate-100');
        document.body.classList.add('bg-slate-50', 'text-slate-800');
        
        const header = document.querySelector('header');
        header.classList.remove('bg-[#0f172a]/95', 'border-slate-800');
        header.classList.add('bg-white/95', 'border-slate-200');

        const services = document.getElementById('services');
        services.classList.remove('bg-slate-950', 'border-slate-900');
        services.classList.add('bg-slate-100', 'border-slate-200');

        const portfolio = document.getElementById('portfolio');
        portfolio.classList.remove('bg-[#0f172a]');
        portfolio.classList.add('bg-white');

        const cards = document.querySelectorAll('#services div.p-8, #portfolio div.group');
        cards.forEach(card => {
          card.classList.remove('bg-[#0f172a]', 'border-slate-800');
          card.classList.add('bg-white', 'border-slate-200');
        });
      } else {
        document.body.classList.add('bg-[#0f172a]', 'text-slate-100');
        document.body.classList.remove('bg-slate-50', 'text-slate-800');

        const header = document.querySelector('header');
        header.classList.add('bg-[#0f172a]/95', 'border-slate-800');
        header.classList.remove('bg-white/95', 'border-slate-200');

        const services = document.getElementById('services');
        services.classList.add('bg-slate-950', 'border-slate-900');
        services.classList.remove('bg-slate-100', 'border-slate-200');

        const portfolio = document.getElementById('portfolio');
        portfolio.classList.add('bg-[#0f172a]');
        portfolio.classList.remove('bg-white');

        const cards = document.querySelectorAll('#services div.p-8, #portfolio div.group');
        cards.forEach(card => {
          card.classList.add('bg-[#0f172a]', 'border-slate-800');
          card.classList.remove('bg-white', 'border-slate-200');
        });
      }
    }
  </script>
</body>
</html>
`;
