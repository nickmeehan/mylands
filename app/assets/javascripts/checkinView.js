function CheckinView (checkinViewSelectors) {
  this.checkinsWithArtist = checkinViewSelectors['checkinsWithArtist']
  this.exitButton = checkinViewSelectors['exitButton']
}

CheckinView.prototype = {
  getCheckinsWithArtistSelector: function () {
    return $(this.checkinsWithArtist);
  },
  getExitButton: function () {
    return $(this.exitButton);
  },
  showArtistDetails: function (artist) {
    $('.artist-details').removeClass('hidden');
    console.log($('.artist-details .artist-name'));
    $('.artist-details .artist-name').text(artist.name);
    $('.artist-details .artist-genre').text(artist.genres[0].name.capitalize());
    $('.artist-photo').attr('src',artist.images[0].url);
  },
  hideArtistDetails: function () {
    $('.artist-details').addClass('hidden');
  }
}