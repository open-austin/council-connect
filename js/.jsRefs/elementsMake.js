$atxcc.elementsMake = {// elementsMake.js

//---------------------
makeBaretext: function (parent, name, val) {    $atxcc._dg.debug ({parent: parent, name: name, val: val})
    // here, 'name' is ignored => no actual element constucted, only 'text' modified
    
    /*
    if (val == null) {

        // CREATE FORM, get baretext and assign it to val
        //val = 'This is Bare'
        //val = '<div>div text</div>'

    } // end if (val == null)
    */

        // still need to enclose bare text in a div so it's addressable via WebDev functionality
    var btId = $atxcc.elementsMake.makeDiv (parent, 'Text')

    $(btId)
    .click (function (){de.cDataEdit (btId, de.fNull, de.fNull)})

    $(btId)
    .append (val)

    return btId

}, // makeBaretext: function (parent, name, val) {



//---------------------
makeBr: function (parent, name) {    $atxcc._dg.debug ({parent: parent, name: name})
    
    return $atxcc.elementsMake.makeElement ('br', parent, name, true)

}, // makeBr: function (parent, name) {


//---------------------
makeParagraph: function (parent, name, val) {    $atxcc._dg.debug ({parent: parent, name: name, val: val})

    var id = $atxcc.elementsMake.makeElement ('p', parent, name, true)

    $(id).text (val)

    return id

}, // end makeParagraph ()


//---------------------
makeInput: function (parent, name, type, val) {    $atxcc._dg.debug ({parent: parent, name: name, type: type, val: val})

    var id = $atxcc.elementsMake.makeElement ('input', parent, name, true)

    $(id)
    //  TODO consider .val (val), instead of .attr ...
    .attr ({
        type: type,
    })
    .val (val)
    .hover ($atxcc.ky.ignoreKeyEvent, $atxcc.ky.listenKeyEvent)
    .focus ($atxcc.ky.ignoreKeyEvent())  // must do ky.listenKeyEvent after submitting to restore listen

    return id

}, // end makeInput ()

//---------------------
makeForm: function (parent, name) {    $atxcc._dg.debug ({parent: parent, name: name})

    var id = $atxcc.elementsMake.makeElement ('form', parent, name, true)
    return id

}, // end makeForm (parent, name)





//---------------------
makeButton: function (parent, name, buttonAction) {    $atxcc._dg.debug ({parent: parent, name: name, buttonAction: buttonAction})
    
    var id = $atxcc.elementsMake.makeElement ('button', parent, name, true)

    $(id)
    .append (name)
    .click (buttonAction)

    return id

}, // makeButton: function ()


//---------------------
makeFieldset: function (parent, name, legendValue) {    $atxcc._dg.debug ({parent: parent, name: name, legendValue: legendValue})
    
    var id = $atxcc.elementsMake.makeElement ('fieldset', parent, name, true)

    var legendId = $atxcc.elementsMake.makeElement ('legend', id, 'legend', true)

    $(legendId)
    .text (legendValue)

    return id

}, // makeFieldset: function ()



//---------------------
makeSelect: function (parent, name, optionValues, changeCallbackOpt) {    $atxcc._dg.debug ({parent: parent, name: name, optionValues: optionValues, changeCallbackOpt: changeCallbackOpt})
    
    var selectId = $atxcc.elementsMake.makeElement ('select', parent, name, true)

    for (var i = 0; i < optionValues.length; i++) {

        name = optionValues [i]
        var optionId = $atxcc.elementsMake.makeElement ('option', selectId, name, true)

        if (i == 0) {

                // initialize z-selected attribute to first option
            $(selectId)
            .attr({
                'z-selected': optionId,
            })

            $(optionId)
            .attr({
                selected: 'selected',
            })

        } // end if (i == 0)
        

        $(optionId)
        .text (name)

    } // end for (var i = 0; i < optionValues.length; i++)

    $(selectId)
    .change (
        {changeCallbackOpt: changeCallbackOpt},
        function (event) {

            var changeCallbackOpt = event.data.changeCallbackOpt

                // remove previously selected option's 'selected' attribute
            var prevOptionId = $(selectId).attr ('z-selected')
            $(prevOptionId).removeAttr ('selected')
    
            var optionId = '#' + $(selectId + ' option:selected').attr ('id')
    
            $(selectId)
            .attr({
                'z-selected': optionId,
            })
    
            $(optionId)
            .attr({
                selected: 'selected',
            })
    
            $atxcc.cs.doCallback (changeCallbackOpt, {selectId: selectId, optionId: optionId})

            /*
            if (typeof changeCallbackOpt == 'function') {
    
                changeCallbackOpt (selectId, optionId)
    
            } // end if (typeof callbackOpt == 'function')
            */

        })

    return selectId

}, // makeSelect: function ()

//cMakeSelectChange callbackOpt
//---------------------
makeFormContent: function (parent, name, content, submitCallback, style) {    $atxcc._dg.debug ({parent: parent, name: name, content: content, submitCallback: submitCallback, style: style})
    // content:  [
    //      {fieldset: 'legendValue'},
    //      {select: [opt1, opt2, ...]},
    //      {label: 'labelVal'},
    //      {text: 'defaultVal'},
    //      {textArea: {val: 'defaultVal', rows: rows, cols: cols}},
    //      {password: 'defaultVal'},
    //      {radio: [val1, val2, ...]},
    //      {checked: [val1, val2, ...]},
    //  ]
    // for text type, defaultVal clears when user clicks the input field

    var formId = $atxcc.elementsMake.makeForm (parent, name)
    var deleteFormId = $atxcc.elementsMake.makeDiv (formId, 'deleteForm')

    $(deleteFormId)
    .css({
        position: 'absolute',
        color: 'red',
        right: '0px',
    })
    .attr({
        'data-formid': formId,
    })
    .text ('x')

    $(deleteFormId)
    .hover (function (event) {
        var id = $atxcc.cs.id (event)
        $(id)
        .css({
            cursor: 'pointer',
        })
    })
    .click (function (event) {
        var id = $atxcc.cs.id (event)
        var formId = $(id).attr ('data-formid')

        $atxcc.elementsMake.removeElement (formId)
    })

        // if no fieldset, use formId for content
    var formContentId = formId

    var field0 = content [0]

    var hasFieldset = field0.hasOwnProperty ('fieldset')
    var legendValue = ""

        // indicates if first text field has been encountered.
        // if so, add autofocus attribute
    var firstTextField = false

    if (hasFieldset) {

        legendValue = field0.fieldset
        content.shift ()

        formContentId = $atxcc.elementsMake.makeFieldset (formId, 'fieldset', legendValue)

    } // end if (hasFieldset)
    

    for (var i = 0; i < content.length ; i++) {

        var field = content [i]

            // only one key is ever expected for each field component of content
        var keys = Object.keys (field)
        var fieldType = keys [0]
        var fieldValue = field [fieldType]

        switch (fieldType) {

            case 'textArea':
                var textAreaId = $atxcc.elementsMake.makeTextArea (formContentId, 'TA', fieldValue.val, fieldValue.cols, fieldValue.rows)
                break

                // 'text' and 'password' handled the same way, hence no 'break' at end of 'text'
            case 'text':
            case 'password':

                var inputId = $atxcc.elementsMake.makeInput (formContentId, fieldType, fieldType, fieldValue)

                $(inputId)
                .css({
                    'font-style': 'italic',
                })
                .val (fieldValue)
                .click (function (event) {
                    var inputId = $atxcc.cs.id (event)

                    $(inputId)
                    .val ('')
                })

                if (! firstTextField) {

                    $(inputId)
                    .attr({
                        autofocus: 'autofocus',
                    })

                    firstTextField = true

                } // end if (! firstTextField)
                

                break

            case 'label':
                
                var labelId = $atxcc.elementsMake.makeLabel (formContentId, 'label', fieldValue)

                $(labelId)
                .css({
                    'font-size': '13px',
                })
                break

            case 'select':

                $atxcc.elementsMake.makeSelect (formContentId, 'select', fieldValue)

                break

            case 'submit':
                
                $atxcc.elementsMake.makeInput (formContentId, 'submit', 'submit', fieldValue)

                break

        } // end switch (key)
        

    } // end for (var i = 0; i < keys.length ; i++)
    
    $(formId)
    .css({
        position: 'absolute',  // always make position absolute
        left: '40px',
        top: '40px',
        'z-index': 10000,
    }).css (style)  // add optional style, or change left/top values
        // preventDefault necessary to make 'submit' actuall invoke submitCallback
    .submit (function (event) {event.preventDefault();submitCallback(event)})

    /*  EXAMPLE
    loginId = em.makeFormContent (
        vi.vCanvas, 
        'login', 
        [
            {fieldset: 'login, please'},
            {label: 'username'},
            {text: 'email'}, 
            {label: 'password'},
            {password: 'password'},
            {label: 'enter this: xQy2'},
            {text: ''},
            {label: 'pick one'},
            {select: ['opt1', 'opt2']}
        ], 
        cLoginDo, 
        {
            'background-color': 'rgb(229, 236, 255)',
        }
    )
    */

    return formId

}, // makeFormContent: function (parent, name, content, submitCallback) {


//---------------------
makeTextArea: function (parent, name, val, cols, rows) {    $atxcc._dg.debug ({parent: parent, name: name, val: val, cols: cols, rows: rows})

    var id = $atxcc.elementsMake.makeElement ('textarea', parent, name, true)

    $(id)
    .attr ({
        rows: rows,
        // rows: rows > 1 ? rows - 1 : rows,
        cols: cols,
    })

    $(id)
    .text (val)
    .hover ($atxcc.ky.ignoreKeyEvent, $atxcc.ky.listenKeyEvent)
    .focus ($atxcc.ky.ignoreKeyEvent())

    return id


}, // end makeTextArea ()


//---------------------
makeTextAreaFit: function (parent, name, val, cols) {    $atxcc._dg.debug ({parent: parent, name: name, val: val, cols: cols})

    var rows = Math.floor (val.length / cols) + 2
    var numNl = val.split (/\n/).length

    var id = $atxcc.elementsMake.makeTextArea (parent, name, val, cols, Math.max (rows, numNl))

    $(id)
    .css({
        position: 'absolute',
        'font-family': 'monospace',
    })

    return id

}, // end makeTextAreaFit ()


//---------------------
makeLabel: function (parent, name, lval) {    $atxcc._dg.debug ({parent: parent, name: name, lval: lval})

    var id = $atxcc.elementsMake.makeElement ('label', parent, name, true)

    $(id).text (lval)

    return id

}, // end makeLabel (parent, name, lval)


//---------------------
makeImage: function (parent, name, imgurl) {    $atxcc._dg.debug ({parent: parent, name: name, imgurl: imgurl})

    var id = $atxcc.elementsMake.makeElement ('img', parent, name, true)

    $(id)
    .attr({
        'src': imgurl
    })

    return id

}, // end makeImage ()


//---------------------
makeDivSelf: function (parent, name) {    $atxcc._dg.debug ({parent: parent, name: name})

    var newId = $atxcc.elementsMake.makeDiv (parent, name)

        // override 'thisBox' value as id of itself, replacing the id of the parent container
    bx.boxProperties [newId] = {
        thisBox: newId,
    }

    return newId

}, // end makeDiv (, name)



//---------------------
makeDiv: function (parent, name) {    $atxcc._dg.debug ({parent: parent, name: name})

    return $atxcc.elementsMake.makeElement ('div', parent, name, true)

}, // end makeDiv (, name)


//---------------------
makeDivAfter: function (sibl, name) {    $atxcc._dg.debug ({sibl: sibl, name: name})
    
    return $atxcc.elementsMake.makeElementAfter ('div', sibl, name, true)

}, // makeDivAfter: function (sibl, name) {


//---------------------
makeUnorderedList: function (parent, name) {    $atxcc._dg.debug ({parent: parent, name: name})
    
    return $atxcc.elementsMake.makeElement ('ul', parent, name, true)

}, // makeUnorderedList: function (parent, name) {



//---------------------
makeListItem: function (parent, name) {    $atxcc._dg.debug ({parent: parent, name: name})
    
    return $atxcc.elementsMake.makeElement ('li', parent, name, true)

}, // makeFirstListItem: function (parent, name) {


//---------------------
makeTable: function (parent, name, addContent) {    $atxcc._dg.debug ({parent: parent, name: name, addContent: addContent})

    var tableId = $atxcc.elementsMake.makeElement ('table', parent, name, true)
// $(tableId) .hover (function (event){bx.cGenHoverT(event)})

    $(tableId)
    .attr({
        class: 'tabledefault',
        'z-numdatarows': '0',  // num data rows created, not necessarily existing (if any deleted)
    })

    var tbodyId = $atxcc.elementsMake.makeElement ('tbody', tableId, 'tbdy', true)
    var tr
    var th
    var td

    if ($atxcc.m.uTableHeader) {

        tr = $atxcc.elementsMake.makeElement ('tr', tbodyId, "tr", true)
// $(tr) .hover (function (event){bx.cGenHoverR(event)})

        for (var i = 0; i < $atxcc.m.uTableCols; i++) {

            th = $atxcc.elementsMake.makeElement ('th', tr, "th", true)
// $(th) .hover (function (event){bx.cGenHoverH(event)})
 //console.log ('th: ' + th)
            $(th)
            .attr({
                class: 'thdefault',
            })

                // if addContent is undefined or if it's defined and true, allow editing of header data
            if (addContent) {

                    // row == 0  =>  cell is a header cell, th
                    // row > 0   =>  cell is a data cell, td
                $atxcc.cs.doCallback (addContent, {cell: th, row: 0, col: i})

            } // end if (doAddDefault)
            

        } // end for (var i = 0; i < m.uTableCols; i++)

    } // end if (m.uTableHeader)
    
    for (var i = 0; i < $atxcc.m.uTableRows; i++) {
        
        $atxcc.elementsMake.makeRow (tbodyId, addContent)

    } // end for (var i = 0; i < m.uTableRows; i++)

    return tableId

}, // makeTable: function (parent) {



//---------------------
makeRow: function (tbodyId, makeRowContent) {    $atxcc._dg.debug ({tbodyId: tbodyId, makeRowContent: makeRowContent})

    var tableId = $(tbodyId).parent ()

        // row == 0 => header row.  So, data row starts with '1'
    var row = parseInt ($(tableId).attr ('z-numdatarows')) + 1

    $(tableId)
    .attr({
        'z-numdatarows': row
    })

    var tr = $atxcc.elementsMake.makeElement ('tr', tbodyId, 'tr', true)

    for (var j = 0; j < $atxcc.m.uTableCols; j++) {

        var td = $atxcc.elementsMake.makeElement ('td', tr, 'td', true)

        $atxcc.cs.doCallback (makeRowContent, {cell: td, row: row, col: j})

        $(td)
        .attr({
            class: 'tddefault',
        })

    } // end for (var j = 0; j < m.uTableCols; j++)
        
    return tr

}, // makeRow: function ()



//---------------------
defaultCellContent: function (td, colJ, cP) {    $atxcc._dg.debug ({td: td, colJ: colJ, cP: cP})
    
    var rowI = cP.rowI

    $(td)
    .click (function (event) {de.cDataEdit ($atxcc.cs.id(event), de.fNull, de.fNull)})
        // TODO  Why doesn't the following work: ??
        //.click (function () {de.cDataEdit (td, 'fNull', 'fNull')})
    .text (rowI + ":" + colJ)

}, // defaultCellContent: function ()



//---------------------
insertSection: function (parent, htmlCode) {    $atxcc._dg.debug ({parent: parent, htmlCode: htmlCode})
    // inserts code section from Restore operation, updates the id values to new, unused id numbers
    // then, invokes bx.aBoxClose to set hover functions for BE div elements

        // first create Div container for newly insert code.  Needed to allow jquery to address all descendents
    var insertedId = $atxcc.elementsMake.makeDiv (parent, 'inserted')

    $(insertedId)
    .append (htmlCode)

        // initialize to an error value.  parentBE is intended to be overwritten by first BE element
    var parentBE = "#i0"

        // Now update each descendent ID to current value
    $(insertedId)
    .find ("[id]")
    .each (function (){

        var Id = '#' + $(this).attr('id')

        var name = $(this).attr ('name')
        if (name == 'BE') {

            parentBE = '#' + $(this).attr ('id')

            bx.boxProperties [parentBE] = {
                thisBox: parentBE,
            }

                // side affect on aBoxClose.  uses m.curBox, instead of passed parameter
            $atxcc.m.curBox = parentBE

                // set hover in/out on BE divs to reveal control widgets
            bx.aBoxClose (parentBE)

        } else {

            $atxcc.elementsMake.setBoxProperties (parentBE, name, true, Id)

        } // end if ($(this).attr ('name') == 'BE')
        
    })

    $(insertedId).children ().each (function (){
        $(this).insertBefore (insertedId)
    })
    $atxcc.elementsMake.removeElement (insertedId)

}, // insertSection: function ()


//---------------------
makeElement: function (tag, parent, name, addBoxProperties) {    $atxcc._dg.debug ({tag: tag, parent: parent, name: name, addBoxProperties: addBoxProperties})

    if (! parent) {

        //console.trace ()
        // doError ("makeElement:  parent not valid:  parent '" + parent + "'")
        return

    } // end if (! parent)
    
    var newId = $atxcc.elementsMake.doMakeElement (tag, parent, true, name)

    $atxcc.elementsMake.setBoxProperties (parent, name, addBoxProperties, newId)
    
    return newId

}, // end makeElement (, name)



//---------------------
makeElementAfter: function (tag, sibl, name, addBoxProperties) {    $atxcc._dg.debug ({tag: tag, sibl: sibl, name: name, addBoxProperties: addBoxProperties})
    
        // only used for inserting property into data model display
        // if used in vcanvas, then boxProperties should be updated as in makeElement:

    if (! sibl) {

        //console.trace ()
        $atxcc.elementsMake.doError ("makeElement:  sibling to insert after not valid:  sibling '" + sibl + "'")

    } // end if (! sibl)
        
    newId = $atxcc.elementsMake.doMakeElement (tag, sibl, false, name)

    $atxcc.elementsMake.setBoxProperties (sibl, name, addBoxProperties, newId)
    return newId

}, // makeElementAfter: function (tag, sibl, name) {



//---------------------
doMakeElement: function (tag, parentOrSibl, isAppend, name) {    $atxcc._dg.debug ({tag: tag, parentOrSibl: parentOrSibl, isAppend: isAppend, name: name})
    
    var tagtype = $atxcc.elementsMake.getTagType (tag)

    if (tagtype == 0) {

        $atxcc.elementsMake.doError ("doMakeElement:  tag not valid:  tag '" + tag + "'")
        Id = '-1'

    } else {

        // DELETEME: var id = 'i' + ++vi.lastIdSuffix
        var id = $atxcc.ut.genId ()
        var divel = '<' + tag + ' id="' + id + '"'
    
        if (tagtype == 1) {
    
            divel += '>'
    
        } else {
    
            divel += '></' + tag + '>'
    
        } // end if (tagtype == 1)
    
        if (isAppend) {
    
            $(parentOrSibl).append (divel)
    
        } else {
    
            $(parentOrSibl).after (divel)
    
        } // end if (isAppend)
    
        var Id = '#' + id
    
        if (name != "") {
    
            $(Id)
            .attr({
                name: name,
            })
    
        } // end if (name != "")
    
        /*
        if (m.Css.hasOwnProperty (tag)) {
    
            $(Id).css (m.Css [tag])
    
        } // end if (m.Css.hasOwnProperty (tag))
        */
        
        if ($atxcc.m.Attr.hasOwnProperty (tag)) {
    
            $(Id).attr ($atxcc.m.Attr [tag])
    
        } // end if (m.Attr.hasOwnProperty (tag))

    } // end if (tagtype == 0)

    
    return Id

}, // doMakeElement: function (){



//---------------------
setBoxProperties: function (parent, name, addBoxProperties, id) {    $atxcc._dg.debug ({parent: parent, name: name, addBoxProperties: addBoxProperties, id: id})
    // only Model Properties don't have a parent in boxProperties
    // avoids having all the properties cluttering up boxProperties
    
    if (addBoxProperties && bx.boxProperties.hasOwnProperty (parent)) {

        bx.boxProperties [id] = {
            thisBox: bx.boxProperties [parent].thisBox,
            name: name,
        }

    } // end if (bx.boxProperties.hasOwnProperty (parent))

}, // setBoxProperties: function ()



//---------------------
removeElement: function (elementId) {    $atxcc._dg.debug ({elementId: elementId})
    
    if (elementId == null) {

        return;

    } // end if (elementId == null)
    

    $atxcc.elementsMake.removeBoxProperties (elementId)
    $(elementId).remove()

    /*
    setTimeout (function (){
    }, 200)
    */
    
}, // removeElement: function (elementId) {



//---------------------
removeBoxProperties: function (elementId) {    $atxcc._dg.debug ({elementId: elementId})
    // very pretty indeed.
    // recursively remove Id keys from boxProperties from corresponding children, then remove Dom element

    var children = $(elementId).children()

    if (children.length > 0) {

        for (var i = 0; i < children.length; i++) {
    
            var childId = '#' + children [i].id
            $atxcc.elementsMake.removeBoxProperties (childId)
    
        } // end for (var i = 0; i < children.length; i++)

    } // end if (children.length > 0)
    
    if (bx.boxProperties.hasOwnProperty(elementId)) {

        // console.log ('   deleting element: ' + elementId)
        delete bx.boxProperties [elementId]
    
    } // end if (bx.boxProperties.hasOwnProperty(elementId))

}, // removeChildrenProperties: function (elementId) {



//---------------------
fitToBox: function (id) {    $atxcc._dg.debug ({id: id})
    
    $(id)
    .css({
        width: '100%',
        height: '100%',
        'z-index': $atxcc.vi.zINIT,
    })

}, // fitToBox: function (id) {


//---------------------
doError: function (errmsg) {    $atxcc._dg.debug ({errmsg: errmsg})

    $('body')
    .prepend (
        errmsg + '<br/>'
    )

}, // end doError (err)



//---------------------
getTagType: function (tag) {    $atxcc._dg.debug ({tag: tag})

        // 1 => void elements, 2 => has content
    var tags = { area: 1, base: 1, br: 1, circle: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1, a: 2, abbr: 2, address: 2, article: 2, aside: 2, audio: 2, b: 2, bdi: 2, bdo: 2, blockquote: 2, body: 2, button: 2, canvas: 2, caption: 2, cite: 2, code: 2, colgroup: 2, datalist: 2, dd: 2, del: 2, details: 2, dfn: 2, dialog: 2, div: 2, dl: 2, dt: 2, em: 2, fieldset: 2, figcaption: 2, figure: 2, footer: 2, form: 2, h1: 2, h2: 2, h2: 2, h3: 2, h4: 2, h5: 2, h6: 2, head: 2, header: 2, hgroup: 2, html: 2, i: 2, iframe: 2, ins: 2, kbd: 2, label: 2, legend: 2, li: 2, map: 2, mark: 2, menu: 2, meter: 2, nav: 2, noscript: 2, object: 2, ol: 2, optgroup: 2, option: 2, output: 2, p: 2, pre: 2, progress: 2, q: 2, rp: 2, rt: 2, ruby: 2, s: 2, samp: 2, script: 2, section: 2, select: 2, small: 2, span: 2, strong: 2, style: 2, sub: 2, summary: 2, sup: 2, svg: 2, table: 2, tbody: 2, td: 2, textarea: 2, tfoot: 2, th: 2, thead: 2, time: 2, title: 2, tr: 2, u: 2, ul: 2, 'var': 2, video: 2}

    return tags.hasOwnProperty(tag) ? tags [tag] : 0

}, // end getTagType (tag)



}  // $atxcc.elementsMake
$atxcc.em = $atxcc.elementsMake
