$atxcc.Key = {// key.js

kShift: false,
kCtrl: false,
kAlt: false,
kCmd: false,
kIgnore: false,

//---------------------
initKeydown: function (element, reportShift, callback) {    $atxcc._dg.debug ({element: element, reportShift: reportShift, callback: callback})

    $(element)
    .keydown (function (event) {
        $atxcc.Key.cKeydown (event, reportShift, callback)
    })

}, // end initCtrl ()


//---------------------
initKeyup: function (element) {    $atxcc._dg.debug ({element: element})

    $(element)
    .keyup (function (event) {
        $atxcc.Key.cKeyup (event)
    })

}, // end initCtrl ()



//---------------------
ignoreKeyEvent: function () {    $atxcc._dg.debug ({})
    
    $atxcc.Key.kIgnore = true

}, // ignoreKeyEvent: function () {



//---------------------
listenKeyEvent: function () {    $atxcc._dg.debug ({})
    
    $atxcc.Key.kIgnore = false

}, // listenKeyEvent: function () {


//---------------------
cKeydown: function (event, reportShift, callback) {    $atxcc._dg.debug ({event: event, reportShift: reportShift, callback: callback})

    var which = event.which

        // never ignore 'Esc' key == 27
    if ($atxcc.Key.kIgnore && which != 27) {

        return

    } // end if (kIgnore)
    
    event.preventDefault()
    event.stopPropagation ()

    var isAShiftKey = false

    switch (which) {

        case 16: 
            $atxcc.Key.kShift = true
            isAShiftKey = true
            if (reportShift) {
                break
            } else {
                return
            } // end if (reportShift)
            
        case 17: 
            $atxcc.Key.kCtrl = true
            isAShiftKey = true
            if (reportShift) {
                break
            } else {
                return
            } // end if (reportShift)
            
        case 18: 
            $atxcc.Key.kAlt = true
            isAShiftKey = true
            if (reportShift) {
                break
            } else {
                return
            } // end if (reportShift)
            
        case 91: 
        case 92: 
        case 93: 
        case 224:
            $atxcc.Key.kCmd = true
            isAShiftKey = true
            if (reportShift) {
                break
            } else {
                return
            } // end if (reportShift)

    }   

    var thisCh = $atxcc.Key.getKeyDownCode (which)

//console.log ('cKeydown: before callback')
    callback ({
        shift: $atxcc.Key.kShift,
        ctrl: $atxcc.Key.kCtrl,
        alt: $atxcc.Key.kAlt,
        cmd: $atxcc.Key.kCmd,
        isAShiftKey: isAShiftKey,  // true if any of: shift, ctrl, alt, or cmd are true
        which: which,
        ch: thisCh,
    })

}, // cKeydown: function (event) {



//---------------------
cKeyup: function (event) {    $atxcc._dg.debug ({event: event})

    if ($atxcc.Key.kIgnore) {

        return

    } // end if (kIgnore)
    
    event.preventDefault()
    event.stopPropagation ()

    var which = event.which

    switch (which) {

        case 16: 
            $atxcc.Key.kShift = false
            return
        case 17: 
            $atxcc.Key.kCtrl = false
            return
        case 18: 
            $atxcc.Key.kAlt = false
            return
        case 91: 
        case 92: 
        case 93: 
        case 224: 
            $atxcc.Key.kCmd = false
            return
    }   

}, // end cKeyUp (event)



//---------------------
getKeyDownCode: function (which) {    $atxcc._dg.debug ({which: which})
    
    var ch

    if ($atxcc.Key.ctrlOrNonAscii.hasOwnProperty (which)) {

        ch = $atxcc.Key.ctrlOrNonAscii [which]        

    } else if ($atxcc.Key.kShift && $atxcc.Key.asciiShifted.hasOwnProperty (which)) {

        ch = $atxcc.Key.asciiShifted [which]

    } else if (!$atxcc.Key.kShift && $atxcc.Key.asciiUnShifted.hasOwnProperty (which)) {

        ch = $atxcc.Key.asciiUnShifted [which]

    } else {

        ch = null

    } // end if 
    
    return ch

}, // getKeyDownCode: function (which) {


//---------------------
        // not printable or non-ascii block
ctrlOrNonAscii: {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause-break',
    20: 'Caps-lock',
    27: 'Esc',
    32: ' ',  // Space
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'LeftArrow',
    38: 'UpArrow',
    39: 'RightArrow',
    40: 'DownArrow',
    45: 'Insert',
    46: 'Delete',
    91: 'WindowsKeyLeft',
    92: 'WindowsKeyRight',
    93: 'WindowsOptionKey',
    96: '0',  // Numpad
    97: '1',  // Numpad
    98: '2',  // Numpad
    99: '3',  // Numpad
    100: '4',  // Numpad
    101: '5',  // Numpad
    102: '6',  // Numpad
    103: '7',  // Numpad
    104: '8',  // Numpad
    105: '9',  // Numpad
    106: '*',  // Numpad
    107: '+',  // Numpad
    109: '-',  // Numpad
    110: '.',  // Numpad
    111: '/',  // Numpad
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'Numlock',
    145: 'Scroll-lock',
    224: 'MacCmd',
},


//---------------------
asciiUnShifted: {
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    59: ';',
    61: '=',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    173: '-',
    188: ',',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: "\\",
    221: ']',
    222: "'",
},


//---------------------
asciiShifted: {
    48: ')',
    49: '!',
    50: '@',
    51: '#',
    52: '$',
    53: '%',
    54: '^',
    55: '&',
    56: '*',
    57: '(',
    59: ':',
    61: '+',
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',
    173: '_',
    188: '<',
    190: '>',
    191: '?',
    192: '~',
    219: '{',
    220: '|',
    221: '}',
    222: '"',
},


}  // $atxcc.Key
$atxcc.ky = $atxcc.Key
