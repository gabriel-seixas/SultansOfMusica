<!-- src/routes/+page.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';

  const artists = [
    {
      name: 'Alice In Chains',
      genre: 'Grunge Rock — 1987',
      image: 'https://cdn.bandmix.eu/bandmix_eu/media/129/129758/127636-l.jpg',
      link: '/artist/alice-in-chains'
    },
    {
      name: 'Black Sabbath',
      genre: 'Heavy Metal — 1968',
      image: 'https://preview.redd.it/what-is-your-favorite-black-sabbath-song-and-why-v0-vm0p70ho58vg1.jpeg?auto=webp&s=cb360f63aac7d5c320465f5380ab5fa29e48ff2c',
      link: '/artist/black-sabbath'
    },
    {
      name: 'Creedence Clearwater Revival',
      genre: 'Blues Rock, Country Rock — 1967',
      image: 'https://imgs.search.brave.com/d34NO2NjdorxoeBErUZPHqn2VYDv1nPuNJYBw3zj028/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTIw/MDc5Njc0L3B0L2Zv/dG8vYW1lcmljYW4t/cm9jay1iYW5kLWNy/ZWVkZW5jZS1jbGVh/cndhdGVyLXJldml2/YWwtcG9zZS1mb3It/YS1ncm91cC1wb3J0/cmFpdC1pbi1vYWts/YW5kLWNhLWluLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz14/SW8tMks2M0E4b0tf/bXFiQW1Fd3VxY0xF/cXdxVEtHTHZUOXJT/LUFDU3NFPQ',
      link: '/artist/creedence-clearwater-revival'
    }
  ];

  const decades = [
    { decade: '1960', image: 'https://i.redd.it/5l6gqunyi1a41.jpg', link: '/catalog?decade=1960' },
    { decade: '1970', image: 'https://i.pinimg.com/736x/9e/fa/57/9efa57f7d727634f761399d12e7662bb.jpg', link: '/catalog?decade=1970' },
    { decade: '1980', image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/527b5476-b1e0-40b6-86f2-acd8b5778396/dc9mi9y-a4e86a98-3875-4b03-8a10-b1c4fb909dd0.jpg/v1/fill/w_1212,h_659,q_70,strp/michael_jackson_bad__wallpaper_edition__by_historymjjackson_dc9mi9y-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njk2IiwicGF0aCI6Ii9mLzUyN2I1NDc2LWIxZTAtNDBiNi04NmYyLWFjZDhiNTc3ODM5Ni9kYzltaTl5LWE0ZTg2YTk4LTM4NzUtNGIwMy04YTEwLWIxYzRmYjkwOWRkMC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.BhuSt3AUSlhxfGPE9-J9IXFF_pD-rOipl0SBvrbBR1Y', link: '/catalog?decade=1980' },
    { decade: '1990', image: 'https://i.pinimg.com/736x/3b/57/b3/3b57b356dda03d232ec5bf063c63af24.jpg', link: '/catalog?decade=1990' },
    { decade: '2000', image: 'https://wallpapercave.com/wp/wp2033910.png', link: '/catalog?decade=2000' }
  ];
</script>

<Header />

<main>
  <!-- HERO -->
  <section class="hero">
    <div class="overlay"></div>
    <div class="hero-content">
      <h1>Novidades da Semana</h1>
      <p>Confira o catálogo semanal atualizado!</p>
      <button on:click={() => document.getElementById('secao')?.scrollIntoView({ behavior: 'smooth' })}>
        Conferir
      </button>
    </div>
  </section>

  <!-- CATÁLOGO -->
  <div class="catalogo" id="secao">
    <h2>Catálogo</h2>

    <!-- ARTISTAS -->
    <section class="secao">
      <div class="secao-top">
        <h3>Mídias por Artistas</h3>
        <a href="/catalog">Navegar por Todos os Artistas →</a>
      </div>

      <div class="cards-artistas">
        {#each artists as artist}
          <a href="/catalog" class="card">
            <img src={artist.image} alt={artist.name} />
            <h4>{artist.name}</h4>
            <p>{artist.genre}</p>
          </a>
        {/each}
      </div>
    </section>

    <!-- DÉCADAS -->
    <section class="secao">
      <div class="secao-top">
        <h3>Mídias por Décadas</h3>
        <a href="/catalog">Navegar por Todas as Décadas →</a>
      </div>

      <div class="cards-decadas">
        {#each decades as dec}
          <a href="/catalog" class="decada">
            <img src={dec.image} alt={`Década de ${dec.decade}`} />
            <span>{dec.decade}</span>
          </a>
        {/each}
      </div>
    </section>
  </div>
</main>

<footer class="footer">
  © 2026 Sultans of Music LTDA. Todos os direitos reservados.
</footer>

<style>
  :global(body) {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #f5f5f5;
  }

  /* HERO */
  .hero {
    position: relative;
    width: 100%;
    height: 650px;
    background: url('https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/4/2/1396456711572/45abaa1b-a265-4ef7-89d7-4dbe0c43f5b6-2060x1236.jpeg?width=700&quality=85&auto=format&fit=max&s=d9d08313c74af55679dda287a0e3a9cc');
    background-size: cover;
    background-position: top;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.35);
    backdrop-filter: grayscale(100%);
  }
  .hero-content {
    position: relative;
    text-align: center;
    color: white;
    z-index: 2;
  }
  .hero-content h1 {
    font-size: 68px;
    color: #ffcc00;
    margin-bottom: 15px;
  }
  .hero-content p {
    font-size: 20px;
    margin-bottom: 30px;
  }
  .hero-content button {
    width: 170px;
    height: 55px;
    border: none;
    border-radius: 10px;
    background: #ffcc00;
    color: black;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: .3s;
  }
  .hero-content button:hover {
    transform: scale(1.05);
  }

  /* CATÁLOGO */
  .catalogo {
    width: 100%;
    padding: 70px 80px;
  }
  .catalogo h2 {
    text-align: center;
    font-size: 70px;
    margin-bottom: 60px;
  }

  .secao {
    margin-bottom: 80px;
  }
  .secao-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }
  .secao-top h3 {
    font-size: 28px;
  }
  .secao-top a {
    color: #ffb700;
    text-decoration: none;
    font-size: 14px;
  }

  /* CARDS ARTISTAS */
  .cards-artistas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  .card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: .3s;
  }
  .card:hover {
    transform: translateY(-6px);
  }
  .card img {
    width: 100%;
    height: 690px;
    object-fit: cover;
    filter: grayscale(100%);
  }
  .card h4 {
    font-size: 20px;
    margin: 15px;
  }
  .card p {
    margin: 0 15px 20px;
    color: #777;
    font-size: 14px;
  }

  /* DÉCADAS */
  .cards-decadas {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
  }
  .decada {
    position: relative;
    width: 250px;
    height: 340px;
    overflow: hidden;
    border-radius: 10px;
    display: block;
  }
  .decada img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: .4s;
  }
  .decada:hover img {
    transform: scale(1.08);
  }
  .decada span {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffcc00;
    font-size: 28px;
    font-weight: 700;
  }

  /* FOOTER */
  .footer {
    width: 100%;
    padding: 25px;
    background: black;
    color: #ffcc00;
    text-align: center;
    font-size: 13px;
  }

  /* RESPONSIVO */
  @media(max-width: 1000px) {
    .hero-content h1 {
      font-size: 50px;
    }
    .catalogo {
      padding: 50px 30px;
    }
    .catalogo h2 {
      font-size: 48px;
    }
    .secao-top {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
  @media(max-width: 700px) {
    .hero {
      height: 500px;
    }
    .hero-content h1 {
      font-size: 38px;
    }
    .hero-content p {
      font-size: 16px;
    }
    .cards-decadas {
      justify-content: center;
    }
  }
</style>