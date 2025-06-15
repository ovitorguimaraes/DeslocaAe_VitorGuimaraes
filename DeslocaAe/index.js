function mostrarCriarConta() {
    document.getElementById("form-login").classList.add("oculto");
    document.getElementById("form-criar").classList.remove("oculto");
    document.getElementById("form-recuperar").classList.add("oculto");
  }
  
  function mostrarLogin() {
    document.getElementById("form-login").classList.remove("oculto");
    document.getElementById("form-criar").classList.add("oculto");
    document.getElementById("form-recuperar").classList.add("oculto");
  }
  
  function mostrarRecuperarSenha() {
    document.getElementById("form-login").classList.add("oculto");
    document.getElementById("form-criar").classList.add("oculto");
    document.getElementById("form-recuperar").classList.remove("oculto");
  }
  
  function criarConta() {
  const nome = document.getElementById("criar-nome").value;
  const email = document.getElementById("criar-email").value;
  const telefone = document.getElementById("criar-telefone").value;
  const senha = document.getElementById("criar-senha").value;
  const confirmar = document.getElementById("criar-confirmar").value;
  const mensagem = document.getElementById("mensagem-criar");

  if (!nome || !email || !telefone || !senha || !confirmar) {
    mensagem.textContent = "Preencha todos os campos.";
    return;
  }

  if (senha !== confirmar) {
    mensagem.textContent = "As senhas não coincidem.";
    return;
  }

  fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(usuarios => {
      const jaExiste = usuarios.find(user => user.email === email || user.telefone === telefone);

      if (jaExiste) {
        mensagem.textContent = "E-mail ou telefone já cadastrado.";
      } else {
        fetch("http://localhost:3000/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, telefone, senha })
        })
        .then(() => {
          mensagem.textContent = "Conta criada com sucesso!";
          document.getElementById("criar-nome").value = "";
          document.getElementById("criar-email").value = "";
          document.getElementById("criar-telefone").value = "";
          document.getElementById("criar-senha").value = "";
          document.getElementById("criar-confirmar").value = "";
        });
      }
    });
}
  
  function login() {
  const identificador = document.getElementById("login-identificador").value;
  const senha = document.getElementById("login-senha").value;
  const mensagem = document.getElementById("mensagem-login");

  fetch("http://localhost:3000/usuarios")
    .then(res => res.json())
    .then(usuarios => {
      const usuario = usuarios.find(
        user => (user.email === identificador || user.telefone === identificador) && user.senha === senha
      );

      if (usuario) {
        window.location.href = 'feedbacks.html';
      } else {
        mensagem.textContent = "Usuário ou senha incorretos.";
      }
    });
}
  
  