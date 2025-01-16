//isValidStr - validates given data
const isValidStr = function(data) {
    return(typeof(data) !== 'undefined' && data !== null && data !== '')
};//isValidStr

//decodeEncodedSpecialChars - converts HTML entities to HTML characters
const decodeEncodedSpecialChars = function(data) {
    //console.log(_.unescape(data))
    if (isValidStr(data)) {
        //unescape module to escape the spe
        //console.log('data2'+data)
        let decode = require('unescape');        
        return decode(data);
    } else {
        return null;
    }
};//decodeEncodedSpecialChars

//sanitizeData - sanitizes given Data
const sanitizeData = function(data, is_allow_html = 0) {
    if (isValidStr(data)) {
        let sanitizeHtml = require('sanitize-html');
        
        let html_options = {allowedTags: [], allowedAttributes:[]};
        if(is_allow_html === 1) {
            html_options =  { allowedTags: ['h1','h2','h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div','s',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe', 'img', 'span','del','kbd','code','tt','q','big','small','let','ins','cite','hr'], allowedAttributes:{ a: [ 'href', 'name', 'target' ],
            img: [ 'src' ],'*': [ 'id','name','dir','href', 'align', 'alt', 'center', 'bgcolor' ,'style']}};
        }       
        return decodeEncodedSpecialChars(sanitizeHtml(data, html_options));
    } else {
        return null;
    }    
};//sanitizeData


//sanitizeObject - sanitizes given Data Object/ Array recursively
const sanitizeObject = function (input) {
    if (!Array.isArray(input) && typeof input != 'object') return input;
    return Object.keys(input).reduce(function(value, key) {
        let is_allow_html   = (key == 'html_description' || key == 'project_changes') ? 1 : 0;
        value[key]          = typeof input[key] == 'string' || !isValidStr(input[key])? sanitizeData(input[key], is_allow_html) : sanitizeObject(input[key]);
        return value;
    }, Array.isArray(input)? []:{});
};//sanitizeObject
// Export the sanitizeObject function
module.exports = sanitizeObject;