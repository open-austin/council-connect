$atxcc.viewInit = {// viewInit.js

vBody: null,
vHeader: null,
vBodyMC: null,

vCanvas: null,
vDraw : null,

    // constants with either all CAPS or inverted CAMELcASE
    // all widths in pixels
GRIDlINEwIDTH: 0.09,
VpAGEhEIGHT: 1800,  
VdATAwIDTH: 200,  
VhEADERwIDTH: 30,
VcANVASwIDTH: 1800,

LIGHTlAVENDER: 'rgb(229,236,255)',
LIGHTlAVENDERtRANSPARENT: 'rgba(229,236,255,0.5)',
LIGHTlAVENDERcLEAR: 'rgba(229,236,255,0.25)',

LIGHTrED: 'rgb(255,220,220)',
MOSTLYrED: 'rgb(255,64,64)',
NEARLYwHITE: 'rgb(243,243,243)',  // same as grid line color #f3f3f3
NEARLYwHITEtRANSPARENT: 'rgba(243,243,243,0.7)', 
//NEARLYwHITE: 'rgb(255,250,255)',
LIGHTbLUE: 'rgb(179,255,255)',

SKYbLUE: 'rgb(135,207,239)',
//HEADER: 'rgb(0,191,255)',
    //HEADER: 'rgb(0,215,255)',
//HEADER: 'rgb(7,215,255)',
//HEADER: 'rgb(7,214,253)',
DARKERbLUE: 'rgb(2,146,207)',
BLUE: 'rgb(7,180,253)',  // #07B4FD
LIGHTaQUA: 'rgb(209,248,255)',  // #D1F8FF
GREY: 'rgb(240,240,240)',
zINIT: '6000',
zSHOW: '2000',


//---------------------
initView: function () {    $atxcc._dg.debug ({})

    $atxcc.viewInit.initVBody ()
    $atxcc.viewInit.initVHeader ()
    $atxcc.viewInit.initVModelData ()
    $atxcc.viewInit.initVCanvas ()

}, // end initView ()


//---------------------
initVBody: function () {    $atxcc._dg.debug ({})

    $atxcc.viewInit.vBody = $atxcc.em.makeDiv ('body', 'vBody')

    $($atxcc.viewInit.vBody)
    .css ({
        width: '1500px',
        height: $atxcc.viewInit.VpAGEhEIGHT + 'px',
    })
        

}, // end initVBody ()


//---------------------
initVHeader: function () {    $atxcc._dg.debug ({})

    $atxcc.viewInit.vHeader = $atxcc.em.makeDiv($atxcc.viewInit.vBody, 'vHeader')
    bx.boxProperties [$atxcc.viewInit.vHeader] = {
        thisBox: null,
    }

    $($atxcc.viewInit.vHeader)
    .css({
        'z-index': $atxcc.vi.zINIT,
        position: 'relative',
        float:'left',
        width: $atxcc.viewInit.VhEADERwIDTH + "px",
        height: $atxcc.viewInit.VpAGEhEIGHT + 'px',
        'background-color': $atxcc.viewInit.SKYbLUE,
    })
        

    wm.iWidgetModel ($atxcc.viewInit.vHeader)    
    wp.iWidgetPlay ($atxcc.viewInit.vHeader)
    wl.iWidgetLogin ($atxcc.viewInit.vHeader)

}, // end initVHeader ()


//---------------------
initVModelData: function () {    $atxcc._dg.debug ({})

        // MC is model + canvas
        // vBodyMC is necessary to capture vCanvas along with model data
        // so showing model data causes vCanvas to move accordingly
    $atxcc.viewInit.vBodyMC = $atxcc.em.makeDiv ($atxcc.viewInit.vBody, 'vBodyMC')
        // purposely do NOT set bx.boxProperties [vBodyMC] to anything, so entry not present
        // => else all derivative elements will unnecessarily clutter up boxProperties

    $($atxcc.viewInit.vBodyMC)
    .css({
        height: '100%',
        position: 'absolute',
        left: ($atxcc.viewInit.VhEADERwIDTH - $atxcc.viewInit.VdATAwIDTH) + "px",
    })
        

}, // end initVModelData ()


//---------------------
initVCanvas: function () {    $atxcc._dg.debug ({})

    $atxcc.viewInit.vCanvas = $atxcc.em.makeDiv ($atxcc.viewInit.vBodyMC, 'vCanvas')
    bx.boxProperties [$atxcc.viewInit.vCanvas] = {
        thisBox: null,
    }

    $($atxcc.viewInit.vCanvas)
    .css ({
        //float: 'left',
        position: 'absolute',
        left: $atxcc.viewInit.VdATAwIDTH,
        height: $atxcc.viewInit.VpAGEhEIGHT + 'px',
        width: $atxcc.viewInit.VcANVASwIDTH + 'px',
        'z-index': 1000,
    })
    .hover (
        cv.cVCanvasIn, 
        cv.cVCanvasOut
    )

    $atxcc.m.set ({
        uGridRes: $atxcc.m.uGridRes  // assign to itsef, so action function, aGrid, will get called
    })


}, // end initVCanvas ()



//---------------------
clearVCanvas: function () {    $atxcc._dg.debug ({})

    $($atxcc.vi.vCanvas).children ('div').each (function (){
        $atxcc.em.removeElement (this)
    })

}, // clearVCanvas: function ()


//---------------------
initTmp: function () {    $atxcc._dg.debug ({})
    
sce.init ()
//    bx.newBox ('#i13', 436, 40, 660, 88)

//  wi.cWidgetClick (wi.widgetModelShow)
    $.post ('Lib/SigninPost.php', {username: 'wd5', password: 'wd5'}, function (data) {

            // data == 0 => successfully logged in
        var status = data.charAt (0)

        if (status == '0') {
    
            $atxcc.m.mSessionID = data.substring (1);

        } else {

            alert (data)

        } // end if (data == '0')

    })



  /*
  $('body')
  .append ('<sty' + 'le>label{border:3px dotted green}</style>')
  return
  */

  /*  Applicability of jquery call is only to current, vs above, applic is current and all future.  Why?
  $('label')
  .css({
    border: '3px dotted green',
  })
  */

  return
    
    /*
    m.set ({
        mParent: '#i16',
        mX0: 453,
        mY0: 43,
    })


    m.set ({
        mX1: 625,
        mY1: 79,
    })


    m.set ({
        mBoxCloseId: m.curBox,
    })


    m.set ({
        modifyLock: false,
        curBox: null,
    })

    eb.aElementDo (m.lastBox, 'Label')
    */


    // form container
    $atxcc.m.set ({
        mParent: '#i16',
        mX0: 300,
        mY0: 20,
    })


    $atxcc.m.set ({
        mX1: 525,
        mY1: 180,
    })


    $atxcc.m.set ({
        mBoxCloseId: $atxcc.m.curBox,
    })


    $atxcc.m.set ({
        modifyLock: false,
        curBox: null,
    })

    eb.aElementDo ($atxcc.m.lastBox, 'Table')
    

    /*
    m.set ({
        mParent: '#i16',
        mX0: 453,
        mY0: 340,
    })


    m.set ({
        mX1: 625,
        mY1: 360,
    })


    m.set ({
        mBoxCloseId: m.curBox,
    })


    m.set ({
        modifyLock: false,
        curBox: null,
    })

    eb.aElementDo (m.lastBox, 'Input')
    */
    


}, // initTmp: function () {



}  // $atxcc.viewInit
$atxcc.vi = $atxcc.viewInit
