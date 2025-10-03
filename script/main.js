// Script spécifique à la page panier.html

// Vérifie si on est sur une page contenant un panier
if (document.getElementById('panier-list')) {

    // Fonction qui affiche les éléments du panier et calcule le total
    function afficherPanier() {
        const list = document.getElementById('panier-list');
        const total = document.getElementById('panier-total');
        const panier = JSON.parse(localStorage.getItem('panier') || '[]');
        list.innerHTML = '';
        let somme = 0;

        // Parcourt chaque produit dans le panier et l'affiche en liste
        panier.forEach((p, i) => {
            const li = document.createElement('li');
            li.textContent = `${p.nom} - ${p.prix} €`;
            list.appendChild(li);
            somme += p.prix;
        });

        // Met à jour le prix total
        total.textContent = `Total : ${somme} €`;
    }
    afficherPanier();

    // Bouton pour vider le panier
    const viderBtn = document.getElementById('vider-panier');
    if (viderBtn) {
        viderBtn.onclick = function() {
            localStorage.removeItem('panier'); // Supprime le panier du localStorage
            afficherPanier(); // Rafraîchit l’affichage
        };
    }
}

// Vérifie si on est sur une page qui contient une grille de produits
if (document.getElementById('produits-grille')) {

    // Liste de produits
    const produits = [
        { nom: "Purificateur d'air Philips AC2887", image: "purificateur.webp", description: "Élimine 99,97% des allergènes, mode nuit silencieux, capteur intelligent.", etat: "Excellent état", prix: 160, stock: true },
        { nom: "Aspirateur Dyson V8", image: "aspirateur.webp", description: "Aspirateur sans fil puissant, idéal pour tous types de sols.", etat: "Très bon état", prix: 180, stock: true },
        { nom: "iPhone 12", image: "iphone12.webp", description: "Smartphone Apple, 64Go, écran 6.1 pouces, batterie neuve.", etat: "Excellent état", prix: 499, stock: true },
        { nom: "Ordinateur portable Dell XPS 13", image: "dellxps13.webp", description: "Ultrabook 13 pouces, Intel i5, 8Go RAM, SSD 256Go.", etat: "Bon état", prix: 500, stock: false },
        { nom: "Trottinette électrique Xiaomi M365", image: "trottinette.webp", description: "Autonomie 25km, vitesse max 25km/h, pliable et légère.", etat: "Très bon état", prix: 300, stock: true },
        { nom: "Tablette Samsung Galaxy Tab S6", image: "tablette.webp", description: "Écran 10.5 pouces, 128Go, stylet inclus.", etat: "Comme neuf", prix: 350, stock: true },
        { nom: "Casque Bose QC35", image: "casque.webp", description: "Casque Bluetooth à réduction de bruit, autonomie 20h.", etat: "Très bon état", prix: 120, stock: false },
        { nom: "Montre connectée Garmin Vivoactive 4", image: "montre.webp", description: "Suivi GPS, cardio, notifications, étanche 5ATM.", etat: "Bon état", prix: 130, stock: true },
        { nom: "Enceinte JBL Flip 5", image: "enceinte.webp", description: "Bluetooth, étanche, autonomie 12h, son puissant.", etat: "Très bon état", prix: 70, stock: true },
        { nom: "Appareil photo Canon EOS 2000D", image: "appareilphoto.webp", description: "Reflex 24MP, objectif 18-55mm, WiFi intégré.", etat: "Bon état", prix: 320, stock: false },
        { nom: "Imprimante HP DeskJet 2630", image: "imprimante.webp", description: "Multifonction, WiFi, impression couleur et noir.", etat: "Très bon état", prix: 60, stock: true },
        { nom: "Sèche-cheveux Philips ThermoProtect", image: "sechecheveux.webp", description: "Puissance 2200W, 6 réglages, technologie ionique.", etat: "Comme neuf", prix: 45, stock: true },
        { nom: "Télévision LG OLED 55 pouces", image: "tv.webp", description: "4K UHD, HDR, Smart TV, télécommande vocale.", etat: "Très bon état", prix: 800, stock: false },
        { nom: "Micro-ondes Samsung MS23K3513", image: "microondes.webp", description: "23L, 800W, 6 modes de cuisson, design compact.", etat: "Bon état", prix: 55, stock: true },
        { nom: "Clavier mécanique Logitech G413", image: "clavier.webp", description: "Rétroéclairé, switches Romer-G, USB pass-through.", etat: "Très bon état", prix: 55, stock: true },
        { nom: "Chargeur solaire portable Anker", image: "chargeur.webp", description: "2 ports USB, pliable, idéal pour rando et voyage.", etat: "Comme neuf", prix: 40, stock: true }
    ];

    // Fonction pour ajouter un produit au panier
    function ajouterAuPanier(produit) {
        let panier = [];
        try {
            panier = JSON.parse(localStorage.getItem('panier')) || [];
        } catch(e) {
            panier = [];
        }

        // Vérifie si le produit est déjà dans le panier
        if (panier.some(item => item.nom === produit.nom)) {
            afficherMessageAjout('Ce produit est déjà dans le panier !');
            return;
        }

        // Ajoute le produit et sauvegarde
        panier.push(produit);
        localStorage.setItem('panier', JSON.stringify(panier));
        afficherMessageAjout('Produit ajouté au panier !');
    }

    // Affiche une notification de confirmation ou d'erreur
    function afficherMessageAjout() {
        let msg = document.createElement('div');
        msg.className = 'notif-panier ' + (arguments[0] && arguments[0].includes('déjà dans le panier') ? 'notif-error' : 'notif-success');
        msg.textContent = arguments[0] || 'Produit ajouté au panier !';
        document.body.appendChild(msg);
        setTimeout(() => {
            msg.remove();
        }, 1800);
    }

    // Récupération des éléments de la page
    const grille = document.getElementById('produits-grille');
    const overlay = document.getElementById('fiche-overlay');
    const popup = document.getElementById('fiche-popup');

    // Génération dynamique des cartes produits
    produits.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'produit-carte';
        card.innerHTML = `<img src="../images/${p.image}" alt="${p.nom}" class="produit-img"><h3>${p.nom}</h3>`;

        // Quand on clique sur une carte, on ouvre la fiche produit
        card.addEventListener('click', () => {
            overlay.style.display = 'flex';
            popup.innerHTML = `
                <div class="fiche-card">
                    <img src="../images/${p.image}" alt="${p.nom}" class="fiche-img">
                    <h2>${p.nom}</h2>
                    <p><strong>Description :</strong> ${p.description}</p>
                    <p><strong>État :</strong> ${p.etat}</p>
                    <p><strong>Prix :</strong> ${p.prix} &euro;</p>
                    <p><strong>Disponibilité :</strong> ${p.stock ? 'En stock' : 'Indisponible'}</p>
                    <button id="fermer-fiche" class="fermer-fiche">Fermer</button>
                    ${p.stock ? `<button id="ajouter-panier" class="ajouter-panier">Ajouter au panier</button>` : ''}
                </div>
            `;

            // Bouton pour fermer la fiche
            document.getElementById('fermer-fiche').onclick = function() {
                overlay.style.display = 'none';
            };

            // Bouton pour ajouter au panier (si en stock)
            if (p.stock) {
                document.getElementById('ajouter-panier').onclick = function() {
                    ajouterAuPanier(p);
                    overlay.style.display = 'none';
                };
            }
        });

        // Ajoute la carte produit à la grille
        grille.appendChild(card);
    });

    // Ferme la fiche si on clique en dehors de la popup
    overlay.onclick = function(e) {
        if (e.target === overlay) overlay.style.display = 'none';
    };
}

// Exécute du code une fois la page chargée
document.addEventListener('DOMContentLoaded', function() {
    
});
