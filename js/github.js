class GitHub {
  constructor() {
    this.clientID = 'e9e595b821303bfdfa0a';
    this.clientSecret = 'd5b60c4fca1e4c30e7ed1f17f11d55f7038b0436';
    this.reposCount = 10;
    this.reposSort = 'created: asc'; 
  }

  getAPIData(user) {
    const profileData = fetch(`https://api.github.com/users/${user}?client_id=${this.clientID}&client_secret=${this.clientSecret}`)
    .then(res => res.json());
    const repoData = fetch(`https://api.github.com/users/${user}/repos?per_page=${this.reposCount}&sort=${this.reposSort}&client_id=${this.clientID}&client_secret=${this.clientSecret}`)
    .then(res => res.json());

    return {
      profileData,
      repoData
    };
  }
}

const test = new GitHub();
console.log(test.getAPIData('kp1976'));