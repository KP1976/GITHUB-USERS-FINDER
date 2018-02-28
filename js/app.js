const App = (_=>{
  const gitHub = new GitHub();
  
  function showUserProfile(user, container) {
    const userName = `<span class="user-name">${user.login}</span>`;
    const userProfileContainer = document.createElement('div');

    userProfileContainer.classList.add('user-profile-container');

    userProfileContainer.innerHTML = `
      <figure class="user-img-wrapper">
        <img class="user-picture" src="${user.avatar_url}" alt="zdjęcie użytkownika"></img>
        <a class="user-profile-btn" href="${user.html_url}" target="_blank"><i class="fab fa-github"></i>wejdź na profil</a>
      </figure>
      <h2 class="user-data-title">dane użytkownika</h2>
      <ul class="user-data-list">
        <li class="user-data-items">
          <h3 class="user-data-subtitle">Data założenia konta:</h3>
          <span class="user-data date">${user.created_at}</span>
        </li>
        <li class="user-data-items">
          <h3 class="user-data-subtitle">Lokalizacja:</h3>
          <span class="user-data localization">${user.location}</span>
        </li>
        <li class="user-data-items">
          <h3 class="user-data-subtitle">Strona/Blog:</h3>
          <span class="user-data blog">${user.blog}</span>
        </li>
        <li class="user-data-items">
          <h3 class="user-data-subtitle">Firma:</h3>
          <span class="user-data company">${user.company}</span>
        </li>
        <li class="user-data-box">Repozytoria: <span class="user-data-repos">${user.public_repos}</span></li>
        <li class="user-data-box">Gisty: <span class="user-data-gists">${user.public_gists}</span></li>
        <li class="user-data-box">Obserwowany: <span class="user-data-followers">${user.followers}</span></li>
        <li class="user-data-box">Obserwuje: <span class="user-data-following">${user.following}</span></li>
      </ul>
    `;

    return { userName, userProfileContainer };
  }

  function showUserRepository(userRepo, userProfileContainer) {
    const userRepoList = document.createElement('ul');
    const userRepoTitle = document.createElement('h2');
    // const userRepoTitle = `<h2 class="user-repo-title">najnowsze repozytoria</h2>`;

    userRepoTitle.classList.add('user-repo-title');
    userRepoTitle.textContent = 'najnowsze repozytoria';

    let output = '';
    
    userRepoList.classList.add('user-repo-list');
    
    userRepo.forEach(repo => {
      output += `
      <li class="user-repo-container">
      <a class="user-repo-name" href="${repo.html_url}" target="_blank">${repo.name}</a>
      <div class="user-repo-box">Gwiazdki: <span class="user-repo-stars">${repo.stargazers_count}</span></div>
      <div class="user-repo-box">Obserwujący: <span class="user-repo-watchers">${repo.watchers_count}</span></div>
      <div class="user-repo-box">Forki: <span class="user-repo-forks">${repo.forks_count}</span></div>
      </li>
      `;
    });
    
    userRepoList.innerHTML = output;
    userProfileContainer.userProfileContainer.insertAdjacentElement('beforeend', userRepoTitle);
    userProfileContainer.userProfileContainer.insertAdjacentElement('beforeend', userRepoList);

    const toString = userProfileContainer.userName + userProfileContainer.userProfileContainer.outerHTML;
    
    vars.userProfileAndRepoContainer.innerHTML = toString;
  }
  
  function userSearch(e) {
    const userName = e.target.value;
    const container = this.parentNode.parentNode;
    const searchBox = e.target.parentNode;
    const wholeContainer = this.parentNode.nextElementSibling;
    
    if(userName !== '') {
      gitHub.getUserProfile(userName)
      .then(value => {
        if(value.message === 'Not Found') {
          if(document.querySelector('.alert-message')) {
            document.querySelector('.alert-message').remove();
          }
          createWarning(searchBox, userName);
        } else {
          const userProfileContainer = showUserProfile(value, container);
          gitHub.getUserRepos(userName)
          .then(value => {
            showUserRepository(value, userProfileContainer);
          });
        }
      })
      .catch(err => console.log(err));
    } else {
      document.querySelector('.user-profile-and-repo-container').innerHTML = '';
    }
  }

  function createWarning(searchBox, userName) {
    const div = document.createElement('div');
  
    div.classList.add('alert-message');
    div.textContent = `Użytkownik ${userName} nie istnieje...`;
    
    setTimeout(_=> div.remove(), 2000);
    searchBox.insertAdjacentElement('beforeend', div);
  }
  
  function init(_vars) {
    vars = _vars;
    vars.userInput.addEventListener('keyup', userSearch);
  }

  return { init };
})();