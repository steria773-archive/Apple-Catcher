//Created By Rabia Alhaffar In 5/March/2020
//A Game About Catching Apples With Basket LOL
//This Will Be The Tutorial For Cake
CreateCanvas(600,600,"white","3px black solid");
Initialize();
var basket_x = CanvasWidth / 3,basket_y = CanvasHeight - 64;
var apple_x = Math.floor(Math.random() * 17) * 30,apple_y = 36;
var score = 0,logo_alpha = 1;
SetDrawingMode("fill");
SetCanvasBackgroundImage("backskies.png");
var StartButton = new Button(200,300,200,75,"START",
{
 'default': { top: "purple" , bottom: "violet" },
 'hover': { top: "purple" , bottom: "violet" },
 'active': { top: "purple" , bottom: "violet" }
},() =>
{
Menu.Switch(Game);
});
var AboutButton = new Button(200,425,200,75,"ABOUT",
{
 'default': { top: "purple" , bottom: "violet" },
 'hover': { top: "purple" , bottom: "violet" },
 'active': { top: "purple" , bottom: "violet" }
},() =>
{
Menu.Switch(About);
});
var BackButton = new Button(200,475,200,75,"BACK",
{
 'default': { top: "purple" , bottom: "violet" },
 'hover': { top: "purple" , bottom: "violet" },
 'active': { top: "purple" , bottom: "violet" }
},() =>
{
About.Switch(Menu);
});

var Startup = new Level(() =>
{
    ClearCanvas();
    DrawRect(0,0,CanvasWidth,CanvasHeight,RGB(34,44,55));
    SetFont("40px Jura");
    DrawText(180,200,"MADE WITH","white","white","left",logo_alpha);
    DrawTexture("CAKE_APP_ICON.png",191,240,191,199,logo_alpha);
    setTimeout(() =>
    {
        logo_alpha -= 0.1;
    },1000);
    if(logo_alpha <= 0.0) 
    {
        Startup.Pause();
        setTimeout(() =>
        {
            Startup.Switch(Menu);
        },0.01);
    }
},10);

var Menu = new Level(() =>
{

    ClearCanvas();
    SetFont("40px Jura");
    DrawText(160,100,"APPLE CATCHER",RandomColor(),RandomColor());
    StartButton.Update();
    AboutButton.Update();

},10);

var Game = new Level(() =>
{

    ClearCanvas();
    DrawTexture("basket.png",basket_x,basket_y,64,64);
    DrawTexture("apple.png",0,0,64,64);
    SetFont("40px Jura");
    DrawText(80,55,score,RandomColor(),RandomColor());
    DrawTexture("apple.png",apple_x,apple_y,64,64);
    if (basket_x >= 560) basket_x = 530;
    if (basket_x < 0) basket_x = 0;
    apple_y += 5;


    if(apple_y > CanvasHeight) 
    {
        Game.Switch(Menu);
        score = 0;
        apple_y = 36;
        apple_x = Math.floor(Math.random() * 17) * 30;
    }


    if(CheckCollisionRectAdvanced(apple_x,apple_y,64,64,basket_x,basket_y,64,64)) 
    {
        score++;
        apple_y = 36;
        apple_x = Math.floor(Math.random() * 17) * 30;
        if(WAV()) PlayAudio("collect_apple.wav");
    }

},1000);

var About = new Level(() =>
{

    ClearCanvas();
    SetFont("40px Jura");
    DrawText(160,100,"APPLE CATCHER",RandomColor(),RandomColor());
    SetFont("30px Jura");
    DrawText(100,200,"CREATED BY RABIA ALHAFFAR","black");
    DrawText(80,300,"POWERED BY CAKE GAME ENGINE","black");
    SetFont("20px monospace");
    DrawText(120,380,"https://github.com/Rabios/Cake");
    SetFont("40px Jura");
    BackButton.Update();

},10);

document.addEventListener("keydown",(e) =>
{
    if(e.keyCode == 39 || e.key == "d") basket_x += 60;
    if(e.keyCode == 37 || e.key == "a") basket_x -= 60;
});

document.addEventListener("touchstart",(e) =>
{
    basket_x = e.clientX || e.pageX;
});

document.addEventListener("touchmove",(e) =>
{
    basket_x = e.clientX || e.pageX;
});

document.addEventListener("mousemove",(e) =>
{
    basket_x = e.clientX;
});

Startup.Start();