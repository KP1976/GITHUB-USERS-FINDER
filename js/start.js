document.addEventListener('DOMContentLoaded', function() {
  App.init({
    userProfileAndRepoContainer: this.querySelector('.user-profile-and-repo-container'),
    userInput: this.querySelector('.user-search-input')
  });
});