function rot13(str) {
  return str.split("").map(function(c) {
    var lowerCharCode = c.toLowerCase().charCodeAt(0);

    if (lowerCharCode < 97 || lowerCharCode > 122) return c;

    var plain = String.fromCharCode((lowerCharCode - 97 + 13) % 26 + 97);
    return c.toUpperCase() === c ? plain.toUpperCase() : plain;

  }).join("");
}


if (document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT") {
  var ta = document.activeElement;
  var start = ta.selectionStart;
  var end = ta.selectionEnd;

  ta.value = ta.value.slice(0, start) + rot13(ta.value.slice(start, end)) + ta.value.slice(end);

  // Set selection back to its original position
  ta.selectionStart = start;
  ta.selectionEnd = end;
}
else {
  var sel = window.getSelection();
  for (var r = 0; r < sel.rangeCount; ++r) {
    var range = sel.getRangeAt(0);
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;

    var selectedTextNodes = document.createNodeIterator(
      range.commonAncestorContainer, NodeFilter.SHOW_TEXT, function(n) {
        // we don't want to change <style> and <script> elements
        var parent = n.parentNode.nodeName.toLowerCase();
        if (parent === "style" || parent === "script")
          return NodeFilter.FILTER_REJECT;

        return sel.containsNode(n, true) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    );

    var node;
    while (node = selectedTextNodes.nextNode()) {
      // Work around a bug(?) in containsNode that unexpectedly returns true for
      // the first text node in the element AFTER the selection
      if(range.endContainer !== range.startContainer &&
         range.endContainer.nodeType !== Node.TEXT_NODE &&
         range.endContainer.contains(node))
        continue;

      var begin = (node == range.startContainer ? startOffset : 0);
      var end   = (node == range.endContainer ? endOffset : Infinity);
      var text = node.nodeValue;
      node.nodeValue = text.slice(0, begin) + rot13(text.slice(begin, end)) + text.slice(end);
    }

    // Set selection back to its original position
    range.setStart(range.startContainer, startOffset);
    range.setEnd(range.endContainer, endOffset);
  }
}
