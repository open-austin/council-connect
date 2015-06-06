$(document).ready (
    (function () {  // init after doc ready
        var zx = 0
        var zy = 0

        $('#zbody')
        .mousemove ( 
            function (event) {
                zx = event.pageX + 10
                zy = event.pageY - 10

                // console.log ('zx ' + zx + '    zy ' + zy)
            }
        ) // end mousemove
        .keydown (
            function (event) {
                var which = event.which
                //console.log ('keydown event')
                    // test for escape key
                if (which == 27) {

                    $('.xme')
                    .remove ()

                } // end if (which == 27)
                
            }
        )  // end keydown

        $('#agendaheader, #footer, .zitem, .zcontent')
        .mouseenter (
            function () {
                $('.xme')
                .remove ()
            }
        )

        $('.zcontent')
        .mouseenter (
            function () {
                var left = zx + 'px';
                var top = zy + 'px';

                var tpos = 'position: absolute;'
                var tleft = 'left: ' + zx + 'px;'
                var ttop = 'top: ' + zy + 'px;'
                var twidth = 'width: 400px;'
                var tborder = 'border: 1px solid black;'
                var tbackground = 'background-color: #fafafa;'

                var tacss = 'style="' + tpos + tleft + ttop + twidth + tborder + tbackground + '"'
                //var tacss = 'style="' + tpos + tleft + ttop + twidth + theight + topacity + tov + twrap + '"'
                var content = $(this).text()
                var scontent = ""

                var acontent = content.split (/\s+/)

                for (var i = 0; i < acontent.length; i++) {

                    var sid = 'sword' + i
                    var sword = '<span id="' + sid + '" class="sword">' + acontent [i] + '</span>'

                    scontent += sword + ' '

                } // end for (var i = 0; i < acontent.length; i++)
                
                //var ta = '<div id="descr" class="xme"; ' + tacss + '>' + $(this).text() + '</div>'
                var ta = '<div id="descr" class="xme"; ' + tacss + '>' + scontent + '</div>'

                $('#agendaitems')
                .append (ta)

                for (var i = 0; i < acontent.length; i++) {

                    var sid = '#sword' + i

                    $(sid)
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
                    .click (
                        function () {
                            
                            
                        }
                    )  // end .click


                } // end for (var i = 0; i < acontent.length; i++)
                
                $('#descr')
                .mouseleave (
                    function () {
                        $('.xme')
                        .remove ()

                    }
                )
            }
        )  // end .zcontent mounseenter

    })  // end init after doc ready
)  // end document.ready
