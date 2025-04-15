const { exec } = require("node:child_process")

function checkPostgres() {
  // exec("docker exec postgres-dev pg_isready", handleReturn);
  exec(`pg_isready -h localhost -p 5432 -U ${process.env.POSTGRES_USER}`, handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      // console.log("Não está aceitando conexões ainda.")
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n\n💚 Postgres está pronto e aceitando conexões.\n\n")
  }
}

process.stdout.write("\n\n🔴 Aguardando postgres aceitar conexões")
checkPostgres();
