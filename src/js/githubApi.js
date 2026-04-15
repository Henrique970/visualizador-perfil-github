const BASE_URL = 'https://api.github.com';

export async function fetchGithubUser(userName) {
  const response = await fetch(`${BASE_URL}/users/${userName}`);
  if (!response.ok) {
    throw new Error('Usuário não encontrado.');
  }
  return await response.json();
};

export async function fetchGithubRepos(userName) {
  // ?per_page=10 para limitar a quantidade de repositórios retornados para 10, evitando sobrecarregar a interface.
  // &sort=created para ordenar os repositórios pela data de criação, mostrando os mais recentes primeiro.
  // Esses parâmetros mostram os 10 últimos repositórios criados.
  const response = await fetch (`${BASE_URL}/users/${userName}/repos?per_page=10&sort=created`);
  if (!response.ok) {
    throw new Error("Repositórios do usuário não encontrados.");
  }
  return await response.json();
};
