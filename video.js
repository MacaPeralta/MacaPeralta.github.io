/* YouTube videos on project pages.
   Each video starts as a thumbnail link (.yt). On the hosted site, clicking it
   swaps in the YouTube player. When a page is opened straight from disk
   (file://), YouTube refuses to play embeds (error 153), so the link just
   opens the video on YouTube in a new tab instead. */
(function () {
  var hosted = location.protocol === 'http:' || location.protocol === 'https:';

  document.querySelectorAll('.yt').forEach(function (link) {
    var id = link.getAttribute('data-yt');
    var img = link.querySelector('img');

    // Fall back to the standard thumbnail when there's no high-res one
    img.addEventListener('error', function () {
      if (img.src.indexOf('hqdefault') === -1) img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
    });

    if (!hosted) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = link.getAttribute('aria-label') || 'YouTube video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      var box = document.createElement('div');
      box.className = 'embed';
      box.appendChild(frame);
      link.replaceWith(box);
    });
  });
})();
