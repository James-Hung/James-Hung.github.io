jQuery(document).ready(function (s) {
  var e,
    a,
    t = 2500,
    n = 500,
    d = 1500;
  function l(e) {
    var i = c(e);
    if (e.parents(".cd-headline").hasClass("type")) {
      var a = e.parent(".cd-words-wrapper");
      a.addClass("selected").removeClass("waiting"),
        setTimeout(function () {
          a.removeClass("selected"),
            e
              .removeClass("is-visible")
              .addClass("is-hidden")
              .children("i")
              .removeClass("in")
              .addClass("out");
        }, selectionDuration),
        setTimeout(function () {
          r(i, typeLettersDelay);
        }, typeAnimationDelay);
    } else if (e.parents(".cd-headline").hasClass("letters")) {
      var d = e.children("i").length >= i.children("i").length;
      !(function e(i, a, n, d) {
        i.removeClass("in").addClass("out");
        i.is(":last-child")
          ? n &&
            setTimeout(function () {
              l(c(a));
            }, t)
          : setTimeout(function () {
              e(i.next(), a, n, d);
            }, d);
        if (i.is(":last-child") && s("html").hasClass("no-csstransitions")) {
          var r = c(a);
          h(a, r);
        }
      })(e.find("i").eq(0), e, d, lettersDelay),
        o(i.find("i").eq(0), i, d, lettersDelay);
    } else
      e.parents(".cd-headline").hasClass("clip")
        ? e
            .parents(".cd-words-wrapper")
            .animate({ width: "2px" }, n, function () {
              h(e, i), r(i);
            })
        : e.parents(".cd-headline").hasClass("loading-bar")
        ? (e.parents(".cd-words-wrapper").removeClass("is-loading"),
          h(e, i),
          setTimeout(function () {
            l(i);
          }, barAnimationDelay),
          setTimeout(function () {
            e.parents(".cd-words-wrapper").addClass("is-loading");
          }, barWaiting))
        : (h(e, i),
          setTimeout(function () {
            l(i);
          }, t));
  }
  function r(s, e) {
    s.parents(".cd-headline").hasClass("type")
      ? (o(s.find("i").eq(0), s, !1, e),
        s.addClass("is-visible").removeClass("is-hidden"))
      : s.parents(".cd-headline").hasClass("clip") &&
        s
          .parents(".cd-words-wrapper")
          .animate({ width: s.width() + 10 }, n, function () {
            setTimeout(function () {
              l(s);
            }, d);
          });
  }
  function o(s, e, i, a) {
    s.addClass("in").removeClass("out"),
      s.is(":last-child")
        ? (e.parents(".cd-headline").hasClass("type") &&
            setTimeout(function () {
              e.parents(".cd-words-wrapper").addClass("waiting");
            }, 200),
          i ||
            setTimeout(function () {
              l(e);
            }, t))
        : setTimeout(function () {
            o(s.next(), e, i, a);
          }, a);
  }
  function c(s) {
    return s.is(":last-child") ? s.parent().children().eq(0) : s.next();
  }
  function h(s, e) {
    s.removeClass("is-visible").addClass("is-hidden"),
      e.removeClass("is-hidden").addClass("is-visible");
  }
  s(".cd-headline.letters")
    .find("b")
    .each(function () {
      var e = s(this),
        a = e.text().split(""),
        t = e.hasClass("is-visible");
      for (i in a)
        e.parents(".rotate-2").length > 0 && (a[i] = "<em>" + a[i] + "</em>"),
          (a[i] = t ? '<i class="in">' + a[i] + "</i>" : "<i>" + a[i] + "</i>");
      var n = a.join("");
      e.html(n).css("opacity", 1);
    }),
    (e = s(".cd-headline")),
    (a = t),
    e.each(function () {
      var e = s(this);
      if (e.hasClass("loading-bar"))
        (a = barAnimationDelay),
          setTimeout(function () {
            e.find(".cd-words-wrapper").addClass("is-loading");
          }, barWaiting);
      else if (e.hasClass("clip")) {
        var i = e.find(".cd-words-wrapper"),
          t = i.width() + 10;
        i.css("width", t);
      } else if (!e.hasClass("type")) {
        var n = e.find(".cd-words-wrapper b"),
          d = 0;
        n.each(function () {
          var e = s(this).width();
          e > d && (d = e);
        }),
          e.find(".cd-words-wrapper").css("width", d);
      }
      setTimeout(function () {
        l(e.find(".is-visible").eq(0));
      }, a);
    });
});
