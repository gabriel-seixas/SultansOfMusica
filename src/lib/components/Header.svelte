<script lang="ts">
  let searchQuery = '';
</script>

<svelte:head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</svelte:head>

<header class="header">
  <nav class="nav-left">
    <a href="/catalog">Artistas</a>
  </nav>


  <a class="logo" href="/">
Sultans of <span>Music</span>
</a>

  <form action="/search" method="GET" class="search-bar">
    <input
      type="text"
      name="q"
      placeholder="Buscar produtos..."
      bind:value={searchQuery}
      required
    />
    <button type="submit" aria-label="Buscar">
      <i class="glyphicon glyphicon-search"></i>
    </button>
  </form>


  <div class="nav-right">
    <a href="/login" class="nav-icon" aria-label="Usuário" data-sveltekit-preload-data="off">
      <i class="glyphicon glyphicon-user"></i>
    </a>
    <a href="/cart" class="nav-icon" aria-label="Carrinho" data-sveltekit-preload-data="off">
      <i class="glyphicon glyphicon-shopping-cart"></i>
    </a>
  </div>
</header>

<style>
  .header {
    width: 100%;
    height: 70px;
    background: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    border-top: 2px solid #ffcc00;
  }
  .nav-left {
    display: flex;
    gap: 25px;
    align-items: center;
  }
  .nav-left a {
    text-decoration: none;
    color: #ffcc00;
    font-size: 14px;
    transition: 0.3s;
  }
  .nav-left a:hover {
    opacity: 0.7;
  }

  /* .search-bar {
    display: flex;
    align-items: center;
    background: #1a1a1a;
    border: 1px solid #ffcc00;
    border-radius: 20px;
    padding: 0 10px;
    height: 36px;
    width: 280px;
    transition: border-color 0.3s;
  }
  .search-bar:focus-within {
    border-color: #ffe066;
  }
  .search-bar input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    padding: 5px 0;
    outline: none;
  }
  .search-bar input::placeholder {
    color: #aaa;
  }
  .search-bar button {
    background: none;
    border: none;
    color: #ffcc00;
    font-size: 16px;
    cursor: pointer;
    padding: 0 5px;
    transition: opacity 0.3s;
  }
  .search-bar button:hover {
    opacity: 0.7;
  } */

  .logo {
    color: white;
    font-family: 'Princess Sofia', cursive;
    font-size: 42px;
    margin: 0 20px;
    text-decoration: none;
  }
  .logo span {
    color: #ffcc00;
  }

  .nav-right {
    display: flex;
    gap: 30px;
    color: #ffcc00;
    align-items: center;
    font-size: 14px;
  }
  .nav-icon {
    color: #ffcc00;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: 0.3s;
  }
  .nav-icon:hover {
    opacity: 0.7;
  }

   .search-bar {
    display: flex;
    align-items: center;
    background: #1a1a1a;
    border: 1px solid #ffcc00;
    border-radius: 20px;
    padding: 0 10px;
    height: 36px;
    width: 280px;
    transition: border-color 0.3s;
  }
  .search-bar:focus-within {
    border-color: #ffe066;
  }
  .search-bar input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    padding: 5px 0;
    outline: none;
  }
  .search-bar input::placeholder {
    color: #aaa;
  }
  .search-bar button {
    background: none;
    border: none;
    color: #ffcc00;
    font-size: 16px;
    cursor: pointer;
    padding: 0 5px;
    transition: opacity 0.3s;
  }
  .search-bar button:hover {
    opacity: 0.7;
  }

  @media (max-width: 900px) {
    .header {
      flex-wrap: wrap;
      height: auto;
      gap: 12px;
      padding: 15px 20px;
    }
    .search-bar {
      order: 2;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    .logo {
      order: 1;
      margin: 0;
    }
    .nav-left, .nav-right {
      order: 3;
    }
  }
</style>
