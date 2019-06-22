class Simulation extends Phaser.Scene {

    preload() {
        // Afbeelding voor de robots die de composieten laden
        this.load.image('helper', 'helper.png');
        // Afbeelding voor de composieten
        this.load.image('composite', 'composite.png');
        // Afbeelding voor de persplaten
        this.load.image('presser', 'presser.png');
    }

    //Functie om het JSON bestand (lokaal) voor temperatuur in te lezen
    readJSONFileTemperatures(file) {
        //XML verzoek om JSON bestand in te lezen
        var rawFile = new XMLHttpRequest();
        //Open het bestand
        rawFile.open("GET", file, false);
        //Volgende regels zijn bedoeld om inhoud van het bestand te lezen
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    this.current_json = rawFile.responseText;                    
                }
            }
        };

        rawFile.send(null);
    }

    //Haal vanuit het JSON bestand de temperaturen
    getTemperatures() {
        var file_content = this.readJSONFileTemperatures('/sensor_dummy_data.json');
        console.log(file_content);
    }

    // Dit is initiele fase van Phaser waarin onderdelen worden neergezet
    create() {
        //Blok waarin composiet start, met bijbehorende coordinaten en lengte & breedte..
        var rect = new Phaser.Geom.Rectangle(20, 320, 70, 45);
        //Graphics object is verantwoordelijk voor het tekenen van blokken
        var graphics = this.add.graphics({ fillStyle: { color: 0x7D8C8C } });
        // Vul het blok met de gekozen fillstyle kleur..
        graphics.fillRectShape(rect);

        //Voeg tekst met temperatuur aan Phaser
        this.add.text(400, 20, 'Temperature: ', { fontSize: '25px', fill: '#fff' });
        this.global_temp = this.add.text(620, 20, '35 °C', { fontSize: '25px', fill: '#fff' });

        // De 2 onderstaande blokken die getekend worden horen bij beginblok
        rect = new Phaser.Geom.Rectangle(20, 360, 150, 45);
        graphics.fillRectShape(rect);
        rect = new Phaser.Geom.Rectangle(170, 375, 50, 20);
        graphics.fillRectShape(rect);

        //Hiermee maak ik figuren met ronde uiteinden
        graphics.strokeRoundedRect(220, 270, 70, 162, 20);
        graphics.strokeRoundedRect(220, 352, 150, 80, 20);
        graphics.strokeRoundedRect(340, 392, 150, 40, 15);

        //Definieer kleur en maak een rechthoek met gekleurde lijnen
        graphics.lineStyle(5, 0x49D134, 1.0);
        graphics.strokeRect(200, 264, 40, 20);
        graphics.lineStyle(4, 0xffff00, 1);

        //Nog meer blokken die gemaakt worden.. Dit is voornamelijk bedoeld..
        //om bepaalde lijnen te camoufleren.
        rect = new Phaser.Geom.Rectangle(320, 393, 70, 38);
        graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });
        graphics.fillRectShape(rect);
        rect = new Phaser.Geom.Rectangle(299, 373, 70, 38);
        graphics.fillRectShape(rect);

        //Voeg een nieuwe sprite toe met afbeelding helper die verantwoordelijk is voor..
        //het uitladen van composieten
        this.helper1 = this.add.sprite(510, 337, "helper");
        this.helper1.setOrigin(0.1, 0.4);

        //Tweede helper 
        this.helper2 = this.add.sprite(900, 337, "helper");
        this.helper2.setOrigin(0.1, 0.4);

        //Twee variabelen die bepalen of de twee helpers een composiet hebben vastgepakt..
        this.grabbed1 = false;
        this.grabbed2 = false;

        //Zie hierboven..
        graphics.strokeRoundedRect(560, 392, 290, 90, 15);

        graphics.lineStyle(5, 0x49D134, 1.0);
        graphics.strokeRect(200, 264, 40, 20);

        graphics = this.add.graphics({ fillStyle: { color: 0x7D8C8C } });

        //Voeg een nieuwe composiet sprite toe aan de simulatie
        this.composite = this.add.sprite(30, 380, "composite");
        this.composite.setOrigin(0.1, 0.4);
        //Snelheid (pixels/MS) van de composiet
        this.speed = 0.5;

        //Verantwoordelijk voor het persen van composiet
        this.rect1 = this.add.sprite(600, 240, "presser");
        this.rect2 = this.add.sprite(700, 240, "presser");
        this.rect3 = this.add.sprite(800, 240, "presser");

        //Bepaalt of de drie persplaten hun laagste punt hebben bereikt
        this.rectReachedLowest = [false,false,false];

        //Laatste blok waar de composiet over heen gaat..
        graphics.lineStyle(5, 0x49D134, 1.0);
        graphics.strokeRect(900, 390, 300, 90);
    }

    update() {
        //De helpers moeten constant de andere kant op draaien met een..
        //snelheid van 0.01px/ms
        this.helper1.rotation -= 0.01;
        this.helper2.rotation -= 0.01;

        //this grabbed1/2 geeft aan of composiet is vastgepakt door een helper...
        //zo ja, ga dan naar de andere methoden
        if (this.grabbed1) {
            this.moveCompositeWithHelper(this.composite);
        } else if (this.grabbed2) {
            this.moveCompositeWithHelper2(this.composite);
        }
        else {
            //Als composiet niet is vastgepakt, moet hij bewegen zoals gewoonlijk..
            this.moveComposite(this.composite);
        }

        this.getTemperatures();
    }

    moveComposite(composite) {
        //Composiet beweegt aan de hand van zijn huidige positie
        //Dit hebben we voor nu hardcoded, omdat dit namelijk nog een prototype is
        //In productie, beweegt de composiet veel dynamischer
        if (composite.x <= 205) {
            composite.x += this.speed;
        } else if (composite.x === 205.5 && composite.y >= 274) {
            composite.y -= this.speed;
        } else if (composite.x <= 275 && composite.y === 273.5) {
            composite.x += this.speed;
        } else if (composite.x === 275.5 && composite.y <= 345) {
            composite.y += this.speed;
        } else if (composite.x <= 355.5 && composite.y === 345.5) {
            composite.x += this.speed;
        } else if (composite.x === 356 && composite.y <= 383.5) {
            composite.y += this.speed;
        } else if (composite.x <= 470 && composite.y === 384) {
            composite.x += this.speed;
        } else if (composite.x === 470.5 && composite.y === 384) {
            //Aan de hand van rotatie van helper1 & positie van composiet wordt dat vastgepakt.
            if (this.helper1.rotation >= 2.00 && this.helper1.rotation <= 2.30) {
                // Eerste helper is dus vastgepakt..
                this.grabbed1 = true;
                //Methode om composiet mee te laten bewegen met de helper
                this.moveCompositeWithHelper(composite);
            }
        } else if (composite.x <= 590.5 && composite.y === 330) {
            composite.x += this.speed;
        //Positie waarin de persplaten naar beneden komen
        } else if (composite.x === 591 && composite.y === 330) {
            //Als het eerste persplaa zijn laagste punt heeft bereikt, dan gaat composiet...
            //gewoon door als gewoonlijk
            // Zo niet, dan wordt persplaat naar beneden gehaald
            if (this.rect1.y <= 240 && this.rectReachedLowest[0]) {
                composite.x += this.speed;
            } else {
                console.log(this.rect1.y + " " + this.rectReachedLowest[0]);
                this.movePress(this.rect1, 0);
            }

        } else if (composite.x <= 691.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x <= 692 && composite.y === 330) {
            if (this.rect2.y <= 240 && this.rectReachedLowest[1]) {
                composite.x += this.speed;
            } else {
                console.log(this.rect2.y + " " + this.rectReachedLowest[1]);
                this.movePress(this.rect2, 1);
            }

        } else if (composite.x <= 792.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x <= 793 && composite.y === 330) {
            if (this.rect3.y <= 240 && this.rectReachedLowest[2]) {
                composite.x += this.speed;
            } else {
                console.log(this.rect3.y + " " + this.rectReachedLowest[2]);
                this.movePress(this.rect3, 2);
            }

        } else if (composite.x <= 830.5 && composite.y === 330) {
            composite.x += this.speed;
        } else if (composite.x <= 831 && composite.y === 330) {
            if (this.helper2.rotation >= 3.00 && this.helper2.rotation <= 3.24) {
                this.grabbed2 = true;
                this.moveCompositeWithHelper2(composite);
            }
        } else if (composite.x >= 900 && composite.x < 1170) {
            composite.x += this.speed;
        } else if (composite.x >= 1170) {
            //Na deze positie, wordt composiet weer teruggebracht naar beginplek, en worden de..
            //rectReachedLowest punten teruggezet naar false
            composite.x = 30;
            composite.y = 380;
            this.rectReachedLowest[0] = false;
            this.rectReachedLowest[1] = false;
            this.rectReachedLowest[2] = false;
        }
    }

    //Rect is het persplaat dat naar beneden gehaald moet worden
    //Point is specifiek voor welke rectReachedLowest element uit de array...
    //benaderd moet worden
    movePress(rect, point) {
        //Als plaat zijn laagste punt niet heeft bereikt en op een bepaalde positie is...
        //dan naar beneden gaan met een snelheid van 0.5px/ms
        if (rect.y <= 314 && this.rectReachedLowest[point] === false) {
            rect.y += 0.5;
        } else {
            this.rectReachedLowest[point] = true;
            rect.y -= 0.5;
        }
    }

    moveCompositeWithHelper(composite) {
        // Laat composite bewegen met helper bij een bepaalde positie...
        // Nadat composiet zijn doel heeft bereikt, zet grabbed op false en return false
        if (composite.y <= 330) {
            this.grabbed1 = false;
            return false;
        }
        if (composite.x <= 550) {
            composite.x += this.speed;
        } else {
            composite.y -= this.speed;
        }
        
    }

    //Zelfde als moveCompositeWithHelper2
    moveCompositeWithHelper2(composite) {
        if (composite.x >= 900) {
            this.grabbed2 = false;
            return false;
        }
        if (composite.y >= 330 && composite.y <= 380) {
            composite.y += this.speed;
            composite.x += 0.3;
            console.log("A");
        } else {
            composite.x += this.speed;
            //if (composite.x >= 1170) {
                //composite.destroy();
            //}
            console.log(composite.x + " " + composite.y);
            
        }
    }
}
