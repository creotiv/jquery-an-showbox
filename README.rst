=============================================================
      jQuery ShowBox plugin
=============================================================

How to use
==========

Add three lines to the HEAD:

::

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script> 
    <script type="text/javascript" src="jquery-an-showbox.js"></script> 
    <link rel="stylesheet" type="text/css" href="jquery-an-showbox.css">

Add photos to page

::

    <div id="photos1"> 
    <ul>
    <li><a href="https://lh3.googleusercontent.com/-NBDCrqZdhSI/Tvt2WbpWeJI/AAAAAAAAB08/gP9cpwWm1E0/s720/IMG_6157.jpg"><img src="https://lh3.googleusercontent.com/-NBDCrqZdhSI/Tvt2WbpWeJI/AAAAAAAAB08/gP9cpwWm1E0/s720/IMG_6157.jpg/../../w432-h288/" width="182" height="121" style="opacity: 1; width: 182px; height: 121px; "></a></li>
    <li><a href="https://lh4.googleusercontent.com/-61NM8HIQT4A/Tvt2RgViAJI/AAAAAAAAB1M/jOtAbdd2T6Q/s720/IMG_6128.jpg"><img src="https://lh4.googleusercontent.com/-61NM8HIQT4A/Tvt2RgViAJI/AAAAAAAAB1M/jOtAbdd2T6Q/s720/IMG_6128.jpg/../../w432-h288/" width="182" height="121" style="opacity: 1; width: 182px; height: 121px; "></a></li>
    <li><a href="https://lh6.googleusercontent.com/-O2Pb-J8tq2w/Tvt1Y8-jT-I/AAAAAAAAB1I/zPYcgGlrUIs/s720/IMG_6125.jpg"><img src="https://lh6.googleusercontent.com/-O2Pb-J8tq2w/Tvt1Y8-jT-I/AAAAAAAAB1I/zPYcgGlrUIs/s288/IMG_6125.jpg" width="182" height="121"></a></li>
    <li><a href="https://lh5.googleusercontent.com/-MR4xudx40yk/Tvt1UAEFQbI/AAAAAAAAB1A/X5h6o2_CiAY/s720/IMG_6110.jpg"><img src="https://lh5.googleusercontent.com/-MR4xudx40yk/Tvt1UAEFQbI/AAAAAAAAB1A/X5h6o2_CiAY/s288/IMG_6110.jpg" width="182" height="121"></a></li>
    <li><a href="https://lh5.googleusercontent.com/-LBIMv-zNqdU/Tvt1cXh8amI/AAAAAAAAB1E/ocac_BLPcKU/s720/IMG_6107.jpg"><img src="https://lh5.googleusercontent.com/-LBIMv-zNqdU/Tvt1cXh8amI/AAAAAAAAB1E/ocac_BLPcKU/s288/IMG_6107.jpg" width="182" height="121"></a></li>
    <ul>
    </div>
    <div style="clear:both;"></div>
    <div id="photos2"> 
    <ul>
    <li><a href="https://lh4.googleusercontent.com/-1SFDuLaenw4/TuinWZnSR-I/AAAAAAAABc4/b67jbLJNx0A/s720/IMG_4870.jpg"><img src="https://lh4.googleusercontent.com/-1SFDuLaenw4/TuinWZnSR-I/AAAAAAAABc4/b67jbLJNx0A/s288/IMG_4870.jpg" width="97" height="141" ></a></li>
    <li><a href="https://lh6.googleusercontent.com/--PEvf5wTAIg/TuinV1bCM8I/AAAAAAAABcs/0GP83ODW8Kg/s720/IMG_4868.jpg"><img src="https://lh6.googleusercontent.com/--PEvf5wTAIg/TuinV1bCM8I/AAAAAAAABcs/0GP83ODW8Kg/s288/IMG_4868.jpg" width="194" height="141" ></a></li>
    <li><a href="https://lh5.googleusercontent.com/-6kMdORyLlvo/TuinVWe_iFI/AAAAAAAABck/-YURmzWUS1w/s720/IMG_4866.jpg"><img src="https://lh5.googleusercontent.com/-6kMdORyLlvo/TuinVWe_iFI/AAAAAAAABck/-YURmzWUS1w/s720/IMG_4866.jpg/../../w432-h293/" width="208" height="141" style="opacity: 1; width: 208px; height: 141px; "></a></li>
    <li><a href="https://lh3.googleusercontent.com/-Q_f7P5n9K1U/TuinVT65gUI/AAAAAAAABc8/8dHiKFlf8Yk/s720/IMG_4865.jpg"><img src="https://lh3.googleusercontent.com/-Q_f7P5n9K1U/TuinVT65gUI/AAAAAAAABc8/8dHiKFlf8Yk/s288/IMG_4865.jpg" width="210" height="141" ></a></li>
    <li><a href="https://lh5.googleusercontent.com/-h8XO6lO8G7I/TuinVSQjmWI/AAAAAAAABco/Wkpq_uoMnoY/s720/IMG_4860.jpg"><img src="https://lh5.googleusercontent.com/-h8XO6lO8G7I/TuinVSQjmWI/AAAAAAAABco/Wkpq_uoMnoY/s288/IMG_4860.jpg" width="201" height="141" ></a></li>
    </ul>
    </div> 

Initialize plugin on page load and load data:

::

    <script type="text/javascript">
    $(document).ready(function(){
		
	    var menuBar = '<div style="padding-top: 5px;width: 250px;position: relative;left: 50%;margin-left: -125px;"><div style="float:left;margin-top: 5px;width:80px;"><div id="gplus" class="g-plusone" data-size="medium"></div></div><div style="float:left;margin-top:5px;width:90px;"><a href="https://twitter.com/share" class="twitter-share-button">Tweet</a></div><div style="float:left;margin-top:5px;width:80px;" id="fblike"><fb:like send="false" layout="button_count" width="100" show_faces="false"></fb:like></div></div>';
	
	    var update  = function(){
		    if(typeof(FB) !== 'undefined')
			     FB.XFBML.parse(document.getElementById('fblike'));
		    if(typeof(gapi) !== 'undefined') {
			    gapi.plusone.render(document.getElementById('gplus'),{
				    'href':location.href,
				    'annotation':'bubble',
				    'width': 90,
				    'align': 'left',
				    'size': 'medium'
			    });
		    }
		    if(typeof(twttr) !== 'undefined') {
			    $('#showbox .twitter-share-button').attr('data-url',location.href);
			    twttr.widgets.load();
		    }		            
	    };
	
	    var init_socials = function(doc) {
	        var s = 'script';
            var d = doc;
            var js, fjs = d.getElementsByTagName(s)[0], load = function(url, id) {
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.src = url; js.id = id;
              fjs.parentNode.insertBefore(js, fjs);
            };
            load('https://connect.facebook.net/en_US/all.js#xfbml=1', 'fbjssdk');
            load('https://apis.google.com/js/plusone.js', 'gplus1js');
            load('https://platform.twitter.com/widgets.js', 'tweetjs');
	    }
	
	    ShowBox.init('#photos1 a',{
		    closeCallback:function(){
			    alert('ShowBox closed1');
		    },
		    menuBarContent: menuBar,
		    onUpdate: update
	    });
	
	    ShowBox.init('#photos2 a',{
		    closeCallback:function(){
			    alert('ShowBox closed2');
		    },
		    menuBarContent: '<div style="padding-top:5px">Hello World</div>',
		    onUpdate: update
	    });
	

        init_socials(document);
	
    });
    </script>
