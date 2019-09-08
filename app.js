var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
	// mongoose    = require("mongoose"),
	// Article 	= require("./models/article"),
	cheerio = require('cheerio'),
	request = require('request');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get('/', function(req, res, next) {
	//target url we are scraping data from
	var url = 'https://www.thecrimson.com/';
	
	// request function that uses the request module
	request(url, function (error, response, body) {

		if (!error) {
			// using cheerio module to load body of html req document and scrape the data
			var title = [];
			var author = [];
			var date = [];
			var desc = [];
			var ref = [];
			var arrOfArticle = [];
			$ = cheerio.load(body),

				$(".article-content h2").each(function(){
					// console.log($(this).text());
					title.push($(this).text());
				});
				$(".article-content p").each(function(){

					// console.log($(this).text());
					desc.push($(this).text());
				});
				$(".article-byline a").each(function(){

					// console.log($(this).text());
					author.push($(this).text().trim());
				});
			
					$(".article-image a").each(function(){
					ref.push("https://www.thecrimson.com"+$(this).attr("href"));			   
					});
	
					$(".article-content .article-byline .article-date").each(function(){
					
					date.push($(this).text().trim());			   
					});
				
				class article {
				constructor(){
					title: String;
					author: String;
					desc: String;
					ref: String;
				}
			}
				for(let i = 0; i <= 20; i++){
					var newArticle = new article()
					newArticle.title = title[i];
					newArticle.author = author[i];
					newArticle.desc = desc[i];
					newArticle.ref = ref[i];
					newArticle.date = date[i]
					arrOfArticle.push(newArticle)
		
				};
				console.log(date[0].trim());
				console.log(date[0]);
				console.log(arrOfArticle[0]);
				
		}
		else{
				console.log("We’ve encountered an error: " + error);
			}
		// console.log(title);
		res.render("index", {article:arrOfArticle});
	});

});

var port = 3200 || process.env.PORT;
app.listen(port, function () {
  console.log("Server started!");
});
