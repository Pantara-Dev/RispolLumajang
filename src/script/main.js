const q = () => {
    const t = document.querySelectorAll("[data-dark-toggle]");
    t.length &&
      t.forEach((e) => {
        e.addEventListener("click", () => {
          const n = document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", n ? "dark" : "light");
        });
      });
  },
  L = () => {
    const t = document.querySelector("[data-mobile-toggle]"),
      e = document.querySelector("[data-mobile-menu]");
    !t ||
      !e ||
      t.addEventListener("click", () => {
        const n = t.getAttribute("aria-expanded") === "true";
        (t.setAttribute("aria-expanded", String(!n)),
          e.classList.toggle("hidden"));
        const s = t.querySelector("svg");
        s &&
          (s.innerHTML = n
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />');
      });
  },
  b = () => {
    const t = document.querySelector("[data-header]");
    if (!t) return;
    const e = () => {
      window.scrollY > 50
        ? t.classList.add("shadow-lg")
        : t.classList.remove("shadow-lg");
    };
    (window.addEventListener("scroll", e, { passive: !0 }), e());
  },
  C = () => {
    const t = document.querySelectorAll("[data-animate]");
    if (
      !t.length ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const e = window.innerHeight;
    t.forEach((s) => {
      if (s.getBoundingClientRect().top > e * 0.8) {
        ((s.style.opacity = "0"),
          (s.style.transform = "translateY(20px)"),
          (s.style.transition =
            "opacity 0.6s ease-out, transform 0.6s ease-out"));
        const o = s.dataset.delay || "0";
        s.style.transitionDelay = `${o}ms`;
      }
    });
    const n = new IntersectionObserver(
      (s) => {
        s.forEach((r) => {
          if (r.isIntersecting) {
            const o = r.target;
            ((o.style.opacity = "1"),
              (o.style.transform = "translateY(0)"),
              n.unobserve(r.target));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    t.forEach((s) => {
      s.getBoundingClientRect().top > e * 0.8 && n.observe(s);
    });
  },
  M = () => {
    const t = document.querySelectorAll("[data-nav-link]");
    if (!t.length) return;
    const e = [];
    if (
      (t.forEach((r) => {
        const o = r.dataset.navLink;
        if (o) {
          const a = document.getElementById(o);
          a && e.push(a);
        }
      }),
      !e.length)
    )
      return;
    const n = (r) => {
        t.forEach((o) => {
          o.dataset.navLink === r
            ? o.classList.add("nav-active")
            : o.classList.remove("nav-active");
        });
      },
      s = new IntersectionObserver(
        (r) => {
          r.forEach((o) => {
            o.isIntersecting && n(o.target.id);
          });
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
    e.forEach((r) => s.observe(r));
  },
  A = () => {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((e) => {
      e.addEventListener("click", (n) => {
        const s = e.getAttribute("href");
        if (!s) return;
        const r = document.querySelector(s);
        if (r) {
          n.preventDefault();
          const o = document.querySelector("[data-header]"),
            a = o ? o.offsetHeight + 20 : 20,
            i = r.getBoundingClientRect().top + window.scrollY - a;
          (window.scrollTo({ top: i, behavior: "smooth" }),
            history.pushState(null, "", s));
        }
      });
    });
  },
  I = () => {
    const t = document.querySelectorAll("[data-faq-toggle]");
    t.length &&
      t.forEach((e) => {
        e.addEventListener("click", () => {
          const n = e.nextElementSibling,
            s = e.querySelector("[data-faq-icon]");
          if (!n) return;
          const r = n.style.maxHeight && n.style.maxHeight !== "0px";
          (t.forEach((o) => {
            const a = o.nextElementSibling,
              i = o.querySelector("[data-faq-icon]");
            a &&
              o !== e &&
              ((a.style.maxHeight = "0px"),
              (a.style.opacity = "0"),
              i && (i.style.transform = "rotate(0deg)"));
          }),
            r
              ? ((n.style.maxHeight = "0px"),
                (n.style.opacity = "0"),
                s && (s.style.transform = "rotate(0deg)"))
              : ((n.style.maxHeight = n.scrollHeight + "px"),
                (n.style.opacity = "1"),
                s && (s.style.transform = "rotate(45deg)")));
        });
      });
  },
  H = () => {
    const t = document.getElementById("cookie-consent");
    if (!t || localStorage.getItem("cookie-consent")) return;
    setTimeout(() => {
      t.style.transform = "translateY(0)";
    }, 1500);
    const e = () => {
      ((t.style.transform = "translateY(100%)"),
        setTimeout(() => t.remove(), 300));
    };
    (t.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
      (localStorage.setItem("cookie-consent", "accepted"), e());
    }),
      t
        .querySelector("[data-cookie-decline]")
        ?.addEventListener("click", () => {
          (localStorage.setItem("cookie-consent", "essential"), e());
        }));
  },
  T = () => {
    const t = document.querySelectorAll("[data-carousel]");
    t.length &&
      t.forEach((e) => {
        const n = e.querySelector("[data-carousel-track]"),
          s = e.querySelectorAll("[data-carousel-slide]"),
          r = e.querySelector("[data-carousel-dots]"),
          o = e.querySelector("[data-carousel-prev]"),
          a = e.querySelector("[data-carousel-next]");
        if (!n || s.length < 2) return;
        let i = 0,
          l = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1,
          y;
        const u = () => Math.max(0, s.length - l),
          m = () => {
            const d = n.parentElement;
            if (!d) return;
            const h = d.offsetWidth / l;
            (s.forEach((w) => {
              w.style.width = h + "px";
            }),
              (n.style.transform = `translateX(-${i * h}px)`));
            const x = u() > 0;
            (o && (o.style.display = x ? "flex" : "none"),
              a && (a.style.display = x ? "flex" : "none"),
              r?.querySelectorAll("button").forEach((w, E) => {
                const k = E === i;
                w.className = `h-2.5 rounded-full transition-all ${k ? "w-8 bg-primary-600 dark:bg-primary-400" : "w-2.5 bg-gray-300 dark:bg-gray-600"}`;
              }));
          },
          g = () => {
            ((i = i >= u() ? 0 : i + 1), m());
          },
          v = () => {
            ((i = i <= 0 ? u() : i - 1), m());
          },
          p = () => {
            (clearInterval(y), (y = setInterval(g, 5e3)));
          };
        (a?.addEventListener("click", () => {
          (g(), p());
        }),
          o?.addEventListener("click", () => {
            (v(), p());
          }));
        const f = () => {
          if (!r) return;
          r.innerHTML = "";
          const d = u() + 1;
          if (!(d <= 1))
            for (let c = 0; c < d; c++) {
              const h = document.createElement("button");
              ((h.type = "button"),
                (h.ariaLabel = `Go to slide ${c + 1}`),
                h.addEventListener("click", () => {
                  ((i = c), m(), p());
                }),
                r.appendChild(h));
            }
        };
        (window.addEventListener("resize", () => {
          const d =
            window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
          (d !== l && ((l = d), (i = Math.min(i, u())), f()), m());
        }),
          f(),
          (y = setInterval(g, 5e3)),
          e.addEventListener("mouseenter", () => clearInterval(y)),
          e.addEventListener("mouseleave", p),
          m());
      });
  },
  F = () => {
    const t = document.querySelectorAll("[data-counter]");
    if (!t.length) return;
    const e = new IntersectionObserver(
      (n) => {
        n.forEach((s) => {
          if (s.isIntersecting) {
            const r = s.target,
              o = r.dataset.counter || "0";
            (B(r, o), e.unobserve(r));
          }
        });
      },
      { threshold: 0.5 },
    );
    t.forEach((n) => e.observe(n));
  },
  B = (t, e) => {
    const n = parseFloat(e.replace(/[^0-9.]/g, "")),
      s = 2e3,
      r = performance.now(),
      o = e.includes("+"),
      a = e.includes("%"),
      i = e.includes("K"),
      l = e.includes("M"),
      y = e.includes("$"),
      u = e.includes("."),
      m = (g) => {
        const v = g - r,
          p = Math.min(v / s, 1),
          f = 1 - Math.pow(1 - p, 3),
          d = n * f;
        let c = "";
        (y && l
          ? (c = "$" + d.toFixed(1) + "M")
          : y && i
            ? (c = "$" + Math.round(d) + "K")
            : i
              ? (c = Math.round(d) + "K")
              : l
                ? (c = d.toFixed(1) + "M")
                : a
                  ? (c = Math.round(d) + "%")
                  : u
                    ? (c = d.toFixed(1))
                    : (c = Math.round(d).toString()),
          o && (c += "+"),
          (t.textContent = c),
          p < 1 ? requestAnimationFrame(m) : (t.textContent = e));
      };
    requestAnimationFrame(m);
  },
  Y = () => {
    const t = document.getElementById("back-to-top");
    if (!t) return;
    const e = () => {
      window.scrollY > 300
        ? ((t.style.opacity = "1"),
          (t.style.pointerEvents = "auto"),
          (t.style.transform = "translateY(0)"))
        : ((t.style.opacity = "0"),
          (t.style.pointerEvents = "none"),
          (t.style.transform = "translateY(16px)"));
    };
    (window.addEventListener("scroll", e, { passive: !0 }),
      t.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      ),
      e());
  },
  $ = (t, e = "success") => {
    const n = document.createElement("div");
    ((n.className = `fixed top-6 right-6 z-[80] flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg transition-all duration-300 ${e === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`),
      (n.style.transform = "translateX(120%)"),
      (n.innerHTML = `
    <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      ${e === "success" ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'}
    </svg>
    <span class="text-sm font-medium">${t}</span>
  `),
      document.body.appendChild(n),
      requestAnimationFrame(() => {
        n.style.transform = "translateX(0)";
      }),
      setTimeout(() => {
        ((n.style.transform = "translateX(120%)"),
          setTimeout(() => n.remove(), 300));
      }, 4e3));
  },
  P = () => {
    const t = document.querySelectorAll("form[data-validate]");
    if (!t.length) return;
    const e = (r, o) => {
        r.classList.add("!border-red-500");
        let a = r.parentElement?.querySelector("[data-error]");
        (a ||
          ((a = document.createElement("p")),
          a.setAttribute("data-error", ""),
          (a.className = "mt-1 text-sm text-red-500"),
          r.parentElement?.appendChild(a)),
          (a.textContent = o));
      },
      n = (r) => {
        r.classList.remove("!border-red-500");
        const o = r.parentElement?.querySelector("[data-error]");
        o && o.remove();
      },
      s = (r) => (
        n(r),
        r.required && !r.value.trim()
          ? (e(r, "This field is required"), !1)
          : r.type === "email" &&
              r.value &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.value)
            ? (e(r, "Please enter a valid email address"), !1)
            : !0
      );
    t.forEach((r) => {
      const o = r.querySelectorAll("input, textarea");
      (o.forEach((a) => {
        (a.addEventListener("blur", () => s(a)),
          a.addEventListener("input", () => {
            a.parentElement?.querySelector("[data-error]") && s(a);
          }));
      }),
        r.addEventListener("submit", (a) => {
          a.preventDefault();
          let i = !0;
          (o.forEach((l) => {
            s(l) || (i = !1);
          }),
            i && (r.reset(), $("Message sent successfully!")));
        }));
    });
  },
  D = () => {
    const t = document.querySelectorAll("[data-typewriter]");
    t.length &&
      t.forEach((e) => {
        const n = e.dataset.typewriter;
        if (!n) return;
        let s;
        try {
          s = JSON.parse(n);
        } catch {
          return;
        }
        if (!s.length) return;
        const o = [e.textContent || "", ...s];
        let a = 0;
        const i = () => {
          ((e.style.opacity = "0"),
            (e.style.transform = "translateY(10px)"),
            setTimeout(() => {
              ((a = (a + 1) % o.length),
                (e.textContent = o[a]),
                (e.style.opacity = "1"),
                (e.style.transform = "translateY(0)"));
            }, 300));
        };
        ((e.style.transition = "opacity 0.3s ease, transform 0.3s ease"),
          (e.style.display = "inline-block"),
          setInterval(i, 3e3));
      });
  },
  z = () => {
    const t = document.getElementById("scroll-progress");
    if (!t) return;
    const e = () => {
      const n = window.scrollY,
        s = document.documentElement.scrollHeight - window.innerHeight,
        r = s > 0 ? (n / s) * 100 : 0;
      t.style.width = r + "%";
    };
    (window.addEventListener("scroll", e, { passive: !0 }), e());
  },
  W = () => {
    const t = document.querySelectorAll("[data-lightbox]");
    t.length &&
      t.forEach((e) => {
        e.addEventListener("click", () => {
          const n = document.createElement("div");
          ((n.className =
            "fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"),
            (n.style.opacity = "0"),
            (n.style.transition = "opacity 0.3s ease"),
            (n.innerHTML = `
        <button type="button" data-lightbox-close class="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20" aria-label="Close">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <img src="${e.src}" alt="${e.alt || ""}" class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl" />
        ${e.alt ? `<p class="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-black/50 px-4 py-2 text-sm text-white">${e.alt}</p>` : ""}
      `),
            document.body.appendChild(n),
            (document.body.style.overflow = "hidden"),
            requestAnimationFrame(() => {
              n.style.opacity = "1";
            }));
          const s = () => {
            ((n.style.opacity = "0"),
              setTimeout(() => {
                (n.remove(), (document.body.style.overflow = ""));
              }, 300));
          };
          (n.addEventListener("click", (r) => {
            r.target === n && s();
          }),
            n
              .querySelector("[data-lightbox-close]")
              ?.addEventListener("click", s),
            document.addEventListener("keydown", function r(o) {
              o.key === "Escape" &&
                (s(), document.removeEventListener("keydown", r));
            }));
        });
      });
  },
  j = () => {
    const t = document.querySelector("[data-blog-filters]");
    if (!t) return;
    const e = t.querySelectorAll("[data-filter]"),
      n = document.querySelectorAll("[data-category]");
    !e.length ||
      !n.length ||
      e.forEach((s) => {
        s.addEventListener("click", () => {
          const r = s.dataset.filter || "all";
          (e.forEach((o) => {
            (o.classList.toggle("bg-primary-600", o === s),
              o.classList.toggle("text-white", o === s),
              o.classList.toggle("dark:text-white", o === s),
              o.classList.toggle("bg-gray-200", o !== s),
              o.classList.toggle("dark:bg-gray-700", o !== s),
              o.classList.toggle("text-gray-700", o !== s),
              o.classList.toggle("dark:text-gray-300", o !== s));
          }),
            n.forEach((o) => {
              r === "all" || o.dataset.category === r
                ? ((o.style.display = ""),
                  (o.style.opacity = "0"),
                  (o.style.transform = "translateY(10px)"),
                  requestAnimationFrame(() => {
                    ((o.style.transition =
                      "opacity 0.3s ease, transform 0.3s ease"),
                      (o.style.opacity = "1"),
                      (o.style.transform = "translateY(0)"));
                  }))
                : (o.style.display = "none");
            }));
        });
      });
  },
  N = () => {
    const t = document.querySelectorAll("[data-before-after]");
    t.length &&
      t.forEach((e) => {
        const n = e.querySelector("[data-before-clip]"),
          s = e.querySelector("[data-before-handle]");
        if (!n || !s) return;
        let r = !1;
        const o = (a) => {
          const i = e.getBoundingClientRect();
          let l = a - i.left;
          l = Math.max(0, Math.min(l, i.width));
          const y = (l / i.width) * 100;
          ((n.style.width = y + "%"), (s.style.left = y + "%"));
        };
        (e.addEventListener("mousedown", (a) => {
          ((r = !0), o(a.clientX), a.preventDefault());
        }),
          e.addEventListener(
            "touchstart",
            (a) => {
              ((r = !0), o(a.touches[0].clientX));
            },
            { passive: !0 },
          ),
          window.addEventListener("mousemove", (a) => {
            r && o(a.clientX);
          }),
          window.addEventListener(
            "touchmove",
            (a) => {
              r && o(a.touches[0].clientX);
            },
            { passive: !0 },
          ),
          window.addEventListener("mouseup", () => {
            r = !1;
          }),
          window.addEventListener("touchend", () => {
            r = !1;
          }));
      });
  },
  O = () => {
    const t = document.querySelectorAll("[data-parallax]");
    if (!t.length) return;
    const e = () => {
      const n = window.scrollY;
      t.forEach((s) => {
        const r = parseFloat(s.dataset.parallax || "0.3"),
          o = s.getBoundingClientRect();
        o.bottom < 0 ||
          o.top > window.innerHeight + 200 ||
          (s.style.transform = `translateY(${n * r}px)`);
      });
    };
    (window.addEventListener("scroll", e, { passive: !0 }), e());
  },
  X = () => {
    const t = document.querySelector("[data-blog-search]");
    if (!t) return;
    const e = document.querySelectorAll("[data-category]");
    e.length &&
      t.addEventListener("input", () => {
        const n = t.value.toLowerCase().trim(),
          r =
            document
              .querySelector("[data-blog-filters]")
              ?.querySelector(".bg-primary-600")?.dataset.filter || "all";
        e.forEach((l) => {
          const y = l.querySelector("h3")?.textContent?.toLowerCase() || "",
            u = l.querySelector("p")?.textContent?.toLowerCase() || "",
            m = l.dataset.category || "";
          (!n || y.includes(n) || u.includes(n)) && (r === "all" || m === r)
            ? ((l.style.display = ""),
              (l.style.opacity = "1"),
              (l.style.transform = "translateY(0)"))
            : (l.style.display = "none");
        });
        const o = e[0]?.parentElement;
        if (!o) return;
        let a = o.querySelector("[data-no-results]");
        Array.from(e).filter((l) => l.style.display !== "none").length === 0
          ? (a ||
              ((a = document.createElement("div")),
              a.setAttribute("data-no-results", ""),
              (a.className = "col-span-full py-16 text-center"),
              (a.innerHTML =
                '<p class="text-lg text-gray-500 dark:text-gray-400">No articles found matching your search.</p>'),
              o.appendChild(a)),
            (a.style.display = ""))
          : a && (a.style.display = "none");
      });
  },
  R = () => {
    const t = document.querySelectorAll('img[loading="lazy"]');
    t.length &&
      t.forEach((e) => {
        e.complete ||
          (e.classList.add("img-shimmer"),
          e.addEventListener(
            "load",
            () => {
              e.classList.remove("img-shimmer");
            },
            { once: !0 },
          ),
          e.addEventListener(
            "error",
            () => {
              e.classList.remove("img-shimmer");
            },
            { once: !0 },
          ));
      });
  },
  K = () => {
    const t = document.querySelector("[data-quote-calculator]");
    if (!t) return;
    const e = t.querySelector("[data-quote-property]"),
      n = t.querySelector("[data-quote-size]"),
      s = t.querySelector("[data-quote-size-value]"),
      r = t.querySelector("[data-quote-rooms-minus]"),
      o = t.querySelector("[data-quote-rooms-plus]"),
      a = t.querySelector("[data-quote-rooms-value]"),
      i = t.querySelectorAll("[data-quote-frequency]"),
      l = t.querySelector("[data-quote-price]"),
      y = t.querySelector("[data-quote-discount]");
    if (!e || !n || !l) return;
    let u = 3,
      m = "once";
    const g = { house: 150, apartment: 100, condo: 120, office: 200 },
      v = { once: 1, weekly: 0.7, biweekly: 0.8, monthly: 0.9 },
      p = { once: 0, weekly: 30, biweekly: 20, monthly: 10 },
      f = () => {
        const c = g[e.value] || 150,
          x = (parseInt(n.value) || 1500) * 0.08,
          w = u * 15,
          E = c + x + w,
          k = Math.round(E * (v[m] || 1)),
          S = p[m] || 0;
        (l.classList.add("updating"),
          setTimeout(() => {
            ((l.textContent = "$" + k), l.classList.remove("updating"));
          }, 150),
          y &&
            ((y.textContent = S > 0 ? `Save ${S}%` : ""),
            (y.style.display = S > 0 ? "" : "none")));
      };
    (e.addEventListener("change", f),
      n.addEventListener("input", () => {
        s && (s.textContent = n.value + " sq ft");
        const c = ((parseInt(n.value) - 500) / 4500) * 100;
        (n.style.setProperty("--range-progress", c + "%"), f());
      }),
      r &&
        o &&
        a &&
        (r.addEventListener("click", () => {
          u > 1 && (u--, (a.textContent = String(u)), f());
        }),
        o.addEventListener("click", () => {
          u < 10 && (u++, (a.textContent = String(u)), f());
        })),
      i.forEach((c) => {
        c.addEventListener("click", () => {
          (i.forEach((h) => {
            (h.classList.remove("bg-primary-600", "text-white"),
              h.classList.add(
                "bg-gray-100",
                "text-gray-700",
                "dark:bg-gray-800",
                "dark:text-gray-300",
              ));
          }),
            c.classList.add("bg-primary-600", "text-white"),
            c.classList.remove(
              "bg-gray-100",
              "text-gray-700",
              "dark:bg-gray-800",
              "dark:text-gray-300",
            ),
            (m = c.dataset.quoteFrequency || "once"),
            f());
        });
      }));
    const d = ((parseInt(n.value) - 500) / 4500) * 100;
    (n.style.setProperty("--range-progress", d + "%"), f());
  },
  V = () => {
    const t = document.querySelector("[data-area-check-input]"),
      e = document.querySelector("[data-area-check-submit]"),
      n = document.querySelector("[data-area-check-result]");
    if (!t || !e || !n) return;
    const s = JSON.parse(
      document.querySelector("[data-valid-zips]")?.dataset.validZips || "[]",
    );
    (e.addEventListener("click", () => {
      const r = t.value.trim();
      r &&
        (s.includes(r)
          ? (n.innerHTML =
              '<div class="flex items-center gap-2 text-accent-600 dark:text-accent-400"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span>Great news! We serve your area.</span></div>')
          : (n.innerHTML = `<div class="flex items-center gap-2 text-red-500"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg><span>Sorry, we don't serve this area yet. <a href="/contact" class="underline">Contact us</a> for updates.</span></div>`),
        (n.style.display = ""));
    }),
      t.addEventListener("keydown", (r) => {
        r.key === "Enter" && e.click();
      }));
  },
  G = () => {
    document.querySelectorAll("[data-range-slider]").forEach((e) => {
      const n = () => {
        const s = parseFloat(e.min) || 0,
          r = parseFloat(e.max) || 100,
          a = (((parseFloat(e.value) || 0) - s) / (r - s)) * 100;
        e.style.setProperty("--range-progress", a + "%");
      };
      (e.addEventListener("input", n), n());
    });
  },
  J = () => {
    const t = document.querySelectorAll("[data-checklist-toggle]");
    t.length &&
      t.forEach((e) => {
        e.addEventListener("click", () => {
          const n = e.nextElementSibling;
          if (!n) return;
          const s = n.style.maxHeight && n.style.maxHeight !== "0px";
          (t.forEach((r) => {
            const o = r.nextElementSibling;
            o &&
              r !== e &&
              ((o.style.maxHeight = "0px"), (o.style.opacity = "0"));
          }),
            (n.style.maxHeight = s ? "0px" : n.scrollHeight + "px"),
            (n.style.opacity = s ? "0" : "1"));
        });
      });
  };
document.addEventListener("DOMContentLoaded", () => {
  (q(),
    L(),
    b(),
    A(),
    M(),
    D(),
    Y(),
    z(),
    T(),
    F(),
    H(),
    I(),
    P(),
    W(),
    j(),
    X(),
    N(),
    O(),
    R(),
    K(),
    V(),
    G(),
    J());
});
requestAnimationFrame(() => {
  C();
});
