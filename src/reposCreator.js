export default class reposCreator {
  constructor(repos) {
    this.repos = repos;
  }

  buildTable() {
    let table = document.createElement('table');
    table.className = 'git-repos__header';

    table.append(this.createTableHead());
    table.append(this.createTableBody());

    return table;
  }

  createTableHead() {
    let tHead = document.createElement('thead');
    tHead.className = 'git-repos__header';
    let tr = document.createElement('tr');

    let name = document.createElement('td');
    name.className = 'git-repos__name';
    name.textContent = 'Name';

    let author = document.createElement('td');
    author.className = 'git-repos__author';
    author.textContent = 'Author';

    let description = document.createElement('td');
    description.className = 'git-repos__description';
    description.textContent = 'Description';

    tr.append(name, author, description);
    tHead.append(tr);

    return tHead;
  }

  createTableBody() {
    let tBody = document.createElement('tbody');
    tBody.className = 'git-repos__body';

    for (const repo of this.repos) {
      tBody.append(this.createRepo(repo));
    }

    return tBody;
  }

  createRepo(repo) {
    let tr = document.createElement('tr');
    tr.classList.add('git-repos__repo', 'git-repo');

    let linkToRepo = document.createElement('a');
    linkToRepo.className = 'git-repo__repolink';
    linkToRepo.setAttribute('href', repo.html_url);
    linkToRepo.setAttribute('target', '_blank');
    linkToRepo.textContent = repo.name;

    let name = document.createElement('td');
    name.className = 'git-repo__name';

    name.append(linkToRepo);

    let author = document.createElement('td');
    author.className = 'git-repo__author';
    author.innerHTML = `${repo.owner.login} <br>${repo.owner.id}`;

    let description = document.createElement('td');
    description.className = 'git-repo__description';
    description.textContent = repo.description;

    tr.append(name, author, description);
    return tr;
  }
}
