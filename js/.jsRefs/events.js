$atxcc.events = {// events.js


//---------------------
mouseMove: function (x, y) {    $atxcc._dg.debug ({x: x, y: y})
    
    $atxcc.m.zx = x + 20
    $atxcc.m.zy = y - 10

}, // mouseMove: function ()


//---------------------
keyDown: function (which) {    $atxcc._dg.debug ({which: which})
    
    if (which == 27) {

        $atxcc.events.xmeRemove ()

    } // end if (which == 27)

}, // keyDown: function ()



//---------------------
xmeRemove: function () {    $atxcc._dg.debug ({})
    
    $('.xme')
    .remove ()

}, // xmeRemove: function ()



//---------------------
descrDisplay: function () {    $atxcc._dg.debug ({})
    // Display full description when hovering over one-line abbreviated description
    
    var left = $atxcc.m.zx + 'px';
    var top = $atxcc.m.zy + 'px';

    var tpos = 'position: absolute;'
    var tleft = 'left: ' + $atxcc.m.zx + 'px;'
    var ttop = 'top: ' + $atxcc.m.zy + 'px;'
    var twidth = 'width: 400px;'
    var tborder = 'border: 1px solid black;'
    var tbackground = 'background-color: #fafafa;'

    var tacss = 'style="' + tpos + tleft + ttop + twidth + tborder + tbackground + '"'
    //var tacss = 'style="' + tpos + tleft + ttop + twidth + theight + topacity + tov + twrap + '"'
    var content = $(this).text()
    var scontent = ""

    var acontent = content.split (/\s+/)

    for (var i = 0; i < acontent.length; i++) {

        var swordI = 'sword' + i
        var sword = '<span id="' + swordI + '" class="sword">' + acontent [i] + '</span>'

        scontent += sword + ' '

    } // end for (var i = 0; i < acontent.length; i++)
    
    //var ta = '<div id="descr" class="xme"; ' + tacss + '>' + $(this).text() + '</div>'
    var ta = '<div id="descr" class="xme"; ' + tacss + '>' + scontent + '</div>'

    $('#agendaitems')
    .append (ta)

    $atxcc.events.descrWordHoverClick (acontent.length)
    
    $('#descr')
    .mouseleave ($atxcc.events.xmeRemove)

}, // descrDisplay: function ()


//---------------------
descrWordHoverClick: function (numWords) {    $atxcc._dg.debug ({numWords: numWords})
    
    for (var i = 0; i < numWords; i++) {

        var swordI = '#sword' + i

        $(swordI)
        .hover (
            function () {

                $(this)
                .css({
                    'font-weight': 'bold',
                    color: '#ff0000',
                })

            },
            function () {

                $(this)
                .css({
                    'font-weight': 'normal',
                    color: '#000000',
                })
            }
        )  // end .hover
        .click  (
            function () {
                $atxcc.events.wordSearchRegister ($(this).text ())
            }
        )  // end .click 

    } // end for (var i = 0; i < acontent.length; i++)

}, // descrWordHoverClick: function ()


//---------------------
wordSearchRegister: function (keyword) {    $atxcc._dg.debug ({keyword: keyword})

//console.log ('wordSearchRegister: keyword: ' + keyword)
//var len = keyword.length
//console.log ('len: ' + len)

    var matched
    if (matched = keyword.match(/([-$,\w]+)/)) {

        keyword = matched [1]
        if (matched = keyword.match (/(.*),\s*$/)) {

            keyword = matched [1]

        } // end if (matched = keyword.match (/(.*),\s$/))

        //console.log ('keyword: ' + keyword)

        $atxcc.events.keywordSearch (keyword)
        $atxcc.events.keywordRegister (keyword)

    } else {

        console.log ('keyword: ' + keyword + ' does not match re:  [-$,\w]+ ')

    } // end if (matched = keyword.match(/(\w+)/))

}, // wordSearchRegister: function ()



//---------------------
keywordSearch: function (keyword) {    $atxcc._dg.debug ({keyword: keyword})
    
    //keyword = keyword.toLowerCase ()

        // fetch all topics that contain the keyword
    $.post ('wp-content/themes/atxcc/search.php', {keyword: keyword}, 
        function (data) {

                // Leave agenda head section, but remove all content rows
            $('.ztopicsrow')
            .remove ()

            var re = new RegExp ('(' + keyword + ')', 'gi')
            var spanKey = '<span class="skeyword">$1</span>'

            data = data.replace (re, spanKey)

                // display all topics containing keyword
            $('#ztopicsheader')
            .after (data)

            $('.zcontent')
            .css({
                'white-space': 'normal',
            })

                // color all keywords red
            $('.skeyword')
            .css({
                color: '#ff0000',
            })

        }
    )    

}, // keywordSearch: function ()



//---------------------
keywordRegister: function (keyword) {    $atxcc._dg.debug ({keyword: keyword})
    
        // remove previous registration section, if it exists 
        // (happens when doing explicit search after either previous explicit search or tag based search)
    if ($('#zregistersection').length) {

        $('#zregistersection')
        .remove ()

    } // end if ($('#zregistersection').length)

    var username = ''

    if ($('#zuser').length) {

        username = $('#zuser').attr ('name')

    } // end if ($('#zuser').length)
    
    var textinput
    var emailinput

    if (username) {

        textinput = '<label>' + 
                        '<input name="zmobile" type="checkbox"/>' +
                        ' Text Msg' + 
                    '</label>'

        emailinput = '<label>' + 
                        '<input name="zemail" type="checkbox"/>' +
                        ' Email Msg' + 
                    '</label>'

    } else {

        textinput = '<label>' + 
                        'Text Msg' + 
                        '<br>' + 
                        '<input name="zmobile" type="text" placeholder="moble number"/>' +
                    '</label>'

        emailinput = '<label>' + 
                        'Email Msg' + 
                        '<br>' + 
                        '<input name="zemail" type="text" placeholder="email address"/>' +
                    '</label>'


    } // end if (username)
    

    keyword = keyword.toLowerCase ()
    
    var registerForm = 
        '<div id="zregistersection" class="row">' +
            '<div class="col-sm-4">' + 
                '<form id="zregisterform" class="well">' +
                    '<label>' + 
                        'Register <span id="zkeyword" style="color: red">' + keyword + '</span>?' + 
                    '</label>' + 
                    '<br>' + 
                        textinput +
                    '<br>' + 
                        emailinput +
                    '<input type="submit" value="register" class="btn btn-default btn-xs btn-success" style="margin-left: 100px; margin-top: 10px"/>' + 
                '</form>' +
            '</div>' + 
        '</div>'

        $('#agendasection')
        .prepend (registerForm)

        $('#zregisterform')
        .submit (
            function (event) {
                event.preventDefault ()
                $atxcc.events.keywordDoRegister (keyword, username)
                location.reload ()
                //$.post ('wp-content/themes/atxcc/index.php')
            }
        )

}, // keywordRegister: function ()



//---------------------
agendaSearch: function () {    $atxcc._dg.debug ({})
    
    var search = $('#zsearchinput').val ()

    $atxcc.events.wordSearchRegister (search)

}, // agendaSearch: function ()



//---------------------
doNotify: function (agendaItem, content) {    $atxcc._dg.debug ({agendaItem: agendaItem, content: content})
    
    $.post ('wp-content/themes/atxcc/notify.php', {agendaItem: agendaItem, content: content}, function (data) {
    //ut.dumpOb ('data', data)
        /*
        $('#agendasection')
        .prepend (data)
        */
        alert (data);
    })

}, // doNotify: function ()



//---------------------
keywordDoRegister: function (keyword, username) {    $atxcc._dg.debug ({keyword: keyword, username: username})
    
    var formData = $('#zregisterform').serializeArray()
    //ut.dumpOb ('formData', formData)

    var mobile = false
    var email = false

    if (username) {

            // extract checked mobile/email prefs
        for (var i = 0; i < formData.length; i++) {

            var item = formData [i]

            var name = item.name
            var value = item.value

            switch (name) {

                case 'zmobile':

                    if (value == 'on') {

                        mobile = true

                    } // end if (value == 'on')

                    break

                case 'zemail':

                    if (value == 'on') {

                        email = true

                    } // end if (value == 'on')

                    break

            } // end switch (name)
            

        } // end for (var i = 0; i < formData.length; i++)
        
        $atxcc.events.insertAlerts (keyword, username, mobile, email)

    } // end if (username)
    
    return

    /*
        // handle unregistered user
    var keyword = $('#zkeyword').text ()
    keyword = keyword.toLowerCase ()

    var mobile = $('#zmobile').text ()
    var email = $('#zemail').text ()

    $('#zregistration')
    .remove ()

    var registeredItems =
        '<div id="zregistered" class="row">' +
            '<div class="col-sm-3">' + 
                    '<label>' + 
                        'DoRegister item: <span id="zkeyword" style="color: red">' + keyword + '</span>?' + 
                    '</label>' + 
                    '<br>'
                    if (mobile) {

                        registeredItems += 
                            '<label>' + 
                                'Text Msg # ' + mobile +
                            '</label>'

                    } // end if (mobile)
                    
                    if (email) {

                        registeredItems += 
                            '<label>' + 
                                'Email Address ' + email +
                            '</label>'

                    } // end if (email)
                    
                    registeredItems +=

            '</div>' + 
        '</div>'
        */
    
}, // keywordDoRegister: function ()


//---------------------
insertAlerts: function (tag, username, mobile, email) {    $atxcc._dg.debug ({tag: tag, username: username, mobile: mobile, email: email})
    
    //console.log ('tag: ' + tag)
    //console.log ('username: ' + username)
    //console.log ('mobile: ' + mobile)
    //console.log ('email: ' + email)

    $.post ('wp-content/themes/atxcc/insert.php', {tag: tag, username: username, mobile: mobile, email: email}, 
        function (data) {
            $atxcc.ut.dumpOb (data)
        }
    )

}, // insertAlerts: function ()




}  // $atxcc.events
$atxcc.ev = $atxcc.events
