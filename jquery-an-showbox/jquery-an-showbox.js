/*
    jQuery ShowBox
    jQuery plugin that used to overlay images on the current page for creating 
    full-screen gallery view.
    http://creotiv.github.com/jquery-an-showbox
    
    Copyright (C) 2012  Andrey Nikishaev(creotiv@gmail.com, http://creotiv.in.ua)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
function $_GET(){
  var s = location.hash;
  a = s.match(/[^&#=]*=[^&#=]*/g);
  r = {};
  if(a) {
	  for (i=0; i<a.length; i++) {
		r[a[i].match(/[^&#=]*/)[0]] = a[i].match(/=([^&#]*)/)[0].replace('=', '');
	  }
  }
  return r;
} 

var ShowBox = {
    version: "0.1.5",

    _opened: false,
    _preview_locked: false,
    _images: [],
    _index: 0,
    _current: '',
    _inited: false,
    _th: null,
    options: [],

    init: function(el,op) {
        var a = {
            closeCallback: function(){},
            menuBarContent:'',
            onUpdate: null
        };
        ShowBox.options.push($.extend(a,op));
        ShowBox._init(el);
        ShowBox._initEvents(el);
        ShowBox._parseGet();
    },
    _init: function(el) {
        ShowBox._images.push([]);
        if(ShowBox.options[ShowBox.options.length-1].menuBarContent) {
            $('body').append(                 
                '<div id="showbox-menubar'+(ShowBox.options.length-1)+'" style="overflow:hidden;width:100%;position:absolute;top:-999999px;">'
                +         ShowBox.options[ShowBox.options.length-1].menuBarContent
                +'</div>'
            );
        }
        if(!ShowBox._inited) {
            $(
                '<div id="showbox" style="display:none;">'
                +'    <div id="showbox-exit"></div>'
                +'    <div class="showbox-menubar unselect" unselectable="on" style="display:none !important;"></div>'
                +'    <div class="showbox-image unselect" unselectable="on">'
                +'    </div>'
                +'    <div id="showbox-loader"></div>'
                +'    <div class="showbox-preview unselect">'
                +'        <div class="showbox-pv-lock"></div>'
                +'        <div class="showbox-th-counter" unselectable="on"></div>'
                +'    </div>'
                +'</div>'
            ).appendTo('body');
        }
        $('body').append(            
            '<div id="showbox-thc'+(ShowBox.options.length-1)+'" style="overflow:hidden;width:100%;position:absolute;top:-999999px;"><div class="showbox-th-container clearfix"></div></div>'
        );
        var i = 0;
        var lc  = ShowBox._images.length-1;
        $(el).each(function(){
            var t   = $(this);
            ShowBox._images[lc].push([t.attr('href'),t.find('img').attr('src')]);
            ShowBox._addThumb(lc,ShowBox._images[lc][i][1],i);
            i++;
        });
    },
    _initEvents: function(el) {
        if(el) {
            var num = ShowBox._images.length-1;
            $(el).live('click',function(e){
                e.preventDefault();
				ShowBox._opened = true;
                var gal = num;
                ShowBox._current = gal;
                var src = $(this);
                for(var i in ShowBox._images[gal]) {
                    if(ShowBox._images[gal][i][0] == src.attr('href')) {
                        ShowBox._index = parseInt(i);
                        ShowBox._th = $('#showbox-thc'+gal+' .showbox-th').eq(i).addClass('showbox-th-active');
                        break;
                    }
                }
                ShowBox._show(gal);
            });
        }
        if(!ShowBox._inited) {
            ShowBox._inited = true;
            $(document).keyup(function(e){
               if(!ShowBox._opened) return;
               ShowBox.KEYPRESSED(e);
            });
            $('#showbox-exit').click(function(){
                if(!ShowBox._opened) return;
                ShowBox.EXIT(this);
            });
            $('#showbox .showbox-preview').mouseenter(function(){    
                if(ShowBox._preview_locked) return;
                ShowBox.OPENPREVIEW(this);
            });
            $('#showbox .showbox-preview').mouseleave(function(){
                if(!ShowBox._opened) return;
                if(ShowBox._preview_locked) return;
                ShowBox.CLOSEPREVIEW(this);
            });
            $('#showbox .showbox-preview').click(function(){
                if(!ShowBox._opened) return;
                ShowBox.LOCKPREVIEW(this);
            });
            $(window).resize(function(){
                ShowBox.RESIZE(this);
            });
        }
    },
    _parseGet: function() {
        var get = $_GET();
        if(get['p'] && get['gal']) {
			ShowBox._opened = true;
            var gal = parseInt(get['gal'])-1;
            var p   = parseInt(get['p'])-1;
            if((ShowBox.options.length-1) != gal)
                return;
            ShowBox._index = p;
            ShowBox._current = gal;
            ShowBox._th = $('#showbox-thc'+gal+' .showbox-th').eq(p).addClass('showbox-th-active');
            ShowBox._show(gal);
        }
    },
    _next: function() {
        var total = ShowBox._images[ShowBox._current].length;
        ShowBox._index += 1;
        if(ShowBox._index >= total)
            ShowBox._index = 0;
        ShowBox._changeImage(ShowBox._index);
    },
    _prev: function() {
        var total = ShowBox._images[ShowBox._current].length;
        ShowBox._index -= 1;
        if(ShowBox._index < 0)
            ShowBox._index = total-1;
        ShowBox._changeImage(ShowBox._index);
    },
    _show: function(gal) {
        var thc = $('#showbox-thc'+gal).detach();
        var mb = $('#showbox-menubar'+gal).detach();
        thc.appendTo('#showbox .showbox-preview');
        mb.prependTo('#showbox .showbox-menubar');
        thc.css({position:'relative',top:'0px'});
        mb.css({position:'relative',top:'0px'});
        
        $('#showbox-loader').show();
        $('body').css('overflow','hidden');
        $('#showbox').fadeIn(200,function() {
            ShowBox._changeImage(ShowBox._index);
        });
    },
    _addThumb: function(gal,im,i) {
    	$('<div class="showbox-th"><img src="'+im+'" /></div>')
        .appendTo('#showbox-thc'+gal+' .showbox-th-container').find('img').load(function(){
            var w = $(this).width();
            var h = $(this).height();
            var l = 0;
            var t = 0;
            var fact = 1;
            if(w >= h) {
                fact = 60/h;
            } else {
                fact = 60/w;
            }
            w = Math.round(w * fact);
            h = Math.round(h * fact);
            l  = Math.round((w - 60)/2); 
            $(this).attr({
                width: w,
                height: h
            }).css({
                left: -l,
                top: -t
            });
        }).parent().click(function(e){
            e.stopPropagation();
            var ind = i;
            ShowBox._changeImage(ind);
        });
    },
    _onChangePhoto: function() {
        if(typeof(ShowBox.options[ShowBox._current].onUpdate) == 'function') {
            ShowBox.options[ShowBox._current].onUpdate();
        }
    },
    _changeImage: function(ind) {
        $('#showbox-loader').show();
        $('#showbox .showbox-menubar').hide();
        $('#showbox .showbox-menubar').html('');	
        ind = parseInt(ind);
        var total = ShowBox._images[ShowBox._current].length;
        ShowBox._setCounter(ind+1,total);
        window.location.hash = 'p='+(ind+1)+'&gal='+(ShowBox._current+1);
        $('#showbox .showbox-menubar').append('<div id="showbox-menubar'+ShowBox._current+'" style="position:relative;">'+ShowBox.options[ShowBox._current].menuBarContent+'</div>');
        ShowBox._onChangePhoto();
        ShowBox._index = ind;
        $('#showbox .showbox-img').remove();
        ShowBox._th.removeClass('showbox-th-active');
        ShowBox._th = $('#showbox .showbox-th').eq(ind).addClass('showbox-th-active');
        
        var img = $('<img class="showbox-img" style="display:none;"/>')            
        .prependTo('#showbox .showbox-image').click(ShowBox._next);    
                      
        img.attr('src',ShowBox._images[ShowBox._current][ind][0])
        .load(function(){
            var iW = $(this).prop('width');
            var iH = $(this).prop('height');
            $(this).attr({
                width:iW,
                height:iH
            }).fadeIn(400);
            $('#showbox-loader').hide();   
            $('#showbox .showbox-menubar').show();
            ShowBox.RESIZE();
        });
    },
    _setCounter: function(num,total) {
        $('#showbox .showbox-th-counter').html(num+' of '+total);
    },
    _clearHash: function() {
        window.location.hash = '_';
    },
	opened: function() {
		return ShowBox._opened;
	},
    EXIT: function(el){
        ShowBox._clearHash();
        ShowBox._opened = false;
        $('body').css('overflow','auto');
        $('#showbox').hide();
        ShowBox.options[ShowBox._current].closeCallback();
        $('#showbox .showbox-menubar').hide();
        $('#showbox .showbox-image img').remove();
		$('#showbox-thc'+ShowBox._current).css({position:'absolute',top:'-10000px'}).detach().appendTo('body');
		$('#showbox-menubar'+ShowBox._current).css({position:'absolute',top:'-10000px'}).detach().appendTo('body');
    },
    KEYPRESSED: function(e) {
        if(e.keyCode==27) {
            ShowBox.EXIT();
        }
        if(e.keyCode==39) {
            ShowBox._next();
        }
        if(e.keyCode==37) {
            ShowBox._prev();
        }
    },
    OPENPREVIEW: function(el){
        $(el).animate({bottom:0},{queue: false,duration:150});
    },
    CLOSEPREVIEW: function(el){
        $(el).animate({bottom:-75},{queue: false,duration:150});
    },
    LOCKPREVIEW: function(el){
        ShowBox._preview_locked = ShowBox._preview_locked?false:true;
        if(ShowBox._preview_locked) {
            $('#showbox .showbox-pv-lock').show();
            $(el).css({
                'background': '#111',
                'border-top': '1px solid #383838'
            });
        } else {
            $('#showbox .showbox-pv-lock').hide();
            $(el).css({
                'background': '',
                'border-top': ''
            });
        }
    },
    RESIZE: function(el){
        if(!ShowBox._opened) return;
        var showbox = $('#showbox');
        var img = $('#showbox .showbox-image img');
        var cW  = showbox.width();
        var cH  = showbox.height()-146;
        if(!ShowBox.options[ShowBox._current].menuBarContent)
            cH  = showbox.height()-111;
        var iH  = parseInt(img.attr('height'));
        var iW  = parseInt(img.attr('width'))
        var factor = 1;
        if(iH > (cH))
            factor = cH/iH;
        if(iW > cW)    
            factor *= cW/iW;
        var imW  = Math.round(factor * iW);
        var imH  = Math.round(factor * iH);
        if(imH > iH || imW > iW) {
            imW = iW;
            imH = iH;
        }
        var imL  = Math.round((cW - imW)/2);
        var imT  = Math.round((cH - imH)/2)+5;
        $('#showbox .showbox-image').css({
            'width': imW+'px',
            'height': imH+'px',
            'margin-left': imL+'px',
            'margin-top': imT+'px'
        }).find(' img').css({
            'width': imW+'px',
            'height': imH+'px'
        });
        var thL = Math.round(cW/2) - (ShowBox._index * 64 + 30);
        $('#showbox .showbox-th-container').animate({
            left:  thL
        },{duration:300,queue:false});	
	}
}
