// load js file dynamically
function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}
loadjscssfile("//f.vimeocdn.com/js/froogaloop2.min.js", "js") //dynamically load and add this .js file

// store all vimeo iframes for later reference
var vimeo_iframes = []
//detect vimeo video regex
var regex = /(.)*player.vimeo.com(.)*$/i;
//get all iframes in page
var iframes=$('iframe');
//look only for vimeo iframes
for (i=0; i<iframes.length; i++) {
    /// FIX SRC ATTRIBUTE IF NEEDED:
    // "https://player.vimeo.com/video/76979866" ----> "https://player.vimeo.com/video/76979866?api=1"
    var iframe = iframes[i];
    var src_attr = iframe.getAttribute('src');
    //check if 'src' is of form '...player.vimeo.com/...'
    if (regex.test(src_attr)) {

        //check if 'api=1' exists in 'src'              /**********************************/
                                                        /*                                */
        var regex2 = /(.)*api=1(.)*$/i;                 /*     Adding events works        */
        if (!regex2.test(src_attr)) {                   /*     also without modifying     */
            //if not, add it                            /*     src to &/?api=1            */
            if (src_attr.indexOf('?') == -1) {          /*                                */
                src_attr = src_attr + '?api=1';         /**********************************/
            } else {
                src_attr = src_attr + '&api=1';
            }
            iframe.setAttribute('src', src_attr);
        }

        //save only vimeo iframes
        vimeo_iframes.push(iframe);
    }
}

$( window ).load(function() {
    //look only for vimeo iframes
    for (i=0; i<vimeo_iframes.length; i++){
        var iframe = vimeo_iframes[i];
            //get player
            var player = $f(iframe);
            player.addEvent('ready', function() {
                // alert('ready');
                player.addEvent('play', function () {
                    alert('play');
                });
                player.addEvent('pause', function () {
                    alert('pause');
                });
                player.addEvent('finish', function () {
                    alert('finish');
                });
            });
        }
});
