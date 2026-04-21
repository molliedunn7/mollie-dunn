// Modal constants
const modal = document.getElementById('portfolio-modal');
const modalImg = document.querySelector('.modal-img');
const gallery = document.querySelector('.map');
const closeBtn = document.querySelector('#minimize');

console.log(modal, modalImg, gallery, closeBtn);
  
gallery.addEventListener('click',(e) => {

    const card = e.target.closest('.blocks');

    if (card) {
        const img = card.querySelector('.cover-image');
        const captionText = card.querySelector('.small-caption');

        modal.style.display = 'block';
        modalImg.src = img.src;
        modal.className = "modal " + card.id;
        document.querySelector('.expanded-caption').textContent = captionText.querySelector('p').textContent;
    } 
});


  // Close when clicking the minimize button
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close when clicking the dark overlay background
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const projects = [
    {
        id: "graphic-design-block",
        title: "Graphic Design",
        image: "/images/graphic-design.jpg",
        caption: "Overseeing photo & video, managing creative feedback and project planning through Asana. Photography and set direction, including model selection, styling, and brand guidelines.",
        top: "600px",
        left: "109px",
        dotEdge: "right",
        connections: ["social-media-block"]
    },
    {
        id: "photoshoot-block",
        title: "Photoshoot Creative Direction",
        image: "images/94d82446-887c-4ef2-806a-c80adc6b5aa6_rw_3840.jpg",
        caption: "I lead creative direction for photoshoots with a focus on translating brand strategy into clear, compelling visuals. This includes planning concepts, managing shot lists, and guiding photographers and stylists to ensure consistency across web, email, and social. From concept development to on-set direction, I work closely with photographers and creatives to produce assets that are both visually consistent and effective in driving engagement.",
        top: "60px",
        left: "50px",
        dotEdge: "right",
        connections: []
    },
    {
        id: "social-media-block",
        title: "Social Media Strategy",
        image: "/images/social.jpg",
        caption: " I launched my eco-fashion instagram account in 2014 after noticing a gap – few fashion creators were talking about sustainability. Through my content, I showed how shopping less, embracing hand-me-downs, and buying secondhand could make space for still playing with new trends – harming the planet. I helped shape the sustainability conversation through my visual design background. This led me to marketing strategy roles, where I managed marketing strategy and teams of up to 5 direct reports. I've worked with brands like Tradlands, For Days, luxury resale startup Storey the App, and recycled leather goods brand Hyer Goods, driving growth and engagement in the sustainable fashion space.",
        top: "200px",
        left: "450px",
        dotEdge: "left",
        connections: ["photoshoot-block", "ecommerce"]
    },
    {
        id: "ecommerce",
        title: "eCommerce Site Optimization",
        image: "/images/ecommerce.png",
        caption: "I optimize eCommerce experiences end-to-end, focusing on both performance and usability. I’ve led improvements across site navigation, product pages, and overall user experience on Shopify, using data-driven insights to increase conversion rates and customer engagement. My work includes coordinating with paid media partners to improve return on ad spend, aligning site performance with campaign strategy, and ensuring a consistent, high-quality brand experience across all touchpoints.",
        top: "45px",
        left: "850px",
        dotEdge: "right",
        connections: ["seo"]
    },
    {
        id: "seo",
        title: "Search & LLM Optimization",
        image: "/images/seo.jpg",
        caption: "Case Study: A top Chicagoland employer serving Fortune 100 businesses was targeting the wrong  terms. By analyzing what phrases had the most search volume, I brought their website to the first page for over 30 search terms previously missing, increasing website traffic by 120%.",
        top: "550px",
        left: "1000px",
        dotEdge: "left",
        connections: ["ecommerce"]
    },

       {
        id: "ppc",
        title: "PPC",
        image: "/images/ppc.jpeg",
        caption: "Pay per Click Success for small to mid-sized business. I build and optimize PPC campaigns across Google, Meta, and LinkedIn with a focus on improving lead quality, aligning campaigns with revenue goals, and creating a system where paid media supports a broader growth engine.",
        top: "150px",
        left: "1300px",
        dotEdge: "left",
        connections: ["ecommerce"]
    },
]


projects.forEach(function(project) {
    
    // Create the card elements
    const card = document.createElement('div');
    card.classList.add('blocks');
    card.id = project.id;

    // Position the card
    card.style.top = project.top;
    card.style.left = project.left;

    // Build the inner HTML
    card.innerHTML = ` 
        <div class="images">
            <img class="icons" src="/images/maximize.svg">
            <img class="cover-image" src="${project.image}" alt="${project.title}">
        </div>
        <div class="small-caption">
            <h3>${project.title}</h3>
            <p>${project.caption}</p>
        </div> 
    `;

    // Add card to the map
    gallery.appendChild(card);

    card.style.top = project.top;
    card.style.left = project.left;
    card.style.position = 'absolute';
});

function getDotPosition(card, edge) {
    const rect = card.getBoundingClientRect();
    const mapRect = document.querySelector('.map').getBoundingClientRect();

    // position relative to the map
    const x = rect.left - mapRect.left;
    const y = rect.top - mapRect.top;

    if (edge === "left") {
        return {
            x: x,
            y: y + rect.height / 2
        };
    } else if (edge === "right") {
        return {
            x: x + rect.width,
            y: y + rect.height / 2
        };
    } else if (edge === "top") {
        return {
            x: x + rect.width / 2,
            y: y
        };
    } else if (edge === "bottom") {
        return {
            x: x + rect.width / 2,
            y: y + rect.height
        };
    }
}

function drawConnections() {
    const svg = document.getElementById('connections-svg');
    svg.innerHTML = '';

    projects.forEach(function(project) {
        const fromCard = document.getElementById(project.id);
        const fromDot = getDotPosition(fromCard, project.dotEdge);

        // draw the dot
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', fromDot.x);
        circle.setAttribute('cy', fromDot.y);
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', 'black');
        svg.appendChild(circle);

        // draw lines to each connected card
        project.connections.forEach(function(targetId) {
            const toProject = projects.find(function(p) { return p.id === targetId; });
            const toCard = document.getElementById(targetId);
            const toDot = getDotPosition(toCard, toProject.dotEdge);

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromDot.x);
            line.setAttribute('y1', fromDot.y);
            line.setAttribute('x2', toDot.x);
            line.setAttribute('y2', toDot.y);
            line.setAttribute('stroke', 'black');
            line.setAttribute('stroke-width', '1');
            svg.appendChild(line);
        });
    });
}

setTimeout(drawConnections, 100);

// function drawConnections() {
//     const svg = document.getElementById('connections-svg');
//     console.log('svg:', svg);
//     svg.innerHTML = ''; // clear existing lines

//     projects.forEach(function(project) {
//         const fromCard = document.getElementById(project.id);
//         console.log('fromCard:', project.id, fromCard);

//         project.connections.forEach(function(targetId) {
//             const toCard = document.getElementById(targetId);
//             console.log('toCard:', targetId, toCard);

//             // get center points of each card
//             const fromX = fromCard.offsetLeft + fromCard.offsetWidth / 2;
//             const fromY = fromCard.offsetTop + fromCard.offsetHeight / 2;
//             const toX = toCard.offsetLeft + toCard.offsetWidth / 2;
//             const toY = toCard.offsetTop + toCard.offsetHeight / 2;

//             console.log('drawing line from', fromX, fromY, 'to', toX, toY);

//             // draw the line
//             const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//             line.setAttribute('x1', fromX);
//             line.setAttribute('y1', fromY);
//             line.setAttribute('x2', toX);
//             line.setAttribute('y2', toY);
//             line.setAttribute('stroke', '#000000');
//             line.setAttribute('stroke-width', '1');

//             svg.appendChild(line);
//         });
//     });
// }
// setTimeout(drawConnections, 100);

