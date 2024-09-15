const canvaSize = 600;
const ellipseSize = 60
let currentTitle = '';
let currentTitleColor = '';
let postsArr = []

const COLORS = [
    "#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"
]

function setup() {
    createCanvas(canvaSize, canvaSize);
    background(0)
    frameRate(24)

    textSize(32);
    textAlign(CENTER, CENTER)
    text("Cargando", canvaSize / 2, canvaSize / 2)

    getPostCount().then(posts => {
        posts.forEach((p, i) => {
            const newPost = p;
            newPost.positionX = random(0, canvaSize)
            newPost.positionY = random(0, canvaSize)
            newPost.directionX = "right"
            newPost.directionY = "down"
            newPost.color = COLORS[i]
            postsArr.push(p)
        })
    })
}

function draw() {
    background(0)
    postsArr.forEach((p, i, arr) => {
        fill(p.color)

        if (p.directionX == "right") {
            arr[i].positionX += 5;
        } else {
            arr[i].positionX -= 5;
        }


        if (p.positionX > canvaSize - ellipseSize) {
            arr[i].directionX = "left";
        }

        if (p.positionX < ellipseSize) {
            arr[i].directionX = "right";
        }



        if (p.directionY == "down") {
            arr[i].positionY += 5;
        } else {
            arr[i].positionY -= 5;
        }


        if (p.positionY > canvaSize - ellipseSize) {
            arr[i].directionY = "up";
        }

        if (p.positionY < ellipseSize) {
            arr[i].directionY = "down";
        }


        ellipse(p.positionX, p.positionY, ellipseSize * 2);



        let d = dist(mouseX, mouseY, p.positionX, p.positionY);

        if (d < ellipseSize && !currentTitle) {
            currentTitle = p.title
            currentTitleColor = p.color
            fill(currentTitleColor)
            textSize(32);
            textAlign(CENTER, CENTER)
            stroke(0);
            strokeWeight(8);
            text(currentTitle, canvaSize / 2, canvaSize / 2)
        }

    })


    strokeWeight(4);
    currentTitle = ""

}


async function getPostCount() {
    const API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/free18716.wordpress.com/posts?category=guitarras";
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        return data.posts;
    } catch (error) {
        console.error("Error en llamado api Wordpress")
        return undefined;
    }
}