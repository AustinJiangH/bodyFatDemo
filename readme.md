# Body Fat Calculator 
This repo contains files of a body fat calculator.
## Directories
- <code>app</code>: files of the demo web application.
- <code>code</code>: files of the model development. <code>data</code> has to be in directory <code>code</code> to run the R code.
- <code>data</code>: data used to train the model.
- <code>images</code>: important plots of the model.
- <code>deliverables</code>: Report and presentation.

# Model
Model development details can be found in the report.

# Application 
## Philosophy 
To develop an easy-to-use, user-friendly and cross-platform web application, the development of the model and the design of the application follow the following guidelines.
1.	Progressive models
To avoid overwhelming number of inputs and for users knowing different levels of information about themselves, different models should be applied. 
A precise estimation can be shown with detailed information, while even with little information a simple model can be used for a rough estimation.
2.	Clear, neat UI for all devices
Users should be able to find input areas and outcome promptly.
Regardless of size of the device a user uses, the interface should be friendly.
3.	Customizable 
Users can select a familiar metric system and gender to customize the application.


## Design 
The application is composed by an input panel on the left and a result panel on the right (top and bottom on mobile devices). The input panel has foldable tabs corresponding to different information levels and corresponding models. The result panel will show an illustration of the estimated figure, a category and most importantly the body fat percentage.

<img src="app/img/desktop.png" style="height: 10rem"></img>


## Technical Details 
This application is designed with HTML5, CSS3 and JavaScript, using two frameworks <a href="https://materializecss.com/">Materialize.css</a> and <a href="https://vuejs.org/">Vue.js</a>. Models are fitted in R and migrated to JavaScript.
This application runs only on front end without server side and is hosted on GitHub.

