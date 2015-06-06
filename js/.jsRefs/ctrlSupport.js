$atxcc.ctrlSupport = {// Ctrl Support functions

idRegister: {},
apiF: null,

//---------------------
id: function (event) {    $atxcc._dg.debug ({event: event})
    
    return '#' + event.target.id

}, // id: function (event) {



//---------------------
doCallback: function (callbackFn, cP_Opt) {    $atxcc._dg.debug ({callbackFn: callbackFn, cP_Opt: cP_Opt})
    // callbackFn:  function or object {cF: callbackFn, cP: cP}
    // cP_Opt:  additional cP parameters, if defined

    var callbackFnType = typeof callbackFn

        // if callbackFn not defined, or if not a function or object, process nothing and return
    if (callbackFnType == 'function' || callbackFnType == 'object') {

            // if callbackFn is a function, put it in object form {cF: ..., cP: ...}
        if (callbackFnType == 'function') {

            callbackFn = {cF: callbackFn, cP: {}}

        } // end if (callbackFnType == 'function')

        var cP = {}

        if (callbackFn.hasOwnProperty ('cP')) {

            cP = callbackFn.cP

        } // end if (callbackFn.hasOwnProperty ('cP'))
        
        var cF = callbackFn.cF

            // add cP_Opt params to cP, if it's defined
        if (cP_Opt) {

            $.extend (cP, cP_Opt)

        } // end if (cP_Opt)
        
        var cE = null

        if (callbackFn.hasOwnProperty ('cE')) {

            cE = callbackFn.cE

        } // end if (cP.hasOwnProperty ('cE'))
        
        if (cP_Opt && cP_Opt.length == 0) {

            cF ()

        } else {

            cF (cP)

        } // end if (cP_Opt.length == 0)

        if (cE) {

            $atxcc.ctrlSupport.doCallback (cE, {})

        } // end if (cE)
        
        

    } // end if (callbackFn)
    

}, // doCallback: function ()



}  // $atxcc.ctrlSupport
$atxcc.cs = $atxcc.ctrlSupport
