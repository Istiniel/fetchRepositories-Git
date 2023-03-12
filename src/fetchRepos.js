export default async function fetchRepos(topic) {
  let endpoint = `https://api.github.com/search/repositories?q=${topic}&per_page=10&page=1`;
  let repos;
  try {
    let response = await fetch(endpoint, {
      accept: 'application/vnd.github.text-match+json',
    });

    if (response.status == '200') {
      response = await response.json();
      repos = [...response.items];
    } else {
      throw new Error(
        response.status +
          'Connection error while fetching repos by name: ' +
          topic
      );
    }
  } catch (error) {
    console.log(error.message);
  }

  return repos;
}
