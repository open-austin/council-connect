$atxcc.init = {// init.js

//---------------------
init: function (ip) {    $atxcc._dg.debug ({ip: ip})

    $('#zbody')
    .mousemove ( 
        function (event) {
            $atxcc.ev.mouseMove (event.pageX, event.pageY)
        }
    ) // end mousemove
    .keydown (
        function (event) {
            $atxcc.ev.keyDown (event.which)
        }
    )  // end keydown

        // clears content description when moving away from agenda items section
    $('#agendaheader, #footer, .zitem, .zcontent')
    .mouseenter ($atxcc.ev.xmeRemove)

        // pops up description when hovering over agenda row
    $('.zcontent')
    .mouseenter ($atxcc.ev.descrDisplay)
    .click (function () {
        var content = $(this).text ()

        var children = $(this).parent().children ()
        var date = $(children [0]).text ()
        var item = $(children [1]).text ()
        date = date.replace (/\s/g, "")
        item = item.replace (/\s/g, "")

        var agendaItem = 'Date: ' + date +'  Item: '+ item
        $atxcc.ev.doNotify (agendaItem, content)
    })

    $('#zsearch')
    .submit (
        function (event) {
            event.preventDefault ()
            $atxcc.ev.agendaSearch ()
        }
    )  // end .submit


} // end init ()

}  // $atxcc.init
$atxcc.it = $atxcc.init
