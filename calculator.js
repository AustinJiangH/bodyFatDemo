var app = new Vue({
    el: '#calculator',
    data: {
        gender: "",

        density: "",
        age: "",
        weight: "",
        chest: "",
        ankle: "",
        biceps: "",
        bodyfat: "",
        picPath: "img/m2.jpg",
    },
    methods: {
        check: function () {
            this.density = Number(this.density);
            this.age = Number(this.age);
            this.weight = Number(this.weight);
            this.chest = Number(this.chest);
            this.ankle = Number(this.ankle);
            this.biceps = Number(this.biceps);
        },
        calculate: function (){
            this.check();
            this.bodyfat = 423.05828  -384.99700 * this.density + 0.01115 * this.age + 0.01326 * this.weight + 0.03298 * this.chest -0.08296 * this.ankle -0.06224 * this.biceps; 
            this.changePic();
        },
        changePic: function (){
            var picNum = 0;
            if (this.bodyfat < 10) {
                picNum = 1
            }else if (this.bodyfat >= 10 && this.bodyfat < 20){
                picNum = 2
            }else if (this.bodyfat >= 20 && this.bodyfat < 30){
                picNum = 3
            }else if (this.bodyfat >= 30 && this.bodyfat < 40){
                picNum = 4
            }else if (this.bodyfat >= 40 ){
                picNum = 5
            }
            this.picPath = "img/" + this.gender + String(picNum) + ".jpg";
            console.log(this.picPath)
        }
    }

})