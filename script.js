document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements untuk Sidebar
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('open-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');
    const body = document.body;

    // DOM Elements untuk Dark Mode
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    // --- FUNGSI SIDEBAR ---

    // Membuka Sidebar
    openSidebarBtn.addEventListener('click', () => {
        sidebar.style.width = 'var(--sidebar-width)';
        body.classList.add('sidebar-open');
    });

    // Menutup Sidebar
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.style.width = '0';
        body.classList.remove('sidebar-open');
    });

    // Menutup Sidebar saat Link di-klik (untuk navigasi)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Beri sedikit delay agar transisi scroll sempat terjadi sebelum sidebar menutup
            setTimeout(() => {
                sidebar.style.width = '0';
                body.classList.remove('sidebar-open');
            }, 300);
        });
    });


    // --- FUNGSI DARK MODE ---

    // Fungsi untuk mengatur mode
    const setMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            // Ubah ikon tombol desktop & teks mobile menjadi Matahari
            themeToggleDesktop.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            // Ubah ikon tombol desktop & teks mobile menjadi Bulan
            themeToggleDesktop.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i> Mode Gelap';
        }
    };

    // 1. Terapkan Mode Awal
    const preferredTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default ke Dark Mode jika preferensi sistem gelap, atau jika tidak ada preferensi tersimpan
    if (preferredTheme === 'dark' || (!preferredTheme && systemPrefersDark)) {
        setMode(true);
    } else {
        setMode(false);
    }

    // 2. Event listener untuk tombol Desktop
    themeToggleDesktop.addEventListener('click', () => {
        const isCurrentlyDark = body.classList.contains('dark-mode');
        setMode(!isCurrentlyDark); 
    });

    // 3. Event listener untuk tombol Mobile
    themeToggleMobile.addEventListener('click', () => {
        const isCurrentlyDark = body.classList.contains('dark-mode');
        setMode(!isCurrentlyDark); 
    });
});