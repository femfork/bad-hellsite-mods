// ==UserScript==
// @name        No dash urls
// @match       https://www.tumblr.com/*
// @version     1.3-2023-07-25
// @author      femfork
// @description Get rid of the urls on the dash
// ==/UserScript==

const target = document.getElementById('base-container')

const config = {childList: true, subtree: true}

function removeUrls (element) {
    for (const potUrl of element.getElementsByClassName('BSUG4')) {
        console.log('id potential url\n', potUrl)
        
        if (/^\/([a-z]|[0-9]|-)+$/gm.test(potUrl.getAttribute('href'))) {
            console.log('replacing text\n', potUrl)
            
            potUrl.text = '?'
        }
    }
}

const observer = new MutationObserver( (mutations, observer) => {
    // console.log('id mutations\n', mutations)
    
    for (const mutation of mutations) { for (const element of mutation.addedNodes) {
        console.log('scanning\n', element)
        
        removeUrls(element)
    } }
} )

function main () {
    console.log('begin')
    console.log('id target\n', target)

    removeUrls(target)
    observer.observe(target, config)
    
    console.log('end')
}

if (document.readyState === 'interactive') {main()}
else {document.addEventListener('onDOMContentLoaded', main)}