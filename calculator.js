var app = new Vue({
    el: '#calculator',
    data: {
        gender: "",
        measure: "m",

        lengthMeasure: "cm",
        weightMeasure: "kg",

        // basic
        age: "",
        weight: "",
        height: "",

        // common
        chest: "",
        wrist: "",
        hip: "",

        // advanced 
        adiposity: "",
        neck: "",
        abdomen: "",
        thigh: "",
        knee: "",
        ankle: "",
        biceps: "",
        forearm: "",

        bodyfat: "",
        bodyfatString: "0%",

        picText: "Fill in the Form and Calculate!",
        picPath: "img/m2.jpg",
    },
    methods: {

        validNum: function (str) {
            if (typeof str == 'number') {
                return true
            } else {
                return str.length > 0 && (!isNaN(str))
            }

        },


        check: function (category) {
            a = (this.gender == "m" || this.gender == "f") && this.validNum(this.age) && this.validNum(this.height) && this.validNum(this.weight);
            b = this.validNum(this.chest) && this.validNum(this.wrist) && this.validNum(this.hip);
            c = this.validNum(this.adiposity) && this.validNum(this.neck) && this.validNum(this.abdomen) && this.validNum(this.thigh) && this.validNum(this.knee) && this.validNum(this.ankle) && this.validNum(this.biceps) && this.validNum(this.forearm);

            switch (category) {
                case 1:
                    return a
                case 2:
                    return a && b
                case 3:
                    return a && b && c

            }




        },
        calculate: function (category) {
            // this.check(category);
            if (this.check(category)) {
                if (this.measure == "m") {
                    switch (category) {
                        case 1:
                            this.bodyfat = -26.9575592519138 + -1.08578695550816 * this.age + 2.10922586342717 * this.weight + 0.00681553194284284 * this.age * this.height + -0.00900787295197659 * this.weight * this.height
                            break;

                        case 2:
                            this.bodyfat = -265.678857389526 + -2.12339459651383 * this.age + 1.91430515148756 * this.height + 6.01663957609277 * this.hip + -11.8612305220359 * this.wrist + -0.00434623624586747 * this.age * this.weight + 0.00449547810552599 * this.age * this.height + 0.101111652794227 * this.age * this.wrist + 0.0096890658695616 * this.height * this.weight + -0.00898809988786118 * this.weight * this.chest + -0.0330834666299174 * this.height * this.hip + 0.0404526981928006 * this.wrist * this.chest
                            break;

                        case 3:
                            this.bodyfat = -517.634542700836 + -0.182789105182742 * this.age + -1.89867674831734 * this.weight + 4.52050229049177 * this.height + -12.3264718306416 * this.adiposity + 5.78399759359791 * this.neck + 18.0734734906965 * this.chest + -1.12236748532221 * this.abdomen + 16.0670417539698 * this.hip + 5.28301314944288 * this.thigh + -20.770413943282 * this.knee + -95.5728914279405 * this.ankle + 4.76001194682994 * this.biceps + -1.55903088381135 * this.forearm + -1.5233748797113 * this.wrist + -0.0441040957475888 * this.age * this.ankle + 0.0681618331256203 * this.age * this.wrist + 0.0449975566868278 * this.weight * this.height + 0.0960934062846427 * this.weight * this.chest + -0.633201002923837 * this.weight * this.ankle + -0.109550739034761 * this.height * this.chest + -0.0720994464973145 * this.height * this.hip + 0.337440472213329 * this.height * this.ankle + -0.0805027185270307 * this.height * this.biceps + 0.128980835824561 * this.height * this.forearm + 0.348629072988867 * this.adiposity * this.neck + -0.228298697411573 * this.adiposity * this.chest + -0.605071571614284 * this.adiposity * this.knee + 1.68049590579812 * this.adiposity * this.ankle + -0.320250852913665 * this.adiposity * this.biceps + 0.464170698711911 * this.adiposity * this.forearm + -0.150903909082736 * this.neck * this.hip + -0.0384326905147307 * this.chest * this.abdomen + 0.168641088530069 * this.chest * this.knee + -0.125522699914563 * this.chest * this.forearm + 0.0438592132913449 * this.abdomen * this.thigh + 0.17400205801669 * this.abdomen * this.wrist + -0.0658919993308778 * this.hip * this.thigh + 0.0971626081740445 * this.hip * this.knee + 0.227137751503346 * this.hip * this.biceps + -0.261930887996169 * this.hip * this.wrist + -0.0801662650430524 * this.thigh * this.biceps + 0.399563854618406 * this.knee * this.ankle + 1.68222261962102 * this.ankle * this.wrist + -1.11281895525546 * this.forearm * this.wrist
                            break;
                    }
                } else if (this.measure == "i") {
                    switch (category) {
                        case 1:
                            this.bodyfat = -26.9575592519138 + -1.08578695550816 * this.age + 2.10922586342717 * this.weight * 0.453592 + 0.00681553194284284 * this.age * this.height * 2.54 + -0.00900787295197659 * this.weight * 0.453592 * this.height * 2.54
                            break;

                        case 2:
                            this.bodyfat = -265.678857389526 + -2.12339459651383 * this.age + 1.91430515148756 * this.height * 2.54 + 6.01663957609277 * this.hip * 2.54 + -11.8612305220359 * this.wrist * 2.54 + -0.00434623624586747 * this.age * this.weight * 0.453592 + 0.00449547810552599 * this.age * this.height * 2.54 + 0.101111652794227 * this.age * this.wrist * 2.54 + 0.0096890658695616 * this.height * 2.54 * this.weight * 0.453592 + -0.00898809988786118 * this.weight * 0.453592 * this.chest * 2.54 + -0.0330834666299174 * this.height * 2.54 * this.hip * 2.54 + 0.0404526981928006 * this.wrist * 2.54 * this.chest * 2.54
                            break;

                        case 3:
                            this.bodyfat = -517.634542700836 + -0.182789105182742 * this.age + -1.89867674831734 * this.weight * 0.453592 + 4.52050229049177 * this.height * 2.54 + -12.3264718306416 * this.adiposity + 5.78399759359791 * this.neck * 2.54 + 18.0734734906965 * this.chest * 2.54 + -1.12236748532221 * this.abdomen * 2.54 + 16.0670417539698 * this.hip * 2.54 + 5.28301314944288 * this.thigh * 2.54 + -20.770413943282 * this.knee * 2.54 + -95.5728914279405 * this.ankle * 2.54 + 4.76001194682994 * this.biceps * 2.54 + -1.55903088381135 * this.forearm * 2.54 + -1.5233748797113 * this.wrist * 2.54 + -0.0441040957475888 * this.age * this.ankle * 2.54 + 0.0681618331256203 * this.age * this.wrist * 2.54 + 0.0449975566868278 * this.weight * 0.453592 * this.height * 2.54 + 0.0960934062846427 * this.weight * 0.453592 * this.chest * 2.54 + -0.633201002923837 * this.weight * 0.453592 * this.ankle * 2.54 + -0.109550739034761 * this.height * 2.54 * this.chest * 2.54 + -0.0720994464973145 * this.height * 2.54 * this.hip * 2.54 + 0.337440472213329 * this.height * 2.54 * this.ankle * 2.54 + -0.0805027185270307 * this.height * 2.54 * this.biceps * 2.54 + 0.128980835824561 * this.height * 2.54 * this.forearm * 2.54 + 0.348629072988867 * this.adiposity * this.neck * 2.54 + -0.228298697411573 * this.adiposity * this.chest * 2.54 + -0.605071571614284 * this.adiposity * this.knee * 2.54 + 1.68049590579812 * this.adiposity * this.ankle * 2.54 + -0.320250852913665 * this.adiposity * this.biceps * 2.54 + 0.464170698711911 * this.adiposity * this.forearm * 2.54 + -0.150903909082736 * this.neck * 2.54 * this.hip * 2.54 + -0.0384326905147307 * this.chest * 2.54 * this.abdomen * 2.54 + 0.168641088530069 * this.chest * 2.54 * this.knee * 2.54 + -0.125522699914563 * this.chest * 2.54 * this.forearm * 2.54 + 0.0438592132913449 * this.abdomen * 2.54 * this.thigh * 2.54 + 0.17400205801669 * this.abdomen * 2.54 * this.wrist * 2.54 + -0.0658919993308778 * this.hip * 2.54 * this.thigh * 2.54 + 0.0971626081740445 * this.hip * 2.54 * this.knee * 2.54 + 0.227137751503346 * this.hip * 2.54 * this.biceps * 2.54 + -0.261930887996169 * this.hip * 2.54 * this.wrist * 2.54 + -0.0801662650430524 * this.thigh * 2.54 * this.biceps * 2.54 + 0.399563854618406 * this.knee * 2.54 * this.ankle * 2.54 + 1.68222261962102 * this.ankle * 2.54 * this.wrist * 2.54 + -1.11281895525546 * this.forearm * 2.54 * this.wrist * 2.54
                            break;
                    }
                }

                this.changePic();
                document.querySelector("#firework").classList.add('pyro');
                setTimeout(function () {
                    document.querySelector("#firework").classList.remove('pyro');
                }, 5 * 1000)
                if (this.bodyfat < 0 || this.bodyfat > 50) {
                    M.toast({ html: "<span>Unreliable estimation! <br>Please verify your input!</span>" })
                }

            } else {
                M.toast({ html: 'Please fill in all previous blanks with a valid number!' })
            }

        },

        changePic: function () {
            var picNum = 0;
            if (this.gender == "m") {
                if (this.bodyfat < 5) {
                    picNum = 1;
                    this.picText = "Essential Fat";
                } else if (this.bodyfat >= 5 && this.bodyfat < 13.5) {
                    picNum = 2;
                    this.picText = "Athletes";
                } else if (this.bodyfat >= 13.5 && this.bodyfat < 17.5) {
                    picNum = 3
                    this.picText = "Fitness";
                } else if (this.bodyfat >= 17.5 && this.bodyfat < 25) {
                    picNum = 4;
                    this.picText = "Acceptable";
                } else if (this.bodyfat >= 25) {
                    picNum = 5;
                    this.picText = "Obese";
                }
            } else if (this.gender == "f") {
                if (this.bodyfat < 13) {
                    picNum = 1;
                    this.picText = "Essential Fat";
                } else if (this.bodyfat >= 13 && this.bodyfat < 20.5) {
                    picNum = 2;
                    this.picText = "Athletes";
                } else if (this.bodyfat >= 20.5 && this.bodyfat < 24.5) {
                    picNum = 3
                    this.picText = "Fitness";
                } else if (this.bodyfat >= 24.5 && this.bodyfat < 32) {
                    picNum = 4;
                    this.picText = "Acceptable";
                } else if (this.bodyfat >= 32) {
                    picNum = 5;
                    this.picText = "Obese";
                }
            }

            this.picPath = "img/" + this.gender + String(picNum) + ".jpg";
            this.bodyfatString = String(this.bodyfat.toFixed(2)) + "%"
            // console.log(this.picPath)
        },

        changeMeasure: function () {
            if (this.measure == "m") {
                this.lengthMeasure = "cm";
                this.weightMeasure = "kg";
            } else if (this.measure == "i") {
                this.lengthMeasure = "in";
                this.weightMeasure = "lb";
            }
        }
    }

})