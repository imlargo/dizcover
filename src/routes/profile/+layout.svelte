<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();

    const sidebarLinks = [
        { label: 'Perfil', href: '/profile', icon: 'bi bi-person' },
        { label: 'Favoritos', href: '/profile/favorites', icon: 'bi bi-heart' },
        { label: 'Métodos de pago', href: '/profile/payment-methods', icon: 'bi bi-credit-card' },
        { label: 'Facturas', href: '/profile/invoices', icon: 'bi bi-receipt' },
        { label: 'Mis reservas', href: '/profile/reservations', icon: 'bi bi-calendar-check' },
    ];

</script>

<div class="px-12 py-12">
    <div class="grid grid-cols-12 gap-x-6">
        <aside class="col-span-2 flex flex-col gap-1">
            {#each sidebarLinks  as link}
                <a href={link.href} class="flex items-center px-6 py-2 hover:bg-white/5 rounded-md gap-2 font-semibold transition-all duration-200">
                    <i class={link.icon}></i>
                    <span>{link.label}</span>
                </a>
            {/each}
        </aside>

        <main class="col-span-10">
            {@render children()}
        </main>
    </div>
</div>


