let notificationWidth = 400;
let notificationHeight = 80;
let notificationX;
let notificationY;
let notificationAlpha = 255;
let notificationVisible = false;
let notificationStartTime;
let backgroundImage;
let notificationSound;
let backgroundMusic;
let smallImage;
let cornerRadius = 20;
let contentImage;

function preload() {
  backgroundImage = loadImage('japan.gif');
  notificationSound = loadSound('noti.aac');
  backgroundMusic = createAudio('lluvia.aac');
  smallImage = loadImage('click.gif');
  contentImage = loadImage('adver.png');
}

function setup() {
  createCanvas(1700, 700);
  notificationX = (width - notificationWidth) / 2;
  notificationY = -notificationHeight;

  backgroundMusic.loop();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  image(smallImage, width - 50, 10, 40, 40);

  if (notificationVisible) {
    let elapsedTime = millis() - notificationStartTime;

    if (notificationY < 0) {
      notificationY = map(elapsedTime, 0, 1000, -notificationHeight, 0);
    } else if (elapsedTime < 2000) {
      notificationY = 0;
    } else {
      notificationAlpha = map(elapsedTime, 2000, 3000, 255, 0);
      if (notificationAlpha <= 0) {
        notificationVisible = false;
        if (notificationSound.isPlaying()) {
          notificationSound.stop();
        }
      }
    }
  }

  if (notificationAlpha > 0) {
    fill(150, notificationAlpha);
    noStroke();
    rect(notificationX, notificationY, notificationWidth, notificationHeight, cornerRadius);

    let contentX = notificationX;
    let contentY = notificationY;
    let contentWidth = notificationHeight * 0.3; // Cambia el ancho de la imagen
    let contentHeight = notificationHeight * 0.3; // Cambia la altura de la imagen

    image(contentImage, contentX + 10, contentY + (notificationHeight - contentHeight) / 2, contentWidth, contentHeight);

    fill(0);
    textSize(16); // Cambia el tamaño de la fuente
    textAlign(CENTER, CENTER);
    text("Fuerte lluvia en...Kushiro Shitsugen Noriko-go.                                       Suprefectura de Kushiro, Hokkaidō...", notificationX + contentWidth + 20, notificationY, notificationWidth - contentWidth - 20, notificationHeight);
  }
}

function showNotification() {
  notificationStartTime = millis();
  notificationVisible = true;
  notificationAlpha = 255;

  notificationSound.play();
}

function mouseClicked() {
  showNotification();
}
