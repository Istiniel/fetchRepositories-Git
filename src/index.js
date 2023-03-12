import './styles/App.scss';
import reposCreator from './reposCreator.js';
import fetchRepos from './fetchRepos.js';
import { validateInput } from './validateInputs.js';

let reposContainer = document.querySelector('.git-repos__container');
let fetchReposForm = document.forms['fetch-repos'];

// if repos with current topic not found
let notfoundMessage = document.createElement('h2');
notfoundMessage.className = 'repo__notfound';
notfoundMessage.textContent = 'Nothing has found';

// add empty table at start
let reposTable = new reposCreator([]).buildTable();
reposContainer.append(reposTable);

fetchReposForm.addEventListener('submit', submitForm);

function submitForm(event) {
  let topicInput = fetchReposForm['repo-name'];

  // validate name input value
  let validationMessage = validateInput(topicInput.value);
  if (validationMessage) {
    topicInput.focus();
    topicInput.classList.add('invalid');

    showTooltip(validationMessage, topicInput);
    event.preventDefault();
    return;
  } else {
    fetchRepos(topicInput.value).then((repos) => {
      // no matches with topic
      if (repos.length == 0) {
        reposTable.replaceWith(notfoundMessage);
        reposTable = notfoundMessage;
        event.preventDefault();
        return;
      }

      let newRepos = new reposCreator(repos).buildTable();
      reposTable.replaceWith(newRepos);
      reposTable = newRepos;
    });
  }

  event.preventDefault();
}

function showTooltip(message, input) {
  let label = input.parentElement;
  label.dataset.tooltip = message;
}

// delete validation tooltips when filling the input
for (const input of fetchReposForm.elements) {
  input.addEventListener('input', (e) => {
    // delete all red outlines
    for (const input of fetchReposForm.elements) {
      input.classList.remove('invalid');

      // delete all tooltips
      let label = input.parentElement;
      label.dataset.tooltip = '';
    }
  });
}

// delete validation tooltips when clicking outside
document.addEventListener('click', function (event) {
  if (![...fetchReposForm.elements].includes(event.target)) {
    for (const input of fetchReposForm.elements) {
      input.classList.remove('invalid');

      // delete all tooltips
      let label = input.parentElement;
      label.dataset.tooltip = '';
    }
  }
});
