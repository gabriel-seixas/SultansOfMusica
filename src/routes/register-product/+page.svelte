<!-- src/routes/registrar-produto/+page.svelte -->
<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { searchArtist } from '$lib/audiodb/client';
  import { enhance } from '$app/forms';
  import { onDestroy } from 'svelte';
let debounceTimer: ReturnType<typeof setTimeout>;

async function fetchArtist() {
  if (!artistName.trim()) {
    artistApiId = '';
    return;
  }
  try {
    const artists = await searchArtist({ query: artistName });
    if (artists.length > 0) {
      const a = artists[0];
      artistApiId = a.idArtist;
      artistName = a.strArtist;
      error = '';
    } else {
      artistApiId = '';
      error = 'Artista não encontrado.';
    }
  } catch (e) {
    error = 'Erro ao buscar artista.';
    artistApiId = '';
  }
}

// Dispara a busca após 500ms de inatividade
function onArtistInput() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchArtist, 500);
}

onDestroy(() => clearTimeout(debounceTimer));

function handleEnhance() {
  error = '';
  success = '';
  return async ({ result }) => {
    if (result.type === 'success') {
      success = 'Produto registrado com sucesso!';
      // opcional: resetar campos
    } else if (result.type === 'failure') {
      error = result.data?.error || 'Erro desconhecido.';
    }
  };
}

  let title = '';
  let artistName = '';
  let artistApiId = '';
  let price = 0;
  let productCode = '';
  let description = '';
  let releaseDate = '';
  let asin = '';
  let stock = 1;
  let mainImageUrl = '';

  let error = '';
  let success = '';

  async function lookupArtist() {
    if (!artistName.trim()) return;
    try {
      const artists = await searchArtist({ query: artistName });
      if (artists.length > 0) {
        const a = artists[0];
        artistApiId = a.idArtist;
        artistName = a.strArtist;
      } else {
        error = 'Artista não encontrado.';
      }
    } catch (e) {
      error = 'Erro ao buscar artista.';
    }
  }
</script>

<Header />

<div class="page">
  <section class="product-page">
    <div class="gallery">
      <!-- Imagem principal (visual, fora do form) -->
      <div class="main-image">
        {#if mainImageUrl}
          <img src={mainImageUrl} alt="Capa principal" />
        {:else}
          <div class="upload-placeholder">
            <i class="ph ph-image-square"></i>
            <i class="ph ph-link"></i>
          </div>
        {/if}
        <input
          type="url"
          class="url-input"
          placeholder="Cole o link da imagem principal"
          bind:value={mainImageUrl}
        />
      </div>
    </div>

    <!-- FORMULÁRIO PRINCIPAL (todos os dados vão aqui) -->
    <form method="POST" use:enhance={handleEnhance} class="details">
      <div class="form-group">
        <label for="title">Nome do álbum</label>
        <input id="title" name="title" type="text" placeholder="Nome do álbum" bind:value={title} required />
      </div>

      <div class="form-group">
        <label for="artistName">Artista/Banda</label>
        <div class="artist-search">
          <input id="artistName" name="artistName" type="text" placeholder="Artista/Banda"
  bind:value={artistName}
  on:input={onArtistInput} required />
          <!-- <button type="button" on:click={lookupArtist} title="Buscar artista na TheAudioDB">
            <i class="ph ph-magnifying-glass"></i>
          </button> -->
        </div>
        {#if artistApiId}
          <small>ID Artista: {artistApiId}</small>
          <input type="hidden" name="artistApiId" value={artistApiId} />
        {/if}
      </div>

      <div class="price-box">
        <label for="price">Preço</label>
        <input id="price" name="price" type="number" step="0.01" min="0" placeholder="0.00" bind:value={price} required />
      </div>

      <div class="form-group">
        <label for="productCode">API-ID (código único)</label>
        <input id="productCode" name="productCode" type="text" placeholder="Ex: OKC-1997-001" bind:value={productCode} required />
      </div>

      <div class="form-group">
        <label for="releaseDate">Data de Lançamento</label>
        <input id="releaseDate" name="releaseDate" type="text" placeholder="AAAA-MM-DD" bind:value={releaseDate} required />
      </div>

      <div class="form-group">
        <label for="stock">Estoque</label>
        <input id="stock" name="stock" type="number" placeholder="10" bind:value={stock} required />
      </div>

      <!-- Campo oculto para a imagem -->
      <input type="hidden" name="mainImageUrl" value={mainImageUrl} />

      <!-- Outros campos opcionais -->
      <input type="hidden" name="asin" value={asin} />
      <input type="hidden" name="description" value={description} />

      {#if error}
        <div class="alert error">{error}</div>
      {/if}
      {#if success}
        <div class="alert success">Produto registrado com sucesso!</div>
      {/if}

      <button type="submit" class="buy-btn">Registrar Novo Produto</button>
    </form>
  </section>

  <footer class="footer">
    © 2026 Sultans of Music LTDA. Todos os direitos reservados.
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Princess+Sofia&display=swap');
  @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
  @import url('https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css');

  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Poppins', sans-serif; background:#f5f5f5; }

  .product-page { display:flex; gap:80px; padding:20px 60px 80px; }
  .gallery { flex:1; }

  .main-image { width:100%; max-width:650px; margin-bottom:30px; position:relative; }
  .main-image img { width:100%; max-height:520px; object-fit:contain; border-radius:12px; }
  .upload-placeholder {
    width:100%; height:400px; background:#ececec; border-radius:12px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    position:relative;
  }
  .upload-placeholder i:first-child { font-size:160px; color:#999; }
  .upload-placeholder i:last-child { font-size:40px; color:#999; margin-top:10px; }
  .url-input {
    width:100%; padding:12px; margin-top:10px; border:1px solid #ddd; border-radius:6px;
  }

  .details { width:520px; }
  .form-group { margin-bottom:20px; }
  .form-group label, .price-box label { display:block; margin-bottom:8px; font-weight:600; }
  .form-group input, .form-group textarea, .field input {
    width:100%; border:1px solid #d9d9d9; border-radius:4px; padding:12px;
    font-family:'Poppins', sans-serif; background:white;
  }
  .form-group textarea { min-height:120px; resize:none; }

  .artist-search { display:flex; gap:8px; align-items:center; }
  .artist-search button {
    background:#ffcc00; border:none; border-radius:4px; padding:10px 12px; cursor:pointer;
  }

  .price-box { margin-bottom:25px; }
  .price-box input {
    width:100%; height:55px; border:1px solid #ddd; border-radius:6px;
    padding:0 15px; font-size:28px; font-weight:700; color:#ffb700;
  }

  .buy-btn {
    width:100%; height:55px; border:none; border-radius:6px;
    background:#f4d600; color:black; font-weight:700; cursor:pointer;
  }
  .buy-btn:disabled { opacity:0.6; cursor:not-allowed; }

  .alert { padding:12px; border-radius:6px; margin-bottom:20px; }
  .error { background:#ffe0e0; color:#b30000; }
  .success { background:#e0ffe0; color:#006600; }

  .accordion { border-top:1px solid #ddd; margin-top:40px; }
  .accordion-item { height:70px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; cursor:pointer; }
  .accordion-item span { font-weight:500; }
  .accordion-item b { color:#ffcc00; font-size:24px; }

  .product-extra { margin-top:40px; }
  .product-extra h2 { font-size:42px; margin-bottom:20px; }
  .product-extra textarea { width:100%; height:120px; border:1px solid #ddd; border-radius:4px; padding:12px; margin-bottom:30px; resize:none; }
  .info-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:25px; }
  .field { display:flex; flex-direction:column; gap:8px; }
  .field label { font-size:14px; font-weight:600; }
  .field input { height:45px; }

  .footer { padding:25px; background:black; color:#ffcc00; text-align:center; font-size:13px; }

  @media(max-width:1100px) { .product-page { flex-direction:column; } .details { width:100%; } }
  @media(max-width:700px) {
    .product-page { padding:30px; }
    .info-grid { grid-template-columns:1fr; }
  }
</style>