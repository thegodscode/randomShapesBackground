$(document).ready(function () {
    class shapegenerator {
        constructor(target) {
            this.target = $(target)[0];
            this.targetWidth = this.target.getBoundingClientRect().width;
            this.targetHeight = this.target.getBoundingClientRect().height;
            this.totalGenerated = 0;
            this.totalDeleted = 0;
            this.shapesArray = ["circle", "rectangle", "square", "triangle"];
        }
        //methods for some random values
        getR(min, max) { return Math.floor((Math.random() * (max - min)) + min) }
        rl(min = 0, max = this.targetWidth) { return this.getR(min, max) }
        rh(min = 0, max = this.targetHeight) { return this.getR(min, max) }
        //just generating basic element
        generateElement(shapeNumber) {
            let shapeNum = shapeNumber;
            var createdElement = document.createElement("div")
            $(createdElement).addClass("createdElement")
                .css({ position: "absolute", backgroundColor: "rgba(0,0,0,0.5)", left: this.rl() + "px", Index: 1, });
            //applying the specific unique css of each element
            switch (this.shapesArray[shapeNum]) {
                case "circle":
                    let size = this.getR(50, 150) + "px";
                    $(createdElement).css({ width: size, height: size, borderRadius: size }); break;
                case "rectangle":
                    $(createdElement).css({ width: this.getR(50, 150) + "px", height: this.getR(50, 150) + "px", borderRadius: this.getR(5, 15) + "px", }); break;
                case "square":
                    let rsize = this.getR(50, 150) + "px"
                    $(createdElement).css({ width: rsize, height: rsize, borderRadius: this.getR(5, 15) + "px", }); break;
                case "triangle":
                    let tsize = this.getR(50, 100) + "px"
                    $(createdElement).css({
                        width: tsize,
                        height: tsize,
                        boxSizing: "border-box",
                        borderBottom: "solid " + tsize + " rgba(0,0,0,0.5)",
                        borderLeft: "solid " + tsize + " transparent",
                        borderRight: "solid " + tsize + " transparent",
                        backgroundColor: "transparent"
                    }); break;
            }
            return createdElement
        }
        //generating the keyframes for the created elements 
        generateAnime(createdElement) {
            anime({
                targets: createdElement,
                top: ["100%", this.getR(20, 50) + "%"],
                duration: function () { return anime.random(1500, 2500) },
                rotate: function () { return anime.random(180, 360) },
                opacity: [1, 0],
                easing: "easeOutQuart",
                delay: function () { return anime.random(100, 500) },
                speed: 120,

                loop: 2,
            });
            return createdElement;
        }
        //creating the 1 complete element, assigning the random animation and appending to the target 
        completeElement() {
            let shapeNumber = this.getR(0, this.shapesArray.length);
            let shape = this.generateElement(shapeNumber);
            let animatedElement = this.generateAnime(shape);
            this.target.append(animatedElement)
            return animatedElement;
        }
        //repeating the complete element () so we can get random shapes infinitely //
        randomShapes(interval) {
            setInterval(() => {
                var remelement = this.completeElement();

                //output some stats 
                $("#count")[0].innerHTML = $(".createdElement").length;
                $("#totalgenerated")[0].innerHTML = this.totalGenerated++;
                //deleting the element after certain period of time
                setTimeout(() => {
                    $(remelement).remove();
                    $("#totaldeleted")[0].innerHTML = this.totalDeleted++;
                }, 2500);

            }, interval);

        }
    }

    var generateElements = new shapegenerator(".slide4");
    generateElements.randomShapes(100);//100 = intervel for each shape generation
});
