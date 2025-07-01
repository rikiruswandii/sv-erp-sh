<script lang="ts">
   
</script>

<section id="contact" class="relative isolate bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 font-mono">
  <div class="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none">
    <img src="./undraw_global-team_8jok.svg" alt="bg" class="w-[80%] opacity-80">
  </div>

  <!-- Background Gradient -->
  <div
    class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    aria-hidden="true"
  >
    <div
      class="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
      style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
    ></div>
  </div>

  <!-- Heading -->
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="text-4xl font-semibold tracking-tight text-balance text-blue-900 dark:text-white sm:text-5xl">
      Hubungi Kami
    </h2>
    <p class="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
      Kami siap mendengarkan kebutuhan Anda dan memberikan solusi terbaik.
    </p>
  </div>

  <!-- Form -->
  <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20 relative z-10">
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <!-- Input Fields -->
      {#each [
        { id: 'first-name', label: 'Nama Depan', auto: 'given-name', placeholder: 'Masukkan nama depan...' },
        { id: 'last-name', label: 'Nama Belakang', auto: 'family-name', placeholder: 'Masukkan nama belakang...' }
      ] as field}
      <div>
        <label for={field.id} class="block text-sm/6 font-semibold text-gray-900 dark:text-gray-100">
          {field.label}
        </label>
        <div class="mt-2.5">
          <input
            type="text"
            name={field.id}
            id={field.id}
            placeholder={field.placeholder}
            class="block w-full rounded-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-3.5 py-2 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>
      </div>
      {/each}

      <!-- Company -->
      <div class="sm:col-span-2">
        <label for="company" class="block text-sm/6 font-semibold text-gray-900 dark:text-gray-100">Perusahaan</label>
        <div class="mt-2.5">
          <input
            type="text"
            name="company"
            id="company"
            autocomplete="organization"
            placeholder="Masukkan nama perusahaan..."
            class="block w-full rounded-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-3.5 py-2 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="sm:col-span-2">
        <label for="email" class="block text-sm/6 font-semibold text-gray-900 dark:text-gray-100">Email</label>
        <div class="mt-2.5">
          <input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            placeholder="Masukkan email..."
            class="block w-full rounded-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-3.5 py-2 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          />
        </div>
      </div>

      <!-- Phone -->
      <div class="sm:col-span-2">
        <label for="phone-number" class="block text-sm/6 font-semibold text-gray-900 dark:text-gray-100">Nomor Telepon</label>
        <div class="mt-2.5">
          <div class="flex rounded-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <div class="grid shrink-0 grid-cols-1 focus-within:relative">
              <select
                id="country"
                name="country"
                autocomplete="country"
                aria-label="Negara"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 dark:text-gray-300 dark:bg-transparent bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>ID</option>
                <option>MY</option>
                <option>SG</option>
              </select>
              <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              placeholder="0812-3456-7890"
              class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 dark:text-white bg-transparent dark:bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      <!-- Message -->
      <div class="sm:col-span-2">
        <label for="message" class="block text-sm/6 font-semibold text-gray-900 dark:text-gray-100">Pesan</label>
        <div class="mt-2.5">
          <textarea
            name="message"
            id="message"
            rows="4"
            placeholder="Tulis pesan Anda di sini..."
            class="block w-full rounded-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-3.5 py-2 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          ></textarea>
        </div>
      </div>

      <!-- Policy Toggle -->
      <div class="flex gap-x-4 sm:col-span-2">
        <div class="flex h-6 items-center">
          <button id="policy-toggle" type="button" class="flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" role="switch" aria-checked="false" aria-labelledby="switch-1-label">
            <span class="sr-only">Setuju dengan kebijakan</span>
            <span aria-hidden="true" class="size-4 translate-x-0 transform rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
          </button>
        </div>
        <label class="text-sm/6 text-gray-600 dark:text-gray-300" id="switch-1-label" for="policy-toggle">
          Dengan memilih ini, Anda menyetujui <a href="/" class="group relative inline-block font-semibold text-blue-600 dark:text-blue-400">
			kebijakan privasi
			<span
						class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
		</a> kami.
        </label>
      </div>
    </div>

    <!-- Tombol Kirim -->
    <div class="mt-10">
      <button
        type="submit"
        class="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Kirim Pesan
      </button>
    </div>
  </form>
</section>
