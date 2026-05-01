(function () {
  /* â”€â”€ Global: remove paper texture from all case-study images â”€â”€ */
  (function injectCoverStyles() {
    var s = document.createElement('style');
    s.textContent = [
      '/* Elevate images above .paper-background (z-index: 998) */',
      '.cover, .item-img, .item-t {',
      '  position: relative;',
      '  z-index: 999 !important;',
      '}',
      '.nav { z-index: 1000 !important; }',
      '/* Fix gallery button clipping */',
      '.pw-wrap { overflow: visible !important; }',
      '.c-inner.blend {',
      '  background-blend-mode: normal !important;',
      '  background-color: transparent !important;',
      '  mix-blend-mode: normal !important;',
      '}',
      '.pw-img.blend {',
      '  background-blend-mode: normal !important;',
      '  mix-blend-mode: normal !important;',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  })();

  /* â”€â”€ Guard: redirect hidden project pages back to the shelf â”€â”€ */
  (function redirectHiddenPages() {
    var HIDDEN_SLUGS = ['aquerone', 'sal-parasuco', 'edoardo-smerilli', 'chiara-luzzana', 'loftgarten', 'deplace-maison', 'wow-concept'];
    var path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
    var slug = path.split('/').pop();
    if (path.indexOf('/work/') === 0 && HIDDEN_SLUGS.indexOf(slug) !== -1) {
      window.location.replace('/work?tab=project');
      return;
    }
  })();

  /* â”€â”€ Global: Scrub old template references â†’ Caleb Cooper â”€â”€ */
  (function scrubOldSiteRefs() {
    document.addEventListener('DOMContentLoaded', function() {
      // 1. Fix data-wf-domain on <html>
      var html = document.documentElement;
      if (html.getAttribute('data-wf-domain')) {
        html.setAttribute('data-wf-domain', 'calebcooper.dev');
      }

      // 2. Fix all aria-labels containing old name
      var allEls = document.querySelectorAll('[aria-label]');
      for (var i = 0; i < allEls.length; i++) {
        var lbl = allEls[i].getAttribute('aria-label');
        if (lbl && lbl.indexOf('Miranda') !== -1) {
          allEls[i].setAttribute('aria-label', lbl.replace(/NiccolÃ² Miranda/gi, 'Caleb Cooper').replace(/Niccol.*?Miranda/gi, 'Caleb Cooper').replace(/Miranda/g, 'Cooper'));
        }
      }

      // 3. Fix all alt text containing old name
      var imgs = document.querySelectorAll('img[alt]');
      for (var j = 0; j < imgs.length; j++) {
        var alt = imgs[j].getAttribute('alt');
        if (alt && alt.indexOf('Miranda') !== -1) {
          imgs[j].setAttribute('alt', alt.replace(/NiccolÃ² Miranda is an award-winning designer & developer who's passionate about creating iconic digital experiences through motion, typography and creative coding for worldwide brands\. /gi, 'Caleb Cooper â€” AI architect building agentic systems, multi-agent orchestration, and intelligent digital experiences. ').replace(/NiccolÃ² Miranda/gi, 'Caleb Cooper').replace(/Niccol.*?Miranda/gi, 'Caleb Cooper'));
        }
      }

      // 4. Fix mailto links
      var links = document.querySelectorAll('a[href*="niccolomiranda"]');
      for (var k = 0; k < links.length; k++) {
        links[k].href = 'mailto:caleb@calebcooper.dev?subject=Project%20Request';
      }

      // 5. Fix old project descriptions in "Next Project" items
      var itemDescs = document.querySelectorAll('.item-desc');
      for (var m = 0; m < itemDescs.length; m++) {
        var txt = itemDescs[m].textContent;
        if (txt && (txt.indexOf('Om Swami') !== -1 || txt.indexOf('WOW Concept') !== -1 || txt.indexOf('Himalayan') !== -1 || txt.indexOf('Madrid') !== -1)) {
          // These will be replaced by the injectNextProject script below
        }
      }
    });
  })();

  /* â”€â”€ Global: Replace "Next Project" sidebar with real projects â”€â”€ */
  (function injectNextProject() {
    // Ordered list of all projects (the canonical order on the shelf)
    var PROJECTS = [
      { slug: 'global-intelligence-market', title: 'Global Intelligence Market', desc: 'A compute marketplace where intelligence is priced, routed, and settled like a commodity.', hero: '/assets/img/645b54372e6d6f19ddf847a7_thumbnail-big-1e8c72e34f.webp', aliases: ['the-roger-hub'] },
      { slug: 'brokie-v2',                  title: 'Brokie V2',                  desc: 'Graph-based asset memory engine - real-time portfolio intelligence with conversational AI.', hero: '/assets/img/615d9670b144655ffd217ac6_thumbnail-big-4951f49aae.jpeg', aliases: ['avroko'] },
      { slug: 'cortex',                     title: 'Cortex',                     desc: 'Pure-math agent routing - a deterministic orchestration layer for multi-agent swarms.', hero: '/assets/img/cortex-header-hero.png', aliases: ['cobo'] },
      { slug: 'life-tap-labs',              title: 'Life Tap Labs',              desc: 'Agentic cure observability - transparent AI monitoring for biotech research pipelines.', hero: '/assets/img/62220c9574d2ddf1fd74e6fe_thumbnail-big-a8bd4a4fc5.jpeg', aliases: ['thinkers'] },
      { slug: 'panopticon',                 title: 'The Panopticon',             desc: 'Agentic observability at the edge - a local-first observatory for complex AI systems.', hero: '/assets/img/621f31389342fe66a9cc3b20_thumbnail-big-2388c6998e.jpeg', aliases: ['argor-heraeus'] },
      { slug: 'bonnie',                     title: 'Bonnie',                     desc: 'AI gaming companion - adaptive personality engine that evolves through player interaction.', hero: '/assets/img/621f2de58c0579490e2c5a94_thumbnail-big-a47c11a456.jpeg', aliases: ['om-swami'] },
      { slug: 'boonk',                      title: 'Boonk',                      desc: 'Autonomous site cloning and reconstruction - precision web archival at scale.', hero: '/assets/img/615d9662fbb2467631e07c72_thumbnail-big-313666b2fe.jpeg', aliases: ['prada'] },
      { slug: 'byc2w',                      title: 'BYC2W',                      desc: 'A child-led creative build where AI acts like a pencil for imagination, worldbuilding, and guided co-creation.', hero: '/assets/img/byc2w-milky-overview.png', aliases: ['the-books-of-ye'] },
      { slug: 'brokie-v1',                  title: 'Brokie V1',                  desc: 'The original conversational financial advisor - personal finance meets agentic AI.', hero: '/assets/img/616ec1b825309eb624d89bc1_thumbnail-big-f78878601a.jpeg', aliases: ['the-hiring-chain'] }
    ];

    // Determine current slug from URL
    var path = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
    var currentSlug = path.split('/').pop();
    var idx = -1;
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === currentSlug || (PROJECTS[i].aliases || []).indexOf(currentSlug) !== -1) { idx = i; break; }
    }
    if (idx === -1) return; // Not a known project page

    var prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    var next = PROJECTS[(idx + 1) % PROJECTS.length];

    document.addEventListener('DOMContentLoaded', function() {
      // Find the left sidebar item (prev project)
      var leftItem = document.querySelector('.sidebar.f .s-grid.left .item.fl');
      if (leftItem) {
        var link = leftItem.querySelector('.item-link');
        if (link) link.href = '/work/' + prev.slug + '/index.html';
        var img = leftItem.querySelector('.item-img img');
        if (img) {
          img.src = prev.hero;
          img.setAttribute('data-image', prev.hero);
          img.alt = prev.title + ' - ' + prev.desc;
        }
        var titleImg = leftItem.querySelector('.item-t');
        if (titleImg) {
          // Replace SVG title with text
          var textEl = document.createElement('div');
          textEl.style.cssText = "font-family:'Canopee',sans-serif;font-size:clamp(1.2rem,2.5vw,2rem);line-height:1;color:#1d1d1b;text-transform:uppercase;letter-spacing:-0.02em;";
          textEl.textContent = prev.title;
          titleImg.parentNode.replaceChild(textEl, titleImg);
        }
        var descEl = leftItem.querySelector('.item-desc');
        if (descEl) descEl.textContent = prev.desc;
      }

      // Find the "Next project!" link in the center
      var headWrap = document.querySelector('.sidebar.f .head-wrap');
      if (headWrap) {
        headWrap.href = '/work/' + next.slug + '/index.html';
      }

      // Find the right sidebar item (next project)
      var rightGrid = document.querySelectorAll('.sidebar.f .s-grid');
      var rightItem = rightGrid.length > 1 ? rightGrid[1].querySelector('.item.fr') : null;
      if (rightItem) {
        var rLink = rightItem.querySelector('.item-link');
        if (rLink) rLink.href = '/work/' + next.slug + '/index.html';
        var rImg = rightItem.querySelector('.item-img img');
        if (rImg) {
          rImg.src = next.hero;
          rImg.setAttribute('data-image', next.hero);
          rImg.alt = next.title + ' - ' + next.desc;
        }
        var rTitleImg = rightItem.querySelector('.item-t');
        if (rTitleImg) {
          var rTextEl = document.createElement('div');
          rTextEl.style.cssText = "font-family:'Canopee',sans-serif;font-size:clamp(1.2rem,2.5vw,2rem);line-height:1;color:#1d1d1b;text-transform:uppercase;letter-spacing:-0.02em;";
          rTextEl.textContent = next.title;
          rTitleImg.parentNode.replaceChild(rTextEl, rTitleImg);
        }
        var rDescEl = rightItem.querySelector('.item-desc');
        if (rDescEl) rDescEl.textContent = next.desc;
        // Remove "NEW" badge if present
        var newBadge = rightItem.querySelector('.new-w-2');
        if (newBadge) newBadge.style.display = 'none';
      }

      document.body.dataset.nextProjectNormalized = '1';
    });
  })();

  const site = window.CCW_SITE || null;
  const workIndex = window.CCW_WORK_INDEX || null;
  const projects = window.CCW_PROJECTS || null;

  if (!site || !projects) {
    return;
  }

  const currentPath = normalizePath(window.location.pathname);
  const currentSlug = currentPath.startsWith("/work/") ? currentPath.slice("/work/".length) : "";
  const isWorkIndex = currentPath === "/work";

  function normalizePath(pathname) {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }

  function queryAll(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function setText(element, value) {
    if (element && typeof value === "string") {
      element.textContent = value;
    }
  }

  function setHtml(element, value) {
    if (element && typeof value === "string") {
      element.innerHTML = value;
    }
  }

  function setHref(element, value) {
    if (element && typeof value === "string" && value.length > 0) {
      element.setAttribute("href", value);
    }
  }

  function setImage(element, image) {
    if (!element || !image) {
      return;
    }

    const imageData = typeof image === "string" ? { src: image } : image;

    if (typeof imageData.src === "string" && imageData.src.length > 0) {
      element.setAttribute("src", imageData.src);
    }

    if (typeof imageData.srcset === "string") {
      if (imageData.srcset.length > 0) {
        element.setAttribute("srcset", imageData.srcset);
      } else {
        element.removeAttribute("srcset");
      }
    }

    if (typeof imageData.sizes === "string") {
      if (imageData.sizes.length > 0) {
        element.setAttribute("sizes", imageData.sizes);
      } else {
        element.removeAttribute("sizes");
      }
    }

    if (typeof imageData.alt === "string") {
      element.setAttribute("alt", imageData.alt);
    }
  }

  function setBackgroundImage(element, src) {
    if (element && typeof src === "string" && src.length > 0) {
      element.style.backgroundImage = `url("${src}")`;
    }
  }

  function setVisible(element, visible) {
    if (!element) {
      return;
    }

    if (visible) {
      element.classList.remove("w-condition-invisible");
      element.style.display = "";
      return;
    }

    element.classList.add("w-condition-invisible");
    element.style.display = "none";
  }

  function injectTitleStyles() {
    if (document.getElementById("ccw-title-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "ccw-title-styles";
    style.textContent = `
      .ccw-image-title {
        display: none !important;
      }

      .ccw-title-holder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ccw-title-holder--detail {
        display: block;
        height: auto;
      }

      .ccw-title-holder--sidebar {
        justify-content: flex-start;
        flex: 1;
      }

      .ccw-title-holder--touch {
        justify-content: flex-start;
        align-items: flex-end;
        flex: 1;
      }

      .ccw-title {
        width: auto;
        max-width: none;
        flex: none;
        display: block;
        color: #1d1d1b;
        font-family: Canopee, sans-serif;
        font-feature-settings: "ss03";
        font-size: var(--ccw-font-size, 4vh);
        font-weight: 400;
        line-height: 0.84;
        letter-spacing: var(--ccw-letter-spacing, -0.065em);
        text-align: center;
        text-transform: uppercase;
        white-space: nowrap;
        transform: translateY(var(--ccw-translate-y, 0)) scaleX(var(--ccw-scale-x, 1));
        transform-origin: center center;
        will-change: transform, font-size;
      }

      .ccw-title--brand,
      .ccw-title--book {
        --ccw-translate-y: 0.18vh;
      }

      .ccw-title--detail {
        text-align: left;
        transform-origin: left center;
        --ccw-translate-y: 0.4vh;
      }

      .ccw-title--sidebar {
        text-align: left;
        transform-origin: left center;
      }

      .ccw-title--touch {
        text-align: left;
        transform-origin: left center;
      }
    `;
    document.head.appendChild(style);
  }

  function getTitleLayoutConfig(role, holder) {
    const width = Math.max(holder && holder.clientWidth ? holder.clientWidth : 0, 1);
    const height = Math.max(holder && holder.clientHeight ? holder.clientHeight : 0, 1);

    if (role === "brand" || role === "book") {
      return {
        maxPx: Math.min(width * 0.31, height * 1.82),
        minPx: 20,
        minScale: 0.38,
        fallbackHeight: Math.max(height, 68),
        letterSpacing: "-0.07em",
      };
    }

    if (role === "touch") {
      return {
        maxPx: Math.min(width * 0.17, height * 1.08),
        minPx: 14,
        minScale: 0.46,
        fallbackHeight: Math.max(height, 46),
        letterSpacing: "-0.065em",
      };
    }

    if (role === "sidebar") {
      return {
        maxPx: Math.min(width * 0.18, Math.max(height * 0.94, 24)),
        minPx: 10,
        minScale: 0.52,
        fallbackHeight: Math.max(height, 18),
        letterSpacing: "-0.06em",
      };
    }

    if (role === "detail") {
      return {
        maxPx: Math.min(width * 0.165, window.innerHeight * 0.19),
        minPx: 34,
        minScale: 0.55,
        fallbackHeight: Math.max(height, 118),
        letterSpacing: "-0.06em",
      };
    }

    return {
      maxPx: Math.min(width * 0.2, height * 1.2),
      minPx: 16,
      minScale: 0.5,
      fallbackHeight: Math.max(height, 32),
      letterSpacing: "-0.06em",
    };
  }

  function fitTitleNode(titleNode) {
    if (!titleNode) {
      return;
    }

    const holder = titleNode.parentElement;
    if (!holder) {
      return;
    }

    const role = titleNode.dataset.ccwRole || "brand";
    const config = getTitleLayoutConfig(role, holder);
    const availableWidth = Math.max(holder.clientWidth, 1);
    const availableHeight = Math.max(holder.clientHeight, config.fallbackHeight, 1);

    titleNode.style.setProperty("--ccw-letter-spacing", config.letterSpacing);
    titleNode.style.setProperty("--ccw-scale-x", "1");

    let fontSize = Math.max(config.maxPx, config.minPx);
    let iterations = 0;

    titleNode.style.fontSize = `${fontSize}px`;

    while (iterations < 160 && titleNode.scrollHeight > availableHeight * 1.01 && fontSize > config.minPx) {
      fontSize -= 1;
      titleNode.style.fontSize = `${fontSize}px`;
      iterations += 1;
    }

    let scaleX = Math.min(1, availableWidth / Math.max(titleNode.scrollWidth, 1));
    scaleX = Math.max(scaleX, config.minScale);
    titleNode.style.setProperty("--ccw-scale-x", String(scaleX));

    while (
      iterations < 320 &&
      (
        titleNode.scrollWidth * scaleX > availableWidth * 1.001 ||
        titleNode.scrollHeight > availableHeight * 1.01
      ) &&
      fontSize > config.minPx
    ) {
      fontSize -= 1;
      titleNode.style.fontSize = `${fontSize}px`;
      scaleX = Math.min(1, availableWidth / Math.max(titleNode.scrollWidth, 1));
      scaleX = Math.max(scaleX, config.minScale);
      titleNode.style.setProperty("--ccw-scale-x", String(scaleX));
      iterations += 1;
    }
  }

  let fitFrame = 0;

  function fitAllTitles() {
    queryAll(".ccw-title").forEach((titleNode) => {
      fitTitleNode(titleNode);
    });
  }

  function scheduleTitleFit() {
    if (fitFrame) {
      cancelAnimationFrame(fitFrame);
    }

    fitFrame = requestAnimationFrame(() => {
      fitFrame = 0;
      fitAllTitles();
    });
  }

  function getProjectTitle(project, content) {
    if (content && typeof content.titleText === "string" && content.titleText.length > 0) {
      return content.titleText;
    }

    if (project && typeof project.name === "string" && project.name.length > 0) {
      return project.name;
    }

    if (content && typeof content.client === "string" && content.client.length > 0) {
      return content.client;
    }

    return "";
  }

  function getTitleFontSize(role, text) {
    const length = String(text || "").length;

    if (role === "brand" || role === "book") {
      if (length > 30) return "2.2vh";
      if (length > 26) return "2.45vh";
      if (length > 22) return "2.75vh";
      if (length > 18) return "3.05vh";
      if (length > 14) return "3.65vh";
      return "4.55vh";
    }

    if (role === "detail") {
      if (length > 30) return "3.1vw";
      if (length > 26) return "3.55vw";
      if (length > 22) return "4vw";
      if (length > 18) return "4.55vw";
      if (length > 14) return "5.15vw";
      return "5.95vw";
    }

    if (role === "sidebar") {
      if (length > 30) return "0.92vw";
      if (length > 26) return "1vw";
      if (length > 22) return "1.08vw";
      if (length > 18) return "1.16vw";
      if (length > 14) return "1.26vw";
      return "1.42vw";
    }

    if (role === "touch") {
      if (length > 30) return "3.05vw";
      if (length > 26) return "3.35vw";
      if (length > 22) return "3.7vw";
      if (length > 18) return "4.15vw";
      if (length > 14) return "4.7vw";
      return "5.35vw";
    }

    return "4vh";
  }

  function getTitleLetterSpacing(text) {
    const length = String(text || "").length;

    if (length > 26) return "-0.08em";
    if (length > 20) return "-0.07em";
    if (length > 14) return "-0.06em";
    return "-0.055em";
  }

  function renderTitle(container, options) {
    if (!container || !options || typeof options.text !== "string" || options.text.length === 0) {
      return;
    }

    const imageSelector = options.imageSelector || "img";
    queryAll(imageSelector, container).forEach((image) => {
      image.classList.add("ccw-image-title");
      image.setAttribute("aria-hidden", "true");
    });

    const holderClass = `ccw-title-holder ccw-title-holder--${options.role}`;
    let holder = container.querySelector(`.ccw-title-holder--${options.role}`);
    if (!holder) {
      holder = document.createElement("div");
      holder.className = holderClass;

      const beforeNode = options.beforeSelector ? container.querySelector(options.beforeSelector) : null;
      if (beforeNode) {
        container.insertBefore(holder, beforeNode);
      } else {
        container.appendChild(holder);
      }
    }

    let titleNode = holder.querySelector(`.ccw-title--${options.role}`);
    if (!titleNode) {
      titleNode = document.createElement("div");
      titleNode.className = `ccw-title ccw-title--${options.role}`;
      holder.appendChild(titleNode);
    }

    titleNode.dataset.ccwRole = options.role;
    titleNode.textContent = options.text;
    scheduleTitleFit();
  }

  function applyLinkList(anchors, links) {
    if (!Array.isArray(links) || links.length === 0) {
      return;
    }

    anchors.forEach((anchor, index) => {
      const link = links[index];
      if (!link) {
        return;
      }

      setHref(anchor, link.href);
      if (typeof link.label === "string") {
        anchor.textContent = link.label;
      }
    });
  }

  function syncImageWraps(container, wrapSelector, imageSelector, sources) {
    if (!container || !Array.isArray(sources)) {
      return;
    }

    const wraps = queryAll(wrapSelector, container);
    wraps.forEach((wrap, index) => {
      const source = sources[index];
      if (!source) {
        wrap.style.display = "none";
        return;
      }

      wrap.style.display = "";
      const image = wrap.querySelector(imageSelector);
      setImage(image, source);
    });
  }

  function syncGallery(images) {
    if (!Array.isArray(images) || images.length === 0) {
      return;
    }

    const list = document.querySelector(".gallery-list");
    const template = list && list.querySelector(".gallery-item");
    if (!list || !template) {
      return;
    }

    const templateClone = template.cloneNode(true);
    list.innerHTML = "";

    images.forEach((imageData) => {
      const item = templateClone.cloneNode(true);
      const image = item.querySelector(".gallery-img");
      setImage(image, imageData);
      list.appendChild(item);
    });
  }

  function getProject(slug) {
    if (!slug) {
      return null;
    }

    return projects[slug] || null;
  }

  function getProjectSummary(slug) {
    const project = getProject(slug);
    return project ? project.summary : null;
  }

  function getProjectDetail(slug) {
    const project = getProject(slug);
    return project ? project.detail : null;
  }

  injectTitleStyles();
  window.addEventListener("resize", scheduleTitleFit, { passive: true });
  if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === "function") {
    document.fonts.ready.then(() => {
      scheduleTitleFit();
    });
  }

  function applySharedChrome() {
    queryAll(".nav-block.l .n-text").forEach((node) => {
      setText(node, site.nav && site.nav.location);
    });

    queryAll(".nav-head").forEach((link) => {
      setHref(link, site.nav && site.nav.brandHref);
    });

    queryAll(".back-all").forEach((link) => {
      const workLink = site.nav && site.nav.menu && site.nav.menu[1];
      setHref(link, workLink && workLink.href);
    });

    if (site.nav && Array.isArray(site.nav.menu)) {
      site.nav.menu.forEach((item, index) => {
        queryAll(`.menu-link.m${index + 1}`).forEach((link) => {
          setHref(link, item.href);
          const title = link.querySelector(".menu-title");
          setText(title, item.label);
        });
      });
    }

    applyLinkList(queryAll("nav .menu .f-block a.f-li.new-tab.w"), site.nav && site.nav.socialLinks);

    queryAll("img.f-stamp, img.h-img").forEach((image) => {
      setImage(image, site.stampImage);
    });

    queryAll(".footer .f-news").forEach((node) => {
      setText(node, site.footer && site.footer.marqueeText);
    });

    queryAll(".footer .marquee-link").forEach((link) => {
      setHref(link, site.sharedCta && site.sharedCta.href);
      setText(link.querySelector(".marquee-text"), site.sharedCta && site.sharedCta.label);
    });

    queryAll(".footer .f-title").forEach((node) => {
      setText(node, site.footer && site.footer.title);
    });

    queryAll(".footer .f-year").forEach((node) => {
      setText(node, site.footer && site.footer.year);
    });

    queryAll(".footer .legal-w a").forEach((link) => {
      setHref(link, site.footer && site.footer.legalHref);
      setText(link, site.footer && site.footer.legalLabel);
    });

    applyLinkList(queryAll(".footer .f-block a.f-li.new-tab.f"), site.footer && site.footer.socialLinks);

    const sidebarHeadline = document.querySelector(".sidebar .headline.f");
    if (sidebarHeadline) {
      setHref(sidebarHeadline.querySelector(".head-wrap"), site.sharedCta && site.sharedCta.href);
      setHtml(sidebarHeadline.querySelector(".head-title.w"), site.nextProjects && site.nextProjects.titleHtml);
      setHtml(sidebarHeadline.querySelector(".head-desc"), site.nextProjects && site.nextProjects.descriptionHtml);
      setText(sidebarHeadline.querySelector(".item-title.cap"), site.nextProjects && site.nextProjects.tipLabel);
      setText(sidebarHeadline.querySelector(".item-desc.cap"), site.nextProjects && site.nextProjects.tipText);
    }
  }

  function applyWorkIndexPage() {
    if (!workIndex) {
      return;
    }

    document.title = `${site.browserTitlePrefix} - Work`;

    setHtml(document.querySelector(".c-0 ._w-head.up"), workIndex.hero && workIndex.hero.featuredTopHtml);
    setHtml(document.querySelector(".c-0 ._w-head.down"), workIndex.hero && workIndex.hero.featuredBottomHtml);
    setText(document.querySelector(".c-0 .has-dropcap"), workIndex.hero && workIndex.hero.introText);

    const brandItems = queryAll(".brand-item");
    const projectOrder = Array.isArray(workIndex.projectOrder) ? workIndex.projectOrder : [];

    brandItems.forEach((item, index) => {
      const summary = getProjectSummary(projectOrder[index]);
      const project = getProject(projectOrder[index]);
      if (!summary || !project) {
        return;
      }

      const titleText = getProjectTitle(project, summary);
      renderTitle(item.querySelector(".brand-title-w"), {
        role: "brand",
        text: titleText,
        imageSelector: "img.brand-title",
      });
      setText(item.querySelector(".brand-year"), summary.year);
      setVisible(item.querySelector(".new-w"), Boolean(summary.isNew));

      const bookWrap = item.querySelector("a.book-wrap");
      setHref(bookWrap, summary.href);
      if (bookWrap) {
        bookWrap.setAttribute("aria-label", project.name);
      }

      renderTitle(item.querySelector(".book-title-w"), {
        role: "book",
        text: titleText,
        imageSelector: "img.book-title",
      });
      setImage(item.querySelector("img.book-image"), summary.cardImage);
      setText(item.querySelector(".book-desc"), summary.summary);
      syncImageWraps(item.querySelector(".book-title__tags"), ".tag-w", "img.tag", summary.tags || []);

      const preview = item.querySelector(".fetch-data");
      if (preview && typeof summary.previewImage === "string") {
        preview.setAttribute("data-image", summary.previewImage);
      }
    });

    const touchItems = queryAll(".brand-item__touch");
    touchItems.forEach((item, index) => {
      const summary = getProjectSummary(projectOrder[index]);
      const project = getProject(projectOrder[index]);
      if (!summary || !project) {
        return;
      }

      const touchLink = item.querySelector(".brand-link__touch");
      setHref(touchLink, summary.href);
      if (touchLink) {
        touchLink.setAttribute("aria-label", project.name);
      }

      setBackgroundImage(item.querySelector(".brand-img__touch"), summary.cardImage && summary.cardImage.src);
      renderTitle(item.querySelector(".brand-block__touch-2"), {
        role: "touch",
        text: getProjectTitle(project, summary),
        imageSelector: "img.brand-title__touch-2",
        beforeSelector: ".new-t-2.tab",
      });

      queryAll(".brand-year-2", item).forEach((node) => {
        setText(node, summary.year);
      });

      setVisible(item.querySelector(".new-t-2.tab"), Boolean(summary.isNew));
      setVisible(item.querySelector(".new-t-2.mob"), Boolean(summary.isNew));
    });

    const upcoming = workIndex.upcoming || null;
    if (upcoming) {
      setText(document.querySelector(".upcoming-text.left"), upcoming.labelPrefix);

      const upcomingTextNodes = queryAll(".upcoming-wrap .upcoming-text");
      if (upcomingTextNodes[1]) {
        setText(upcomingTextNodes[1], upcoming.labelDate);
      }

      setImage(document.querySelector(".upcoming-inn"), {
        src: upcoming.titleImage,
        alt: upcoming.description,
      });
      queryAll(".upcoming-wrap .has-dropcap").forEach((node) => {
        setText(node, upcoming.description);
      });
      setImage(document.querySelector(".upcoming-img__wrap img"), upcoming.image);
    }

    const contact = workIndex.contact || null;
    if (contact) {
      const scope = document.querySelector(".c2-col.r");
      if (scope) {
        setHtml(scope.querySelector(".c2-head"), contact.headlineHtml);
        setHtml(scope.querySelector(".c2-desc.desktop"), contact.descriptionDesktopHtml);
        setText(scope.querySelector(".c2-desc.mob"), contact.descriptionMobile);
        setHref(scope.querySelector(".cta-h.new-tab"), site.sharedCta && site.sharedCta.href);
        setText(scope.querySelector(".cta-text"), site.sharedCta && site.sharedCta.label);
        setText(scope.querySelector(".head-caption .item-title.cap.hor"), contact.availabilityLabel);
        setText(scope.querySelector(".head-caption .item-desc.cap.hor"), contact.availabilityValue);
      }
    }
  }

  function applySidebarCard(card, summary) {
    if (!card || !summary) {
      return;
    }

    const project = getProject(summary.slug);

    setHref(card.querySelector(".item-link"), summary.href);

    const previewImage = card.querySelector(".item-img img");
    setImage(previewImage, summary.cardImage);
    if (previewImage && typeof summary.previewImage === "string") {
      previewImage.setAttribute("data-image", summary.previewImage);
    }

    renderTitle(card.querySelector(".item-tw"), {
      role: "sidebar",
      text: getProjectTitle(project, summary),
      imageSelector: "img.item-t",
      beforeSelector: ".new-w-2",
    });
    setText(card.querySelector(".item-desc"), summary.summary);
    setVisible(card.querySelector(".new-w-2"), Boolean(summary.isNew));
  }

  function applyDetailPage(slug) {
    const project = getProject(slug);
    const detail = getProjectDetail(slug);
    if (!project || !detail) {
      return;
    }

    document.title = `${site.browserTitlePrefix} - ${project.name}`;

    renderTitle(document.querySelector(".pr-title__wrap"), {
      role: "detail",
      text: getProjectTitle(project, detail),
      imageSelector: "img.pr-title",
      beforeSelector: ".sub-heading",
    });
    setBackgroundImage(document.querySelector(".cover .c-inner"), detail.coverImage);
    setBackgroundImage(document.querySelector(".pw-img"), detail.storyImage || detail.coverImage);

    setText(document.querySelector(".bar-client .div-block-51 .text.disc"), detail.client);
    setText(document.querySelector(".bar-year .text.disc:last-child"), detail.year);

    const categoryImages = (detail.categories || []).map((src) => ({ src }));
    const categoryContainer = document.querySelector(".bar-wrap.center");
    syncImageWraps(categoryContainer, ".bar-field__wrap", "img.bar-field", categoryImages);

    const liveSiteLink = document.querySelector(".cta-h.work");
    setHref(liveSiteLink, detail.liveSite);
    setText(liveSiteLink && liveSiteLink.querySelector(".cta-text.work"), "Live Site");

    setText(document.querySelector(".pr-info-w .case-desc.about h5.has-dropcap"), detail.introText);
    setText(document.querySelector(".case-extra .case-desc.wrap h5.has-dropcap"), detail.storyText);

    syncGallery(detail.gallery || []);

    const nextProjects = detail.nextProjects || {};
    const leftSummary = getProjectSummary(nextProjects.left);
    if (leftSummary) {
      applySidebarCard(document.querySelector(".sidebar .item.fl"), leftSummary);
    }

    const rightSummary = getProjectSummary(nextProjects.right);
    if (rightSummary) {
      applySidebarCard(document.querySelector(".sidebar .item.fr"), rightSummary);
    }
  }

  applySharedChrome();

  if (isWorkIndex) {
    applyWorkIndexPage();
  } else if (currentSlug) {
    applyDetailPage(currentSlug);
  }

  scheduleTitleFit();
})();

