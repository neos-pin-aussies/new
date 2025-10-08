// Year
document.getElementById('year').textContent = new Date().getFullYear();

(function () {
    const burger = document.getElementById('burger');
    const mnav = document.getElementById('mnav');
    const BREAK = 991; // trigger mobile at ≤ 991px

    const openNav = () => { mnav.classList.remove('hidden'); burger.setAttribute('aria-expanded', 'true'); };
    const closeNav = () => { mnav.classList.add('hidden'); burger.setAttribute('aria-expanded', 'false'); };

    // Toggle main mobile nav
    burger?.addEventListener('click', () => {
        mnav.classList.contains('hidden') ? openNav() : closeNav();
    });

    // Close on link click (good UX)
    mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

    // Submenu (child trigger)
    document.querySelectorAll('[data-submenu-toggle]').forEach(btn => {
        const target = document.getElementById(btn.getAttribute('aria-controls'));
        const icon = btn.querySelector('svg');

        const toggle = () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            target.classList.toggle('hidden', expanded);
            if (icon) icon.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
        };
        btn.addEventListener('click', toggle);
    });

    // Reset when resizing above the breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > BREAK) {
            closeNav();
            // collapse any open submenus
            document.querySelectorAll('[data-submenu-toggle]').forEach(btn => {
                const t = document.getElementById(btn.getAttribute('aria-controls'));
                btn.setAttribute('aria-expanded', 'false');
                if (t) t.classList.add('hidden');
                const ic = btn.querySelector('svg'); if (ic) ic.style.transform = 'rotate(0deg)';
            });
        }
    });
})();
