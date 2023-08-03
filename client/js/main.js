$(document).ready(function () {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var local = urlParams.get("local");  

  var wsURL = "your.ws.com";

  if (local) {
    wsURL = "10.1.0.88:8180";
  }

  $("#send").click(function () {
    var envio = {};

    var host = "https://your.api.com";
    var path =
      host + "/yourEndPoint";
    envio.nome = document.getElementById("nome").value;
    envio.cpfResponsavel = document.getElementById("cpf").value;
    envio.senhaVelorioVirtual = document.getElementById("senha").value;
    envio.emailResponsavel = document.getElementById("email").value;

    if (!envio.nome) {
      alert("Preencha o nome");
    } else if (!envio.cpfResponsavel) {
      alert("Preencha o CPF");
    } else if (!envio.senhaVelorioVirtual) {
      alert("Preencha a senha");
    } else if (!envio.emailResponsavel) {
      alert("Preencha o e-mail");
    } else {
      var settings = {
        url: path,
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(envio),
      };

      $.ajax(settings)
        .done(function (response) {
          document.getElementById("container").style.display = "none";

          console.log(response);
          player = new JSMpeg.Player(
            "wss://" + wsURL + "/api/stream/?ip=" + response.urlSalaVelorioVirtual,
            {
              canvas: document.getElementById("player-canvas"), // Canvas should be a canvas DOM element
            }
          );
        })
        .fail(function (data) {
          alert(JSON.stringify(data.responseText));
          document.getElementById("container").style.display = "block";
        });
    }
  });

  $("#sair").click(function () {
    player.destroy();
    document.getElementById("container").style.display = "block";
  });

  $("#testeClick").click(function () {
    player = new JSMpeg.Player("wss://" + wsURL + "/api/stream/0.0.0.0", {
      canvas: document.getElementById("player-canvas"), // Canvas should be a canvas DOM element
    });
  });
});
