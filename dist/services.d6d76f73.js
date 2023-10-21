class Counter {
    constructor(t, e){
        this.element = t, this.options = {
            origin: 0,
            target: 100,
            type: "numeric",
            duration: 1500,
            suffix: null,
            classes: {
                bar: "counter-bar",
                number: "counter-number"
            },
            ...e
        }, this.init();
    }
    init() {
        document.querySelectorAll(this.element).forEach((t)=>{
            const e = Object.keys(t.dataset).filter((t)=>t.startsWith("counter")).reduce((e, i)=>(e[i.replace("counter", "").toLowerCase()] = i.includes("Origin") || i.includes("Target") || i.includes("Duration") ? +t.dataset[i] : t.dataset[i], e), {}), i = {
                ...this.options,
                ...e
            };
            this.run(t, i), document.addEventListener("scroll", this.run.bind(this, t, i));
        });
    }
    run(t, e) {
        const i = t.offsetTop - window.innerHeight, r = t.offsetTop + t.clientHeight;
        window.pageYOffset < i || window.pageYOffset > r || t.hasAttribute("data-counter-complete") || ("numeric" == e.type ? this.startNumeric(t, e) : "bar" == e.type ? this.startBar(t, e) : "both" == e.type && (Object.values(e.classes).forEach((e)=>{
            t.querySelector(`.${e}`) || (t.innerHTML += `<div class="${e}"></div>`);
        }), this.startNumeric(t, e, !0), this.startBar(t, e, !0)), t.setAttribute("data-counter-complete", "true"));
    }
    startNumeric(t, e, i = !1) {
        i && (t = t.querySelector(`.${e.classes.number}`));
        const r = +t.innerText || e.origin;
        let n;
        const s = (i)=>{
            n = n || i;
            const a = Math.min((i - n) / e.duration, 1);
            t.innerHTML = Math.floor(a * (e.target - r) + r) + e.suffix, a < 1 ? window.requestAnimationFrame(s) : window.cancelAnimationFrame(window.requestAnimationFrame(s));
        };
        window.requestAnimationFrame(s);
    }
    startBar(t, e, i = !1) {
        i && (t = t.querySelector(`.${this.options.classes.bar}`)), t.animate([
            {
                width: `${100 * e.origin / e.target}%`
            },
            {
                width: "100%"
            }
        ], {
            duration: e.duration,
            iterations: 1
        });
    }
}

//# sourceMappingURL=services.d6d76f73.js.map
