// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  chrome.tabs.executeScript(tab.id, {file: "replace_text.js"});
});

chrome.contextMenus.create({
  id: 'rot13',
  title: "Rot13",
  contexts: ['selection']
});
