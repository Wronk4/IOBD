   document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    const services = [
        {
            title: "Masaż relaksacyjny całego ciała",
            image: "/api/placeholder/600/800",
            description: "Masaż relaksacyjny całego ciała to wyjątkowy zabieg, który pozwala na głębokie odprężenie i redukcję napięcia mięśniowego. Sesja trwa 60 minut i obejmuje plecy, ramiona, nogi oraz stopy.",
            price: "249 zł / 60 min"
        },
        {
            title: "Terapia manualna kręgosłupa",
            image: "/api/placeholder/600/800",
            description: "Specjalistyczny zabieg skupiający się na problemach z kręgosłupem. Pomaga w bólach pleców, koryguje postawę i poprawia zakres ruchu. Skuteczna metoda leczenia wielu dolegliwości.",
            price: "299 zł / 45 min"
        },
        {
            title: "Refleksologia stóp",
            image: "/api/placeholder/600/800",
            description: "Terapia oparta na stymulacji punktów refleksologicznych na stopach, które odpowiadają poszczególnym narządom ciała. Wspomaga krążenie i pomaga w detoksykacji organizmu.",
            price: "189 zł / 40 min"
        }
    ];
    
    let currentIndex = 0;
    
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + services.length) % services.length;
        alert(`Przełączenie na usługę: ${services[currentIndex].title}`);
    });
    
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % services.length;
        alert(`Przełączenie na usługę: ${services[currentIndex].title}`);
    });
    
    const availableDays = document.querySelectorAll('.calendar-day.available');
    availableDays.forEach(day => {
        day.addEventListener('click', function() {
            alert(`Wybrano termin: ${day.textContent} kwietnia 2025`);
        });
    });
});