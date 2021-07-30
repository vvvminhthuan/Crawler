let e = "Incorrect Value",
t = {
    required: ":name is required",
    min: ":name cant be less than :min",
    max: ":name cant be greater than :max",
    between: ":name must be between :from and :to",
    checked: ":name must be checked",
    array: ":name must be array",
    object: ":name must be object",
    boolean: ":name must be boolean",
    numeric: ":name can only contain digits",
    alpha_numeric: ":name can only contain digits and letters",
    alpha_dash: ":name can only contain letters and dashes",
    alpha: ":name can only contain leters",
    email: ":name must be correct mail",
    phone: ":name must be a correct phone number",
    in_array: ":name is invalid",
    not_in: ":name can't be :value",
    json: ":name must be valid json",
    ip: ":name must be valid ip adress",
    url: ":name must be valid url",
    equals: ":name must equal to :value",
    not_equals: ":name can't be :value",
    contains_one: ':name must contain ":value_to_contain"',
    contains_all: ':name must contain ":value_to_contain"',
    starts_with: ":name must start with :prefix",
    ends_with: ":name must end with :suffix",
    date: ":name must valid date"
};
const n = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
r = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
let a = {
    alpha: e => /^[a-zA-Z]+$/.test(e) || {
        value: e
    },
    alpha_dash: e => /^[A-Za-z\-]+$/.test(e) || {
        value: e
    },
    alpha_numeric: e => /^[A-Za-z0-9]+$/.test(e) || {
        value: e
    },
    array: e => Array.isArray(e) || {},
    between(e, t, n) {
        if ("string" == typeof e) {
            if (e.length >= t && e.length <= n) return !0
        } else if (e >= t && e <= n) return !0;
        return {
            from: t,
            to: n,
            value: e
        }
    },
    boolean: e => "boolean" == typeof e || {},
    checked: e => 1 === e || "on" === e || !0 === e || "true" === e || {},
    contains_all(e, ...t) {
        Array.isArray(e) || (e = String(e));
        for (let n = 0, r = t.length; n < r; n++)
            if (-1 === e.indexOf(t[n])) return {
                value_to_contain: t[n]
            };
        return !0
    },
    contains_one(e, ...t) {
        Array.isArray(e) || (e = String(e));
        for (let n = 0, r = t.length; n < r; n++)
            if (e.indexOf(t[n]) > -1) return !0;
        return {
            value_to_contain: t.join(",")
        }
    },
    date: e => !isNaN(Date.parse(e)) || {},
    email: e => n.test(e) || {
        value: e
    },
    phone: e => /^\d{7,}$/.test(e.replace(/[\s()+\-\.]|ext/gi, "")),
    ends_with: (e, t) => (t = String(t), -1 !== (e = String(e)).indexOf(t, e.length - t.length) || {
        suffix: t
    }),
    equals: (e, t) => String(e) === t || {
        value: t
    },
    in_array: (e, ...t) => t.indexOf(String(e)) > -1 || {
        value: t.join(",")
    },
    ip: e => r.test(e) || {
        value: e
    },
    json(e) {
        try {
            return JSON.parse(String(e)), !0
        } catch (e) {
            return {}
        }
    },
    max(e, t) {
        if ("string" == typeof e) {
            if (e.length <= t) return !0
        } else if (void 0 !== typeof e && e <= t) return !0;
        return {
            max: t
        }
    },
    min(e, t) {
        if ("string" == typeof e) {
            if (e.length >= t) return !0
        } else if (void 0 !== typeof e && e >= t) return !0;
        return {
            min: t
        }
    },
    not_equals: (e, t) => String(e) !== t || {
        value: t
    },
    not_in: (e, ...t) => -1 === t.indexOf(String(e)) || {
        value: e
    },
    numeric: e => /^\d+$/.test(e) || {
        value: e
    },
    object: e => "object" == typeof e || {
        value: e
    },
    starts_with: (e, t) => (t = String(t), (e = String(e)).indexOf(t) > 0 || {
        prefix: t
    }),
    url(e) {
        try {
            return new URL(e), !0
        } catch (t) {
            return {
                value: e
            }
        }
    }
};
const i = ["required", "string", "nullable", "number"];
let o = "|",
    s = ":",
    l = ",";
class u {
    constructor(e) {
        "string" == typeof e ? (this.name = e, this.isInlineFunction = !1, -1 === i.indexOf(e) && (this.validator = function(e) {
            if (!1 === a.hasOwnProperty(e)) throw `The validation method "${e}" does not exist`;
            return a[e]
        }(this.name))) : "function" == typeof e && (this.name = e.name || "default", this.isInlineFunction = !0, this.validator = e), this.params = []
    }
    validate(e, t, n) {
        if (null == t || "" === t) {
            if (e.isRequired) return {
                rule: "required"
            };
            if (e.isNullable) return !0
        }
        return e.isNumber ? t = parseFloat(t) : e.isString && (t = String(t)), this.isInlineFunction ? this.validator(t, n) : this.validator(t, ...this.params)
    }
    setParams(e = []) {
        return this.params = e, this
    }
}

function f(e) {
    let t = {},
        n = 100;
    return e.map((function(e) {
        if (null != e && "" !== e)
            if ("string" == typeof e) {
                let n = c(e);
                Object.assign(t, n)
            } else if ("function" == typeof e) {
            let r = e.name.length > 0 ? e.name : n++;
            t[r] = new u(e)
        }
    })), t
}

function m(e) {
    let t = {},
        n = 100;
    return Object.keys(e).map((function(r) {
        let a = e[r];
        if ("function" == typeof a) {
            let e = a.name.length > 0 ? a.name : n++;
            t[e] = new u(a)
        } else {
            let e = Array.isArray(a) ? a : [a];
            t[r] = new u(r).setParams(e)
        }
    })), t
}

function c(e) {
    let t = {};
    return e.split(o).filter((function(e) {
        return "" !== e
    })).map((function(e) {
        let n = e.split(s),
            r = n[0].trim(),
            a = new u(r),
            i = n[1],
            o = void 0 !== i ? i.split(l) : [];
        a.setParams(o), t[r] = a
    })), t
}

function h(n, r, a) {
    if ("object" != typeof r && (r = {}), r.name = n, void 0 === t[a]) return e;
    let i = t[a];
    return Object.keys(r).map((function(e) {
        i = i.replace(":" + e, r[e])
    })), i
}

function d(e, t) {
    return {
        hasError: Object.keys(e).length > 0,
        errors: e,
        isError: function(n, r) {
            return void 0 === r ? void 0 !== e[n] : void 0 !== t[n] && -1 !== t[n].indexOf(r)
        },
        getError: function(t, n = !0) {
            return Array.isArray(e[t]) && 0 !== e[t].length ? n ? e[t].join(",") : e[t][0] : ""
        }
    }
}

function p(e, t, n) {
    let r = {},
        a = {};
    if ("object" != typeof e || "object" != typeof t) throw "Both data and scheme must be object";
    let o = function(e) {
        const t = {};
        for (let n in e) {
            let r = e[n],
                a = {};
            if ("string" == typeof r) a = c(r);
            else if (Array.isArray(r)) a = f(r);
            else {
                if ("object" != typeof r) throw `Invalid rules for ${n}`;
                a = m(r)
            }
            let o = void 0 !== a.required,
                s = void 0 !== a.string,
                l = void 0 !== a.number,
                u = void 0 !== a.nullable;
            for (let e = 0; e < i.length; e++) delete a[i[e]];
            t[n] = {
                rules: Object.values(a),
                isRequired: o,
                isString: s,
                isNumber: l,
                isNullable: u
            }
        }
        return t
    }(t);
    for (let t in o) {
        a[t] = [];
        for (let n = 0, i = o[t].rules.length; n < i; n++) {
            let i, s = o[t].rules[n],
                l = s.validate(o[t], e[t], e),
                u = l.rule ? l.rule : s.name;
            !0 !== l && (i = "string" == typeof l ? l : h(t, l, u), void 0 === r[t] ? r[t] = [i] : -1 === r[t].indexOf(i) && r[t].push(i), a[t].push(u))
        }
    }
    const s = d(r, a);
    return "function" == typeof n && n(s), s
}
var g = Object.freeze({
    __proto__: null,
    extend: function(e, n, r = null) {
        if (a.hasOwnProperty(e)) throw `The validation method "${e}" already exists`;
        if ("function" != typeof n) throw "The validation method must be function";
        a[e] = n, r && (t[e] = r)
    },
    formatMessage: h,
    formatErrors: d,
    getEmpty: function() {
        return p({}, {})
    },
    validate: p,
    setMessages: function(e) {
        if ("object" != typeof e) throw "Messages must be object";
        t = {
            ...t,
            ...e
        }
    },
    setDefaultMessage: function(t) {
        if ("string" != typeof t) throw "Default message must be a string";
        e = t
    },
    setRuleSeparator: function(e) {
        if ("string" != typeof e) throw "Separator must be string";
        o = e
    },
    setRuleParamSeparator: function(e) {
        if ("string" != typeof e) throw "Separator must be string";
        s = e
    },
    setParamsSeparator: function(e) {
        if ("string" != typeof e) throw "Separator must be string";
        l = e
    }
});
export default g;
//# sourceMappingURL=max-validator.es.js.map