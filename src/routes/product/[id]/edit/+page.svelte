<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { enhance } from '$app/forms';
  import { searchArtist } from '$lib/audiodb/client';
  import type { PageProps } from './$types';
  import { onDestroy } from 'svelte';

  let { data, form }: PageProps = $props();

  let product = $derived(data.product);
  let initialArtistApiId = $derived(data.artistApiId);

  let title = $state(product.title);
  let artistName = $state(product.artist);
  let artistApiId = $state(initialArtistApiId);
  let price = $state(product.price / 100);
  let productCode = $state(product['api-id']);
  let description = $state('');
  let asin = $state('');
  let releaseDate = $state(product.release_date);
  let stock = $state(product.stock);
  let mainImageUrl = $state(product.cover);
  let typeId = $state(product['type-id'] || 1); 

  let error = $state(form?.error ?? '');
  let success = $state(form?.success ?? '');

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

  function onArtistInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchArtist, 600);
  }

  onDestroy(() => clearTimeout(debounceTimer));

  function handleEnhance() {
    error = '';
    success = '';
    return async ({ result }) => {
      if (result.type === 'success') {
        success = 'Produto atualizado com sucesso!';
      } else if (result.type === 'failure') {
        error = result.data?.error ?? 'Erro desconhecido.';
      }
    };
  }
</script>

<div class="page">
  <form method="POST" use:enhance={handleEnhance} class="product-page">
    <!-- Galeria -->
    <div class="gallery">
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
          name="mainImageUrl"
          class="url-input"
          placeholder="Cole o link da imagem principal"
          bind:value={mainImageUrl}
          required
        />
      </div>
    </div>

    <!-- Detalhes -->
    <div class="details">
      <div class="form-group">
        <label for="title">Nome do álbum</label>
        <input id="title" name="title" type="text" placeholder="Nome do álbum" bind:value={title} required />
      </div>

      <div class="form-group">
        <label for="artistName">Artista/Banda</label>
        <div class="artist-search">
          <input
            id="artistName"
            name="artistName"
            type="text"
            placeholder="Artista/Banda"
            bind:value={artistName}
            on:input={onArtistInput}
            required
          />
          <button type="button" on:click={fetchArtist} title="Buscar artista na TheAudioDB">
            <i class="ph ph-magnifying-glass"></i>
          </button>
        </div>
        {#if artistApiId}
          <small>ID Artista: {artistApiId}</small>
        {/if}
      </div>

      <input type="hidden" name="artistApiId" value={artistApiId} />

      <div class="price-box">
        <label for="price">Preço</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          bind:value={price}
          required
        />
      </div>

      <!-- Novo campo: tipo de mídia -->
      <div class="form-group">
        <label for="typeId">Formato</label>
        <select id="typeId" name="typeId" bind:value={typeId}>
          <option value={1}>CD</option>
          <option value={2}>Vinil</option>
          <option value={3}>VHS</option>
          <option value={4}>Fita Cassete</option>
        </select>
      </div>

      <div class="form-group">
        <label for="productCode">API‑ID (código único)</label>
        <input
          id="productCode"
          name="productCode"
          type="text"
          placeholder="Ex: OKC-1997-001"
          bind:value={productCode}
          required
        />
      </div>

      <div class="form-group">
        <label for="releaseDate">Data de Lançamento</label>
        <input
          id="releaseDate"
          name="releaseDate"
          type="text"
          placeholder="AAAA-MM-DD"
          bind:value={releaseDate}
          required
        />
      </div>

      <div class="form-group">
        <label for="stock">Estoque</label>
        <input id="stock" name="stock" type="number" placeholder="10" bind:value={stock} required />
      </div>

      <input type="hidden" name="asin" value={asin} />
      <input type="hidden" name="description" value={description} />

      {#if error}
        <div class="alert error">{error}</div>
      {/if}
      {#if success}
        <div class="alert success">{success}</div>
      {/if}

      <button type="submit" class="buy-btn">Salvar Alterações</button>
    </div>
  </form>
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
  .form-group input, .form-group textarea, .field input,
  .form-group select { 
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

  .footer { padding:25px; background:black; color:#ffcc00; text-align:center; font-size:13px; }

  @media(max-width:1100px) { .product-page { flex-direction:column; } .details { width:100%; } }
  @media(max-width:700px) {
    .product-page { padding:30px; }
  }
</style>