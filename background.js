// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function decrypt(cipherText) {
  return cipherText.split("").map(function(c) {
    var lowerCharCode = c.toLowerCase().charCodeAt(0);

    if (lowerCharCode < 97 || lowerCharCode > 122) return c;

    var plain = String.fromCharCode((lowerCharCode - 97 + 13) % 26 + 97);
    return c.toUpperCase() === c ? plain.toUpperCase() : plain;

  }).join("");
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  chrome.tabs.executeScript(tab.id, {code: 'var plainText = "' + decrypt(info.selectionText) + '";'}, function() {
    chrome.tabs.executeScript(tab.id, {file: "replace_text.js"});
  })
  
});

chrome.contextMenus.create({
  id: 'rot13',
  title: "Rot13",
  contexts: ['selection']
});