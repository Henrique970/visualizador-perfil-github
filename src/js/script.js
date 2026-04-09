const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const profileResults = document.querySelector(".profile-results");

const BASE_URL = "https://api.github.com"

btnSearch.addEventListener("click", async () => {
    const userName = inputSearch.value;
    if (userName) {
        profileResults.innerHTML = `<p>Carregando...</p>`

        try {

            const response = await fetch(`${BASE_URL}/users/${userName}`);

            if (!response.ok) {
                alert("Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.");
                profileResults.innerHTML = "";
                return;
            }

            const userData = await response.json();

            console.log(userData.avatar_url);
            console.log(userData.name);
            console.log(userData.bio);
            console.log(userData.followers);
            console.log(userData.following);

            profileResults.innerHTML = `
                <div class="profile-card">
                    <img src="${userData.avatar_url}" alt="Avatar de ${userData.name}" class="profile-avatar">
                    <div> 
                        <h2> ${userData.name} </h2>
                        <p> ${userData.bio || "Não possui bio cadastrada...😢"} </p>
                        <p> SEGUIDORES: ${userData.followers} SEGUINDO: ${userData.following} </p>
                    </div>
                </div>
            `

        } catch (error) {
            console.error("Erro ao buscar o perfil do usuário:", error);
            alert("Ocorreu um erro ao buscar o perfil do usuário. Por favor, tente novamente mais tarde.")
        }

    } else {
        alert("Por favor, digite um nome de usuário do GitHub para buscar.");
        profileResults.innerHTML = "";
    }
});