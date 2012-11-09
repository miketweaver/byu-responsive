/*
 AnythingSlider v1.5.17 minified using Google Closure Compiler
 By Chris Coyier: http://css-tricks.com
 with major improvements by Doug Neiner: http://pixelgraphics.us/
 based on work by Remy Sharp: http://jqueryfordesigners.com/
*/

(function(c){c.anythingSlider=function(h,i){var a=this;a.$el=c(h).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');a.$el.data("AnythingSlider",a);a.init=function(){a.options=c.extend({},c.anythingSlider.defaults,i);a.initialized=!1;c.isFunction(a.options.onBeforeInitialize)&&a.$el.bind("before_initialize",a.options.onBeforeInitialize);a.$el.trigger("before_initialize",a);a.$wrapper=a.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-"+ a.options.theme);a.$window=a.$el.closest("div.anythingWindow");a.$controls=c('<div class="anythingControls"></div>').appendTo(a.options.appendControlsTo!==null&&c(a.options.appendControlsTo).length?c(a.options.appendControlsTo):a.$wrapper);a.win=window;a.$win=c(a.win);a.$nav=c('<ul class="thumbNav" />').appendTo(a.$controls);a.flag=!1;a.playing=!1;a.slideshow=!1;a.hovered=!1;a.panelSize=[];a.currentPage=a.options.startPanel=parseInt(a.options.startPanel,10)||1;a.adjustLimit=a.options.infiniteSlides? 0:1;a.outerPad=[a.$wrapper.innerWidth()-a.$wrapper.width(),a.$wrapper.innerHeight()-a.$wrapper.height()];a.options.playRtl&&a.$wrapper.addClass("rtl");a.original=[a.options.autoPlay,a.options.buildNavigation,a.options.buildArrows];if(a.options.expand)a.$outer=a.$wrapper.parent(),a.$window.css({width:"100%",height:"100%"}),a.outerDim=[a.$outer.width(),a.$outer.height()],a.checkResize();a.updateSlider();a.$lastPage=a.$currentPage;a.runTimes=c("div.anythingSlider").index(a.$wrapper)+1;a.regex=RegExp("panel"+ a.runTimes+"-(\\d+)","i");if(!c.isFunction(c.easing[a.options.easing]))a.options.easing="swing";a.options.theme!=="default"&&!c("link[href*="+a.options.theme+"]").length&&c("head").append('<link rel="stylesheet" href="'+a.options.themeDirectory.replace(/\{themeName\}/g,a.options.theme)+'" type="text/css" />');a.options.pauseOnHover&&a.$wrapper.hover(function(){a.playing&&(a.$el.trigger("slideshow_paused",a),a.clearTimer(!0))},function(){a.playing&&(a.$el.trigger("slideshow_unpaused",a),a.startStop(a.playing, !0))});var b,d=a.options.hashTags?a.gotoHash()||a.options.startPanel:a.options.startPanel;a.setCurrentPage(d,!1);a.slideControls(!1);a.$wrapper.bind("mouseenter mouseleave",function(b){a.hovered=b.type==="mouseenter"?!0:!1;a.slideControls(a.hovered,!1)});a.options.enableKeyboard&&c(document).keyup(function(b){if(a.$wrapper.is(".activeSlider")&&!b.target.tagName.match("TEXTAREA|INPUT|SELECT"))switch(b.which){case 39:a.goForward();break;case 37:a.goBack()}});b="slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" "); c.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "),function(d,f){c.isFunction(a.options[f])&&a.$el.bind(b[d],a.options[f])});c.isFunction(a.options.onSlideComplete)&&a.$el.bind("slide_complete",function(){setTimeout(function(){a.options.onSlideComplete(a)},0)});a.initialized=!0;a.$el.trigger("initialized",a)};a.updateSlider=function(){a.$el.find("li.cloned").remove();a.$nav.empty();a.$items=a.$el.find("> li");a.pages=a.$items.length; a.options.showMultiple=parseInt(a.options.showMultiple,10)||1;if(a.options.showMultiple>1){if(a.options.showMultiple>a.pages)a.options.showMultiple=a.pages;a.adjustMultiple=a.options.infiniteSlides?0:parseInt(a.options.showMultiple,10)-1;a.pages=a.$items.length-a.adjustMultiple}if(a.pages<=1)a.options.autoPlay=!1,a.options.buildNavigation=!1,a.options.buildArrows=!1,a.$controls.hide(),a.$nav.hide(),a.$forward&&a.$forward.add(a.$back).hide();else{a.options.autoPlay=a.original[0];a.options.buildNavigation= a.original[1];a.options.buildArrows=a.original[2];a.$controls.show();a.$nav.show();a.$forward&&a.$forward.add(a.$back).show();a.buildNavigation();if(a.options.autoPlay)a.playing=!a.options.startStopped,a.buildAutoPlay();a.options.buildArrows&&a.buildNextBackButtons()}a.options.infiniteSlides&&a.pages>1&&(a.$el.prepend(a.$items.filter(":last").clone().addClass("cloned").removeAttr("id")),a.options.showMultiple>1?a.$el.append(a.$items.filter(":lt("+a.options.showMultiple+")").clone().addClass("cloned").addClass("multiple").removeAttr("id")): a.$el.append(a.$items.filter(":first").clone().addClass("cloned").removeAttr("id")),a.$el.find("li.cloned").each(function(){c(this).find("a,input,textarea,select").attr("disabled","disabled");c(this).find("[id]").removeAttr("id")}));a.$items=a.$el.find("> li").addClass("panel");a.setDimensions();a.options.resizeContents||a.$win.load(function(){a.setDimensions()});a.options.resizeContents&&(a.options.width&&(a.$items.css("width",a.options.width),a.$wrapper.css("width",a.getDim(a.currentPage)[0])), a.options.height&&a.$wrapper.add(a.$items).css("height",a.options.height));if(a.currentPage>a.pages)a.currentPage=a.pages,a.setCurrentPage(a.pages,!1);a.$nav.find("a").eq(a.currentPage-1).addClass("cur");a.hasEmb=a.$items.find("embed[src*=youtube]").length;a.hasSwfo=typeof swfobject!=="undefined"&&swfobject.hasOwnProperty("embedSWF")&&c.isFunction(swfobject.embedSWF)?!0:!1;a.hasEmb&&a.hasSwfo&&a.$items.find("embed[src*=youtube]").each(function(b){var d=c(this).parent()[0].tagName==="OBJECT"?c(this).parent(): c(this);d.wrap('<div id="ytvideo'+b+'"></div>');swfobject.embedSWF(c(this).attr("src")+"&enablejsapi=1&version=3&playerapiid=ytvideo"+b,"ytvideo"+b,d.attr("width"),d.attr("height"),"10",null,null,{allowScriptAccess:"always",wmode:a.options.addWmodeToObject,allowfullscreen:!0},{"class":d.attr("class"),style:d.attr("style")},function(){b>=a.hasEmb-1&&a.$el.trigger("swf_completed",a)})});a.$items.find("a").unbind("focus").bind("focus",function(b){a.$items.find(".focusedLink").removeClass("focusedLink"); c(this).addClass("focusedLink");var d=c(this).closest(".panel");d.is(".activePage")||(a.gotoPage(a.$items.index(d)),b.preventDefault())})};a.buildNavigation=function(){var b,d,e;a.options.buildNavigation&&a.pages>1&&a.$items.filter(":not(.cloned)").each(function(f){var g=f+1;d=(g===1?"first":"")+(g===a.pages?"last":"");e=c('<a href="#"></a>').addClass("panel"+g).wrap('<li class="'+d+'" />');a.$nav.append(e.parent());c.isFunction(a.options.navigationFormatter)?(b=a.options.navigationFormatter(g,c(this)), e.html("<span>"+b+"</span>"),parseInt(e.find("span").css("text-indent"),10)<0&&e.addClass(a.options.tooltipClass).attr("title",b)):e.html("<span>"+g+"</span>");e.bind(a.options.clickControls,function(b){if(!a.flag&&a.options.enableNavigation)a.flag=!0,setTimeout(function(){a.flag=!1},100),a.gotoPage(g),a.options.hashTags&&a.setHash(g);b.preventDefault()})})};a.buildNextBackButtons=function(){if(!a.$forward)a.$forward=c('<span class="arrow forward"><a href="#"><span>'+a.options.forwardText+"</span></a></span>"), a.$back=c('<span class="arrow back"><a href="#"><span>'+a.options.backText+"</span></a></span>"),a.$back.bind(a.options.clickArrows,function(b){a.goBack();b.preventDefault()}),a.$forward.bind(a.options.clickArrows,function(b){a.goForward();b.preventDefault()}),a.$back.add(a.$forward).find("a").bind("focusin focusout",function(){c(this).toggleClass("hover")}),a.$wrapper.prepend(a.$forward).prepend(a.$back),a.$arrowWidth=a.$forward.width()};a.buildAutoPlay=function(){if(!(a.$startStop||a.pages<2))a.$startStop= c("<a href='#' class='start-stop'></a>").html("<span>"+(a.playing?a.options.stopText:a.options.startText)+"</span>"),a.$controls.prepend(a.$startStop),a.$startStop.bind(a.options.clickSlideshow,function(b){a.options.enablePlay&&(a.startStop(!a.playing),a.playing&&(a.options.playRtl?a.goBack(!0):a.goForward(!0)));b.preventDefault()}).bind("focusin focusout",function(){c(this).toggleClass("hover")}),a.startStop(a.playing)};a.checkResize=function(b){clearTimeout(a.resizeTimer);a.resizeTimer=setTimeout(function(){var d= a.$outer.width(),c=a.$outer[0].tagName==="BODY"?a.$win.height():a.$outer.height(),f=a.outerDim;if(f[0]!==d||f[1]!==c)a.outerDim=[d,c],a.setDimensions(),a.gotoPage(a.currentPage,a.playing,null,1);typeof b==="undefined"&&a.checkResize()},500)};a.setDimensions=function(){var b,d,e,f,g,h=0,j=a.options.showMultiple>1?a.options.width||a.$window.width()/a.options.showMultiple:a.$window.width(),i=a.$win.width();a.options.expand&&(b=a.$outer.width()-a.outerPad[0],d=a.$outer.height()-a.outerPad[1],a.$wrapper.add(a.$window).add(a.$items).css({width:b, height:d}),j=a.options.showMultiple>1?b/a.options.showMultiple:b);a.$items.each(function(k){e=c(this).children("*");a.options.resizeContents?(b=parseInt(a.options.width,10)||j,d=parseInt(a.options.height,10)||a.$window.height(),c(this).css({width:b,height:d}),!a.initialized&&e.length===1&&(e.css({width:"100%",height:"100%"}),e[0].tagName==="OBJECT"&&e.find("embed").andSelf().attr({width:"100%",height:"100%"}))):(b=c(this).width(),g=b>=i?!0:!1,e.length===1&&g&&(f=e.width()>=i?j:e.width(),c(this).css("width", f),e.css("max-width",f),b=f),b=g?a.options.width||j:b,c(this).css("width",b),d=c(this).outerHeight(),c(this).css("height",d));a.panelSize[k]=[b,d,h];h+=b});a.$el.css("width",h<a.options.maxOverallWidth?h:a.options.maxOverallWidth)};a.getDim=function(b){var b=a.options.infiniteSlides?b:b-1,d,c=a.panelSize[b][0],f=a.panelSize[b][1];if(a.options.showMultiple>1)for(d=1;d<a.options.showMultiple;d++)c+=a.panelSize[(b+d)%a.options.showMultiple][0],f=Math.max(f,a.panelSize[b+d][1]);return[c,f]};a.gotoPage= function(b,d,c,f){if(!(a.pages<=1)){a.$lastPage=a.$currentPage;if(typeof b!=="number")b=a.options.startPanel,a.setCurrentPage(b);if(!a.hasEmb||!a.checkVideo(a.playing))b>a.pages+1-a.adjustLimit&&(b=!a.options.infiniteSlides&&!a.options.stopAtEnd?1:a.pages),b<a.adjustLimit&&(b=!a.options.infiniteSlides&&!a.options.stopAtEnd?a.pages:1),a.currentPage=b>a.pages?a.pages:b<1?1:a.currentPage,a.$currentPage=a.$items.eq(a.currentPage-1),a.exactPage=b,a.$el.trigger("slide_init",a),a.slideControls(!0,!1),d!== !0&&(d=!1),(!d||a.options.stopAtEnd&&b===a.pages)&&a.startStop(!1),a.$el.trigger("slide_begin",a),a.options.resizeContents||(d=a.getDim(b),a.$wrapper.filter(":not(:animated)").animate({width:d[0],height:d[1]},{queue:!1,duration:f||a.options.animationTime,easing:a.options.easing})),a.$el.filter(":not(:animated)").animate({left:-a.panelSize[a.options.infiniteSlides?b:b-1][2]},{queue:!1,duration:f||a.options.animationTime,easing:a.options.easing,complete:function(){a.endAnimation(b,c)}})}};a.endAnimation= function(b,d){b===0?(a.$el.css("left",-a.panelSize[a.pages][2]),b=a.pages):b>a.pages&&(a.$el.css("left",-a.panelSize[1][2]),b=1);a.exactPage=b;a.setCurrentPage(b,!1);a.$items.removeClass("activePage").eq(b-a.adjustLimit).addClass("activePage");a.hovered||a.slideControls(!1);if(a.hasEmb){var e=a.$currentPage.find("object[id*=ytvideo], embed[id*=ytvideo]");e.length&&c.isFunction(e[0].getPlayerState)&&e[0].getPlayerState()>0&&e[0].getPlayerState()!==5&&e[0].playVideo()}a.$el.trigger("slide_complete", a);typeof d==="function"&&d(a);a.options.autoPlayLocked&&!a.playing&&setTimeout(function(){a.startStop(!0)},a.options.resumeDelay-a.options.delay)};a.setCurrentPage=function(b,d){if(!(a.pages<=1)){b=parseInt(b,10);b>a.pages+1-a.adjustLimit&&(b=a.pages-a.adjustLimit);b<a.adjustLimit&&(b=1);a.options.buildNavigation&&(a.$nav.find(".cur").removeClass("cur"),a.$nav.find("a").eq(b-1).addClass("cur"));!a.options.infiniteSlides&&a.options.stopAtEnd&&(a.$wrapper.find("span.forward")[b===a.pages?"addClass": "removeClass"]("disabled"),a.$wrapper.find("span.back")[b===1?"addClass":"removeClass"]("disabled"),b===a.pages&&a.playing&&a.startStop());if(!d){var e=a.getDim(b);a.$wrapper.css({width:e[0],height:e[1]});a.$wrapper.scrollLeft(0);a.$el.css("left",-a.panelSize[a.options.infiniteSlides?b:b-1][2])}a.currentPage=b;a.$currentPage=a.$items.eq(b).addClass("activePage");a.$wrapper.is(".activeSlider")||(c(".activeSlider").removeClass("activeSlider"),a.$wrapper.addClass("activeSlider"))}};a.goForward=function(b){b!== !0&&(b=!1,a.startStop(!1));a.gotoPage(a.currentPage+1,b)};a.goBack=function(b){b!==!0&&(b=!1,a.startStop(!1));a.gotoPage(a.currentPage-1,b)};a.gotoHash=function(){var b=a.win.location.hash.match(a.regex);return b===null?"":parseInt(b[1],10)};a.setHash=function(b){var d="panel"+a.runTimes+"-",c=a.win.location.hash;if(typeof c!=="undefined")a.win.location.hash=c.indexOf(d)>0?c.replace(a.regex,d+b):c+"&"+d+b};a.slideControls=function(b){var c=b?0:a.options.animationTime,e=b?a.options.animationTime:0, f=b?1:0,g=b?0:1;a.options.toggleControls&&a.$controls.stop(!0,!0).delay(c)[b?"slideDown":"slideUp"](a.options.animationTime/2).delay(e);a.options.buildArrows&&a.options.toggleArrows&&(!a.hovered&&a.playing&&(g=1,f=0),a.$forward.stop(!0,!0).delay(c).animate({right:g*a.$arrowWidth,opacity:f},a.options.animationTime/2),a.$back.stop(!0,!0).delay(c).animate({left:g*a.$arrowWidth,opacity:f},a.options.animationTime/2))};a.clearTimer=function(b){if(a.timer&&(a.win.clearInterval(a.timer),!b&&a.slideshow))a.$el.trigger("slideshow_stop", a),a.slideshow=!1};a.startStop=function(b,c){b!==!0&&(b=!1);if(b&&!c)a.$el.trigger("slideshow_start",a),a.slideshow=!0;a.playing=b;a.options.autoPlay&&(a.$startStop.toggleClass("playing",b).html("<span>"+(b?a.options.stopText:a.options.startText)+"</span>"),parseInt(a.$startStop.find("span").css("text-indent"),10)<0&&a.$startStop.addClass(a.options.tooltipClass).attr("title",b?"Stop":"Start"));b?(a.clearTimer(!0),a.timer=a.win.setInterval(function(){if(!a.hasEmb||!a.checkVideo(b))a.options.playRtl? a.goBack(!0):a.goForward(!0)},a.options.delay)):a.clearTimer()};a.checkVideo=function(b){var d,e,f=!1;a.$items.find("object[id*=ytvideo], embed[id*=ytvideo]").each(function(){d=c(this);d.length&&c.isFunction(d[0].getPlayerState)&&(e=d[0].getPlayerState(),b&&(e===1||e>2)&&a.$items.index(d.closest("li.panel"))===a.currentPage&&a.options.resumeOnVideoEnd?f=!0:e>0&&d[0].pauseVideo())});return f};a.init()};c.anythingSlider.defaults={width:null,height:null,expand:!1,resizeContents:!0,showMultiple:!1,tooltipClass:"tooltip", theme:"default",themeDirectory:"css/theme-{themeName}.css",startPanel:1,hashTags:!0,infiniteSlides:!0,enableKeyboard:!0,buildArrows:!0,toggleArrows:!1,buildNavigation:!0,enableNavigation:!0,toggleControls:!1,appendControlsTo:null,navigationFormatter:null,forwardText:"&raquo;",backText:"&laquo;",enablePlay:!0,autoPlay:!0,autoPlayLocked:!1,startStopped:!1,pauseOnHover:!0,resumeOnVideoEnd:!0,stopAtEnd:!1,playRtl:!1,startText:"Start",stopText:"Stop",delay:3E3,resumeDelay:15E3,animationTime:600,easing:"swing", clickArrows:"click",clickControls:"click focusin",clickSlideshow:"click",addWmodeToObject:"opaque",maxOverallWidth:32766};c.fn.anythingSlider=function(h,i){return this.each(function(){var a,b=c(this).data("AnythingSlider");(typeof h).match("object|undefined")?b?b.updateSlider():new c.anythingSlider(this,h):/\d/.test(h)&&!isNaN(h)&&b&&(a=typeof h==="number"?h:parseInt(c.trim(h),10),a>=1&&a<=b.pages&&b.gotoPage(a,!1,i))})}})(jQuery);;
