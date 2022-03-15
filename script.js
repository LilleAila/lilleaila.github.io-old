const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const username = urlParams.get("user") || "LilleAila";

$.ajax({
  dataType: "json",
  type: "get",
  url: `https://api.github.com/users/${username}/repos`,
  success: (data) => {
    // console.log(data);

    for (let i = 0; i < data.length; i++) {
      const current = data[i];

      //   console.log(current);

      const name = $("<a>")
        .addClass("name")
        .text(current.name)
        .attr("href", current.html_url);
      const language = $("<span>").addClass("language").text(current.language);

      const element = $("<div>").addClass("repo").append(name).append(language);

      $(".repos").append(element);
    }
  },
  error: console.log,
});

$.ajax({
  dataType: "json",
  type: "get",
  url: `https://api.github.com/users/${username}`,
  success: (data) => {
    $(".avatar").attr("src", data.avatar_url);
    $(".username").text(data.login).attr("href", data.html_url);
    $(".bio").text(data.bio);
    $(".reposCount").text(`Repos: ${data.public_repos}`);
  },
  error: () => {
    alert("User does not exist");
    setUser();
  },
});

const setUser = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("user", prompt("User", username));
  window.location.href = url;
};

$(".avatar").on("click", setUser);
