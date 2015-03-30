var app = app || {};

// Determines which size images to use in the app
app.mediaQuery = function () {
  if ($(window).width > 1200) {
    return 'portrait_fantastic'
  } else if ($(window).width > 992) {
    return 'portrait_xlarge'
  } else if ($(window).width > 768) {
    return 'portrait_medium'
  } else {
    return 'portrait_small'
  }
}